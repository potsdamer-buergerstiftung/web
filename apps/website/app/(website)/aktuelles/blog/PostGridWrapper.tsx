"use client";

import React, { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

interface PostGridWrapperProps {
    children: React.ReactNode;
}

export default function PostGridWrapper({ children }: PostGridWrapperProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="grid grid-cols-1 min-[750px]:grid-cols-2 min-[900px]:grid-cols-3 gap-[2rem]">
                {children}
            </div>
        );
    }

    return (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }} gutterBreakPoints={{ 350: "2rem", 750: "2rem", 900: "2rem" }}>
            <Masonry gutter="2rem">
                {children}
            </Masonry>
        </ResponsiveMasonry>
    );
}