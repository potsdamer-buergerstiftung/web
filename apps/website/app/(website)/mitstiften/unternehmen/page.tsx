import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";

export default function CompaniesPage() {
    return (
        <PageTitle title="Stiften als Unternehmen" description="Erfahren Sie, wie Sie als Unternehmen mitstiften können" breadcrumb={<PageBreadcrumb items={[
            <PageBreadcrumbItem label="Mitstiften" href="/mitstiften" />,
            <PageBreadcrumbItem label="Unternehmen" />
        ]} />} />
    )
}