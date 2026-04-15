import { Metadata } from "next";
import { notFound } from "next/navigation";

import AddressBook from "@/modules/account/components/address-book";

import { getRegion } from "@/lib/data/regions";
import { retrieveCustomer } from "@/lib/data/customer";

export const metadata: Metadata = {
  title: "Adressen",
  description: "Sehen Sie sich Ihre Adressen an",
};

export default async function Addresses(props: {
  params: Promise<{ countryCode: string }>;
}) {
  const params = await props.params;
  const { countryCode } = params;
  const customer = await retrieveCustomer();
  const region = await getRegion(countryCode);

  if (!customer || !region) {
    notFound();
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Lieferadressen</h1>
        <p className="text-base-regular">
          Sehen und bearbeiten Sie Ihre Lieferadressen. Sie können beliebig
          viele Adressen hinzufügen. Gespeicherte Adressen stehen Ihnen beim
          Checkout zur Verfügung.
        </p>
      </div>
      <AddressBook customer={customer} region={region} />
    </div>
  );
}
