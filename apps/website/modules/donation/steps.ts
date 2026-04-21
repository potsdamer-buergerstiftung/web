"use client";

import { defineStepper } from "@stepperize/react";
import {
  createContext,
  createElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import {
  amountStepSchema,
  paymentStepSchema,
  personalDataStepSchema,
  purposeStepSchema,
} from "./form-definition";

type StepSchema = {
  safeParse: (values: unknown) => { success: boolean };
};

type DonationStep = {
  id: string;
  title: string;
  schema: StepSchema;
  data: {
    schema: StepSchema;
  };
};

function createStep(id: string, title: string, schema: StepSchema): DonationStep {
  return {
    id,
    title,
    schema,
    data: {
      schema,
    },
  };
}

function createDonationStepper(
  fixedPurposeSet: boolean,
  amountStepDisabled: boolean,
) {
  let steps: DonationStep[] = [];

  if (!fixedPurposeSet) {
    steps = [
      createStep("purpose", "Verwendungszweck", purposeStepSchema),
    ];
  }

  if (!amountStepDisabled) {
    steps = [
      ...steps,
      createStep("amount", "Betrag", amountStepSchema),
    ];
  }

  steps = [
    ...steps,
    createStep("personal-data", "Persönliche Daten", personalDataStepSchema),
    createStep("payment", "Zahlung bestätigen", paymentStepSchema),
  ];

  return defineStepper(...steps);
}

type DonationStepperValue = ReturnType<typeof createDonationStepper>;

const DonationStepperContext = createContext<DonationStepperValue | undefined>(
  undefined,
);

export function DonationStepperProvider({
  children,
  fixedPurposeSet = false,
  amountStepDisabled = false,
}: {
  children: ReactNode;
  fixedPurposeSet?: boolean;
  amountStepDisabled?: boolean;
}) {
  const donationStepper = useMemo(
    () => createDonationStepper(fixedPurposeSet, amountStepDisabled),
    [fixedPurposeSet, amountStepDisabled],
  );
  const { Scoped } = donationStepper;

  return createElement(
    DonationStepperContext.Provider,
    { value: donationStepper },
    createElement(Scoped, null, children),
  );
}

export function useDonationStepper() {
  const donationStepper = useContext(DonationStepperContext);
  if (!donationStepper) {
    throw new Error(
      "useDonationStepper must be used within a DonationStepperProvider",
    );
  }
  return donationStepper;
}
