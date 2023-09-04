import Link from "next/link";
import Image from "@components/Image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "50 Jahre Inselbühne: Das Festival - Inselbühne Potsdam",
  description: "Wir möchten mit euch gemeinsam 50 Jahre Inselbühne feiern. Über 4 Tage hinweg gibt es ein buntes Programm mit Kino, Musik, Theater, Tanz und vielem mehr."
}

export default function HomePage() {
  return (
    <>
      <section className="bg-green-100">
        <div className="container mx-auto grid grid-cols-6 items-center gap-16 px-4 pt-48 pb-12 md:pb-24">
          <div className="col-span-6 max-w-xl md:col-span-3">
            <h1 className="font-serif text-5xl lg:text-6xl">
              <span className="text-amber-500">
                50 Jahre Inselbühne:
                <br />
              </span>{" "}
              Das Festival
            </h1>
            <p className="mt-6 text-lg leading-relaxed">
              Wir möchten mit euch gemeinsam 50 Jahre Inselbühne feiern. Über 4
              Tage hinweg gibt es ein buntes Programm mit Kino, Musik, Theater,
              Tanz und vielem mehr. Die Inselbühne wurde 1974 anlässlich der
              Welt-Jugend-Spiele in Potsdam gestiftet und zu DDR-Zeiten als
              wichtiger Kulturort genutzt. Daran möchten wir mit diesem
              Geburtstags-Jubiläum erinnern und anknüpfen.
            </p>
              <p className="mt-2 font-bold text-lg">
                Kommt und feiert mit uns, damit die Inselbühne lebt und für
                Potsdam und erhalten bleibt!
              </p>
            <Link
              href="/programm"
              className="mt-6 inline-flex rounded-tl-lg rounded-br-lg bg-green-500 px-5 py-3 text-lg font-medium text-white shadow-md transition hover:bg-green-400"
            >
              Zum Programm
            </Link>
          </div>
          <div className="col-span-6 md:col-span-3">
            <Image
              src={`9fbafc25-4d32-4964-9f05-a4ac15234fa1`}
              width={400}
              height={400}
              alt="test"
              className="w-full"
            />
          </div>
        </div>
      </section>
      {/* <section className="bg-gray-50">
                <div className="container mx-auto px-4 pt-12 pb-8 md:pt-16">
                    <div
                        className="flex flex-col justify-between gap-4 md:flex-row md:items-center"
                    >
                        <div>
                            <hr className="h-1 w-16 bg-green-500" />
                            <h1 className="pt-5 font-serif text-3xl md:text-4xl">
                                Was es Neues bei uns gibt
                            </h1>
                            <h4 className="mt-2 text-lg text-gray-500">
                                Und was alles passiert ist
                            </h4>
                        </div>
                        <div>
                            <Link
                                href="/blog"
                                className="text-md rounded-tl-lg rounded-br-lg bg-green-500 px-4 py-2.5 font-medium text-white shadow-md transition hover:bg-green-400"
                            >
                                Alle Beiträge
                            </Link>
                        </div>
                    </div>
                    <div className="mt-12 grid grid-cols-6 gap-8">
                        <div
                            v-for="post in posts"
                            className="col-span-6 md:col-span-3 xl:col-span-2"
                        >
                        </div>
                    </div>
                </div>
            </section> */}
      <section className="bg-gray-50">
        <div className="container mx-auto grid grid-cols-2 items-center gap-16 px-4 pt-16">
          <div className="order-2 col-span-2 lg:order-1 lg:col-span-1">
            <Image
              src={`bca18d03-b2f2-4d7b-b277-c296899cb06f`}
              width={400}
              height={400}
              alt="test"
              className="w-full"
            />
          </div>
          <div className="order-1 col-span-2 lg:order-2 lg:col-span-1">
            <h1 className="font-serif text-4xl">Inselbühne in 2023</h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Da die Verhandlungen mit der Stadt Potsdam über die Zukunft der
              Inselbühne dieses Jahr erst (zum Teil) sehr spät abgeschlossen
              wurden, haben wir uns entschieden, den Veranstaltungsbetrieb wie
              ihr ihn kennt für dieses Jahr auszusetzen. Ob und wie es 2024
              weitergeht, steht noch nicht fest. Wir halten euch aber auf dem
              Laufenden. Wir möchten euch trotzdem in diesem Jahr die
              Möglichkeit geben, die Bühne zu nutzen, sodass ihr ohne großen
              Aufwand und in Eigenregie eure Veranstaltungen organisieren könnt.
              Kontaktiert uns dafür einfach über unsere{" "}
              <Link href="/kontakt" className="underline">
                E-Mail-Adresse.
              </Link>
            </p>
          </div>
        </div>
      </section>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 pt-24 pb-24 text-center md:pt-32 md:pb-32">
          <h4 className="text-sm font-bold uppercase tracking-widest text-green-500">
            Der Festival-Pass
          </h4>
          <h1 className="mt-3 font-serif text-4xl">Hol&apos; dir dein Ticket</h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            Für unser Festival gibt es einen Festival-Pass, mit dem du uns dabei
            unterstützt, den Betrieb der Inselbühne für die Zukunft zu sichern.
            Du erhältst Zugang zu allen Veranstaltungen und bekommst ein kleines
            Andenken von uns, das diese Zeit auch nach dem Festival in
            Erinnerung hält.
          </p>
          <Link
            href="https://www.eventbrite.de/e/50-jahre-inselbuhne-tickets-705908199427"
            className="text-md mt-4 inline-flex rounded-tl-lg rounded-br-lg bg-green-500 px-4 py-2.5 font-medium text-white shadow-md transition hover:bg-green-400"
          >
            Festival-Pass erwerben
          </Link>
        </div>
      </section>
    </>
  );
}
