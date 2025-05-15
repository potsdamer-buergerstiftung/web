import React, { Suspense } from "react";
import ArticleCard from "@components/ArticleCard";
import PostGridWrapper from "./PostGridWrapper";

interface PostsGridProps {
    promise: Promise<any>;
}

export default async function PostGrid({ promise }: PostsGridProps) {
    const posts = await promise;
    return (
        <Suspense>
            <PostGridWrapper>
                {posts?.map((post: any) => (
                    <div
                        key={post.id}
                    >
                        <ArticleCard
                            title={post.title}
                            date={new Date(post.date)}
                            imageId={post.image}
                            projectTitle={post.project?.title}
                            link={`/aktuelles/blog/${encodeURIComponent(post.slug)}`}
                            id={post.id}
                        />
                    </div>
                ))}
            </PostGridWrapper>
        </Suspense>
    )
}
