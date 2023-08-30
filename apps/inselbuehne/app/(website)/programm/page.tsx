import EventCard from "@components/EventCard";
import PageTitle from "@components/PageTitle";

export const metadata: Metadata = {
    title: "Programm - Inselbühne Potsdam",
}

export default function ProgramPage() {
    const events = [
        {
            title: "Open-Air-Kino (In Planung)",
            date: new Date("2023-09-21T19:30:00"),
            summary: "Für diesen Abend versuchen wir, die Inselbühne wie früher als Kino zu nutzen. Wir planen, an diesem Abend einen Film zu zeigen, den wir noch bekannt geben werden.",
            image: "9fbafc25-4d32-4964-9f05-a4ac15234fa1",
        },
        {
            title: "Zum Mitsingen -  „Frauenchor der Volkssolidarität und Cantamos“",
            date: new Date("2023-09-22T15:00:00"),
            image: "9fbafc25-4d32-4964-9f05-a4ac15234fa1",
        },
        {
            title: "Fette Katze",
            date: new Date("2023-09-22T17:30:00"),
            image: "9fbafc25-4d32-4964-9f05-a4ac15234fa1",
        },
        {
            title: "Fanfaroni ",
            date: new Date("2023-09-22T19:00:00"),
            image: "9fbafc25-4d32-4964-9f05-a4ac15234fa1",
        },
        {
            title: "Silent-Disko mit Sofa Queen und Karatie Cat",
            date: new Date("2023-09-22T20:30:00"),
            image: "9fbafc25-4d32-4964-9f05-a4ac15234fa1",
        },
        {
            title: "Kinderyoga mit Martina Laube",
            date: new Date("2023-09-23T09:30:00"),
            summary: "Empfohlen für Kinder zwischen 6 und 10",
            image: "59af0f0d-cb9e-4b08-aada-d3af40ee5781",
        },
        {
            title: "„Faultier, ein langsames Zirkusstück“ für Kinder mit dem Luftartistik-Duo Zinnia und Flo",
            date: new Date("2023-09-23T11:00:00"),
            image: "9fbafc25-4d32-4964-9f05-a4ac15234fa1",
        },
        {
            title: "Sweet Confusion",
            date: new Date("2023-09-23T18:00:00"),
            image: "9653645b-29e4-4773-89e4-625b85d20ce2",
        },
        {
            title: "Engerling",
            date: new Date("2023-09-23T19:30:00"),
            image: "9446f463-7bb9-47cf-86e8-827994c29788",
        },
        {
            title: "Kinderyoga mit Martina Laube",
            date: new Date("2023-09-24T09:30:00"),
            summary: "Empfohlen für Kinder zwischen 6 und 10",
            image: "59af0f0d-cb9e-4b08-aada-d3af40ee5781",
        },
        {
            title: "Upcycling-Instrumentenbau für Kinder mit der Kammerakademie Potsdam",
            date: new Date("2023-09-24T11:00:00"),
            image: "9fbafc25-4d32-4964-9f05-a4ac15234fa1",
        },
        {
            title: "Irie Member",
            date: new Date("2023-09-24T17:00:00"),
            image: "9fbafc25-4d32-4964-9f05-a4ac15234fa1",
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
                        <EventCard title={event.title} start={event.date} summary={event.summary} image={event.image} />
                    ))}
                </div>
            </section>
        </>
    );
}