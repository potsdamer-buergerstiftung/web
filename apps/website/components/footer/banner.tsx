import { Button } from "@/components/ui/button";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { Link } from "@/components/ui/link";
import { Heading } from "@/components/ui/heading";

const FooterBanner: React.FC = () => {
  return (
    <div className="container">
      <div className="bg-slate-950 shadow-2xl px-4 md:px-8 py-12 text-white rounded-2xl flex flex-col">
        <div className="flex flex-row flex-wrap items-center justify-between gap-8">
          <div>
            <Heading size="subtitle" className="mb-4 text-slate-200">
              Unterstützen & engagieren
            </Heading>
            <Heading size="md" className="text-slate-300">
              Mach mit!
            </Heading>
          </div>
          <div>
            <Link
              href="mailto:ehrenamt@potsdamer-buergerstiftung.org"
              size="lg"
            >
              Jetzt engagieren
              <ArrowLongRightIcon />
            </Link>
          </div>
        </div>
        <p className="max-w-xl text-slate-300 mt-6">
          Du hattest schon immer Lust auf Ehrenamt? Wir unterstützen Dich dabei
          und zeigen Dir, wie Du Dich bei uns und unseren Projekten engagieren
          kannst.
        </p>
      </div>
    </div>
  );
};

export default FooterBanner;
