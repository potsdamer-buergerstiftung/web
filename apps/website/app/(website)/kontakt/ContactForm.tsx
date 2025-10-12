"use client";

import { useFormState } from "react-dom";
import { submitForm } from "./action";

export default function ContactForm() {
  const [state, formAction, pending] = useFormState(submitForm, null);

  if (state?.success) {
    return <div className="text-green-500">{state.message}</div>;
  }

  return (
    <form action={formAction}>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-3 md:col-span-1">
          <label className="text-sm font-medium">Vorname (Erforderlich)</label>
          <input
            name="firstName"
            id="firstName"
            type="text"
            className="mt-2 w-full rounded-md border-none bg-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Dein Vorname"
            required
          />
        </div>
        <div className="col-span-3 md:col-span-1">
          <label className="text-sm font-medium">Nachname (Erforderlich)</label>
          <input
            name="lastName"
            id="lastName"
            type="text"
            className="mt-2 w-full rounded-md border-none bg-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Dein Nachname"
            required
          />
        </div>
        <div className="col-span-3 md:col-span-1">
          <label className="text-sm font-medium">Organisation</label>
          <input
            name="organisation"
            id="organisation"
            type="text"
            className="mt-2 w-full rounded-md border-none bg-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Deine Organisation"
          />
        </div>
        <div className="col-span-3 md:col-span-1">
          <label className="text-sm font-medium">E-Mail (Erforderlich)</label>
          <input
            name="email"
            id="email"
            type="email"
            className="mt-2 w-full rounded-md border-none bg-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Deine E-Mail"
            required
          />
        </div>
        <div className="col-span-3 md:col-span-1">
          <label className="text-sm font-medium">Telefon</label>
          <input
            name="phone"
            id="phone"
            type="text"
            className="mt-2 w-full rounded-md border-none bg-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Deine Telefonnummer"
          />
        </div>
        <div className="col-span-3 md:col-span-1">
          <label className="text-sm font-medium">Projektbezug</label>
        </div>
        <div className="col-span-3">
          <label className="text-sm font-medium">Betreff (Erforderlich)</label>
          <input
            name="subject"
            id="subject"
            type="text"
            required
            className="mt-2 w-full rounded-md border-none bg-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Dein Betreff"
          />
        </div>
        <div className="col-span-3">
          <label className="text-sm font-medium">
            Nachricht (Erforderlich)
          </label>
          <textarea
            name="message"
            id="message"
            className="mt-2 h-40 min-h-max w-full rounded-md border-none bg-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Deine Nachricht"
          />
        </div>
        <div className="col-span-3">
          <div className="mb-6 flex items-start">
            <div className="flex h-5 items-center">
              <input
                name="remember"
                id="remember"
                type="checkbox"
                className="focus:ring-3 h-4 w-4 rounded-sm border border-slate-300 bg-slate-100 accent-emerald-500 focus:ring-emerald-300"
                required
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-2 max-w-xl text-sm font-medium"
            >
              Ich erkläre mich einverstanden, dass die eingegebenen Daten für
              die Bearbeitung meines Anliegens weiterverarbeitet werden.
            </label>
          </div>
          <button
            className="text-md font-header inline-flex items-center rounded-md bg-slate-800 py-3 px-5 font-bold text-white transition ease-in-out hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75 mt-16"
            type="submit"
            disabled={pending}
          >
            Absenden
          </button>
        </div>
      </div>
    </form>
  );
}
