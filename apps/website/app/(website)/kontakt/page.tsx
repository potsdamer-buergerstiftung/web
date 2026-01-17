import React from "react";
import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import { Metadata } from "next";
import directus from "../directus";
import { createItem } from "@directus/sdk";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Kontakt - Potsdamer Bürgerstiftung",
}

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
          <a
            href="mailto:info@potsdamer-buergerstiftung.org"
            className="text-md font-header rounded-md bg-emerald-500 py-1.5 px-4 font-bold text-white transition ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-75"
          >
            info@potsdamer-buergerstiftung.org
          </a>
        }
        breadcrumb={<PageBreadcrumb items={
          [<PageBreadcrumbItem label="Kontakt" />]
        } />}
      />
      <section className="bg-white">
        <div className="container mx-auto grid grid-cols-4 gap-8 px-4 pb-20 pt-8">
          <div className="col-span-4 lg:col-span-1">
            <h1 className="font-header text-3xl font-bold">Unsere Standorte</h1>
            <p className="mt-3">Komm gerne vorbei, aber ruf vorher bitte an</p>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <h2 className="font-header text-xl font-bold">Rechenzentrum Potsdam</h2>
            <p className="mt-4">Dortustraße 46</p>
            <p>14467 Potsdam</p>
            <p className="mt-1 font-bold">+49 331 23180300</p>
            <p className="mt-4">Arbeitszeiten: idR. Montag - Freitag</p>
            <p>9 Uhr - 15 Uhr</p>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <h2 className="font-header text-xl font-bold">Inselbühne</h2>
            <p className="mt-4">Burgstraße</p>
            <p>14467 Potsdam</p>
            <p className="mt-1 font-bold">+49 331 23180309</p>
            {/* <p className="mt-4">Besuchszeiten: Freitag - Samstag</p>
            <p>18 Uhr - 20 Uhr</p> */}
          </div>{/* 
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <h2 className="font-header text-xl font-bold">Staudenhof</h2>
            <p className="mt-4">Am Alten Markt 10</p>
            <p>14467 Potsdam</p>
            <p className="mt-4">Öffnungszeiten: Freitag - Samstag</p>
            <p>18 Uhr - 23 Uhr</p>
          </div> */}
        </div>
      </section>
      {/* <section className="bg-slate-100">
        <div className="container mx-auto grid grid-cols-4 gap-8 px-4 py-16">
          <div className="col-span-4 lg:col-span-1">
            <h1 className="font-header text-3xl font-bold">Allgemeine Fragen</h1>
            <p className="mt-4">
              Füllen Sie gerne das Formular aus oder
              <b>senden Sie uns eine E-Mail</b>
            </p>
          </div>
          <div className="col-span-4 lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section> */}
    </React.Fragment>
  );
}
