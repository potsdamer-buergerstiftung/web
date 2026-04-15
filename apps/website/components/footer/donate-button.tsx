"use client";

import { useAtom } from "jotai";
import { quickDonateDrawerOpen } from "@/components/header/state";
import { Button } from "@/components/ui/button";
import { trackUmami } from "@/modules/analytics/umami";

export default function FooterDonateButton() {
  const [_, setIsQuickDonateDrawerOpen] = useAtom(quickDonateDrawerOpen);
  return (
    <Button
      variant="secondary"
      data-umami-event="donation_opened_footer"
      onClick={() => {
        trackUmami("donation_opened", { location: "footer" });
        setIsQuickDonateDrawerOpen(true);
      }}
    >
      Jetzt spenden
    </Button>
  );
}
