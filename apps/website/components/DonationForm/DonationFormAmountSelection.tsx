"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { donationProgressAtom, planDuration, selectedAmountAtom } from "./state";
import type { DonationFormConfig } from "./types";

export default function DonationFormAmountSelection({
    config,
}: {
    config: DonationFormConfig;
}) {
    const [activePlanDuration, setActivePlanDuration] = useAtom(planDuration);
    const [selectedAmount, setSelectedAmount] = useAtom(selectedAmountAtom);
    const [customAmountActive, setCustomAmountActive] = useState(false);
    const [_donationProgress, setDonationProgress] = useAtom(donationProgressAtom);

    const presetAmounts = config.amount.amounts;
    const minAmount = config.amount.minAmount ?? 1;
    const durationOptions = config.amount.durations;

    const detailsRequiredForActiveDuration =
        config.features.includes("details") &&
        config.details.enabled &&
        config.details.requiredForDurations.includes(activePlanDuration);

    useEffect(() => {
        const allowedDurationKeys = new Set(durationOptions.map((d) => d.key));
        if (!allowedDurationKeys.has(activePlanDuration)) {
            const fallback = durationOptions[0]?.key;
            if (fallback) setActivePlanDuration(fallback as any);
        }
    }, [activePlanDuration, durationOptions, setActivePlanDuration]);

    useEffect(() => {
        if (presetAmounts.includes(selectedAmount)) return;

        if (config.amount.allowCustomAmount === false) {
            const fallback = presetAmounts[0] ?? minAmount;
            setSelectedAmount(fallback);
            setCustomAmountActive(false);
            return;
        }

        setCustomAmountActive(true);
    }, [
        config.amount.allowCustomAmount,
        minAmount,
        presetAmounts,
        selectedAmount,
        setSelectedAmount,
    ]);

    useEffect(() => {
        if (selectedAmount < minAmount) {
            setSelectedAmount(minAmount);
        }
    }, [minAmount, selectedAmount, setSelectedAmount]);

    return (
        <div className="grid grid-cols-3 gap-10">
            <div className="hidden col-span-1 md:block">
                <div className="bg-white rounded-lg p-8">
                    <img src="/img/choose.svg" />
                </div>
            </div>
            <div className="col-span-3 md:col-span-2">
                <h1 className="font-header font-bold text-3xl">
                    {config.amount.title}
                </h1>
                <p className="mt-4">{config.amount.description}</p>
                <ul className="flex flex-row gap-6 mt-8">
                    {durationOptions.map((durationOption) => (
                        <li
                            key={durationOption.key}
                            className={clsx(
                                "relative font-bold py-2 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-700",
                                durationOption.key === activePlanDuration
                                    ? "after:opacity-100"
                                    : "after:opacity-0"
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => setActivePlanDuration(durationOption.key as any)}
                            >
                                {durationOption.label}
                            </button>
                        </li>
                    ))}
                </ul>
                <ul className="flex flex-row gap-6 mt-8">
                    {presetAmounts.map((amount, index) => (
                        <li key={index}
                            className={clsx(
                                "relative font-bold py-2 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-700",
                                amount === selectedAmount && presetAmounts.includes(selectedAmount)
                                    ? "after:opacity-100"
                                    : "after:opacity-0"
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedAmount(amount);
                                    setCustomAmountActive(false);
                                }}
                            >
                                {amount}€
                            </button>
                        </li>
                    ))}
                    {config.amount.allowCustomAmount !== false && (
                        <li
                            className={clsx(
                                "relative font-bold py-2 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-700",
                                !presetAmounts.includes(selectedAmount)
                                    ? "after:opacity-100"
                                    : "after:opacity-0"
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedAmount(Math.max(minAmount, selectedAmount));
                                    setCustomAmountActive(true);
                                }}
                            >
                                {config.amount.customAmountLabel ?? "Eigener Betrag"}
                            </button>
                        </li>
                    )}
                </ul>
                {customAmountActive && (
                    <div className="mt-4">
                        <label className="text-sm font-medium">
                            {config.amount.customAmountLabel ?? "Eigener Betrag"}
                        </label>
                        <input
                            type="number"
                            value={selectedAmount}
                            onChange={(e) => {
                                const next = parseInt(e.target.value);
                                if (!Number.isFinite(next)) return;
                                setSelectedAmount(next);
                            }}
                            className="mt-2 w-full rounded-md border-none bg-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder={
                                config.amount.customAmountPlaceholder ?? "Dein eigener Betrag"
                            }
                        />
                    </div>
                )}
                <button
                    onClick={() => {
                        setDonationProgress(
                            detailsRequiredForActiveDuration ? "DETAILS_FORM" : "PAYMENT"
                        );
                    }}
                    disabled={selectedAmount < minAmount}
                    className={clsx(
                        "text-md font-header inline-flex items-center rounded-md bg-slate-800 py-3 px-5 font-bold text-white transition ease-in-out hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75 mt-16",
                        selectedAmount < minAmount && "opacity-50 cursor-not-allowed"
                    )}
                >
                    {config.amount.continueLabel ?? "Weiter"}
                </button>
            </div>
        </div>
    )
}
