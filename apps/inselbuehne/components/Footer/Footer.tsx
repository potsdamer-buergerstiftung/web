import Link from "next/link";
import FooterBanner from "./FooterBanner";
import FooterBrand from "./FooterBrand";
import FooterCopyright from "./FooterCopyright";

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-900">
      <FooterBanner />
      <div className="container mx-auto px-4 pb-12">
        <hr className="mb-12 h-[1px] w-full border-gray-400 lg:mb-24" />
        <div className="grid grid-cols-6 gap-10 text-center md:gap-16 md:text-left">
          <div className="col-span-6 lg:col-span-3">
            <h1 className="font-serif text-3xl text-white">Inselbühne Potsdam</h1>
            <p className="mt-2 text-gray-300">Burgstraße, 14471 Potsdam</p>
            {/* <PbsLogo className="mt-6 w-40 text-white" /> */}
          </div>
          <div className="col-span-6 md:col-span-2 lg:col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">
              Folg&apos; uns
            </h4>
            <ul className="mt-4 flex flex-col space-y-4">
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://instagram.com/inselbuehne"
                  className="text-gray-300 transition hover:text-green-300"
                >Instagram</a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://facebook.com/inselbuehne"
                  className="text-gray-300 transition hover:text-green-300"
                >Facebook</a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/potsdamer-buergerstiftung"
                  className="text-gray-300 transition hover:text-green-300"
                >GitHub</a>
              </li>
            </ul>
          </div>
          <div className="col-span-6 md:col-span-2 lg:col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">
              Über uns
            </h4>
            <ul className="mt-4 flex flex-col space-y-4">
              <li>
                <a
                  href="https://www.potsdamer-buergerstiftung.org"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 transition hover:text-green-300"
                >Bürgerstiftung</a>
              </li>
              <li>
                <Link
                  href="/presse"
                  className="text-gray-300 transition hover:text-green-300"
                >Presse
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-6 md:col-span-2 lg:col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">
              Förderer
            </h4>
            <ul className="mt-4 flex flex-col space-y-4">
              <li>
                <a
                  href="https://www.potsdam.de"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 transition hover:text-green-300"
                >Stadt Potsdam</a>
              </li>
              <li>
                <a
                  href="https://www.brandenburg.de"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 transition hover:text-green-300"
                >Land Brandenburg</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <FooterCopyright />
    </footer>
  );
};

export default Footer;
