import Blocks from "@components/Block/Block";
import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import { readSingleton } from "@directus/sdk";

async function getPrivacy() {
    const directus = createDirectus("https://portal.potsdamer-buergerstiftung.org").with(rest());
    const res: any = await directus.request(readSingleton("privacy_policy"));
    const blocks = res.content;
    console.log(blocks);
    return res;
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