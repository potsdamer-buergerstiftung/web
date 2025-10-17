import Blocks from "@components/Block/Block";
import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import { Directus } from "@directus/sdk";

async function getProjects() {
    const directus = new Directus("https://portal.potsdamer-buergerstiftung.org");
    const res: any = await directus.singleton<any>("imprint").read();
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
                breadcrumb={<PageBreadcrumb items={
                    [<PageBreadcrumbItem label="Impressum" />]
                } />}
            />
            <section className="pb-20 max-w-4xl mx-auto px-4">
                <Blocks data={data} />
            </section>
        </>
    )
}