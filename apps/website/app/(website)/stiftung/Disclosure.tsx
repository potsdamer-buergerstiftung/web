"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion";
import { Link } from "@components/ui/link";
import { Disclosure, Transition } from "@headlessui/react";
import { LinkIcon } from "@heroicons/react/24/outline";
import React, { Fragment } from "react";

export default function FactsDisclosure() {
    const disclosures = [
        {
            title: "Das Konzept",
            key: "das-konzept",
            content: `Die Potsdamer Bürgerstiftung ist eine gemeinnützige Stiftung, die institutionell, finanziell, konfessionell und parteipolitisch unabhängig ist. Sie ist gegründet von und für Bürgerinnen und Bürger Potsdams. Ihr Stiftungszweck ist sehr breit gefasst und zielt immer auf das Gemeinwohl vor Ort. Sie agiert nachhaltig und dauerhaft  - auch für die Anliegen künftiger Generationen - und baut hierfür auf Zustiftungen und Spenden vieler Menschen in und aus Potsdam. Sie bietet verantwortungsbewussten Bürger:innen die Möglichkeit, sich für ihre Stadt und die Menschen, die hier leben, mit Zeit, Geld und Ideen einzusetzen.`,
            button: {
                text: "Mission Statement",
                link: "/mission-statement.pdf",
            },
        },
        {
            title: "Die Satzung",
            key: "die-satzung",
            content: `Die Satzung ist der Maßstab allen Handelns. In ihr sind die Struktur und Förderziele dauerhaft festgelegt. Die Einhaltung des Satzungszwecks und die satzungsgemäße Mittelverwendung wird durch den Stiftungsrat, die Stiftungsaufsicht des Landes Brandenburg und das Finanzamt Potsdam überwacht.`,
            button: {
                text: "Satzung aufrufen",
                link: "/Satzung.pdf",
            }
        },
        {
            title: "Die Organisation",
            key: "die-organisation",
            content: `Die Bürgerstiftung besteht aus vier Gremien, deren Mitglieder alle ehrenamtlich arbeiten: Der Vorstand führt die laufenden Geschäfte. Der Stiftungsrat kontrolliert den Vorstand, ob dieser seine Aufgaben ordnungsgemäß und insbesondere den Stiftungszweck erfüllt. Das Kuratorium berät den Vorstand, insbesondere über die Schwerpunktsetzung der Stiftungsarbeit. Die Stifterversammlung besteht aus langjährigen Zeiststifter:innen und Zustifter:innen von mindestens 5000 € ins Stiftungsvermögen sowie den Gründungsstifter:innen. Das Fundament bilden die vielen Menschen, die sich in der Stiftungsarbeit und den Projekten überwiegend ehrenamtlich engagieren.`
        },
        {
            title: "Die Prinzipien",
            key: "die-prinzipien",
            content: `Die Potsdamer Bürgerstiftung steht für bürgerschaftliches Engagement, Beteiligung, Mitgestaltung, Vielfalt und Toleranz. Sie ist vor allem eine operative Mitmach-Stiftung, kann aber auch fördernd tätig sein. Sie setzt auf offenen Austausch, Dialog und ein wachsendes Netzwerk, Partnerschaften und Kooperationen mit anderen Akteur:innen der Stadtgesellschaft. Die Potsdamer Bürgerstiftung verpflichtet sich zu transparenter Haushaltsführung sowie zur effizienten, effektiven und nachhaltigen Mittelverwendung. `
        }
    ]

    return (
        <Accordion className="max-w-lg">
            {disclosures.map((disclosure) => (
                <AccordionItem value={disclosure.key} key={disclosure.key}>
                    <AccordionTrigger>{disclosure.title}</AccordionTrigger>
                    <AccordionContent>
                        <p className="mb-4">{disclosure.content}</p>
                        {disclosure.button && (
                            <Link href={disclosure.button.link} variant="light">
                                <LinkIcon />
                                {disclosure.button.text}
                            </Link>
                        )}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}