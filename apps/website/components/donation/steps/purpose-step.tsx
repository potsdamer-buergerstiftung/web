import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ClassAttributes, LabelHTMLAttributes } from "react";
import { StepTitle } from "./step-title";
import { Controller, useFormContext } from "react-hook-form";
import type { DonationFormValues } from "../form-definition";

interface Purpose {
  id: string;
  title: string;
  description?: string;
}

interface PurposeStepProps {
  generalPurposeAvailable?: boolean;
  items: Purpose[];
}

export function PurposeStep({
  generalPurposeAvailable = true,
  items,
}: PurposeStepProps) {
  const { control } = useFormContext<DonationFormValues>();

  function SingleItem({
    item,
    ...props
  }: { item: Purpose } & ClassAttributes<HTMLLabelElement> &
    LabelHTMLAttributes<HTMLLabelElement>) {
    return (
      <FieldLabel {...props} htmlFor={item.id}>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>{item.title}</FieldTitle>
            <FieldDescription>{item.description}</FieldDescription>
          </FieldContent>
          <RadioGroupItem value={item.id} id={item.id} />
        </Field>
      </FieldLabel>
    );
  }

  return (
    <FieldGroup>
      <StepTitle
        title="Verwendungszweck"
        description="Du kannst mit Deiner Spende ein bestimmtes Projekt oder die allgemeine Arbeit der Stiftung unterstützen."
        className="mb-8"
      />
      <Controller
        name="purposeId"
        control={control}
        render={({ field }) => (
          <Field>
            <RadioGroup
              {...field}
              onValueChange={field.onChange}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              <SingleItem
                item={{
                  id: "general",
                  title: "Allgemeine Arbeit",
                  description:
                    "Wir setzen deinen Beitrag genau da ein, wo er gerade am meisten gebraucht wird.",
                }}
                className="md:col-span-2 lg:col-span-3"
              />
              {items.map((item) => (
                <SingleItem key={item.id} item={item} />
              ))}
            </RadioGroup>
          </Field>
        )}
      />
    </FieldGroup>
  );
}
