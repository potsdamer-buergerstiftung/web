import { Directus } from "@directus/sdk";
import Link from "next/link";
import Image from "next/image";
import ProjectGrid from "./ProjectGrid";
import { Suspense } from "react";
import ProjectGridLoading from "./ProjectGridLoading";
import PostGrid from "./PostGrid";
import EventGrid from "./EventGrid";
import { Metadata } from "next";
import { wixClient } from "./wix";
import InstaFeed from "@components/InstaFeed";

export const revalidate = 120;

/* async function getProjects() {
  const directus = new Directus("https://portal.potsdamer-buergerstiftung.org");
  const res = await directus.items<any, any>("projects").readByQuery({
    limit: 5,
  });
  return res.data;
} */

async function getProjects() {
  const projects = await wixClient.items.query("Projekte").limit(7).find();
  
  return projects.items;
}

async function getPosts() {
  const directus = new Directus("https://portal.potsdamer-buergerstiftung.org");
  const res = await directus.items<any, any>("posts").readByQuery({
    fields: ["title", "date", "id", "image", "tags", "project.title", "slug"],
    limit: 4,
    sort: ["-date"],
  });
  return res.data;
}

async function getEvents() {
  const directus = new Directus("https://portal.potsdamer-buergerstiftung.org");
  const res = await directus.items<any, any>("events").readByQuery({
    fields: [
      "name",
      "start",
      "id",
      "image",
      "external_ticket_url",
      "registration_needed",
    ],
    limit: 3,
    sort: ["start"],
    filter: { start: { _gte: new Date().toISOString() } },
  });
  return res.data;
}

export const metadata: Metadata = {
  title: "Potsdamer Bürgerstiftung - Brücken bauen. Menschen verbinden.",
};

