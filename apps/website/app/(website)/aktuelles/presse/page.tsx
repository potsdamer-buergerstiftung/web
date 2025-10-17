import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import { Directus } from "@directus/sdk";
import { Suspense } from "react";
import MediaReportsGrid from "./MediaReportsGrid";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Metadata } from "next";

async function getMediaReports() {
    const directus = new Directus("https://portal.potsdamer-buergerstiftung.org");
    const res = await directus.items<any, any>("media_reports").readByQuery({
        fields: ["id", "title", "publisher", "date", "url", "project.title"],
        sort: ["-date"],
    });
    return res.data;
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
