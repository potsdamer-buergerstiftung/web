import createMollieClient, {
  Locale,
  MandateMethod,
  SequenceType,
} from "@mollie/api-client";
import { NextResponse } from "next/server";

const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });

export async function POST(request: Request) {
  const { consumerAccount, consumerName, customerId } = await request.json();

  const customer = await mollieClient.customerMandates.create({
    customerId,
    method: MandateMethod.directdebit,
    consumerAccount,
    consumerName,
  });

  return NextResponse.json(customer);
}
