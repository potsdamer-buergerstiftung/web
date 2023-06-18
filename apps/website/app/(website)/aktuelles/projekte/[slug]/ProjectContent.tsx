import Block from "@components/Block";
import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import ProjectContentWrapper from "./ProjectContentWrapper";
import Image from "next/image";

interface ProjectContentProps {
    promise: Promise<any>;
}

export default async function ProjectContent(props: ProjectContentProps) {
    const project = await props.promise;

    const content = <Block data={project.content} />;
    const image = <Image src={`https://portal.potsdamer-buergerstiftung.org/assets/${project.image}`} alt={project.title} width={800} height={400}/>;

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
