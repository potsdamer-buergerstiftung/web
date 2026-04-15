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

const defaultConfig: DonationConfig = {
  generalPurposeAvailable: true,
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
  const res = await fetch("/api/payment/methods", {
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
  config: DonationConfig;
  children: ReactNode;
}) {
  const { watch } = useDonationForm();
  const interval = watch("interval");

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
  config = defaultConfig,
  children,
  defaultValues,
}: DonationProviderProps) {
  return (
    <DonationFormProvider
      defaultValues={{
        ...defaultValues,
      }}
    >
      <DonationStateProvider config={config}>
        <DonationStepperProvider>{children}</DonationStepperProvider>
      </DonationStateProvider>
    </DonationFormProvider>
  );
}
