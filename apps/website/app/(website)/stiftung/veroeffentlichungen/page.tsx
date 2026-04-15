import {
  PageBreadcrumb,
  PageBreadcrumbItem,
  PageBreadcrumbSeparator,
} from "@/components/page-breadcrumb";
import PageTitle from "@/components/page-title";
import serverClient from "portal/server";
import { readItems } from "portal/sdk";
import { Metadata } from "next";
import { Suspense } from "react";
import PublicationsGrid from "./PublicationsGrid";

async function getPublicationCategories() {
  const res = await serverClient.request(
    readItems("publication_categories", {
      fields: [
        "id",
        "title",
        "description",
        {
          publications: [
            "title",
            "id",
            "date_created",
            {
              file: ["id", "filename_disk", "filename_download"],
            },
          ],
        },
      ],
      sort: ["sort"],
    }),
  );

  return res;
}

export type PublicationsQuery = Awaited<
  ReturnType<typeof getPublicationCategories>
>;

export const metadata: Metadata = {
  title: "Veröffentlichungen - Potsdamer Bürgerstiftung",
};

export default function PublicationsPage() {
  const categories = getPublicationCategories();
  return (
    <>
      <PageTitle
        title="Veröffentlichungen"
        breadcrumb={
          <PageBreadcrumb>
            <PageBreadcrumbItem label="Stiftung" href="/stiftung" />
            <PageBreadcrumbSeparator />
            <PageBreadcrumbItem label="Veröffentlichungen" />
          </PageBreadcrumb>
        }
      />
      <Suspense>
        <PublicationsGrid promise={categories} />
      </Suspense>
    </>
  );
}
