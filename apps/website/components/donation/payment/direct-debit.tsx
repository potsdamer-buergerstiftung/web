import { Field, FieldContent, FieldLabel, FieldTitle } from "@components/ui/field";
import { RadioGroupItem } from "@components/ui/radio-group";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

export function DirectDebitOption() {
    return (
        <FieldLabel htmlFor={`payment-method-directdebit`}>
            <Field orientation="horizontal">
                <FieldContent className="flex flex-row">
                    <div className="border border-border rounded-md p-2 mr-2">
                        <PencilSquareIcon className="size-4" />
                    </div>
                    <FieldTitle>SEPA-Lastschrift</FieldTitle>
                </FieldContent>
                <RadioGroupItem
                    value="directdebit"
                    id={`payment-method-directdebit`}
                />
            </Field>
        </FieldLabel>
    )
}
