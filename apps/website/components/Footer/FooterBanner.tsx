import { Button } from "@components/ui/button";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { Link } from "@components/ui/link";

const FooterBanner: React.FC = () => {
  return (
    <section>
      <div className="container mx-auto px-4 pt-20 pb-4">
        <div className="flex flex-row flex-wrap items-center justify-between gap-8">
          <div>
            <p className="mb-2 text-sm font-medium uppercase">
              Unterstützen & engagieren
            </p>
            <h1 className="font-header text-5xl font-bold">Mach mit!</h1>
          </div>
          <div>
            <Link href="mailto:ehrenamt@potsdamer-buergerstiftung.org" variant="secondary" size="lg">
              Jetzt engagieren
              <ArrowLongRightIcon />
            </Link>
          </div>
        </div>
        <hr className="mt-8 h-1 w-full border-slate-800" />
      </div>
      <div className="container mx-auto flex flex-row items-center px-4">
        <p className="max-w-xl">
          Du hattest schon immer Lust auf Ehrenamt? Wir unterstützen Dich dabei
          und zeigen Dir, wie Du Dich bei uns und unseren Projekten engagieren
          kannst.
        </p>
      </div>
    </section>
  );
};

export default FooterBanner;
