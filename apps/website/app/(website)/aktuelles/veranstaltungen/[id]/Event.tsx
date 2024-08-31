import Image from "next/image";
import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import { WixMediaImage } from "@components/WixMediaImage";

interface EventProps {
  promise: Promise<any>;
}

export default async function Event({ promise }: EventProps) {
  const event = await promise;

  let html = { __html: event.detailedDescription };

  let start = new Date(event.dateAndTimeSettings.startDate).setHours(new Date(event.dateAndTimeSettings.startDate).getHours() - 2);

  return (
    <div>
      <PageTitle
        title={event.title}
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
              <PageBreadcrumbItem label={event.title} />,
            ]}
          />
        }
        description={
          <div>
            <p>{event.shortDescription}</p>
            <h5 className="font-bold text-lg mt-2">{new Date(event.dateAndTimeSettings.startDate).toLocaleDateString("de", { weekday: "long", timeZone: "Europe/Berlin", day: "2-digit", month: "long", hour: "numeric", minute: "2-digit" })}</h5>
            <div className="flex items-center space-x-2 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <p>{event.location.name}</p>
            </div>
          </div>
        }
        isCompact
      />
      <div className="container px-4 mx-auto max-w-4xl pb-16">
        <WixMediaImage
          media={event.mainImage}
          alt={event.title}
          width={800}
          height={500}
          className="mb-8"
        />
        <div className="prose lg:prose-lg" dangerouslySetInnerHTML={html}></div>
      </div>
      <div className="container px-4 mx-auto max-w-4xl pb-16">
        <div className="flex items-center space-x-2 mt-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          <p>{event.location.name} - {event.location.address.formatted}</p>
        </div>
      </div>
      {/* <p>{JSON.stringify(event.location)}</p> */}
    </div>
  );
}
