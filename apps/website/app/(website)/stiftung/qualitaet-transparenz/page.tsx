import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";

export default function QualityAndTransparencyPage() {
    return (
        <>
            <PageTitle title="Qualität und Transparenz" breadcrumb={
                <PageBreadcrumb items={[<PageBreadcrumbItem label="Stiftung" href="/stiftung" />, <PageBreadcrumbItem label="Qualität & Transparenz" />]} />
            } />
            <section>
                <div className="container mx-auto grid grid-cols-5 gap-8 px-4 pb-16">
                    <div className="col-span-5 lg:col-span-2">
                        <h1 className="font-header text-3xl font-bold">
                            Qualität
                        </h1>
                        <p className="mt-4">
                            Menschen zusammenbringen und Zusammenhalt stärken
                        </p>
                    </div>
                    <div className="col-span-5 lg:col-span-3">
                        <h4 className="font-header text-2xl font-bold mb-5">Gütesiegel</h4>
                        <p>
                            Unsere Stiftung ist davon überzeugt, dass Ehrenamt nicht nur den
                            <b> Empfängern zugutekommt</b>, sondern auch den{" "}
                            <b>Freiwilligen selbst</b>. Durch freiwillige Tätigkeiten kannst
                            du neue <b>Fähigkeiten entwickeln</b>, wertvolle Erfahrungen
                            sammeln und <b>neue Menschen kennenlernen</b>. Ehrenamt bietet die
                            Möglichkeit, Teil einer Gemeinschaft zu werden, die sich für
                            dieselben Werte und Ziele in Potsdam einsetzt.
                        </p>
                        <h4 className="font-header text-2xl font-bold mb-5 mt-10">Auszeichnungen</h4>
                        <p>
                            Unsere Stiftung ist davon überzeugt, dass Ehrenamt nicht nur den
                            <b> Empfängern zugutekommt</b>, sondern auch den{" "}
                            <b>Freiwilligen selbst</b>. Durch freiwillige Tätigkeiten kannst
                            du neue <b>Fähigkeiten entwickeln</b>, wertvolle Erfahrungen
                            sammeln und <b>neue Menschen kennenlernen</b>. Ehrenamt bietet die
                            Möglichkeit, Teil einer Gemeinschaft zu werden, die sich für
                            dieselben Werte und Ziele in Potsdam einsetzt.
                        </p>
                    </div>
                </div>
            </section>
            <section className="py-6 bg-slate-100">
                <div className="container mx-auto grid grid-cols-5 gap-8 px-4 py-16">
                    <div className="col-span-5 lg:col-span-2">
                        <h1 className="font-header text-3xl font-bold">
                            Transparenz
                        </h1>
                        <p className="mt-4">Angebote für Ehrenamtliche und Freiwillige</p>
                    </div>
                    <div className="col-span-5 lg:col-span-3">
                        <h4 className="font-header text-2xl font-bold mb-5">Transparenzsiegel</h4>
                        <p>
                            Unsere Stiftung ist davon überzeugt, dass Ehrenamt nicht nur den
                            <b> Empfängern zugutekommt</b>, sondern auch den{" "}
                            <b>Freiwilligen selbst</b>. Durch freiwillige Tätigkeiten kannst
                            du neue <b>Fähigkeiten entwickeln</b>, wertvolle Erfahrungen
                            sammeln und <b>neue Menschen kennenlernen</b>. Ehrenamt bietet die
                            Möglichkeit, Teil einer Gemeinschaft zu werden, die sich für
                            dieselben Werte und Ziele in Potsdam einsetzt.
                        </p>
                        <h4 className="font-header text-2xl font-bold mb-5 mt-10">Anlagerichtlinien</h4>
                        <p>
                            Unsere Stiftung ist davon überzeugt, dass Ehrenamt nicht nur den
                            <b> Empfängern zugutekommt</b>, sondern auch den{" "}
                            <b>Freiwilligen selbst</b>. Durch freiwillige Tätigkeiten kannst
                            du neue <b>Fähigkeiten entwickeln</b>, wertvolle Erfahrungen
                            sammeln und <b>neue Menschen kennenlernen</b>. Ehrenamt bietet die
                            Möglichkeit, Teil einer Gemeinschaft zu werden, die sich für
                            dieselben Werte und Ziele in Potsdam einsetzt.
                        </p>
                        <h4 className="font-header text-2xl font-bold mb-5 mt-10">Compliance</h4>
                        <p>
                            Unsere Stiftung ist davon überzeugt, dass Ehrenamt nicht nur den
                            <b> Empfängern zugutekommt</b>, sondern auch den{" "}
                            <b>Freiwilligen selbst</b>. Durch freiwillige Tätigkeiten kannst
                            du neue <b>Fähigkeiten entwickeln</b>, wertvolle Erfahrungen
                            sammeln und <b>neue Menschen kennenlernen</b>. Ehrenamt bietet die
                            Möglichkeit, Teil einer Gemeinschaft zu werden, die sich für
                            dieselben Werte und Ziele in Potsdam einsetzt.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}