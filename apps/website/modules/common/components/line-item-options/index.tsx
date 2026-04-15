import { HttpTypes } from "@medusajs/types";

type LineItemOptionsProps = {
  variant: HttpTypes.StoreProductVariant | undefined;
  "data-testid"?: string;
  "data-value"?: HttpTypes.StoreProductVariant;
};

const LineItemOptions = ({
  variant,
  "data-testid": dataTestid,
  "data-value": dataValue,
}: LineItemOptionsProps) => {
  return (
    <p
      data-testid={dataTestid}
      data-value={dataValue}
      className="w-full overflow-hidden text-ellipsis text-sm text-muted-foreground"
    >
      Variant: {variant?.title}
    </p>
  );
};

export default LineItemOptions;
