import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import { Directus } from "@directus/sdk";
import { Metadata } from "next";
import { Suspense } from "react";
import PublicationsGrid from "./PublicationsGrid";

async function getPublicationCategories() {
    const directus = new Directus("https://portal.potsdamer-buergerstiftung.org");
    const res = await directus.items<any, any>("publication_categories").readByQuery({
        fields: ["*", "publications.*.title", "publications.*.description", "publications.file.*"],
    });
    return res.data;
}

export const metadata: Metadata = {
    title: "Veröffentlichungen - Potsdamer Bürgerstiftung",
}

export default function PublicationsPage() {
    const categories = getPublicationCategories();
    return (
        <>
            <PageTitle title="Veröffentlichungen" breadcrumb={<PageBreadcrumb items={
                [<PageBreadcrumbItem label="Stiftung" href="/stiftung" />, <PageBreadcrumbItem label="Veröffentlichungen" />]
            } />} />
            <Suspense>
                {/* @ts-ignore-error */}
                <PublicationsGrid promise={categories} />
            </Suspense>
        </>
    )
}