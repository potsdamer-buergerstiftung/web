import { Metadata } from "next";
import { Suspense } from "react";
import { readItems } from "@directus/sdk";
import PageTitle from "@components/PageTitle";
import directus from "app/(website)/directus";
import PostGrid from "./PostGrid";
import PostGridLoading from "./PostGridLoading";

export const metadata: Metadata = {
  title: "Blog - Inselbuehne Potsdam",
  description: "Neuigkeiten und Einblicke von der Inselbuehne.",
};

export const revalidate = 60;

async function getPosts() {
  return directus.request(
    readItems("posts", {
      fields: ["title", "date", "id", "image", "excerpt", "slug"],
      sort: ["-date"],
      filter: { project: { _eq: "inselbuehne" } },
    }),
  );
}

export default function BlogPage() {
  const posts = getPosts();

  return (
    <>
      <PageTitle
        title="Neuigkeiten von der Insel"
        heading="Blog"
        description="Hintergrundberichte, aktuelle Ankündigungen und Einblicke in unser Programm auf der Inselbühne"
      />
      <section className="bg-gray-50">
        <div className="container mx-auto px-4 pb-32">
          <Suspense fallback={<PostGridLoading />}>
            <PostGrid promise={posts} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
