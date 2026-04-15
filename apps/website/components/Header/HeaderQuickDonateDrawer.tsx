"use client";

import { useAtom } from "jotai";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
} from "@/components/ui/drawer";
import { quickDonateDrawerOpen } from "./state";
import {
  DonationProvider,
  DonationFormProgress,
  DonationFormContent,
  DonationFormActions,
} from "../donation";

export default function HeaderQuickDonateDrawer() {
  const [isQuickDonateDrawerOpen, setIsQuickDonateDrawerOpen] = useAtom(
    quickDonateDrawerOpen,
  );

  return (
    <Drawer
      open={isQuickDonateDrawerOpen}
      onOpenChange={setIsQuickDonateDrawerOpen}
      direction="right"
    >
      <DonationProvider>
        <DrawerContent
          className="overflow-y-auto overflow-x-hidden data-[vaul-drawer-direction=right]:w-full lg:data-[vaul-drawer-direction=right]:w-2/3 xl:data-[vaul-drawer-direction=right]:w-2/3 data-[vaul-drawer-direction=right]:sm:max-w-none"
        >
          <DrawerTitle className="sr-only">Spenden</DrawerTitle>
          <div className="absolute top-4 right-4 z-10">
            <DrawerClose asChild>
              <button className="block rounded-full p-4 ring-primary/40 transition hover:ring-1 bg-slate-100 dark:bg-slate-800">
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
              </button>
            </DrawerClose>
          </div>
          <div className="overflow-y-auto p-8 lg:p-16">
            <div>
              <h4 className="text-sm font-semibold uppercase text-gray-600 text-center mb-3">
                Mitstiften & Unterstützen
              </h4>
              <h1 className="text-center font-header text-4xl font-bold">
                Spenden
              </h1>
              <p className="text-center max-w-xl mx-auto mt-4">
                Wir legen bei unseren Projekten großen Wert darauf, dass sie nachhaltig wirken. Das ist jedoch nur möglich, wenn wir langfristig planen und fördern können. Mit Deiner regelmäßigen und verlässlichen Unterstützung können wir diese wichtigen Voraussetzungen schaffen.
              </p>
            </div>
            <div className="grid grid-cols-6 gap-6 mt-8 lg:mt-16">
              <div className="col-span-6 md:col-span-2 lg:col-span-1">
                <DonationFormProgress />
              </div>
              <div className="col-span-6 md:col-span-4 lg:col-span-5">
                <DonationFormContent />
              </div>
            </div>
          </div>
          <DrawerFooter className="px-8 lg:px-16 gap-6 grid grid-cols-6">
            <div />
            <div className="col-span-3 md:col-span-1">
              <DonationFormActions />
            </div>
          </DrawerFooter>
        </DrawerContent>
      </DonationProvider>
    </Drawer>
  );
}