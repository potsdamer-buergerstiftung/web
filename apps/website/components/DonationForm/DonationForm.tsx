"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import { useEffect } from "react";
import DonationFormAmountSelection from "./DonationFormAmountSelection";
import DonationFormPayment from "./DonationFormPayment";
import DonationFormProjectSelection from "./DonationFormProjectSelection";
import { donationProgressAtom } from "./state";

function ProgressButton({ isActive, onClick, children, disabled = false }: { isActive: boolean, onClick: () => void, children: React.ReactNode, disabled?: boolean }) {
    return (
        <button className={clsx("group font-bold font-header py-2 relative", !disabled ? 'opacity-100' : 'opacity-50 cursor-not-allowed')} onClick={onClick}>
            {children}
            <span className={clsx("absolute top-0 -right-5 bottom-0 w-0.5 bg-emerald-500 transition", isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100')} />
        </button>
    )
}

interface DonationFormProps {
    disableProjectSelection?: boolean;
}

export default function DonationForm(props: DonationFormProps) {
    const { disableProjectSelection = false } = props;

    const [donationProgress, setDonationProgress] = useAtom(donationProgressAtom);

    const onProjectSelectionClicked = () => {
        setDonationProgress("PROJECT_SELECTION");
    }

    const onAmountSelectionClicked = () => {
        setDonationProgress("AMOUNT_SELECTION");
    }

    const onPaymentClicked = () => {
        setDonationProgress("PAYMENT");
    }

    useEffect(() => {
        if (!disableProjectSelection) return;
        if (donationProgress === "PROJECT_SELECTION") {
            setDonationProgress("AMOUNT_SELECTION");
        }
    }, [donationProgress]);

    /* useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://js.mollie.com/v1/mollie.js";
        script.async = true;
        document.body.appendChild(script);
    }, []) */

    return (
        <div className="bg-emerald-50 rounded-lg p-8 lg:p-16">
            <h4 className="text-sm font-semibold uppercase text-gray-600 text-center mb-3">
                Mitstiften & Unterstützen
            </h4>
            <h1 className="text-center font-header text-4xl font-bold">
                Spenden
            </h1>
            <p className="text-center max-w-xl mx-auto mt-4">
                Wir legen bei unseren Projekten großen Wert darauf, dass sie nachhaltig wirken. Das ist jedoch nur möglich,
                wenn wir langfristig planen und fördern können. Mit Deiner regelmäßigen und verlässlichen Unterstützung
                können wir diese wichtigen Voraussetzungen schaffen.
            </p>
            <div className="flex flex-col md:flex-row mt-16 gap-10">
                <ul className="hidden md:flex flex-col items-end shrink-0">
                    {!disableProjectSelection && <ProgressButton isActive={donationProgress === "PROJECT_SELECTION"} onClick={onProjectSelectionClicked}>Verwendungszweck wählen</ProgressButton>}

                    <ProgressButton isActive={donationProgress === "AMOUNT_SELECTION"} onClick={onAmountSelectionClicked}>Betrag wählen</ProgressButton>

                    <ProgressButton isActive={donationProgress === "PAYMENT"} onClick={onPaymentClicked}>Zahlung bestätigen</ProgressButton>
                </ul>
                <div className="w-full">
                    {donationProgress === "PROJECT_SELECTION" && <DonationFormProjectSelection />}
                    {donationProgress === "AMOUNT_SELECTION" && <DonationFormAmountSelection />}
                    {donationProgress === "PAYMENT" && <DonationFormPayment />}
                </div>
            </div>
        </div>
    );
}