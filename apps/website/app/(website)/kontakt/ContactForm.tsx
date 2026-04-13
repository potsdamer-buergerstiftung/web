"use client";

import { useActionState } from "react";
import { submitForm } from "./action";
import { AltchaWidget } from "./AltchaWidget";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitForm, null);

  if (state?.success) {
    return (
      <div className="text-green-600 dark:text-green-400">{state.message}</div>
    );
  }

  return (
    <div>
      <form action={formAction}>
        <FieldGroup className="grid grid-cols-3 gap-4">
          <Field className="col-span-3 md:col-span-1">
            <FieldLabel htmlFor="firstName">Vorname (Erforderlich)</FieldLabel>
            <Input
              name="firstName"
              id="firstName"
              type="text"
              placeholder="Dein Vorname"
              required
            />
          </Field>
          <Field className="col-span-3 md:col-span-1">
            <FieldLabel htmlFor="lastName">Nachname (Erforderlich)</FieldLabel>
            <Input
              name="lastName"
              id="lastName"
              type="text"
              placeholder="Dein Nachname"
              required
            />
          </Field>
          <Field className="col-span-3 md:col-span-1">
            <FieldLabel htmlFor="organisation">Organisation</FieldLabel>
            <Input
              name="organisation"
              id="organisation"
              type="text"
              placeholder="Deine Organisation"
            />
          </Field>
          <Field className="col-span-3 md:col-span-1">
            <FieldLabel htmlFor="email">E-Mail (Erforderlich)</FieldLabel>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="Deine E-Mail"
              required
            />
          </Field>
          <Field className="col-span-3 md:col-span-1">
            <FieldLabel htmlFor="phone">Telefon</FieldLabel>
            <Input
              name="phone"
              id="phone"
              type="text"
              placeholder="Deine Telefonnummer"
            />
          </Field>
          <Field className="col-span-3 md:col-span-1">
            <FieldLabel htmlFor="project">Projektbezug</FieldLabel>
            <Input
              name="project"
              id="project"
              type="text"
              placeholder="Dein Projektbezug"
            />
          </Field>
          <Field className="col-span-3">
            <FieldLabel htmlFor="subject">Betreff (Erforderlich)</FieldLabel>
            <Input
              name="subject"
              id="subject"
              type="text"
              required
              placeholder="Dein Betreff"
            />
          </Field>
          <Field className="col-span-3">
            <FieldLabel htmlFor="message">Nachricht (Erforderlich)</FieldLabel>
            <Textarea
              name="message"
              id="message"
              placeholder="Deine Nachricht"
              className="min-h-40"
            />
          </Field>
          <FieldGroup className="col-span-3">
            <Field orientation="horizontal">
              <Checkbox name="remember" id="remember" required />
              <FieldLabel htmlFor="remember">
                Ich erkläre mich einverstanden, dass die eingegebenen Daten für
                die Bearbeitung meines Anliegens weiterverarbeitet werden.
              </FieldLabel>
            </Field>
            <Field>
              <AltchaWidget />
            </Field>

            {state?.success === false && state?.message ? (
              <div className="mb-6 text-red-600 dark:text-red-400">
                {state.message}
              </div>
            ) : null}
            <Field orientation="horizontal">
              <Button type="submit" disabled={pending} size="lg">
                Absenden
              </Button>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>
    </div>
  );
}
