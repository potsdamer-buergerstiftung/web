"use client";

import { Disclosure, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

export default function FactsDisclosure() {
  const disclosures = [
    {
      title: "Das Konzept",
      content: `Die Potsdamer Bürgerstiftung ist eine gemeinnützige Stiftung, die institutionell, finanziell, konfessionell und parteipolitisch unabhängig ist. Sie ist gegründet von und für Bürgerinnen und Bürger Potsdams. Ihr Stiftungszweck ist sehr breit gefasst und zielt immer auf das Gemeinwohl vor Ort. Sie agiert nachhaltig und dauerhaft  - auch für die Anliegen künftiger Generationen - und baut hierfür auf Zustiftungen und Spenden vieler Menschen in und aus Potsdam. Sie bietet verantwortungsbewussten Bürger:innen die Möglichkeit, sich für ihre Stadt und die Menschen, die hier leben, mit Zeit, Geld und Ideen einzusetzen.`,
      button: {
        text: "Mission Statement",
        link: "/mission-statement.pdf",
      },
    },
    {
      title: "Die Satzung",
      content: `Die Satzung ist der Maßstab allen Handelns. In ihr sind die Struktur und Förderziele dauerhaft festgelegt. Die Einhaltung des Satzungszwecks und die satzungsgemäße Mittelverwendung wird durch den Stiftungsrat, die Stiftungsaufsicht des Landes Brandenburg und das Finanzamt Potsdam überwacht.`,
      button: {
        text: "Satzung aufrufen",
        link: "/Satzung.pdf",
      },
    },
    {
      title: "Die Organisation",
      content: `Die Bürgerstiftung besteht aus vier Gremien, deren Mitglieder alle ehrenamtlich arbeiten: Der Vorstand führt die laufenden Geschäfte. Der Stiftungsrat kontrolliert den Vorstand, ob dieser seine Aufgaben ordnungsgemäß und insbesondere den Stiftungszweck erfüllt. Das Kuratorium berät den Vorstand, insbesondere über die Schwerpunktsetzung der Stiftungsarbeit. Die Stifterversammlung besteht aus langjährigen Zeiststifter:innen und Zustifter:innen von mindestens 5000 € ins Stiftungsvermögen sowie den Gründungsstifter:innen. Das Fundament bilden die vielen Menschen, die sich in der Stiftungsarbeit und den Projekten überwiegend ehrenamtlich engagieren.`,
    },
    {
      title: "Die Prinzipien",
      content: `Die Potsdamer Bürgerstiftung steht für bürgerschaftliches Engagement, Beteiligung, Mitgestaltung, Vielfalt und Toleranz. Sie ist vor allem eine operative Mitmach-Stiftung, kann aber auch fördernd tätig sein. Sie setzt auf offenen Austausch, Dialog und ein wachsendes Netzwerk, Partnerschaften und Kooperationen mit anderen Akteur:innen der Stadtgesellschaft. Die Potsdamer Bürgerstiftung verpflichtet sich zu transparenter Haushaltsführung sowie zur effizienten, effektiven und nachhaltigen Mittelverwendung. `,
    },
  ];

  return (
    <Fragment>
      {disclosures.map((disclosure, index) => (
        <div className="mt-8" key={index}>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex flex-row w-full text-left mb-4 items-center gap-2">
                  {!open && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  )}
                  {open && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 12H4"
                      />
                    </svg>
                  )}
                  <h4 className="text-lg font-bold">{disclosure.title}</h4>
                </Disclosure.Button>
                <Transition
                  show={open}
                  enter="transition duration-100 ease-out"
                  enterFrom="-translate-y-4 opacity-0"
                  enterTo="translate-y-0 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="translate translate-y-0 opacity-100"
                  leaveTo="-translate-y-4 opacity-0"
                >
                  <Disclosure.Panel className="text-gray-500">
                    {disclosure.content}
                    {disclosure.button && (
                      <div className="mt-2">
                        <a
                          href={disclosure.button.link}
                          className="py-1 px-3 bg-emerald-100 inline-flex items-center text-slate-800 text-md font-header rounded-md font-bold transition ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-75 hover:bg-emerald-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4 mr-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                            />
                          </svg>

                          {disclosure.button.text}
                        </a>
                      </div>
                    )}
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        </div>
      ))}
    </Fragment>
  );
}
