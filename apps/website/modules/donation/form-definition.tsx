"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useContext, useId } from "react";
import {
  FormProvider,
  useForm,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import { z } from "zod";

const purposeIdSchema = z.string().min(1, "Bitte einen Verwendungszweck wählen.");
const intervalSchema = z.enum(["once", "monthly", "yearly"]);
const amountPresetSchema = z.string();
const amountCustomSchema = z.string().optional();
const paymentMethodIdSchema = z.string().min(1, "Bitte eine Zahlungsart wählen.");
const wantsReceiptSchema = z.boolean();
const isAnonymousSchema = z.boolean();
const firstNameSchema = z.string().optional();
const lastNameSchema = z.string().optional();
const emailSchema = z.string().optional();
const organisationSchema = z.string().optional();
const directDebitIbanSchema = z.string().optional();
const directDebitAccountHolderSchema = z.string().optional();
const directDebitMandateAcceptedSchema = z.boolean().optional();

const ibanPattern = /^[A-Z]{2}[0-9A-Z]{13,32}$/;

function normalizeIban(value?: string) {
  return (value ?? "").replace(/\s+/g, "").toUpperCase();
}

function validateDirectDebitFields(
  values: {
    paymentMethodId?: string;
    directDebitIban?: string;
    directDebitAccountHolder?: string;
    directDebitMandateAccepted?: boolean;
  },
  ctx: z.RefinementCtx,
) {
  if (values.paymentMethodId !== "directdebit") {
    return;
  }

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
      message: "Bitte das SEPA-Lastschriftmandat bestätigen.",
    });
  }
}

export const purposeStepSchema = z.object({
  purposeId: purposeIdSchema,
});

export const amountStepSchema = z
  .object({
    interval: intervalSchema,
    amountPreset: amountPresetSchema,
    amountCustom: amountCustomSchema,
  })
  .superRefine((values, ctx) => {
    if (values.amountPreset === "custom") {
      const amount = Number.parseFloat(values.amountCustom ?? "");
      if (Number.isNaN(amount) || amount < 1) {
        ctx.addIssue({
          code: "custom",
          path: ["amountCustom"],
          message: "Bitte mindestens 1 Euro eingeben.",
        });
      }
      return;
    }

    const amount = Number.parseFloat(values.amountPreset);
    if (Number.isNaN(amount) || amount < 1) {
      ctx.addIssue({
        code: "custom",
        path: ["amountPreset"],
        message: "Bitte einen gültigen Spendenbetrag wählen.",
      });
    }
  });

export const personalDataStepSchema = z
  .object({
    interval: intervalSchema,
    wantsReceipt: wantsReceiptSchema,
    isAnonymous: isAnonymousSchema,
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    email: emailSchema,
    organisation: organisationSchema,
  })
  .superRefine((values, ctx) => {
    const canBeAnonymous = values.interval === "once" && !values.wantsReceipt;
    if (values.isAnonymous && canBeAnonymous) {
      return;
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
    if (!emailValue) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "Bitte eine gültige E-Mail angeben.",
      });
      return;
    }

    if (!z.string().email().safeParse(emailValue).success) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "Bitte eine gültige E-Mail angeben.",
      });
    }
  });

export const paymentStepSchema = z
  .object({
    paymentMethodId: paymentMethodIdSchema,
    directDebitIban: directDebitIbanSchema,
    directDebitAccountHolder: directDebitAccountHolderSchema,
    directDebitMandateAccepted: directDebitMandateAcceptedSchema,
  })
  .superRefine((values, ctx) => {
    validateDirectDebitFields(values, ctx);
  });

const donationFormSchema = z
  .object({
    purposeId: purposeIdSchema,
    interval: intervalSchema,
    amountPreset: amountPresetSchema,
    amountCustom: amountCustomSchema,
    paymentMethodId: paymentMethodIdSchema,
    wantsReceipt: wantsReceiptSchema,
    isAnonymous: isAnonymousSchema,
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    email: emailSchema,
    organisation: organisationSchema,
    directDebitIban: directDebitIbanSchema,
    directDebitAccountHolder: directDebitAccountHolderSchema,
    directDebitMandateAccepted: directDebitMandateAcceptedSchema,
  })
  .superRefine((values, ctx) => {
    if (values.amountPreset === "custom") {
      const amount = Number.parseFloat(values.amountCustom ?? "");
      if (Number.isNaN(amount) || amount < 1) {
        ctx.addIssue({
          code: "custom",
          path: ["amountCustom"],
          message: "Bitte mindestens 1 Euro eingeben.",
        });
      }
    } else {
      const amount = Number.parseFloat(values.amountPreset);
      if (Number.isNaN(amount) || amount < 1) {
        ctx.addIssue({
          code: "custom",
          path: ["amountPreset"],
          message: "Bitte einen gültigen Spendenbetrag wählen.",
        });
      }
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
    if (!emailValue) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "Bitte eine gueltige E-Mail angeben.",
      });
      return;
    }

    if (!z.email().safeParse(emailValue).success) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "Bitte eine gueltige E-Mail angeben.",
      });
    }

    validateDirectDebitFields(values, ctx);
  });

export type DonationFormValues = z.infer<typeof donationFormSchema>;
export type DonationFormMethods = UseFormReturn<DonationFormValues>;

const DonationFormContext = createContext<DonationFormMethods | undefined>(
  undefined,
);
const DonationFormInstanceIdContext = createContext<string | undefined>(
  undefined,
);

export function useDonationForm() {
  const donationForm = useContext(DonationFormContext);
  if (!donationForm) {
    throw new Error(
      "useDonationForm must be used within a DonationFormProvider",
    );
  }
  return donationForm;
}

export function useDonationFieldId(fieldKey: string) {
  const formInstanceId = useContext(DonationFormInstanceIdContext);
  if (!formInstanceId) {
    throw new Error(
      "useDonationFieldId must be used within a DonationFormProvider",
    );
  }
  return `${formInstanceId}-${fieldKey}`;
}

type DonationFormProviderProps = {
  children: React.ReactNode;
  defaultValues?: Partial<DonationFormValues>;
  onSubmit?: SubmitHandler<DonationFormValues>;
};

export function DonationFormProvider({
  children,
  defaultValues,
  onSubmit,
}: DonationFormProviderProps) {
  const formInstanceId = useId().replace(/:/g, "");
  const methods = useForm<DonationFormValues>({
    mode: "onBlur",
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      purposeId: "general",
      interval: "monthly",
      amountPreset: "100.00",
      amountCustom: "100.00",
      paymentMethodId: "",
      wantsReceipt: false,
      isAnonymous: false,
      firstName: "",
      lastName: "",
      email: "",
      organisation: "",
      directDebitIban: "",
      directDebitAccountHolder: "",
      directDebitMandateAccepted: false,
      ...defaultValues,
    },
  });

  const submitDonation = methods.handleSubmit(
    onSubmit
      ? onSubmit
      : (values) => {
          console.log("Donation form values:", values);
        },
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const submitter =
      (event.nativeEvent as SubmitEvent).submitter as
        | HTMLButtonElement
        | HTMLInputElement
        | null;

    if (submitter?.getAttribute("data-donation-submit") !== "true") {
      event.preventDefault();
      return;
    }

    return submitDonation(event);
  };

  return (
    <DonationFormContext.Provider value={methods}>
      <DonationFormInstanceIdContext.Provider value={formInstanceId}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit} className="w-full">
            {children}
          </form>
        </FormProvider>
      </DonationFormInstanceIdContext.Provider>
    </DonationFormContext.Provider>
  );
}
