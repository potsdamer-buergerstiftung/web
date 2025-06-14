import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import TeamMemberCard from "@components/TeamMemberCard";
import { wixClient } from "app/(website)/wix";
import { Metadata } from "next";

const officeTeam = [
    {
        title: "Geschäftsstelle",
        name: "Antonia von Schierstaedt",
        image: "a7432c2c-9f7c-40a3-b55f-fa2bb80c268b",
    },
    {
        title: "Projektkoordination",
        name: "Kristin Gebur",
        image: "f73f2050-2fb8-4f25-8267-8c94a4409ffd",
    },
    {
        title: "IT-Administration",
        name: "Noël Sigmunczyk",
        image: "0a4b6efa-b481-494e-a8e7-0de88784837b",
    },
    {
        title: "Öffentlichkeitsarbeit",
        name: "Elisa Neubert",
        image: "3d99d1b7-5cd0-4d57-8887-ea647d462455",
    },
    {
        title: "Kommunikationsdesign",
        name: "Birka Pannicke",
        image: "118e4754-5cee-495c-ac43-caec99be44b2",
    }
];

const boardMembers = [
    {
        title: "Vorsitzende",
        name: "Marie-Luise Glahr",
        image: "b4071f42-e17c-46a3-8513-57e8bab20c77",
    },
    {
        title: "Stellv. Vorsitzender",
        name: "Felix Müller-Stüler",
        image: "886a54e6-0b48-485c-a8f1-b627c92fc0f6",
    },
    {
        title: "Vorstandsmitglied",
        name: "Elisabeth Diemer",
        image: "aac8177f-6fad-4643-b438-45b95340d2e0",
    },
    {
        title: "Vorstandsmitglied",
        name: "Rosa Toledano",
        image: "4e66f129-b45d-4908-b98a-a336a0403c42",
    },
];

const boardOfTrustees = [
    {
        title: "Vorsitzende",
        name: "Beatrix Raeithel",
        image: "526b8a7c-9786-4336-a31d-d3f8080bdcc0",
    },
    {
        title: "Stellv. Vorsitzender",
        name: "Dr. Gerd Harms",
        image: "8e5e97f8-cf14-49f5-ab88-5eb30a21b7c1",
    },
    {
        title: "Stiftungsratmitglied",
        name: "Andrea Buttenberg",
        image: "2171fd38-df59-4756-8960-6d8da7da2ebd",
    },
    {
        title: "Stiftungsratmitglied",
        name: "Johannes Baron von der Osten-Sacken",
        image: "6e906a64-da74-4a0e-9f32-92430d6b9dcd",
    },
    {
        title: "Stiftungsratmitglied",
        name: "Christian Miethe",
        image: "36d72824-b1b0-4cbf-a018-8a7edadb4732"
    }
];

const boardOfCurators = [
    {
        title: "Vorsitzender",
        name: "Jann Jakobs",
        image: "d71169be-cc28-4608-bc33-dc9d125c108d",
    },
    {
        title: "Stellv. Vorsitzende",
        name: "Dr. Angela Hoffmann",
    },
    {
        title: "Kuratoriumsmitglied",
        name: "Katja Dietrich-Kröck",
        image: "f3ac1ccd-1309-4750-8e2d-e3097a0ea5d1",
    },
    {
        title: "Kuratoriumsmitglied",
        name: "Prof. Dr. Sabine Hering",
    },
    {
        title: "Kuratoriumsmitglied",
        name: "Daniel Beermann",
        image: "d1b30e68-5d56-4d4e-8e3e-f7588fc64818",
    },
    {
        title: "Kuratoriumsmitglied",
        name: "Prof. Dr. Oliver Günther",
    },
    {
        title: "Kuratoriumsmitglied",
        name: "Prof. Dr. Christoph Martin Vogtherr",
    },
    {
        title: "Kuratoriumsmitglied",
        name: "Bettina Jahnke",
        image: "4a302aba-1370-4426-8141-7d4d87172a39",
    },
    {
        title: "Kuratoriumsmitglied",
        name: "Jala Al Jazeiri",
    },
    {
        title: "Kuratoriumsmitglied",
        name: "Heiko Sill",
        image: "53d7b6fe-66c0-4b3e-bd15-46a231b354ed",
    },
];

async function getTeam() {
    const categories = (await wixClient.items.query("Gremien").ascending("_manualSort_511e0c09-9471-4ff4-bd55-0beb3135c2da").find()).items;

    const members = (await wixClient.items.query("Team").ascending("_manualSort_74f73ecd-5fc3-419a-b893-8f87eda0a854").find()).items;

    const mapped = categories.map((c) => {
        return {
            members: members.filter((d) => d.gremium == c._id),
            ...c
        } as any
    })

    return mapped
}

export const metadata: Metadata = {
    title: "Unsere Gremien / Team - Potsdamer Bürgerstiftung",
}

export const revalidate = 90;

export default async function TeamPage() {
    const categories = await getTeam();
    return (
        <>
            <PageTitle title="Gremien / Team" description={
                <p className="max-w-3xl">
                    Die Bürgerstiftung Potsdam wird durch den Vorstand vertreten.
                    Insgesamt untersteht die Bürgerstiftung Potsdam der Stiftungsaufsicht
                    des Landes Brandenburg im Innenministerium, die über die Einhaltung
                    des Satzungszwecks wachen. Außerdem wird die Stiftung jährlich vom
                    Finanzamt Potsdam geprüft.
                </p>
            } breadcrumb={<PageBreadcrumb items={[<PageBreadcrumbItem label="Stiftung" href="/stiftung" />, <PageBreadcrumbItem label="Gremien" />]} />} />
            {categories.map((category) => (
                <>
                    <section className="pb-16 pt-8">
                        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 lg:grid-cols-2">
                            <div>
                                <h4 className="text-sm font-semibold uppercase text-gray-600">
                                    Unser Team
                                </h4>
                                <h1 className="font-header mt-2 text-4xl font-bold">{category.title}</h1>
                            </div>
                            <div>
                                <p>
                                    {category.beschreibung}
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="pb-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 overflow-hidden">
                            {category.members.map((member) => (
                                <div>
                                    <TeamMemberCard title={member.bereichPosition} image={member.image} description={member.beschreibung} name={member.title} />
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            ))}
        </>
    )
}