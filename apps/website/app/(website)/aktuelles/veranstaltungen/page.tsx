import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import { Directus } from "@directus/sdk";
import { Suspense } from "react";
import EventGrid from "./EventGrid";

async function getEvents() {
    const directus = new Directus("https://portal.potsdamer-buergerstiftung.org");
    const res = await directus.items<any, any>("events").readByQuery({
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
    });
    return res.data;
}

export default function EventsPage() {
    const events = getEvents();

    return (
        <>
            <PageTitle title="Veranstaltungen" description="Wann und wo du dich engagieren kannst" breadcrumb={<PageBreadcrumb items={
                [<PageBreadcrumbItem label="Aktuelles & Projekte" href="/aktuelles/projekte" />, <PageBreadcrumbItem label="Veranstaltungen" />]
            } />} />
            <section className="container px-4 mx-auto grid grid-cols-6 pb-16">
                <Suspense>
                    {/* @ts-ignore-error */}
                    <EventGrid promise={events} />
                </Suspense>
            </section>
        </>
    )
}