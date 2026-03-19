import { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";
import ProjectContent from "./ProjectContent";
import directus from "app/(website)/directus";
import { readItem, readItems } from "@directus/sdk";
import PostGrid from "app/(website)/aktuelles/blog/PostGrid";

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
    const posts = await getPosts(id);

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
    const posts = getPosts(params.slug);

    return (
        <>
            <Suspense>
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