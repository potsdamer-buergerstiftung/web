import Image from "next/image";
import PageTitle from "@/components/page-title";
import Block from "@/components/block";

interface Props {
  promise: Promise<any>;
}

function getReadTime(content: any) {
  const text =
    typeof content === "string" ? content : JSON.stringify(content ?? "");
  return Math.max(
    1,
    Math.ceil(
      text
        .replace(/<[^>]*>/g, " ")
        .split(/\s+/)
        .filter(Boolean).length / 200,
    ),
  );
}

export default async function Article({ promise }: Props) {
  const post = await promise;
  const readTime = getReadTime(post.content);

  return (
    <article className="bg-gray-50">
      <PageTitle
        title={post.title}
        heading="Blog"
        description={
          post.excerpt ? (
            <span dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          ) : undefined
        }
      />
      <div className="container mx-auto px-4 pb-24 max-w-4xl">
        {post.image && (
          <Image
            src={`https://portal.potsdamer-buergerstiftung.org/assets/${post.image}`}
            alt={post.title}
            width={1200}
            height={800}
            className="mb-8 w-full rounded-2xl"
          />
        )}
        <div className="mb-8 flex gap-8 text-sm text-slate-600">
          <div>
            <span className="block text-xs uppercase tracking-widest">
              Autor
            </span>
            {post.user_created?.first_name ?? "Inselbuehne"}
          </div>
          <div>
            <span className="block text-xs uppercase tracking-widest">
              Datum
            </span>
            {new Date(post.date).toLocaleDateString("de-DE", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <div>
            <span className="block text-xs uppercase tracking-widest">
              Lesezeit
            </span>
            {readTime} min
          </div>
        </div>
        <div className="prose prose-lg max-w-none">
          <Block data={post.content} />
        </div>
      </div>
    </article>
  );
}
