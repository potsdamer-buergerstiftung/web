"use client";

import { useAtom } from "jotai";
import { donationProgressAtom } from "./state";
import type { DonationFormConfig } from "./types";

function getNextProgressAfterBenefits(config: DonationFormConfig) {
    const hasPurpose =
        config.features.includes("purpose") && config.purpose.enabled;
    const hasAmount = config.features.includes("amount");
    const hasPayment = config.features.includes("payment");

    if (hasPurpose) return "PROJECT_SELECTION" as const;
    if (hasAmount) return "AMOUNT_SELECTION" as const;
    if (hasPayment) return "PAYMENT" as const;
    return "AMOUNT_SELECTION" as const;
}

export default function DonationFormBenefits({ config }: { config: DonationFormConfig }) {
    const [_progress, setProgress] = useAtom(donationProgressAtom);
    const benefits = config.benefits;

    if (!benefits?.enabled) return null;

    return (
        <div className="grid grid-cols-3 gap-10">
            <div className="hidden col-span-1 md:block">
                <div className="bg-white rounded-lg p-8">
                    <img src="/img/benefits.svg" alt="" />
                </div>
            </div>
            <div className="col-span-3 md:col-span-2">
                <h4 className="font-header font-bold text-2xl">
                    {benefits.title}
                </h4>
                {benefits.description && <p className="mt-4">{benefits.description}</p>}

                {!!benefits.items?.length && (
                    <ul className="mt-6 list-disc pl-5">
                        {benefits.items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                )}

                <button
                    type="button"
                    onClick={() => setProgress(getNextProgressAfterBenefits(config))}
                    className="text-md font-header inline-flex items-center rounded-md bg-slate-800 py-3 px-5 font-bold text-white transition ease-in-out hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75 mt-16"
                >
                    {benefits.continueLabel ?? "Weiter"}
                </button>
            </div>
        </div>
    );
}
