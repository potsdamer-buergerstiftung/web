import { Metadata } from "next";

import { listCartOptions, retrieveCart } from "@lib/data/cart";
import { retrieveCustomer } from "@lib/data/customer";
import { getBaseURL } from "@lib/util/env";
import { StoreCartShippingOption } from "@medusajs/types";
import CartMismatchBanner from "@modules/layout/components/cart-mismatch-banner";
import FreeShippingPriceNudge from "@modules/shipping/components/free-shipping-price-nudge";
import Header from "@components/Header";
import CartButtonButton from "../../CartButton";
import Footer from "@components/Footer";
import HeaderNav from "@components/Header/HeaderNav";
import HeaderNavItem from "@components/Header/HaderNavItem";
import { HeaderNavItemLocalized } from "./nav-item-country";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
};

export default async function PageLayout(props: { children: React.ReactNode }) {
  const customer = await retrieveCustomer();
  const cart = await retrieveCart();
  let shippingOptions: StoreCartShippingOption[] = [];

  if (cart) {
    const { shipping_options } = await listCartOptions();

    shippingOptions = shipping_options;
  }

  return (
    <>
      <Header
        section="Shop"
        actions={<CartButtonButton />}
      />
      {customer && cart && (
        <CartMismatchBanner customer={customer} cart={cart} />
      )}

      {cart && (
        <FreeShippingPriceNudge
          variant="popup"
          cart={cart}
          shippingOptions={shippingOptions}
        />
      )}
      <div className="pt-24">
        {props.children}
      </div>
      <Footer />
    </>
  );
}
