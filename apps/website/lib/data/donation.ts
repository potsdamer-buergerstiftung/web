"use server";

import { Locale, MandateMethod, SequenceType } from "@mollie/api-client";
import { mollieClient } from "./mollie";

export type DonationPaymentMethod = {
  id: string;
  description: string;
};

export enum DonationDuration {
  ONE_TIME = "oneTime",
  RECURRING = "recurring",
}

export type DonationPaymentInput = {
  amountValue: number;
  paymentMethodId: "creditcard" | "paypal" | "paybybank" | "directdebit";
  isRecurring: boolean;
  customerId?: string;
  returnUrl: string;
  webhookUrl: string;
  metadata: Record<string, unknown>;
};

export type DonationPaymentResult = {
  id: string;
  status: string;
  amount: unknown;
  mandateId?: string;
  checkoutUrl?: string;
};

export async function listAvailablePaymentMethods(
  forDuration: DonationDuration
): Promise<DonationPaymentMethod[]> {
  const sequenceType = forDuration === DonationDuration.ONE_TIME ? SequenceType.oneoff : SequenceType.recurring;

  console.log(`Fetching available payment methods for duration: ${forDuration} (sequence type: ${sequenceType})`);
  
  const methods = await mollieClient.methods.list({
    locale: Locale.de_DE,
    sequenceType
  });

  console.log("Available payment methods from Mollie API:", methods);

  const rawMethods =
    (methods as any)?._embedded?.methods ??
    (Array.isArray(methods) ? methods : []) ??
    [];

  return rawMethods
    .filter((method: any) => method && method.id)
    .map((method: any) => ({
      id: String(method.id),
      description: String(method.description ?? method.id),
    }));
}

export async function createCustomerMandate(
  customerId: string,
  consumerName: string,
  consumerAccount: string
) {
  const customer = await mollieClient.customerMandates.create({
    customerId,
    method: MandateMethod.directdebit,
    consumerAccount,
    consumerName,
  });

  return customer;
}

export async function createCustomer(firstName: string, lastName: string, email: string, organization?: string, consents?: Record<string, boolean>) {
  const customer = await mollieClient.customers.create({
    name: `${firstName} ${lastName}`,
    email,
    locale: Locale.de_DE,
    metadata: {
      organization,
      consents: consents ?? {},
    },
  });

  return customer;
}

export async function createDonationPayment(
  input: DonationPaymentInput,
): Promise<DonationPaymentResult> {
  const payment = await mollieClient.payments.create({
    amount: {
      currency: "EUR",
      value: input.amountValue.toFixed(2),
    },
    description: input.isRecurring
      ? "Regelmäßige Spende - Erster Beitrag"
      : "Spende",
    method: input.paymentMethodId,
    sequenceType: input.isRecurring ? SequenceType.first : SequenceType.oneoff,
    customerId: input.customerId,
    redirectUrl: input.returnUrl,
    webhookUrl: input.webhookUrl,
    metadata: input.metadata,
  } as any);

  return {
    id: (payment as any).id,
    status: (payment as any).status,
    amount: (payment as any).amount,
    mandateId: (payment as any).mandateId,
    checkoutUrl: typeof (payment as any).getCheckoutUrl === "function"
      ? (payment as any).getCheckoutUrl()
      : undefined,
  };
}
