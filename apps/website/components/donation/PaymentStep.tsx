import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@components/ui/field";
import { StepTitle } from "./StepTitle";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import { useFormContext } from "react-hook-form";
import type { DonationFormValues } from "./form";
import type { DonationPaymentMethod } from "@lib/data/donation";

type PaymentStepProps = {
  methods: DonationPaymentMethod[];
};

export function PaymentStep({ methods }: PaymentStepProps) {
  const { setValue, watch } = useFormContext<DonationFormValues>();
  const paymentMethodId = watch("paymentMethodId") ?? methods[0]?.id ?? "";

  return (
    <div>
      <StepTitle
        title="Zahlung bestätigen"
        description="Wir unterstützen neuerdings auch die Zahlung durch elektronische SEPA-Lastschrift, sodass Du das Mandat nicht mehr schriftlich erteilen musst."
        className="mb-8"
      />
      <div className="grid grid-cols-3 gap-10">
        <img src="/img/payment.svg" className="col-span-1" />
        <FieldGroup className="col-span-2">
          <RadioGroup
            value={paymentMethodId}
            onValueChange={(value) =>
              setValue("paymentMethodId", value, { shouldDirty: true })
            }
            className="flex flex-row flex-wrap"
          >
            {methods.map((method) => (
              <FieldLabel
                key={method.id}
                htmlFor={`payment-method-${method.id}`}
                className="w-fit!"
              >
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>{method.description}</FieldTitle>
                  </FieldContent>
                  <RadioGroupItem
                    value={method.id}
                    id={`payment-method-${method.id}`}
                  />
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        </FieldGroup>
      </div>
    </div>
  );
}
