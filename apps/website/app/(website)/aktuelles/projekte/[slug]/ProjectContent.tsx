import Block from "@components/Block";
import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import ProjectContentWrapper from "./ProjectContentWrapper";
import Image from "next/image";
import ProjectGrid from "app/(website)/ProjectGrid";
import { WixMediaImage } from "@components/WixMediaImage";
import RichContentViewer from "@components/RichContentViewer";

interface ProjectContentProps {
    promise: Promise<any>;
}
  

export default async function ProjectContent(props: ProjectContentProps) {
    const project = await props.promise;

    const content = <RichContentViewer content={project.inhalt} />
    const image = <WixMediaImage media={project.projektbild} alt={project.title} width={800} height={400}/>;

    return (
        <>
            <PageTitle
                title={project.title}
                description={project.sub_title}
                breadcrumb={
                    <PageBreadcrumb
                        items={[
                            <PageBreadcrumbItem label="Aktuelles & Projekte" href="/aktuelles" />,
                            <PageBreadcrumbItem label="Projekte" href="/aktuelles/projekte" />,
                            <PageBreadcrumbItem label={project.title} />,
                        ]}
                    />
                }
            />
            <ProjectContentWrapper content={content} image={image}/>
        </>
    );
}
