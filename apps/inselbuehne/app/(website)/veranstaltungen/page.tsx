import EventCard from "@/components/EventCard";
import PageTitle from "@/components/page-title";
import { Metadata } from "next";
import Image from "next/image";
import EventList from "./EventList";
import { Suspense } from "react";
import portalServer from "portal/server";
import { readItems } from "portal/sdk";
import EventListLoading from "./EventListLoading";

export const metadata: Metadata = {
  title: "Veranstaltungen - Inselbühne Potsdam",
  description: "Die Veranstaltungen für die sechste Saison Inselbühne",
};

export const revalidate = 60;

async function getEvents() {
  const res = await portalServer.request(
    readItems("events", {
      fields: [
        "name",
        "start",
        "id",
        "image",
        "external_ticket_url",
        "registration_needed",
        "summary",
      ],
      sort: ["start"],
      filter: {
        // @ts-ignore
        start: { _gte: new Date().toISOString() },
        project: { _eq: "inselbuehne" },
      },
    }),
  );

  return res;
}

export default function ProgramPage() {
  const events = getEvents();

  return (
    <>
      <PageTitle title="Veranstaltungen" heading="6. Saison Inselbühne" />

      <section className="bg-gray-50">
        <div className="container mx-auto flex flex-col space-y-10 px-4 pb-32 text-center">
          <Suspense fallback={<EventListLoading />}>
            {/* @ts-ignore-error */}
            <EventList promise={events} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
