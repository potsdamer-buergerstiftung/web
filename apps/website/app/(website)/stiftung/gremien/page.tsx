import {
  PageBreadcrumb,
  PageBreadcrumbItem,
  PageBreadcrumbSeparator,
} from "@/components/page-breadcrumb";
import PageTitle from "@/components/page-title";
import TeamMemberCard from "./member-card";
import serverClient from "portal/server";
import { readItems } from "portal/sdk";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

async function getTeam() {
  const categories = await serverClient.request(
    readItems("website_team_categories", {
      fields: [
        "id",
        "title",
        "description",
        {
          website_team_members: ["id", "name", "responsibilities", "image"],
        },
      ],
      sort: ["sort"],
    }),
  );

  return categories;
}

export const metadata: Metadata = {
  title: "Unsere Gremien / Team - Potsdamer Bürgerstiftung",
};

export const revalidate = 90;

export default async function TeamPage() {
  const categories = await getTeam();
  return (
    <>
      <PageTitle
        title="Gremien / Team"
        description={
          <p className="max-w-3xl">
            Die Bürgerstiftung Potsdam wird durch den Vorstand vertreten.
            Insgesamt untersteht die Bürgerstiftung Potsdam der
            Stiftungsaufsicht des Landes Brandenburg im Innenministerium, die
            über die Einhaltung des Satzungszwecks wachen. Außerdem wird die
            Stiftung jährlich vom Finanzamt Potsdam geprüft.
          </p>
        }
        breadcrumb={
          <PageBreadcrumb>
            <PageBreadcrumbItem label="Stiftung" href="/stiftung" />
            <PageBreadcrumbSeparator />
            <PageBreadcrumbItem label="Gremien" />
          </PageBreadcrumb>
        }
      />
      {categories.map((category) => (
        <div key={category.id}>
          <section className="pb-16 pt-8">
            <div className="container mx-auto grid grid-cols-1 gap-8 px-4 lg:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold uppercase text-gray-600">
                  Unser Team
                </h4>
                <h1 className="font-header mt-2 text-4xl font-bold">
                  {category.title}
                </h1>
              </div>
              <div dangerouslySetInnerHTML={{ __html: category.description }} />
            </div>
          </section>
          <section className="pb-16">
            <div
              className={cn(
                "grid grid-cols-1 sm:grid-cols-2 overflow-hidden",
                category.website_team_members.length === 4
                  ? "lg:grid-cols-4"
                  : "lg:grid-cols-3 xl:grid-cols-5",
              )}
            >
              {category.website_team_members.map((member) => (
                <div key={member.id}>
                  <TeamMemberCard
                    title={member.responsibilities}
                    image={member.image}
                    description={member.responsibilities}
                    name={member.name}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      ))}
    </>
  );
}
