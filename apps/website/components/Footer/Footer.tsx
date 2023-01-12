import FooterBanner from "./FooterBanner";
import FooterBrand from "./FooterBrand";
import FooterCopyright from "./FooterCopyright";

const Footer: React.FC = () => {
  return (
    <>
      <footer className="bg-slate-100">
        <FooterBanner />
        <section>
          <div className="container mx-auto grid grid-cols-1 gap-16 px-4 pt-24 pb-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            <div className="order-1">
              <FooterBrand />
              <div className="mt-6">
                {/* <SocialMediaLinks size="compact" /> */}
              </div>
            </div>
            <div className="order-2 md:order-3 lg:order-2">
              <h4 className="font-header text-xl font-bold md:text-lg">
                Komm uns besuchen
              </h4>
              <p className="mt-6 font-bold">MAZ-Pyramide</p>
              <p className="">Friedrich-Engels-Straße 24</p>
              <p className="">14473, Potsdam</p>
              <p className="mt-4 font-bold">Inselbühne</p>
              <p className="">Burgstraße</p>
              <p className="">14467 Potsdam</p>
            </div>
            <div className="order-3 md:order-4 lg:order-3">
              <h4 className="font-header text-xl font-bold md:text-lg">
                Allgemeine Fragen
              </h4>
              <p className="mt-6">E-Mail</p>
              <p className="font-bold">info@potsdamer-buergerstiftung.org</p>
              <h4 className="font-header mt-6 text-xl font-bold md:text-lg">
                Ehrenamt
              </h4>
              <p className="mt-6">E-Mail</p>
              <p className="font-bold">
                ehrenamt@potsdamer-buergerstiftung.org
              </p>
            </div>
            <div className="order-4 md:order-2 lg:order-4">
              <h4 className="font-header text-xl font-bold md:text-lg">
                Für Newsletter anmelden
              </h4>
              <form>
                <input
                  type="email"
                  className="mt-6 w-full rounded-md border-none bg-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Deine E-Mail"
                />
                <div className="mt-6 flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="accept-newsletter"
                      type="checkbox"
                      className="focus:ring-3 h-4 w-4 rounded-sm border border-slate-300 bg-slate-100 accent-emerald-500 focus:ring-emerald-300"
                      required
                    />
                  </div>
                  <label
                    htmlFor="accept-newsletter"
                    className="ml-2 max-w-xl text-sm font-medium"
                  >
                    Ich erkläre mich einverstanden, dass die eingegebenen Daten
                    für den Versand des Newsletters weiterverarbeitet werden.
                  </label>
                </div>
              </form>
            </div>
          </div>
        </section>
        <FooterCopyright />
      </footer>
    </>
  );
};

export default Footer;
