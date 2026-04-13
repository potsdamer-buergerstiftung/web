import GooglePayButton from "@google-pay/button-react";

export function GooglePayOption() {
    return (
        <GooglePayButton
            environment="TEST"
            buttonType="donate"
            buttonSizeMode="fill"
            buttonColor="black"
            buttonBorderType="no_border"
            buttonRadius={10}
            paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                    {
                        type: "CARD",
                        parameters: {
                            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                            allowedCardNetworks: ["MASTERCARD", "VISA"],
                        },
                        tokenizationSpecification: {
                            type: "PAYMENT_GATEWAY",
                            parameters: {
                                gateway: "example",
                                gatewayMerchantId: "exampleGatewayMerchantId",
                            },
                        },
                    },
                ],
                merchantInfo: {
                    merchantId: "12345678901234567890",
                    merchantName: "Demo Merchant",
                },
                transactionInfo: {
                    totalPriceStatus: "FINAL",
                    totalPriceLabel: "Total",
                    totalPrice: "100.00",
                    currencyCode: "USD",
                    countryCode: "US",
                },
            }}
            onLoadPaymentData={(paymentRequest) => {
                console.log("load payment data", paymentRequest);
            }}
        />
    );
}