export default async function HomePage() {
  const posts = getPosts();
  const projects = getProjects();
  const events = getEvents();

  const priorities = [
    {
      subTitle: "Nachhaltigkeit",
      title: "Nachhaltig engagieren und handeln",
      assetId: "2f152755-94d6-472e-9102-be17106c63c0",
      description: `Wir verschaffen Nachhaltigkeit und Müllvermeidung in Potsdam mehr Aufmerksamkeit und leisten unseren Beitrag zu Umweltschutz, Stadtgrün und Klima.`,
      color: "text-emerald-200",
    },
    {
      subTitle: "Kultur",
      title: "Kultur und Teilhabe fördern",
      assetId: "72baf604-4397-4f22-9ac7-195df8b1a591",
      description: `Freier Zugang zu Kultur und Unterhaltung ist wichtiger denn je. Wir ermöglichen Kunstschaffenen sich in Potsdam zu präsentieren und allen Menschen, Teil des Publikums zu sein.`,
      color: "text-red-200",
    },
    {
      subTitle: "Begegnung & Toleranz",
      title: "Menschen zusammenbringen",
      assetId: "db74ab6f-0e47-415d-8686-a3a6afa2b6a1",
      description: `Zusammenhalt, Solidarität und Toleranz entsteht durch Begegnung. Wir organisieren Zusammentreffen aller Art und vereinfachen Begegnung durch gemeinsame Interessen. Wir alle sind Potsdam.`,
      color: "text-blue-200",
    },
    {
      subTitle: "Bildung & Jugend",
      title: "Zukünftige Generationen stärken",
      assetId: "16033de6-d1a2-4280-bef7-3851aad0ed6d",
      description: `Alle Kinder in Potsdam sollten die gleichen Chancen haben. Kinder und Jugendliche sind die Potsdamer Bürgerschaft von morgen: Damit sie stark, glücklich und erfolgreich in die Zukunft sehen und gehen können, möchten wir sie beteiligen und fördern.`,
      color: "text-yellow-200",
    },
  ];

  return (
    <>
      <div className="container mx-auto px-4 pt-32 md:pt-44">
        <h1 className="font-header text-5xl font-bold text-slate-800 md:text-6xl lg:text-7xl">
          Brücken bauen,
          <br />
          Menschen verbinden
        </h1>
        <p className="mt-8 text-slate-800 md:text-lg">
          Wir sind die Potsdamer Bürgerstiftung und fördern als Mitmach-Stiftung
          ehrenamtliches Engagement.
        </p>
        <p className="font-bold md:text-lg text-emerald-500">
          Lass uns gemeinsam unsere schöne Stadt noch l(i)ebenswerter machen.
        </p>
        <Link
          href="/mitmachen"
          className="text-md font-header mt-8 inline-flex items-center rounded-md bg-green-100 py-1.5 px-4 font-bold transition ease-in-out hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          Jetzt engagieren
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
      <div className="container mx-auto px-4 pt-10 pb-16 md:pt-20">
        <Suspense fallback={<ProjectGridLoading />}>
          {/* @ts-ignore-error */}
          <ProjectGrid promise={projects} />
        </Suspense>
        <Link
          href="/aktuelles/projekte"
          className="text-md font-header mt-12 inline-flex items-center rounded-md bg-green-100 py-1.5 px-4 font-bold transition ease-in-out hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          Alle Projekte
        </Link>
      </div>
      <section className="bg-slate-100 py-16 lg:py-24">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 lg:grid-cols-2">
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-600">
              Lebe deine Stadt
            </h4>
            <h1 className="font-header mt-2 text-4xl font-bold">
              Ehrenamtlich, engagiert, miteinander
            </h1>
          </div>
          <div>
            <p>
              Alle sind eingeladen, sich mit Ideen, Zeit und Geld für eine{" "}
              <b>positive Entwicklung Potsdams einzubringen</b>. Wir vernetzen
              Gleichgesinnte, versammeln engagierte Menschen, bieten
              Unterstützung als Plattform für Ehrenamt und möchten es den
              Menschen in Potsdam leichter machen, das{" "}
              <b>Gemeinwohl zu stärken</b>, Gemeinschaftsgefühl zu erleben, ein{" "}
              <b>herzliches Miteinander</b> und eine starke Zukunft für Potsdam
              zu stiften. Mit unserer Arbeit konnten wir seit unserer Gründung{" "}
              <b>erste Schwerpunkte setzen</b>.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="grid grid-cols-12 overflow-hidden">
          <div className="col-span-12 grid grid-cols-12">
            {priorities.map((priority, index) => (
              <div
                className="relative col-span-12 md:col-span-6 xl:col-span-3 md:width-52"
                key={index}
              >
                <div className="absolute z-[-1] h-full w-full">
                  <div className="absolute bottom-0 top-0 left-0 right-0 bg-slate-800 opacity-60" />
                  <Image
                    src={`https://portal.potsdamer-buergerstiftung.org/assets/${priority.assetId}`}
                    className="h-full w-full object-cover"
                    width={500}
                    height={500}
                    alt="Bild"
                  />
                </div>
                <div className="container mx-auto flex h-full flex-col justify-between px-4 py-16 md:p-8 lg:max-w-none xl:p-10">
                  <div className="mb-20 md:mb-36">
                    <h1
                      className={`mb-1 text-sm font-semibold uppercase ${priority.color}`}
                    >
                      {priority.subTitle}
                    </h1>
                    <h2
                      className={`font-header text-3xl font-bold text-slate-100`}
                    >
                      {priority.title}
                    </h2>
                  </div>
                  <div>
                    <p className="text-md leading-6 text-slate-100">
                      {priority.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="relative col-span-12 md:col-span-12 lg:col-span-12 bg-slate-100">
            <div className="absolute z-[-1] h-full w-full">
              <div className="absolute bottom-0 top-0 left-0 right-0" />
            </div>
            <div className="container mx-auto grid grid-cols-6 gap-8 h-full flex-col justify-end px-4 py-16 md:px-8 md:py-16 lg:px-4">
              <div className="col-span-6">
                <h4 className="text-sm font-semibold uppercase text-gray-600">
                  Nimm teil
                </h4>
                <h1 className="font-header mt-2 text-4xl font-bold">
                  Kommende Veranstaltungen
                </h1>
              </div>
              <Suspense>
                {/* @ts-ignore-error */}
                <EventGrid promise={events} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container mx-auto grid grid-cols-6 gap-8 px-4">
          <div className="col-span-6 lg:col-span-4">
            <h4 className="text-sm font-semibold uppercase text-gray-600">
              Von unserem Instagram
            </h4>
            <h1 className="font-header mt-2 text-4xl font-bold">
              Aktuelles & Neues von uns
            </h1>
            <p className="mt-4 max-w-2xl">
              Verfolge die Entwicklung unserer Projekte, die dank Deiner
              großzügigen Beiträge und Deiner Unterstützung möglich wurden.
            </p>
            <Link
              href="/aktuelles/blog"
              className="text-md font-header mt-12 mb-4 inline-flex items-center rounded-md bg-green-100 py-1.5 px-4 font-bold transition ease-in-out hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
            >
              Alle Beiträge
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
          <InstaFeed />
        </div>
      </section>
    </>
  );
}
