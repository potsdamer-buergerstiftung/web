"use client"

import { Radio, RadioGroup } from "@headlessui/react"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { setShippingMethod } from "@/lib/data/cart"
import { calculatePriceForShippingOption } from "@/lib/data/fulfillment"
import { cn } from "@/lib/utils"
import { convertToLocale } from "@/lib/util/money"
import { HttpTypes } from "@medusajs/types"

import ErrorMessage from "@/modules/checkout/components/error-message"
import Divider from "@/modules/common/components/divider"
import MedusaRadio from "@/modules/common/components/radio"
import Spinner from "@/modules/common/icons/spinner"

const PICKUP_OPTION_ON = "__PICKUP_ON"
const PICKUP_OPTION_OFF = "__PICKUP_OFF"

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

function formatAddress(address: HttpTypes.StoreCartAddress) {
  if (!address) {
    return ""
  }

  let ret = ""

  if (address.address_1) {
    ret += ` ${address.address_1}`
  }

  if (address.address_2) {
    ret += `, ${address.address_2}`
  }

  if (address.postal_code) {
    ret += `, ${address.postal_code} ${address.city}`
  }

  if (address.country_code) {
    ret += `, ${address.country_code.toUpperCase()}`
  }

  return ret
}

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPrices, setIsLoadingPrices] = useState(true)
  const [showPickupOptions, setShowPickupOptions] =
    useState<string>(PICKUP_OPTION_OFF)
  const [calculatedPricesMap, setCalculatedPricesMap] = useState<
    Record<string, number>
  >({})
  const [error, setError] = useState<string | null>(null)
  const [shippingMethodId, setShippingMethodId] = useState<string | null>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || null
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  const _shippingMethods = availableShippingMethods?.filter(
    (sm) => sm.service_zone?.fulfillment_set?.type !== "pickup"
  )

  const _pickupMethods = availableShippingMethods?.filter(
    (sm) => sm.service_zone?.fulfillment_set?.type === "pickup"
  )

  const hasPickupOptions = !!_pickupMethods?.length

  useEffect(() => {
    setIsLoadingPrices(true)

    if (_shippingMethods?.length) {
      const promises = _shippingMethods
        .filter((sm) => sm.price_type === "calculated")
        .map((sm) => calculatePriceForShippingOption(sm.id, cart.id))

      if (promises.length) {
        Promise.allSettled(promises).then((res) => {
          const pricesMap: Record<string, number> = {}
          res
            .filter((r) => r.status === "fulfilled")
            .forEach((p) => (pricesMap[p.value?.id || ""] = p.value?.amount!))

          setCalculatedPricesMap(pricesMap)
          setIsLoadingPrices(false)
        })
      } else {
        setIsLoadingPrices(false)
      }
    } else {
      setIsLoadingPrices(false)
    }

    if (_pickupMethods?.find((m) => m.id === shippingMethodId)) {
      setShowPickupOptions(PICKUP_OPTION_ON)
    }
  }, [availableShippingMethods, cart.id, shippingMethodId, _pickupMethods, _shippingMethods])

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false })
  }

  const handleSubmit = () => {
    router.push(pathname + "?step=payment", { scroll: false })
  }

  const handleSetShippingMethod = async (
    id: string,
    variant: "shipping" | "pickup"
  ) => {
    setError(null)

    if (variant === "pickup") {
      setShowPickupOptions(PICKUP_OPTION_ON)
    } else {
      setShowPickupOptions(PICKUP_OPTION_OFF)
    }

    let currentId: string | null = null
    setIsLoading(true)
    setShippingMethodId((prev) => {
      currentId = prev
      return id
    })

    await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
      .catch((err) => {
        setShippingMethodId(currentId)
        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <section className="rounded-3xl border border-border bg-white/90 p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2
          className={cn(
            "flex items-center gap-2 font-header text-3xl font-bold text-foreground",
            !isOpen && cart.shipping_methods?.length === 0 && "opacity-50"
          )}
        >
          Lieferung
          {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && (
            <CheckCircleIcon className="size-6 text-primary" />
          )}
        </h2>
        {!isOpen &&
          cart?.shipping_address &&
          cart?.billing_address &&
          cart?.email && (
            <button
              onClick={handleEdit}
              className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
              data-testid="edit-delivery-button"
            >
              Edit
            </button>
          )}
      </div>

      {isOpen ? (
        <div className="grid gap-8">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">
              Versandart
            </span>
            <span className="mb-4 text-sm text-muted-foreground">
              Wie möchten Sie Ihre Bestellung erhalten?
            </span>
          </div>

          <div data-testid="delivery-options-container" className="pb-8 md:pt-0 pt-2">
            {hasPickupOptions && (
              <RadioGroup
                value={showPickupOptions}
                onChange={() => {
                  const id = _pickupMethods?.find(
                    (option) => !option.insufficient_inventory
                  )?.id

                  if (id) {
                    handleSetShippingMethod(id, "pickup")
                  }
                }}
              >
                <Radio
                  value={PICKUP_OPTION_ON}
                  data-testid="delivery-option-radio"
                  className={cn(
                    "mb-2 flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4 transition-colors hover:border-primary/40",
                    showPickupOptions === PICKUP_OPTION_ON
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-white"
                  )}
                >
                  <div className="flex items-center gap-x-4">
                    <MedusaRadio checked={showPickupOptions === PICKUP_OPTION_ON} />
                    <span className="text-sm font-medium text-foreground">
                      Bestellung abholen
                    </span>
                  </div>
                  <span className="justify-self-end text-foreground">-</span>
                </Radio>
              </RadioGroup>
            )}

            <RadioGroup
              value={shippingMethodId}
              onChange={(v) => {
                if (v) {
                  return handleSetShippingMethod(v, "shipping")
                }
              }}
            >
              {_shippingMethods?.map((option) => {
                const isDisabled =
                  option.price_type === "calculated" &&
                  !isLoadingPrices &&
                  typeof calculatedPricesMap[option.id] !== "number"

                return (
                  <Radio
                    key={option.id}
                    value={option.id}
                    data-testid="delivery-option-radio"
                    disabled={isDisabled}
                    className={cn(
                      "mb-2 flex items-center justify-between gap-4 rounded-2xl border p-4 transition-colors",
                      option.id === shippingMethodId
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border bg-white hover:border-primary/40",
                      isDisabled && "cursor-not-allowed opacity-50"
                    )}
                  >
                    <div className="flex items-center gap-x-4">
                      <MedusaRadio checked={option.id === shippingMethodId} />
                      <span className="text-sm font-medium text-foreground">
                        {option.name}
                      </span>
                    </div>
                    <span className="justify-self-end text-foreground">
                      {option.price_type === "flat" ? (
                        convertToLocale({
                          amount: option.amount!,
                          currency_code: cart?.currency_code,
                        })
                      ) : calculatedPricesMap[option.id] ? (
                        convertToLocale({
                          amount: calculatedPricesMap[option.id],
                          currency_code: cart?.currency_code,
                        })
                      ) : isLoadingPrices ? (
                        <Spinner size="16" />
                      ) : (
                        "-"
                      )}
                    </span>
                  </Radio>
                )
              })}
            </RadioGroup>
          </div>

          {showPickupOptions === PICKUP_OPTION_ON && (
            <div className="grid gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">Abholort</span>
                <span className="mb-4 text-sm text-muted-foreground">
                  Wählen Sie einen Standort in Ihrer Nähe
                </span>
              </div>
              <div data-testid="delivery-options-container">
                <div className="pb-8 md:pt-0 pt-2">
                  <RadioGroup
                    value={shippingMethodId}
                    onChange={(v) => {
                      if (v) {
                        return handleSetShippingMethod(v, "pickup")
                      }
                    }}
                  >
                    {_pickupMethods?.map((option) => {
                      return (
                        <Radio
                          key={option.id}
                          value={option.id}
                          disabled={option.insufficient_inventory}
                          data-testid="delivery-option-radio"
                          className={cn(
                            "mb-2 flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4 transition-colors hover:border-primary/40",
                            option.id === shippingMethodId
                              ? "border-primary bg-primary/5 shadow-sm"
                              : "border-border bg-white",
                            option.insufficient_inventory && "cursor-not-allowed opacity-50"
                          )}
                        >
                          <div className="flex items-start gap-x-4">
                            <MedusaRadio checked={option.id === shippingMethodId} />
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-foreground">
                                {option.name}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {formatAddress(
                                  option.service_zone?.fulfillment_set?.location
                                    ?.address
                                )}
                              </span>
                            </div>
                          </div>
                          <span className="justify-self-end text-foreground">
                            {convertToLocale({
                              amount: option.amount!,
                              currency_code: cart?.currency_code,
                            })}
                          </span>
                        </Radio>
                      )
                    })}
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          <div>
            <ErrorMessage error={error} data-testid="delivery-option-error-message" />
            <Button
              size="lg"
              className="mt-6"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={!cart.shipping_methods?.[0]}
              data-testid="submit-delivery-option-button"
            >
              Weiter zur Zahlung
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">
          {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
            <div className="max-w-sm">
              <p className="mb-1 font-medium text-foreground">Methode</p>
              <p>
                {cart.shipping_methods!.at(-1)!.name} {" "}
                {convertToLocale({
                  amount: cart.shipping_methods!.at(-1)!.amount!,
                  currency_code: cart?.currency_code,
                })}
              </p>
            </div>
          )}
        </div>
      )}

      <Divider className="mt-8" />
    </section>
  )
}

export default Shipping
