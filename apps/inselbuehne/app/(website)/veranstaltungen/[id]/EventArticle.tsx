import Image from "next/image";
import Link from "next/link";
import Block from "@/components/block";
import PageTitle from "@/components/page-title";

interface Props {
  promise: Promise<any>;
}

export default async function EventArticle({ promise }: Props) {
  const event = await promise;
  const start = new Date(event.start);

  return (
    <article className="bg-gray-50">
      <PageTitle
        title={event.name}
        heading="Veranstaltungen"
        description={event.summary}
      />
      <div className="container mx-auto px-4 pb-24 max-w-4xl">
        {event.image && (
          <Image
            src={`https://portal.potsdamer-buergerstiftung.org/assets/${event.image}`}
            alt={event.name}
            width={1200}
            height={800}
            className="mb-8 w-full rounded-2xl"
          />
        )}
        <div className="mb-8 flex gap-8 text-sm text-slate-600">
          <div>
            <span className="block text-xs uppercase tracking-widest">
              Datum
            </span>
            {start.toLocaleDateString("de-DE", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <div>
            <span className="block text-xs uppercase tracking-widest">
              Uhrzeit
            </span>
            {start.toLocaleTimeString("de-DE", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div>
            <span className="block text-xs uppercase tracking-widest">Ort</span>
            Inselbühne Potsdam
          </div>
        </div>
        {event.registration_needed && event.external_ticket_url && (
          <Link
            href={event.external_ticket_url}
            target="_blank"
            className="mb-8 inline-flex rounded-tl-lg rounded-br-lg bg-green-500 px-4 py-2.5 font-medium text-white shadow-md transition hover:bg-green-400"
          >
            Tickets
          </Link>
        )}
        <div className="prose prose-lg max-w-none">
          {event.description ? (
            <Block data={event.description} />
          ) : (
            event.summary
          )}
        </div>
      </div>
    </article>
  );
}
