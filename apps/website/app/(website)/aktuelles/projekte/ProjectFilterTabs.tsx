import clsx from "clsx";
import Link from "next/link";

interface ProjectFilterTabsProps {
    activeSlug: string;
}

function FilterTabButton({ isActive, href, label }: { isActive: boolean, href: string, label: string }) {
    return (
        <Link className="group font-bold font-header py-2 relative" href={href}>
            {label}
            <span className={clsx("absolute left-0 right-0 bottom-0 h-0.5 bg-emerald-500 transition", isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100')} />
        </Link>
    )
}

export default function ProjectFilterTabs({ activeSlug }: { activeSlug: string }) {
    return (
        <ul className="flex flex-row flex-wrap gap-5 mt-10">
            <li>
                <FilterTabButton isActive={activeSlug === "laufend"} href="/aktuelles/projekte/laufend" label="Laufend" />
            </li>
            <li>
                <FilterTabButton isActive={activeSlug === "wiederkehrend"} href="/aktuelles/projekte/wiederkehrend" label="Wiederkehrend" />
            </li>
            <li>
                <FilterTabButton isActive={activeSlug === "in-planung"} href="/aktuelles/projekte/in-planung" label="In Planung" />
            </li>
            <li>
                <FilterTabButton isActive={activeSlug === "abgeschlossen"} href="/aktuelles/projekte/abgeschlossen" label="Abgeschlossen" />
            </li>
        </ul>
    )
}