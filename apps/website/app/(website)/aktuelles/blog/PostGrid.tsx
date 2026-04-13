import React, { Suspense } from "react";
import ArticleCard from "@/components/ArticleCard";
import PostGridWrapper from "./PostGridWrapper";

interface PostsGridProps {
    promise: Promise<any>;
}

export default async function PostGrid({ promise }: PostsGridProps) {
    const posts = await promise;
    return (
        <PostGridWrapper>
            {posts?.map((post: any) => (
                <ArticleCard
                    key={post.id}
                    title={post.title}
                    date={new Date(post.date)}
                    imageId={post.image}
                    projectTitle={post.project?.title}
                    link={`/aktuelles/blog/${encodeURIComponent(post.slug)}`}
                    id={post.id}
                />
            ))}
        </PostGridWrapper>
    );
}
