import { PageBreadcrumb, PageBreadcrumbItem, PageBreadcrumbSeparator } from "@/components/PageBreadcrumb";
import PageTitle from "@/components/PageTitle";
import directus from "portal";
import { Metadata } from "next";
import { Suspense } from "react";
import PublicationsGrid from "./PublicationsGrid";
import { readItems } from "@directus/sdk";

async function getPublicationCategories() {
    const res = await directus.request(readItems("publication_categories", {
        fields: ["id", "title", "description", {
            publications: ["title", "id", "date_created", {
                file: ["id", "filename_disk", "filename_download"]
            }]
        }],
        sort: ["sort"]
    }));

    return res;
}

export type PublicationsQuery = Awaited<ReturnType<typeof getPublicationCategories>>;

export const metadata: Metadata = {
    title: "Veröffentlichungen - Potsdamer Bürgerstiftung",
}

export default function PublicationsPage() {
    const categories = getPublicationCategories();
    return (
        <>
            <PageTitle title="Veröffentlichungen" breadcrumb={<PageBreadcrumb>
                <PageBreadcrumbItem label="Stiftung" href="/stiftung" />
                <PageBreadcrumbSeparator />
                <PageBreadcrumbItem label="Veröffentlichungen" />
            </PageBreadcrumb>} />
            <Suspense>
                <PublicationsGrid promise={categories} />
            </Suspense>
        </>
    )
}