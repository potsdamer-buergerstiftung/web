import { z } from "zod";
import { createCustomer } from "@/lib/data/donation";
import { NextResponse } from "next/server";

const schema = z
  .object({
    paymentMethod: z.enum(["paybybank", "creditcard", "paypal"]),
    firstName: z.string().min(2).max(100).optional(),
    lastName: z.string().min(2).max(100).optional(),
    email: z.email().optional(),
    organization: z.string().optional(),
    consents: z.record(z.string(), z.boolean()).optional(),
  })
  .superRefine((values, ctx) => {});

export async function POST(request: Request) {
  const json = await request.json();
  const { firstName, lastName, email, organization, consents } =
    schema.parse(json);

  const customer = await createCustomer(
    firstName,
    lastName,
    email,
    organization,
    consents,
  );

  return NextResponse.json(customer);
}
