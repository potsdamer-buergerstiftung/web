import {
  PageBreadcrumb,
  PageBreadcrumbItem,
} from "@/components/page-breadcrumb";
import PageTitle from "@/components/page-title";
import Image from "next/image";

export default function SupportersPage() {
  return (
    <>
      <PageTitle
        title="Förderer & Partner"
        breadcrumb={
          <PageBreadcrumb>
            <PageBreadcrumbItem label="Förderer & Partner" />
          </PageBreadcrumb>
        }
      />
      <section className="container pb-10">
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
