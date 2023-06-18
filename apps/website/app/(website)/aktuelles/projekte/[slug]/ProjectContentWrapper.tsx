"use client";

import React from "react";
import StickyBox from "react-sticky-box";

interface ProjectContentWrapperProps {
    content: React.ReactNode;
    image: React.ReactNode;
}

export default function ProjectContentWrapper(props: ProjectContentWrapperProps) {
    const { content, image } = props;
    return (
        <>
            <div className="container mx-auto px-4 pb-10">
                <div className="lg:flex lg:flex-row lg:items-start lg:gap-10">
                    <StickyBox offsetTop={20} offsetBottom={20} className="flex-1">
                        {image}
                    </StickyBox>
                    <div className="flex-1">
                        {content}
                    </div>
                </div>
            </div>
        </>
    )
}