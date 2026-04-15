"use client";

import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { quickDonateDrawerOpen } from "./state";
import { DonationProvider } from "@/modules/donation";
import { Button } from "@/components/ui/button";
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
      <DonationProvider>
        <DrawerContent className="grid h-svh min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden data-[vaul-drawer-direction=right]:w-full lg:data-[vaul-drawer-direction=right]:w-2/3 xl:data-[vaul-drawer-direction=right]:w-1/2 data-[vaul-drawer-direction=right]:sm:max-w-none lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)]">
          <DrawerTitle className="sr-only">Spenden</DrawerTitle>
          <div className="absolute top-4 right-4 z-10">
            <DrawerClose asChild>
              <Button
                size="icon-rounded-lg"
                variant="light"
                ref={closeButtonRef}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-slate-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </DrawerClose>
          </div>
          <QuickDonateForm />
        </DrawerContent>
      </DonationProvider>
    </Drawer>
  );
}
