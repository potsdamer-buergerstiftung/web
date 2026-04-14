"use client";

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
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className="relative rounded-md px-2 py-3 text-xl outline-none transition hover:text-green-500 focus-visible:ring-2 focus-visible:ring-primary/40 lg:p-2 lg:text-lg"
      onClick={() => setOpen(false)}
    >
      {label}
    </Link>
  );
};

export default HeaderNavItem;
