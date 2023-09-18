import EventCard from "@components/EventCard";
import PageTitle from "@components/PageTitle";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Programm - Inselbühne Potsdam",
    description: "Das Programm für das 50 Jahre Inselbühne Festival"
}

export default function ProgramPage() {
    const events = [
        {
            title: "Eröffnung mit Talk, Sekt und Suppe",
            date: new Date("2023-09-21T18:00:00"),
            summary: "Wir eröffnen das Festival mit einem Talk zur Geschichte der Freilichtbühne mit Zeitzeug:innen. Dazu gibt es Sekt und Suppe.",
            image: "IMG_8652.JPG",
            localImage: true,
        },
        {
            title: "Inselkino: “Die Taube auf dem Dach” (DEFA-Film, 1973)",
            date: new Date("2023-09-21T19:30:00"),
            image: "78755_68de7288deeb1cc50fd9085690c21ea1_1280re0.webp",
            localImage: true,
        },
        {
            title: "Ausklang mit Ausschnitten aus “Wer die Erde liebt”",
            date: new Date("2023-09-21T21:00:00"),
            image: "wdel.jpg",
            summary: "Dokumentarfilm DDR, 1973 zu den Weltfestspielen der Jugend und Studenten",
            localImage: true,
        },
        {
            title: "Inselsingen: Sing mit dem Frauenchor der Volkssolidarität und dem Freizeitchor Cantamus",
            date: new Date("2023-09-22T15:00:00"),
            image: "0515ec27-f35c-4eca-b427-3a667189ac90.JPG",
            localImage: true,
            summary: "Singen macht Spaß, singen tut gut. Das ist das Motto des Frauenchors unter dem Dach der Volkssolidarität Potsdam mit der engagierten Chorleiterin Gabriele Tschache. Unzählige Lieder sind in den Jahren erklungen. Wir pflegen ein großes Repertoire Volksmusik verschiedener Epochen bis hin zu klassischem Liedgut. Der Chor blickt zurück über 30 Jahre gemeinsames Singen, gemeinsame Erlebnisse, viele Konzerte und Chorauftritte. Das sind u.a. Frühlings-, Herbst- und Weihnachtskonzerte in der Sternkirche, im Oberlin, Auftritte in Senioreneinrichtungen, die jahrelange Mitgestaltung der Potsdamer Seniorenwoche. Nicht unerwähnt soll auch der Auftritt auf der diesjährigen Landesgartenschau in Beelitz bleiben. Besondere Freude und Begeisterung wecken gemeinsame Darbietungen mit anderen Chören, wie dem Spatzenchor der Singakademie."
        },
        {
            title: "Inselsingen: Sing mit dem Frauenchor der Volkssolidarität und dem Freizeitchor Cantamus",
            date: new Date("2023-09-22T15:00:00"),
            image: "fccm.jpg",
            localImage: true,
            summary: "Der Freizeitchor Cantamus Potsdam wurde 2009 von dem Musikpädagogen Karl-Heinz Drews (1928-2019) gegründet, der dem Chor bis 2013 vorstand. Seit 2014 steht der Chor unter der Leitung von Andreas Flämig. Die Chormitglieder mit einem Durchschnittsalter von ca. 75 Jahren treffen sich während der Schulzeit jeden Dienstag von 09.45 bis 11.45 Uhr zur Probe im „Treffpunkt Freizeit Potsdam“. "
        },
        {
            title: "Fanfaroni",
            date: new Date("2023-09-22T19:00:00"),
            summary: "Pikante Musikhappen der ganzen Welt von Balkan bis Latin in die Pfanne gehauen - mal voll drauf - mal genial daneben. Das Ergebnis ist scharf wie Peperoni! Bei der 15-köpfigen Berliner Fanfare werden große Töne gespuckt, denn 'Fanfaron' bedeutet Großmaul und der Name ist Programm: Die bunte Truppe mit Blechbläsern, Drums, Holzbläsern und Akkordeon bringt jeden Topf zum Überkochen - wo auch immer Hunger nach tanzbarer Brassmukke herrscht.",
            image: "Fanfaroni_3.jpg",
            localImage: true,
        },
        {
            title: "Silent-Disko mit Sofa Queen und Karatie Cat",
            date: new Date("2023-09-22T20:30:00"),
            image: "kk.jpg",
            summary: "Karatie Cat ist eine DJane aus Potsdam. Melodischer Sound und freche Rhythmen gehören zu ihrem Repertoire der elektronischen Tanzmusik im Technogenre. Dieser lädt zum Singen, Tanzen aber auch zum Entspannen ein. Einfach zum genießen.",
            localImage: true,
        },
        {
            title: "Silent-Disko mit Sofa Queen und Karatie Cat",
            date: new Date("2023-09-22T20:30:00"),
            image: "sofaquee.jpg",
            summary: "Sofa Queen gilt spätestens seit ihrer legendären 'Funkstelle'-Reihe im Spartacus als Grande Dame der Potsdamer Funk-Szene. Funk präsentiert sie dabei nicht nur als ein Genre, sondern als eine ganz besondere musikalische Qualität. Der Name ihrer über sieben Jahre etablierten Reihe 'Can You Dig It?' ist Programm: Überall sucht sie nach jener speziellen Groovigkeit und findet sie neben dem Funk in vielen verwandten Stilrichtungen - von Soul, Disco, Jazz und R&B bis Hip Hop, Trip Hop, Beats und Breaks.",
            localImage: true,
        },
        {
            title: "Kinderyoga mit Martina Laube",
            date: new Date("2023-09-23T09:30:00"),
            summary: "Empfohlen für Kinder zwischen 3 und 5 Jahren - Kinderyoga ist so schön bunt und so herrlich lebendig! Ein kunterbuntes Potpourri...das ist Rainbow Kids Yoga - eine magische Geschichte & Reise von Anfang bis Ende. Beim Kinderyoga geht es eben NICHT um die perfekte Yogapose - es ist das Ganzheitliche. Kinderyoga ist wirklich ganz anders als Yoga für uns Erwachsene. Es ist eine andere eigene Welt, die unglaublich die Phantasie der Kinder beflügelt.",
            image: "59af0f0d-cb9e-4b08-aada-d3af40ee5781",
        },
        {
            title: "Faultier, ein langsames Zirkusstück“",
            date: new Date("2023-09-23T11:00:00"),
            summary: "Wir sind Meister der Meditation, des Energiesparens und der Luftakrobatik. Es ist nicht leicht, im Regenwald zu überleben, aber wenn es jemand schafft, dann sind es diese Faultiere. Macht euch bereit für die langsamste Zirkusshow, die ihr je gesehen habt. Neben Unterhaltung erhält das Publikum wertvolle Bildungsinhalte zu Biodiversität und Umweltschutz. Zeitgenössischer Zirkus mit Luftartistik, Text und Musik 30 Minuten Für Erwachsene und Kinder ab 4",
            image: "Faultier_hiphop.jpg",
            localImage: true,
        },
        {
            title: "Sweet Confusion",
            date: new Date("2023-09-23T18:00:00"),
            image: "9653645b-29e4-4773-89e4-625b85d20ce2",
            summary: "Steffi Breiting lebt für das Singen. Gesegnet mit einer Stimme, in der Sehnsucht und auch Kraft zu Hause sind und die den Vergleich mit anderen großen Sängerinnen wie Etta James oder Amy Winehouse nicht scheuen muß, bringt sie zusammen mit ihrer Band Musik auf die Bühne, die verzaubert und bewegt und uns an den Soundtrack von Love, Peace und Understanding erinnert."
        },
        {
            title: "Engerling",
            date: new Date("2023-09-23T19:30:00"),
            image: "9446f463-7bb9-47cf-86e8-827994c29788",
            summary: "45 + 3 Jahre Engerling - Die Jubiläumstour 2023: Seit 48 Jahren feilt die Ost-Formation beharrlich an ihrem eigenen Stil mit intelligenten Texten im Grenzbereich zwischen Deutschrock und eben doch Blues und hat sich damit ein treues, aber ganz und gar nicht 'ostalgisches' Publikum geschaffen.",
        },
        {
            title: "Kinderyoga mit Martina Laube",
            date: new Date("2023-09-24T09:30:00"),
            image: "59af0f0d-cb9e-4b08-aada-d3af40ee5781",
            summary: "Empfohlen für Kinder zwischen 6 und 10 Jahren - Kinderyoga ist so schön bunt und so herrlich lebendig! Ein kunterbuntes Potpourri...das ist Rainbow Kids Yoga - eine magische Geschichte & Reise von Anfang bis Ende. Beim Kinderyoga geht es eben NICHT um die perfekte Yogapose - es ist das Ganzheitliche. Kinderyoga ist wirklich ganz anders als Yoga für uns Erwachsene. Es ist eine andere eigene Welt, die unglaublich die Phantasie der Kinder beflügelt."
        },
        {
            title: "Upcycling-Instrumentenbau für Kinder",
            date: new Date("2023-09-24T11:00:00"),
            image: "9fbafc25-4d32-4964-9f05-a4ac15234fa1",
            summary: "Aus „Müll“ Instrumente machen? Das geht! Gemeinsames Basteln und Musizieren auf selbstgemachten Instrumenten Folgenden Müll könnt ihr vorab sammeln und bei uns in Instrumente verwandeln (einen kleinen Vorrat haben wir vor Ort): Kronkorken (abgespült), Filmdosen o.ä. kleine Dosen (verschließbar), PVC-Flaschen, CDs oder CD-Roms, Leere Klorollen, Ü-Eier (nur die Kapseln…), Knöpfe, Resonanzkörper wie alte Tassen, Blumentöpfe (ohne Loch!) o. ä. Empfohlen für Familien mit Kinder ab 4 Jahren"
        },
        {
            title: "Fette Katze",
            date: new Date("2023-09-24T15:00:00"),
            image: "fk.jpg",
            localImage: true,
            summary: "„Fette Katze“ heisst die Jazzband der Musikschule Klangkunst in Potsdam. Das Ensemble existiert seit 2005 mit teils wechselnder Besetzung. Aktuell spielen 15 Musikbegeisterte aus Potsdam und Umgebung unter der Leitung von Jazz-Bassist Holger Scheidt. Swing, lateinamerikanische Rhythmen, Rock ́n ́Roll, Rhythm and Blues stehen im Mittelpunkt der wöchentlichen Proben im Treffpunkt Freizeit. Freude und Spaß am gemeinsamen Musizieren stehen dabei im Vordergrund. Das motivierende musikalische Miteinander ist Credo der Band. Jedes Bandmitglied trägt auf ihre/seine Weise zur Musik und zur musikalischen Entwicklung der Gruppe bei."
        },
        {
            title: "Irie Member",
            date: new Date("2023-09-24T17:00:00"),
            image: "irie.JPG",
            localImage: true,
            summary: "'Irie' ist ein Ausdruck aus dem Jamaikanischen Patois und bedeutet „angenehm“ oder „glückselig“. Für uns symbolisiert es die Harmonie und Freude, die Reggae und Dub in die Herzen der Menschen bringt. Als „Members“ dieser Bewegung teilen wir diesen Spirit mit jedem von Euch."
        },
        {
            title: "Karaoke",
            date: new Date("2023-09-24T18:30:00"),
            image: "6704e09a-c56a-44dc-8c91-5e43fefee08f",
        }
    ]
    return (
        <>
            <PageTitle title="Programm" heading="50 Jahre Inselbühne" />

                <Image src="/img/LHPgefördert_Logo_blau.jpg" height={400} width={200} alt="Landeshauptstadt Potsdam" className="mx-auto px-4 py-8" />
            <section className="bg-gray-50">
                <div
                    className="container mx-auto flex flex-col space-y-10 px-4 pb-32 text-center"
                >
                    {events.map((event) => (
                        <EventCard title={event.title} start={new Date(event.date.setHours(event.date.getHours() - 2))} summary={event.summary} image={event.image} localImage={event.localImage} />
                    ))}
                </div>
            </section>
        </>
    );
}