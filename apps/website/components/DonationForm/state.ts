import { atom } from "jotai";
import type { PlanDuration } from "./types";

export type Customer = {
    firstName: string;
    lastName: string;
    email: string;
    organization?: string;
}

export type Progress =
| "BENEFITS"
| "PROJECT_SELECTION"
| "AMOUNT_SELECTION"
| "DETAILS_FORM"
| "PAYMENT"
| "BANK_DETAILS";

export type { PlanDuration } from "./types";

export const donationProgressAtom = atom<Progress>("PROJECT_SELECTION");
export const planDuration = atom<PlanDuration>("ONE_TIME");
export const selectedAmountAtom = atom(10);
export const selectedProjectId = atom<number>(0);
export const selectedPaymentProviderIdAtom = atom<string>("");
export const projectsAtom = atom<any[]>([]);
export const customerAtom = atom<Customer>({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
});
export const customerIdAtom = atom<string>("");
