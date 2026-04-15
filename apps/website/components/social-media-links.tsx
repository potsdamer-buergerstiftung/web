import clsx from "clsx";
import Link from "next/link";

interface SocialMediaLinksProps {
  size: "small" | "medium" | "large";
  direction: "horizontal" | "vertical";
}

const links = [
  {
    text: "Facebook",
    short: "Fb",
    url: "https://www.facebook.com/potsdambuergerstiftung",
  },
  {
    text: "Instagram",
    short: "Ig",
    url: "https://www.instagram.com/potsdamerbuergerstiftung",
  },
  {
    text: "YouTube",
    short: "Yt",
    url: "https://www.youtube.com/@potsdamerburgerstiftung39",
  },
];

export default function SocialMediaLinks(props: SocialMediaLinksProps) {
  const { size, direction } = props;
  const directionClass = direction === "horizontal" ? "flex-row" : "flex-col";

  return (
    <div className={clsx("flex gap-4", directionClass)}>
      {size === "large" && (
        <>
          <p className="text-sm font-bold text-primary">Folg&apos; uns</p>
          <span className="text-sm font-bold text-slate-900 dark:text-slate-50">
            -
          </span>
        </>
      )}
      <ul className={clsx("flex gap-4", directionClass)}>
        {links.map((link) => (
          <li key={link.text}>
            <Link
              href={link.url}
              className="text-sm font-bold transition text-slate-900 hover:text-primary dark:text-slate-50"
              target="_blank"
            >
              {size === "small" ? link.short + "." : link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
