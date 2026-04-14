"use client"

import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <section className="rounded-3xl border border-border bg-white/90 p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2
          className={cn(
            "font-header text-3xl font-bold text-foreground",
            !isOpen && "opacity-50"
          )}
        >
          Prüfung
        </h2>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="mb-6 flex w-full items-start gap-3">
            <div className="w-full">
              <p className="text-sm font-medium text-foreground">
                Mit Klick auf die Schaltfläche „Bestellung aufgeben“ bestätigen
                Sie, dass Sie unsere Nutzungsbedingungen, Verkaufsbedingungen
                und Rückgaberichtlinien gelesen, verstanden und akzeptiert haben
                und unsere Datenschutzrichtlinie zur Kenntnis genommen haben.
              </p>
            </div>
          </div>
          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </>
      )}
    </section>
  )
}

export default Review
