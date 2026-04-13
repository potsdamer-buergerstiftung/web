import Block from "@/components/Block";
import { PageBreadcrumb, PageBreadcrumbItem, PageBreadcrumbSeparator } from "@/components/PageBreadcrumb";
import PageTitle from "@/components/PageTitle";
import Image from "next/image";

interface ArticleProps {
    promise: Promise<any>;
}

function calculateReadTime(content: any) {
    if (!content || !content.blocks) return 0;

    let totalWords = 0;
    content.blocks.forEach((block: any) => {
        if (block.type === "paragraph" || block.type === "header") {
            const text = block.data?.text || "";
            // Remove HTML tags for accurate word count
            const cleanText = text.replace(/<[^>]*>?/gm, "");
            totalWords += cleanText.split(/\s+/).filter(Boolean).length;
        } else if (block.type === "list") {
            block.data?.items?.forEach((item: string) => {
                const cleanItem = item.replace(/<[^>]*>?/gm, "");
                totalWords += cleanItem.split(/\s+/).filter(Boolean).length;
            });
        }
    });

    const wordsPerMinute = 200;
    return Math.max(1, Math.ceil(totalWords / wordsPerMinute));
}

export default async function Article({ promise }: ArticleProps) {
    const post = await promise;

    const readTime = calculateReadTime(post.content);

    const Actions = () => (
        <div className="flex flex-row gap-8">
            <div>
                <p className="text-slate-500 text-sm">Autor</p>
                <p className="font-bold">{post.user_created.first_name}</p>
            </div>
            <div>
                <p className="text-slate-500 text-sm">Veröffentlicht</p>
                <p className="font-bold">
                    {new Date(post.date).toLocaleDateString("de-DE", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </p>
            </div>
            <div>
                <p className="text-slate-500 text-sm">Lesezeit</p>
                <p className="font-bold">{readTime} min</p>
            </div>
        </div>
    );

    return (
        <div>
            <PageTitle
                isCompact
                title={post.title}
                actions={<Actions />}
                breadcrumb={
                    <PageBreadcrumb>
                        <PageBreadcrumbItem label="Aktuelles" />
                        <PageBreadcrumbSeparator />
                        <PageBreadcrumbItem label="Blog" href="/aktuelles/blog" />
                        <PageBreadcrumbSeparator />
                        <PageBreadcrumbItem label={post.title} />
                    </PageBreadcrumb>
                }
            />
            <div className="container px-4 mx-auto max-w-4xl">
                <Image src={`https://portal.potsdamer-buergerstiftung.org/assets/${post.image}`} alt={post.title} width={800} height={500} className="mb-8" />
                <Block data={post.content} />
            </div>
        </div>
    );
}
