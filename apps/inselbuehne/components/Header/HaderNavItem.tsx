"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import Link from "next/link";
import { mobileMenuOpen } from "./state";

interface HeaderNavItemProps {
    isActive?: boolean;
    label: string;
    href?: string;
}

const HeaderNavItem: React.FC<HeaderNavItemProps> = ({
    isActive = false,
    label,
    href,
}) => {
    const [open, setOpen] = useAtom(mobileMenuOpen);

    return (
        <Link href={href} className="relative px-2 py-3 text-xl transition hover:text-green-500 lg:p-2 lg:text-lg" onClick={() => setOpen(false)}>
            {label}
        </Link>
    );
};

export default HeaderNavItem;
