import EventCard from "@components/EventCard";
import PageTitle from "@components/PageTitle";
import { Metadata } from "next";

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
            summary: "(Doku DDR, 1973 zu den Weltfestspielen der Jugend und Studenten)",
            localImage: true,
        },
        {
            title: "Inselsingen: Sing mit dem Frauenchor der Volkssolidarität und Cantamus",
            date: new Date("2023-09-22T15:00:00"),
            image: "frauenchor-vs.jpg",
            localImage: true,
        },
        {
            title: "Fanfaroni",
            date: new Date("2023-09-22T19:00:00"),
            summary: "Von Balkan bis Latin",
            image: "Fanfaroni_3.jpg",
            localImage: true,
        },
        {
            title: "Silent-Disko mit Sofa Queen und Karatie Cat",
            date: new Date("2023-09-22T20:30:00"),
            image: "9fbafc25-4d32-4964-9f05-a4ac15234fa1",
            summary: "Funk & Elektro"
        },
        {
            title: "Kinderyoga mit Martina Laube",
            date: new Date("2023-09-23T09:30:00"),
            summary: "Empfohlen für Kinder zwischen 3 und 5 Jahren",
            image: "59af0f0d-cb9e-4b08-aada-d3af40ee5781",
        },
        {
            title: "Faultier, ein langsames Zirkusstück“",
            date: new Date("2023-09-23T11:00:00"),
            summary: "Für Kinder (Luftartistik-Duo Zinnia und Flo)",
            image: "9fbafc25-4d32-4964-9f05-a4ac15234fa1",
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
            summary: "45 + 3 Jahre Engerling - Die Jubiläumstour 2023",
        },
        {
            title: "Kinderyoga mit Martina Laube",
            date: new Date("2023-09-24T09:30:00"),
            summary: "Empfohlen für Kinder zwischen 6 und 10 Jahren",
            image: "59af0f0d-cb9e-4b08-aada-d3af40ee5781",
        },
        {
            title: "Upcycling-Instrumentenbau für Kinder",
            date: new Date("2023-09-24T11:00:00"),
            summary: "Mit der Kammerakademie Potsdam",
            image: "9fbafc25-4d32-4964-9f05-a4ac15234fa1",
        },
        {
            title: "Fette Katze",
            date: new Date("2023-09-24T15:00:00"),
            image: "image.jpg",
            localImage: true,
            summary: "Eine Bigband der besonderen Art"
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
            <section className="bg-gray-50">
                <div
                    className="container mx-auto flex flex-col space-y-10 px-4 pb-32 text-center"
                >
                    {events.map((event) => (
                        <EventCard title={event.title} start={event.date} summary={event.summary} image={event.image} localImage={event.localImage} />
                    ))}
                </div>
            </section>
        </>
    );
}