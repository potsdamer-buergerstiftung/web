"use client";

import { Stepper } from "./steps";
import { PurposeStep } from "./steps/purpose-step";
import { AmountStep } from "./steps/amount-step";
import { PersonalDetailsStep } from "./steps/personal-details-step";
import { PaymentStep } from "./steps/payment";
import { useDonation } from "./donation-context";

export function DonationSteps() {
  const { config, projects, paymentMethods } = useDonation();

  return (
    <div className="flex-1 flex flex-col gap-8">
      <Stepper.Content step="purpose">
        <PurposeStep
          generalPurposeAvailable={config.generalPurposeAvailable}
          items={projects.projects.map((project) => ({
            id: project.id,
            title: project.title,
            description: project.sub_title,
          }))}
        />
      </Stepper.Content>
      <Stepper.Content step="amount">
        <AmountStep />
      </Stepper.Content>
      <Stepper.Content step="personal-data">
        <PersonalDetailsStep />
      </Stepper.Content>
      <Stepper.Content step="payment">
        <PaymentStep methods={paymentMethods.methods} />
      </Stepper.Content>
    </div>
  );
}
