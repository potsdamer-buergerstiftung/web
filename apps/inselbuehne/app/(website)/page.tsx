import Link from "next/link";
import Image from "@components/Image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Die 5. Saison steht vor der Tür! - Inselbühne Potsdam",
  description: "Am 8. Juni um 11 Uhr geht's los mit dem Landespolizeiorchester Brandenburg, das weitere Programm folgt hier bald."
}

export default function HomePage() {
  return (
    <>
      <section className="bg-green-100">
        <div className="container mx-auto grid grid-cols-6 items-center gap-16 px-4 pt-48 pb-12 md:pb-24">
          <div className="col-span-6 max-w-xl md:col-span-3">
            <h1 className="font-serif text-5xl lg:text-6xl">
              Dein Sommer - <br />
              <span className="text-green-500">
                Deine Bühne!
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed">
              Konzerte, Kino, Theater, Disco, Karaoke und mehr.
            </p>
            <p className="mt-2 font-bold text-lg">
              Feier&apos; den 5. Sommer auf der Freundschaftsinsel bei mehr als 60 Open-Air-Events.
            </p>
            <Link
              href="/veranstaltungen"
              className="mt-6 inline-flex rounded-tl-lg rounded-br-lg bg-green-500 px-5 py-3 text-lg font-medium text-white shadow-md hover:bg-green-400"
            >
              Zu den Veranstaltungen
            </Link>
          </div>
          <div className="col-span-6 md:col-span-3">
            <Image
              src={`6bf21b3a-0dff-4651-8c65-8b29f835c9cf`}
              width={400}
              height={500}
              alt="test"
              className="w-full h-full object-right-top"
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
            <h1 className="font-serif text-4xl">Herzlich Willkommen zur f&uuml;nften Saison auf der Inselb&uuml;hne!</h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Spannende Veranstaltungen erwarten Dich auf unserer offenen, nicht-kommerziellen B&uuml;hne: ein Liedermacher- und ein Jazz-Festival, Gastspiele der Theater Company Potsdam, beliebte Mitmach-Formate wie Inselsingen oder Karaoke und erstmals gibt&apos;s After-Work-Clubbing bei der &bdquo;Guten Mische&ldquo;. Und das (fast) alles bei freiem Eintritt - gegen eine angemessene Spende, damit es mit der Inselb&uuml;hne auch weitergehen kann.
              <br />
              Und wenn Du Lust hast, Dich aktiv bei uns einzubringen, bis Du im Ehrenamts-Team stets hoch willkommen!
            </p>
          </div>
        </div>
      </section>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 pt-24 pb-24 text-center md:pt-32 md:pb-32">
          <h4 className="text-sm font-bold uppercase tracking-widest text-green-500">
            Die Inselbühne
          </h4>
          <h1 className="mt-3 font-serif text-4xl">Wir suchen dich</h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            Sowohl für den Kulturbetrieb, als auch für die Sanierung brauchen wir Menschen, die Zeit, Know-how, Material und Geld spenden.
          </p>
          <div className="flex flex-row justify-center gap-x-4">
            <Link
              href="https://www.potsdamer-buergerstiftung.org/mitmachen"
              className="text-md mt-4 inline-flex rounded-tl-lg rounded-br-lg bg-green-500 px-4 py-2.5 font-medium text-white shadow-md transition hover:bg-green-400"
            >
              Mitmachen
            </Link>
            <Link
              href="https://www.potsdamer-buergerstiftung.org/mitstiften/privatpersonen/spenden"
              className="text-md mt-4 inline-flex rounded-tl-lg rounded-br-lg bg-green-500 px-4 py-2.5 font-medium text-white shadow-md transition hover:bg-green-400"
            >
              Mitstiften
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
