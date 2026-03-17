import type { DonationFormConfig } from "./types";

export const defaultDonationFormConfig: DonationFormConfig = {
    features: ["purpose", "amount", "details", "payment"],
    header: {
        eyebrow: "Mitstiften & Unterstützen",
        title: "Spenden",
        description:
            "Wir legen bei unseren Projekten großen Wert darauf, dass sie nachhaltig wirken. Das ist jedoch nur möglich, wenn wir langfristig planen und fördern können. Mit Deiner regelmäßigen und verlässlichen Unterstützung können wir diese wichtigen Voraussetzungen schaffen.",
    },
    nav: {
        benefits: "Vorteile",
        purpose: "Verwendungszweck wählen",
        amount: "Betrag wählen",
        details: "Persönliche Angaben",
        payment: "Zahlung bestätigen",
    },
    benefits: {
        enabled: false,
        title: "Vorteile",
        items: [],
        continueLabel: "Weiter",
    },
    checkboxGroups: [
        {
            id: "default-payment-consents",
            placement: "PAYMENT",
            title: "Einverständnis",
            checkboxes: [
                {
                    id: "privacy_policy",
                    required: true,
                    text: "Ich akzeptiere die ",
                    linkText: "Datenschutzerklärung",
                    linkHref: "/datenschutz",
                    textAfterLink: ".",
                },
                {
                    id: "newsletter_opt_in",
                    required: false,
                    text: "Ich möchte den Newsletter erhalten.",
                },
            ],
        },
    ],
    purpose: {
        enabled: true,
        title: "Verwendungszweck wählen",
        description:
            "Du kannst mit Deiner Spende ein bestimmtes Projekt oder die allgemeine Arbeit der Stiftung unterstützen.",
        generalPurposeLabel: "Allgemeine Arbeit unterstützen",
        continueLabel: "Weiter",
    },
    amount: {
        title: "Betrag wählen",
        description:
            "Jeder Euro zählt. Ab einer Spende von 50€ stellen wir Dir gerne eine Spendenbescheinigung aus.",
        amounts: [10, 50, 100],
        minAmount: 2,
        allowCustomAmount: true,
        customAmountLabel: "Eigener Betrag",
        customAmountPlaceholder: "Dein eigener Betrag",
        durations: [
            { key: "ONE_TIME", label: "Einmalig" },
            { key: "MONTHLY", label: "Monatlich" },
        ],
        defaultDuration: "ONE_TIME",
        continueLabel: "Weiter",
    },
    details: {
        enabled: true,
        title: "Persönliche Angaben",
        description:
            "Wir benötigen diese Daten, damit du deine sich wiederholende Spende später ändern oder beenden kannst. Du kannst das jederzeit über den Link in der Bestätigungsmail tun, oder dich mit deinen Daten an uns wenden.",
        requiredForDurations: ["MONTHLY", "YEARLY"],
    },
    payment: {
        title: "Bezahlmethode wählen",
        description:
            "Wir unterstützen neuerdings auch die Zahlung durch elektronische SEPA-Lastschrift, sodass Du das Mandat nicht mehr schriftlich erteilen musst.",
        redirectUrl:
            "https://www.potsdamer-buergerstiftung.org/mitstiften/spenden/danke",
        bankTransfer: {
            enabled: true,
            id: "bank_transfer",
            label: "Überweisung",
            title: "Banküberweisung",
            description:
                "Bitte überweise deine Spende mithilfe der folgenden Bankdetails:",
            onlyForDurations: ["ONE_TIME"],
        },
        continueLabel: "Weiter",
    },
};

export const privateDonationFormConfig: DonationFormConfig = {
    ...defaultDonationFormConfig,
    header: {
        eyebrow: "Mitstiften & Unterstützen",
        title: "Privatspende",
        description:
            "Wir legen bei unseren Projekten großen Wert darauf, dass sie nachhaltig wirken. Das ist jedoch nur möglich, wenn wir langfristig planen und fördern können. Mit Deiner regelmäßigen und verlässlichen Unterstützung können wir diese wichtigen Voraussetzungen schaffen.",
    },
    purpose: {
        ...defaultDonationFormConfig.purpose,
        enabled: true,
    },
    amount: {
        ...defaultDonationFormConfig.amount,
        durations: [
            { key: "ONE_TIME", label: "Einmalig" },
            { key: "MONTHLY", label: "Monatlich" },
        ],
        defaultDuration: "ONE_TIME",
    },
};

export const freundeskreisDonationFormConfig: DonationFormConfig = {
    ...defaultDonationFormConfig,
    features: ["benefits", "amount", "details", "payment"],
    header: {
        eyebrow: "Mitstiften & Unterstützen",
        title: "Freundeskreis",
        description:
            "Der Freundeskreis besteht aus Menschen, die regelmäßig spenden und damit unsere gemeinnützige Arbeit für Potsdam stärken. Mit 100 Euro jährlich sicherst du unser Fundament und ermöglichst eine langfristige, planbare Projektarbeit. Gemeinsam machen wir Potsdam noch lebenswerter!",
    },
    nav: {
        benefits: "Deine Vorteile",
        amount: "Betrag wählen",
        details: "Persönliche Angaben",
        payment: "Zahlung bestätigen",
    },
    benefits: {
        enabled: true,
        title: "Deine Vorteile:",
        description:
            "Als Teil unseres Freundeskreises erhältst du exklusive Einblicke und bleibst nah dran an unserer Arbeit in Potsdam.",
        items: [
            "Einladungen zu ausgewählten Veranstaltungen der Bürgerstiftung",
            "Regelmäßige Updates zu Projekten und Wirkung deiner Unterstützung",
            "Du wirst Teil einer Gemeinschaft, die Potsdam aktiv mitgestaltet",
        ],
        continueLabel: "Zur Registrierung",
    },
    purpose: {
        ...defaultDonationFormConfig.purpose,
        enabled: false,
    },
    amount: {
        ...defaultDonationFormConfig.amount,
        title: "Jährlichen Beitrag wählen",
        description: "Der Freundeskreis-Beitrag beträgt mindestens 100€ pro Jahr.",
        amounts: [100, 150, 250],
        minAmount: 100,
        durations: [{ key: "YEARLY", label: "Jährlich" }],
        defaultDuration: "YEARLY",
        defaultAmount: 100,
    },
    details: {
        ...defaultDonationFormConfig.details,
        requiredForDurations: ["YEARLY"],
    },
    payment: {
        ...defaultDonationFormConfig.payment,
        bankTransfer: {
            ...defaultDonationFormConfig.payment.bankTransfer,
            enabled: false,
        },
    },
};
