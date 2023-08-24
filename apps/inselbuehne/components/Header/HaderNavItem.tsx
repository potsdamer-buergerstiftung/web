"use client";

import clsx from "clsx";
import Link from "next/link";

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

    return (
        <Link href={href} className="relative px-2 py-3 text-xl transition hover:text-green-500 lg:p-2 lg:text-lg">
            {label}
        </Link>
    );
};

export default HeaderNavItem;
