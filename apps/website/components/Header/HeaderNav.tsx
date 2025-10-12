"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import HeaderDonationButton from "./HeaderDonationButton";
import HeaderMobileMenuButton from "./HeaderMobileMenuButton";
import { mobileMenuOpen } from "./state";

interface HeaderNavProps {
  items: React.ReactNode[];
}

export default function HeaderNav({ items }: HeaderNavProps) {
  const [isMobileMenuOpen] = useAtom(mobileMenuOpen);

  return (
    <nav
      className={clsx(
        "absolute top-0 bottom-0 left-0 right-0 flex h-screen min-h-screen flex-col overflow-y-auto bg-slate-900 transition-transform duration-500 md:right-1/4 lg:relative lg:h-auto lg:min-h-0 lg:translate-x-0 lg:flex-row lg:overflow-y-visible lg:bg-transparent lg:transition-none",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="mb-8 block px-4 py-8 lg:hidden">
        <HeaderMobileMenuButton variant="close" isDark />
      </div>
      {items}
      <div className="mb-8 flex flex-col items-start px-4 pt-8 pb-20 lg:hidden">
        <HeaderDonationButton />
      </div>
    </nav>
  );
}
