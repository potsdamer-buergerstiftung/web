import { cn } from "@/lib/utils"

import { getProductPrice } from "@/lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="h-10 w-32 animate-pulse rounded-md bg-muted" />
  }

  return (
    <div className="flex flex-col text-foreground">
      <span
        className={cn("text-2xl font-bold", {
          "text-primary": selectedPrice.price_type === "sale",
        })}
      >
        {!variant && <span className="text-muted-foreground">From </span>}
        <span
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </span>
      </span>
      {selectedPrice.price_type === "sale" && (
        <>
          <p className="mt-1 text-sm text-muted-foreground">
            <span>Original: </span>
            <span
              className="line-through"
              data-testid="original-product-price"
              data-value={selectedPrice.original_price_number}
            >
              {selectedPrice.original_price}
            </span>
          </p>
          <span className="text-sm font-medium text-primary">
            -{selectedPrice.percentage_diff}%
          </span>
        </>
      )}
    </div>
  )
}
