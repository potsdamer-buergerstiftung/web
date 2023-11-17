import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import { Directus } from "@directus/sdk";
import PostGrid from "./PostGrid";

async function getPosts() {
    const directus = new Directus("https://portal.potsdamer-buergerstiftung.org");
    const res = await directus.items<any, any>("posts").readByQuery({
        fields: ["title", "date", "id", "image", "tags", "project.title", "slug"],
        sort: ["-date"],
    });
    return res.data;
}

export default function NewsPage() {
    const posts = getPosts();
    return (
        <>
            <PageTitle
                title="News & Blog"
                description="Was bei uns und unseren Projekten passiert"
                breadcrumb={
                    <PageBreadcrumb items={[<PageBreadcrumbItem label="Aktuelles & Projekte" href="/aktuelles/projekte" />, <PageBreadcrumbItem label="News & Blog" />]} />
                }
            />
            <div className="container mx-auto px-4 mb-10">
                {/* @ts-ignore-error */}
                <PostGrid promise={posts}/>
            </div>
        </>
    );
}
