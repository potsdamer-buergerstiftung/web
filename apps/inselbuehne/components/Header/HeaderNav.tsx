"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import HeaderNavItem from "./HaderNavItem";
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
            <button
                className="flex flex-row items-center lg:hidden"
            >
                <span className="font-bold">Menü</span>
                <svg
                    v-if="!headerState.isMobileMenuOpen"
                    xmlns=" http://www.w3.org/2000/svg"
                    className="ml-1 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
                <svg
                    v-if="headerState.isMobileMenuOpen"
                    xmlns=" http://www.w3.org/2000/svg"
                    className="ml-1 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
            <div
                className="hidden h-full w-full flex-row items-center justify-start gap-x-5 lg:flex"
            >
                <HeaderNavItem
                    label="Über uns"
                    href="https://www.potsdamer-buergerstiftung.org"
                />
                <HeaderNavItem
                    label="Spenden"
                    href="https://donorbox.org/inselbuhne-potsdam"
                />
                <HeaderNavItem label="Kontakt" href="/kontakt" />
            </div>
        </nav >
    );
}