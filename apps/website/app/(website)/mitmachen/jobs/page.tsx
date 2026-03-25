import { PageBreadcrumb, PageBreadcrumbItem, PageBreadcrumbSeparator } from "@components/PageBreadcrumb";
import PageTitle from "@components/PageTitle";
import Link from "next/link";

export default function JobsPage() {
  return (
    <>
      <PageTitle
        title="Jobs"
        breadcrumb={
          <PageBreadcrumb>
            <PageBreadcrumbItem label="Mitmachen" href="/mitmachen" />
            <PageBreadcrumbSeparator />
            <PageBreadcrumbItem label="Jobs" />
          </PageBreadcrumb>
        }
      />
      <section className="pt-8 pb-16 container mx-auto maxw-4xl px-4">
        Wir sind immer auf der Suche nach neuen Talenten, die uns bei unserer
        Arbeit unterstützen. Dafür suchen wir Werkstudierende und Menschen, die
        bei uns ihr freiwilliges soziales Jahr, kulturelles Jahr, ökologisches
        Jahr oder Bundesfreiwilligendienst absolvieren möchten. Falls Du
        Interesse hast,{" "}
        <Link href="/kontakt" className="font-bold text-emerald-700">
          melde Dich gerne bei uns
        </Link>
        .
      </section>
    </>
  );
}
