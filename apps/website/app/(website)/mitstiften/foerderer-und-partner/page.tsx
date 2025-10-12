import PageBreadcrumb from "@components/PageBreadcrumb";
import PageBreadcrumbItem from "@components/PageBreadcrumbItem";
import PageTitle from "@components/PageTitle";
import Image from "next/image";

export default function SupportersPage() {
  return (
    <>
      <PageTitle
        title="Förderer & Partner"
        breadcrumb={
          <PageBreadcrumb
            items={[<PageBreadcrumbItem label="Förderer & Partner" />]}
          />
        }
      />
      <section className="container px-4 mx-auto pb-10">
        <div className="grid grid-cols-12 gap-10 items-center">
          <Image
            src="/img/fs-sw.jpg"
            alt="Bild von Fonds Soziokultur"
            width="200"
            height="100"
            className="col-span-2"
          />
          <Image
            src="/img/bkm-logo_1.png"
            alt="Bild von Fonds Soziokultur"
            width="200"
            height="100"
            className="col-span-2"
          />
          <Image
            src="/img/bkm_neustart_kultur_wortmarke_neg_rgb_rz.png"
            alt="Bild von Fonds Soziokultur"
            width="80"
            height="80"
            className="col-span-1"
          />
        </div>
      </section>
    </>
  );
}
