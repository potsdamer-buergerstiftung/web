"use client";

import React, { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

function useDocumentScrollPercentage(): number {
    const [scrollPercentage, setScrollPercentage] = useState(0);

    const handleScroll = useCallback(() => {
        const h = document.documentElement;
        const b = document.body;
        const scrollTop = h.scrollTop || b.scrollTop;
        const scrollHeight = h.scrollHeight || b.scrollHeight;
        const clientHeight = h.clientHeight;
        
        const scrollableHeight = scrollHeight - clientHeight;
        const percentage = scrollableHeight > 0 
            ? Math.min(100, Math.max(0, (scrollTop / scrollableHeight) * 100))
            : 0;
            
        setScrollPercentage(percentage);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        
        handleScroll();

        const resizeObserver = new ResizeObserver(handleScroll);
        resizeObserver.observe(document.body);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            resizeObserver.disconnect();
        };
    }, [handleScroll]);

    return scrollPercentage;
}

export default function ScrollProgressIndicator() {
    const scrollPercentage = useDocumentScrollPercentage();
    const isVisible = scrollPercentage > 15;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            className={cn(
                "group flex flex-row items-center gap-4 transition-all duration-500",
                isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            aria-label="Zurück nach oben"
        >
            <div className="relative h-[2px] w-14 bg-foreground/10 overflow-hidden">
                <div
                    className="absolute inset-y-0 right-0 bg-primary transition-all duration-300 ease-out group-hover:bg-primary/80"
                    style={{ width: `${scrollPercentage}%` }}
                />
            </div>
            <p className="text-sm font-bold transition-colors group-hover:text-primary whitespace-nowrap">
                Zurück nach oben
            </p>
        </button>
    );
}