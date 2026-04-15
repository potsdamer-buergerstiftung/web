"use client";

import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { quickDonateDrawerOpen } from "./state";
import QuickDonateDrawerContent from "./quick-donate-drawer-content";

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
      <DrawerContent className="data-[vaul-drawer-direction=right]:w-full lg:data-[vaul-drawer-direction=right]:w-2/3 xl:data-[vaul-drawer-direction=right]:w-1/2 data-[vaul-drawer-direction=right]:sm:max-w-none">
        <DrawerTitle className="sr-only">Spenden</DrawerTitle>
        <QuickDonateDrawerContent closeButtonRef={closeButtonRef} />
      </DrawerContent>
    </Drawer>
  );
}
