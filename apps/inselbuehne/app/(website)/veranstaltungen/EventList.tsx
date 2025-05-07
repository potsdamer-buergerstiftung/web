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
                <EventCard title={event.name} start={new Date(new Date(event.start).setHours(new Date(event.start).getHours() - 2))} summary={event.summary} image={event.image} localImage={false} eventId={event.id} />
            ))}
        </React.Fragment>
    );
}
