"use client";

import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import {
  Drawer,
} from "@/components/ui/drawer";
import { quickDonateDrawerOpen } from "./state";
import dynamic from "next/dynamic";

const QuickDonateForm = dynamic(() => import("./quick-donate-form"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto h-full min-h-0 w-full max-w-5xl overflow-y-auto px-6 py-12 lg:col-span-2 lg:grid lg:grid-cols-subgrid lg:gap-x-10 lg:gap-y-8 lg:px-8">
      <div className="lg:col-span-2">
        <p className="mx-auto mt-4 max-w-xl text-center">
          Spendenformular wird geladen...
        </p>
      </div>
    </div>
  ),
});

export default function HeaderQuickDonateDrawer() {
  const [isQuickDonateDrawerOpen, setIsQuickDonateDrawerOpen] = useAtom(
    quickDonateDrawerOpen,
  );

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isQuickDonateDrawerOpen) return;

    const rafId = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => cancelAnimationFrame(rafId);
  }, [isQuickDonateDrawerOpen]);

  return (
    <Drawer
      open={isQuickDonateDrawerOpen}
      onOpenChange={setIsQuickDonateDrawerOpen}
      direction="right"
      modal
    >
      <QuickDonateForm closeButtonRef={closeButtonRef} />
    </Drawer>
  );
}
