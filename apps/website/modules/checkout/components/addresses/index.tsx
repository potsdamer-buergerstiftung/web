"use client"

import { useActionState, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { HttpTypes } from "@medusajs/types"

import { setAddresses } from "@/lib/data/cart"
import compareAddresses from "@/lib/util/compare-addresses"
import Divider from "@/modules/common/components/divider"
import Spinner from "@/modules/common/icons/spinner"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const [sameAsBilling, setSameAsBilling] = useState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart.shipping_address, cart.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <section className="rounded-3xl border border-border bg-white/90 p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 font-header text-3xl font-bold text-foreground">
          Lieferadresse
          {!isOpen && <CheckCircleIcon className="size-6 text-primary" />}
        </h2>
        {!isOpen && cart?.shipping_address && (
          <button
            onClick={handleEdit}
            className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
            data-testid="edit-address-button"
          >
            Bearbeiten
          </button>
        )}
      </div>

      {isOpen ? (
        <form action={formAction}>
          <div className="pb-2">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={() => setSameAsBilling((value) => !value)}
              cart={cart}
            />

            {!sameAsBilling && (
              <div className="mt-8 rounded-2xl border border-border bg-background/60 p-5">
                <h3 className="pb-6 font-header text-2xl font-bold text-foreground">
                  Rechnungsadresse
                </h3>

                <BillingAddress cart={cart} />
              </div>
            )}

            <SubmitButton className="mt-6" data-testid="submit-address-button">
              Weiter zur Lieferung
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div className="text-sm text-muted-foreground">
          {cart && cart.shipping_address ? (
            <div className="grid gap-4 md:grid-cols-3">
              <div data-testid="shipping-address-summary">
                <p className="mb-1 font-medium text-foreground">Lieferadresse</p>
                <p>
                  {cart.shipping_address.first_name} {cart.shipping_address.last_name}
                </p>
                <p>
                  {cart.shipping_address.address_1} {cart.shipping_address.address_2}
                </p>
                <p>
                  {cart.shipping_address.postal_code}, {cart.shipping_address.city}
                </p>
                <p>{cart.shipping_address.country_code?.toUpperCase()}</p>
              </div>

              <div data-testid="shipping-contact-summary">
                <p className="mb-1 font-medium text-foreground">Kontakt</p>
                <p>{cart.shipping_address.phone}</p>
                <p>{cart.email}</p>
              </div>

              <div data-testid="billing-address-summary">
                <p className="mb-1 font-medium text-foreground">Rechnungsadresse</p>

                {sameAsBilling ? (
                  <p>Rechnungs- und Lieferadresse sind identisch.</p>
                ) : (
                  <>
                    <p>
                      {cart.billing_address?.first_name} {cart.billing_address?.last_name}
                    </p>
                    <p>
                      {cart.billing_address?.address_1} {cart.billing_address?.address_2}
                    </p>
                    <p>
                      {cart.billing_address?.postal_code}, {cart.billing_address?.city}
                    </p>
                    <p>{cart.billing_address?.country_code?.toUpperCase()}</p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="py-8">
              <Spinner />
            </div>
          )}
        </div>
      )}

      <Divider className="mt-8" />
    </section>
  )
}

export default Addresses
