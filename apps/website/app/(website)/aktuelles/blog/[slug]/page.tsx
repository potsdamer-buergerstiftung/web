import { Directus } from "@directus/sdk";
import { Suspense } from "react";
import Article from "./Article";

async function getPost(slug: string) {
    const directus = new Directus("https://portal.potsdamer-buergerstiftung.org");
    const res = await directus.items<any, any>("posts").readByQuery({
        fields: ["title", "content", "user_created.first_name"],
        filter: {
            slug: {
                _eq: decodeURIComponent(slug),
            },
        }
    });

    return res.data![0];
}

export default function PostPage({
    params,
}: {
    params: { slug: string };
}) {
    const posts = getPost(params.slug);

    return (
        <>
            <Suspense>
                {/* @ts-ignore-error */}
                <Article promise={posts} />
            </Suspense>
        </>
    )
}