"use client"

import { convertToLocale } from "@/lib/util/money"
import React from "react"

import Divider from "@/modules/common/components/divider"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    currency_code: string
    item_subtotal?: number | null
    shipping_subtotal?: number | null
    discount_subtotal?: number | null
  }
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currency_code,
    total,
    tax_total,
    item_subtotal,
    shipping_subtotal,
    discount_subtotal,
  } = totals

  return (
    <div className="flex flex-col gap-3 text-sm text-muted-foreground">
      <div className="flex items-center justify-between">
        <span>Subtotal (excl. shipping and taxes)</span>
        <span data-testid="cart-subtotal" data-value={item_subtotal || 0}>
          {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span>Shipping</span>
        <span data-testid="cart-shipping" data-value={shipping_subtotal || 0}>
          {convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })}
        </span>
      </div>
      {!!discount_subtotal && (
        <div className="flex items-center justify-between">
          <span>Discount</span>
          <span
            className="text-primary"
            data-testid="cart-discount"
            data-value={discount_subtotal || 0}
          >
            -{" "}
            {convertToLocale({
              amount: discount_subtotal ?? 0,
              currency_code,
            })}
          </span>
        </div>
      )}
      <div className="flex items-center justify-between">
        <span>Taxes</span>
        <span data-testid="cart-taxes" data-value={tax_total || 0}>
          {convertToLocale({ amount: tax_total ?? 0, currency_code })}
        </span>
      </div>
      <Divider className="my-1" />
      <div className="flex items-center justify-between font-medium text-foreground">
        <span>Total</span>
        <span className="text-xl" data-testid="cart-total" data-value={total || 0}>
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
      </div>
      <Divider className="mt-1" />
    </div>
  )
}

export default CartTotals
