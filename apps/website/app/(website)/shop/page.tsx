import { redirect } from "next/navigation";

const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "de";

export default function ShopIndexPage() {
  redirect(`/shop/${DEFAULT_REGION}`);
}
