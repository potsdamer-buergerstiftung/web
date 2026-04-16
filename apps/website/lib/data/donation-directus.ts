import "server-only";
import serverClient from "portal/server";
import { createItem, readItems, updateItem } from "portal/sdk";
import type { Donation, Donor, RecurringDonation } from "portal/types";

type DonationStatus = NonNullable<Donation["status"]>;
type RecurringDonationStatus = NonNullable<RecurringDonation["status"]>;
type DonorStatus = Donor["status"];
type DonationCreatedFrom = Exclude<Donation["created_from"], null | undefined>;

type DonorInput = {
  firstName?: string;
  lastName?: string;
  organization?: string;
  email?: string;
  isAnonymous?: boolean;
  wantsReceipt?: boolean;
  consents?: Record<string, boolean>;
};

type DonationInput = {
  donorId?: string;
  project?: string;
  amountValue: Donation["amount_value"];
  currency: Donation["currency"];
  intervalType: Donation["interval_type"];
  paymentMethod: Donation["payment_method"];
  kind: Donation["kind"];
  checkoutUrl?: string;
  returnUrl?: string;
  webhookUrl?: string;
  createdFrom: DonationCreatedFrom;
  metadata?: Record<string, unknown>;
};

type MolliePaymentSync = {
  paymentId: string;
  status: string;
  paidAt?: string | null;
  failedAt?: string | null;
  canceledAt?: string | null;
  expiredAt?: string | null;
  metadata?: Record<string, unknown>;
};

const DONATION_STATUS_BY_MOLLIE_STATUS: Record<string, DonationStatus> = {
  paid: "paid",
  failed: "failed",
  canceled: "canceled",
  expired: "expired",
  open: "pending",
  pending: "pending",
  authorized: "pending",
};

// Keeps recurring status union in active use so schema changes fail fast in type-checks.
const RECURRING_DONATION_STATUS_VALUES: ReadonlyArray<RecurringDonationStatus> = [
  "pending",
  "active",
  "paused",
  "failed",
  "canceled",
  "ended",
];

void RECURRING_DONATION_STATUS_VALUES;

function normalizeEmail(email?: string) {
  return email?.trim().toLowerCase() ?? "";
}

export async function upsertDonor(input: DonorInput): Promise<{ id: string }> {
  const emailNormalized = normalizeEmail(input.email);

  if (emailNormalized) {
    const existing = await serverClient.request(
      readItems("donor", {
        fields: ["id"],
        filter: {
          email_normalized: {
            _eq: emailNormalized,
          },
        },
        limit: 1,
      }),
    );

    const donorId = (existing?.[0] as { id?: string } | undefined)?.id;

    if (donorId) {
      await serverClient.request(
        updateItem("donor", donorId, {
          first_name: input.firstName?.trim() || null,
          last_name: input.lastName?.trim() || null,
          organization: input.organization?.trim() || null,
          email_raw: input.email?.trim() || null,
          email_normalized: emailNormalized,
          is_anonymous: Boolean(input.isAnonymous),
          wants_receipt: Boolean(input.wantsReceipt),
          consents: input.consents ?? {},
        }),
      );

      return { id: donorId };
    }
  }

  const created = await serverClient.request(
    createItem("donor", {
      status: "published" as DonorStatus,
      first_name: input.firstName?.trim() || null,
      last_name: input.lastName?.trim() || null,
      organization: input.organization?.trim() || null,
      email_raw: input.email?.trim() || null,
      email_normalized: emailNormalized || null,
      is_anonymous: Boolean(input.isAnonymous),
      wants_receipt: Boolean(input.wantsReceipt),
      consents: input.consents ?? {},
      metadata: {},
    }),
  );

  return { id: (created as { id: string }).id };
}

export async function createDonation(input: DonationInput): Promise<{ id: string }> {
  const created = await serverClient.request(
    createItem("donations", {
      status: "pending" as DonationStatus,
      donor: input.donorId ?? null,
      project: input.project ?? null,
      amount_value: input.amountValue,
      currency: input.currency,
      interval_type: input.intervalType,
      payment_method: input.paymentMethod,
      kind: input.kind,
      checkout_url: input.checkoutUrl ?? null,
      return_url: input.returnUrl ?? null,
      webhook_url: input.webhookUrl ?? null,
      created_from: input.createdFrom,
      metadata: input.metadata ?? {},
    }),
  );

  return { id: (created as { id: string }).id };
}

export async function findDonationByPaymentId(paymentId: string): Promise<{ id: string } | null> {
  const result = await serverClient.request(
    readItems("donations", {
      fields: ["id"],
      // Directus supports JSON _contains, but current SDK typings don't model this operator for JSON fields.
      filter: {
        metadata: {
          _contains: paymentId,
        },
      } as any,
      limit: 1,
    }),
  );

  const id = (result?.[0] as { id?: string } | undefined)?.id;
  return id ? { id } : null;
}

export async function updateDonationAfterPayment(
  donationId: string,
  input: MolliePaymentSync,
): Promise<void> {
  const mappedStatus = DONATION_STATUS_BY_MOLLIE_STATUS[input.status] ?? "pending";

  await serverClient.request(
    updateItem("donations", donationId, {
      status: mappedStatus,
      paid_at: input.paidAt ?? null,
      failed_at: input.failedAt ?? null,
      canceled_at: input.canceledAt ?? null,
      expired_at: input.expiredAt ?? null,
      metadata: input.metadata ?? {},
    }),
  );
}
