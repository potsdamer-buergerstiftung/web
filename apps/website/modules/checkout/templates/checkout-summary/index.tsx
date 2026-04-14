import ItemsPreviewTemplate from "@/modules/cart/templates/preview"
import DiscountCode from "@/modules/checkout/components/discount-code"
import CartTotals from "@/modules/common/components/cart-totals"
import Divider from "@/modules/common/components/divider"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-0 flex flex-col-reverse gap-8 py-8 small:flex-col small:py-0">
      <div className="flex w-full flex-col rounded-3xl border border-border bg-white/90 p-6 shadow-sm">
        <Divider className="my-6 small:hidden" />
        <h2 className="flex items-baseline font-header text-3xl font-bold text-foreground">
          In Ihrem Warenkorb
        </h2>
        <Divider className="my-6" />
        <CartTotals totals={cart} />
        <ItemsPreviewTemplate cart={cart} />
        <div className="my-6">
          <DiscountCode cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
