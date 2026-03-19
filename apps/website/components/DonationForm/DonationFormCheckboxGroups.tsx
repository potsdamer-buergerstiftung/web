"use client";

import Link from "next/link";
import { useAtom } from "jotai";
import { checkboxValuesAtom, planDuration } from "./state";
import type {
    DonationFormCheckboxPlacement,
    DonationFormConfig,
} from "./types";
import { getCheckboxGroupsForPlacement } from "./checkboxes";

export default function DonationFormCheckboxGroups({
    config,
    placement,
}: {
    config: DonationFormConfig;
    placement: DonationFormCheckboxPlacement;
}) {
    const [values, setValues] = useAtom(checkboxValuesAtom);
    const [duration] = useAtom(planDuration);
    const groups = getCheckboxGroupsForPlacement(config, placement, duration);
    const hasRequired = groups.some((g) => g.checkboxes.some((c) => c.required));

    if (!groups.length) return null;

    return (
        <div className="mt-10 space-y-8">
            {groups.map((group) => (
                <div key={group.id}>
                    {group.title && (
                        <h3 className="font-header font-bold text-lg">{group.title}</h3>
                    )}
                    {group.description && <p className="mt-2">{group.description}</p>}

                    <div className="mt-4 space-y-3">
                        {group.checkboxes.map((checkbox) => {
                            const checked = !!values[checkbox.id];
                            return (
                                <label
                                    key={checkbox.id}
                                    className="flex gap-3 items-start cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                        checked={checked}
                                        onChange={(e) =>
                                            setValues({
                                                ...values,
                                                [checkbox.id]: e.target.checked,
                                            })
                                        }
                                    />
                                    <span className="text-slate-800">
                                        {checkbox.text}
                                        {checkbox.linkText && checkbox.linkHref && (
                                            <>
                                                <Link
                                                    href={checkbox.linkHref}
                                                    className="underline hover:text-emerald-600"
                                                    target={
                                                        checkbox.linkHref.startsWith("http")
                                                            ? "_blank"
                                                            : undefined
                                                    }
                                                    rel={
                                                        checkbox.linkHref.startsWith("http")
                                                            ? "noopener noreferrer"
                                                            : undefined
                                                    }
                                                >
                                                    {checkbox.linkText}
                                                </Link>
                                            </>
                                        )}
                                        {checkbox.textAfterLink ?? ""}
                                        {checkbox.required && (
                                            <span className="text-slate-600"> *</span>
                                        )}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </div>
            ))}
            {hasRequired && <p className="text-sm text-slate-600">* Pflichtfeld</p>}
        </div>
    );
}
