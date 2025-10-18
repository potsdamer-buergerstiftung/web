import Block from "@components/Block";
import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import Image from "next/image";

interface ArticleProps {
    promise: Promise<any>;
}

export default async function Article({ promise }: ArticleProps) {
    const post = await promise;

    return (
        <div>
            <PageTitle
                title={post.title}
                breadcrumb={
                    <PageBreadcrumb
                        items={
                            <>
                                <PageBreadcrumbItem label="Stiftung" />
                                <PageBreadcrumbItem label="Aktuelles" />
                                <PageBreadcrumbItem label={post.title} />
                            </>
                        }
                    />
                }
            />
            <div className="container px-4 mx-auto max-w-3xl">
                <Image src={`https://portal.potsdamer-buergerstiftung.org/assets/${post.image}`} alt={post.title} width={800} height={500} className="mb-8"/>
                <Block data={post.content} />
            </div>
        </div>
    );
}
