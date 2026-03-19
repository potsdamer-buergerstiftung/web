import type {
    DonationFormCheckboxGroup,
    DonationFormCheckboxPlacement,
    DonationFormConfig,
    PlanDuration,
} from "./types";

export function getCheckboxGroupsForPlacement(
    config: DonationFormConfig,
    placement: DonationFormCheckboxPlacement,
    duration?: PlanDuration
): DonationFormCheckboxGroup[] {
    const groups = config.checkboxGroups ?? [];
    return groups.filter((g) => {
        if (g.placement !== placement) return false;
        if (duration && g.onlyForDurations?.length) {
            return g.onlyForDurations.includes(duration);
        }
        return true;
    });
}

export function getDefaultCheckboxValues(config: DonationFormConfig) {
    const values: Record<string, boolean> = {};
    for (const group of config.checkboxGroups ?? []) {
        for (const checkbox of group.checkboxes ?? []) {
            values[checkbox.id] = !!checkbox.defaultChecked;
        }
    }
    return values;
}

export function getRequiredCheckboxIds(groups: DonationFormCheckboxGroup[]) {
    const ids: string[] = [];
    for (const group of groups) {
        for (const checkbox of group.checkboxes ?? []) {
            if (checkbox.required) ids.push(checkbox.id);
        }
    }
    return ids;
}

export function areAllRequiredCheckboxesChecked(
    values: Record<string, boolean>,
    requiredIds: string[]
) {
    return requiredIds.every((id) => values[id] === true);
}

