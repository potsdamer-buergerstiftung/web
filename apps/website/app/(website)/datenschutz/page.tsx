import Blocks from "@components/Block/Block";
import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import { Directus } from "@directus/sdk";

async function getPrivacy() {
    const directus = new Directus("https://portal.potsdamer-buergerstiftung.org");
    const res: any = await directus.singleton<any>("privacy_policy").read();
    const blocks = res.content;
    return blocks;
}

export default async function ImprintPage() {
    const data = await getPrivacy();

    return (
        <>
            <PageTitle
                title="Datenschutzerklärung"
                isCompact
                breadcrumb={<PageBreadcrumb items={
                    [<PageBreadcrumbItem label="Datenschutzerklärung" />]
                } />}
            />
            <section className="pb-20 max-w-4xl mx-auto px-4">
                <Blocks data={data} />
            </section>
        </>
    )
}