import type { ReactNode } from "react";

interface ProjectContentWrapperProps {
    content: ReactNode;
    image: ReactNode;
}

export default function ProjectContentWrapper(props: ProjectContentWrapperProps) {
    const { content, image } = props;
    return (
        <div className="container mx-auto px-4 pb-10">
            <div className="lg:flex lg:flex-row lg:items-start lg:gap-10">
                <div className="flex-1 lg:sticky lg:top-5 lg:self-start mb-8 lg:mb-0">
                    {image}
                </div>
                <div className="flex-1">{content}</div>
            </div>
        </div>
    )
}
