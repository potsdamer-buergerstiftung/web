import { DonationForm } from "@/modules/donation";
import PageTitle from "@/components/page-title";
import {
  PageBreadcrumb,
  PageBreadcrumbItem,
  PageBreadcrumbSeparator,
} from "@/components/page-breadcrumb";

export default function FreundeskreisJoinPage() {
  return (
    <>
      <PageTitle
        title="Spenden"
        isCompact={true}
        isCentered={true}
        description={
          <p className="max-w-4xl">
            Erfahre, wie du persönlich mitstiften kannst. Wenn du uns als
            Unternehmen unterstützen möchtest kontaktiere uns gerne, um über
            Sponsorings, Kooperationen, Sachspenden und mehr zu erfahren.
          </p>
        }
        breadcrumb={
          <PageBreadcrumb>
            <PageBreadcrumbItem label="Mitstiften" href="/mitstiften" />
            <PageBreadcrumbSeparator />
            <PageBreadcrumbItem label="Spenden" />
          </PageBreadcrumb>
        }
      />
      <section className="container max-w-4xl mx-auto px-4 pb-16 mt-10">
        <DonationForm />
      </section>
    </>
  );
}
