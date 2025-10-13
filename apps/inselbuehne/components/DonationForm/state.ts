import { atom } from "jotai";

export type Progress = "PROJECT_SELECTION" | "AMOUNT_SELECTION" | "PAYMENT";

export type PlanDuration = "ONE_TIME" | "MONTHLY";

export const donationProgressAtom = atom<Progress>("PROJECT_SELECTION");
export const planDuration = atom<PlanDuration>("ONE_TIME");
export const selectedAmountAtom = atom(10);
export const selectedProjectId = atom<number>(0);
export const selectedPaymentProviderIdAtom = atom<number>(0);
export const projectsAtom = atom<any[]>([]);
