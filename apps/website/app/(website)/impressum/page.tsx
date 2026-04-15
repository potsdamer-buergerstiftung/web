import Blocks from "@/components/block";
import {
  PageBreadcrumb,
  PageBreadcrumbItem,
} from "@/components/page-breadcrumb";
import PageTitle from "@/components/page-title";
import directus from "../directus";
import { readSingleton } from "@directus/sdk";

async function getProjects() {
  const res: any = await directus.request(readSingleton("imprint"));
  const blocks = res.content;
  return blocks;
}

export default async function ImprintPage() {
  const data = await getProjects();

  return (
    <>
      <PageTitle
        title="Impressum"
        isCompact
        breadcrumb={
          <PageBreadcrumb>
            <PageBreadcrumbItem label="Impressum" />
          </PageBreadcrumb>
        }
      />
      <section className="pb-20 max-w-4xl mx-auto px-4">
        <Blocks data={data} />
      </section>
    </>
  );
}
