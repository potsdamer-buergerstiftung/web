"use client";

import { defineStepper } from "@stepperize/react";
import {
  createContext,
  createElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";

function createDonationStepper(
  fixedPurposeSet: boolean,
  amountStepDisabled: boolean,
) {
  let steps: Array<{ id: string; title: string; }> = [];

  if (!fixedPurposeSet) {
    steps = [
      {
        id: "purpose",
        title: "Verwendungszweck",
      },
    ];
  }

  if (!amountStepDisabled) {
    steps = [
      ...steps,
      {
        id: "amount",
        title: "Betrag",
      },
    ];
  }

  steps = [
    ...steps,
    {
      id: "personal-data",
      title: "Persönliche Daten",
    },
    {
      id: "payment",
      title: "Zahlung bestätigen",
    },
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
