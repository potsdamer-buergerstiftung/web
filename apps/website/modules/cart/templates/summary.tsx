"use client";

import { Button } from "@/components/ui/button";

import CartTotals from "@/modules/common/components/cart-totals";
import Divider from "@/modules/common/components/divider";
import DiscountCode from "@/modules/checkout/components/discount-code";
import LocalizedClientLink from "@/modules/common/components/localized-client-link";
import { HttpTypes } from "@medusajs/types";

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[];
  };
};

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address";
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery";
  } else {
    return "payment";
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-header text-3xl font-bold text-foreground">
        Zusammenfassung
      </h2>
      <DiscountCode cart={cart} />
      <Divider />
      <CartTotals totals={cart} />
      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
      >
        <Button className="w-full" size="lg">
          Zur Kasse gehen
        </Button>
      </LocalizedClientLink>
    </div>
  );
};

export default Summary;
