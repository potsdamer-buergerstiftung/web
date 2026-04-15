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
