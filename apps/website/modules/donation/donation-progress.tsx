"use client";

import { useDonationStepper } from "./steps";
import { cn } from "@/lib/utils";

interface DonationProgressIndicatorProps {
  className?: string;
}

export function DonationProgressIndicator({
  className,
}: DonationProgressIndicatorProps) {
  const { useStepper, Stepper } = useDonationStepper();
  const stepper = useStepper();

  return (
    <div className={cn("hidden lg:flex flex-col", className)}>
      <Stepper.List className="inline-grid grid-cols-1 justify-items-stretch">
        {stepper.state.all.map((step) => (
          <Stepper.Item key={step.id} step={step.id}>
            <Stepper.Trigger className="inline-flex w-full flex-row relative py-1.5 group hover:text-primary data-[status=active]:text-primary data-[status=inactive]:text-muted-foreground data-[status=inactive]:opacity-70">
              <Stepper.Indicator className="absolute top-1 left-1 bottom-1 w-0.5 bg-primary opacity-0 data-[status=active]:opacity-100 group-data-[status=completed]:opacity-100 group-data-[status=completed]:bg-primary/50" />
              <Stepper.Title className="pl-3 text-start text-sm font-medium data-[status=active]:text-primary group-data-[status=inactive]:text-muted-foreground">
                {step.title}
              </Stepper.Title>
            </Stepper.Trigger>
          </Stepper.Item>
        ))}
      </Stepper.List>
    </div>
  );
}
