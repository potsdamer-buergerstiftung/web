import EventCard from "@components/EventCard";
import PageTitle from "@components/PageTitle";
import { Directus } from "@directus/sdk";
import { Metadata } from "next";
import Image from "next/image";
import EventList from "./EventList";
import { Suspense } from "react";
import { wixClient } from "../wix";
import { wixEventsV2 } from "@wix/events";

export const revalidate = 120;

export const metadata: Metadata = {
    title: "Veranstaltungen - Inselbühne Potsdam",
    description: "Die Veranstaltungen für die vierte Saison Inselbühne"
}

async function getEvents() {
    return (await wixClient.wixEventsV2.queryEvents({
        fields: [wixEventsV2.RequestedFields.CATEGORIES, wixEventsV2.RequestedFields.DETAILS]
    }).ge("dateAndTimeSettings.startDate", new Date().toISOString()).ascending("dateAndTimeSettings.startDate").find()).items.filter((event) => {
        return (event as any).categories?.categories?.some((c) => c.name === "Inselbühne") ?? false;
    })
}

export default function ProgramPage() {
    const events = getEvents();

    return (
        <>
            <PageTitle title="Veranstaltungen" heading="4. Saison Inselbühne" />

            <Image src="/img/LHPgefördert_Logo_blau.jpg" height={400} width={200} alt="Landeshauptstadt Potsdam" className="mx-auto px-4 py-8" />
            <section className="bg-gray-50">

                <div
                    className="container mx-auto flex flex-col space-y-10 px-4 pb-32 text-center"
                >
                    <Suspense>
                        {/* @ts-ignore-error */}
                        <EventList promise={events} />
                    </Suspense>
                </div>
            </section>
        </>
    );
}