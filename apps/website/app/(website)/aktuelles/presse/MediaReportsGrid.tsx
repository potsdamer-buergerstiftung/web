import React, { Suspense } from "react";
import ArticleCard from "@components/ArticleCard";
import MediaReportsWrapper from "./MediaReportsWrapper";

interface PostsGridProps {
  promise: Promise<any>;
}

export default async function MediaReportsGrid({ promise }: PostsGridProps) {
  const posts = await promise;

  return (
    <Suspense>
      <MediaReportsWrapper>
        {posts?.map((post: any) => (
          <div key={post.id}>
            <ArticleCard
              title={post.title}
              date={new Date(post.date)}
              imageId={post.image}
              projectTitle={post.publisher}
              link={post.url}
            />
          </div>
        ))}
      </MediaReportsWrapper>
    </Suspense>
  );
}
