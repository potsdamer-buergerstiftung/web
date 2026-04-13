import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { StepTitle } from "./StepTitle";
import { useFormContext } from "react-hook-form";
import type { DonationFormValues } from "./form";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";

export function PersonalDetailsStep() {
  const { register, setValue, watch } = useFormContext<DonationFormValues>();
  const isAnonymous = watch("isAnonymous") ?? false;
  const interval = watch("interval") ?? "monthly";
  const wantsReceipt = watch("wantsReceipt") ?? false;
  const showAnonymousOption = interval === "once";
  const allowAnonymous = showAnonymousOption && !wantsReceipt;

  useEffect(() => {
    if ((!showAnonymousOption || wantsReceipt) && isAnonymous) {
      setValue("isAnonymous", false, { shouldDirty: true });
    }
  }, [isAnonymous, setValue, showAnonymousOption, wantsReceipt]);

  useEffect(() => {
    if (!isAnonymous) {
      return;
    }

    setValue("firstName", "", { shouldDirty: true });
    setValue("lastName", "", { shouldDirty: true });
    setValue("email", "", { shouldDirty: true });
    setValue("organisation", "", { shouldDirty: true });
  }, [isAnonymous, setValue]);

  return (
    <div>
      <StepTitle
        title="Persönliche Daten"
        description="Wir benötigen Deine Daten, um Dich einzuladen und Dir auf Wunsch, eine Spendenbescheinigung oder den Newsletter zuschicken zu können."
        className="mb-8"
      />
      <FieldGroup>
        {showAnonymousOption ? (
          <FieldGroup>
            <Field orientation="horizontal">
              <Checkbox
                id="is-anonymous"
                checked={isAnonymous}
                disabled={!allowAnonymous}
                onCheckedChange={(checked) =>
                  setValue("isAnonymous", Boolean(checked), {
                    shouldDirty: true,
                  })
                }
              />
              <FieldLabel htmlFor="is-anonymous">
                Ich möchte anonym spenden
              </FieldLabel>
            </Field>
          </FieldGroup>
        ) : null}
        {(!isAnonymous || !showAnonymousOption) && (
          <FieldGroup className="grid grid-cols-2 gap-4">
            <Field className="col-span-2 md:col-span-1">
              <FieldLabel htmlFor="firstName">
                Vorname (Erforderlich)
              </FieldLabel>
              <Input
                name="firstName"
                id="firstName"
                type="text"
                placeholder="Dein Vorname"
                required
                {...register("firstName")}
              />
            </Field>
            <Field className="col-span-2 md:col-span-1">
              <FieldLabel htmlFor="lastName">
                Nachname (Erforderlich)
              </FieldLabel>
              <Input
                name="lastName"
                id="lastName"
                type="text"
                placeholder="Dein Nachname"
                required
                {...register("lastName")}
              />
            </Field>
            <Field className="col-span-2 md:col-span-1">
              <FieldLabel htmlFor="email">E-Mail (Erforderlich)</FieldLabel>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="Deine E-Mail"
                required
                {...register("email")}
              />
            </Field>
            <Field className="col-span-2 md:col-span-1">
              <FieldLabel htmlFor="organisation">Organisation</FieldLabel>
              <Input
                name="organisation"
                id="organisation"
                type="text"
                placeholder="Deine Organisation"
                {...register("organisation")}
              />
            </Field>
          </FieldGroup>
        )}
      </FieldGroup>
    </div>
  );
}
