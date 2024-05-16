import ArticleCard from "@components/ArticleCard";

export interface PublicationsGridProps {
    promise: Promise<any>;
}

export default async function PublicationsGrid(props: PublicationsGridProps) {
    const categories = await props.promise;
    return categories.map((category: any) => (
        <section>
            <div className="container mx-auto px-4 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="col-span-1">
                    <h1 className="font-header mt-2 text-4xl font-bold">
                        {category.title}
                    </h1>
                    <div className="mt-4 max-w-2xl" dangerouslySetInnerHTML={{ __html: category.beschreibung }} />
                </div>
                <div
                    className="col-span-2">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {category.downloads.map((publication: any) => (
                            <ArticleCard title={publication.title} date={new Date(publication._createdDate.$date)} projectTitle={publication.link.id.split('.')[1].toUpperCase()}
                                link={publication.link.url} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    ));
}