"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import Link from "next/link";
import { Children, useState } from "react";
import { headerBackgroundHeight, headerExpanded, mobileMenuOpen } from "./state";

interface HeaderNavItemProps {
    isActive?: boolean;
    children?: React.ReactNode;
    label: string;
    index: number;
    href?: string;
}

function addZero(index: string): string {
    const number = Number(index);
    return number < 10 ? `0${index}` : index.toString();
}

const HeaderNavItem: React.FC<HeaderNavItemProps> = ({
    isActive = false,
    label,
    href,
    children,
    index,
}) => {
    const [itemSubMenuOpen, setItemSubMenuOpen] = useState(false);
    const [backgroundHeight, setBackgroundHeight] = useAtom(headerBackgroundHeight);
    const [expanded, setExpanded] = useAtom(headerExpanded);
    const [isMobileMenuOpen, setMobileMenuOpen] = useAtom(mobileMenuOpen);

    const subNavItemCount = children ? Children.count(children) : 0;

    const anchorClass = clsx(
        "group flex flex-row justify-start gap-1 px-4 py-4 outline-none lg:flex-col lg:gap-0 lg:px-3 lg:py-2"
    )

    function AnchorElement({ children }: { children: React.ReactNode }) {
        return href ? <Link
            href={href}
            className={anchorClass}
        >{children}</Link> : <a className={anchorClass}>{children}</a>
    }


    function toggleItemSubMenuOpen() {
        setItemSubMenuOpen(!itemSubMenuOpen);
    }

    function onHover() {
        if (children /* && lgAndGreater.value */) {
            setBackgroundHeight(subNavItemCount * 2.2 + 10);
            setExpanded(true);
            setItemSubMenuOpen(true);
        }
    }

    function onLeave() {
        if (children /* && lgAndGreater.value */) {
            setExpanded(false);
            setItemSubMenuOpen(false);
        }
    }

    function onClick() {
        if (href) {
            setMobileMenuOpen(false);
            setExpanded(false);
        } else {
            toggleItemSubMenuOpen();
        }
    }

    return (
        <div className="group relative flex flex-col justify-start" onMouseOver={onHover} onMouseLeave={onLeave} onClick={onClick}>
            <AnchorElement>
                <span
                    className={clsx(
                        "text-xs font-bold leading-4 transition group-hover:text-emerald-500 group-focus:text-emerald-500 text-slate-500"
                    )}
                >
                    {addZero(index.toString())}
                </span>
                <span
                    className={clsx(
                        "text-2xl font-bold text-white lg:text-slate-900 transition group-hover:text-emerald-500 group-focus:text-emerald-500 lg:text-[1rem] lg:font-medium lg:leading-6"
                    )}
                >
                    {label}
                </span>
            </AnchorElement>
            {children && (
                <ul className={clsx("relative mb-4 w-auto flex flex-col whitespace-nowrap px-9 lg:absolute lg:mb-0 lg:px-3 lg:py-20", expanded && itemSubMenuOpen ? 'flex' : 'hidden')}>
                    {children}
                </ul>
            )}
        </div>
    );
};

export default HeaderNavItem;
