"use client";

import { useDonationStepper } from "./steps";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDonationForm } from "./form-definition";
import { useWatch } from "react-hook-form";

interface DonationActionsProps {
  className?: string;
  nextLabel?: string;
  prevLabel?: string;
}

export function DonationActions({
  className,
  nextLabel = "Weiter",
  prevLabel = "Zurück",
}: DonationActionsProps) {
  const { useStepper, Stepper } = useDonationStepper();
  const { control, getValues } = useDonationForm();
  const stepper = useStepper();
  const watchedValues = useWatch({ control });
  const values = watchedValues ?? getValues();
  const currentStepId = stepper.state.current?.data?.id;
  const currentSchema = currentStepId
    ? stepper.lookup.get(currentStepId)?.schema ?? stepper.state.current?.data?.schema
    : stepper.state.current?.data?.schema;
  const currentStepValidation = currentSchema
    ? currentSchema.safeParse(values)
    : { success: true as const };
  const isCurrentStepValid = currentStepValidation.success;

  return (
    <Stepper.Actions className={cn("flex gap-2", className)}>
      {!stepper.state.isFirst && (
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            stepper.navigation.prev();
          }}
        >
          {prevLabel}
        </Button>
      )}
      {stepper.state.isLast ? (
        <Button
          type="submit"
          data-donation-submit="true"
          disabled={!isCurrentStepValid}
          size="lg"
        >
          Jetzt spenden
        </Button>
      ) : (
        <Button
          type="button"
          disabled={!isCurrentStepValid}
          size="lg"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            stepper.navigation.next();
          }}
        >
          {nextLabel}
        </Button>
      )}
    </Stepper.Actions>
  );
}
