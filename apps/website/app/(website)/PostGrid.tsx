import React from "react";
import ArticleCard from "@components/ArticleCard";

interface PostsGridProps {
  promise: Promise<any>;
  compact?: boolean;
}

export default async function PostGrid({ promise, compact = true }: PostsGridProps) {
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
            compact={compact}
            link={`/aktuelles/blog/${post.slug}`}
            id={post.id}
          />
        </div>
      ))}
    </React.Fragment>
  );
}
