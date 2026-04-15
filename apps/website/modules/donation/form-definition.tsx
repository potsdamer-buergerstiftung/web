"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useContext, useId } from "react";
import {
  FormProvider,
  useForm,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import * as z from "zod/v4-mini";

const donationFormSchema = z
  .object({
    purposeId: z
      .string()
      .check(z.minLength(1, "Bitte einen Verwendungszweck wählen.")),
    interval: z.enum(["once", "monthly", "yearly"]),
    amountPreset: z.enum(["10.00", "50.00", "100.00", "custom"]),
    amountCustom: z.optional(z.string()),
    paymentMethodId: z.optional(z.string()),
    wantsReceipt: z.boolean(),
    isAnonymous: z.boolean(),
    firstName: z.optional(z.string().check(z.trim())),
    lastName: z.optional(z.string().check(z.trim())),
    email: z.optional(z.email().check(z.trim())),
    organisation: z.optional(z.string()),
  })
  .check(
    z.superRefine((values, ctx) => {
      if (values.amountPreset === "custom") {
        const amount = Number.parseFloat(values.amountCustom ?? "");
        if (Number.isNaN(amount) || amount < 1) {
          ctx.addIssue({
            code: "custom",
            path: ["amountCustom"],
            message: "Bitte mindestens 1 Euro eingeben.",
          });
        }
      }

      if (values.isAnonymous) {
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
    }),
  );

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
      ...defaultValues,
    },
  });

  const handleSubmit = onSubmit
    ? methods.handleSubmit(onSubmit)
    : (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
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
