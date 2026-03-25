import { PageBreadcrumb, PageBreadcrumbItem } from "@components/PageBreadcrumb";
import PageTitle from "@components/PageTitle";
import { Metadata } from "next";
import { Suspense } from "react";
import PublicationsGrid from "./PublicationsGrid";
import { wixClient } from "app/(website)/wix";
import { media } from "@wix/sdk";

export const dynamic = 'force-dynamic';

async function getPublicationCategories() {
    const categories = (await wixClient.items.query("Download-Kategorien").find()).items;

    const downloads = (await wixClient.items.query("Downloads").find()).items.map((i) => {
        const d = i;
        return {
            link: media.getDocumentUrl(d.document),
            ...d
        } as any
    })

    const mapped = categories.map((c) => {
        return {
            downloads: downloads.filter((d) => d.kategorie == c._id),
            ...c
        }
    })

    return mapped
}

export const metadata: Metadata = {
    title: "Veröffentlichungen - Potsdamer Bürgerstiftung",
}

export default function PublicationsPage() {
    const categories = getPublicationCategories();
    return (
        <>
            <PageTitle title="Veröffentlichungen" breadcrumb={<PageBreadcrumb>
                <PageBreadcrumbItem label="Stiftung" href="/stiftung" />
                <PageBreadcrumbItem label="Veröffentlichungen" />
            </PageBreadcrumb>} />
            <Suspense>
                {/* @ts-ignore-error */}
                <PublicationsGrid promise={categories} />
            </Suspense>
        </>
    )
}