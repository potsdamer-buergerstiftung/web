import Image from "next/image";

interface TeamMemberCardProps {
  title: string;
  name: string;
  description?: string;
  image?: string;
}

export default function TeamMemberCard({
  title,
  name,
  description,
  image,
}: TeamMemberCardProps) {
  return (
    <div className="relative h-full">
      <div className="absolute inset-0 z-0 h-full w-full">
      {image && (
        <Image
        src={`https://portal.potsdamer-buergerstiftung.org/assets/${image}`}
        className="h-full w-full object-cover"
        height={800}
        width={400}
        alt={`Bild von ${name}`}
        />
      )}
      {!image && <div className="h-full w-full bg-emerald-100" />}
      <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent" />
      </div>

      <div className="relative z-10 container flex h-full flex-col justify-end px-4 py-16 md:p-8 lg:max-w-none xl:p-10">
      <div className="mt-60">
        <h1 className="mb-1 text-sm font-semibold uppercase text-slate-200">
        {title}
        </h1>
        <h2 className="font-header text-2xl font-bold text-white">{name}</h2>
      </div>
      </div>
    </div>
  );
}
