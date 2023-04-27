"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import { useState } from "react";
import { donationProgressAtom, planDuration, selectedAmountAtom } from "./state";

const defaultAmounts = [10, 50, 100];
const planDurations = [
    {
        key: "MONTHLY",
        text: "Monatlich"
    },
    {
        key: "ONE_TIME",
        text: "Einmalig"
    }
]

export default function DonationFormAmountSelection() {
    const [activePlanDuration, setActivePlanDuration] = useAtom(planDuration);
    const [selectedAmount, setSelectedAmount] = useAtom(selectedAmountAtom);
    const [customAmountActive, setCustomAmountActive] = useState(false);
    const [donationProgress, setDonationProgress] = useAtom(donationProgressAtom);

    return (
        <div className="grid grid-cols-3 gap-10">
            <div className="col-span-1">
                <div className="bg-white rounded-lg p-8">
                    <img src="/img/choose.svg" />
                </div>
            </div>
            <div className="col-span-2">
                <h1 className="font-header font-bold text-3xl">
                    Betrag wählen
                </h1>
                <p className="mt-2"><b>Jeder Euro zählt.</b> Ab einer Spende von 50€ stellen wir Dir gerne eine Spendenbescheinigung aus.</p>
                <ul className="flex flex-row gap-6 mt-8">
                    {planDurations.map((planDuration, index) => (
                        <li key={index} className={clsx("relative font-bold py-2 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-500", planDuration.key === activePlanDuration ? 'after:opacity-100' : 'after:opacity-0')}>
                            <button onClick={() => setActivePlanDuration(planDuration.key as any)}>{planDuration.text}</button>
                        </li>
                    ))}
                </ul>
                <ul className="flex flex-row gap-6 mt-8">
                    {defaultAmounts.map((amount, index) => (
                        <li key={index}
                            className={clsx("relative font-bold py-2 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-500", amount === selectedAmount && defaultAmounts.includes(selectedAmount) ? 'after:opacity-100' : 'after:opacity-0')}>
                            <button onClick={() => { setSelectedAmount(amount); setCustomAmountActive(false) }}>{amount}€</button>
                        </li>
                    ))}
                    <li className={clsx("relative font-bold py-2 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-500", !defaultAmounts.includes(selectedAmount) ? 'after:opacity-100' : 'after:opacity-0')}>
                        <button onClick={() => { setSelectedAmount(25); setCustomAmountActive(true) }}>Eigener Betrag</button>
                    </li>
                </ul>
                {customAmountActive && (
                    <div className="mt-4">
                        <label className="text-sm font-medium">Eigener Betrag</label>
                        <input type="number"
                            onChange={(e) => setSelectedAmount(parseInt(e.target.value))}
                            className="mt-2 w-full rounded-md border-none bg-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="Dein eigener betrag" />
                    </div>
                )}
                <button
                    onClick={() => setDonationProgress("PAYMENT")}
                    disabled={!(selectedAmount > 1)} className={clsx("text-md font-header inline-flex items-center rounded-md bg-slate-800 py-3 px-5 font-bold text-white transition ease-in-out hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75 mt-16", !(selectedAmount > 1) && "opacity-50 cursor-not-allowed")}>Weiter</button>
            </div>
        </div>
    )
}
