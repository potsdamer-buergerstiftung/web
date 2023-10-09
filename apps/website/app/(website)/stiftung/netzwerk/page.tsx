import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import Image from "next/image";

export default function NetworkPage() {
    return (
        <>
            <PageTitle
                title="Unser Netzwerk"
                breadcrumb={
                    <PageBreadcrumb
                        items={[
                            <PageBreadcrumbItem label="Stiftung" href="/stiftung" />,
                            <PageBreadcrumbItem label="Unser Netzwerk" />,
                        ]}
                    />
                }
            />
            <section>
                <div className="container mx-auto grid grid-cols-5 gap-8 px-4 pb-16">
                    <div className="col-span-5 lg:col-span-2">
                        <h1 className="font-header text-3xl font-bold">Mitgliedschaften</h1>
                    </div>
                    <div className="col-span-5 lg:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <h4 className="font-bold text-lg text-center">
                                    Bündnis "Potsdam! bekennt Farbe"
                                </h4>
                                <Image
                                    src="/img/netzwerk/Buendnis.png"
                                    width={200}
                                    height={200}
                                    alt="Logo vom Bündnis"
                                    className="mx-auto mt-2"
                                />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-center">
                                    Bundesverband Deutscher Stiftungen
                                </h4>
                                <Image
                                    src="/img/netzwerk/csm_st_tw_logo_da7a699d1e.png"
                                    width={200}
                                    height={200}
                                    alt="Logo vom Bündnis"
                                    className="mx-auto mt-2"
                                />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-center">
                                    Radeln ohne Alter Berlin
                                </h4>
                                <Image
                                    src="/img/netzwerk/cropped-logox2.png"
                                    width={200}
                                    height={200}
                                    alt="Logo vom Bündnis"
                                    className="mx-auto mt-2"
                                />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-center">
                                    Geschäftsnetzwerk Potsdam
                                </h4>
                                <Image
                                    src="/img/netzwerk/GNWP_LogoAlternative_5cmDruck.jpg"
                                    width={200}
                                    height={200}
                                    alt="Logo vom Bündnis"
                                    className="mx-auto mt-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="py-6 bg-slate-100">
                <div className="container mx-auto grid grid-cols-5 gap-8 px-4 py-16">
                    <div className="col-span-5 lg:col-span-2">
                        <h1 className="font-header text-3xl font-bold">Kooperationen</h1>
                    </div>
                    <div className="col-span-5 lg:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <h4 className="font-bold text-lg text-center">
                                    Bündnis "Potsdam! bekennt Farbe"
                                </h4>
                                <Image
                                    src="/img/netzwerk/Buendnis.png"
                                    width={200}
                                    height={200}
                                    alt="Logo vom Bündnis"
                                    className="mx-auto mt-2"
                                />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-center">
                                    Bundesverband Deutscher Stiftungen
                                </h4>
                                <Image
                                    src="/img/netzwerk/csm_st_tw_logo_da7a699d1e.png"
                                    width={200}
                                    height={200}
                                    alt="Logo vom Bündnis"
                                    className="mx-auto mt-2"
                                />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-center">
                                    Radeln ohne Alter Berlin
                                </h4>
                                <Image
                                    src="/img/netzwerk/cropped-logox2.png"
                                    width={200}
                                    height={200}
                                    alt="Logo vom Bündnis"
                                    className="mx-auto mt-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    );
}
