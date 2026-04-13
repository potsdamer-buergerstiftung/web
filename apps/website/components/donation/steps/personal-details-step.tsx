import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { StepTitle } from "./step-title";
import { Controller, useFormContext } from "react-hook-form";
import type { DonationFormValues } from "../form-definition";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";

export function PersonalDetailsStep() {
  const { setValue, watch, control } = useFormContext<DonationFormValues>();
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
            <Controller
              name="isAnonymous"
              control={control}
              render={({ field }) => (
                <Field orientation="horizontal">
                  <Checkbox
                    id="is-anonymous"
                    checked={field.value}
                    disabled={!allowAnonymous}
                    onCheckedChange={field.onChange}
                  />
                  <FieldLabel htmlFor="is-anonymous">
                    Ich möchte anonym spenden
                  </FieldLabel>
                </Field>
              )}
            />
          </FieldGroup>
        ) : null}
        {(!isAnonymous || !showAnonymousOption) && (
          <FieldGroup className="grid grid-cols-2 gap-4">
            <Controller
              name="firstName"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  className="col-span-2 md:col-span-1"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel htmlFor="firstName">
                    Vorname (Erforderlich)
                  </FieldLabel>
                  <Input
                    {...field}
                    id="firstName"
                    type="text"
                    placeholder="Dein Vorname"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  className="col-span-2 md:col-span-1"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel htmlFor="lastName">
                    Nachname (Erforderlich)
                  </FieldLabel>
                  <Input
                    {...field}
                    id="lastName"
                    type="text"
                    placeholder="Dein Nachname"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  className="col-span-2 md:col-span-1"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel htmlFor="email">E-Mail (Erforderlich)</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Deine E-Mail"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="organisation"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  className="col-span-2 md:col-span-1"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel htmlFor="organisation">Organisation</FieldLabel>
                  <Input
                    {...field}
                    id="organisation"
                    type="text"
                    placeholder="Deine Organisation"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        )}
      </FieldGroup>
    </div>
  );
}
