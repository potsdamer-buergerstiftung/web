import { PageBreadcrumb, PageBreadcrumbItem, PageBreadcrumbSeparator } from "@/components/PageBreadcrumb";
import PageTitle from "@/components/PageTitle";

export default function CompaniesPage() {
    return (
        <PageTitle title="Stiften als Unternehmen" description="Erfahren Sie, wie Sie als Unternehmen mitstiften können" breadcrumb={<PageBreadcrumb>
            <PageBreadcrumbItem label="Mitstiften" href="/mitstiften" />
            <PageBreadcrumbSeparator />
            <PageBreadcrumbItem label="Unternehmen" />
        </PageBreadcrumb>} />
    )
}