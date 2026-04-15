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
        title="Freundeskreis"
        isCompact={true}
        isCentered={true}
        description={
          <p className="max-w-4xl">
            Der Freundeskreis besteht aus Menschen, die regelmäßig spenden und
            damit unsere gemeinnützige Arbeit für Potsdam stärken. Mit 100 Euro
            jährlich sicherst du unser Fundament und ermöglichst eine
            langfristige, planbare Projektarbeit. Gemeinsam machen wir Potsdam
            noch lebenswerter!
          </p>
        }
        breadcrumb={
          <PageBreadcrumb>
            <PageBreadcrumbItem label="Mitstiften" href="/mitstiften" />
            <PageBreadcrumbSeparator />
            <PageBreadcrumbItem label="Freundeskreis" />
          </PageBreadcrumb>
        }
      />
      <section className="container max-w-4xl mx-auto px-4 pb-16 mt-10">
        <DonationForm />
      </section>
    </>
  );
}
