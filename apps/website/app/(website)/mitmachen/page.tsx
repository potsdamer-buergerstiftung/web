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
              geleistet, sowohl im Vorstand als auch in den Projekten. Das schätzen wir sehr und möchten unsere Freiwilligen
              bei ihrem Engagement bestmöglich unterstützen. Wir organisieren regelmäßig{" "}
              <b>Mitmach-Treffs</b> um andere Ehrenamtliche kennenzulernen und
              sich auszutauschen. Wir bieten Schulungen und Weiterbildungen an
              und versichern unsere Ehrenamtlichen.
            </p>
          </div>
        </div>
      </section>
      <section className="py-6">
        <div className="container mx-auto grid grid-cols-5 gap-8 px-4 py-16">
          <div className="col-span-5 lg:col-span-2">
            <h1 className="font-header text-3xl font-bold">
              Finde dein Ehrenamt
            </h1>
            <p className="mt-4">
              Unsere Projekte und Initiativen freuen sich auf deine
              Unterstützung
            </p>
          </div>
          <div className="col-span-5 lg:col-span-3">
            <p>
              Als Bürgerstiftung sind wir auch bestrebt, die{" "}
              <b>Anerkennung und Wertschätzung </b>für Ehrenamtliche in unserer
              Gemeinschaft <b>zu fördern</b>. Wir organisieren regelmäßig
              Veranstaltungen, wir nennen sie <b>Mitmach-Treffs</b>, um die
              Leistungen der Freiwilligen zu würdigen, ihr Engagement öffentlich
              sichtbar zu machen und über Angebote, sich zu engagieren, zu
              informieren. Dies dient als <b>Motivation für andere</b>, sich
              ebenfalls <b>einzubringen und aktiv zu werden</b>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
