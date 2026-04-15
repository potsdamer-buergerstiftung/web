import { listProducts } from "@/lib/data/products";
import { getRegion } from "@/lib/data/regions";
import { HttpTypes } from "@medusajs/types";
import Product from "../product-preview";

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct;
  countryCode: string;
};

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode);

  if (!region) {
    return null;
  }

  // edit this function to define your related products logic
  const queryParams: HttpTypes.StoreProductListParams = {};
  if (region?.id) {
    queryParams.region_id = region.id;
  }
  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id];
  }
  if (product.tags) {
    queryParams.tag_id = product.tags
      .map((t) => t.id)
      .filter(Boolean) as string[];
  }
  queryParams.is_giftcard = false;

  const products = await listProducts({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter(
      (responseProduct) => responseProduct.id !== product.id,
    );
  });

  if (!products.length) {
    return null;
  }

  return (
    <section>
      <div className="flex flex-col items-center text-center mb-12">
        <span className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Verwandte Produkte
        </span>
        <p className="max-w-lg text-3xl font-bold tracking-tight text-foreground">
          Diese Produkte könnten Ihnen auch gefallen.
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4 xl:gap-6">
        {products.map((product) => (
          <li key={product.id}>
            <Product region={region} product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
