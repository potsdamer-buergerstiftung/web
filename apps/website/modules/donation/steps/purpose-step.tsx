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
import { Controller } from "react-hook-form";
import { useDonationFieldId, useDonationForm } from "../form-definition";

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
  const { control } = useDonationForm();
  const purposeGroupId = useDonationFieldId("purpose");

  function SingleItem({
    item,
    ...props
  }: { item: Purpose } & ClassAttributes<HTMLLabelElement> &
    LabelHTMLAttributes<HTMLLabelElement>) {
    const itemId = useDonationFieldId(`purpose-${item.id}`);

    return (
      <FieldLabel {...props} htmlFor={itemId}>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>{item.title}</FieldTitle>
            <FieldDescription>{item.description}</FieldDescription>
          </FieldContent>
          <RadioGroupItem value={item.id} id={itemId} />
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
              id={purposeGroupId}
              onValueChange={field.onChange}
              className="grid grid-cols-1 md:grid-cols-2"
            >
              {generalPurposeAvailable && (
                <SingleItem
                  item={{
                    id: "general",
                    title: "Allgemeine Arbeit",
                    description:
                      "Wir setzen deinen Beitrag genau da ein, wo er gerade am meisten gebraucht wird.",
                  }}
                  className="md:col-span-2 lg:col-span-2"
                />
              )}
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
