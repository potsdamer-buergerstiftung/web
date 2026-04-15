"use client";

import { DonationConfig, DonationProvider } from "./donation-context";
import { DonationProgressIndicator } from "./donation-progress";
import { DonationSteps } from "./donation-steps-content";
import { DonationActions } from "./donation-actions";

interface DonationFormProps {
  config?: DonationConfig;
}

export function DonationForm({ config }: DonationFormProps) {
  return (
    <DonationProvider config={config}>
      <div className="flex flex-col lg:flex-row gap-10">
        <DonationProgressIndicator className="w-48 shrink-0" />
        <div className="flex-1 flex flex-col gap-8">
          <DonationSteps />
          <DonationActions />
        </div>
      </div>
    </DonationProvider>
  );
}
