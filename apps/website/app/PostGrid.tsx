import React from "react";
import ArticleCard from "../components/ArticleCard";

interface PostsGridProps {
    promise: Promise<any>;
}

export default async function PostGrid({ promise }: PostsGridProps) {
    const posts = await promise;
    return (
        <React.Fragment>
            {posts?.map((post: any) => (
                <div
                    className="col-span-6 min-h-max lg:col-span-3 xl:col-span-2"
                    key={post.id}
                >
                    <ArticleCard
                        title={post.title}
                        date={new Date(post.date)}
                        imageId={post.image}
                        projectTitle={post.project?.title}
                        compact
                        link="`/stiftung/aktuelles/${post.slug}`"
                    />
                </div>
            ))}
        </React.Fragment>
    )
}
