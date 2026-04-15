"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import React from "react";
import HeaderDonationButton from "./HeaderDonationButton";
import HeaderMobileMenuButton from "./HeaderMobileMenuButton";
import { mobileMenuOpen } from "./state";

interface HeaderNavProps {
    items: React.ReactNode[];
}

export default function HeaderNav({ items }: HeaderNavProps) {
    const [isMobileMenuOpen] = useAtom(mobileMenuOpen);

    const enhancedItems = React.useMemo(() => {
        let nextIndex = 1;

        return items.map((item) => {
            if (!React.isValidElement(item)) {
                return item;
            }

            if (typeof item.type === "string") {
                return item;
            }

            const props = item.props as { label?: unknown; index?: unknown };
            const looksLikeHeaderNavItem = typeof props?.label === "string";
            if (!looksLikeHeaderNavItem) {
                return item;
            }

            if (typeof props.index === "number") {
                nextIndex = Math.max(nextIndex, props.index + 1);
                return item;
            }

            const index = nextIndex;
            nextIndex += 1;
            return React.cloneElement(item as React.ReactElement<any>, { index });
        });
    }, [items]);

    return (
        <nav
            id="header-navigation"
            aria-label="Hauptnavigation"
            className={clsx(
                "absolute top-0 bottom-0 left-0 right-0 flex h-screen min-h-screen flex-col overflow-y-auto bg-slate-900 transition-transform duration-500 md:right-1/4 lg:relative lg:h-auto lg:min-h-0 lg:translate-x-0 lg:flex-row lg:overflow-y-visible lg:bg-transparent lg:transition-none lg:visible lg:pointer-events-auto",
                isMobileMenuOpen
                    ? "translate-x-0 visible pointer-events-auto"
                    : "-translate-x-full invisible pointer-events-none",
            )}
        >
            <div className="mb-8 flex flex-row items-center justify-between px-4 py-6 lg:hidden">
                <HeaderDonationButton />
                <HeaderMobileMenuButton variant="close" isDark />
            </div>
            {enhancedItems}
        </nav>
    );
}