"use client";

import HeaderNavItem from "./HaderNavItem";
import HeaderMobileMenuButton from "./HeaderMobileMenuButton";
import HeaderNavBrand from "./HeaderNavBrand";

export default function HeaderNav() {
    return (
        <nav
            className="container mx-auto flex h-full w-full flex-row items-center justify-between px-4 lg:justify-center lg:px-0"
        >
            <div
                className="hidden h-full w-full flex-row items-center justify-end gap-x-3 lg:flex xl:gap-x-5"
            >
                <HeaderNavItem label="Programm" href="/programm" />
                <HeaderNavItem label="Festival-Pass" href="https://www.eventbrite.de/e/50-jahre-inselbuhne-tickets-705908199427" />
                <HeaderNavItem label="Blog" href="/blog" />
            </div>
            <HeaderNavBrand />
            <HeaderMobileMenuButton />
            <div
                className="hidden h-full w-full flex-row items-center justify-start gap-x-5 lg:flex"
            >
                <HeaderNavItem
                    label="Über uns"
                    href="https://www.potsdamer-buergerstiftung.org"
                />
                <HeaderNavItem
                    label="Spenden"
                    href="https://www.potsdamer-buergerstiftung.org"
                />
                <HeaderNavItem label="Kontakt" href="/kontakt" />
            </div>
        </nav >
    );
}