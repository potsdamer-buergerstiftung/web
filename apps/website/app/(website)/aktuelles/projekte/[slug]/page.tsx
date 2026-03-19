import { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";
import { isFilter } from "../util";
import ProjectContent from "./ProjectContent";
import directus from "app/(website)/directus";
import { readItem, readItems } from "@directus/sdk";

export const revalidate = 120;

async function getProject(slug: string) {
    const res = await directus.request(readItem("projects", slug, {
        fields: ["title", "sub_title", "image", "content", "id", "status"],
    }));

    return res;
}

async function getPosts(projectId: string) {
    const res = await directus.request(readItems("posts", {
        fields: ["title", "date", "id", "image", "tags", "project.title", "slug"],
        limit: 4,
        filter: {
            project: {
                _eq: projectId,
            }
        },
        sort: ["-date"],
    }));

    return res;
}

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(props: Props, parent?: ResolvingMetadata): Promise<Metadata> {
    const params = await props.params;
    const id = params.slug;

    const project = await getProject(id);

    return {
        title: `${project.title} - Potsdamer Bürgerstiftung`,
    }
}

export default async function ProjectPage(
    props: {
        params: Promise<{ slug: string }>;
    }
) {
    const params = await props.params;
    const project = getProject(params.slug);

    return (
        <>
            {/* @ts-ignore-error */}
            <Suspense>
                <ProjectContent promise={project} />
            </Suspense>
        </>
    )
}