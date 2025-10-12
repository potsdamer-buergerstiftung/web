import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import Link from "next/link";

export default function IndividualsPage() {
  return (
    <>
      <PageTitle
        title="Mitstiften"
        description={
          <p className="max-w-4xl">
            Erfahre, wie du persönlich mitstiften kannst. Wenn du uns als
            Unternehmen unterstützen möchtest kontaktiere uns gerne, um über
            Sponsorings, Kooperationen, Sachspenden und mehr zu erfahren.
          </p>
        }
        breadcrumb={
          <PageBreadcrumb items={[<PageBreadcrumbItem label="Mitstiften" />]} />
        }
      />
      <section>
        <div className="container mx-auto grid grid-cols-5 gap-8 px-4 pb-16">
          <div className="col-span-5 lg:col-span-2">
            <h1 className="font-header text-3xl font-bold">Einmalige Spende</h1>
            <p className="mt-4">Einmalig, zu Anlässen oder als Geschenk</p>
          </div>
          <div className="col-span-5 lg:col-span-3">
            <p>
              Wir freuen uns über jede Spende, die unsere Arbeit für Potsdam
              unterstützt. Jeder Euro hilft. Ein besonderer Anlass steht an?
              Wünsch dir zum Geburtstag, deiner Hochzeit oder einem Sommerfest
              eine Spende für dein Herzensprojekt bei uns. Immer mehr Menschen
              wünschen sich im Trauerfall statt Kränzen und Blumen eine Spende
              für das Gemeinwohl. Wir helfen dir gerne dabei, deinen Gästen die
              Spende so einfach wie möglich zu machen. Du kannst auch selber
              eine Spende verschenken und damit doppelt Freude stiften.
            </p>
            <Link
              href="/mitstiften/privatpersonen/spenden"
              className="mt-8 bg-emerald-100 text-slate-800 hover:bg-emerald-200 text-md font-header inline-flex rounded-md py-1.5 px-4 font-bold transition ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-75"
            >
              Jetzt spenden
            </Link>
          </div>
        </div>
      </section>
      <section className="py-6 bg-slate-100">
        <div className="container mx-auto grid grid-cols-5 gap-8 px-4 py-16">
          <div className="col-span-5 lg:col-span-2">
            <h1 className="font-header text-3xl font-bold">Freundeskreis</h1>
            <p className="mt-4">Kleiner Beitrag, große Freundschaft</p>
          </div>
          <div className="col-span-5 lg:col-span-3">
            <p>
              Der Freundeskreis ist eine{" "}
              <b>Gemeinschaft aus Menschen wie dir</b>, die <b>regelmäßig</b>{" "}
              einen kleinen Betrag spenden und damit unsere gemeinnützige Arbeit
              für Potsdam ermöglichen. Mit deiner Unterstützung machen wir
              gemeinsam Potsdam noch besser und <b>stärken</b> das{" "}
              <b>Wohl unserer Gemeinschaft</b>. Es ist einfach, dem
              Freundeskreis beizutreten: Du entscheidest einfach selbst, wie oft
              du Geld spenden möchtest - <b>monatlich</b>,{" "}
              <b>vierteljährlich</b> oder <b>jährlich</b>. Ganz wie es dir
              passt! Durch deine <b>regelmäßige Spende</b> ermöglichen wir
              langfristige Projekte und eine <b>nachhaltige Förderung</b>.
            </p>
            <Link
              href="/mitstiften/privatpersonen/spenden"
              className="mt-8 bg-emerald-100 text-slate-800 hover:bg-emerald-200 text-md font-header inline-flex rounded-md py-1.5 px-4 font-bold transition ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-75"
            >
              Jetzt beitreten
            </Link>
          </div>
        </div>
      </section>
      <section className="py-6">
        <div className="container mx-auto grid grid-cols-5 gap-8 px-4 py-16">
          <div className="col-span-5 lg:col-span-2">
            <h1 className="font-header text-3xl font-bold">Patenschaft</h1>
            <p className="mt-4">Projektarbeit ermöglichen und fördern</p>
          </div>
          <div className="col-span-5 lg:col-span-3">
            <p>
              Die Übernahme einer Patenschaft ist <b>unkompliziert</b>. Du
              kannst ganz einfach eine Spende in Höhe von mindestens 250€
              tätigen und uns
              <b>mitteilen</b>, dass du <b>Pate werden möchtest</b>. Wir sind
              dankbar für dein Engagement und werden dafür sorgen, dass deine
              Spende gezielt eingesetzt wird, um positive Veränderungen in
              unserer Stadt zu bewirken. Wir werden nach Wunsch dein Engagement{" "}
              <b>öffentlich anerkennen</b> und unsere Plattform nutzen, um die{" "}
              <b>Wirkung</b> deiner Patenschaft <b>zu kommunizieren</b>.
            </p>
          </div>
        </div>
      </section>
      <section className="py-6 bg-slate-100">
        <div className="container mx-auto grid grid-cols-5 gap-8 px-4 py-16">
          <div className="col-span-5 lg:col-span-2">
            <h1 className="font-header text-3xl font-bold">Zustiftung</h1>
            <p className="mt-4">
              Stiftungskapital aufbauen und Zukunft sichern
            </p>
          </div>
          <div className="col-span-5 lg:col-span-3">
            <p>
              Hilf mit unser Stiftungskapital aufzubauen und so aus den
              wachsenen Erträgen unsere Stiftungsarbeit für Potsdam und seine
              zukünftigen Generationen dauerhaft zu sichern. Ab 500€ kannst du
              eine Zustiftung tätigen. Deine Zustiftung macht die Potsdamer
              Bürgerstiftung unabhängiger von schwankendem Spendenaufkommen und
              öffentlichen Förderungen.
            </p>
          </div>
        </div>
      </section>
      <section className="py-6">
        <div className="container mx-auto grid grid-cols-5 gap-8 px-4 py-16">
          <div className="col-span-5 lg:col-span-2">
            <h1 className="font-header text-3xl font-bold">Vererben</h1>
            <p className="mt-4">Gutes tun und Gutes weitergeben</p>
          </div>
          <div className="col-span-5 lg:col-span-3">
            <p>
              Du kannst die Potsdamer Bürgerstiftung in deinem Testament
              berücksichtigen. Mit einer Erbschaft oder einem Vermächtnis kannst
              du die Arbeit der Potsdamer Bürgerstiftung langfristig
              unterstützen und so die Zukunft unserer Stadt mitgestalten. Wir
              beraten dich gerne zu deinen Möglichkeiten.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
