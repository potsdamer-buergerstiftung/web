"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import { useState } from "react";
import { customerAtom, customerIdAtom, donationProgressAtom } from "./state";

export default function DonationFormDetailsForm() {
    const [submitting, setSubmitting] = useState(false);
    const [progress, setProgress] = useAtom(donationProgressAtom);
    const [customer, setCustomer] = useAtom(customerAtom);
    const [customerId, setCustomerId] = useAtom(customerIdAtom);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setSubmitting(true);

        try {
            const { firstName, lastName, email, organization } = customer;
            const c = await fetch("/api/payment/customers/create", {
                method: "POST",
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    organization,
                }),
            });
            const data = await c.json();
            console.log(data)
            if (data && data.id) {
                setCustomerId(data.id);
            }
            console.log(customerId)
            setSubmitting(false);
            setProgress("PAYMENT");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <h1 className="font-header font-bold text-3xl">Persönliche Angaben</h1>
            <p className="mt-4 mb-10">
                Wir benötigen diese Daten, damit du deine sich wiederholende Spende später ändern oder beenden kannst. Du kannst das jederzeit
                über den Link in der Bestätigungsmail tun, oder uns mit deinen Daten an uns wenden.
            </p>
            <form method="POST" onSubmit={onSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1">
                        <label className="text-sm font-medium">Vorname (Erforderlich)</label>
                        <input type="text"
                            value={customer.firstName}
                            onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })}
                            className="mt-2 w-full rounded-md border-none bg-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="Dein Vorname" required />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="text-sm font-medium">Nachname (Erforderlich)</label>
                        <input type="text"
                            value={customer.lastName}
                            onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })}
                            className="mt-2 w-full rounded-md border-none bg-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="Dein Nachname" required />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="text-sm font-medium">E-Mail (Erforderlich)</label>
                        <input type="email"
                            value={customer.email}
                            onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                            className="mt-2 w-full rounded-md border-none bg-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="Deine E-Mail" required />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="text-sm font-medium">Organisation</label>
                        <input type="text"
                            value={customer.organization}
                            onChange={(e) => setCustomer({ ...customer, organization: e.target.value })}
                            className="mt-2 w-full rounded-md border-none bg-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="Deine Organisation" />
                    </div>
                </div>
                <button
                    className={clsx("text-md font-header inline-flex items-center rounded-md bg-slate-800 py-3 px-5 font-bold text-white transition ease-in-out hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75 mt-16",

                    )}
                >
                    {submitting && (
                        <svg aria-hidden="true" className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    )}
                    Weiter
                </button>
            </form>
        </>
    )
}