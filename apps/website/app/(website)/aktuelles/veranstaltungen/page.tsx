import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import { Directus } from "@directus/sdk";
import { Suspense } from "react";
import EventGrid from "./EventGrid";
import { wixClient } from "app/(website)/wix";

export const revalidate = 120;

async function getEventsComing() {
    return (await wixClient.wixEventsV2.queryEvents().ge("dateAndTimeSettings.startDate", new Date().toISOString()).ascending("dateAndTimeSettings.startDate").find()).items;
}

async function getEvents() {
    return (await wixClient.wixEventsV2.queryEvents().le("dateAndTimeSettings.startDate", new Date().toISOString()).descending("dateAndTimeSettings.startDate").find()).items;
}

export default function EventsPage() {
    const events = getEventsComing();
    const pastEvents = getEvents();

    return (
        <>
            <PageTitle title="Veranstaltungen" description="Wann und wo du dich engagieren kannst" breadcrumb={<PageBreadcrumb items={
                [<PageBreadcrumbItem label="Aktuelles & Projekte" href="/aktuelles/projekte" />, <PageBreadcrumbItem label="Veranstaltungen" />]
            } />} />
            <section className="container px-4 mx-auto grid grid-cols-6 pb-16 gap-8">
                <h1 className="col-span-6 text-3xl font-bold">Kommende Veranstaltungen</h1>
                <Suspense>
                    {/* @ts-ignore-error */}
                    <EventGrid promise={events} />
                </Suspense>
            </section>
            <section className="container px-4 mx-auto grid grid-cols-6 pb-16 gap-8">
                <h1 className="col-span-6 text-3xl font-bold">Vergangene Veranstaltungen</h1>
                <Suspense>
                    {/* @ts-ignore-error */}
                    <EventGrid promise={pastEvents} />
                </Suspense>
            </section>
        </>
    )
}