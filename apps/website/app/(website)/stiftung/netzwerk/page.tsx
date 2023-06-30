import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";

export default function NetworkPage() {
    return (
        <>
            <PageTitle title="Unser Netzwerk" breadcrumb={
                <PageBreadcrumb items={[<PageBreadcrumbItem label="Stiftung" href="/stiftung" />, <PageBreadcrumbItem label="Unser Netzwerk" />]} />
            } />
            <section>
                <div className="container mx-auto grid grid-cols-5 gap-8 px-4 pb-16">
                    <div className="col-span-5 lg:col-span-2">
                        <h1 className="font-header text-3xl font-bold">
                            Mitgliedschaften
                        </h1>
                        <p className="mt-4">
                            Menschen zusammenbringen und Zusammenhalt stärken
                        </p>
                    </div>
                    <div className="col-span-5 lg:col-span-3">
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
                            Kooperationen
                        </h1>
                        <p className="mt-4">Angebote für Ehrenamtliche und Freiwillige</p>
                    </div>
                    <div className="col-span-5 lg:col-span-3">
                        <p>
                            Als Bürgerstiftung sind wir auch bestrebt, die{" "}
                            <b>Anerkennung und Wertschätzung </b>für Ehrenamtliche in unserer
                            Gemeinschaft <b>zu fördern</b>. Wir organisieren regelmäßig
                            Veranstaltungen, wir nennen sie <b>Mitmach-Treffs</b>, um die
                            Leistungen der Freiwilligen zu würdigen, ihr Engagement öffentlich
                            sichtbar zu machen und über Angebote, sich zu engagieren, zu
                            informieren. Dies dient als <b>Motivation für andere</b>, sich
                            ebenfalls <b>einzubringen und aktiv zu werden</b>.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}