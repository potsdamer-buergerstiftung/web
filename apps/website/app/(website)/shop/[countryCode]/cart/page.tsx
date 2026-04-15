import { retrieveCart } from "@/lib/data/cart";
import { retrieveCustomer } from "@/lib/data/customer";
import CartTemplate from "@/modules/cart/templates";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Warenkorb",
  description: "Sehen Sie sich Ihren Warenkorb an",
};

export default async function Cart() {
  const cart = await retrieveCart().catch((error) => {
    console.error(error);
    return notFound();
  });

  const customer = await retrieveCustomer();

  return <CartTemplate cart={cart} customer={customer} />;
}
