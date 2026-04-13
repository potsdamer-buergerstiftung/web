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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { StepTitle } from "./step-title";
import { Controller, useFormContext } from "react-hook-form";
import type { DonationFormValues } from "../form-definition";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

export function AmountStep() {
  const { setValue, watch, control } = useFormContext<DonationFormValues>();
  const interval = watch("interval") ?? "monthly";
  const amountPreset = watch("amountPreset") ?? "10.00";
  const amountCustom = watch("amountCustom") ?? "";
  const wantsReceipt = watch("wantsReceipt") ?? false;
  const amountValue =
    amountPreset === "custom"
      ? Number.parseFloat(amountCustom)
      : Number.parseFloat(amountPreset);
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
      <FieldGroup className="max-w-sm">
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Intervall</FieldLegend>
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
          </FieldSet>
        </FieldGroup>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Betrag</FieldLegend>
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
              <FieldLabel htmlFor="custom" className="w-fit!">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>Anderer Betrag</FieldTitle>
                  </FieldContent>
                  <RadioGroupItem value="custom" id="custom" />
                </Field>
              </FieldLabel>
            </RadioGroup>
            {amountPreset === "custom" && (
              <Controller
                name="amountCustom"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="amountCustom">Betrag in Euro</FieldLabel>
                    <InputGroup className="mt-2 h-12 rounded-md">
                      <InputGroupAddon>
                        <InputGroupText>€</InputGroupText>
                      </InputGroupAddon>
                      <InputGroupInput
                        {...field}
                        id="amountCustom"
                        type="number"
                        step="1"
                        min="1"
                        placeholder="0.00"
                        className="h-full px-4 text-base"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupText>EUR</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}
          </FieldSet>
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
      </FieldGroup>
    </div>
  );
}
