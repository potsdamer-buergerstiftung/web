import { DonationForm } from "@/modules/donation";
import PageTitle from "@/components/page-title";
import {
  PageBreadcrumb,
  PageBreadcrumbItem,
  PageBreadcrumbSeparator,
} from "@/components/page-breadcrumb";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const benefits = [
  "Du förderst Kultur, Bildung, Teilhabe und Klimaschutz in Potsdam",
  "Du stärkst den Zusammenhalt und das Wir-Gefühl in deiner Stadt",
  "Bei Events und Mitmach-Treffs kannst du nette Menschen kennenlernen",
  "Ein Newsletter informiert dich über unsere Aktivitäten",
];

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
      <section className="container max-w-4xl mx-auto px-4 mt-10">
        <div className="rounded-2xl border bg-muted/40 p-6 sm:p-8">
          <h2 className="text-xl font-semibold sm:text-2xl">
            Deine Vorteile im Freundeskreis
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <CheckCircleIcon
                  className="mt-0.5 h-6 w-6 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="text-muted-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
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
