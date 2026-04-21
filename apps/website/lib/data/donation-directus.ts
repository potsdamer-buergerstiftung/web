import "server-only";
import serverClient from "portal/server";
import { createItem, readItems, updateItem } from "portal/sdk";
import type { Donation, Donor, RecurringDonation } from "portal/types";

type DonationStatus = NonNullable<Donation["status"]>;
type RecurringDonationStatus = NonNullable<RecurringDonation["status"]>;
type DonationCreatedFrom = Exclude<Donation["created_from"], null | undefined>;

type DonorInput = {
  firstName?: string;
  lastName?: string;
  organization?: string;
  email?: string;
  providerCustomerId: string;
};

type DonationInput = {
  donorId?: string;
  purpose: string;
  amountValue: Donation["amount_value"];
  currency: Donation["currency"];
  paymentMethod: Donation["payment_method"];
  recurringDonationId?: string;
  kind: Donation["kind"];
  checkoutUrl?: string;
  returnUrl?: string;
  webhookUrl?: string;
  createdFrom: DonationCreatedFrom;
  providerTransactionId?: string;
  metadata?: Record<string, unknown>;
};

type RecurringDonationInput = {
  donorId: string;
  amountValue: RecurringDonation["amount_value"];
  currency: RecurringDonation["currency"];
  frequency: RecurringDonation["frequency"];
  paymentMethod: RecurringDonation["payment_method"];
  startDate: string;
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

const RECURRING_DONATION_STATUS_BY_MOLLIE_STATUS: Record<
  string,
  RecurringDonationStatus
> = {
  paid: "active",
  failed: "failed",
  canceled: "canceled",
  expired: "failed",
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

export async function setProviderCustomerIdForDonor(
  donorId: string,
  providerCustomerId: string,
): Promise<{ id: string }> {
  const donor = await serverClient.request(
    updateItem("donors", donorId, {
      provider_customer_id: providerCustomerId,
    }),
  );

  return donor;
}

export async function upsertDonor(input: DonorInput): Promise<{ id: string }> {
  const emailNormalized = normalizeEmail(input.email);

  if (emailNormalized) {
    const existing = await serverClient.request(
      readItems("donors", {
        fields: ["id"],
        filter: {
          email: {
            _eq: emailNormalized,
          },
        },
        limit: 1,
      }),
    );

    const donorId = (existing?.[0] as { id?: string } | undefined)?.id;

    if (donorId) {
      await serverClient.request(
        updateItem("donors", donorId, {
          first_name: input.firstName?.trim() || null,
          last_name: input.lastName?.trim() || null,
          organization: input.organization?.trim() || null,
          email_raw: input.email?.trim() || null,
          email_normalized: emailNormalized,
          provider_customer_id: input.providerCustomerId ?? null,
        }),
      );

      return { id: donorId };
    }
  }

  const created = await serverClient.request(
    createItem("donors", {
      first_name: input.firstName?.trim() || null,
      last_name: input.lastName?.trim() || null,
      organization: input.organization?.trim() || null,
      email: input.email?.trim() || null,
    }),
  );

  return { id: (created as { id: string }).id };
}

export async function createDonation(input: DonationInput): Promise<{ id: string }> {
  const created = await serverClient.request(
    createItem("donations", {
      status: "pending" as DonationStatus,
      donor: input.donorId ?? null,
      purpose: input.purpose ?? null,
      amount_value: input.amountValue,
      currency: input.currency,
      payment_method: input.paymentMethod,
      kind: input.kind,
      checkout_url: input.checkoutUrl ?? null,
      recurring_donation: input.recurringDonationId ?? null,
      return_url: input.returnUrl ?? null,
      webhook_url: input.webhookUrl ?? null,
      created_from: input.createdFrom,
      provider_transaction_id: input.providerTransactionId ?? null,
      metadata: input.metadata ?? {},
    }),
  );

  return { id: (created as { id: string }).id };
}

export async function createRecurringDonation(
  input: RecurringDonationInput,
): Promise<{ id: string }> {
  const created = await serverClient.request(
    createItem("recurring_donations", {
      status: "pending" as RecurringDonationStatus,
      donor: input.donorId,
      amount_value: input.amountValue,
      currency: input.currency,
      frequency: input.frequency,
      payment_method: input.paymentMethod,
      start_date: input.startDate,
      metadata: input.metadata ?? {},
    }),
  );

  return { id: (created as { id: string }).id };
}

export async function findDonationByPaymentId(paymentId: string): Promise<{ id: string } | null> {
  const result = await serverClient.request(
    readItems("donations", {
      fields: ["id"],
      filter: {
        "provider_transaction_id": {
          _eq: paymentId,
        }
      },
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
      provider_transaction_id: input.paymentId,
      metadata: input.metadata ?? {},
    }),
  );
}

export async function updateRecurringDonationAfterPayment(
  recurringDonationId: string,
  input: {
    status: string;
    paidAt?: string | null;
    canceledAt?: string | null;
    metadata?: Record<string, unknown>;
  },
): Promise<void> {
  const mappedStatus =
    RECURRING_DONATION_STATUS_BY_MOLLIE_STATUS[input.status] ?? "pending";

  await serverClient.request(
    updateItem("recurring_donations", recurringDonationId, {
      status: mappedStatus,
      last_payment_status: input.status,
      last_payment_at: input.paidAt ?? null,
      canceled_at: input.canceledAt ?? null,
      metadata: input.metadata ?? {},
    }),
  );
}
