import Link from "next/link";
import Image from "@components/Image";

interface EventCardProps {
    eventId?: string;
    title: string;
    summary?: string;
    start: Date;
    image: string;
    registration_needed?: boolean;
    external_ticket_url?: string;
    canceled?: boolean;
}

export default function EventCard({
    title,
    summary,
    start,
    image,
}: EventCardProps) {
    return (
        <Link
            href="/"
            className="bg-white grid min-h-max w-full cursor-pointer grid-cols-5 overflow-hidden rounded-tl-2xl rounded-br-2xl shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl lg:h-56"
        >
            <div className="relative col-span-5 h-64 w-full lg:col-span-2 lg:h-full">
                <Image
                    src={image}
                    alt="test"
                    width={400}
                    height={400}
                    className="absolute h-full w-full object-cover"
                />
                <div
                    className="absolute left-6 top-1/2 -translate-y-1/2 rounded-tl-lg rounded-br-lg bg-white p-4 shadow-md md:left-8 lg:left-auto lg:right-6"

                >
                    <p>
                        {new Date(start).toLocaleDateString("de", { month: "short" })}
                    </p>
                    <h1 className="font-serif text-4xl">{new Date(start).getUTCDate()}</h1>
                    <p>
                        {new Date(start).toLocaleDateString("de", { weekday: "short" })}
                    </p>
                </div>
            </div>
            <div
                className="col-span-5 flex flex-col items-start justify-between p-6 md:p-8 lg:col-span-3 lg:flex-row lg:items-center lg:space-x-10 lg:p-10"
            >
                <div className="text-left">
                    <p
                        className="mb-2 text-md font-bold uppercase tracking-widest text-green-500"
                    >
                        {new Date(start).toLocaleTimeString("de", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                    <h1
                        className="line-clamp-4 lg:line-clamp-2 font-serif text-2xl leading-tight md:text-3xl"
                    >
                        {title}
                    </h1>
                    {summary && (
                    <p className="text-md line-clamp-6 lg:line-clamp-2 mt-4 leading-relaxed">
                        {summary}
                    </p>
                    )}
                </div>
            </div>
        </Link>
    )
}