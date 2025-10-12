import PageTitle from "@components/PageTitle";
import Image from "next/image";

export default function ThankYouPage() {
  return (
    <>
      <PageTitle title="Dankeschön!" />

      <div className="container mx-auto px-4 grid gap-10 lg:grid-cols-2 my-10 items-center">
        <p>
          Durch deine Spende hast du dazu beigetragen, dass die Potsdamer
          Bürgerstiftung ihre wertvolle Arbeit fortsetzen kann. Mit deinem
          Engagement unterstützen wir verschiedene lokale Projekte und
          Initiativen, die das Leben der Menschen in Potsdam nachhaltig
          verbessern. Dein Beitrag wird dazu beitragen, Bildungsprogramme zu
          fördern, sozial benachteiligte Menschen zu unterstützen und kulturelle
          Aktivitäten für alle zugänglich zu machen. Es ist dank großzügiger
          Menschen wie dir, dass wir diese positive Veränderung in unserer Stadt
          bewirken können.
        </p>
        <Image
          src="/img/thanks.svg"
          height="200"
          width="400"
          alt="Dankeschön Bild"
          className="h-80 place-self-center"
        />
      </div>
    </>
  );
}
