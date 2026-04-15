import repeat from "@/lib/util/repeat";
import SkeletonCartItem from "@/modules/skeletons/components/skeleton-cart-item";
import SkeletonCodeForm from "@/modules/skeletons/components/skeleton-code-form";
import SkeletonOrderSummary from "@/modules/skeletons/components/skeleton-order-summary";

const SkeletonCartPage = () => {
  return (
    <div className="py-12">
      <div className="content-container">
        <div className="grid grid-cols-1 gap-8 small:grid-cols-[1fr_360px] small:gap-x-12">
          <div className="flex flex-col gap-6 rounded-3xl border border-border bg-white/90 p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="h-8 w-60 animate-pulse rounded bg-muted" />
                <div className="h-6 w-48 animate-pulse rounded bg-muted" />
              </div>
              <div className="h-8 w-14 animate-pulse rounded bg-muted" />
            </div>

            <div className="flex flex-col gap-4">
              <div className="h-12 w-20 animate-pulse rounded bg-muted" />
              {repeat(4).map((index) => (
                <SkeletonCartItem key={index} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <SkeletonOrderSummary />
            <SkeletonCodeForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCartPage;
