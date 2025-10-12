import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

const ArticleCard: React.FC<{
  title: string;
  date: Date;
  imageId?: string;
  projectTitle?: string;
  author?: string;
  tags?: string[];
  compact?: boolean;
  link?: string;
}> = (props) => {
  const {
    compact = false,
    title,
    date,
    imageId,
    projectTitle,
    author,
    tags,
    link,
  } = props;

  const formattedDate = date.toLocaleDateString("de", {
    year: "numeric",
    day: "numeric",
    month: "long",
  });

  const wrapperClass =
    "group relative block h-full w-full overflow-hidden rounded-md";

  const Wrapper = ({ children }) =>
    link ? (
      <Link href={link} className={wrapperClass}>
        {children}
      </Link>
    ) : (
      <div className={wrapperClass}>{children}</div>
    );

  return (
    <Wrapper>
      {imageId && (
        <div
          className={clsx(
            "overflow-hidden",
            compact
              ? "absolute bottom-0 top-0 left-0 right-0"
              : "relative aspect-[5/4]"
          )}
        >
          <Image
            src={`https://portal.potsdamer-buergerstiftung.org/assets/${imageId}`}
            height={400}
            width={400}
            quality={32}
            alt="Bild vom Event"
            className={clsx(
              "h-full",
              "w-full",
              "object-cover",
              "transition",
              "duration-500",
              { "group-hover:scale-110": !compact }
            )}
          />
          <div
            className={clsx(
              "absolute left-0 right-0 bottom-0 transition duration-500",
              compact
                ? "top-0 bg-slate-900 bg-opacity-60"
                : "translate-y-3 bg-gradient-to-t from-slate-900 to-transparent p-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
            )}
          >
            {!compact && (
              <div className="relative flex flex-row items-center font-bold">
                <span className="text-white">Beitrag aufrufen</span>
                <div className="ml-2 h-0.5 w-12 bg-white" />
              </div>
            )}
          </div>
        </div>
      )}
      <div
        className={clsx(
          "relative bg-slate-100 px-6 py-8 transition",
          compact ? "h-full hover:bg-transparent" : "hover:bg-slate-200"
        )}
      >
        <ul className="flex flex-wrap">
          <li
            className={clsx({
              "group-hover:text-white": compact,
              "after:content-['•'] after:px-1.5 after:text-emerald-500":
                projectTitle,
            })}
          >
            {formattedDate}
          </li>
          <li
            className={clsx("text-md text-slate-500", {
              "group-hover:text-white": compact,
            })}
          >
            {projectTitle}
          </li>
        </ul>
        <h2
          className={clsx("font-header mt-3 text-3xl font-bold", {
            "group-hover:text-white": compact,
          })}
        >
          {title}
        </h2>
        {tags && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Link
                href="/aktuelles"
                key={index}
                className={clsx(
                  "rounded-md bg-slate-200 py-1 px-2 text-sm font-medium transition hover:bg-slate-300",
                  {
                    "group-hover:bg-opacity-10 group-hover:text-white": compact,
                  }
                )}
              >
                {tag}
              </Link>
            ))}
          </ul>
        )}
      </div>
    </Wrapper>
  );
};

export default ArticleCard;
