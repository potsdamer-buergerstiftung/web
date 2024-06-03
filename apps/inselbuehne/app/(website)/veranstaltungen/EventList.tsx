import React from "react";
import EventCard from "@components/EventCard";

interface EventListProps {
    promise: Promise<any>;
}

const formattedDate = (date: Date) => date.toLocaleDateString("de", {
    year: "numeric",
    day: "numeric",
    month: "long",
});

export default async function EventList({ promise }: EventListProps) {
    const events = await promise;
    console.log(events)
    return (
        <React.Fragment>
            {events?.map((event: any) => (
                //<h1>{event.start} {event.name}</h1>
                <EventCard title={event.title} start={new Date(new Date(event.dateAndTimeSettings.startDate).setHours(new Date(event.dateAndTimeSettings.startDate).getHours() - 2))} summary={event.shortDescription} image={event.mainImage} localImage={false} href={`https://potsdamer-buergerstiftung.org/aktuelles/veranstaltungen/${event.slug}`} />
            ))}
        </React.Fragment>
    );
}