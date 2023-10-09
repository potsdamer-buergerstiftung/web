import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import Image from "next/image";

export default function HonoraryPage() {
  return (
    <>
      <PageTitle
        title="Ehrenamt"
        description="Erfahre, wie du dich bei uns ehrenamtlich einbringen kannst"
        breadcrumb={
          <PageBreadcrumb items={[<PageBreadcrumbItem label="Mitmachen" />]} />
        }
      />
      <section>
        <div className="container mx-auto grid grid-cols-5 gap-8 px-4">
          <div className="col-span-5 lg:col-span-2">
            <h1 className="font-header text-3xl font-bold">
              Engagiere dich für Potsdam
            </h1>
            <p className="mt-4">
              Menschen zusammenbringen und Zusammenhalt stärken
            </p>
          </div>
          <div className="col-span-5 lg:col-span-3">
            <p>
              Wir sind davon überzeugt, dass Ehrenamt nicht nur den
              <b> Empfängern zugutekommt</b>, sondern auch den Freiwilligen
              selbst: <b>ehrenamtliches Engagement macht glücklich.</b> Durch
              freiwillige Tätigkeiten kannst du neue{" "}
              <b>Fähigkeiten entwickeln</b>, wertvolle Erfahrungen sammeln und{" "}
              <b>nette Menschen kennenlernen</b>. Ehrenamt bietet die
              Möglichkeit, Teil einer Gemeinschaft zu werden, die sich für
              dieselben Werte und Ziele in Potsdam einsetzt.
            </p>
          </div>
        </div>
      </section>
      <section className="relative">
        <Image
          src="/img/IMG_9438.jpg"
          quality="50"
          width="1800"
          height="800"
          className="w-full h-[20rem] object-cover mt-10 md:mt-24"
          alt="Freiwillige auf der Inselbühne"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-emerald-700/70" />
        <div className="container mx-auto grid grid-cols-5 gap-8 px-4 py-16 absolute top-0 right-0 left-0 bottom-0">
          <div className="col-span-5 lg:col-span-2">
            <h1 className="font-header text-3xl font-bold text-white">
              Wie wir dich unterstützen
            </h1>
            <p className="mt-4 text-white">
              Angebote für Ehrenamtliche und Freiwillige
            </p>
          </div>
          <div className="col-span-5 lg:col-span-3">
            <p className="text-white">
              Der größte Teil der Arbeit in der Bürgerstiftung wird ehrenamtlich
              geleistet, sowohl im Vorstand als auch in den Projekten. Das
              schätzen wir sehr und möchten unsere Freiwilligen bei ihrem
              Engagement bestmöglich unterstützen. Wir organisieren regelmäßig{" "}
              <b>Mitmach-Treffs</b> um andere Ehrenamtliche kennenzulernen und
              sich auszutauschen. Wir bieten Schulungen und Weiterbildungen an
              und versichern unsere Ehrenamtlichen.
            </p>
          </div>
        </div>
      </section>
      <section className="pt-6 pb-16">
        <div className="container mx-auto grid grid-cols-3 gap-8 px-4 py-16">
          <div className="col-span-3 lg:col-span-1">
            <h1 className="font-header text-3xl font-bold mb-4">Ich will...</h1>
            <p>
              aktiv sein, neue Leute kennenlernen, Potsdam mitgestalten, raus
              aus meiner Bubble, Verantwortung übernehmen, etwas sinnvolles tun,
              Fahrrad fahren, Menschen eine Freude machen, tolle Projekte
              begleiten, meine Ideen einbringen
            </p>
            <h1 className="font-header text-3xl font-bold mt-4">
              ...euch kennenlernen!
            </h1>
          </div>
          <div className="col-span-3 lg:col-span-1">
            <h1 className="font-header text-3xl font-bold mb-4">Ich bin...</h1>
            <p>
              lieber hinter den Kulissen, eher Rampensau, kommunikativ,
              schüchtern, extrovertiert, introvertiert, voller Tatendrang, eher
              Couch-Potato, impulsiv, überlegt, strukturiert, chaotisch,
              Kopfmensch, Bauchmensch, handwerklich mehr oder weniger begabt,
            </p>
            <h1 className="font-header text-3xl font-bold mt-4">
              ...eine Bereicherung!
            </h1>
          </div>
          <div className="col-span-3 lg:col-span-1">
            <h1 className="font-header text-3xl font-bold mb-4">Ich kann...</h1>
            <p>
              gut mit Zahlen umgehen, gärtnern, programmieren,
              texten, reden, verkaufen, organisieren, ordnen, handwerken, gut
              allein oder im Team arbeiten, Untersützung gewinnen
            </p>
            <h1 className="font-header text-3xl font-bold mt-4">
              ...mitmachen!
            </h1>
          </div>
        </div>
        <div className="text-center px-4 max-w-4xl mx-auto font-bold text-lg">
          Egal wer du bist, egal was du kannst: Wir freuen uns darauf, dich
          kennenzulernen. Bei uns gibt es immer viel zu tun und wir finden
          sicher einen Platz für dich im Team.
        </div>
      </section>
    </>
  );
}
