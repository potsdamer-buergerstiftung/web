import { MandateMethod, SequenceType } from "@mollie/api-client";
import {
  createDonation,
  createRecurringDonation,
  setProviderCustomerIdForDonor,
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
  directDebitIban?: string;
  directDebitAccountHolder?: string;
  directDebitMandateAccepted?: boolean;
  returnUrl: string;
  webhookUrl: string;
};

export type InitializeDonationResult = {
  donationId: string;
  recurringDonationId?: string;
  paymentId: string;
  checkoutUrl?: string;
  redirectUrl?: string;
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
  checkoutUrl?: string;
  paymentAmount: unknown;
  mandateId?: string;
  mandateReference?: string;
  ibanLast4?: string;
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

type MollieMandateResult = {
  id: string;
};

function toDateOnlyIso(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function normalizeIban(value?: string) {
  return (value ?? "").replace(/\s+/g, "").toUpperCase();
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
    providerCustomerId: undefined,
  });

  return {
    donorId: donor.id,
    shouldCreateDonor,
    isRecurring,
  };
}

async function upsertDonorAfterCustomerStep(
  donor: DonorStepResult,
  customer: CustomerStepResult,
): Promise<{ donorId: string }> {
  "use step";

  if (!customer.customerId || !donor.donorId) {
    return { donorId: donor.donorId ?? "" };
  }

  const patchedDonor = await setProviderCustomerIdForDonor(donor.donorId, customer.customerId);

  return {
    donorId: patchedDonor.id,
  }
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
    paymentMethod: input.paymentMethodId,
    kind: donor.isRecurring ? "recurring_bootstrap" : "one_time",
    recurringDonationId: recurring.recurringDonationId,
    returnUrl: input.returnUrl,
    webhookUrl: input.webhookUrl,
    createdFrom: "web_form",
    purpose: input.purposeId,
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

async function createDirectDebitMandateStep(
  input: InitializeDonationInput,
  donation: DonationStepResult,
  customer: CustomerStepResult,
): Promise<{ mandateId: string; mandateReference: string; ibanLast4?: string }> {
  "use step";

  if (!customer.customerId) {
    throw new Error("Mollie customer is required for SEPA direct debit");
  }

  if (!input.directDebitMandateAccepted) {
    throw new Error("SEPA direct debit mandate must be accepted");
  }

  const iban = normalizeIban(input.directDebitIban);
  if (!iban) {
    throw new Error("SEPA direct debit IBAN is required");
  }

  const accountHolder =
    input.directDebitAccountHolder?.trim() ||
    [input.firstName, input.lastName].filter(Boolean).join(" ").trim();

  if (!accountHolder) {
    throw new Error("SEPA direct debit account holder is required");
  }

  const mandateReference = `donation-${donation.donationId}`;

  const mandate = (await mollieClient.customerMandates.create({
    customerId: customer.customerId,
    method: MandateMethod.directdebit,
    consumerAccount: iban,
    consumerName: accountHolder,
    signatureDate: toDateOnlyIso(new Date()),
    mandateReference,
  })) as MollieMandateResult;

  return {
    mandateId: mandate.id,
    mandateReference,
    ibanLast4: iban.slice(-4),
  };
}

async function createPaymentStep(
  input: InitializeDonationInput,
  donor: DonorStepResult,
  donation: DonationStepResult,
  recurring: RecurringStepResult,
  customer: CustomerStepResult,
): Promise<PaymentStepResult> {
  "use step";

  const isDirectDebit = input.paymentMethodId === "directdebit";
  const directDebitMandate = isDirectDebit
    ? await createDirectDebitMandateStep(input, donation, customer)
    : undefined;

  if (isDirectDebit && !directDebitMandate?.mandateId) {
    throw new Error("SEPA direct debit mandate could not be created");
  }

  const paymentPayload: Record<string, unknown> = {
    amount: {
      currency: "EUR",
      value: input.amountValue.toFixed(2),
    },
    description: donor.isRecurring
      ? "Regelmäßige Spende - Erster Beitrag"
      : "Spende",
    method: input.paymentMethodId,
    sequenceType: isDirectDebit
      ? SequenceType.recurring
      : donor.isRecurring
        ? SequenceType.first
        : SequenceType.oneoff,
    customerId: customer.customerId,
    webhookUrl: input.webhookUrl,
    metadata: {
      donation_id: donation.donationId,
      recurring_donation_id: recurring.recurringDonationId,
      purpose_id: input.purposeId,
      mandate_reference: directDebitMandate?.mandateReference,
    },
  };

  if (!isDirectDebit) {
    paymentPayload.redirectUrl = input.returnUrl;
  }

  if (isDirectDebit) {
    paymentPayload.mandateId = directDebitMandate?.mandateId;
  }

  const payment = (await (mollieClient.payments as any).create(
    paymentPayload,
  )) as MolliePaymentResult;

  const checkoutUrl = payment.getCheckoutUrl();
  if (!checkoutUrl && !isDirectDebit) {
    throw new Error("Mollie returned no checkout URL");
  }

  return {
    paymentId: payment.id,
    paymentStatus: payment.status,
    checkoutUrl,
    paymentAmount: payment.amount,
    mandateId: payment.mandateId ?? directDebitMandate?.mandateId,
    mandateReference: directDebitMandate?.mandateReference,
    ibanLast4: directDebitMandate?.ibanLast4,
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
      mandate_id: payment.mandateId,
      mandate_reference: payment.mandateReference,
      iban_last4: payment.ibanLast4,
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
      mandate_reference: payment.mandateReference,
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
  const patchedDonor = await upsertDonorAfterCustomerStep(donor, customer);
  
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
    redirectUrl: payment.checkoutUrl ? undefined : input.returnUrl,
  };
}
