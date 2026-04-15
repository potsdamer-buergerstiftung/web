import PostGridWrapper from "./PostGridWrapper";
import ArticleCardLoading from "@/components/article/card-loading";

export default function PostGridLoading() {
  const items = new Array(6).fill(0);
  return (
    <PostGridWrapper>
      {items.map((_, i) => (
        <ArticleCardLoading key={i} />
      ))}
    </PostGridWrapper>
  );
}
