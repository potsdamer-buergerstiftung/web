import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import Image from "next/image";
import Link from "next/link";

export default function QualityAndTransparencyPage() {
  return (
    <>
      <PageTitle
        title="Qualität & Transparenz"
        breadcrumb={
          <PageBreadcrumb
            items={[
              <PageBreadcrumbItem label="Stiftung" href="/stiftung" />,
              <PageBreadcrumbItem label="Qualität & Transparenz" />,
            ]}
          />
        }
      />
      <section>
        <div className="container mx-auto grid grid-cols-5 gap-8 px-4 pb-16">
          <div className="col-span-5 lg:col-span-2 flex lg:items-start justify-between flex-col lg:flex-row gap-4 items-center">
            <h1 className="font-header text-3xl font-bold">Qualität</h1>
            <Image
              src="/img/GS_2024-26.png"
              width={200}
              height={200}
              alt="Gütesiegel"
              className="w-48 h-48"
            />
          </div>
          <div className="col-span-5 lg:col-span-3">
            <h4 className="font-header text-2xl font-bold mb-5">Gütesiegel</h4>
            <p>
              Unsere Stiftung ist ausgezeichnet mit dem Gütesiegel des
              Bundesverbands Deutscher Stiftungen. Das Siegel wird an
              Bürgerstiftungen verliehen, deren Satzung die{" "}
              <a
                href="https://www.buergerstiftungen.org/de/buergerstiftungen/10-merkmale"
                className="text-emerald-500 font-bold"
              >
                10 Merkmale einer Bürgerstiftung
              </a>{" "}
              erfüllen. Das Siegel hat sich über die Jahre zu einem
              Qualitätsmerkmal entwickelt, das Vertrauen schafft und
              Orientierung bietet. Es ist ein Zeichen für Transparenz und
              Verlässlichkeit.
            </p>
            <h4 className="font-header text-2xl font-bold mb-5 mt-10">
              Auszeichnungen
            </h4>
            <p className="mb-4">Zu unseren Auszeichnungen gehören:</p>
            <ul className="list-disc">
              <li>
                Integrationspreis der Landeshauptstadt Potsdam 2017, Sonderpreis
                der ProPotsdam GmbH für das Projekt{" "}
                <Link
                  href="/aktuelles/projekte/buntes-essen"
                  className="text-emerald-500"
                >
                  Buntes Essen
                </Link>
              </li>
              <li>
                Erster Preis beim Wettbewerb &quot;Gemeinsam für Potsdam&quot; der
                Stadtwerke Potsdam und ProPotsdam GmbH 2019 für das Projekt{" "}
                <Link
                  href="/aktuelles/projekte/potspresso"
                  className="font-bold text-emerald-500"
                >
                  Potspresso
                </Link>
              </li>
              <li>
                Integrationspreis der Landeshauptstadt Potsdam 2020 für das
                Projekt &quot;Angekommen in Potsdam&quot;
              </li>
              <li>
                Erster Platz beim Wettbewerb &quot;Gemeinsam für Potsdam&quot; der
                ProPotsdam GmbH 2021 für das Projekt{" "}
                <Link
                  href="/aktuelles/projekte/inselbuehne"
                  className="font-bold text-emerald-500"
                >
                  Inselbühne
                </Link>
              </li>
              <Image
                src="/img/IMG_8840.jpg"
                width={500}
                height={500}
                className="object-cover h-[30rem] mt-8"
                alt="Bild einer Auszeichnung"
              />
            </ul>
          </div>
        </div>
      </section>
      <section className="py-6 bg-slate-100">
        <div className="container mx-auto grid grid-cols-5 gap-8 px-4 py-16">
          <div className="col-span-5 lg:col-span-2">
            <h1 className="font-header text-3xl font-bold">Transparenz</h1>
            <p className="mt-4">Selbstverpflichtung zur Transparenz</p>
          </div>
          <div className="col-span-5 lg:col-span-3">
            <h4 className="font-header text-2xl font-bold mb-5">
              Name, Sitz, Anschrift und Gründungsjahr
            </h4>
            <p>Bürgerstiftung Potsdam, Eisenhartstraße 18, 14469 Potsdam</p>
            <p>Gründungsjahr: 2011</p>
            <p>Aufsichtsbehörde: Stiftungsaufsicht des Landes Brandenburg</p>
            <h4 className="font-header text-2xl font-bold mb-5 mt-10">
              Vollständige Satzung sowie Angaben zu den Zielen unserer Stiftung
            </h4>
            <p>
              <Link href="/Satzung.pdf" className="text-emerald-500">
                Satzung
              </Link>
            </p>
            <h4 className="font-header text-2xl font-bold mb-5 mt-10">
              Angaben zur Steuerbegünstigung
            </h4>
            <p>
              Die Bürgerstiftung Potsdam ist seit 2011 als gemeinnützige
              Stiftung anerkannt. Spenden und Zustiftungen sind steuerlich
              absetzbar. Der aktuelle Freistellungsbescheid des Finanzamtes
              Potsdam ist gültig bis 2025.
            </p>
            <h4 className="font-header text-2xl font-bold mb-5 mt-10">
              Name und Funktionen wesentlicher Entscheidungsträger
            </h4>
            <p>
              <Link href="/stiftung/gremien" className="text-emerald-500">
                Gremien
              </Link>
            </p>
            <h4 className="font-header text-2xl font-bold mb-5 mt-10">
              Tätigkeitsbericht
            </h4>
            <p>
              <Link
                href="https://portal.potsdamer-buergerstiftung.org/assets/e6a2fab6-9a4a-4cd7-bed2-3199b57764f3"
                className="text-emerald-500"
              >
                Jahresbericht 2022
              </Link>
            </p>
            <h4 className="font-header text-2xl font-bold mb-5 mt-10">
              Personalstruktur
            </h4>
            <p>
              In der Bürgerstiftung Potsdam arbeiten in der Geschäftsstelle 1,075
              Mitarbeiter:innen. In den Projekten
              engagieren sich aktuell etwa 40 Ehrenamtliche.
            </p>
            <h4 className="font-header text-2xl font-bold mb-5 mt-10">
              Angaben zur Mittelherkunft
            </h4>
            <p>
              <Link
                href="https://portal.potsdamer-buergerstiftung.org/assets/e6a2fab6-9a4a-4cd7-bed2-3199b57764f3"
                className="text-emerald-500"
              >
                Jahresbericht 2022
              </Link>
            </p>
            <h4 className="font-header text-2xl font-bold mb-5 mt-10">
              Angaben zur Mittelverwendung
            </h4>
            <p>
              <Link
                href="https://portal.potsdamer-buergerstiftung.org/assets/e6a2fab6-9a4a-4cd7-bed2-3199b57764f3"
                className="text-emerald-500"
              >
                Jahresbericht 2022
              </Link>
            </p>
            <h4 className="font-header text-2xl font-bold mb-5 mt-10">
              Gesellschaftsrechtliche Verbundenheit mit Dritten
            </h4>
            <p>
              Die Bürgerstiftung Potsdam ist eine selbstständige Stiftung des
              bürgerlichen Rechts. Sie ist nicht mit anderen Organisationen
              verbunden.
            </p>
            <h4 className="font-header text-2xl font-bold mb-5 mt-10">
              Namen von juristischen Personen, deren jährliche Zuwendung mehr
              als 10% der gesamten Jahreseinnahmen ausmachen
            </h4>
            <p>
                Die Landeshauptstadt Potsdam ist unser größter Förderer.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
