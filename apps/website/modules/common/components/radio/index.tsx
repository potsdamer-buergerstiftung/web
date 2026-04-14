const Radio = ({
  checked,
  "data-testid": dataTestId,
}: {
  checked: boolean
  "data-testid"?: string
}) => {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      className="group/radio relative flex size-5 items-center justify-center outline-none"
      data-testid={dataTestId || "radio-button"}
    >
      <span className="border-input bg-background group-data-[state=checked]:border-primary group-data-[state=checked]:bg-primary/10 flex size-5 items-center justify-center rounded-full border transition-colors">
        {checked && (
          <span className="bg-primary size-2 rounded-full" aria-hidden="true" />
        )}
      </span>
    </button>
  )
}

export default Radio
