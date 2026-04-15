import { Metadata } from "next";

import OrderOverview from "@/modules/account/components/order-overview";
import { notFound } from "next/navigation";
import { listOrders } from "@/lib/data/orders";
import Divider from "@/modules/common/components/divider";
import TransferRequestForm from "@/modules/account/components/transfer-request-form";

export const metadata: Metadata = {
  title: "Bestellungen",
  description: "Übersicht über Ihre bisherigen Bestellungen.",
};

export default async function Orders() {
  const orders = await listOrders();

  if (!orders) {
    notFound();
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Bestellungen</h1>
        <p className="text-base-regular">
          Sehen Sie sich Ihre bisherigen Bestellungen und deren Status an. Bei
          Bedarf können Sie auch Rücksendungen oder Umtausch anlegen.
        </p>
      </div>
      <div>
        <OrderOverview orders={orders} />
        <Divider className="my-16" />
        <TransferRequestForm />
      </div>
    </div>
  );
}
