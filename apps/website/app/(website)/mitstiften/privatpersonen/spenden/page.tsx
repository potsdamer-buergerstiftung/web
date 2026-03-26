import { DonationForm } from "@components/donation";
import { readItems } from "@directus/sdk";
import directus from "portal";
import { getDonationPaymentMethods } from "@lib/data/donation";

async function getProjects() {
  const res = await directus.request(
    readItems("projects", {
      fields: ["id", "title", "sub_title"],
      filter: {
        status: {
          _in: ["inprogress", "recurring"],
        },
        allow_donations: {
          _eq: true,
        },
      },
    }),
  );
  return res;
}

export default async function PrivatDonationPage() {
  const projects = await getProjects();
  const paymentMethods = await getDonationPaymentMethods("ONE_TIME");
  return (
    <div className="container max-w-4xl px-4 mx-auto pt-48 pb-10">
      <DonationForm projects={projects} paymentMethods={paymentMethods} />
    </div>
  );
}
