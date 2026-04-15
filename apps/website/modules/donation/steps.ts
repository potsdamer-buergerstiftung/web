"use client";

import { defineStepper } from "@stepperize/react";
import {
  createContext,
  createElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";

function createDonationStepper() {
  return defineStepper(
    {
      id: "purpose",
      title: "Verwendungszweck",
      description: "Description for step 1",
    },
    {
      id: "amount",
      title: "Betrag",
      description: "Description for step 1",
    },
    {
      id: "personal-data",
      title: "Persönliche Daten",
      description: "Description for step 2",
    },
    {
      id: "payment",
      title: "Zahlung bestätigen",
      description: "Description for step 3",
    },
  );
}

type DonationStepperValue = ReturnType<typeof createDonationStepper>;

const DonationStepperContext = createContext<DonationStepperValue | undefined>(
  undefined,
);

export function DonationStepperProvider({ children }: { children: ReactNode }) {
  const donationStepper = useMemo(() => createDonationStepper(), []);
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
