import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { BuildingLibraryIcon } from "@heroicons/react/24/solid";

export function PayByBankOption({ inputId }: { inputId: string }) {
  return (
    <FieldLabel htmlFor={inputId}>
      <Field orientation="horizontal">
        <FieldContent className="flex flex-row">
          <div className="border border-border rounded-md p-2 mr-2">
            <BuildingLibraryIcon className="size-4" />
          </div>
          <FieldTitle>Sofortüberweisung</FieldTitle>
        </FieldContent>
        <RadioGroupItem value="banktransfer" id={inputId} />
      </Field>
    </FieldLabel>
  );
}
