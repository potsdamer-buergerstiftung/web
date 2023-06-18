import { Directus } from "@directus/sdk";
import { Suspense } from "react";
import ProjectContent from "./ProjectContent";

async function getProject(slug: string) {
    const directus = new Directus("https://portal.potsdamer-buergerstiftung.org");
    const res = await directus.items<any, any>("projects").readByQuery({
        fields: ["title", "sub_title", "image", "content"],
        filter: {
            id: {
                _eq: slug,
            },
        }
    });

    console.log(res.data![0])

    return res.data![0];
}
export default function ProjectPage({
    params,
}: {
    params: { slug: string };
}) {
    const project = getProject(params.slug);

    return (
        <>
            <Suspense>
                {/* @ts-ignore-error */}
                <ProjectContent promise={project} />
            </Suspense>
        </>
    )
}