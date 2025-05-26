import EventCard from "@components/EventCard";
import PageTitle from "@components/PageTitle";
import { Directus } from "@directus/sdk";
import { Metadata } from "next";
import Image from "next/image";
import EventList from "./EventList";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Veranstaltungen - Inselbühne Potsdam",
    description: "Die Veranstaltungen für die vierte Saison Inselbühne"
}

export const revalidate = 60;

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
            "summary"
        ],
        sort: ["-start"],
        filter: { project: { _eq: "inselbuehne" }, start: { _gte: new Date().toISOString() } }
    });
    return res.data;
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
