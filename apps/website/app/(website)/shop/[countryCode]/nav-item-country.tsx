"use client";

import { useParams } from "next/navigation";
import HeaderNavItem from "@/components/Header/HaderNavItem";

interface HeaderNavItemLocalizedProps {
    index: number
    label: string
    key: string
    href: string
}

export function HeaderNavItemLocalized({ index, label, key, href }: HeaderNavItemLocalizedProps) {
    const { countryCode } = useParams()

    return (
        <HeaderNavItem
            index={index}
            label={label}
            href={`/shop/${countryCode}${href}`}
            key={key}
        />
    )
}