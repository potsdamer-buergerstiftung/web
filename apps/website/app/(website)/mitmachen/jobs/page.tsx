import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import Link from "next/link";

export default function JobsPage() {
    return (
        <>
            <PageTitle
                title="Jobs"
                breadcrumb={
                    <PageBreadcrumb
                        items={[
                            <PageBreadcrumbItem label="Mitmachen" href="/mitmachen" />,
                            <PageBreadcrumbItem label="Jobs" />,
                        ]}
                    />
                }
            />
            <section className="pt-8 pb-16 container mx-auto maxw-4xl px-4">
                Wir sind immer an Menschen, die mit uns ihr freiwilliges soziales Jahr
                absolvieren möchten oder sich für Bundesfreiwilligendienst bereit erklären, interessiert.
                Falls Du Interesse hast, <Link href="/kontakt" className="font-bold text-emerald-500">melde Dich gerne bei uns</Link>.
            </section>
        </>
    );
}
