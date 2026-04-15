import { Metadata } from "next";
import { Suspense } from "react";
import { readItems } from "portal/sdk";
import portalServer from "portal/server";
import EventArticle from "./EventArticle";
import EventArticleLoading from "./EventArticleLoading";

export const revalidate = 60;

async function getEvent(id: number) {
  const events = await portalServer.request(
    readItems("events", {
      fields: [
        "id",
        "name",
        "start",
        "end",
        "image",
        "description",
        "summary",
        "registration_needed",
        "external_ticket_url",
      ],
      filter: { id: { _eq: id }, project: { _eq: "inselbuehne" } },
    }),
  );

  return events[0];
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { id } = await props.params;

  if (typeof id !== "number") {
    return {
      title: "Veranstaltung nicht gefunden - Inselbühne Potsdam",
    };
  }
  
  const event = await getEvent(id);

  return {
    title: `${event.name} - Inselbühne Potsdam`,
  };
}

export default async function EventPage(props: Props) {
  const { id } = await props.params;

  if (typeof id !== "number") {
    return <div>Veranstaltung nicht gefunden</div>;
  }
  
  const event = getEvent(id);

  return (
    <Suspense fallback={<EventArticleLoading />}>
      <EventArticle promise={event} />
    </Suspense>
  );
}
