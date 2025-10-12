import Blocks from "@components/Block/Block";
import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
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
          <PageBreadcrumb
            items={[<PageBreadcrumbItem label="Datenschutzerklärung" />]}
          />
        }
      />
      <section className="pb-20 max-w-4xl mx-auto px-4">
        <Blocks data={data} />
      </section>
    </>
  );
}
