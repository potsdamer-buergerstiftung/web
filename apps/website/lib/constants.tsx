import React from "react";
import { CreditCard } from "@medusajs/icons";

import PayPal from "@/modules/common/icons/paypal";

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<
  string,
  { title: string; icon: React.JSX.Element }
> = {
  "pp_mollie-card_mollie": {
    title: "Kreditkarte",
    icon: <CreditCard />,
  },
  "pp_mollie-paypal_mollie": {
    title: "PayPal",
    icon: <PayPal />,
  },
  pp_system_default: {
    title: "Manual Payment",
    icon: <CreditCard />,
  },
  // Add more payment providers here
};

// This only checks if it is native stripe or medusa payments for card payments, it ignores the other stripe-based providers
export const isStripeLike = (providerId?: string) => {
  return (
    providerId?.startsWith("pp_stripe_") || providerId?.startsWith("pp_medusa-")
  );
};

export const isPaypal = (providerId?: string) => {
  return providerId?.startsWith("pp_mollie-paypal_mollie");
};
export const isManual = (providerId?: string) => {
  return providerId?.startsWith("pp_system_default");
};

// Add currencies that don't need to be divided by 100
export const noDivisionCurrencies = [
  "krw",
  "jpy",
  "vnd",
  "clp",
  "pyg",
  "xaf",
  "xof",
  "bif",
  "djf",
  "gnf",
  "kmf",
  "mga",
  "rwf",
  "xpf",
  "htg",
  "vuv",
  "xag",
  "xdr",
  "xau",
];
