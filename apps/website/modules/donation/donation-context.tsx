"use client";

import { createContext, useContext } from "react";
import type { Project } from "portal/types";

export interface DonationConfig {
  generalPurposeAvailable?: boolean;
  fixedPurposeId?: "general" | string;
  allowedIntervals?: ("once" | "monthly" | "yearly")[];
  defaultInterval?: "once" | "monthly" | "yearly";
  allowedAmounts?: number[];
  allowCustomAmount?: boolean;
}

export type PaymentMethod = {
  id: string;
  description: string;
};

interface ProjectsState {
  projects: Project[];
  projectsLoading: boolean;
  projectsError: string | null;
}

interface PaymentMethodsState {
  methods: PaymentMethod[];
  loading: boolean;
  error: string | null;
}

interface DonationContextValue {
  config: DonationConfig;
  projects: ProjectsState;
  paymentMethods: PaymentMethodsState;
}

export const DonationContext = createContext<DonationContextValue | undefined>(
  undefined,
);

export function useDonation() {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error("useDonation must be used within a DonationProvider");
  }
  return context;
}

export {
  DonationProvider,
  type DonationProviderProps,
} from "./donation-provider";
export { DonationProgressIndicator as DonationFormProgress } from "./donation-progress";
export { DonationActions as DonationFormActions } from "./donation-actions";
export { DonationSteps as DonationFormContent } from "./donation-steps-content";
export { DonationFormProvider } from "./form-definition";
