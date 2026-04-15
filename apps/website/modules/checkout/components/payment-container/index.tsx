import { Radio as RadioGroupOption } from "@headlessui/react";
import React, { useContext, useMemo, type JSX } from "react";

import Radio from "@/modules/common/components/radio";

import { isManual } from "@/lib/constants";
import SkeletonCardDetails from "@/modules/skeletons/components/skeleton-card-details";
import { CardElement } from "@stripe/react-stripe-js";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import PaymentTest from "../payment-test";
import { StripeContext } from "../payment-wrapper/stripe-wrapper";
import { cn } from "@/lib/utils";

type PaymentContainerProps = {
  paymentProviderId: string;
  selectedPaymentOptionId: string | null;
  disabled?: boolean;
  paymentInfoMap: Record<string, { title: string; icon: JSX.Element }>;
  children?: React.ReactNode;
};

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  children,
}) => {
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <RadioGroupOption
      key={paymentProviderId}
      value={paymentProviderId}
      disabled={disabled}
      className={cn(
        "flex flex-col gap-3 rounded-2xl border p-4 transition-colors",
        selectedPaymentOptionId === paymentProviderId
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border bg-white hover:border-primary/40",
        disabled && "cursor-not-allowed opacity-50",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-x-4">
          <Radio checked={selectedPaymentOptionId === paymentProviderId} />
          <span className="text-sm font-medium text-foreground">
            {paymentInfoMap[paymentProviderId]?.title || paymentProviderId}
          </span>
          {isManual(paymentProviderId) && isDevelopment && (
            <PaymentTest className="hidden small:block" />
          )}
        </div>
        <span className="justify-self-end text-foreground">
          {paymentInfoMap[paymentProviderId]?.icon}
        </span>
      </div>
      {isManual(paymentProviderId) && isDevelopment && (
        <PaymentTest className="small:hidden text-[10px]" />
      )}
      {children}
    </RadioGroupOption>
  );
};

export default PaymentContainer;

export const StripeCardContainer = ({
  paymentProviderId,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  setCardBrand,
  setError,
  setCardComplete,
}: Omit<PaymentContainerProps, "children"> & {
  setCardBrand: (brand: string) => void;
  setError: (error: string | null) => void;
  setCardComplete: (complete: boolean) => void;
}) => {
  const stripeReady = useContext(StripeContext);

  const useOptions: StripeCardElementOptions = useMemo(() => {
    return {
      style: {
        base: {
          fontFamily: "Inter, sans-serif",
          color: "#424270",
          "::placeholder": {
            color: "rgb(107 114 128)",
          },
        },
      },
      classes: {
        base: "block w-full rounded-md border border-border bg-white px-4 py-3 text-sm outline-none transition-colors",
      },
    };
  }, []);

  return (
    <PaymentContainer
      paymentProviderId={paymentProviderId}
      selectedPaymentOptionId={selectedPaymentOptionId}
      paymentInfoMap={paymentInfoMap}
      disabled={disabled}
    >
      {selectedPaymentOptionId === paymentProviderId &&
        (stripeReady ? (
          <div className="mt-2 rounded-2xl border border-border bg-background/70 p-4 transition-all duration-150 ease-in-out">
            <p className="mb-2 text-sm font-medium text-foreground">
              Enter your card details:
            </p>
            <CardElement
              options={useOptions as StripeCardElementOptions}
              onChange={(e) => {
                setCardBrand(
                  e.brand && e.brand.charAt(0).toUpperCase() + e.brand.slice(1),
                );
                setError(e.error?.message || null);
                setCardComplete(e.complete);
              }}
            />
          </div>
        ) : (
          <SkeletonCardDetails />
        ))}
    </PaymentContainer>
  );
};
