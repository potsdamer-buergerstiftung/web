"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { quickDonateDrawerOpen, quickDonationFormLoaded } from "./state";

interface HeaderQuickDonateDrawerProps {
    donationForm: React.ReactNode;
}

export default function HeaderQuickDonateDrawer(props: HeaderQuickDonateDrawerProps) {
    const [isQuickDonateDrawerOpen, setIsQuickDonateDrawerOpen] = useAtom(quickDonateDrawerOpen);

    return (
        <div className={clsx("overflow-y-auto fixed top-0 right-0 bottom-0 bg-slate-50 z-[1001] shadow-lg w-full lg:w-3/4 xl:w-2/3 transition duration-700",
            isQuickDonateDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        )}>
            <div className="fixed w-full p-6 -mb-12">
                <button onClick={() => setIsQuickDonateDrawerOpen(false)}
                    className="block rounded-full p-4 ring-emerald-500 transition hover:ring-1 bg-slate-100 float-right">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-900" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div>
                {props.donationForm}
            </div>
        </div>
    )
}