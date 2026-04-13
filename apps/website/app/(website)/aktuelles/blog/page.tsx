import { PageBreadcrumb, PageBreadcrumbItem, PageBreadcrumbSeparator } from "@/components/PageBreadcrumb";
import PageTitle from "@/components/PageTitle";
import { readItems } from "@directus/sdk";
import PostGrid from "./PostGrid";
import PostGridLoading from "./PostGridLoading";
import directus from "@/app/(website)/directus";
import { Suspense } from "react";
import { Metadata } from "next";
//import VisualEditingPage from "@/app/VisualEditingPage";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "News & Blog - Potsdamer Bürgerstiftung",
}

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
                    <PageBreadcrumb>
                        <PageBreadcrumbItem
                            label="Aktuelles & Projekte"
                            href="/aktuelles/projekte"
                        />
                        <PageBreadcrumbSeparator />
                        <PageBreadcrumbItem label="News & Blog" />
                    </PageBreadcrumb>
                }
            />
            <div className="container mx-auto px-4 mb-10">
                {/* @ts-ignore-error */}
                <Suspense fallback={<PostGridLoading />}>
                    <PostGrid promise={posts} />
                </Suspense>
            </div>
        </>
    );
}
