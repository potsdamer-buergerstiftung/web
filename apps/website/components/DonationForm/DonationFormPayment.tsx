"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { selectedAmountAtom, selectedPaymentProviderIdAtom } from "./state";

export default function DonationFormPayment() {
    const router = useRouter();
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [paymentMethodsLoading, setPaymentMethodsLoading] = useState(true);
    const [paymentMethodsError, setPaymentMethodsError] = useState(null);
    const [selectedPaymentProviderId, setSelectedPaymentProviderId] = useAtom(
        selectedPaymentProviderIdAtom
    );
    const [selectedAmount] = useAtom(selectedAmountAtom);

    const requestPaymentMethods = async () => {
        try {
            const response = await fetch("/api/payment/methods");
            const data = await response.json();
            setPaymentMethods(data);
            setPaymentMethodsLoading(false);
        } catch (error) {
            setPaymentMethodsError(error);
        }
    };

    const onContinueClicked = async () => {
        try {
            const payment = await fetch("/api/payment/create", {
                method: "POST",
                body: JSON.stringify({
                    amount: selectedAmount,
                    method: selectedPaymentProviderId,
                    redirectUrl: "https://www.potsdamer-buergerstiftung.org/danke",
                }),
            });

            router.push((await payment.json())._links.checkout.href);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        /* const $ = window as any;
    
            const mollie = $.Mollie('pfl_L7fwyV5HFC', { locale: 'de_DE', testmode: true });
    
            var cardComponent = mollie.createComponent('card');
            cardComponent.mount('#card'); */

        requestPaymentMethods();
    }, []);

    return (
        <div className="grid grid-cols-3 gap-10">
            <div className="col-span-1">
                <div className="bg-white rounded-lg p-8">
                    <img src="/img/payment.svg" />
                </div>
            </div>
            <div className="col-span-2">
                <h1 className="font-header font-bold text-3xl">Bezahlmethode wählen</h1>
                <p className="mt-2">
                    Wir unterstützen neuerdings auch die Zahlung durch elektronische
                    SEPA-Lastschrift, sodass Du das Mandat nicht mehr schriftlich erteilen
                    musst.
                </p>
                <ul className="flex flex-row gap-4 mt-8 flex-wrap">
                    {paymentMethodsLoading && <p>Zahlungsmethoden werden geladen...</p>}
                    {paymentMethodsError && <p>Error: {paymentMethodsError}</p>}
                    {paymentMethods &&
                        paymentMethods.map((paymentMethod: any) => (
                            <button
                                key={paymentMethod.id}
                                onClick={() => setSelectedPaymentProviderId(paymentMethod.id)}
                                className={clsx(
                                    "flex-grow px-4 bg-emerald-100 rounded-lg relative font-bold py-3",
                                    selectedPaymentProviderId === paymentMethod.id &&
                                    "ring-2 ring-slate-900"
                                )}
                            >
                                <span className="text-slate-900">
                                    {paymentMethod.description}
                                </span>
                            </button>
                        ))}
                </ul>
                <button
                    disabled={selectedPaymentProviderId === 0}
                    className={clsx("text-md font-header inline-flex items-center rounded-md bg-slate-800 py-3 px-5 font-bold text-white transition ease-in-out hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75 mt-16",
                        selectedPaymentProviderId === 0 && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={onContinueClicked}
                >
                    Weiter
                </button>
            </div>
        </div>
    );
}
