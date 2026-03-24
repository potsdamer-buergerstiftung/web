"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import Link from "next/link";
import { headerExpanded, mobileMenuOpen } from "./state";

interface HeaderSubNavItemProps {
  label: string;
  href: string;
  isActive?: boolean;
}

export default function HeaderSubNavItem({
  label,
  href,
  isActive,
}: HeaderSubNavItemProps) {
  const [, setHeaderExpanded] = useAtom(headerExpanded);
  const [, setMobileMenuOpen] = useAtom(mobileMenuOpen);

  function handleClick() {
    setHeaderExpanded(false);
    setMobileMenuOpen(false);
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        "py-2 text-xl font-medium transition hover:text-primary lg:py-1 lg:text-lg",
        isActive
          ? "text-primary"
          : "text-slate-300 lg:text-slate-900 dark:text-slate-400 dark:lg:text-slate-300",
      )}
    >
      {label}
    </Link>
  );
}
