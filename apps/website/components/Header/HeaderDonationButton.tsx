"use client";

import { useAtom } from "jotai";
import { quickDonateDrawerOpen } from "./state";
import { Button } from "@components/ui/button";
import { trackUmami } from "@components/analytics/umami";

export default function HeaderDonationButton() {
  const [_, setIsQuickDonateDrawerOpen] = useAtom(quickDonateDrawerOpen);
  return (
    <Button
      data-umami-event="donation_opened_header"
      onClick={() => {
        trackUmami("donation_opened", { location: "header" });
        setIsQuickDonateDrawerOpen(true);
      }}
    >
      Jetzt spenden
    </Button>
  );
}
