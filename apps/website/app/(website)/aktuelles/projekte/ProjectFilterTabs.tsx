import clsx from "clsx";
import Link from "next/link";

interface ProjectFilterTabsProps {
  activeSlug: string;
}

function FilterTabButton({
  isActive,
  status,
  label,
}: {
  isActive: boolean;
  status?: string;
  label: string;
}) {
  return (
    <Link
      className="group font-bold font-header py-2 relative"
      href={{
        pathname: "/aktuelles/projekte",
        query: status
          ? {
              status,
            }
          : undefined,
      }}
    >
      {label}
      <span
        className={clsx(
          "absolute left-0 right-0 bottom-0 h-0.5 bg-primary transition",
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        )}
      />
    </Link>
  );
}

export default function ProjectFilterTabs({
  activeSlug,
}: {
  activeSlug: string;
}) {
  return (
    <ul className="flex flex-row flex-wrap gap-5 mt-10">
      <li>
        <FilterTabButton isActive={activeSlug === ""} status="" label="Alle" />
      </li>
      <li>
        <FilterTabButton
          isActive={activeSlug === "laufend"}
          status="laufend"
          label="Laufend"
        />
      </li>
      <li>
        <FilterTabButton
          isActive={activeSlug === "wiederkehrend"}
          status="wiederkehrend"
          label="Wiederkehrend"
        />
      </li>
      <li>
        <FilterTabButton
          isActive={activeSlug === "in-planung"}
          status="in-planung"
          label="In Planung"
        />
      </li>
      <li>
        <FilterTabButton
          isActive={activeSlug === "abgeschlossen"}
          status="abgeschlossen"
          label="Abgeschlossen"
        />
      </li>
    </ul>
  );
}
