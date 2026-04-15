"use client";

import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, CreditCardIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isStripeLike, paymentInfoMap } from "@/lib/constants";
import { initiatePaymentSession } from "@/lib/data/cart";
import ErrorMessage from "@/modules/checkout/components/error-message";
import PaymentContainer, {
  StripeCardContainer,
} from "@/modules/checkout/components/payment-container";
import Divider from "@/modules/common/components/divider";

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any;
  availablePaymentMethods: any[];
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending",
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardBrand, setCardBrand] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? "",
  );

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get("step") === "payment";

  const setPaymentMethod = async (method: string) => {
    setError(null);
    setSelectedPaymentMethod(method);
    if (isStripeLike(method)) {
      await initiatePaymentSession(cart, {
        provider_id: method,
      });
    }
  };

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0;

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const shouldInputCard =
        isStripeLike(selectedPaymentMethod) && !activeSession;

      const checkActiveSession =
        activeSession?.provider_id === selectedPaymentMethod;

      if (!checkActiveSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        });
      }

      if (!shouldInputCard) {
        return router.push(
          pathname + "?" + createQueryString("step", "review"),
          {
            scroll: false,
          },
        );
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setError(null);
  }, [isOpen]);

  return (
    <section className="rounded-3xl border border-border bg-white/90 p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2
          className={cn(
            "flex items-center gap-2 font-header text-3xl font-bold text-foreground",
            !isOpen && !paymentReady && "opacity-50",
          )}
        >
          Zahlung
          {!isOpen && paymentReady && (
            <CheckCircleIcon className="size-6 text-primary" />
          )}
        </h2>
        {!isOpen && paymentReady && (
          <button
            onClick={handleEdit}
            className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
            data-testid="edit-payment-button"
          >
            Bearbeiten
          </button>
        )}
      </div>

      <div className={isOpen ? "block" : "hidden"}>
        {!paidByGiftcard && availablePaymentMethods?.length && (
          <RadioGroup
            value={selectedPaymentMethod}
            onChange={(value: string) => setPaymentMethod(value)}
          >
            {availablePaymentMethods.map((paymentMethod) => (
              <div key={paymentMethod.id}>
                {isStripeLike(paymentMethod.id) ? (
                  <StripeCardContainer
                    paymentProviderId={paymentMethod.id}
                    selectedPaymentOptionId={selectedPaymentMethod}
                    paymentInfoMap={paymentInfoMap}
                    setCardBrand={setCardBrand}
                    setError={setError}
                    setCardComplete={setCardComplete}
                  />
                ) : (
                  <PaymentContainer
                    paymentInfoMap={paymentInfoMap}
                    paymentProviderId={paymentMethod.id}
                    selectedPaymentOptionId={selectedPaymentMethod}
                  />
                )}
              </div>
            ))}
          </RadioGroup>
        )}

        {paidByGiftcard && (
          <div className="max-w-sm">
            <p className="mb-1 text-sm font-medium text-foreground">
              Zahlungsmethode
            </p>
            <p
              className="text-sm text-muted-foreground"
              data-testid="payment-method-summary"
            >
              Geschenkgutschein
            </p>
          </div>
        )}

        <ErrorMessage
          error={error}
          data-testid="payment-method-error-message"
        />

        <Button
          size="lg"
          className="mt-6"
          onClick={handleSubmit}
          disabled={
            (isStripeLike(selectedPaymentMethod) && !cardComplete) ||
            (!selectedPaymentMethod && !paidByGiftcard)
          }
          data-testid="submit-payment-button"
        >
          {!activeSession && isStripeLike(selectedPaymentMethod)
            ? "Kartendaten eingeben"
            : "Weiter zur Prüfung"}
        </Button>
      </div>

      <div className={isOpen ? "hidden" : "block"}>
        {cart && paymentReady && activeSession ? (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="max-w-sm">
              <p className="mb-1 text-sm font-medium text-foreground">
                Zahlungsmethode
              </p>
              <p
                className="text-sm text-muted-foreground"
                data-testid="payment-method-summary"
              >
                {paymentInfoMap[activeSession?.provider_id]?.title ||
                  activeSession?.provider_id}
              </p>
            </div>
            <div className="max-w-sm">
              <p className="mb-1 text-sm font-medium text-foreground">
                Zahlungsdetails
              </p>
              <div
                className="flex items-center gap-3 text-sm text-muted-foreground"
                data-testid="payment-details-summary"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background">
                  {paymentInfoMap[selectedPaymentMethod]?.icon || (
                    <CreditCardIcon className="size-4" />
                  )}
                </span>
                <span>
                  {isStripeLike(selectedPaymentMethod) && cardBrand
                    ? cardBrand
                    : "Ein weiterer Schritt wird angezeigt"}
                </span>
              </div>
            </div>
          </div>
        ) : paidByGiftcard ? (
          <div className="max-w-sm">
            <p className="mb-1 text-sm font-medium text-foreground">
              Zahlungsmethode
            </p>
            <p
              className="text-sm text-muted-foreground"
              data-testid="payment-method-summary"
            >
              Geschenkgutschein
            </p>
          </div>
        ) : null}
      </div>

      <Divider className="mt-8" />
    </section>
  );
};

export default Payment;
