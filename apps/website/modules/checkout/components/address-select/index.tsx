import { Listbox, Transition } from "@headlessui/react"
import { Fragment, useMemo } from "react"

import Radio from "@/modules/common/components/radio"
import compareAddresses from "@/lib/util/compare-addresses"
import { HttpTypes } from "@medusajs/types"
import { ChevronUpDownIcon } from "@heroicons/react/24/solid"

import { cn } from "@/lib/utils"

type AddressSelectProps = {
  addresses: HttpTypes.StoreCustomerAddress[]
  addressInput: HttpTypes.StoreCartAddress | null
  onSelect: (
    address: HttpTypes.StoreCartAddress | undefined,
    email?: string
  ) => void
}

const AddressSelect = ({
  addresses,
  addressInput,
  onSelect,
}: AddressSelectProps) => {
  const handleSelect = (id: string) => {
    const savedAddress = addresses.find((a) => a.id === id)
    if (savedAddress) {
      onSelect(savedAddress as HttpTypes.StoreCartAddress)
    }
  }

  const selectedAddress = useMemo(() => {
    return addresses.find((a) => compareAddresses(a, addressInput))
  }, [addresses, addressInput])

  return (
    <Listbox onChange={handleSelect} value={selectedAddress?.id}>
      <div className="relative">
        <Listbox.Button
          className="flex h-12 w-full items-center justify-between rounded-md border border-border bg-white px-4 py-2.5 text-left text-sm transition-colors hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10"
          data-testid="shipping-address-select"
        >
          {({ open }) => (
            <>
              <span className="block truncate">
                {selectedAddress
                  ? `${selectedAddress.first_name} ${selectedAddress.last_name}`
                    : "Adresse auswählen"}
              </span>
              <ChevronUpDownIcon
                className={cn("size-4 transition-transform duration-200", {
                  "rotate-180": open,
                })}
              />
            </>
          )}
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className="absolute z-20 mt-2 w-full overflow-auto rounded-md border border-border bg-white p-2 text-sm shadow-lg focus:outline-none max-h-60"
            data-testid="shipping-address-options"
          >
            {addresses.map((address) => {
              return (
                <Listbox.Option
                  key={address.id}
                  value={address.id}
                  className="cursor-default select-none rounded-lg px-4 py-3 transition-colors hover:bg-background"
                  data-testid="shipping-address-option"
                >
                  <div className="flex gap-x-4 items-start">
                    <Radio
                      checked={selectedAddress?.id === address.id}
                      data-testid="shipping-address-radio"
                    />
                    <div className="flex flex-col">
                      <span className="text-left text-sm font-medium text-foreground">
                        {address.first_name} {address.last_name}
                      </span>
                      {address.company && (
                        <span className="text-sm text-muted-foreground">
                          {address.company}
                        </span>
                      )}
                      <div className="mt-2 flex flex-col text-left text-sm text-muted-foreground">
                        <span>
                          {address.address_1}
                          {address.address_2 && (
                            <span>, {address.address_2}</span>
                          )}
                        </span>
                        <span>
                          {address.postal_code}, {address.city}
                        </span>
                        <span>
                          {address.province && `${address.province}, `}
                          {address.country_code?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Listbox.Option>
              )
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default AddressSelect
