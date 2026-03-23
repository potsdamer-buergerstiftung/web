import { readItems } from "@directus/sdk";
import { Suspense } from "react";
import Article from "./Article";
import ArticleLoading from "./ArticleLoading";
import directus from "app/(website)/directus";

async function getPost(slug: string) {
    const res = await directus.request(readItems("posts", {
        fields: ["title", "content", "user_created.first_name", "date", "image"],
        filter: {
            slug: {
                _eq: decodeURIComponent(slug),
            },
        },
    }));

    return res[0];
}

export default async function PostPage(
    props: {
        params: Promise<{ slug: string }>;
    },
) {
    const params = await props.params;
    const posts = getPost(params.slug);

    return (
        <>
            {/* @ts-ignore-error */}
            <Suspense fallback={<ArticleLoading />}>
                <Article promise={posts} />
            </Suspense>
        </>
    );
}
