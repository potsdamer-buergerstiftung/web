"use client";

import clsx from "clsx";
import { Provider, useAtom } from "jotai";
import { useEffect, useMemo } from "react";
import DonationFormAmountSelection from "./DonationFormAmountSelection";
import DonationFormBenefits from "./DonationFormBenefits";
import DonationFormDetailsForm from "./DonationFormDetailsForm";
import DonationFormPayment from "./DonationFormPayment";
import DonationFormProjectSelection from "./DonationFormProjectSelection";
import {
    checkboxValuesAtom,
    customerAtom,
    customerIdAtom,
    donationProgressAtom,
    planDuration,
    projectsAtom,
    selectedAmountAtom,
    selectedPaymentProviderIdAtom,
    selectedProjectId,
} from "./state";
import type { Progress } from "./state";
import DonationFormBankDetails from "./DonationFormBankDetails";
import type { DonationFormConfig } from "./types";
import { defaultDonationFormConfig } from "./presets";
import { getDefaultCheckboxValues } from "./checkboxes";

function ProgressButton({
    isActive,
    onClick,
    children,
    disabled = false,
}: {
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;
}) {
    return (
        <button
            type="button"
            disabled={disabled}
            className={clsx(
                "group font-bold font-header py-2 relative",
                !disabled ? "opacity-100" : "opacity-50 cursor-not-allowed"
            )}
            onClick={() => {
                if (disabled) return;
                onClick();
            }}
        >
            {children}
            <span
                className={clsx(
                    "absolute top-0 -right-5 bottom-0 w-0.5 bg-emerald-500 transition",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}
            />
        </button>
    );
}

interface DonationFormProps {
    config?: DonationFormConfig;
}

function DonationFormInner({ config }: { config: DonationFormConfig }) {
    const [donationProgress, setDonationProgress] = useAtom(donationProgressAtom);
    const [activePlanDuration] = useAtom(planDuration);

    const hasBenefitsFeature =
        config.features.includes("benefits") && !!config.benefits?.enabled;
    const hasPurposeFeature =
        config.features.includes("purpose") && config.purpose.enabled;
    const hasAmountFeature = config.features.includes("amount");
    const hasDetailsFeature =
        config.features.includes("details") && config.details.enabled;
    const hasPaymentFeature = config.features.includes("payment");

    const detailsRequiredForActiveDuration =
        hasDetailsFeature &&
        config.details.requiredForDurations.includes(activePlanDuration);

    useEffect(() => {
        if (!hasBenefitsFeature && donationProgress === "BENEFITS") {
            setDonationProgress(hasPurposeFeature ? "PROJECT_SELECTION" : "AMOUNT_SELECTION");
        }
        if (!hasPurposeFeature && donationProgress === "PROJECT_SELECTION") {
            setDonationProgress("AMOUNT_SELECTION");
        }
    }, [donationProgress, hasBenefitsFeature, hasPurposeFeature, setDonationProgress]);

    useEffect(() => {
        if (
            donationProgress === "DETAILS_FORM" &&
            !detailsRequiredForActiveDuration
        ) {
            setDonationProgress("PAYMENT");
        }
    }, [donationProgress, detailsRequiredForActiveDuration, setDonationProgress]);

    const navLabels = {
        benefits: config.nav?.benefits ?? "Vorteile",
        purpose: config.nav?.purpose ?? "Verwendungszweck wählen",
        amount: config.nav?.amount ?? "Betrag wählen",
        details: config.nav?.details ?? "Persönliche Angaben",
        payment: config.nav?.payment ?? "Zahlung bestätigen",
    };

    const mobileTabs = (
        [
            {
                key: "BENEFITS",
                label: navLabels.benefits,
                enabled: hasBenefitsFeature,
            },
            {
                key: "PROJECT_SELECTION",
                label: navLabels.purpose,
                enabled: hasPurposeFeature,
            },
            {
                key: "AMOUNT_SELECTION",
                label: navLabels.amount,
                enabled: hasAmountFeature,
            },
            {
                key: "DETAILS_FORM",
                label: navLabels.details,
                enabled: detailsRequiredForActiveDuration,
            },
            {
                key: "PAYMENT",
                label: navLabels.payment,
                enabled: hasPaymentFeature,
            },
        ] satisfies Array<{ key: Progress; label: string; enabled: boolean }>
    ).filter((t) => t.enabled);

    return (
        <div className="bg-emerald-50 rounded-lg p-8 lg:p-16">
            <h4 className="text-sm font-semibold uppercase text-gray-600 text-center mb-3">
                {config.header.eyebrow ?? "Mitstiften & Unterstützen"}
            </h4>
            <h1 className="text-center font-header text-4xl font-bold">
                {config.header.title}
            </h1>
            {config.header.description && (
                <p className="text-center max-w-xl mx-auto mt-4">
                    {config.header.description}
                </p>
            )}
            <div className="flex flex-col md:flex-row mt-16 gap-10">
                <ul className="hidden md:flex flex-col items-end shrink-0">
                    {hasBenefitsFeature && (
                        <ProgressButton
                            isActive={donationProgress === "BENEFITS"}
                            onClick={() => setDonationProgress("BENEFITS")}
                        >
                            {navLabels.benefits}
                        </ProgressButton>
                    )}
                    {hasPurposeFeature && (
                        <ProgressButton
                            isActive={donationProgress === "PROJECT_SELECTION"}
                            onClick={() => setDonationProgress("PROJECT_SELECTION")}
                        >
                            {navLabels.purpose}
                        </ProgressButton>
                    )}

                    {hasAmountFeature && (
                        <ProgressButton
                            isActive={donationProgress === "AMOUNT_SELECTION"}
                            onClick={() => setDonationProgress("AMOUNT_SELECTION")}
                        >
                            {navLabels.amount}
                        </ProgressButton>
                    )}

                    {detailsRequiredForActiveDuration && (
                        <ProgressButton
                            isActive={donationProgress === "DETAILS_FORM"}
                            onClick={() => setDonationProgress("DETAILS_FORM")}
                        >
                            {navLabels.details}
                        </ProgressButton>
                    )}

                    {hasPaymentFeature && (
                        <ProgressButton
                            isActive={donationProgress === "PAYMENT"}
                            onClick={() => setDonationProgress("PAYMENT")}
                        >
                            {navLabels.payment}
                        </ProgressButton>
                    )}
                </ul>
                <div className="w-full">
                    {mobileTabs.length > 1 && (
                        <div className="md:hidden mb-8 -mx-2 px-2 overflow-x-auto">
                            <div className="flex gap-6">
                                {mobileTabs.map((tab) => (
                                    <button
                                        key={tab.key}
                                        type="button"
                                        onClick={() => setDonationProgress(tab.key)}
                                        className={clsx(
                                            "shrink-0 font-header font-bold pb-2 border-b-2 transition whitespace-nowrap",
                                            donationProgress === tab.key
                                                ? "border-emerald-500 text-slate-900"
                                                : "border-transparent text-slate-600"
                                        )}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {donationProgress === "BENEFITS" && hasBenefitsFeature && (
                        <DonationFormBenefits config={config} />
                    )}
                    {donationProgress === "PROJECT_SELECTION" && hasPurposeFeature && (
                        <DonationFormProjectSelection config={config} />
                    )}
                    {donationProgress === "AMOUNT_SELECTION" && hasAmountFeature && (
                        <DonationFormAmountSelection config={config} />
                    )}
                    {donationProgress === "DETAILS_FORM" && hasDetailsFeature && (
                        <DonationFormDetailsForm config={config} />
                    )}
                    {donationProgress === "PAYMENT" && hasPaymentFeature && (
                        <DonationFormPayment config={config} />
                    )}
                    {donationProgress === "BANK_DETAILS" && (
                        <DonationFormBankDetails config={config} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default function DonationForm(props: DonationFormProps) {
    const config = props.config ?? defaultDonationFormConfig;

    const initialValues = useMemo(() => {
        const initialDuration =
            config.amount.defaultDuration ?? config.amount.durations[0]?.key ?? "ONE_TIME";

        const minAmount = config.amount.minAmount ?? 1;
        const defaultAmountCandidate =
            config.amount.defaultAmount ?? config.amount.amounts[0] ?? minAmount;
        const initialAmount = Math.max(minAmount, defaultAmountCandidate);

        const hasPurposeFeature =
            config.features.includes("purpose") && config.purpose.enabled;

        return [
            [
                donationProgressAtom,
                hasPurposeFeature ? "PROJECT_SELECTION" : "AMOUNT_SELECTION",
            ],
            [planDuration, initialDuration],
            [selectedAmountAtom, initialAmount],
            [selectedProjectId, 0],
            [selectedPaymentProviderIdAtom, ""],
            [projectsAtom, []],
            [checkboxValuesAtom, getDefaultCheckboxValues(config)],
            [
                customerAtom,
                {
                    firstName: "",
                    lastName: "",
                    email: "",
                    organization: "",
                },
            ],
            [customerIdAtom, ""],
        ] as const;
    }, [config]);

    return (
        <Provider initialValues={initialValues}>
            <DonationFormInner config={config} />
        </Provider>
    );
}
