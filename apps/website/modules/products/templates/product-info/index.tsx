import { HttpTypes } from "@medusajs/types";
import LocalizedClientLink from "@/modules/common/components/localized-client-link";

type ProductInfoProps = {
  product: HttpTypes.StoreProduct;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-4">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="inline-flex w-fit rounded-full border border-border bg-background px-3 py-1 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <h1
          className="font-header text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          data-testid="product-title"
        >
          {product.title}
        </h1>

        <p
          className="whitespace-pre-line text-base leading-7 text-muted-foreground"
          data-testid="product-description"
        >
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
