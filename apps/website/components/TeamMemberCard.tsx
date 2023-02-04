import Image from "next/image";

interface TeamMemberCardProps {
    title: string;
    name: string;
    description?: string;
    image?: string;
}

export default function TeamMemberCard({ title, name, description, image }: TeamMemberCardProps) {
    return (
        <div className="relative h-full">
            <div className="absolute z-[-1] h-full w-full">
                <div
                    className="absolute bottom-0 top-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-transparent"
                />
                {image && (
                    <Image
                        src={image}
                        className="h-full w-full object-cover"
                        width="800"
                        height="900"
                        quality="30"
                        alt={`Bild von ${name}`}
                    />
                )}
                {!image && (
                    <div className="w-full h-full bg-emerald-100" />
                )}
            </div>
            <div
                className="container mx-auto flex h-full flex-col justify-end px-4 py-16 md:p-8 lg:max-w-none xl:p-10"
            >
                <div className="mt-60">
                    <h1 className="mb-1 text-sm font-semibold uppercase text-slate-200">
                        {title}
                    </h1>
                    <h2 className="font-header text-2xl font-bold text-white">{ name }</h2>
                </div>
            </div>
        </div>
    )
}