"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import { quickDonateDrawerOpen } from "../Header/state";
import { Button } from "@components/ui/button";

export default function FooterDonateButton() {
    const [_, setIsQuickDonateDrawerOpen] = useAtom(quickDonateDrawerOpen);
    return (
        <Button variant="secondary" onClick={() => setIsQuickDonateDrawerOpen(true)}
        >
            Jetzt spenden
        </Button>
    )
}