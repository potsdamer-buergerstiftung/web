import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import { Directus } from "@directus/sdk";
import ProjectGrid from "app/(website)/ProjectGrid";
import ProjectGridLoading from "app/(website)/ProjectGridLoading";
import { Suspense } from "react";

async function getProjects() {
    const directus = new Directus("https://portal.potsdamer-buergerstiftung.org");
    const res = await directus.items<any, any>("projects").readByQuery();
    return res.data;
}

export default function ProjectsPage() {
    const projects = getProjects();
    return (
        <>
            <PageTitle title="Projekte" breadcrumb={<PageBreadcrumb items={[<PageBreadcrumbItem label="Aktuelles & Projekte" />, <PageBreadcrumbItem label="Projekte" />]} />} />
            <div className="container mx-auto px-4 pb-20">
                <Suspense fallback={<ProjectGridLoading />}>
                    {/* @ts-ignore-error */}
                    <ProjectGrid promise={projects} />
                </Suspense>
            </div>
        </>
    )
}