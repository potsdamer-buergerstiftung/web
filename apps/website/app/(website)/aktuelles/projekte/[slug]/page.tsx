import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import { Directus } from "@directus/sdk";
import ProjectGrid from "app/(website)/ProjectGrid";
import ProjectGridLoading from "app/(website)/ProjectGridLoading";
import { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";
import PostGrid from "../../blog/PostGrid";
import ProjectFilterTabs from "../ProjectFilterTabs";
import { isFilter } from "../util";
import ProjectContent from "./ProjectContent";

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

async function getProject(slug: string) {
    const isFilterS = isFilter(slug);

    let filter: any;

    if (isFilterS) {
        let formattedSlug = mapSlugToStatus(slug);
        filter = {
            status: {
                _eq: formattedSlug,
            },
        };
    } else {
        filter = {
            id: {
                _eq: slug,
            },
        };
    }

    const directus = new Directus("https://portal.potsdamer-buergerstiftung.org");
    const res = await directus.items<any, any>("projects").readByQuery({
        fields: ["title", "sub_title", "image", "content", "id", "status"],
        filter,
    });

    if (isFilterS) {
        return res.data;
    }

    return res.data![0];
}

async function getPosts(projectId: string) {
    const directus = new Directus("https://portal.potsdamer-buergerstiftung.org");
    const res = await directus.items<any, any>("posts").readByQuery({
        fields: ["title", "date", "id", "image", "tags", "project.title", "slug"],
        limit: 4,
        filter: {
          project: {
              _eq: projectId,
          }
        },
        sort: ["-date"],
    });
    return res.data;
}

type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent?: ResolvingMetadata
): Promise<Metadata> {
    const id = params.slug;
    const isFilterS = isFilter(id);

    if (isFilterS) {
        const title = slugStatusMap[id];
        return {
            title: `${title} - Potsdamer Bürgerstiftung`,
        }
    }

    const project = await getProject(id);

    return {
        title: `${project.title} - Potsdamer Bürgerstiftung`,
    }
}

export default function ProjectPage({
    params,
}: {
    params: { slug: string };
}) {
    const project = getProject(params.slug);
    const posts = getPosts(params.slug);

    const { slug } = params;

    const isFilterS = isFilter(slug);

    if (isFilterS) {
        const title = slugStatusMap[slug];
        return (
            <>
                <PageTitle title={title} actions={
                    <ProjectFilterTabs activeSlug={slug} />
                } breadcrumb={<PageBreadcrumb items={[<PageBreadcrumbItem label="Aktuelles & Projekte" href="/aktuelles/projekte" />, <PageBreadcrumbItem label={title} />]} />} />
                <div className="container mx-auto px-4 mb-10">
                    <Suspense fallback={<ProjectGridLoading />}>
                        {/* @ts-ignore-error */}
                        <ProjectGrid promise={project} />
                    </Suspense>
                </div>
            </>
        )
    }

    return (
        <>
            <Suspense>
                {/* @ts-ignore-error */}
                <ProjectContent promise={project} />
                <div className="container mx-auto px-4 mb-10 mt-10">
                    <h1 className="text-3xl font-bold mb-10 font-header">Aktuelles zum Projekt</h1>
                    {/* @ts-ignore-error */}
                    <PostGrid promise={posts} />
                </div>
            </Suspense>
        </>
    )
}