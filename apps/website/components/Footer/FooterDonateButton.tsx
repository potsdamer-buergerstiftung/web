"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import { quickDonateDrawerOpen } from "../Header/state";

export default function FooterDonateButton() {
  const [_, setIsQuickDonateDrawerOpen] = useAtom(quickDonateDrawerOpen);
  return (
    <button
      onClick={() => setIsQuickDonateDrawerOpen(true)}
      className={clsx(
        "text-md font-header mt-4 inline-flex items-center rounded-md bg-slate-800 text-white py-1.5 px-4 font-bold transition ease-in-out hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75"
      )}
    >
      Jetzt spenden
    </button>
  );
}
