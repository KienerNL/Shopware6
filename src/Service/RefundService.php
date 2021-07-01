<?php declare(strict_types=1);

namespace Kiener\MolliePayments\Service;

use Kiener\MolliePayments\Exception\CouldNotCancelMollieRefundException;
use Kiener\MolliePayments\Exception\CouldNotCreateMollieRefundException;
use Kiener\MolliePayments\Exception\CouldNotExtractMollieOrderIdException;
use Kiener\MolliePayments\Exception\CouldNotFetchMollieOrderException;
use Kiener\MolliePayments\Exception\CouldNotFetchMollieRefundsException;
use Kiener\MolliePayments\Exception\PaymentNotFoundException;
use Kiener\MolliePayments\Hydrator\RefundHydrator;
use Kiener\MolliePayments\Service\MollieApi\Order;
use Mollie\Api\Exceptions\ApiException;
use Mollie\Api\Exceptions\IncompatiblePlatform;
use Mollie\Api\Resources\Refund;
use Psr\Log\LoggerInterface;
use Shopware\Core\Checkout\Order\OrderEntity;

class RefundService
{
    /** @var LoggerInterface */
    private $logger;

    /** @var Order */
    private $mollieOrderApi;

    /** @var OrderService */
    private $orderService;

    /** @var RefundHydrator */
    private $refundHydrator;

    /**
     * CustomFieldService constructor.
     *
     * @param LoggerInterface $logger
     * @param Order $mollieOrderApi
     * @param OrderService $orderService
     * @param RefundHydrator $refundHydrator
     */
    public function __construct(
        LoggerInterface $logger,
        Order $mollieOrderApi,
        OrderService $orderService,
        RefundHydrator $refundHydrator
    )
    {
        $this->logger = $logger;
        $this->mollieOrderApi = $mollieOrderApi;
        $this->orderService = $orderService;
        $this->refundHydrator = $refundHydrator;
    }

    /**
     * @param OrderEntity $order
     * @param float $amount
     * @param string|null $description
     * @return bool
     * @throws CouldNotCreateMollieRefundException
     * @throws CouldNotExtractMollieOrderIdException
     * @throws CouldNotFetchMollieOrderException
     * @throws PaymentNotFoundException
     */
    public function refund(OrderEntity $order, float $amount, ?string $description = null): bool
    {
        $mollieOrderId = $this->tryGetMollieOrderId($order);

        $payment = $this->mollieOrderApi->getCompletedPayment($mollieOrderId, $order->getSalesChannelId());

        try {
            $refund = $payment->refund([
                'amount' => [
                    'value' => number_format($amount, 2, '.', ''),
                    'currency' => $order->getCurrency()->getIsoCode()
                ],
                'description' => $description ?? sprintf("Refunded through Shopware administration. Order number %s",
                        $order->getOrderNumber())
            ]);

            return $refund instanceof Refund;
        } catch (ApiException $e) {
            throw new CouldNotCreateMollieRefundException($mollieOrderId, $order->getOrderNumber(), $e);
        }
    }

    /**
     * @param OrderEntity $order
     * @param string $refundId
     * @return bool
     * @throws CouldNotCancelMollieRefundException
     * @throws CouldNotExtractMollieOrderIdException
     * @throws CouldNotFetchMollieOrderException
     * @throws PaymentNotFoundException
     */
    public function cancel(OrderEntity $order, string $refundId): bool
    {
        $mollieOrderId = $this->tryGetMollieOrderId($order);

        $payment = $this->mollieOrderApi->getCompletedPayment($mollieOrderId, $order->getSalesChannelId());

        try {
            // getRefund doesn't contain all necessary @throws tags.
            // It is possible for it to throw an ApiException here if $refundId is incorrect.
            $refund = $payment->getRefund($refundId);
        } catch (ApiException $e) { // Invalid resource id
            throw new CouldNotCancelMollieRefundException($mollieOrderId, $order->getOrderNumber(), $refundId, $e);
        }

        // This payment does not have a refund with $refundId, so we cannot cancel it.
        if (!($refund instanceof Refund)) {
            return false;
        }

        // Refunds can only be cancelled when they're still queued or pending.
        if (!$refund->isQueued() && !$refund->isPending()) {
            return false;
        }

        try {
            $refund->cancel();
            return true;
        } catch (ApiException $e) {
            throw new CouldNotCancelMollieRefundException($mollieOrderId, $order->getOrderNumber(), $refundId, $e);
        }
    }

    /**
     * @param OrderEntity $order
     * @return array
     * @throws CouldNotExtractMollieOrderIdException
     * @throws CouldNotFetchMollieOrderException
     * @throws CouldNotFetchMollieRefundsException
     * @throws PaymentNotFoundException
     */
    public function getRefunds(OrderEntity $order): array
    {
        $mollieOrderId = $this->tryGetMollieOrderId($order);

        $payment = $this->mollieOrderApi->getCompletedPayment($mollieOrderId, $order->getSalesChannelId());

        try {
            $refundsArray = [];

            foreach ($payment->refunds()->getArrayCopy() as $refund) {
                $refundsArray[] = $this->refundHydrator->hydrate($refund);
            }

            return $refundsArray;
        } catch (ApiException $e) {
            throw new CouldNotFetchMollieRefundsException($mollieOrderId, $order->getOrderNumber(), $e);
        }
    }

    /**
     * @param OrderEntity $order
     * @return float
     * @throws CouldNotExtractMollieOrderIdException
     * @throws CouldNotFetchMollieOrderException
     * @throws PaymentNotFoundException
     */
    public function getRemainingAmount(OrderEntity $order): float
    {
        $payment = $this->mollieOrderApi->getCompletedPayment(
            $this->tryGetMollieOrderId($order),
            $order->getSalesChannelId()
        );

        return $payment->getAmountRemaining();
    }

    /**
     * @param OrderEntity $order
     * @return float
     * @throws CouldNotExtractMollieOrderIdException
     * @throws CouldNotFetchMollieOrderException
     * @throws PaymentNotFoundException
     */
    public function getRefundedAmount(OrderEntity $order): float
    {
        $payment = $this->mollieOrderApi->getCompletedPayment(
            $this->tryGetMollieOrderId($order),
            $order->getSalesChannelId()
        );

        return $payment->getAmountRefunded();
    }

    /**
     * @param OrderEntity $order
     * @return string
     * @throws CouldNotExtractMollieOrderIdException
     */
    private function tryGetMollieOrderId(OrderEntity $order): string
    {
        try {
            return $this->orderService->getMollieOrderId($order);
        } catch (CouldNotExtractMollieOrderIdException $e) {
            $this->logger->warning($e->getMessage());
            throw $e;
        }
    }
}
