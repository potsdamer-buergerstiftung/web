"use server";

import createMollieClient, { Locale, SequenceType } from "@mollie/api-client";

const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });

export type DonationPaymentMethod = {
  id: string;
  description: string;
};

export async function getDonationPaymentMethods(
  duration: "ONE_TIME" | "RECURRING",
): Promise<DonationPaymentMethod[]> {
  const methods = await mollieClient.methods.list({
    locale: Locale.de_DE,
    sequenceType:
      duration === "ONE_TIME" ? SequenceType.oneoff : SequenceType.first,
  });

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
