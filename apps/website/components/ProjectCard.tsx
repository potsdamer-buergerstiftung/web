import Link from "next/link";
import Image from "@components/Image";

const ProjectCard: React.FC<{
  title: string;
  projectId: string;
  subTitle: string;
  imageId: string;
  imageSize?: "small" | "large";
}> = (props) => {
  const { title, subTitle, projectId, imageId, imageSize } = props;

  const imageProps =
    imageSize == "small"
      ? { width: 400, height: 400 }
      : { width: 900, height: 400 };
  return (
    <Link
      href={`/projekte/${projectId}`}
      className="group relative block h-96 w-full cursor-pointer overflow-hidden rounded-lg"
    >
      <Image
        src={imageId}
        height={imageProps.height}
        width={imageProps.width}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        alt={`Bild von ${title}`}
      />
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
      <div className="flex-column absolute top-0 bottom-0 left-0 right-0 flex items-end p-8">
        <div className="relative w-full">
          <h1 className="font-header text-2xl font-bold text-white">{title}</h1>
          <div className="relative mt-2 w-full overflow-hidden">
            <p className="block translate-y-0 text-white opacity-100 transition duration-500 group-hover:-translate-y-3 group-hover:opacity-0">
              {subTitle}
            </p>
            <div className="absolute translate-y-0 text-white opacity-0 transition duration-500 group-hover:-translate-y-full group-hover:opacity-100">
              <div className="relative flex flex-row items-center font-bold">
                <span>Projekt anzeigen</span>
                <div className="ml-2 h-0.5 w-12 bg-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
