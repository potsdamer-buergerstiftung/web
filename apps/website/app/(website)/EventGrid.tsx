import Link from "next/link";
import React from "react";
import Image from "next/image";

interface EventGridProps {
    promise: Promise<any>;
}

const formattedDate = (date: Date) => date.toLocaleDateString("de", {
    year: "numeric",
    day: "numeric",
    month: "long",
});

export default async function EventGrid({ promise }: EventGridProps) {
    const events = await promise;
    return (
        <React.Fragment>
            {events?.map((event: any) => (
                <div className="col-span-6 min-h-max lg:col-span-3 xl:col-span-2">
                    <Link href={event.registration_needed && event.external_ticket_url ? event.external_ticket_url : `/events/${event.id}`}
                        className="group relative block h-60 w-full cursor-pointer overflow-hidden rounded-lg">
                        <Image src={`/${event.image}`} height={600} width={600}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                            alt={`Bild von ${event.name}`} />
                        <div
                            className="pointer-events-none absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                        <div className="flex-column absolute top-0 bottom-0 left-0 right-0 flex items-end p-8">
                            <div className="relative w-full">
                                <h1 className="font-header text-2xl font-bold text-white">{event.name}</h1>
                                <div className="relative mt-2 w-full overflow-hidden">
                                    <p
                                        className="block translate-y-0 text-white opacity-100 transition duration-500 group-hover:-translate-y-3 group-hover:opacity-0">
                                        {formattedDate(new Date(event.start))}
                                    </p>
                                    <div
                                        className="absolute translate-y-0 text-white opacity-0 transition duration-500 group-hover:-translate-y-full group-hover:opacity-100">
                                        <div className="relative flex flex-row items-center font-bold">
                                            <span>Event anzeigen</span>
                                            <div className="ml-2 h-0.5 w-12 bg-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </React.Fragment>
    );
}