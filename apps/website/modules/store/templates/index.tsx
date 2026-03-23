import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"
import PageTitle from "@components/PageTitle"
import PageBreadcrumb from "@components/PageBreadcrumb"
import PageBreadcrumbItem from "@components/PageBreadcrumbItem"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <>
      <PageTitle
        title="Shop"
        breadcrumb={
          <PageBreadcrumb
            items={
              <>
                <PageBreadcrumbItem label="Shop" />
              </>
            }
          />
        }
      />
      {/* <RefinementList sortBy={sort} /> */}
      <div className="container mx-auto px-4">
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </>
  )
}

export default StoreTemplate
