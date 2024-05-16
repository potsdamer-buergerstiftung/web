import clsx from "clsx";
import ProjectCard from "@components/ProjectCard";

export const revalidate = 120;

export default async function ProjectGrid({
  promise,
}: {
  promise: Promise<any>;
}) {
  const projects = await promise;

  function indexToSpan(index: number) {
    if ((index + 9) % 10 == 0) {
      return 2;
    }

    if ((index + 5) % 10 == 0) {
      return 2;
    }

    return 1;
  }

  return (
    <div className="grid grid-cols-6 gap-8">
      {projects?.map((project: any, i: number) => (
        <div
          className={clsx(
            "col-span-6",
            "lg:col-span-3",
            indexToSpan(i) * 2 == 2 && "xl:col-span-2",
            indexToSpan(i) * 2 == 4 && "xl:col-span-4"
          )}
          key={project.id}
        >
          <ProjectCard
            title={project.title}
            subTitle={project.kurzbeschreibung}
            projectId={project._id}
            imageId={project.projektbild}
            imageSize={indexToSpan(i) * 2 == 2 ? "small" : "large"}
          />
        </div>
      ))}
    </div>
  );
}
