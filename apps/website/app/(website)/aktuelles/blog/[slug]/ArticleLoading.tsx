import PageTitle from "@/components/PageTitle";
import { PageBreadcrumb, PageBreadcrumbItem } from "@/components/PageBreadcrumb";

export default function ArticleLoading() {
    return (
        <div>
            <PageTitle
                isLoading
                isCompact
                title=""
                breadcrumb={
                    <PageBreadcrumb>
                        <PageBreadcrumbItem label="Aktuelles" />
                        <PageBreadcrumbItem label="Blog" href="/aktuelles/blog" />
                        <PageBreadcrumbItem label="..." />
                    </PageBreadcrumb>
                }
            />
            <div className="container px-4 mx-auto max-w-4xl animate-pulse">
                <div className="w-full aspect-[16/10] bg-slate-200 mb-8 rounded-md" />
                <div className="space-y-4">
                    <div className="h-4 bg-slate-200 rounded w-full" />
                    <div className="h-4 bg-slate-200 rounded w-5/6" />
                    <div className="h-4 bg-slate-200 rounded w-4/6" />
                    <div className="pt-4 h-4 bg-slate-200 rounded w-full" />
                    <div className="h-4 bg-slate-200 rounded w-full" />
                    <div className="h-4 bg-slate-200 rounded w-2/3" />
                </div>
            </div>
        </div>
    );
}
