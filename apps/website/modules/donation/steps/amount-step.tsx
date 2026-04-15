import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { StepTitle } from "./step-title";
import { useController } from "react-hook-form";
import {
  useDonationFieldId,
  useDonationForm,
  type DonationFormValues,
} from "../form-definition";
import { useDonation } from "../donation-context";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

function IntervalField() {
  const { control } = useDonationForm();
  const { config } = useDonation();
  const onceId = useDonationFieldId("interval-once");
  const monthlyId = useDonationFieldId("interval-monthly");
  const yearlyId = useDonationFieldId("interval-yearly");
  const { field } = useController({ name: "interval", control });
  const configuredIntervals = config.allowedIntervals ?? ["once", "monthly", "yearly"];
  const intervalOptions = [
    { value: "once" as const, title: "Einmalig", id: onceId },
    { value: "monthly" as const, title: "Monatlich", id: monthlyId },
    { value: "yearly" as const, title: "Jährlich", id: yearlyId },
  ].filter((option) => configuredIntervals.includes(option.value));
  const hasSingleAllowedInterval = intervalOptions.length === 1;
  const fallbackValue = intervalOptions[0]?.value ?? "monthly";
  const value = intervalOptions.some((option) => option.value === field.value)
    ? field.value
    : fallbackValue;

  useEffect(() => {
    if (field.value !== value) {
      field.onChange(value);
    }
  }, [field, value]);

  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Intervall</FieldLegend>
        <RadioGroup
          value={value}
          onValueChange={(next) =>
            field.onChange(next as DonationFormValues["interval"])
          }
          disabled={hasSingleAllowedInterval}
          className="flex flex-row flex-wrap"
        >
          {intervalOptions.map((option) => (
            <FieldLabel key={option.value} htmlFor={option.id} className="w-fit!">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>{option.title}</FieldTitle>
                </FieldContent>
                <RadioGroupItem value={option.value} id={option.id} />
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
      </FieldSet>
    </FieldGroup>
  );
}

function AmountCustomField() {
  const { control } = useDonationForm();
  const amountCustomId = useDonationFieldId("amount-custom");
  const { field, fieldState } = useController({
    name: "amountCustom",
    control,
  });

  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={amountCustomId}>Betrag in Euro</FieldLabel>
      <InputGroup className="mt-2 h-12 rounded-md">
        <InputGroupAddon>
          <InputGroupText>€</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          {...field}
          value={field.value ?? ""}
          id={amountCustomId}
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
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}

function AmountPresetField() {
  const { control } = useDonationForm();
  const { config } = useDonation();
  const amountFieldIdPrefix = useDonationFieldId("amount");
  const amountCustomPresetId = useDonationFieldId("amount-custom-preset");
  const { field } = useController({ name: "amountPreset", control });
  const amountOptions = (config.allowedAmounts ?? [10, 25, 50, 100]).map(
    (amount) => ({
      value: `${amount.toFixed(2)}`,
      label: `${amount}€`,
      id: `${amountFieldIdPrefix}-${amount}`,
    }),
  );
  const allowCustomAmount = config.allowCustomAmount ?? false;
  const hasSingleAllowedAmount = amountOptions.length === 1;
  const disableAmountSelection = hasSingleAllowedAmount && !allowCustomAmount;
  const fallbackValue = amountOptions[0]?.value ?? "10.00";
  const value =
    field.value === "custom" && allowCustomAmount
      ? field.value
      : amountOptions.some((option) => option.value === field.value)
        ? field.value
        : fallbackValue;

  useEffect(() => {
    if (field.value !== value) {
      field.onChange(value);
    }
  }, [field, value]);

  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Betrag</FieldLegend>
        <RadioGroup
          value={value}
          onValueChange={(next) =>
            field.onChange(next as DonationFormValues["amountPreset"])
          }
          disabled={disableAmountSelection}
          className="flex flex-row flex-wrap"
        >
          {amountOptions.map((option) => (
            <FieldLabel key={option.value} htmlFor={option.id} className="w-fit!">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>{option.label}</FieldTitle>
                </FieldContent>
                <RadioGroupItem value={option.value} id={option.id} />
              </Field>
            </FieldLabel>
          ))}
          {allowCustomAmount && (
            <FieldLabel htmlFor={amountCustomPresetId} className="w-fit!">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Anderer Betrag</FieldTitle>
                </FieldContent>
                <RadioGroupItem value="custom" id={amountCustomPresetId} />
              </Field>
            </FieldLabel>
          )}
        </RadioGroup>
        {allowCustomAmount && value === "custom" && <AmountCustomField />}
      </FieldSet>
    </FieldGroup>
  );
}

function ReceiptField() {
  const { control } = useDonationForm();
  const wantsReceiptId = useDonationFieldId("wants-receipt");
  const { field: amountPresetField } = useController({
    name: "amountPreset",
    control,
  });
  const { field: amountCustomField } = useController({
    name: "amountCustom",
    control,
  });
  const { field: wantsReceiptField } = useController({
    name: "wantsReceipt",
    control,
  });

  const amountPreset = amountPresetField.value ?? "10.00";
  const amountCustom = amountCustomField.value ?? "";
  const wantsReceipt = Boolean(wantsReceiptField.value);
  const onWantsReceiptChange = wantsReceiptField.onChange;
  const amountValue =
    amountPreset === "custom"
      ? Number.parseFloat(amountCustom)
      : Number.parseFloat(amountPreset);
  const showReceiptOption = !Number.isNaN(amountValue) && amountValue >= 50;

  useEffect(() => {
    if (!showReceiptOption && wantsReceipt) {
      onWantsReceiptChange(false);
    }
  }, [onWantsReceiptChange, showReceiptOption, wantsReceipt]);

  if (!showReceiptOption) {
    return null;
  }

  return (
    <FieldGroup>
      <Field orientation="horizontal">
        <Checkbox
          id={wantsReceiptId}
          checked={wantsReceipt}
          onCheckedChange={(checked) => onWantsReceiptChange(Boolean(checked))}
        />
        <FieldLabel htmlFor={wantsReceiptId}>
          Ich möchte eine Spendenbescheinigung erhalten
        </FieldLabel>
      </Field>
    </FieldGroup>
  );
}

export function AmountStep() {
  return (
    <div>
      <StepTitle
        title="Betrag wählen"
        description="Jeder Euro zählt. Ab einer Spende von 50€ stellen wir Dir gerne eine Spendenbescheinigung aus."
        className="mb-8"
      />
      <FieldGroup className="max-w-sm">
        <IntervalField />
        <FieldGroup>
          <AmountPresetField />
          <ReceiptField />
        </FieldGroup>
      </FieldGroup>
    </div>
  );
}
