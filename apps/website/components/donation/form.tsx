"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

const donationFormSchema = z
  .object({
    purposeId: z.string().min(1, "Bitte einen Verwendungszweck wählen."),
    interval: z.enum(["once", "monthly", "yearly"]),
    amountPreset: z.enum(["10.00", "50.00", "100.00"]),
    wantsReceipt: z.boolean(),
    isAnonymous: z.boolean(),
    firstName: z.string().trim().optional(),
    lastName: z.string().trim().optional(),
    email: z.string().trim().optional(),
    organisation: z.string().trim().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.isAnonymous) {
      return;
    }

    if (!values.firstName?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["firstName"],
        message: "Bitte den Vornamen angeben.",
      });
    }

    if (!values.lastName?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["lastName"],
        message: "Bitte den Nachnamen angeben.",
      });
    }

    const emailValue = values.email?.trim();
    if (!emailValue) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email"],
        message: "Bitte eine gueltige E-Mail angeben.",
      });
      return;
    }

    if (!z.string().email().safeParse(emailValue).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email"],
        message: "Bitte eine gueltige E-Mail angeben.",
      });
    }
  });

export type DonationFormValues = z.infer<typeof donationFormSchema>;

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
  const methods = useForm<DonationFormValues>({
    mode: "onBlur",
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      purposeId: "general",
      interval: "monthly",
      amountPreset: "10.00",
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
    : (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} className="w-full">
        {children}
      </form>
    </FormProvider>
  );
}
