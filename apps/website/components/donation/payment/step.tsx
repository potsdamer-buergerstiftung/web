import {
    Field,
    FieldContent,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field";
import { StepTitle } from "../StepTitle";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";
import type { DonationFormValues } from "../form";
import type { DonationPaymentMethod } from "@/lib/data/donation";
import {
    CreditCardIcon,
    LockClosedIcon,
} from "@heroicons/react/24/solid";
import { Badge } from "@/components/ui/badge";
import { GooglePayOption } from "./google-pay";
import { ApplePayOption } from "./apple-pay";
import { PayPalOption } from "./paypal";
import { PayByBankOption } from "./pay-by-bank";
import { DirectDebitOption } from "./direct-debit";

type PaymentStepProps = {
    methods: DonationPaymentMethod[];
};

function CreditCardOption() {
    return (
        <FieldLabel htmlFor={`payment-method-creditcard`}>
            <Field orientation="horizontal">
                <FieldContent className="flex flex-row">
                    <div className="border border-border rounded-md p-2 mr-2">
                        <CreditCardIcon className="size-4" />
                    </div>
                    <FieldTitle>Kredit-/Debitkarte</FieldTitle>
                </FieldContent>
                <RadioGroupItem value="creditcard" id={`payment-method-creditcard`} />
            </Field>
        </FieldLabel>
    );
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
            <div className="mb-6 flex flex-col gap-2 text-sm text-muted-foreground">
                <Badge className="bg-emerald-700">
                    <LockClosedIcon className="size-3" />
                    Sichere Zahlung
                </Badge>
            </div>
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
                                console.log(method);
                                switch (method.id) {
                                    case "paypal":
                                        return <PayPalOption key="paypal" />;
                                    case "creditcard":
                                        return <CreditCardOption key="creditcard" />;
                                    case "paybybank":
                                        return <PayByBankOption key="paybybank" />;
                                    default:
                                        return null;
                                }
                            })}
                            <DirectDebitOption key="directdebit" />
                        </RadioGroup>
                    </FieldSet>
                </FieldGroup>
            </div>
        </div>
    );
}
