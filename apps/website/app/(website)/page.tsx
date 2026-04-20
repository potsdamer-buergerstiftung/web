import { readItems } from "@directus/sdk";
import { Link } from "@/components/ui/link";
import Image from "next/image";
import ProjectGrid from "./ProjectGrid";
import { Suspense } from "react";
import ProjectGridLoading from "./ProjectGridLoading";
import { Metadata } from "next";
import directus from "@/app/(website)/directus";
import {
  ArrowLongRightIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { ArticleCard } from "@/components/article";
import { Heading } from "@/components/ui/heading";
import {
  PageSection,
  PageSectionContent,
  PageSectionDescription,
  PageSectionHeader,
  PageSectionSubTitle,
  PageSectionTitle,
} from "@/components/page-section";

export const revalidate = 120;

async function getProjects() {
  const res = await directus.request(
    readItems("projects", {
      fields: ["id", "status", "title", "image", "sub_title"],
      filter: {
        status: { _in: ["inprogress", "recurring"] },
      },
      sort: ["sort"],
      limit: 5,
    }),
  );

  return res;
}

async function getPosts() {
  const res = await directus.request(
    readItems("posts", {
      fields: ["title", "date", "id", "image", "tags", "project.title", "slug"],
      limit: 4,
      sort: ["-date"],
    }),
  );
  return res;
}

async function getEvents() {
  const res = await directus.request(
    readItems("events", {
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
    }),
  );
  return res;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("de", {
    year: "numeric",
    day: "numeric",
    month: "long",
  });
}

export const metadata: Metadata = {
  title: "Potsdamer Bürgerstiftung - Brücken bauen. Menschen verbinden.",
};

function HeroSection() {
  return (
    <section
      className="relative isolate overflow-hidden px-4 py-2 md:px-8 pb-24 pt-32 md:pb-28 md:pt-40 lg:pb-32 lg:pt-44"
      data-home-hero
    >
      <div className="absolute inset-0 -z-20 bg-linear-to-br from-primary/20 via-background to-background" />
      <div className="absolute -left-10 top-24 -z-10 size-64 rounded-full bg-primary/20 blur-3xl md:size-80" />
      <div className="absolute -right-32 top-10 -z-10 size-96 rounded-full bg-accent blur-3xl md:size-[34rem]" />

      <div className="mx-auto grid items-start gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(23rem,0.88fr)] lg:gap-14">
        <div className="max-w-5xl lg:pr-6" data-home-hero-copy>
          <Heading size="lg">
            15 Jahre Bürgerstiftung
            <br />
            &mdash; und wir alle tragen sie.
          </Heading>
          <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-muted-foreground md:text-[1.15rem]">
            <b>Seit 2011</b> trägt die Bürgerstiftung Projekte, Menschen und
            Ideen in Potsdam. Mach mit, komm in unseren Freundeskreis! Mit 100
            Euro jährlich trägst du das Engagement mit. Dein Beitrag wirkt!
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/mitstiften/freundeskreis" size="lg">
              Freundeskreis beitreten
              <ArrowLongRightIcon />
            </Link>
            <Link href="/mitmachen" variant="light" size="lg">
              Mitmachen
              <ArrowLongRightIcon />
            </Link>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <div
              className="rounded-[1.6rem] border border-white/80 bg-white/75 p-5 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur"
              data-home-hero-card
            >
              <p className="text-sm text-slate-500">Bestehen</p>
              <p className="mt-3 font-header text-3xl font-bold tracking-[-0.04em] text-slate-950">
                15 Jahre
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                lokal verankert, gemeinnützig und schnell handlungsfähig.
              </p>
            </div>
            <div
              className="rounded-[1.6rem] border border-white/80 bg-white/75 p-5 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur"
              data-home-hero-card
            >
              <p className="text-sm text-slate-500">Freundeskreis</p>
              <p className="mt-3 font-header text-3xl font-bold tracking-[-0.04em] text-slate-950">
                100 Euro
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                jährlich reichen aus, damit neue Vorhaben direkt starten können.
              </p>
            </div>
            <div
              className="rounded-[1.6rem] border border-white/80 bg-white/75 p-5 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur"
              data-home-hero-card
            >
              <p className="text-sm text-slate-500">Wirkung</p>
              <p className="mt-3 font-header text-3xl font-bold tracking-[-0.04em] text-slate-950">
                Kultur bis Klima
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Begegnung, Jugend und Teilhabe bilden den Rahmen unserer Arbeit.
              </p>
            </div>
          </div>
        </div>

        <div className="relative" data-home-hero-media>
          <div className="grid gap-4">
            <div
              className="group relative min-h-[22rem] overflow-hidden rounded-2xl border border-border bg-slate-900 shadow-2xl md:min-h-108"
              data-home-hero-panel
            >
              <Image
                src="/img/b6431451-1fdc-45ac-ab79-c42c3a0b7627.jpeg"
                alt="Engagement im öffentlichen Raum"
                fill
                className="object-cover transition duration-700 ease-out group-hover:scale-105"
                sizes="(min-width: 1024px) 34vw, 100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08)_0%,rgba(15,23,42,0.72)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                <p className="text-sm text-white/75">
                  Brücken bauen. Menschen verbinden.
                </p>
                <p className="mt-3 max-w-md text-pretty font-header text-3xl font-semibold tracking-[-0.04em] md:text-[2.2rem]">
                  30+ Projekte begleitet und getragen.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                className="flex min-h-[10rem] flex-col justify-between rounded-2xl bg-primary p-6 text-stone-50 shadow-2xl"
                data-home-hero-panel
              >
                <p className="text-sm text-stone-300">Freundeskreis</p>
                <p className="mt-3 max-w-[16ch] text-pretty font-header text-[1.75rem] font-bold leading-[1.03] tracking-[-0.04em]">
                  Mit einem festen Beitrag wird aus Sympathie echte
                  Verlässlichkeit.
                </p>
                <Link
                  href="/mitstiften/freundeskreis"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary/80"
                >
                  Jetzt beitreten
                  <ArrowLongRightIcon className="size-4" />
                </Link>
              </div>
              <div
                className="flex min-h-[10rem] flex-col justify-between rounded-2xl bg-background p-6 shadow-[0_24px_60px_-38px_rgba(15,23,42,0.45)]"
                data-home-hero-panel
              >
                <p className="text-sm text-primary">Freundeskreis</p>
                <p className="mt-3 max-w-[16ch] text-pretty font-header text-[1.75rem] font-bold leading-[1.03] tracking-[-0.04em]">
                  Mit einer einmaligen Spende dein Lieblingsprojekt
                  unterstützen.
                </p>
                <Link
                  href="/mitstiften/freundeskreis"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary/80"
                >
                  Jetzt beitreten
                  <ArrowLongRightIcon className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const projects = getProjects();

  return (
    <PageSection grid="vertical">
      <PageSectionHeader>
        <PageSectionTitle size="md">Projekte, die Potsdam bewegen</PageSectionTitle>
        <PageSectionDescription>
          <p>
            Verfolge die Entwicklung unserer Projekte, die dank Deiner
            Beiträge und Deiner Unterstützung möglich wurden.
          </p>
          <Link
            href="/aktuelles/projekte"
            variant="link"
            className="mt-6 px-0 text-base font-semibold text-primary"
          >
            Alle Projekte ansehen
            <ArrowLongRightIcon />
          </Link>
        </PageSectionDescription>
      </PageSectionHeader>
      <PageSectionContent>
        <Suspense fallback={<ProjectGridLoading />}>
          <ProjectGrid promise={projects} />
        </Suspense>
      </PageSectionContent>
    </PageSection>
  );
}

function PrioritiesSection() {
  const priorities = [
    {
      subTitle: "Nachhaltigkeit",
      title: "Nachhaltig engagieren und handeln",
      assetId: "2f152755-94d6-472e-9102-be17106c63c0",
      description: `Wir verschaffen Nachhaltigkeit und Müllvermeidung in Potsdam mehr Aufmerksamkeit und leisten unseren Beitrag zu Umweltschutz, Stadtgrün und Klima.`,
      color: "from-emerald-200/55 to-emerald-50/10",
    },
    {
      subTitle: "Kultur",
      title: "Kultur und Teilhabe fördern",
      assetId: "72baf604-4397-4f22-9ac7-195df8b1a591",
      description: `Freier Zugang zu Kultur und Unterhaltung ist wichtiger denn je. Wir ermöglichen Kunstschaffenen sich in Potsdam zu präsentieren und allen Menschen, Teil des Publikums zu sein.`,
      color: "from-red-200/55 to-red-50/10",
    },
    {
      subTitle: "Begegnung & Toleranz",
      title: "Menschen zusammenbringen",
      assetId: "db74ab6f-0e47-415d-8686-a3a6afa2b6a1",
      description: `Zusammenhalt, Solidarität und Toleranz entsteht durch Begegnung. Wir organisieren Zusammentreffen aller Art und vereinfachen Begegnung durch gemeinsame Interessen. Wir alle sind Potsdam.`,
      color: "from-blue-200/55 to-blue-50/10",
    },
    {
      subTitle: "Bildung & Jugend",
      title: "Zukünftige Generationen stärken",
      assetId: "16033de6-d1a2-4280-bef7-3851aad0ed6d",
      description: `Alle Kinder in Potsdam sollten die gleichen Chancen haben. Kinder und Jugendliche sind die Potsdamer Bürgerschaft von morgen: Damit sie stark, glücklich und erfolgreich in die Zukunft sehen und gehen können, möchten wir sie beteiligen und fördern.`,
      color: "from-yellow-200/55 to-yellow-50/10",
    },
  ];

  return (
    <PageSection grid="1/2" sticky>
      <PageSectionHeader>
        <PageSectionSubTitle>Lebe deine Stadt</PageSectionSubTitle>
        <PageSectionTitle size="md">
          Ehrenamtlich, engagiert, miteinander
        </PageSectionTitle>
        <PageSectionDescription>
          Alle sind eingeladen, sich mit Ideen, Zeit und Geld für eine{" "}
          <b>positive Entwicklung Potsdams einzubringen</b>. Wir vernetzen
          Gleichgesinnte, versammeln engagierte Menschen, bieten Unterstützung
          als Plattform für Ehrenamt und möchten es den Menschen in Potsdam
          leichter machen, das <b>Gemeinwohl zu stärken</b>, Gemeinschaftsgefühl
          zu erleben, ein <b>herzliches Miteinander</b> und eine starke Zukunft
          für Potsdam zu stiften. Mit unserer Arbeit konnten wir seit unserer
          Gründung <b>erste Schwerpunkte setzen</b>.
        </PageSectionDescription>
      </PageSectionHeader>
      <PageSectionContent>
        <div className="grid grid-cols-24 grid-flow-dense gap-5 md:gap-6">
          {priorities.map((priority, index) => (
            <article
              key={priority.title}
              className={[
                "col-span-24 rounded-2xl border border-border/80 bg-card/92 p-6 shadow-2xl backdrop-blur-xl md:p-8",
                index === 0 ? "md:col-span-13 md:min-h-76" : "",
                index === 1 ? "md:col-span-11 md:min-h-76" : "",
                index === 2 ? "md:col-span-11 md:min-h-76" : "",
                index === 3 ? "md:col-span-13 md:min-h-76" : "",
              ].join(" ")}
            >
              <div
                className={`mb-8 h-28 rounded-2xl bg-linear-to-br ${priority.color}`}
              />
              <h3 className="text-[2.3rem] leading-[0.9] font-header font-semibold tracking-[-0.04em] text-secondary">
                {priority.title}
              </h3>
              <p className="mt-4 max-w-120 text-base leading-7 text-muted-foreground md:text-lg">
                {priority.description}
              </p>
            </article>
          ))}
        </div>
      </PageSectionContent>
    </PageSection>
  );

  /* return (
    <section className="py-8 px-4 pb-8 md:px-6 md:pb-10 lg:px-8 lg:pb-12">
      <div className="mx-auto grid max-w-368 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-sm uppercase font-medium tracking-[0.14em] text-primary/90">
            Lebe deine Stadt
          </p>
          <h2 className="mt-4 max-w-lg text-[clamp(3rem,5vw,5.25rem)] leading-[0.9] tracking-[-0.05em] font-semibold font-header text-secondary">
            Ehrenamtlich, engagiert, miteinander
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Alle sind eingeladen, sich mit Ideen, Zeit und Geld für eine{" "}
            <b>positive Entwicklung Potsdams einzubringen</b>. Wir vernetzen
            Gleichgesinnte, versammeln engagierte Menschen, bieten Unterstützung
            als Plattform für Ehrenamt und möchten es den Menschen in Potsdam
            leichter machen, das <b>Gemeinwohl zu stärken</b>,
            Gemeinschaftsgefühl zu erleben, ein <b>herzliches Miteinander</b>{" "}
            und eine starke Zukunft für Potsdam zu stiften. Mit unserer Arbeit
            konnten wir seit unserer Gründung <b>erste Schwerpunkte setzen</b>.
          </p>
        </div>

        <div className="grid grid-cols-24 grid-flow-dense gap-5 md:gap-6">
          {priorities.map((priority, index) => (
            <article
              key={priority.title}
              className={[
                "col-span-12 rounded-2xl border border-border/80 bg-card/92 p-6 shadow-[0_18px_60px_-36px_rgba(58,44,28,0.32)] backdrop-blur-xl md:p-8",
                index === 0 ? "lg:col-span-13 lg:min-h-76" : "",
                index === 1 ? "lg:col-span-11 lg:min-h-76" : "",
                index === 2 ? "lg:col-span-11 lg:min-h-76" : "",
                index === 3 ? "lg:col-span-13 lg:min-h-76" : "",
              ].join(" ")}
            >
              <div
                className={`mb-8 h-28 rounded-2xl bg-linear-to-br ${priority.color}`}
              />
              <h3 className="text-[2.3rem] leading-[0.9] font-header font-semibold tracking-[-0.04em] text-secondary">
                {priority.title}
              </h3>
              <p className="mt-4 max-w-120 text-base leading-7 text-muted-foreground md:text-lg">
                {priority.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  ); */
}

async function NewsSection() {
  const posts = await getPosts();
  const events = await getEvents();

  return (
    <section className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-376 rounded-[2.8rem] bg-slate-950 px-6 py-8 text-stone-50 shadow-[0_30px_100px_-52px_rgba(15,23,42,0.8)] md:px-8 md:py-10 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-stone-400">
              Veranstaltungen und Einblicke
            </p>
            <h2 className="mt-4 max-w-md text-balance font-header text-[clamp(2.4rem,4vw,4rem)] leading-[0.95] font-bold tracking-[-0.05em]">
              Deine Möglichkeit, Dich zu engagieren.
            </h2>
            <p className="mt-5 max-w-md text-pretty text-base leading-7 text-stone-300">
              Veranstaltungen holen Menschen zusammen, Beiträge zeigen, was aus
              Unterstützung geworden ist. Beides gehört für uns zusammen.
            </p>

            <div className="mt-8 space-y-4">
              {events.map((event) => {
                const href =
                  event.registration_needed && event.external_ticket_url
                    ? event.external_ticket_url
                    : `/aktuelles/veranstaltungen/${event.id}`;

                return (
                  <Link
                    key={event.id}
                    href={href}
                    className="group grid gap-4 h-40 rounded-[1.8rem] border border-white/10 bg-white/6 p-4 transition hover:bg-white/9 md:grid-cols-[7.5rem_1fr]"
                  >
                    <div className="relative h-32 overflow-hidden rounded-[1.4rem] md:h-full">
                      <Image
                        src={`https://portal.potsdamer-buergerstiftung.org/assets/${event.image}`}
                        alt={event.name}
                        fill
                        className="object-cover transition duration-700 ease-out group-hover:scale-105"
                        sizes="(min-width: 768px) 12vw, 100vw"
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="inline-flex items-center gap-2 text-xs text-stone-400">
                          <CalendarDaysIcon className="size-4" />
                          {formatDate(event.start)}
                        </div>
                        <h3 className="mt-3 text-pretty font-header text-2xl font-bold tracking-[-0.04em] text-white">
                          {event.name}
                        </h3>
                      </div>
                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                        Termin ansehen
                        <ArrowLongRightIcon className="size-4" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <ArticleCard
                key={post.id}
                author={post.author}
                date={new Date(post.date)}
                imageId={post.image}
                title={post.title}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PrioritiesSection />
      <ProjectsSection />
      <Suspense>
        <NewsSection />
      </Suspense>
    </>
  );
}
