import { SequenceType } from "@mollie/api-client";
import {
  createDonation,
  createRecurringDonation,
  updateDonationAfterPayment,
  updateRecurringDonationAfterPayment,
  upsertDonor,
} from "@/lib/data/donation-directus";
import { mollieClient } from "@/lib/data/mollie";

export type InitializeDonationInput = {
  interval: "once" | "monthly" | "yearly";
  amountValue: number;
  paymentMethodId: "creditcard" | "paypal" | "paybybank" | "directdebit";
  purposeId: string;
  wantsReceipt: boolean;
  isAnonymous: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  organisation?: string;
  returnUrl: string;
  webhookUrl: string;
};

export type InitializeDonationResult = {
  donationId: string;
  recurringDonationId?: string;
  paymentId: string;
  checkoutUrl: string;
};

type DonorStepResult = {
  donorId?: string;
  shouldCreateDonor: boolean;
  isRecurring: boolean;
};

type RecurringStepResult = {
  recurringDonationId?: string;
};

type DonationStepResult = {
  donationId: string;
};

type CustomerStepResult = {
  customerId?: string;
};

type PaymentStepResult = {
  paymentId: string;
  paymentStatus: string;
  checkoutUrl: string;
  paymentAmount: unknown;
  mandateId?: string;
};

type MollieCustomerResult = {
  id: string;
};

type MolliePaymentResult = {
  id: string;
  status: string;
  amount: unknown;
  mandateId?: string;
  getCheckoutUrl: () => string | undefined;
};

function toDateOnlyIso(date: Date): string {
  return date.toISOString().slice(0, 10);
}

async function upsertDonorStep(input: InitializeDonationInput): Promise<DonorStepResult> {
  "use step";

  const isRecurring = input.interval !== "once";
  const shouldCreateDonor = isRecurring || Boolean(input.email?.trim());

  if (!shouldCreateDonor) {
    return {
      donorId: undefined,
      shouldCreateDonor,
      isRecurring,
    };
  }

  const donor = await upsertDonor({
    firstName: input.firstName,
    lastName: input.lastName,
    organization: input.organisation,
    email: input.email,
    isAnonymous: input.isAnonymous,
    wantsReceipt: input.wantsReceipt,
    consents: {
      privacy: true,
    },
  });

  return {
    donorId: donor.id,
    shouldCreateDonor,
    isRecurring,
  };
}

async function createRecurringDonationStep(
  input: InitializeDonationInput,
  donor: DonorStepResult,
): Promise<RecurringStepResult> {
  "use step";

  if (!donor.isRecurring || !donor.donorId) {
    return { recurringDonationId: undefined };
  }

  const recurringFrequency =
    input.interval === "yearly" ? "yearly" : "monthly";

  const recurring = await createRecurringDonation({
    donorId: donor.donorId,
    amountValue: input.amountValue,
    currency: "EUR",
    frequency: recurringFrequency,
    paymentMethod: input.paymentMethodId,
    startDate: toDateOnlyIso(new Date()),
    metadata: {
      source: "web_form",
      purpose_id: input.purposeId,
    },
  });

  return { recurringDonationId: recurring.id };
}

async function createDonationStep(
  input: InitializeDonationInput,
  donor: DonorStepResult,
  recurring: RecurringStepResult,
): Promise<DonationStepResult> {
  "use step";

  const donation = await createDonation({
    donorId: donor.donorId,
    amountValue: input.amountValue,
    currency: "EUR",
    intervalType: input.interval,
    paymentMethod: input.paymentMethodId,
    kind: donor.isRecurring ? "recurring_bootstrap" : "one_time",
    returnUrl: input.returnUrl,
    webhookUrl: input.webhookUrl,
    createdFrom: "web_form",
    metadata: {
      source: "web_form",
      purpose_id: input.purposeId,
      recurring_donation_id: recurring.recurringDonationId ?? null,
    },
  });

  return { donationId: donation.id };
}

async function createCustomerStep(
  input: InitializeDonationInput,
  donor: DonorStepResult,
): Promise<CustomerStepResult> {
  "use step";

  if (!donor.shouldCreateDonor) {
    return { customerId: undefined };
  }

  const customer = (await (mollieClient.customers as any).create({
    name: [input.firstName, input.lastName].filter(Boolean).join(" ").trim() || undefined,
    email: input.email?.trim(),
    locale: "de_DE",
  })) as MollieCustomerResult;

  return { customerId: customer.id };
}

async function createPaymentStep(
  input: InitializeDonationInput,
  donor: DonorStepResult,
  donation: DonationStepResult,
  recurring: RecurringStepResult,
  customer: CustomerStepResult,
): Promise<PaymentStepResult> {
  "use step";

  const payment = (await (mollieClient.payments as any).create({
    amount: {
      currency: "EUR",
      value: input.amountValue.toFixed(2),
    },
    description: donor.isRecurring
      ? "Regelmäßige Spende - Erster Beitrag"
      : "Spende",
    method: input.paymentMethodId,
    sequenceType: donor.isRecurring ? SequenceType.first : SequenceType.oneoff,
    customerId: customer.customerId,
    redirectUrl: input.returnUrl,
    webhookUrl: input.webhookUrl,
    metadata: {
      donation_id: donation.donationId,
      recurring_donation_id: recurring.recurringDonationId,
      purpose_id: input.purposeId,
    },
  })) as MolliePaymentResult;

  const checkoutUrl = payment.getCheckoutUrl();
  if (!checkoutUrl) {
    throw new Error("Mollie returned no checkout URL");
  }

  return {
    paymentId: payment.id,
    paymentStatus: payment.status,
    checkoutUrl,
    paymentAmount: payment.amount,
    mandateId: payment.mandateId,
  };
}

async function persistDonationPaymentStep(
  input: InitializeDonationInput,
  donation: DonationStepResult,
  customer: CustomerStepResult,
  payment: PaymentStepResult,
): Promise<void> {
  "use step";

  await updateDonationAfterPayment(donation.donationId, {
    paymentId: payment.paymentId,
    status: payment.paymentStatus,
    metadata: {
      checkout_url: payment.checkoutUrl,
      payment_id: payment.paymentId,
      customer_id: customer.customerId,
      amount: payment.paymentAmount,
      method: input.paymentMethodId,
    },
  });
}

async function persistRecurringPaymentStep(
  recurring: RecurringStepResult,
  customer: CustomerStepResult,
  payment: PaymentStepResult,
): Promise<void> {
  "use step";

  if (!recurring.recurringDonationId) {
    return;
  }

  await updateRecurringDonationAfterPayment(recurring.recurringDonationId, {
    status: payment.paymentStatus,
    metadata: {
      payment_id: payment.paymentId,
      customer_id: customer.customerId,
      mandate_id: payment.mandateId,
    },
  });
}

export async function initializeDonationWorkflow(
  input: InitializeDonationInput,
): Promise<InitializeDonationResult> {
  "use workflow";

  const donor = await upsertDonorStep(input);
  const recurring = await createRecurringDonationStep(input, donor);
  const donation = await createDonationStep(input, donor, recurring);
  const customer = await createCustomerStep(input, donor);
  const payment = await createPaymentStep(
    input,
    donor,
    donation,
    recurring,
    customer,
  );

  await persistDonationPaymentStep(input, donation, customer, payment);
  await persistRecurringPaymentStep(recurring, customer, payment);

  return {
    donationId: donation.donationId,
    recurringDonationId: recurring.recurringDonationId,
    paymentId: payment.paymentId,
    checkoutUrl: payment.checkoutUrl,
  };
}
