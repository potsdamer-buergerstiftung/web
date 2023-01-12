import clsx from "clsx";
import ProjectCardLoading from "../components/ProjectCardLoading";

export const revalidate = 120;

export default function ProjectGridLoading() {
  function indexToSpan(index: number) {
    if ((index + 9) % 10 == 0) {
      return 2;
    }

    if ((index + 5) % 10 == 0) {
      return 2;
    }

    return 1;
  }

  const items = new Array(7).fill(0);

  return (
    <div className="grid grid-cols-6 gap-8">
      {items.map((_: any, i: number) => (
        <div
          className={clsx("col-span-6", "lg:col-span-3", {
            "xl:col-span-2": indexToSpan(i) * 2 == 2,
            "xl:col-span-4": indexToSpan(i) * 2 == 4,
          })}
          key={i}
        >
          <ProjectCardLoading />
        </div>
      ))}
    </div>
  );
}
