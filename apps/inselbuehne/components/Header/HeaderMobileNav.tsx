"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import HeaderNavItem from "./HaderNavItem";
import { mobileMenuOpen } from "./state";

export default function HeaderMobileNav() {
  const [mobileOpen, _] = useAtom(mobileMenuOpen);

  return (
    <div
      className={clsx(
        "fixed top-0 bottom-0 left-0 right-0 z-30 -translate-x-full overflow-hidden overscroll-contain bg-white transition duration-500 ease-in-out lg:hidden",
        {
          "translate-x-0": mobileOpen,
        }
      )}
    >
      <div className="container mx-auto flex flex-col px-2 pt-44">
        <HeaderNavItem label="Veranstaltungen" href="/veranstaltungen" />
        <HeaderNavItem
          label="Blog"
          href="https://www.potsdamer-buergerstiftung.org/aktuelles/blog"
        />
        <HeaderNavItem
          label="Über uns"
          href="https://www.potsdamer-buergerstiftung.org"
        />
        <HeaderNavItem
          label="Spenden"
          href="https://www.potsdamer-buergerstiftung.org/mitstiften/privatpersonen/spenden"
        />
        <HeaderNavItem label="Kontakt" href="/kontakt" />
      </div>
    </div>
  );
}
