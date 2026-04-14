import { HttpTypes } from "@medusajs/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-foreground">{title} auswählen</span>
      <div className="flex flex-wrap gap-2" data-testid={dataTestId}>
        {filteredOptions.map((v) => {
          return (
            <Button
              type="button"
              onClick={() => updateOption(option.id, v)}
              key={v}
              variant={v === current ? "default" : "secondary"}
              size="sm"
              className={cn("flex-1", v !== current && "shadow-none")}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
