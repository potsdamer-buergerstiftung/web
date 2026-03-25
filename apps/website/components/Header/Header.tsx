import Link from "next/link";
import Logo from "../Logo";
import HeaderDonationButton from "./HeaderDonationButton";
import HeaderMobileMenuButton from "./HeaderMobileMenuButton";
import HeaderNavBackground from "./HeaderNavBackground";
import { readSingleton, rest } from "@directus/sdk";
import { Suspense } from "react";
import directus from "app/(website)/directus";

interface HeaderProps {
  nav?: React.ReactNode;
  section?: string;
  actions?: React.ReactNode;
}

async function Banner() {
  const res: any = await directus.request(readSingleton("website_banner"));

  if (!(res.status == "visible")) {
    return null;
  }

  return (
    <div className="relative w-full z-[1000]">
      <a
        className="group flex cursor-pointer justify-center bg-primary/10 px-10 py-2 transition hover:bg-primary/20 dark:bg-slate-900 dark:hover:bg-slate-800 md:py-3"
        href={res.link}
        target="_blank"
        rel="noreferrer"
      >
        <div className="items-center text-center font-medium md:inline-flex lg:justify-center">
          <b className="mr-2 text-sm text-slate-900 dark:text-slate-50 md:text-md">
            {res.title}
          </b>
          <div
            className="text-sm text-slate-700 dark:text-slate-300 md:text-md md:prose-md"
            dangerouslySetInnerHTML={{ __html: res.text }}
          ></div>
          <span className="ml-1 inline-flex items-center rounded-md px-4 text-sm font-bold text-primary/90 transition ease-in-out group focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-opacity-75 dark:text-primary/30 md:text-md">
            {res.link_label}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 h-4 w-4 group-hover:translate-x-1 transition"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </span>
        </div>
      </a>
    </div>
  );
}

export default function Header({ nav, section, actions }: HeaderProps) {
  return (
    <>
      {/* @ts-ignore-error */}
      <Suspense>
        <Banner />
      </Suspense>
      <header className="absolute z-40 w-full text-slate-900 dark:text-slate-50">
        <div className="z-50 flex w-full flex-row items-center justify-between gap-2 xl:gap-4 px-4 py-2 md:px-8 md:py-4 lg:px-4 lg:py-6 xl:px-10">
          <div className="flex flex-row items-center gap-4">
            <Link href="/" className="group xl:-ml-2 block py-2 outline-none">
              <Logo />
            </Link>
            {section && (
              <>
                <div className="h-4 w-[1px] bg-slate-700 dark:bg-slate-400" />
                <span className="text-md font-header inline-flex items-center rounded-md py-1.5 font-bold transition ease-in-out">
                  {section}
                </span>
              </>
            )}
          </div>
          {nav}
          <div className="flex flex-row items-center gap-4 py-3">
            <div className="hidden flex-row md:flex">{actions}</div>
            <div className="block lg:hidden">
              <HeaderMobileMenuButton isDark={false} />
            </div>
          </div>
        </div>
        <HeaderNavBackground />
      </header>
    </>
  );
}
