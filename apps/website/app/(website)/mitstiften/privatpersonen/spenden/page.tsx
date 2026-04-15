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
        className="bg-muted/50"
        description={
          <p className="max-w-4xl">
            Wir legen bei unseren Projekten großen Wert darauf, dass sie
            nachhaltig wirken. Das ist jedoch nur möglich, wenn wir langfristig
            planen und fördern können. Mit Deiner regelmäßigen und verlässlichen
            Unterstützung können wir diese wichtigen Voraussetzungen schaffen.
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
      <section className="container max-w-4xl mx-auto px-4 pb-16 mt-12">
        <DonationForm config={{ fixedPurposeId: "general" }} />
      </section>
    </>
  );
}
