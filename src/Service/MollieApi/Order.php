<?php declare(strict_types=1);

namespace Kiener\MolliePayments\Service\MollieApi;

use Kiener\MolliePayments\Exception\CouldNotFetchMollieOrderException;
use Kiener\MolliePayments\Exception\PaymentNotFoundException;
use Kiener\MolliePayments\Factory\MollieApiFactory;
use Mollie\Api\Exceptions\ApiException;
use Mollie\Api\Exceptions\IncompatiblePlatform;
use Mollie\Api\Resources\Order as MollieOrder;
use Mollie\Api\Resources\OrderLine;
use Mollie\Api\Resources\Payment;
use Mollie\Api\Types\PaymentStatus;
use Psr\Log\LoggerInterface;

class Order
{

    /**
     * @var MollieApiFactory
     */
    private $clientFactory;

    /**
     * @var LoggerInterface
     */
    private $logger;

    public function __construct(MollieApiFactory $clientFactory, LoggerInterface $logger)
    {
        $this->clientFactory = $clientFactory;
        $this->logger = $logger;
    }

    /**
     * @param string $mollieOrderId
     * @param string $salesChannelId
     * @param array $parameters
     * @return MollieOrder
     * @throws ApiException
     * @throws IncompatiblePlatform
     */
    public function getOrder(string $mollieOrderId, string $salesChannelId, array $parameters = []): MollieOrder
    {
        $apiClient = $this->clientFactory->getClient($salesChannelId);

        try {
            return $apiClient->orders->get($mollieOrderId, $parameters);
        } catch (ApiException $e) {
            $this->logger->error(
                sprintf(
                    'API error occurred when fetching mollie order %s with message %s',
                    $mollieOrderId,
                    $e->getMessage()
                )
            );

            throw $e;
        }
    }

    public function setShipment(string $mollieOrderId, string $salesChannelId): bool
    {
        $mollieOrder = $this->getOrder($mollieOrderId, $salesChannelId);

        /** @var OrderLine $orderLine */
        foreach ($mollieOrder->lines() as $orderLine) {
            if ($orderLine->shippableQuantity > 0) {
                $mollieOrder->shipAll();

                return true;
            }
        }

        return false;
    }

    /**
     * @param string $mollieOrderId
     * @param string $salesChannelId
     * @return Payment
     */
    public function getCompletedPayment(string $mollieOrderId, string $salesChannelId): Payment
    {
        try {
            $mollieOrder = $this->getOrder($mollieOrderId, $salesChannelId, ['embed' => 'payments']);
        } catch (ApiException $e) {
            throw new CouldNotFetchMollieOrderException($mollieOrderId);
        }

        if ($mollieOrder->payments()->count() === 0) {
            throw new PaymentNotFoundException($mollieOrderId);
        }

        /** @var Payment $payment */
        foreach ($mollieOrder->payments()->getArrayCopy() as $payment) {
            if (in_array($payment->status, [
                PaymentStatus::STATUS_PAID,
                PaymentStatus::STATUS_AUTHORIZED // Klarna
            ])) {
                return $payment;
            }
        }

        throw new PaymentNotFoundException($mollieOrderId);
    }
}
