import Link from "next/link";

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
            <Link
              href="/mitstiften/ehrenamt"
              className="text-md font-header inline-flex items-center rounded-md bg-slate-800 py-3 px-5 font-bold text-white transition ease-in-out hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75"
            >
              Jetzt engagieren
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
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
