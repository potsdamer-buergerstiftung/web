import { defineStepper } from "@stepperize/react";

export const { Scoped, useStepper, steps, Stepper } = defineStepper(
  {
    id: "purpose",
    title: "Verwendungszweck",
    description: "Description for step 1",
  },
  { id: "amount", title: "Betrag", description: "Description for step 1" },
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
