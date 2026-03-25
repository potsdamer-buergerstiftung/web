import PageTitle from "@components/PageTitle";
import { PageBreadcrumb, PageBreadcrumbItem, PageBreadcrumbSeparator } from "@components/PageBreadcrumb";

export default function ProjectLoading() {
    return (
        <div>
            <PageTitle
                isLoading
                title=""
                breadcrumb={
                    <PageBreadcrumb>
                        <PageBreadcrumbItem label="Aktuelles & Projekte" />
                        <PageBreadcrumbSeparator />
                        <PageBreadcrumbItem label="Projekte" href="/aktuelles/projekte" />
                        <PageBreadcrumbSeparator />
                        <PageBreadcrumbItem label="..." />
                    </PageBreadcrumb>
                }
            />
            <div className="container mx-auto px-4 pb-10 animate-pulse">
                <div className="lg:flex lg:flex-row lg:items-start lg:gap-10">
                    <div className="flex-1 mb-8 lg:mb-0 aspect-[8/4] bg-slate-200 rounded-md" />
                    <div className="flex-1 space-y-4">
                        <div className="h-4 bg-slate-200 rounded w-full" />
                        <div className="h-4 bg-slate-200 rounded w-5/6" />
                        <div className="h-4 bg-slate-200 rounded w-4/6" />
                        <div className="h-4 bg-slate-200 rounded w-full" />
                        <div className="h-4 bg-slate-200 rounded w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
