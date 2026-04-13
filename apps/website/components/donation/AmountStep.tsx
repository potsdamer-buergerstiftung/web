import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { StepTitle } from "./StepTitle";
import { useFormContext } from "react-hook-form";
import type { DonationFormValues } from "./form";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";

export function AmountStep() {
  const { setValue, watch } = useFormContext<DonationFormValues>();
  const interval = watch("interval") ?? "monthly";
  const amountPreset = watch("amountPreset") ?? "10.00";
  const wantsReceipt = watch("wantsReceipt") ?? false;
  const amountValue = Number.parseFloat(amountPreset);
  const showReceiptOption = !Number.isNaN(amountValue) && amountValue >= 50;

  useEffect(() => {
    if (!showReceiptOption && wantsReceipt) {
      setValue("wantsReceipt", false, { shouldDirty: true });
    }
  }, [setValue, showReceiptOption, wantsReceipt]);

  return (
    <div>
      <StepTitle
        title="Betrag wählen"
        description="Jeder Euro zählt. Ab einer Spende von 50€ stellen wir Dir gerne eine Spendenbescheinigung aus."
        className="mb-8"
      />
      <div className="max-w-sm">
        <FieldGroup>
          <RadioGroup
            value={interval}
            onValueChange={(value) =>
              setValue("interval", value as DonationFormValues["interval"], {
                shouldDirty: true,
              })
            }
            className="flex flex-row flex-wrap"
          >
            <FieldLabel htmlFor="once" className="w-fit!">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Einmalig</FieldTitle>
                </FieldContent>
                <RadioGroupItem value="once" id="once" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="monthly" className="w-fit!">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Monatlich</FieldTitle>
                </FieldContent>
                <RadioGroupItem value="monthly" id="monthly" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="yearly" className="w-fit!">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Jährlich</FieldTitle>
                </FieldContent>
                <RadioGroupItem value="yearly" id="yearly" />
              </Field>
            </FieldLabel>
          </RadioGroup>
          <RadioGroup
            value={amountPreset}
            onValueChange={(value) =>
              setValue(
                "amountPreset",
                value as DonationFormValues["amountPreset"],
                { shouldDirty: true },
              )
            }
            className="flex flex-row flex-wrap"
          >
            <FieldLabel htmlFor="10.00" className="w-fit!">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>10€</FieldTitle>
                </FieldContent>
                <RadioGroupItem value="10.00" id="10.00" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="50.00" className="w-fit!">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>50€</FieldTitle>
                </FieldContent>
                <RadioGroupItem value="50.00" id="50.00" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="100.00" className="w-fit!">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>100€</FieldTitle>
                </FieldContent>
                <RadioGroupItem value="100.00" id="100.00" />
              </Field>
            </FieldLabel>
          </RadioGroup>
          {showReceiptOption ? (
            <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox
                  id="wants-receipt"
                  checked={wantsReceipt}
                  onCheckedChange={(checked) =>
                    setValue("wantsReceipt", Boolean(checked), {
                      shouldDirty: true,
                    })
                  }
                />
                <FieldLabel htmlFor="wants-receipt">
                  Ich möchte eine Spendenbescheinigung erhalten
                </FieldLabel>
              </Field>
            </FieldGroup>
          ) : null}
        </FieldGroup>
      </div>
    </div>
  );
}
