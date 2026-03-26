import {
    Field,
    FieldContent,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
    FieldTitle,
} from "@components/ui/field";
import { StepTitle } from "./StepTitle";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import { useFormContext } from "react-hook-form";
import type { DonationFormValues } from "./form";
import type { DonationPaymentMethod } from "@lib/data/donation";
import { BuildingLibraryIcon, CreditCardIcon } from "@heroicons/react/24/solid";
import GooglePayButton from '@google-pay/button-react';
import ApplePayButton from 'apple-pay-button';

type PaymentStepProps = {
    methods: DonationPaymentMethod[];
};

function PayPalOption() {
    return (
        <FieldLabel
            htmlFor={`payment-method-paypal`}
        >
            <Field orientation="horizontal">
                <FieldContent className="flex flex-row">
                    <div className="border border-border rounded-md p-2 mr-2">
                        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-4"><title>PayPal</title><path d="M15.607 4.653H8.941L6.645 19.251H1.82L4.862 0h7.995c3.754 0 6.375 2.294 6.473 5.513-.648-.478-2.105-.86-3.722-.86m6.57 5.546c0 3.41-3.01 6.853-6.958 6.853h-2.493L11.595 24H6.74l1.845-11.538h3.592c4.208 0 7.346-3.634 7.153-6.949a5.24 5.24 0 0 1 2.848 4.686M9.653 5.546h6.408c.907 0 1.942.222 2.363.541-.195 2.741-2.655 5.483-6.441 5.483H8.714Z" /></svg>
                    </div>
                    <FieldTitle>PayPal</FieldTitle>
                </FieldContent>
                <RadioGroupItem
                    value="paypal"
                    id={`payment-method-paypal`}
                />
            </Field>
        </FieldLabel>
    )
}

function CreditCardOption() {
    return (
        <FieldLabel
            htmlFor={`payment-method-creditcard`}
        >
            <Field orientation="horizontal">
                <FieldContent className="flex flex-row">
                    <div className="border border-border rounded-md p-2 mr-2">
                        <CreditCardIcon className="size-4" />
                    </div>
                    <FieldTitle>Kredit-/Debitkarte</FieldTitle>
                </FieldContent>
                <RadioGroupItem
                    value="creditcard"
                    id={`payment-method-creditcard`}
                />
            </Field>
        </FieldLabel>
    )
}

function GooglePayOption() {
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
                        type: 'CARD',
                        parameters: {
                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                            allowedCardNetworks: ['MASTERCARD', 'VISA'],
                        },
                        tokenizationSpecification: {
                            type: 'PAYMENT_GATEWAY',
                            parameters: {
                                gateway: 'example',
                                gatewayMerchantId: 'exampleGatewayMerchantId',
                            },
                        },
                    },
                ],
                merchantInfo: {
                    merchantId: '12345678901234567890',
                    merchantName: 'Demo Merchant',
                },
                transactionInfo: {
                    totalPriceStatus: 'FINAL',
                    totalPriceLabel: 'Total',
                    totalPrice: '100.00',
                    currencyCode: 'USD',
                    countryCode: 'US',
                },
            }}
            onLoadPaymentData={paymentRequest => {
                console.log('load payment data', paymentRequest);
            }}
        />
    )
}

function ApplePayOption() {
    const onClick = () => {

    };

    return (
        <ApplePayButton
            onClick={onClick}
            style={{ width: '100%', borderRadius: '10px', height: "40px" }}
            type="donate"
        />
    )
}

function PayByBankOption() {
    return (
        <FieldLabel
            htmlFor={`payment-method-banktransfer`}
        >
            <Field orientation="horizontal">
                <FieldContent className="flex flex-row">
                    <div className="border border-border rounded-md p-2 mr-2">
                        <BuildingLibraryIcon className="size-4" />
                    </div>
                    <FieldTitle>Sofortüberweisung</FieldTitle>
                </FieldContent>
                <RadioGroupItem
                    value="banktransfer"
                    id={`payment-method-banktransfer`}
                />
            </Field>
        </FieldLabel>
    )
}

export function PaymentStep({ methods }: PaymentStepProps) {
    const { setValue, watch } = useFormContext<DonationFormValues>();
    const paymentMethodId = watch("paymentMethodId") ?? methods[0]?.id ?? "";

    return (
        <div>
            <StepTitle
                title="Zahlung bestätigen"
                description="Deine Zahlung wird durch unseren Partner Mollie B.V. sicher und verschlüsselt abgewickelt."
                className="mb-8"
            />
            <div className="max-w-sm">
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend>Schnell spenden</FieldLegend>
                        <div className="w-full flex flex-col">
                            <GooglePayOption />
                            <ApplePayOption />
                        </div>
                    </FieldSet>
                    <FieldSet>
                        <FieldLegend>Weitere Zahlungsoptionen</FieldLegend>
                        <RadioGroup
                            value={paymentMethodId}
                            onValueChange={(value) =>
                                setValue("paymentMethodId", value, { shouldDirty: true })
                            }
                        >
                            {methods.map((method) => {
                                console.log(method)
                                switch (method.id) {
                                    case "paypal":
                                        return <PayPalOption key="paypal" />
                                    case "creditcard":
                                        return <CreditCardOption key="creditcard" />
                                    case "paybybank":
                                        return <PayByBankOption key="paybybank" />
                                    default:
                                        return null
                                }
                            })}
                        </RadioGroup>
                    </FieldSet>
                </FieldGroup>
            </div>
        </div>
    );
}
