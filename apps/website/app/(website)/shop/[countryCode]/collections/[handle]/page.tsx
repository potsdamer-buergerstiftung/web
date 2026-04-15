import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getCollectionByHandle, listCollections } from "@/lib/data/collections";
import { listRegions } from "@/lib/data/regions";
import { StoreCollection, StoreRegion } from "@medusajs/types";
import CollectionTemplate from "@/modules/collections/templates";
import { SortOptions } from "@/modules/store/components/refinement-list/sort-products";

type Props = {
  params: Promise<{ handle: string; countryCode: string }>;
  searchParams: Promise<{
    page?: string;
    sortBy?: SortOptions;
  }>;
};

export const PRODUCT_LIMIT = 12;

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollectionByHandle(params.handle);

  if (!collection) {
    notFound();
  }

  const metadata = {
    title: `${collection.title} | Potsdamer Bürgerstiftung Shop`,
    description: `Kollektion ${collection.title}`,
  } as Metadata;

  return metadata;
}

export default async function CollectionPage(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sortBy, page } = searchParams;

  const collection = await getCollectionByHandle(params.handle).then(
    (collection: StoreCollection) => collection,
  );

  if (!collection) {
    notFound();
  }

  return (
    <CollectionTemplate
      collection={collection}
      page={page}
      sortBy={sortBy}
      countryCode={params.countryCode}
    />
  );
}
