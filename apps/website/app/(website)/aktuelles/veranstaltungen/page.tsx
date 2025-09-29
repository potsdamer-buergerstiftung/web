import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import { createDirectus, readItems, rest } from "@directus/sdk";
import { Suspense } from "react";
import EventGrid from "./EventGrid";

export const revalidate = 60;

async function getEvents() {
    const directus = createDirectus("https://portal.potsdamer-buergerstiftung.org").with(rest());
    const res = await directus.request(readItems("events", {
        fields: [
            "name",
            "start",
            "id",
            "image",
            "external_ticket_url",
            "registration_needed",
        ],
        sort: ["start"],
        filter: { start: { _gte: new Date().toISOString() } },
    }));
    return res;
}

async function getPastEvents() {
    const directus = createDirectus("https://portal.potsdamer-buergerstiftung.org").with(rest());
    const res = await directus.request(readItems("events", {
        fields: ["name", "start", "id", "image", "external_ticket_url", "registration_needed"],
        sort: ["start"],
        filter: { start: { _lt: new Date().toISOString() } },
    }));
    return res;
}

export default function EventsPage() {
    const events = getEvents();
    const pastEvents = getPastEvents();
    return (
        <>
            <PageTitle title="Veranstaltungen" description="Wann und wo du dich engagieren kannst" breadcrumb={<PageBreadcrumb items={
                [<PageBreadcrumbItem label="Aktuelles & Projekte" href="/aktuelles/projekte" />, <PageBreadcrumbItem label="Veranstaltungen" />]
            } />} />
            <section className="container px-4 mx-auto grid grid-cols-6 pb-16 gap-8">
                <h1 className="col-span-6 text-2xl font-bold">Aktuelle Veranstaltungen</h1>
                <Suspense>
                    {/* @ts-ignore-error */}
                    <EventGrid promise={events} />
                </Suspense>
            </section>
            <section className="container px-4 mx-auto grid grid-cols-6 pb-16 gap-8">
                <h1 className="col-span-6 text-2xl font-bold">Vergangene Veranstaltungen</h1>
                <Suspense>
                    {/* @ts-ignore-error */}
                    <EventGrid promise={pastEvents} />
                </Suspense>
            </section>
        </>
    )
}