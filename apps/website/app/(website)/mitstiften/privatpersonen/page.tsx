import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import Link from "next/link";

export default function IndividualsPage() {
  return (
    <>
      <PageTitle
        title="Stiften als Privatperson"
        description="Erfahre, wie Du als Privatperson mitstiften kannst"
        breadcrumb={
          <PageBreadcrumb
            items={[
              <PageBreadcrumbItem label="Mitstiften" href="/mitstiften" />,
              <PageBreadcrumbItem label="Privatpersonen" />,
            ]}
          />
        }
      />
      <section>
        <div className="container mx-auto grid grid-cols-5 gap-8 px-4 pb-16">
          <div className="col-span-5 lg:col-span-2">
            <h1 className="font-header text-3xl font-bold">Freundeskreis</h1>
            <p className="mt-4">
              Mitstiften und Teil der Gemeinschaft werden: Der Freundeskreis der
              Potsdamer Bürgerstiftung
            </p>
          </div>
          <div className="col-span-5 lg:col-span-3">
            <p>
              Der Freundeskreis ist eine{" "}
              <b>Gemeinschaft aus Menschen wie dir</b>, die <b>regelmäßig</b>{" "}
              Geld spenden und damit unsere gemeinnützige Arbeit für Potsdam
              ermöglichen. Mit deiner Unterstützung machen wir gemeinsam Potsdam
              noch besser und <b>stärken</b> das{" "}
              <b>Wohl unserer Gemeinschaft</b>. Es ist einfach, dem
              Freundeskreis beizutreten: Du entscheidest einfach selbst, wie oft
              du Geld spenden möchtest - <b>monatlich</b>,{" "}
              <b>vierteljährlich</b> oder <b>jährlich</b>. Ganz wie es dir
              passt! Durch deine <b>regelmäßige Spende</b> ermöglichen wir
              langfristige Projekte und eine <b>nachhaltige Förderung</b>.
            </p>
            <Link href="/mitstiften/privatpersonen/spenden" className="mt-4 bg-emerald-100 text-slate-800 hover:bg-emerald-200 text-md font-header inline-flex rounded-md py-1.5 px-4 font-bold transition ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-75">Jetzt spenden</Link>
          </div>
        </div>
      </section>
      <section className="py-6 bg-slate-100">
        <div className="container mx-auto grid grid-cols-5 gap-8 px-4 py-16">
          <div className="col-span-5 lg:col-span-2">
            <h1 className="font-header text-3xl font-bold">Patenschaft</h1>
            <p className="mt-4"></p>
          </div>
          <div className="col-span-5 lg:col-span-3">
            <p>
              Die Übernahme einer Patenschaft ist unkompliziert. Du kannst ganz
              einfach eine Spende in Höhe von mindestens 500€ tätigen und uns
              mitteilen, dass du Pate werden möchtest. Wir sind dankbar für dein
              Engagement und werden dafür sorgen, dass deine Spende gezielt
              eingesetzt wird, um positive Veränderungen in unserer Stadt zu
              bewirken. Wir werden dein Engagement öffentlich anerkennen und
              unsere Plattform nutzen, um die Wirkung deiner
              Patenschaft zu kommunizieren.
            </p>
          </div>
        </div>
      </section>
      <section className="py-6">
        <div className="container mx-auto grid grid-cols-5 gap-8 px-4 py-16">
          <div className="col-span-5 lg:col-span-2">
            <h1 className="font-header text-3xl font-bold">Zustiftung</h1>
            <p className="mt-4">
              
            </p>
          </div>
          <div className="col-span-5 lg:col-span-3">
            <p></p>
          </div>
        </div>
      </section>
    </>
  );
}
