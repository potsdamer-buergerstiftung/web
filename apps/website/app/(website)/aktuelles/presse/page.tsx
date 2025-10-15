import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import { createDirectus, readItems, rest } from "@directus/sdk";
import { Suspense } from "react";
import MediaReportsGrid from "./MediaReportsGrid";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Metadata } from "next";

async function getMediaReports() {
    const directus = createDirectus("https://portal.potsdamer-buergerstiftung.org").with(rest());
    const res = await directus.request(readItems("media_reports", {
        fields: ["id", "title", "publisher", "date", "url", "project.title"],
        sort: ["-date"],
    }));
    return res;
}

export const metadata: Metadata = {
    title: "Presseberichte - Potsdamer Bürgerstiftung",
};

export default function MediaReportsPage() {
    const posts = getMediaReports();
    return (
        <>
            <PageTitle
                title="Presseberichte"
                description="Was andere über uns berichten"
                breadcrumb={
                    <PageBreadcrumb
                        items={
                            <>
                                <PageBreadcrumbItem
                                    label="Aktuelles & Projekte"
                                    href="/aktuelles/projekte"
                                />
                                <PageBreadcrumbItem label="Presseberichte" />
                            </>
                        }
                    />
                }
            />
            <div className="container px-4 mx-auto mb-10">
                {/* @ts-ignore-error */}
                <MediaReportsGrid promise={posts} />
            </div>
        </>
    );
}
