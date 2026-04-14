"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"

import { updateLineItem } from "@/lib/data/cart"
import { cn } from "@/lib/utils"
import CartItemSelect from "@/modules/cart/components/cart-item-select"
import ErrorMessage from "@/modules/checkout/components/error-message"
import DeleteButton from "@/modules/common/components/delete-button"
import LineItemOptions from "@/modules/common/components/line-item-options"
import LineItemPrice from "@/modules/common/components/line-item-price"
import LineItemUnitPrice from "@/modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import Spinner from "@/modules/common/icons/spinner"
import Thumbnail from "@/modules/products/components/thumbnail"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  return (
    <article className="rounded-2xl border border-border bg-white p-4 shadow-sm">
      <div className="flex gap-4">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className={cn("shrink-0", {
            "w-16": type === "preview",
            "w-24": type === "full",
          })}
        >
          <Thumbnail
            thumbnail={item.thumbnail}
            images={item.variant?.product?.images}
            size="square"
          />
        </LocalizedClientLink>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-foreground">
                <LocalizedClientLink href={`/products/${item.product_handle}`} data-testid="product-link">
                  {item.product_title}
                </LocalizedClientLink>
              </h3>
              <LineItemOptions variant={item.variant} data-testid="product-variant" />
            </div>

            <div className="shrink-0 text-right">
              {type === "full" && (
                <div className="mb-1 hidden sm:block">
                  <LineItemUnitPrice
                    item={item}
                    style="tight"
                    currencyCode={currencyCode}
                  />
                </div>
              )}
              <LineItemPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </div>
          </div>

          {type === "full" ? (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <DeleteButton id={item.id} data-testid="product-delete-button">
                Remove
              </DeleteButton>
              <CartItemSelect
                value={item.quantity}
                onChange={(value) => changeQuantity(parseInt(value.target.value))}
                className="w-16"
                data-testid="product-select-button"
              >
                {Array.from(
                  {
                    length: Math.min(maxQuantity, 10),
                  },
                  (_, i) => (
                    <option value={i + 1} key={i}>
                      {i + 1}
                    </option>
                  )
                )}

                <option value={1} key={1}>
                  1
                </option>
              </CartItemSelect>
              {updating && <Spinner />}
            </div>
          ) : (
            <div className="mt-4 flex items-center justify-between gap-4 text-sm text-muted-foreground">
              <span>{item.quantity}x</span>
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </div>
          )}

          <ErrorMessage error={error} data-testid="product-error-message" />
        </div>
      </div>
    </article>
  )
}

export default Item
