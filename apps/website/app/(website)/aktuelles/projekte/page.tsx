import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import { Directus } from "@directus/sdk";
import ProjectGrid from "app/(website)/ProjectGrid";
import ProjectGridLoading from "app/(website)/ProjectGridLoading";
import { Metadata } from "next";
import { Suspense } from "react";
import ProjectFilterTabs from "./ProjectFilterTabs";
import { wixClient } from "app/(website)/wix";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Projekte - Potsdamer Bürgerstiftung",
};

async function getProjects() {
  return (await wixClient.items.query("Projekte").find()).items;
}

export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <>
      <PageTitle
        title="Aktuelles & Projekte"
        breadcrumb={
          <PageBreadcrumb
            items={[<PageBreadcrumbItem label="Aktuelles & Projekte" />]}
          />
        }
      />
      <div className="container mx-auto px-4 pb-20">
        <Suspense fallback={<ProjectGridLoading />}>
          {/* @ts-ignore-error */}
          <ProjectGrid promise={projects} />
        </Suspense>
      </div>
    </>
  );
}
