"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { planDuration, projectsAtom, selectedAmountAtom, selectedPaymentProviderIdAtom, selectedProjectId } from "./state";

export default function DonationFormPayment() {
    const router = useRouter();
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [paymentMethodsLoading, setPaymentMethodsLoading] = useState(true);
    const [paymentMethodsError, setPaymentMethodsError] = useState(null);
    const [selectedPaymentProviderId, setSelectedPaymentProviderId] = useAtom(
        selectedPaymentProviderIdAtom
    );
    const [selectedAmount] = useAtom(selectedAmountAtom);
    const [projects] = useAtom(projectsAtom);
    const [selectedProject] = useAtom(selectedProjectId);
    const [donationSubmitted, setDonationSubmitted] = useState(false);
    const [duration] = useAtom(planDuration);

    const requestPaymentMethods = async () => {
        try {
            const response = await fetch("/api/payment/methods", {
                method: "POST",
                body: JSON.stringify({
                    duration,
                }),
            });
            const data = await response.json();
            setPaymentMethods(data);
            setPaymentMethodsLoading(false);
        } catch (error) {
            setPaymentMethodsError(error);
        }
    };

    const onContinueClicked = async () => {
        setDonationSubmitted(true);
        try {
            const description = selectedProject !== 0 ? projects.find((project) => project.id === selectedProject).title : "Allgemeine Arbeit";
            const payment = await fetch("/api/payment/create", {
                method: "POST",
                body: JSON.stringify({
                    amount: selectedAmount,
                    method: selectedPaymentProviderId,
                    redirectUrl: "https://www.potsdamer-buergerstiftung.org/mitstiften/spenden/danke",
                    description,
                    duration,
                }),
            });

            router.push((await payment.json())._links.checkout.href);
        } catch (error) {
            console.error(error);
            setDonationSubmitted(false);
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
            <div className="hidden col-span-1 md:block">
                <div className="bg-white rounded-lg p-8">
                    <img src="/img/payment.svg" />
                </div>
            </div>
            <div className="col-span-3 md:col-span-2">
                <h1 className="font-header font-bold text-3xl">Bezahlmethode wählen</h1>
                <p className="mt-4">
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
                    {donationSubmitted && (
                        <svg aria-hidden="true" className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    )}
                    Weiter
                </button>
            </div>
        </div>
    );
}
