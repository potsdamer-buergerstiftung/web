import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useToggleState from "@/lib/hooks/use-toggle-state";
import ChevronDown from "@/modules/common/icons/chevron-down";
import X from "@/modules/common/icons/x";

import { getProductPrice } from "@/lib/util/get-product-price";
import OptionSelect from "./option-select";
import { HttpTypes } from "@medusajs/types";
import { isSimpleProduct } from "@/lib/util/product";

type MobileActionsProps = {
  product: HttpTypes.StoreProduct;
  variant?: HttpTypes.StoreProductVariant;
  options: Record<string, string | undefined>;
  updateOptions: (title: string, value: string) => void;
  inStock?: boolean;
  handleAddToCart: () => void;
  isAdding?: boolean;
  show: boolean;
  optionsDisabled: boolean;
};

const MobileActions: React.FC<MobileActionsProps> = ({
  product,
  variant,
  options,
  updateOptions,
  inStock,
  handleAddToCart,
  isAdding,
  show,
  optionsDisabled,
}) => {
  const { state, open, close } = useToggleState();

  const price = getProductPrice({
    product: product,
    variantId: variant?.id,
  });

  const selectedPrice = useMemo(() => {
    if (!price) {
      return null;
    }
    const { variantPrice, cheapestPrice } = price;

    return variantPrice || cheapestPrice || null;
  }, [price]);

  const isSimple = isSimpleProduct(product);

  return (
    <>
      <div
        className={cn("fixed inset-x-0 bottom-0 z-50 lg:hidden", {
          "pointer-events-none": !show,
        })}
      >
        <Transition
          as={Fragment}
          show={show}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-3 border-t border-border bg-white p-4 text-lg shadow-[0_-20px_40px_rgba(15,23,42,0.08)]"
            data-testid="mobile-actions"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <span data-testid="mobile-title">{product.title}</span>
              <span>—</span>
              {selectedPrice ? (
                <div className="flex items-end gap-2 text-foreground">
                  {selectedPrice.price_type === "sale" && (
                    <p>
                      <span className="text-sm line-through text-muted-foreground">
                        {selectedPrice.original_price}
                      </span>
                    </p>
                  )}
                  <span
                    className={cn("text-sm font-semibold", {
                      "text-primary": selectedPrice.price_type === "sale",
                    })}
                  >
                    {selectedPrice.calculated_price}
                  </span>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div
              className={cn("grid w-full grid-cols-2 gap-4", {
                "grid-cols-1": isSimple,
              })}
            >
              {!isSimple && (
                <Button
                  onClick={open}
                  variant="secondary"
                  className="w-full"
                  data-testid="mobile-actions-button"
                >
                  <div className="flex w-full items-center justify-between gap-4">
                    <span>
                      {variant
                        ? Object.values(options).join(" / ")
                        : "Optionen auswählen"}
                    </span>
                    <ChevronDown />
                  </div>
                </Button>
              )}
              <Button
                onClick={handleAddToCart}
                disabled={!inStock || !variant}
                className="w-full"
                size="lg"
                data-testid="mobile-cart-button"
              >
                {!variant
                  ? "Variante auswählen"
                  : !inStock
                    ? "Out of stock"
                    : "In den Warenkorb"}
              </Button>
            </div>
          </div>
        </Transition>
      </div>
      <Transition appear show={state} as={Fragment}>
        <Dialog as="div" className="relative z-[75]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed bottom-0 inset-x-0">
            <div className="flex min-h-full h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel
                  className="flex h-full w-full transform flex-col gap-3 overflow-hidden text-left"
                  data-testid="mobile-actions-modal"
                >
                  <div className="flex w-full justify-end px-4 pt-4">
                    <button
                      onClick={close}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm"
                      data-testid="close-modal-button"
                    >
                      <X />
                    </button>
                  </div>
                  <div className="mx-4 rounded-3xl border border-border bg-white px-6 py-8 shadow-2xl">
                    {(product.variants?.length ?? 0) > 1 && (
                      <div className="flex flex-col gap-6">
                        {(product.options || []).map((option) => {
                          return (
                            <div key={option.id}>
                              <OptionSelect
                                option={option}
                                current={options[option.id]}
                                updateOption={updateOptions}
                                title={option.title ?? ""}
                                disabled={optionsDisabled}
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MobileActions;
