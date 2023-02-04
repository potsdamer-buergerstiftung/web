import Block from "@/components/Block";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import PageBreadcrumbItem from "@/components/PageBreadcrumbItem";
import PageTitle from "@/components/PageTitle";

interface ArticleProps {
    promise: Promise<any>;
}

export default async function Article({ promise }: ArticleProps) {
    const post = await promise;

    return (
        <div>
            <PageTitle title={post.title} breadcrumb={<PageBreadcrumb items={[<PageBreadcrumbItem label="Stiftung" />, <PageBreadcrumbItem label="Aktuelles" />, <PageBreadcrumbItem label={post.title} />]} />} />
            <div className="container px-4 mx-auto max-w-3xl">
                <Block loading data={post.content} />
            </div>
        </div>
    )
}