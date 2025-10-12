"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import { quickDonateDrawerOpen } from "./state";

export default function HeaderDonationButton() {
  const [_, setIsQuickDonateDrawerOpen] = useAtom(quickDonateDrawerOpen);
  return (
    <button
      onClick={() => setIsQuickDonateDrawerOpen(true)}
      className={clsx(
        "bg-emerald-100 text-slate-800 hover:bg-emerald-200 text-md font-header inline-flex rounded-md py-1.5 px-4 font-bold transition ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-75"
      )}
    >
      Jetzt spenden
    </button>
  );
}
