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
        className="bg-muted"
        description={
          <p className="max-w-4xl">
            Der Freundeskreis besteht aus Menschen, die regelmäßig spenden und
            damit unsere gemeinnützige Arbeit für Potsdam stärken. Mit{" "}
            <b>100 Euro</b> jährlich <b>sicherst du unser Fundament</b> und
            ermöglichst eine <b>langfristige</b>, <b>planbare Projektarbeit</b>. Gemeinsam
            machen wir Potsdam noch lebenswerter!
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
        <DonationForm
          config={{
            fixedPurposeId: "freundeskreis",
            allowedIntervals: ["yearly"],
            allowCustomAmount: false,
            allowedAmounts: [100.0],
          }}
        />
      </section>
    </>
  );
}
