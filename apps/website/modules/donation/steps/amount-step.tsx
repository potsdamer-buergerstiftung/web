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
  const onceId = useDonationFieldId("interval-once");
  const monthlyId = useDonationFieldId("interval-monthly");
  const yearlyId = useDonationFieldId("interval-yearly");
  const { field } = useController({ name: "interval", control });
  const value = field.value ?? "monthly";

  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Intervall</FieldLegend>
        <RadioGroup
          value={value}
          onValueChange={(next) =>
            field.onChange(next as DonationFormValues["interval"])
          }
          className="flex flex-row flex-wrap"
        >
          <FieldLabel htmlFor={onceId} className="w-fit!">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Einmalig</FieldTitle>
              </FieldContent>
              <RadioGroupItem value="once" id={onceId} />
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor={monthlyId} className="w-fit!">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Monatlich</FieldTitle>
              </FieldContent>
              <RadioGroupItem value="monthly" id={monthlyId} />
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor={yearlyId} className="w-fit!">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Jährlich</FieldTitle>
              </FieldContent>
              <RadioGroupItem value="yearly" id={yearlyId} />
            </Field>
          </FieldLabel>
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
  const amount10Id = useDonationFieldId("amount-10");
  const amount50Id = useDonationFieldId("amount-50");
  const amount100Id = useDonationFieldId("amount-100");
  const amountCustomPresetId = useDonationFieldId("amount-custom-preset");
  const { field } = useController({ name: "amountPreset", control });
  const value = field.value ?? "10.00";

  return (
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Betrag</FieldLegend>
        <RadioGroup
          value={value}
          onValueChange={(next) =>
            field.onChange(next as DonationFormValues["amountPreset"])
          }
          className="flex flex-row flex-wrap"
        >
          <FieldLabel htmlFor={amount10Id} className="w-fit!">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>10€</FieldTitle>
              </FieldContent>
              <RadioGroupItem value="10.00" id={amount10Id} />
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor={amount50Id} className="w-fit!">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>50€</FieldTitle>
              </FieldContent>
              <RadioGroupItem value="50.00" id={amount50Id} />
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor={amount100Id} className="w-fit!">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>100€</FieldTitle>
              </FieldContent>
              <RadioGroupItem value="100.00" id={amount100Id} />
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor={amountCustomPresetId} className="w-fit!">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Anderer Betrag</FieldTitle>
              </FieldContent>
              <RadioGroupItem value="custom" id={amountCustomPresetId} />
            </Field>
          </FieldLabel>
        </RadioGroup>
        {value === "custom" && <AmountCustomField />}
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
