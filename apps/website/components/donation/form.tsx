"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

const donationFormSchema = z.object({
  purposeId: z.string().min(1, "Bitte einen Verwendungszweck wählen."),
  interval: z.enum(["once", "monthly", "yearly"]),
  amountPreset: z.enum(["10.00", "50.00", "100.00"]),
  firstName: z.string().min(1, "Bitte den Vornamen angeben."),
  lastName: z.string().min(1, "Bitte den Nachnamen angeben."),
  email: z.string().email("Bitte eine gueltige E-Mail angeben."),
  organisation: z.string().optional(),
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
