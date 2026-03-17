export type PlanDuration = "ONE_TIME" | "MONTHLY" | "YEARLY";

export type DonationFormFeature =
    | "benefits"
    | "purpose"
    | "amount"
    | "details"
    | "payment";

export type DonationFormNavLabels = {
    benefits?: string;
    purpose?: string;
    amount?: string;
    details?: string;
    payment?: string;
};

export type DonationFormHeaderCopy = {
    eyebrow?: string;
    title: string;
    description?: string;
};

export type DonationFormPurposeConfig = {
    enabled: boolean;
    title: string;
    description: string;
    generalPurposeLabel: string;
    continueLabel?: string;
};

export type DonationFormBenefitsConfig = {
    enabled: boolean;
    title: string;
    description?: string;
    items: string[];
    continueLabel?: string;
};

export type DonationFormAmountDurationOption = {
    key: PlanDuration;
    label: string;
};

export type DonationFormAmountConfig = {
    title: string;
    description: string;
    amounts: number[];
    minAmount?: number;
    defaultAmount?: number;
    allowCustomAmount?: boolean;
    customAmountLabel?: string;
    customAmountPlaceholder?: string;
    durations: DonationFormAmountDurationOption[];
    defaultDuration?: PlanDuration;
    continueLabel?: string;
};

export type DonationFormDetailsConfig = {
    enabled: boolean;
    title: string;
    description: string;
    requiredForDurations: PlanDuration[];
};

export type DonationFormBankTransferConfig = {
    enabled: boolean;
    id?: string;
    label?: string;
    title?: string;
    description?: string;
    onlyForDurations?: PlanDuration[];
};

export type DonationFormPaymentConfig = {
    title: string;
    description: string;
    redirectUrl: string;
    allowedMethodIds?: string[];
    blockedMethodIds?: string[];
    bankTransfer?: DonationFormBankTransferConfig;
    continueLabel?: string;
};

export type DonationFormConfig = {
    features: DonationFormFeature[];
    header: DonationFormHeaderCopy;
    nav?: DonationFormNavLabels;
    benefits?: DonationFormBenefitsConfig;
    purpose: DonationFormPurposeConfig;
    amount: DonationFormAmountConfig;
    details: DonationFormDetailsConfig;
    payment: DonationFormPaymentConfig;
};
