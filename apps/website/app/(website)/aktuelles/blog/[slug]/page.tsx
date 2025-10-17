import { readItems } from "@directus/sdk";
import { Suspense } from "react";
import Article from "./Article";
import directus from "app/(website)/directus";

async function getPost(slug: string) {
    const res = await directus.request(readItems("posts", {
        fields: ["title", "content", "user_created.first_name"],
        filter: {
            slug: {
                _eq: decodeURIComponent(slug),
            },
        }
    }));

    return res;
}

export default async function PostPage(
    props: {
        params: Promise<{ slug: string }>;
    }
) {
    const params = await props.params;
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