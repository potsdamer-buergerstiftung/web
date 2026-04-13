import { PageBreadcrumb, PageBreadcrumbItem, PageBreadcrumbSeparator } from "@/components/PageBreadcrumb";
import PageTitle from "@/components/PageTitle";
import ProjectGrid from "@/app/(website)/ProjectGrid";
import ProjectGridLoading from "@/app/(website)/ProjectGridLoading";
import { Metadata } from "next";
import { Suspense } from "react";
import directus from "@/app/(website)/directus";
import { readItems } from "@directus/sdk";
import ProjectFilterTabs from "./ProjectFilterTabs";

export const revalidate = 120;

export const metadata: Metadata = {
    title: "Projekte - Potsdamer Bürgerstiftung",
}

const slugStatusMap = {
    "wiederkehrend": "Wiederkehrende Projekte",
    "abgeschlossen": "Abgeschlossene Projekte",
    "in-planung": "Projekte in Planung",
    "laufend": "Laufende Projekte",
}

function mapSlugToStatus(slug: string) {
    switch (slug) {
        case "wiederkehrend":
            return "recurring";
        case "abgeschlossen":
            return "finalized";
        case "in-planung":
            return "planning";
        case "laufend":
            return "inprogress";
        default:
            return "published";
    }
}

async function getProjects(status?: string) {
    console.log(status)
    const filter = status ? {
        status: {
            _eq: mapSlugToStatus(status),
        }
    } : {};

    console.log("FILTER", filter)

    const res = await directus.request(readItems("projects", {
        fields: [
            "id",
            "status",
            "title",
            "image",
            "sub_title"
        ],
        filter,
        sort: ["sort"],
    }));

    return res;
}

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await searchParams;

    const projects = getProjects(typeof params.status === "string" ? params.status : undefined);

    return (
        <>
            <PageTitle title="Aktuelles & Projekte" breadcrumb={<PageBreadcrumb>
                <PageBreadcrumbItem label="Aktuelles & Projekte" href="/aktuelles" />
                <PageBreadcrumbSeparator />
                <PageBreadcrumbItem label="Projekte" />
            </PageBreadcrumb>} actions={
                <ProjectFilterTabs activeSlug={typeof params.status === "string" ? params.status : ""} />
            } />
            <div className="container mx-auto px-4 pb-20">
                <Suspense fallback={<ProjectGridLoading />}>
                    {/* @ts-ignore-error */}
                    <ProjectGrid promise={projects} />
                </Suspense>
            </div>
        </>
    )
}