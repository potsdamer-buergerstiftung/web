import createMollieClient, { Locale, SequenceType } from "@mollie/api-client";
import { NextResponse } from "next/server";

const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });

export async function POST(request: Request) {
  const { duration } = await request.json();

  const methods = await mollieClient.methods.list({
    locale: Locale.de_DE,
    sequenceType:
      duration === "ONE_TIME" ? SequenceType.oneoff : SequenceType.first,
  });

  const rawMethods =
    (methods as any)?._embedded?.methods ??
    (Array.isArray(methods) ? methods : []) ??
    [];

  const simplified = rawMethods
    .filter((m: any) => m && m.id)
    .map((m: any) => ({
      id: String(m.id),
      description: String(m.description ?? m.id),
    }));

  return NextResponse.json(simplified);
}
