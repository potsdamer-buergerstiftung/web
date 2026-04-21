import React from "react";
import {
  PageBreadcrumb,
  PageBreadcrumbItem,
} from "@/components/page-breadcrumb";
import PageTitle from "@/components/page-title";
import { Metadata } from "next";
import ContactForm from "./ContactForm";
import { Link } from "@/components/ui/link";
import {
  PageSection,
  PageSectionContent,
  PageSectionDescription,
  PageSectionHeader,
  PageSectionTitle,
} from "@/components/page-section";

export const metadata: Metadata = {
  title: "Kontakt - Potsdamer Bürgerstiftung",
};

export default function ContactPage() {
  return (
    <React.Fragment>
      <PageTitle
        title="Kontakt"
        description={
          <p>
            Erzählen Sie uns kurz, worum es geht und wir melden uns bei Ihnen.
          </p>
        }
        actions={
          <Link
            href="mailto:info@potsdamer-buergerstiftung.org"
            variant="light"
          >
            info@potsdamer-buergerstiftung.org
          </Link>
        }
        breadcrumb={
          <PageBreadcrumb>
            <PageBreadcrumbItem label="Kontakt" />
          </PageBreadcrumb>
        }
      />
      <PageSection grid="1/3">
        <PageSectionHeader>
          <PageSectionTitle>Unsere Standorte</PageSectionTitle>
          <PageSectionDescription>
            Komm gerne vorbei, aber ruf vorher bitte an
          </PageSectionDescription>
        </PageSectionHeader>
        <PageSectionContent className="flex flex-col md:flex-row gap-8">
          <div>
            <h2 className="font-header text-xl font-bold">
              Rechenzentrum Potsdam
            </h2>
            <p className="mt-4 text-slate-700 dark:text-slate-300">
              Dortustraße 46
            </p>
            <p className="text-slate-700 dark:text-slate-300">14467 Potsdam</p>
            <p className="mt-1 font-bold text-slate-900 dark:text-slate-100">
              +49 331 23180300
            </p>
            <p className="mt-4 text-slate-700 dark:text-slate-300">
              Arbeitszeiten: idR. Montag - Freitag
            </p>
            <p className="text-slate-700 dark:text-slate-300">9 Uhr - 15 Uhr</p>
          </div>
          <div>
            <h2 className="font-header text-xl font-bold">Inselbühne</h2>
            <p className="mt-4 text-slate-700 dark:text-slate-300">
              Burgstraße
            </p>
            <p className="text-slate-700 dark:text-slate-300">14467 Potsdam</p>
            <p className="mt-1 font-bold text-slate-900 dark:text-slate-100">
              +49 331 23180309
            </p>
            {/* <p className="mt-4">Besuchszeiten: Freitag - Samstag</p>
            <p>18 Uhr - 20 Uhr</p> */}
          </div>
        </PageSectionContent>
      </PageSection>
      <PageSection grid="1/3">
        <PageSectionHeader>
          <PageSectionTitle>Allgemeine Fragen</PageSectionTitle>
          <PageSectionDescription>
            Füllen Sie gerne das Formular aus oder{" "}
            <b> senden Sie uns eine E-Mail</b>
          </PageSectionDescription>
        </PageSectionHeader>
        <PageSectionContent>
          <ContactForm />
        </PageSectionContent>
      </PageSection>
    </React.Fragment>
  );
}
