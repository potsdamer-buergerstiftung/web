import Link from "next/link";
import Logo from "../Logo";
import HeaderDonationButton from "./HeaderDonationButton";
import HeaderMobileMenuButton from "./HeaderMobileMenuButton";
import HeaderNavBackground from "./HeaderNavBackground";
import { Directus } from "@directus/sdk";
import { Suspense } from "react";

interface HeaderProps {
  nav?: React.ReactNode;
}

async function Banner() {
  const directus = new Directus("https://portal.potsdamer-buergerstiftung.org");
  const res: any = await directus.singleton("website_banner").read();

  if (!(res.status == "visible")) {
    return null;
  }

  return (
    <div className="relative w-full z-[1000]">
      <a
        className="px-10 group cursor-pointer flex justify-center py-2 md:py-3 transition bg-emerald-100 hover:bg-emerald-200"
        href={res.link}
        target="_blank"
        rel="noreferrer"
      >
        <div className="font-medium text-center md:inline-flex lg:justify-center items-center">
          <b className="mr-2 text-sm md:text-md">{res.title}</b>
          <div
            className="text-sm md:text-md md:prose-md"
            dangerouslySetInnerHTML={{ __html: res.text }}
          ></div>
          <span className="text-sm md:text-md text-emerald-500 font-header inline-flex items-center rounded-md px-4 ml-1 font-bold transition ease-in-out group focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
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

export default function Header({ nav }: HeaderProps) {
  return (
    <>
      {/* @ts-ignore-error */}
      <Suspense>
        <Banner />
      </Suspense>
      <header className="absolute z-40 w-full">
        <div className="z-50 flex w-full flex-row items-center justify-between gap-4 px-4 py-2 md:px-8 md:py-4 lg:px-4 lg:py-6 xl:px-10">
          <Link href="/" className="group -ml-2 block p-2 outline-none">
            <Logo />
          </Link>
          {nav}
          <div className="flex flex-row items-center gap-4 py-3">
            <div className="hidden flex-row md:flex">
              <HeaderDonationButton />
            </div>
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
