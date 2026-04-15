import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { StepTitle } from "../step-title";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useController } from "react-hook-form";
import { useDonationFieldId, useDonationForm } from "../../form-definition";
import type { DonationPaymentMethod } from "@/lib/data/donation";
import { CreditCardIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { Badge } from "@/components/ui/badge";
/* import { GooglePayOption } from "./google-pay";
import { ApplePayOption } from "./apple-pay"; */
import { PayPalOption } from "./paypal";
import { PayByBankOption } from "./pay-by-bank";
import { DirectDebitOption } from "./direct-debit";

type PaymentStepProps = {
  methods: DonationPaymentMethod[];
};

function CreditCardOption({ inputId }: { inputId: string }) {
  return (
    <FieldLabel htmlFor={inputId}>
      <Field orientation="horizontal">
        <FieldContent className="flex flex-row">
          <div className="border border-border rounded-md p-2 mr-2">
            <CreditCardIcon className="size-4" />
          </div>
          <FieldTitle>Kredit-/Debitkarte</FieldTitle>
        </FieldContent>
        <RadioGroupItem value="creditcard" id={inputId} />
      </Field>
    </FieldLabel>
  );
}

export function PaymentStep({ methods }: PaymentStepProps) {
  const { control } = useDonationForm();
  const paypalId = useDonationFieldId("payment-paypal");
  const creditcardId = useDonationFieldId("payment-creditcard");
  const banktransferId = useDonationFieldId("payment-banktransfer");
  const directdebitId = useDonationFieldId("payment-directdebit");
  const { field: paymentMethodField } = useController({
    name: "paymentMethodId",
    control,
  });
  const paymentMethodId = paymentMethodField.value ?? methods[0]?.id ?? "";

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
          {/* <FieldSet>
            <FieldLegend>Schnell spenden</FieldLegend>
            <div className="w-full flex flex-col">
              <GooglePayOption />
              <ApplePayOption />
            </div>
          </FieldSet> */}
          <FieldSet>
            <FieldLegend>Weitere Zahlungsoptionen</FieldLegend>
            <RadioGroup
              value={paymentMethodId}
              onValueChange={paymentMethodField.onChange}
            >
              {methods.map((method) => {
                switch (method.id) {
                  case "paypal":
                    return <PayPalOption key="paypal" inputId={paypalId} />;
                  case "creditcard":
                    return (
                      <CreditCardOption
                        key="creditcard"
                        inputId={creditcardId}
                      />
                    );
                  case "paybybank":
                    return (
                      <PayByBankOption
                        key="paybybank"
                        inputId={banktransferId}
                      />
                    );
                  case "directdebit":
                    return (
                      <DirectDebitOption
                        key="directdebit"
                        inputId={directdebitId}
                      />
                    );
                  default:
                    return null;
                }
              })}
            </RadioGroup>
          </FieldSet>
        </FieldGroup>
      </div>
    </div>
  );
}
