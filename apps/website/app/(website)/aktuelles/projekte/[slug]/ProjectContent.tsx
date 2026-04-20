import {
  PageBreadcrumb,
  PageBreadcrumbItem,
  PageBreadcrumbSeparator,
} from "@/components/page-breadcrumb";
import PageTitle from "@/components/page-title";
import ProjectContentWrapper from "./ProjectContentWrapper";
import Image from "next/image";
import Block from "@/components/block";

interface ProjectContentProps {
  promise: Promise<any>;
}

export default async function ProjectContent(props: ProjectContentProps) {
  const project = await props.promise;

  const content = project.content ? <Block data={project.content} /> : null;
  const image = (
    <Image
      src={`https://portal.potsdamer-buergerstiftung.org/assets/${project.image}`}
      height={400}
      width={800}
      quality={30}
      alt="Bild vom Event"
      className="rounded-2xl"
    />
  );

  return (
    <>
      <PageTitle
        title={project.title}
        description={project.sub_title}
        breadcrumb={
          <PageBreadcrumb>
            <PageBreadcrumbItem label="Aktuelles & Projekte" />
            <PageBreadcrumbSeparator />
            <PageBreadcrumbItem label="Projekte" href="/aktuelles/projekte" />
            <PageBreadcrumbSeparator />
            <PageBreadcrumbItem label={project.title} />
          </PageBreadcrumb>
        }
      />
      <ProjectContentWrapper content={content} image={image} />
    </>
  );
}
