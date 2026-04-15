"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerExpanded, mobileMenuOpen } from "./state";

interface HeaderSubNavItemProps {
  label: string;
  href: string;
}

export default function HeaderSubNavItem({
  label,
  href,
}: HeaderSubNavItemProps) {
  const pathname = usePathname();
  const [, setHeaderExpanded] = useAtom(headerExpanded);
  const [, setMobileMenuOpen] = useAtom(mobileMenuOpen);
  const isActive = pathname ? pathname.startsWith(href) : false;

  function handleClick() {
    setHeaderExpanded(false);
    setMobileMenuOpen(false);
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      aria-current={isActive ? "page" : undefined}
      className={clsx(
        "rounded-md py-2 text-xl font-medium outline-none transition hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40 lg:py-1 lg:text-lg",
        isActive
          ? "text-primary"
          : "text-slate-300 lg:text-slate-900 dark:text-slate-400 dark:lg:text-slate-300",
      )}
    >
      {label}
    </Link>
  );
}
