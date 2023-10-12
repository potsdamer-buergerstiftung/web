import Image from "next/image";
import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";

interface EventProps {
  promise: Promise<any>;
}

export default async function Event({ promise }: EventProps) {
  const event = await promise;

  let html = { __html: event.description };

  return (
    <div>
      <PageTitle
        title={event.name}
        breadcrumb={
          <PageBreadcrumb
            items={[
              <PageBreadcrumbItem
                label="Aktuelles & Projekte"
                href="/aktuelles/projekte"
              />,
              <PageBreadcrumbItem
                label="Veranstaltungen"
                href="/aktuelles/veranstaltungen"
              />,
              <PageBreadcrumbItem label={event.name} />,
            ]}
          />
        }
        description={
            <div>
                <p>{event.summary}</p>
                <h5 className="font-bold text-lg mt-2">{new Date(event.start).toLocaleDateString("de", { weekday: "long", timeZone: "Europe/Berlin", day:"2-digit", month: "long", hour: "numeric", minute: "2-digit" })}</h5>
            </div>
        }
        isCompact
      />
      <div className="container px-4 mx-auto max-w-4xl pb-16">
        <Image
          src={`https://portal.potsdamer-buergerstiftung.org/assets/${event.image}`}
          alt={event.name}
          width={800}
          height={500}
          className="mb-8"
        />
        <div className="prose lg:prose-lg" dangerouslySetInnerHTML={html}></div>
      </div>
    </div>
  );
}
