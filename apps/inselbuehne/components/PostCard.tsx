import Image from "next/image";
import Link from "next/link";

type PostCardProps = {
  title: string;
  date: string;
  slug?: string;
  id: string;
  image?: string;
  excerpt?: string;
  hrefPrefix?: string;
  className?: string;
};

export default function PostCard({
  title,
  date,
  slug,
  id,
  image,
  excerpt,
  hrefPrefix = "/blog",
  className = "h-full min-h-[22rem]",
}: PostCardProps) {
  return (
    <Link
      href={`${hrefPrefix}/${encodeURIComponent(slug ?? id)}`}
      className={`group block w-full overflow-hidden rounded-tl-xl rounded-br-xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl ${className}`}
    >
      <div className="relative aspect-[5/4] min-h-[12rem] overflow-hidden bg-slate-200">
        {image && (
          <Image
            src={`https://portal.potsdamer-buergerstiftung.org/assets/${image}`}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-6 sm:p-8 md:p-6 lg:p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
          {new Date(date).toLocaleDateString("de", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <h2 className="mt-3 font-serif text-3xl leading-tight text-slate-900">
          {title}
        </h2>
        {excerpt && (
          <div
            className="prose mt-4 line-clamp-3 text-slate-600"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        )}
      </div>
    </Link>
  );
}
