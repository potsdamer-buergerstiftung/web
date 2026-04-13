import PostCard from "@/components/PostCard";
import PostGridWrapper from "./PostGridWrapper";

interface PostsGridProps {
  promise: Promise<any>;
}

export default async function PostGrid({ promise }: PostsGridProps) {
  const posts = await promise;

  return (
    <PostGridWrapper>
      {posts?.map((post: any) => (
        <PostCard
          key={post.id}
          title={post.title}
          date={post.date}
          slug={post.slug}
          id={post.id}
          image={post.image}
          excerpt={post.excerpt}
        />
      ))}
    </PostGridWrapper>
  );
}
