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
                <h5 className="font-bold text-lg mt-2">{new Date(event.dateAndTimeSettings.startDate).toLocaleDateString("de", { weekday: "long", timeZone: "Europe/Berlin", day:"2-digit", month: "long", hour: "numeric", minute: "2-digit" })}</h5>
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
    </div>
  );
}
