import { Metadata } from "next";

import ProfilePhone from "@/modules/account//components/profile-phone";
import ProfileBillingAddress from "@/modules/account/components/profile-billing-address";
import ProfileEmail from "@/modules/account/components/profile-email";
import ProfileName from "@/modules/account/components/profile-name";
import ProfilePassword from "@/modules/account/components/profile-password";

import { notFound } from "next/navigation";
import { listRegions } from "@/lib/data/regions";
import { retrieveCustomer } from "@/lib/data/customer";

export const metadata: Metadata = {
  title: "Profil",
  description:
    "Sehen und bearbeiten Sie Ihr Profil im Potsdamer Bürgerstiftung Shop.",
};

export default async function Profile() {
  const customer = await retrieveCustomer();
  const regions = await listRegions();

  if (!customer || !regions) {
    notFound();
  }

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Profil</h1>
        <p className="text-base-regular">
          Sehen und bearbeiten Sie Ihre Profildaten einschließlich Name, E-Mail
          und Telefonnummer. Sie können auch Ihre Rechnungsadresse oder Ihr
          Passwort ändern.
        </p>
      </div>
      <div className="flex flex-col gap-y-8 w-full">
        <ProfileName customer={customer} />
        <Divider />
        <ProfileEmail customer={customer} />
        <Divider />
        <ProfilePhone customer={customer} />
        <Divider />
        {/* <ProfilePassword customer={customer} />
        <Divider /> */}
        <ProfileBillingAddress customer={customer} regions={regions} />
      </div>
    </div>
  );
}

const Divider = () => {
  return <div className="w-full h-px bg-gray-200" />;
};
``;
