import React from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

type CheckboxProps = {
  checked?: boolean
  onChange?: () => void
  label: string
  name?: string
  'data-testid'?: string
}

const CheckboxWithLabel: React.FC<CheckboxProps> = ({
  checked = true,
  onChange,
  label,
  name,
  'data-testid': dataTestId
}) => {
  const checkboxId = name || "checkbox"

  return (
    <div className="flex items-center gap-3">
      <Checkbox
        id={checkboxId}
        checked={checked}
        onCheckedChange={() => onChange?.()}
        name={name}
        data-testid={dataTestId}
      />
      <Label htmlFor={checkboxId} className="text-sm font-medium leading-none">
        {label}
      </Label>
    </div>
  )
}

export default CheckboxWithLabel
