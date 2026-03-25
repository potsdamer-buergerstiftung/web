import { PageBreadcrumb, PageBreadcrumbItem, PageBreadcrumbSeparator } from "@components/PageBreadcrumb";
import PageTitle from "@components/PageTitle";
import { readItems } from "@directus/sdk";
import MediaReportsGrid from "./MediaReportsGrid";
import { Metadata } from "next";
import directus from "app/(website)/directus";

async function getMediaReports() {
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
                    <PageBreadcrumb>
                        <PageBreadcrumbItem
                            label="Aktuelles & Projekte"
                            href="/aktuelles/projekte"
                        />
                        <PageBreadcrumbSeparator />
                        <PageBreadcrumbItem label="Presseberichte" />
                    </PageBreadcrumb>
                }
            />
            <div className="container px-4 mx-auto mb-10">
                {/* @ts-ignore-error */}
                <MediaReportsGrid promise={posts} />
            </div>
        </>
    );
}
