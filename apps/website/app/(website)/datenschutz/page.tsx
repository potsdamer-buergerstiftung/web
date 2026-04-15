import Blocks from "@/components/block";
import {
  PageBreadcrumb,
  PageBreadcrumbItem,
} from "@/components/page-breadcrumb";
import PageTitle from "@/components/page-title";
import { readSingleton } from "@directus/sdk";
import directus from "../directus";

async function getPrivacy() {
  const res = await directus.request(readSingleton("privacy_policy"));
  return res.content;
}

export default async function ImprintPage() {
  const data = await getPrivacy();

  return (
    <>
      <PageTitle
        title="Datenschutzerklärung"
        isCompact
        breadcrumb={
          <PageBreadcrumb>
            <PageBreadcrumbItem label="Datenschutzerklärung" />
          </PageBreadcrumb>
        }
      />
      <section className="pb-20 max-w-4xl mx-auto px-4">
        <Blocks data={data} />
      </section>
    </>
  );
}
