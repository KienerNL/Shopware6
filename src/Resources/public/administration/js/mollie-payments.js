(this.webpackJsonp=this.webpackJsonp||[]).push([["mollie-payments"],{"+iPB":function(e,t){e.exports='{% block sw_order_detail_base_secondary_info_payment %}\n    {% parent %}\n\n    <template v-if="mollieOrderId">\n        <dt>{{ $tc(\'sw-order.detailExtended.labelMollieOrderId\') }}</dt>\n        <dd>{{ mollieOrderId }}</dd>\n\n        <dt>{{ $tc(\'sw-order.detailExtended.labelMolliePaymentLink\') }}</dt>\n        <dd>\n            <sw-button-process size="x-small"\n                               variant="context"\n                               :disabled="!molliePaymentUrl"\n                               :processSuccess="molliePaymentUrlCopied"\n                               :isLoading="isLoading || isMolliePaymentUrlLoading"\n                               @click="copyPaymentUrlToClipboard" @process-finish="onMolliePaymentUrlProcessFinished">\n                {{ $tc(\'sw-order.detailExtended.buttonMolliePaymentLink\') }}\n            </sw-button-process>\n        </dd>\n    </template>\n{% endblock %}\n'},"/Kex":function(e,t){e.exports='{% block sw_order_line_items_grid_grid_actions %}\n    {% parent %}\n\n<template #action-modals="{ item }">\n    <sw-modal v-if="showRefundModal === item.id"\n              @modal-close="onCloseRefundModal"\n              :title="$tc(\'mollie-payments.modals.refund.title\')"\n              variant="small">\n\n        <p>\n            {{ $tc(\'mollie-payments.modals.refund.content\', 0, { quantity: item.quantity, refundableQuantity: refundableQuantity(item) }) }}\n        </p>\n\n        <br />\n\n        <sw-number-field numberType="integer"\n                         size="medium"\n                         :step="1"\n                         :placeholder="$tc(\'mollie-payments.modals.refund.quantityPlaceholder\')"\n                         :min="0"\n                         :value="1"\n                         :max="refundableQuantity(item)"\n                         v-model="quantityToRefund">\n        </sw-number-field>\n\n        <template slot="modal-footer">\n            <sw-button @click="onCloseRefundModal" size="small">\n                {{ $tc(\'mollie-payments.modals.refund.cancelButton\') }}\n            </sw-button>\n            <sw-button @click="onConfirmRefund(item)" variant="primary" size="small">\n                {{ $tc(\'mollie-payments.modals.refund.confirmButton\') }}\n            </sw-button>\n        </template>\n    </sw-modal>\n\n    <sw-modal v-if="showShippingModal === item.id"\n              @modal-close="onCloseShippingModal"\n              :title="$tc(\'mollie-payments.modals.shipping.title\')"\n              variant="small">\n\n        <p>\n            {{ $tc(\'mollie-payments.modals.shipping.content\', 0, { quantity: item.quantity, shippableQuantity: shippableQuantity(item) }) }}\n        </p>\n\n        <br />\n\n        <sw-number-field numberType="integer"\n                         size="medium"\n                         :step="1"\n                         :placeholder="$tc(\'mollie-payments.modals.shipping.quantityPlaceholder\')"\n                         :min="0"\n                         :value="1"\n                         :max="shippableQuantity(item)"\n                         v-model="quantityToShip">\n        </sw-number-field>\n\n        <template slot="modal-footer">\n            <sw-button @click="onCloseShippingModal" size="small">\n                {{ $tc(\'mollie-payments.modals.shipping.cancelButton\') }}\n            </sw-button>\n            <sw-button @click="onConfirmShipping(item)" variant="primary" size="small">\n                {{ $tc(\'mollie-payments.modals.shipping.confirmButton\') }}\n            </sw-button>\n        </template>\n    </sw-modal>\n</template>\n{% endblock %}\n\n{% block sw_order_line_items_grid_grid_actions_show %}\n    {% parent %}\n\n<sw-context-menu-item :disabled="!isShippable(item)"\n                      icon="default-object-paperplane"\n                      @click="onShipItem(item)">\n    {{ $tc(\'mollie-payments.general.shipThroughMollie\') }}\n</sw-context-menu-item>\n\n<sw-context-menu-item :disabled="!isRefundable(item)"\n                      icon="default-arrow-360-left"\n                      @click="onRefundItem(item)">\n    {{ $tc(\'mollie-payments.general.refundThroughMollie\') }}\n</sw-context-menu-item>\n{% endblock %}'},"6M4d":function(e){e.exports=JSON.parse('{"mollie-payments":{"general":{"mainMenuItemGeneral":"Mollie Payments","descriptionTextModule":"Mollie Payments","refundThroughMollie":"Refund through Mollie","shipThroughMollie":"Ship through Mollie"},"modals":{"refund":{"title":"Refund an order line item through Mollie","content":"Fill out the quantity of this item ({refundableQuantity} out of {quantity} left to refund) to be refunded to the customer.","quantityPlaceholder":"The quantity to refund...","createCreditText":"Create a credit item for this refund.","confirmButton":"Refund","cancelButton":"Do not refund"},"shipping":{"title":"Ship an order line item through Mollie","content":"Fill out the quantity of this item ({shippableQuantity} out of {quantity} left to ship) to be shipped to the customer.","quantityPlaceholder":"The quantity to ship...","confirmButton":"Ship","cancelButton":"Do not ship"}}},"sw-order":{"detailExtended":{"buttonMolliePaymentLink":"Copy to Clipboard","columnRefunded":"Refunded","columnShipped":"Shipped","labelMollieOrderId":"Mollie Order ID","labelMolliePaymentLink":"Mollie Checkout URL","totalRefunds":"Refunded amount ({quantity} items)","totalShipments":"Shipped amount ({quantity} items)"}},"sw-payment":{"apiLinkButton":"Get your API keys from the Mollie Dashboard","testButton":"Test API Keys","testApiKeys":{"title":"Mollie Payments","apiKey":"API key","isValid":"is valid","isInvalid":"is invalid"}},"sw-customer":{"extendedInfo":{"labelPreferredIdealIssuer":"Preferred iDeal issuer"}}}')},ExJP:function(e){e.exports=JSON.parse('{"mollie-payments":{"general":{"mainMenuItemGeneral":"Mollie Payments Zahlungen","descriptionTextModule":"Mollie Payments Zahlungen","refundThroughMollie":"Rückerstattung über Mollie","shipThroughMollie":"Versand bei Mollie melden"},"modals":{"refund":{"title":"Bestellposition über Mollie rückerstatten","content":"Menge dieser Bestellposition ({refundableQuantity} von {quantity} für Rückerstattung möglich) für die Rückerstattung an den Kunden.","quantityPlaceholder":"Menge für Rückerstattung...","createCreditText":"Create a credit item for this refund.","confirmButton":"Rückerstatten","cancelButton":"Abbrechen"},"shipping":{"title":"Versand der Bestellposition an Mollie melden","content":"Menge dieser Bestellposition ({shippableQuantity} von {quantity} für Versand noch möglich), die an den Kunden versandt wurden.","quantityPlaceholder":"Menge der versendeten Ware...","confirmButton":"Versandmeldung bei Mollie","cancelButton":"Abbrechen"}}},"sw-order":{"detailExtended":{"buttonMolliePaymentLink":"In die Zwischenablage kopieren","columnRefunded":"Rückerstattet","columnShipped":"Versandt","labelMollieOrderId":"Mollie Bestell ID","labelMolliePaymentLink":"Mollie Checkout URL","totalRefunds":"Rückerstattete Menge ({quantity} Stück)","totalShipments":"Versandte Menge ({quantity} Stück)"}},"sw-payment":{"apiLinkButton":"Erhalten Sie Ihre API Keys vom Mollie Dashboard","testButton":"Prüfe API Keys","testApiKeys":{"title":"Mollie Payments","apiKey":"API Schlüssel","isValid":"ist gültig","isInvalid":"ist gültig"}},"sw-customer":{"extendedInfo":{"labelPreferredIdealIssuer":"Bevorzugter iDeal Aussteller"}}}')},GE23:function(e,t){e.exports='<sw-container gap="16px" columns="1fr" justify="start">\n    <sw-button @click="onTestButtonClicked" ref="testApiButton">\n        {{ $tc(\'sw-payment.testButton\') }}\n    </sw-button>\n    <sw-button variant="context" size="x-small" link="https://www.mollie.com/dashboard/developers/api-keys">\n        {{ $tc(\'sw-payment.apiLinkButton\') }} <sw-icon name="default-action-external" :small="true"></sw-icon>\n    </sw-button>\n</sw-container>\n'},TxRs:function(e,t){e.exports='{% block sw_customer_base_metadata_default_payment %}\n    {% parent %}\n    <sw-description-list v-if="preferredIdealIssuer">\n        <dt class="sw-customer-base-info__label">{{ $tc(\'sw-customer.extendedInfo.labelPreferredIdealIssuer\') }}</dt>\n        <dd class="sw-customer-base__label-preferred-ideal-issuer">\n            {{ preferredIdealIssuer }}\n        </dd>\n    </sw-description-list>\n{% endblock %}'},ab5s:function(e,t,n){"use strict";n.r(t);const i=Shopware.Classes.ApiService;var l=class extends i{constructor(e,t,n="mollie"){super(e,t,n)}testApiKeys(e={liveApiKey:null,testApiKey:null}){const t=this.getBasicHeaders();return this.httpClient.post(`_action/${this.getApiBasePath()}/config/test-api-keys`,JSON.stringify(e),{headers:t}).then((e=>i.handleResponse(e)))}};const o=Shopware.Classes.ApiService;var s=class extends o{constructor(e,t,n="mollie"){super(e,t,n)}getPaymentUrl(e={orderId:null}){const t=this.getBasicHeaders();return this.httpClient.post(`_action/${this.getApiBasePath()}/order/payment-url`,JSON.stringify(e),{headers:t}).then((e=>o.handleResponse(e)))}};const r=Shopware.Classes.ApiService;var a=class extends r{constructor(e,t,n="mollie"){super(e,t,n)}refund(e={itemId:null,versionId:null,quantity:null,createCredit:null}){const t=this.getBasicHeaders();return this.httpClient.post(`_action/${this.getApiBasePath()}/refund`,JSON.stringify(e),{headers:t}).then((e=>r.handleResponse(e)))}total(e={orderId:null}){const t=this.getBasicHeaders();return this.httpClient.post(`_action/${this.getApiBasePath()}/refund/total`,JSON.stringify(e),{headers:t}).then((e=>r.handleResponse(e)))}};const d=Shopware.Classes.ApiService;var u=class extends d{constructor(e,t,n="mollie"){super(e,t,n)}ship(e={itemId:null,versionId:null,quantity:null}){const t=this.getBasicHeaders();return this.httpClient.post(`_action/${this.getApiBasePath()}/ship`,JSON.stringify(e),{headers:t}).then((e=>d.handleResponse(e)))}total(e={orderId:null}){const t=this.getBasicHeaders();return this.httpClient.post(`_action/${this.getApiBasePath()}/ship/total`,JSON.stringify(e),{headers:t}).then((e=>d.handleResponse(e)))}};const{Application:m}=Shopware;m.addServiceProvider("MolliePaymentsConfigService",(e=>{const t=m.getContainer("init");return new l(t.httpClient,e.loginService)})),m.addServiceProvider("MolliePaymentsOrderService",(e=>{const t=m.getContainer("init");return new s(t.httpClient,e.loginService)})),m.addServiceProvider("MolliePaymentsRefundService",(e=>{const t=m.getContainer("init");return new a(t.httpClient,e.loginService)})),m.addServiceProvider("MolliePaymentsShippingService",(e=>{const t=m.getContainer("init");return new u(t.httpClient,e.loginService)}));var p=n("TxRs"),c=n.n(p);const{Component:h}=Shopware;h.override("sw-customer-base-info",{template:c.a,computed:{preferredIdealIssuer(){return this.customer&&this.customer.customFields&&this.customer.customFields.mollie_payments&&this.customer.customFields.mollie_payments.preferred_ideal_issuer?this.customer.customFields.mollie_payments.preferred_ideal_issuer:null}}});var y=n("/Kex"),f=n.n(y);const{Component:g,Service:v}=Shopware;g.override("sw-order-line-items-grid",{template:f.a,inject:["MolliePaymentsRefundService","MolliePaymentsShippingService"],data:()=>({isLoading:!1,selectedItems:{},showRefundModal:!1,showShippingModal:!1,createCredit:!1,quantityToRefund:1,quantityToShip:1,refundQuantity:0,shippingQuantity:0}),computed:{getLineItemColumns(){const e=this.$super("getLineItemColumns");return e.push({property:"customFields.refundedQuantity",label:this.$tc("sw-order.detailExtended.columnRefunded"),allowResize:!1,align:"right",inlineEdit:!1,width:"100px"}),e.push({property:"customFields.shippedQuantity",label:this.$tc("sw-order.detailExtended.columnShipped"),allowResize:!1,align:"right",inlineEdit:!1,width:"100px"}),e}},methods:{onRefundItem(e){this.showRefundModal=e.id},onCloseRefundModal(){this.showRefundModal=!1},onConfirmRefund(e){this.showRefundModal=!1,this.quantityToRefund>0&&this.MolliePaymentsRefundService.refund({itemId:e.id,versionId:e.versionId,quantity:this.quantityToRefund,createCredit:this.createCredit}).then(document.location.reload()),this.quantityToRefund=0},onShipItem(e){this.showShippingModal=e.id},onCloseShippingModal(){this.showShippingModal=!1},onConfirmShipping(e){this.showShippingModal=!1,this.quantityToShip>0&&this.MolliePaymentsShippingService.ship({itemId:e.id,versionId:e.versionId,quantity:this.quantityToShip}).then(document.location.reload()),this.quantityToShip=0},isRefundable(e){let t=!1;return"product"===e.type&&void 0!==e.customFields&&null!==e.customFields&&void 0!==e.customFields.mollie_payments&&null!==e.customFields.mollie_payments&&void 0!==e.customFields.mollie_payments.order_line_id&&null!==e.customFields.mollie_payments.order_line_id&&(void 0===e.customFields.refundedQuantity||parseInt(e.customFields.refundedQuantity,10)<e.quantity)&&(t=!0),t},isShippable(e){let t=!1;return"product"===e.type&&void 0!==e.customFields&&null!==e.customFields&&void 0!==e.customFields.mollie_payments&&null!==e.customFields.mollie_payments&&void 0!==e.customFields.mollie_payments.order_line_id&&null!==e.customFields.mollie_payments.order_line_id&&(void 0===e.customFields.shippedQuantity||parseInt(e.customFields.shippedQuantity,10)<e.quantity)&&(t=!0),t},refundableQuantity:e=>void 0!==e.customFields&&void 0!==e.customFields.refundedQuantity?e.quantity-parseInt(e.customFields.refundedQuantity,10):e.quantity,shippableQuantity:e=>void 0!==e.customFields&&void 0!==e.customFields.shippedQuantity&&void 0!==e.customFields.refundedQuantity?e.quantity-parseInt(e.customFields.shippedQuantity,10)-parseInt(e.customFields.refundedQuantity,10):void 0!==e.customFields&&void 0===e.customFields.shippedQuantity&&void 0!==e.customFields.refundedQuantity?e.quantity-parseInt(e.customFields.refundedQuantity,10):e.quantity}});var b=n("+iPB"),M=n.n(b);const{Component:w}=Shopware;w.override("sw-order-user-card",{template:M.a,inject:["MolliePaymentsOrderService"],data:()=>({isMolliePaymentUrlLoading:!1,molliePaymentUrl:null,molliePaymentUrlCopied:!1}),computed:{mollieOrderId(){return this.currentOrder&&this.currentOrder.customFields&&this.currentOrder.customFields.mollie_payments&&this.currentOrder.customFields.mollie_payments.order_id?this.currentOrder.customFields.mollie_payments.order_id:null}},created(){this.createdComponent()},methods:{createdComponent(){this.$super("createdComponent"),this.mollieOrderId&&(this.isMolliePaymentUrlLoading=!0,this.MolliePaymentsOrderService.getPaymentUrl({orderId:this.currentOrder.id}).then((e=>{this.molliePaymentUrl=e.url})).finally((()=>{this.isMolliePaymentUrlLoading=!1})))},copyPaymentUrlToClipboard(){Shopware.Utils.dom.copyToClipboard(this.molliePaymentUrl),this.molliePaymentUrlCopied=!0},onMolliePaymentUrlProcessFinished(e){this.molliePaymentUrlCopied=e}}});var S=n("iuSo"),I=n.n(S);const{Component:P}=Shopware;P.override("sw-order-detail-base",{template:I.a,props:{orderId:{type:String,required:!0}},data:()=>({refundedAmount:0,refundedItems:0,shippedAmount:0,shippedItems:0}),inject:["MolliePaymentsRefundService","MolliePaymentsShippingService"],mounted(){""!==this.orderId&&(this.MolliePaymentsRefundService.total({orderId:this.orderId}).then((e=>{this.refundedAmount=e.amount,this.refundedItems=e.items})),this.MolliePaymentsShippingService.total({orderId:this.orderId}).then((e=>{this.shippedAmount=e.amount,this.shippedItems=e.items})))}});var _=n("GE23"),C=n.n(_);const{Component:k,Mixin:R}=Shopware;k.register("mollie-test-api-key",{template:C.a,inject:["MolliePaymentsConfigService"],mixins:[R.getByName("notification")],methods:{onTestButtonClicked(){let e=this;const t=document.querySelector('input[name="MolliePayments.config.liveApiKey"]'),n=document.querySelector('input[name="MolliePayments.config.testApiKey"]'),i=t?t.value:null,l=n?n.value:null;this.MolliePaymentsConfigService.testApiKeys({liveApiKey:i,testApiKey:l}).then((i=>{i.results,i.results.forEach((function(i){let l={title:e.$tc("sw-payment.testApiKeys.title"),message:`${e.$tc("sw-payment.testApiKeys.apiKey")} "${i.key}" (${i.mode}) ${!0===i.valid?e.$tc("sw-payment.testApiKeys.isValid"):e.$tc("sw-payment.testApiKeys.isInvalid")}.`},o="live"===i.mode?t:n;o&&o.parentNode.parentNode.classList.remove("has--error"),!0===i.valid?e.createNotificationSuccess(l):(e.createNotificationError(l),o&&o.parentNode.parentNode.classList.add("has--error"))}))}))}}});var x=n("ExJP"),q=n("6M4d"),B=n("z4Qt");const{Module:A}=Shopware;A.register("mollie-payments",{type:"plugin",name:"MolliePayments",title:"mollie-payments.general.mainMenuItemGeneral",description:"mollie-payments.general.descriptionTextModule",version:"1.0.0",targetVersion:"1.0.0",color:"#333",icon:"default-action-settings",snippets:{"de-DE":x,"en-GB":q,"nl-NL":B}})},iuSo:function(e,t){e.exports='{% block sw_order_detail_base_line_items_summary_entries %}\n    {% parent %}\n    <dt v-if="refundedItems > 0"><strong>{{ $tc(\'sw-order.detailExtended.totalRefunds\', 0, { quantity: refundedItems }) }}</strong></dt>\n    <dd v-if="refundedItems > 0"><strong>{{ refundedAmount | currency(order.currency.shortName) }}</strong></dd>\n    <dt v-if="shippedItems > 0"><strong>{{ $tc(\'sw-order.detailExtended.totalShipments\', 0, { quantity: shippedItems }) }}</strong></dt>\n    <dd v-if="shippedItems > 0"><strong>{{ shippedAmount | currency(order.currency.shortName) }}</strong></dd>\n{% endblock %}'},z4Qt:function(e){e.exports=JSON.parse('{"mollie-payments":{"general":{"mainMenuItemGeneral":"Mollie betalingen","descriptionTextModule":"Mollie betalingen","refundThroughMollie":"Terugbetaling via Mollie","shipThroughMollie":"Verzending door Mollie"},"modals":{"refund":{"title":"Terugbetaling van een order line item via Mollie","content":"Vul de hoeveelheid van dit item in ({refundableQuantity} van {quantity} over voor terugbetaling) die aan de klant moet worden terugbetaald.","quantityPlaceholder":"De terug te betalen hoeveelheid...","createCreditText":"Creëer een credit-item voor deze terugbetaling.","confirmButton":"Terugbetaling","cancelButton":"Niet terugbetalen"},"verzending":{"title":"Verzend een order line item via Mollie","content":"Vul de hoeveelheid van dit item in ({shippableQuantity} van {quantity} over voor verzending) om naar de klant te verzenden.","quantityPlaceholder":"De te verzenden hoeveelheid...","confirmButton":"Verzenden","cancelButton":"Niet verzenden"}}},"sw-order":{"detailExtended":{"buttonMolliePaymentLink":"Kopieer naar Klembord","columnRefunded":"Terugbetaald","columnShipped":"Verzonden","labelMollieOrderId":"Mollie Order ID","labelMolliePaymentLink":"Mollie Checkout URL","totalRefunds":"Terugbetaald bedrag ({quantity} items)","totalShipments":"Verzonden bedrag ({quantity} items)"}},"sw-payment":{"apiLinkButton":"Haal uw API sleutels van het Mollie Dashboard","testButton":"Test API sleutels","testApiKeys":{"title":"Mollie Payments","apiKey":"API Key","isValid":"is geldig","isInvalid":"is geldig"}},"sw-customer":{"extendedInfo":{"labelPreferredIdealIssuer":"Voorkeur iDeal verstrekker"}}}')}},[["ab5s","runtime"]]]);