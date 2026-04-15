import React, { Suspense } from "react";

import ImageGallery from "@/modules/products/components/image-gallery";
import ProductActions from "@/modules/products/components/product-actions";
import ProductOnboardingCta from "@/modules/products/components/product-onboarding-cta";
import ProductTabs from "@/modules/products/components/product-tabs";
import RelatedProducts from "@/modules/products/components/related-products";
import ProductInfo from "@/modules/products/templates/product-info";
import SkeletonRelatedProducts from "@/modules/skeletons/templates/skeleton-related-products";
import { notFound } from "next/navigation";
import { HttpTypes } from "@medusajs/types";

import ProductActionsWrapper from "./product-actions-wrapper";

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct;
  region: HttpTypes.StoreRegion;
  countryCode: string;
  images: HttpTypes.StoreProductImage[];
};

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound();
  }

  return (
    <>
      <div
        className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 lg:grid lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,420px)] lg:items-start lg:px-6"
        data-testid="product-container"
      >
        <div className="space-y-6">
          <ImageGallery images={images} />
          <div className="rounded-3xl border border-border bg-white/90 p-5 shadow-sm lg:p-6">
            <ProductTabs product={product} />
          </div>
        </div>
        <aside className="space-y-6 lg:sticky lg:top-32">
          <div className="rounded-3xl border border-border bg-white/90 p-6 shadow-sm">
            <ProductInfo product={product} />
          </div>
          <ProductOnboardingCta />
          <div className="rounded-3xl border border-border bg-white/90 p-6 shadow-sm">
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
          </div>
        </aside>
      </div>
      <div
        className="mx-auto my-16 w-full max-w-7xl px-4 sm:my-24 lg:px-6"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  );
};

export default ProductTemplate;
