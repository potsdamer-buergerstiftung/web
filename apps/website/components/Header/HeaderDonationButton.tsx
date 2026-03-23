"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import { quickDonateDrawerOpen } from "./state";
import { Button } from "@components/ui/button";

export default function HeaderDonationButton() {
    const [_, setIsQuickDonateDrawerOpen] = useAtom(quickDonateDrawerOpen);
    return (
        <Button onClick={() => setIsQuickDonateDrawerOpen(true)}
        >
            Jetzt spenden
        </Button>
    )
}