import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import { Directus } from "@directus/sdk";
import PostGrid from "./PostGrid";
//import VisualEditingPage from "app/VisualEditingPage";

export const revalidate = 60;

async function getPosts() {
<<<<<<< HEAD
    const directus = createDirectus("https://portal.potsdamer-buergerstiftung.org").with(rest());
    const res = await directus.request(readItems("posts", {
        fields: [
            "title",
            "date",
            "id",
            "image",
            "tags",
            "project.title",
            "slug",
        ],
=======
    const directus = new Directus("https://portal.potsdamer-buergerstiftung.org");
    const res = await directus.items<any, any>("posts").readByQuery({
        fields: ["title", "date", "id", "image", "tags", "project.title", "slug"],
>>>>>>> parent of e94ab9f (Update directus SDK to fix url.parse())
        sort: ["-date"],
    });

    console.log(res.data);

    return res.data;
}

export default function NewsPage() {
    const posts = getPosts();
    return (
        <>
            {/* <VisualEditingPage /> */}
            <PageTitle
                title="News & Blog"
                description="Was bei uns und unseren Projekten passiert"
                breadcrumb={
                    <PageBreadcrumb
                        items={
                            <>
                                <PageBreadcrumbItem
                                    label="Aktuelles & Projekte"
                                    href="/aktuelles/projekte"
                                />
                                <PageBreadcrumbItem label="News & Blog" />
                            </>
                        }
                    />
                }
            />
            <div className="container mx-auto px-4 mb-10">
                {/* @ts-ignore-error */}
                <PostGrid promise={posts} />
            </div>
        </>
    );
}
