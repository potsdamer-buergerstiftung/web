import { DonationDuration, listAvailablePaymentMethods } from "@/lib/data/donation";
import createMollieClient, { Locale, SequenceType } from "@mollie/api-client";
import { NextResponse } from "next/server";
import { z } from "zod";

const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });

const schema = z.object({
  duration: z.enum(["ONE_TIME", "RECURRING"]),
});

export async function POST(request: Request) {
  const json = await request.json();
  const { duration } = schema.parse(json);

  const donationDuration = duration === "ONE_TIME" ? DonationDuration.ONE_TIME : DonationDuration.RECURRING;

  const methods = await listAvailablePaymentMethods(donationDuration);

  return NextResponse.json(methods);
}
