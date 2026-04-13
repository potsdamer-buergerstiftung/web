import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { StepTitle } from "./step-title";
import { useController, useFormContext } from "react-hook-form";
import type { DonationFormValues } from "../form-definition";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";

export function PersonalDetailsStep() {
  const { control } = useFormContext<DonationFormValues>();
  const { field: isAnonymousField } = useController({
    name: "isAnonymous",
    control,
  });
  const { field: intervalField } = useController({ name: "interval", control });
  const { field: wantsReceiptField } = useController({
    name: "wantsReceipt",
    control,
  });
  const { field: firstNameField, fieldState: firstNameState } = useController({
    name: "firstName",
    control,
  });
  const { field: lastNameField, fieldState: lastNameState } = useController({
    name: "lastName",
    control,
  });
  const { field: emailField, fieldState: emailState } = useController({
    name: "email",
    control,
  });
  const { field: organisationField } = useController({
    name: "organisation",
    control,
  });

  const isAnonymous = Boolean(isAnonymousField.value);
  const interval = intervalField.value ?? "monthly";
  const wantsReceipt = Boolean(wantsReceiptField.value);
  const onIsAnonymousChange = isAnonymousField.onChange;
  const onFirstNameChange = firstNameField.onChange;
  const onLastNameChange = lastNameField.onChange;
  const onEmailChange = emailField.onChange;
  const onOrganisationChange = organisationField.onChange;
  const showAnonymousOption = interval === "once";
  const allowAnonymous = showAnonymousOption && !wantsReceipt;

  useEffect(() => {
    if ((!showAnonymousOption || wantsReceipt) && isAnonymous) {
      onIsAnonymousChange(false);
    }
  }, [isAnonymous, onIsAnonymousChange, showAnonymousOption, wantsReceipt]);

  useEffect(() => {
    if (!isAnonymous) {
      return;
    }

    onFirstNameChange("");
    onLastNameChange("");
    onEmailChange("");
    onOrganisationChange("");
  }, [
    isAnonymous,
    onEmailChange,
    onFirstNameChange,
    onLastNameChange,
    onOrganisationChange,
  ]);

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
                  isAnonymousField.onChange(Boolean(checked))
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
            <Field
              className="col-span-2 md:col-span-1"
              data-invalid={firstNameState.invalid}
            >
              <FieldLabel htmlFor="firstName">Vorname (Erforderlich)</FieldLabel>
              <Input
                {...firstNameField}
                value={firstNameField.value ?? ""}
                id="firstName"
                type="text"
                placeholder="Dein Vorname"
                aria-invalid={firstNameState.invalid}
              />
              {firstNameState.invalid && (
                <FieldError errors={[firstNameState.error]} />
              )}
            </Field>
            <Field
              className="col-span-2 md:col-span-1"
              data-invalid={lastNameState.invalid}
            >
              <FieldLabel htmlFor="lastName">Nachname (Erforderlich)</FieldLabel>
              <Input
                {...lastNameField}
                value={lastNameField.value ?? ""}
                id="lastName"
                type="text"
                placeholder="Dein Nachname"
                aria-invalid={lastNameState.invalid}
              />
              {lastNameState.invalid && (
                <FieldError errors={[lastNameState.error]} />
              )}
            </Field>
            <Field
              className="col-span-2 md:col-span-1"
              data-invalid={emailState.invalid}
            >
              <FieldLabel htmlFor="email">E-Mail (Erforderlich)</FieldLabel>
              <Input
                {...emailField}
                value={emailField.value ?? ""}
                id="email"
                type="email"
                placeholder="Deine E-Mail"
                aria-invalid={emailState.invalid}
              />
              {emailState.invalid && <FieldError errors={[emailState.error]} />}
            </Field>
            <Field className="col-span-2 md:col-span-1">
              <FieldLabel htmlFor="organisation">Organisation</FieldLabel>
              <Input
                {...organisationField}
                value={organisationField.value ?? ""}
                id="organisation"
                type="text"
                placeholder="Deine Organisation"
              />
            </Field>
          </FieldGroup>
        )}
      </FieldGroup>
    </div>
  );
}
