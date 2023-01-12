import React from "react";
import PageBreadcrumb from "../../components/PageBreadcrumb";
import PageBreadcrumbItem from "../../components/PageBreadcrumbItem";
import PageTitle from "../../components/PageTitle";

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
          <p className="mt-3">Komm einfach vorbei</p>
        </div>
        <div className="col-span-4 md:col-span-2 lg:col-span-1">
          <h2 className="font-header text-xl font-bold">MAZ-Pyramide</h2>
          <p className="mt-4">Friedrich-Engels-Straße 24</p>
          <p>14473 Potsdam</p>
          <p className="mt-1 font-bold">+49 331 23180300</p>
          <p className="mt-4">Arbeitszeiten: Montag - Freitag</p>
          <p>9 Uhr - 15 Uhr</p>
        </div>
        <div className="col-span-4 md:col-span-2 lg:col-span-1">
          <h2 className="font-header text-xl font-bold">Inselbühne</h2>
          <p className="mt-4">Burgstraße</p>
          <p>14467 Potsdam</p>
          <p className="mt-1 font-bold">+49 331 23180309</p>
          <p className="mt-4">Besuchszeiten: Freitag - Samstag</p>
          <p>18 Uhr - 20 Uhr</p>
        </div>
        <div className="col-span-4 md:col-span-2 lg:col-span-1">
          <h2 className="font-header text-xl font-bold">Staudenhof</h2>
          <p className="mt-4">Am Alten Markt 10</p>
          <p>14467 Potsdam</p>
          <p className="mt-4">Öffnungszeiten: Freitag - Samstag</p>
          <p>18 Uhr - 23 Uhr</p>
        </div>
      </div>
    </section>
    <section className="bg-slate-100">
      <div className="container mx-auto grid grid-cols-4 gap-8 px-4 py-16">
        <div className="col-span-4 lg:col-span-1">
          <h1 className="font-header text-3xl font-bold">Allgemeine Fragen</h1>
          <p className="mt-4">
            Füllen Sie gerne das Formular aus oder
            <b>senden Sie uns eine E-Mail</b>
          </p>
        </div>
        <div className="col-span-4 lg:col-span-3">
          <form >
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3 md:col-span-1">
                <label className="text-sm font-medium">Vorname (Erforderlich)</label>
                <input v-model="firstName" type="text"
                       className="mt-2 w-full rounded-md border-none bg-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                       placeholder="Dein Vorname" required/>
              </div>
              <div className="col-span-3 md:col-span-1">
                <label className="text-sm font-medium">Nachname (Erforderlich)</label>
                <input v-model="lastName" type="text"
                       className="mt-2 w-full rounded-md border-none bg-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                       placeholder="Dein Nachname" required/>
              </div>
              <div className="col-span-3 md:col-span-1">
                <label className="text-sm font-medium">Organisation</label>
                <input v-model="organisation" type="text"
                       className="mt-2 w-full rounded-md border-none bg-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                       placeholder="Deine Organisation"/>
              </div>
              <div className="col-span-3 md:col-span-1">
                <label className="text-sm font-medium">E-Mail (Erforderlich)</label>
                <input v-model="email" type="email"
                       className="mt-2 w-full rounded-md border-none bg-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                       placeholder="Deine E-Mail" required/>
              </div>
              <div className="col-span-3 md:col-span-1">
                <label className="text-sm font-medium">Telefon</label>
                <input v-model="phone" type="text"
                       className="mt-2 w-full rounded-md border-none bg-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                       placeholder="Deine Telefonnummer"/>
              </div>
              <div className="col-span-3 md:col-span-1">
                <label className="text-sm font-medium">Projektbezug</label>
                
              </div>
              <div className="col-span-3">
                <label className="text-sm font-medium">Betreff (Erforderlich)</label>
                <input v-model="subject" type="text" required
                       className="mt-2 w-full rounded-md border-none bg-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                       placeholder="Dein Betreff"/>
              </div>
              <div className="col-span-3">
                <label className="text-sm font-medium">Nachricht (Erforderlich)</label>
                <textarea v-model="message"
                          className="mt-2 h-40 min-h-max w-full rounded-md border-none bg-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="Deine Nachricht"/>
              </div>
              <div className="col-span-3">
                <div className="mb-6 flex items-start">
                  <div className="flex h-5 items-center">
                    <input id="remember" type="checkbox"
                           className="focus:ring-3 h-4 w-4 rounded-sm border border-slate-300 bg-slate-100 accent-emerald-500 focus:ring-emerald-300"
                           required/>
                  </div>
                  <label htmlFor="remember" className="ml-2 max-w-xl text-sm font-medium">Ich erkläre mich einverstanden, dass
                    die eingegebenen Daten
                    für die Bearbeitung meines Anliegens weiterverarbeitet
                    werden.</label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
        </React.Fragment>
    );
}
