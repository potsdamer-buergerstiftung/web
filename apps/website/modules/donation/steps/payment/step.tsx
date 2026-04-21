import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
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
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
  const directDebitAccountHolderId = useDonationFieldId(
    "payment-directdebit-account-holder",
  );
  const directDebitIbanId = useDonationFieldId("payment-directdebit-iban");
  const directDebitMandateId = useDonationFieldId(
    "payment-directdebit-mandate",
  );
  const { field: paymentMethodField } = useController({
    name: "paymentMethodId",
    control,
  });
  const {
    field: directDebitAccountHolderField,
    fieldState: directDebitAccountHolderState,
  } = useController({
    name: "directDebitAccountHolder",
    control,
  });
  const {
    field: directDebitIbanField,
    fieldState: directDebitIbanState,
  } = useController({
    name: "directDebitIban",
    control,
  });
  const {
    field: directDebitMandateField,
    fieldState: directDebitMandateState,
  } = useController({
    name: "directDebitMandateAccepted",
    control,
  });

  useEffect(() => {
    const hasCurrentMethod = methods.some(
      (method) => method.id === paymentMethodField.value,
    );

    if (!hasCurrentMethod && methods[0]?.id) {
      paymentMethodField.onChange(methods[0].id);
    }
  }, [methods, paymentMethodField]);

  const paymentMethodId = paymentMethodField.value ?? methods[0]?.id ?? "";
  const showDirectDebitFields = paymentMethodId === "directdebit";

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
          {showDirectDebitFields && (
            <FieldSet className="mb-10">
              <FieldLegend>SEPA-Lastschriftmandat</FieldLegend>
              <FieldGroup>
                <Field data-invalid={directDebitAccountHolderState.invalid}>
                  <FieldLabel htmlFor={directDebitAccountHolderId}>
                    Kontoinhaber (Erforderlich)
                  </FieldLabel>
                  <Input
                    {...directDebitAccountHolderField}
                    value={directDebitAccountHolderField.value ?? ""}
                    id={directDebitAccountHolderId}
                    type="text"
                    placeholder="Kontoinhaber"
                    aria-invalid={directDebitAccountHolderState.invalid}
                  />
                  {directDebitAccountHolderState.invalid && (
                    <FieldError errors={[directDebitAccountHolderState.error]} />
                  )}
                </Field>
                <Field data-invalid={directDebitIbanState.invalid}>
                  <FieldLabel htmlFor={directDebitIbanId}>
                    IBAN (Erforderlich)
                  </FieldLabel>
                  <Input
                    {...directDebitIbanField}
                    value={directDebitIbanField.value ?? ""}
                    id={directDebitIbanId}
                    type="text"
                    inputMode="text"
                    autoComplete="iban"
                    placeholder="DE00 0000 0000 0000 0000 00"
                    aria-invalid={directDebitIbanState.invalid}
                  />
                  {directDebitIbanState.invalid && (
                    <FieldError errors={[directDebitIbanState.error]} />
                  )}
                </Field>
                <Field
                  orientation="horizontal"
                  data-invalid={directDebitMandateState.invalid}
                >
                  <Checkbox
                    id={directDebitMandateId}
                    checked={Boolean(directDebitMandateField.value)}
                    onCheckedChange={(checked) =>
                      directDebitMandateField.onChange(Boolean(checked))
                    }
                    aria-invalid={directDebitMandateState.invalid}
                  />
                  <FieldContent>
                    <FieldLabel htmlFor={directDebitMandateId}>
                      Ich ermächtige die Bürgerstiftung, Zahlungen von meinem
                      Konto mittels SEPA-Lastschrift einzuziehen. Zugleich weise
                      ich mein Kreditinstitut an, die von der Bürgerstiftung
                      auf mein Konto gezogenen SEPA-Lastschriften einzulösen.
                    </FieldLabel>
                    <FieldDescription>
                      Hinweis: Ich kann innerhalb von acht Wochen, beginnend
                      mit dem Belastungsdatum, die Erstattung des belasteten
                      Betrags verlangen.
                    </FieldDescription>
                    {directDebitMandateState.invalid && (
                      <FieldError errors={[directDebitMandateState.error]} />
                    )}
                  </FieldContent>
                </Field>
              </FieldGroup>
            </FieldSet>
          )}
        </FieldGroup>
      </div>
    </div>
  );
}
