import {
  PageBreadcrumb,
  PageBreadcrumbItem,
  PageBreadcrumbSeparator,
} from "@/components/page-breadcrumb";
import PageTitle from "@/components/page-title";
import { readItems } from "@directus/sdk";
import { Suspense } from "react";
import EventGrid from "./EventGrid";
import directus from "@/app/(website)/directus";
import { Heading } from "@/components/ui/heading";

export const revalidate = 60;

async function getEvents() {
  const res = await directus.request(
    readItems("events", {
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
    }),
  );
  return res;
}

async function getPastEvents() {
  const res = await directus.request(
    readItems("events", {
      fields: [
        "name",
        "start",
        "id",
        "image",
        "external_ticket_url",
        "registration_needed",
      ],
      sort: ["-start"],
      filter: { start: { _lt: new Date().toISOString() } },
    }),
  );
  return res;
}

export default function EventsPage() {
  const events = getEvents();
  const pastEvents = getPastEvents();
  return (
    <>
      <PageTitle
        title="Veranstaltungen"
        description="Wann und wo du dich engagieren kannst"
        breadcrumb={
          <PageBreadcrumb>
            <PageBreadcrumbItem
              label="Aktuelles & Projekte"
              href="/aktuelles/projekte"
            />
            <PageBreadcrumbSeparator />
            <PageBreadcrumbItem label="Veranstaltungen" />
          </PageBreadcrumb>
        }
      />
      <section className="container grid grid-cols-6 pb-16 gap-8">
        <Heading size="sm" className="col-span-6">
          Aktuelle Veranstaltungen
        </Heading>
        <Suspense>
          {/* @ts-ignore-error */}
          <EventGrid promise={events} />
        </Suspense>
      </section>
      <section className="container grid grid-cols-6 pb-16 gap-8">
        <Heading size="sm" className="col-span-6">
          Vergangene Veranstaltungen
        </Heading>
        <Suspense>
          {/* @ts-ignore-error */}
          <EventGrid promise={pastEvents} />
        </Suspense>
      </section>
    </>
  );
}
