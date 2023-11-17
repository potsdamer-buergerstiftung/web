import Image from "next/image";
import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import Disclosure from "./Disclosure";
import ParallaxImage from "@components/ParallaxImage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wir über uns - Potsdamer Bürgerstiftung",
};

export default function AboutPage() {
  const priorities = [
    {
      subTitle: "Nachhaltigkeit",
      title: "Nachhaltig engagieren und handeln",
      assetId: "2f152755-94d6-472e-9102-be17106c63c0",
      description: `Wir verschaffen Nachhaltigkeit und Müllvermeidung in Potsdam mehr Aufmerksamkeit und leisten unseren Beitrag zu Umweltschutz, Stadtgrün und Klima.`,
      color: "text-emerald-600",
    },
    {
      subTitle: "Kultur",
      title: "Kultur und Teilhabe fördern",
      assetId: "72baf604-4397-4f22-9ac7-195df8b1a591",
      description: `Freier Zugang zu Kultur und Unterhaltung ist wichtiger denn je. Wir ermöglichen Kunstschaffenen sich in Potsdam zu präsentieren und allen Menschen, Teil des Publikums zu sein.`,
      color: "text-red-600",
    },
    {
      subTitle: "Begegnung & Toleranz",
      title: "Menschen zusammenbringen",
      assetId: "db74ab6f-0e47-415d-8686-a3a6afa2b6a1",
      description: `Zusammenhalt, Solidarität und Toleranz entsteht durch Begegnung. Wir organisieren Zusammentreffen aller Art und vereinfachen Begegnung durch gemeinsame Interessen. Wir alle sind Potsdam.`,
      color: "text-blue-600",
    },
    {
      subTitle: "Bildung & Jugend",
      title: "Zukünftige Generationen stärken",
      assetId: "16033de6-d1a2-4280-bef7-3851aad0ed6d",
      description: `Alle Kinder in Potsdam sollten die gleichen Chancen haben. Kinder und Jugendliche sind die Potsdamer Bürgerschaft von morgen: Damit sie stark, glücklich und erfolgreich in die Zukunft sehen und gehen können.`,
      color: "text-yellow-600",
    },
  ];

  return (
    <>
      <PageTitle
        title="Die Stiftung"
        description={<p>Wer wir sind und was wir tun</p>}
        breadcrumb={
          <PageBreadcrumb items={[<PageBreadcrumbItem label="Stiftung" />]} />
        }
      />
      <section className="pb-20 pt-20 bg-slate-100">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 lg:grid-cols-2">
          <div>
            <h1 className="font-header mt-2 text-4xl font-bold">
              Ehrenamtlich, engagiert, miteinander
            </h1>
          </div>
          <div>
            <p>
              Wir, die Potsdamer Bürgerstiftung, vernetzen Gleichgesinnte,
              versammeln engagierte Menschen, bieten Unterstützung als Plattform
              für Ehrenamt und möchten es den Menschen in Potsdam leichter
              machen, das <b>Gemeinwohl zu stärken</b>, Gemeinschaftsgefühl zu
              erleben, ein <b>herzliches Miteinander</b> und eine starke Zukunft
              für Potsdam zu stiften.
            </p>
          </div>
        </div>
      </section>
      <section>
        <ParallaxImage />
      </section>
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {priorities.map((priority) => (
              <div className="container mx-auto flex h-full flex-col">
                <div>
                  <h1 className={`text-sm font-semibold uppercase text-gray-600 mb-2 ${priority.color}`}>
                    {priority.subTitle}
                  </h1>
                  <h2 className="font-header text-2xl font-bold mb-4">
                    {priority.title}
                  </h2>
                </div>
                <p className="">{priority.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="pt-8 md:pt-16">
        <div className="container mx-auto px-4">
          <h2 className="font-header text-4xl font-bold md:-mb-4 xl:-mb-10 max-w-xl">
            Gemeinsam Gutes tun und stiften
          </h2>
        </div>
        <div className="grid grid-cols-6">
          <div className="col-span-6 md:col-span-2 xl:col-span-3">
            <Image
              src="https://portal.potsdamer-buergerstiftung.org/assets/7d0a648b-c484-4e4e-9d69-f0230f7278bd"
              quality="50"
              width="1800"
              height="800"
              className="w-full h-[20rem] object-cover mt-10 md:mt-24"
              alt="Freiwillige auf der Inselbühne"
            />
          </div>
          <div className="bg-slate-50 px-4 py-16 md:px-16 lg:pr-24 col-span-6 md:col-span-4 xl:col-span-3">
            <h2 className="font-header text-3xl font-bold mb-8 max-w-md">
              Wie unsere Stiftung aufgebaut ist und arbeitet
            </h2>
            <Disclosure />
          </div>
        </div>
      </section>
      {/* <section className="mt-16 pb-16">
                <div className="container mx-auto grid grid-cols-1 gap-8 px-4 lg:grid-cols-2">
                    <div>
                        <h4 className="text-sm font-semibold uppercase text-gray-600">
                            Förderer und Partner
                        </h4>
                        <h1 className="font-header mt-2 text-4xl font-bold max-w-xl">
                            Wer uns und wen wir unterstützen
                        </h1>
                    </div>
                    <div>
                        <p>

                        </p>
                    </div>
                </div>
            </section> */}
    </>
  );
}
