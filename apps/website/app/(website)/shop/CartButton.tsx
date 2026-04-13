"use client";

import { buttonVariants } from "@/components/ui/button";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import LocalizedClientLink from "@/modules/common/components/localized-client-link";
import clsx from "clsx";

export default function CartButtonButton() {
    return (
        <LocalizedClientLink
            href="/cart"
            className={buttonVariants({ size: "icon" })}
        >
            <ShoppingCartIcon />
        </LocalizedClientLink>
    );
}
