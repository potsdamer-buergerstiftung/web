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
import {
  PageSection,
  PageSectionContent,
  PageSectionDescription,
  PageSectionSubTitle,
  PageSectionTitle,
} from "@/components/page-section";

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
        <PageSection key={category.id}>
          <PageSectionSubTitle>Unser Team</PageSectionSubTitle>
          <PageSectionTitle>{category.title}</PageSectionTitle>
          <PageSectionDescription
            dangerouslySetInnerHTML={{ __html: category.description }}
          />
          <PageSectionContent
            className={cn(
              "-mx-4 md:-mx-8 grid grid-cols-1 sm:grid-cols-2",
              category.website_team_members.length === 4
                ? "lg:grid-cols-4"
                : "lg:grid-cols-3 xl:grid-cols-5",
            )}
          >
            {category.website_team_members.map((member) => (
              <TeamMemberCard
                key={member.id}
                title={member.responsibilities}
                image={member.image}
                description={member.responsibilities}
                name={member.name}
              />
            ))}
          </PageSectionContent>
        </PageSection>
      ))}
    </>
  );
}
