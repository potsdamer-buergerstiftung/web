"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

import { headerBackgroundHeight, headerExpanded } from "./state";

export default function HeaderNavBackground() {
    const [backgroundHeight] = useAtom(headerBackgroundHeight);
    const [expanded, setExpanded] = useAtom(headerExpanded);
    const path = usePathname();

    React.useEffect(() => {
        setExpanded(false);
    }, [path]);

    return (
        <React.Fragment>
            <div className={clsx("invisible fixed top-0 right-0 left-0 bottom-0 bg-slate-900 transition duration-500 lg:visible -z-[1] pointer-events-none", expanded ? 'opacity-70' : 'opacity-0')} />
            <div className={clsx(
                "-z-[1] transition-[height, opacity] invisible absolute top-0 left-0 w-full bg-white duration-500 lg:visible", expanded
                ? 'translate-y-0 opacity-100'
                : '-translate-y-24 opacity-0',
            )} style={{ height: backgroundHeight.toString() + 'rem' }} />
        </React.Fragment>
    )
}
