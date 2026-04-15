"use client";

import { useDonationStepper } from "./steps";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const stepper = useStepper();

  return (
    <Stepper.Actions className={cn("flex gap-2", className)}>
      {!stepper.state.isFirst && (
        <Stepper.Prev
          render={(props) => (
            <Button {...props} variant="secondary" size="lg">
              {prevLabel}
            </Button>
          )}
        />
      )}
      <Stepper.Next
        render={(props) => (
          <Button {...props} size="lg">
            {stepper.state.isLast ? "Jetzt spenden" : nextLabel}
          </Button>
        )}
      />
    </Stepper.Actions>
  );
}
