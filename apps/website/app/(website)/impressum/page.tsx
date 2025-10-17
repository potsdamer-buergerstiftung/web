import Blocks from "@components/Block/Block";
import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
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