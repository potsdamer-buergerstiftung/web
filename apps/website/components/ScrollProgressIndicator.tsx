"use client";

import React, { useEffect, useRef, useState } from "react";

function useDocumentScrollPercentage(): number {
    const [scrollPercentage, setScrollPercentage] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const currentScrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
            setScrollPercentage(currentScrollPercentage);
        };

        document.addEventListener("scroll", handleScroll);

        return () => document.removeEventListener("scroll", handleScroll);
    }, []);

    return scrollPercentage;
}

export default function ScrollProgressIndicator() {
    const scrollPercentage = useDocumentScrollPercentage();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            className="group flex flex-row items-center space-x-4 transition duration-500"
            style={{ opacity: scrollPercentage > 15 ? 1 : 0 }}
        >
            <div className="relative h-[2px] w-14 rotate-180 bg-black bg-opacity-10">
                <div
                    className="absolute h-full bg-slate-900 transition group-hover:bg-emerald-500"
                    style={{ width: scrollPercentage + "%" }}
                />
            </div>
            <p className="text-sm font-bold transition group-hover:text-emerald-500">
                Zurück nach oben
            </p>
        </button>
    )
}