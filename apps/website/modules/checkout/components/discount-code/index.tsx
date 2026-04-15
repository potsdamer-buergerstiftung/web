"use client";

import React from "react";

import { applyPromotions } from "@/lib/data/cart";
import { convertToLocale } from "@/lib/util/money";
import { HttpTypes } from "@medusajs/types";
import Trash from "@/modules/common/icons/trash";
import ErrorMessage from "../error-message";
import { SubmitButton } from "../submit-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[];
  };
};

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const { promotions = [] } = cart;
  const removePromotionCode = async (code: string) => {
    const validPromotions = promotions.filter(
      (promotion) => promotion.code !== code,
    );

    await applyPromotions(
      validPromotions.filter((p) => p.code !== undefined).map((p) => p.code!),
    );
  };

  const addPromotionCode = async (formData: FormData) => {
    setErrorMessage("");

    const code = formData.get("code");
    if (!code) {
      return;
    }
    const input = document.getElementById(
      "promotion-input",
    ) as HTMLInputElement;
    const codes = promotions
      .filter((p) => p.code !== undefined)
      .map((p) => p.code!);
    codes.push(code.toString());

    try {
      await applyPromotions(codes);
    } catch (e: any) {
      setErrorMessage(e.message);
    }

    if (input) {
      input.value = "";
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-white/90 p-5 shadow-sm">
      <form
        action={(a) => addPromotionCode(a)}
        className="flex w-full flex-col gap-4"
      >
        <div className="flex items-center justify-between gap-3">
          <Label className="text-sm font-medium text-foreground">
            Aktionscode
          </Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="add-discount-button"
          >
            {isOpen ? "Ausblenden" : "Code hinzufügen"}
          </Button>
        </div>

        {isOpen && (
          <>
            <div className="flex w-full gap-2">
              <Input
                className="flex-1"
                id="promotion-input"
                name="code"
                type="text"
                autoFocus={false}
                data-testid="discount-input"
              />
              <SubmitButton
                variant="secondary"
                data-testid="discount-apply-button"
              >
                Anwenden
              </SubmitButton>
            </div>

            <ErrorMessage
              error={errorMessage}
              data-testid="discount-error-message"
            />
          </>
        )}

        {promotions.length > 0 && (
          <div className="flex flex-col gap-3 pt-2">
            <p className="text-sm font-medium text-foreground">
              Angewendete Aktionscodes
            </p>

            {promotions.map((promotion) => {
              return (
                <div
                  key={promotion.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background/60 px-4 py-3"
                  data-testid="discount-row"
                >
                  <div
                    className="min-w-0 text-sm text-muted-foreground"
                    data-testid="discount-code"
                  >
                    <Badge
                      variant={promotion.is_automatic ? "secondary" : "outline"}
                      className="mr-2"
                    >
                      {promotion.code}
                    </Badge>
                    <span className="truncate">
                      {promotion.application_method?.value !== undefined &&
                        promotion.application_method.currency_code !==
                          undefined && (
                          <>
                            (
                            {promotion.application_method.type === "percentage"
                              ? `${promotion.application_method.value}%`
                              : convertToLocale({
                                  amount: +promotion.application_method.value,
                                  currency_code:
                                    promotion.application_method.currency_code,
                                })}
                            )
                          </>
                        )}
                    </span>
                  </div>
                  {!promotion.is_automatic && (
                    <button
                      type="button"
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      onClick={() => {
                        if (!promotion.code) {
                          return;
                        }

                        removePromotionCode(promotion.code);
                      }}
                      data-testid="remove-discount-button"
                    >
                      <span className="sr-only">
                        Aktionscode aus der Bestellung entfernen
                      </span>
                      <Trash size={14} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </form>
    </div>
  );
};

export default DiscountCode;
