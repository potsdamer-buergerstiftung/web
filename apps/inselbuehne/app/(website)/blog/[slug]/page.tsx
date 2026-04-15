import { Metadata } from "next";
import { Suspense } from "react";
import { readItems } from "portal/sdk";
import portalServer from "portal/server";
import Article from "./Article";
import ArticleLoading from "./ArticleLoading";

export const revalidate = 60;

async function getPost(slug: string) {
  const posts = await portalServer.request(
    readItems("posts", {
      fields: [
        "title",
        "date",
        "content",
        "image",
        "excerpt",
        "slug",
        {
          "user_created": ["first_name"],
        }
      ],
      filter: {
        slug: { _eq: decodeURIComponent(slug) },
        project: { _eq: "inselbuehne" },
      },
    }),
  );

  return posts[0];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPost(slug);

  return {
    title: `${post.title} - Inselbuehne Potsdam`,
  };
}

export default async function PostPage(props: Props) {
  const { slug } = await props.params;
  const post = getPost(slug);

  return (
    <Suspense fallback={<ArticleLoading />}>
      <Article promise={post} />
    </Suspense>
  );
}
