"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import Link from "next/link"
import { headerExpanded } from "./state";

interface HeaderSubNavItemProps {
    label: string;
    href: string;
    isActive?: boolean;
}

export default function HeaderSubNavItem({ label, href, isActive }: HeaderSubNavItemProps) {
    const [_, setHeaderExpanded] = useAtom(headerExpanded);

    return (
        <Link href={href} onClick={() => setHeaderExpanded(false)} className={clsx("py-2 text-xl font-medium transition hover:text-emerald-500 lg:py-1 lg:text-lg", isActive ? 'text-emerald-500' : 'text-slate-400 lg:text-slate-900')}>
            {label}
        </Link>
    )
}