import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import { readItems } from "@directus/sdk";
import PostGrid from "./PostGrid";
import directus from "app/(website)/directus";
//import VisualEditingPage from "app/VisualEditingPage";

export const revalidate = 60;

async function getPosts() {
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
        sort: ["-date"],
    }));

    return res;
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
