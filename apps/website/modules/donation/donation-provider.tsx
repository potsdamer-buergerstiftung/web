"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  DonationFormProvider,
  DonationFormValues,
  useDonationForm,
} from "./form-definition";
import { DonationStepperProvider } from "./steps";
import {
  DonationContext,
  DonationConfig,
  PaymentMethod,
} from "./donation-context";
import browserClient from "portal/browser";
import { readItems } from "portal/sdk";
import type { Project } from "portal/types";

export interface DonationProviderProps {
  config?: DonationConfig;
  children: ReactNode;
  defaultValues?: Partial<DonationFormValues>;
}

const defaultConfig: Required<DonationConfig> = {
  generalPurposeAvailable: true,
  fixedPurposeId: null,
  allowedIntervals: ["once", "monthly", "yearly"],
  defaultInterval: "monthly",
  allowedAmounts: [10, 25, 50, 100],
  allowCustomAmount: false,
};

async function fetchProjects() {
  const res = await browserClient.request(
    readItems("projects", {
      fields: ["id", "title", "sub_title"],
      filter: {
        status: {
          _in: ["inprogress", "recurring"],
        },
        allow_donations: {
          _eq: true,
        },
      },
    }),
  );
  return res as Project[];
}

async function fetchPaymentMethods(interval: "once" | "monthly" | "yearly") {
  const duration = interval === "once" ? "ONE_TIME" : "RECURRING";
  const res = await fetch("/api/donation/payment-methods", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ duration }),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch payment methods");
  }
  return (await res.json()) as PaymentMethod[];
}

function DonationStateProvider({
  config,
  children,
}: {
  config: Required<DonationConfig>;
  children: ReactNode;
}) {
  const { watch, setValue } = useDonationForm();
  const interval = watch("interval");
  const amountPreset = watch("amountPreset");

  const allowedIntervals = config.allowedIntervals;
  const allowedAmounts = config.allowedAmounts;

  useEffect(() => {
    if (!config.fixedPurposeId) {
      return;
    }

    setValue("purposeId", config.fixedPurposeId, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: true,
    });
  }, [config.fixedPurposeId, setValue]);

  useEffect(() => {
    const defaultInterval = config.defaultInterval;
    const hasCurrentInterval = allowedIntervals.includes(interval);
    const hasValidDefaultInterval =
      defaultInterval !== undefined && allowedIntervals.includes(defaultInterval);
    const nextInterval = hasCurrentInterval
      ? interval
      : hasValidDefaultInterval
        ? defaultInterval
        : allowedIntervals[0];

    if (interval !== nextInterval) {
      setValue("interval", nextInterval, {
        shouldDirty: false,
        shouldTouch: false,
        shouldValidate: true,
      });
    }
  }, [allowedIntervals, config.defaultInterval, interval, setValue]);

  useEffect(() => {
    const allowedPresetValues = allowedAmounts.map((amount) => `${amount.toFixed(2)}`);
    const allowCustomAmount = config.allowCustomAmount;

    const nextAmountPreset = allowCustomAmount
      ? amountPreset === "custom" || allowedPresetValues.includes(amountPreset)
        ? amountPreset
        : allowedPresetValues[0]
      : allowedPresetValues.includes(amountPreset)
        ? amountPreset
        : allowedPresetValues[0];

    if (amountPreset !== nextAmountPreset) {
      setValue("amountPreset", nextAmountPreset, {
        shouldDirty: false,
        shouldTouch: false,
        shouldValidate: true,
      });
    }

    if (!allowCustomAmount) {
      setValue("amountCustom", "", {
        shouldDirty: false,
        shouldTouch: false,
        shouldValidate: false,
      });
    }
  }, [allowedAmounts, amountPreset, config.allowCustomAmount, setValue]);

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [paymentMethodsLoading, setPaymentMethodsLoading] = useState(false);
  const [paymentMethodsError, setPaymentMethodsError] = useState<string | null>(
    null,
  );

  // Initial project fetch
  useEffect(() => {
    fetchProjects()
      .then((data) => {
        setProjects(data);
        setProjectsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setProjectsError("Projekte konnten nicht geladen werden.");
        setProjectsLoading(false);
      });
  }, []);

  // Payment methods fetch on interval change
  useEffect(() => {
    setPaymentMethodsLoading(true);
    fetchPaymentMethods(interval)
      .then((data) => {
        console.log("Fetched payment methods:", data);
        setPaymentMethods(data);
        setPaymentMethodsError(null);
        setPaymentMethodsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch payment methods:", err);
        setPaymentMethodsError("Zahlungsarten konnten nicht geladen werden.");
        setPaymentMethodsLoading(false);
      });
  }, [interval]);

  const projectsState = {
    projects,
    projectsLoading,
    projectsError,
  };

  const paymentMethodsState = {
    methods: paymentMethods,
    loading: paymentMethodsLoading,
    error: paymentMethodsError,
  };

  return (
    <DonationContext.Provider
      value={{
        config,
        projects: projectsState,
        paymentMethods: paymentMethodsState,
      }}
    >
      {children}
    </DonationContext.Provider>
  );
}

export function DonationProvider({
  config,
  children,
  defaultValues,
}: DonationProviderProps) {
  const resolvedConfig: Required<DonationConfig> = {
    ...defaultConfig,
    ...config,
  };

  const amountStepDisabled =
    resolvedConfig.allowedIntervals.length === 1 &&
    resolvedConfig.allowedAmounts.length === 1 &&
    !resolvedConfig.allowCustomAmount;

  return (
    <DonationFormProvider
      defaultValues={{
        ...defaultValues,
      }}
    >
      <DonationStateProvider config={resolvedConfig}>
        <DonationStepperProvider
          fixedPurposeSet={Boolean(resolvedConfig.fixedPurposeId)}
          amountStepDisabled={amountStepDisabled}
        >
          {children}
        </DonationStepperProvider>
      </DonationStateProvider>
    </DonationFormProvider>
  );
}
