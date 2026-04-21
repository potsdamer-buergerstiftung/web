import { start } from "workflow/api";
import { z } from "zod";
import { initializeDonationWorkflow } from "@/workflows/donation/initialize";
import { NextResponse } from "next/server";

const ibanPattern = /^[A-Z]{2}[0-9A-Z]{13,32}$/;

function normalizeIban(value?: string) {
  return (value ?? "").replace(/\s+/g, "").toUpperCase();
}

const schema = z
  .object({
    purposeId: z.string().min(1),
    interval: z.enum(["once", "monthly", "yearly"]),
    amountPreset: z.string(),
    amountCustom: z.string().optional(),
    paymentMethodId: z.enum(["paybybank", "creditcard", "paypal", "directdebit"]),
    wantsReceipt: z.boolean(),
    isAnonymous: z.boolean(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    organisation: z.string().optional(),
    directDebitIban: z.string().optional(),
    directDebitAccountHolder: z.string().optional(),
    directDebitMandateAccepted: z.boolean().optional(),
  })
  .superRefine((values, ctx) => {
    const amountRaw =
      values.amountPreset === "custom" ? values.amountCustom : values.amountPreset;
    const amount = Number.parseFloat(amountRaw ?? "");

    if (Number.isNaN(amount) || amount < 1) {
      ctx.addIssue({
        code: "custom",
        path: values.amountPreset === "custom" ? ["amountCustom"] : ["amountPreset"],
        message: "Bitte mindestens 1 Euro eingeben.",
      });
    }

    const canBeAnonymous = values.interval === "once" && !values.wantsReceipt;
    const allowAnonymous =
      canBeAnonymous && values.paymentMethodId !== "directdebit";

    if (values.isAnonymous && allowAnonymous) {
      return;
    }

    if (values.isAnonymous && !allowAnonymous) {
      ctx.addIssue({
        code: "custom",
        path: ["isAnonymous"],
        message: "Anonyme Spenden sind per SEPA-Lastschrift nicht moeglich.",
      });
    }

    if (!values.firstName?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["firstName"],
        message: "Bitte den Vornamen angeben.",
      });
    }

    if (!values.lastName?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["lastName"],
        message: "Bitte den Nachnamen angeben.",
      });
    }

    const emailValue = values.email?.trim();
    if (!emailValue || !z.string().email().safeParse(emailValue).success) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "Bitte eine gueltige E-Mail angeben.",
      });
    }

    if (values.paymentMethodId === "directdebit") {
      const ibanValue = normalizeIban(values.directDebitIban);
      if (!ibanValue || !ibanPattern.test(ibanValue)) {
        ctx.addIssue({
          code: "custom",
          path: ["directDebitIban"],
          message: "Bitte eine gueltige IBAN angeben.",
        });
      }

      if (!values.directDebitAccountHolder?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["directDebitAccountHolder"],
          message: "Bitte den Kontoinhaber angeben.",
        });
      }

      if (!values.directDebitMandateAccepted) {
        ctx.addIssue({
          code: "custom",
          path: ["directDebitMandateAccepted"],
          message: "Bitte das SEPA-Lastschriftmandat bestaetigen.",
        });
      }
    }
  });

function resolveAmount(values: z.infer<typeof schema>): number {
  const amountRaw =
    values.amountPreset === "custom" ? values.amountCustom : values.amountPreset;
  return Number.parseFloat(amountRaw ?? "");
}

function getBaseUrl(request: Request): string {
  const url = new URL(request.url);
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host") ?? url.host;
  const protocol = forwardedProto ?? url.protocol.replace(":", "");
  return `${protocol}://${host}`;
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const values = schema.parse(json);
    const amountValue = resolveAmount(values);
    const baseUrl = getBaseUrl(request);

    const returnUrl = `${baseUrl}/mitstiften/spenden/danke`;
    const webhookUrl = `${baseUrl}/api/donation/webhook`;

    const run = await start(initializeDonationWorkflow, [
      {
        interval: values.interval,
        amountValue,
        paymentMethodId: values.paymentMethodId,
        purposeId: values.purposeId,
        wantsReceipt: values.wantsReceipt,
        isAnonymous: values.isAnonymous,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        organisation: values.organisation,
        directDebitIban: values.directDebitIban,
        directDebitAccountHolder: values.directDebitAccountHolder,
        directDebitMandateAccepted: values.directDebitMandateAccepted,
        returnUrl,
        webhookUrl,
      },
    ]);

    const result = await run.returnValue;
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to initialize donation", error);
    return NextResponse.json(
      { message: "Spende konnte nicht gestartet werden." },
      { status: 400 },
    );
  }
}
