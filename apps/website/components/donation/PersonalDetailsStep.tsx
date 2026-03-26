import { Field, FieldGroup, FieldLabel } from "@components/ui/field";
import { Input } from "@components/ui/input";
import { StepTitle } from "./StepTitle";
import { useFormContext } from "react-hook-form";
import type { DonationFormValues } from "./form";

export function PersonalDetailsStep() {
    const { register } = useFormContext<DonationFormValues>();

    return (
        <div>
            <StepTitle
                title="Persönliche Daten"
                description="Wir benötigen Deine Daten, um Dich einzuladen und Dir auf Wunsch, eine Spendenbescheinigung oder den Newsletter zuschicken zu können."
                className="mb-8"
            />
            <FieldGroup className="grid grid-cols-2 gap-4">
                <Field className="col-span-2 md:col-span-1">
                    <FieldLabel htmlFor="firstName">Vorname (Erforderlich)</FieldLabel>
                    <Input
                        name="firstName"
                        id="firstName"
                        type="text"
                        placeholder="Dein Vorname"
                        required
                        {...register("firstName", { required: true })}
                    />
                </Field>
                <Field className="col-span-2 md:col-span-1">
                    <FieldLabel htmlFor="lastName">Nachname (Erforderlich)</FieldLabel>
                    <Input
                        name="lastName"
                        id="lastName"
                        type="text"
                        placeholder="Dein Nachname"
                        required
                        {...register("lastName", { required: true })}
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
                        {...register("email", { required: true })}
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
        </div>
    );
}
