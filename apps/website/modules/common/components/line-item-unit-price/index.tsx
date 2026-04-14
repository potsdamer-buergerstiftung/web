import { convertToLocale } from "@/lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { cn } from "@/lib/utils"

type LineItemUnitPriceProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  style?: "default" | "tight"
  currencyCode: string
}

const LineItemUnitPrice = ({
  item,
  style = "default",
  currencyCode,
}: LineItemUnitPriceProps) => {
  const { total, original_total } = item
  const hasReducedPrice = total < original_total

  const percentage_diff = Math.round(
    ((original_total - total) / original_total) * 100
  )

  return (
    <div className="flex h-full flex-col justify-center text-sm text-muted-foreground">
      {hasReducedPrice && (
        <>
          <p>
            {style === "default" && (
              <span className="text-muted-foreground">Original: </span>
            )}
            <span
              className="line-through"
              data-testid="product-unit-original-price"
            >
              {convertToLocale({
                amount: original_total / item.quantity,
                currency_code: currencyCode,
              })}
            </span>
          </p>
          {style === "default" && (
            <span className="text-primary">-{percentage_diff}%</span>
          )}
        </>
      )}
        <span
          className={cn("text-base font-medium text-foreground", {
            "text-primary": hasReducedPrice,
          })}
          data-testid="product-unit-price"
        >
        {convertToLocale({
          amount: total / item.quantity,
          currency_code: currencyCode,
        })}
      </span>
    </div>
  )
}

export default LineItemUnitPrice
