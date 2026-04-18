import { NextResponse } from "next/server";
import { mollieClient } from "@/lib/data/mollie";
import {
  findDonationByPaymentId,
  updateDonationAfterPayment,
  updateRecurringDonationAfterPayment,
} from "@/lib/data/donation-directus";

function asString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const params = new URLSearchParams(body);
    const paymentId = params.get("id");

    if (!paymentId) {
      return NextResponse.json({ ok: true });
    }

    const payment = await mollieClient.payments.get(paymentId);
    const donation = await findDonationByPaymentId(payment.id);

    if (!donation?.id) {
      return NextResponse.json({ ok: true });
    }

    const paidAt = payment.paidAt ?? null;
    const canceledAt = payment.canceledAt ?? null;
    const failedAt = payment.failedAt ?? null;
    const expiredAt = payment.expiredAt ?? null;

    await updateDonationAfterPayment(donation.id, {
      paymentId: payment.id,
      status: payment.status,
      paidAt,
      canceledAt,
      failedAt,
      expiredAt,
      metadata: {
        amount: payment.amount,
        method: payment.method,
        mandate_id: payment.mandateId,
      },
    });

    const recurringDonationId = asString(payment.metadata?.recurring_donation_id);
    if (recurringDonationId) {
      await updateRecurringDonationAfterPayment(recurringDonationId, {
        status: payment.status,
        paidAt,
        canceledAt,
        metadata: {
          payment_id: payment.id,
          mandate_id: payment.mandateId,
        },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Donation webhook failed", error);
    return NextResponse.json({ ok: true });
  }
}
