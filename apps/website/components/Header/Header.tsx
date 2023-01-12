import clsx from "clsx";
import Link from "next/link";
import Logo from "../Logo";
import HeaderNavItem from "./HaderNavItem";

interface HeaderProps {
    items: React.ReactNode[];
}

const Header: React.FC<HeaderProps> = ({ items }) => {
    return (
        <header className="absolute z-40 w-full">
            <div className="z-50 flex w-full flex-row items-center justify-between gap-4 px-4 py-2 md:px-8 md:py-4 lg:px-4 lg:py-6 xl:px-10">
                <Link href="/" className="group -ml-2 block p-2 outline-none">
                    <Logo />
                </Link>
                <nav className="absolute top-0 bottom-0 left-0 right-0 flex h-screen min-h-screen flex-col overflow-y-auto bg-slate-900 transition-transform duration-500 md:right-1/4 lg:relative lg:h-auto lg:min-h-0 lg:translate-x-0 lg:flex-row lg:overflow-y-visible lg:bg-transparent lg:transition-none">
                    <div className="mb-8 block px-4 py-8 lg:hidden"></div>
                    {items}
                    <div className="mb-8 flex flex-col items-start px-4 pt-8 pb-20 lg:hidden">
                        <slot name="actions" />
                    </div>
                </nav>
                <div className="flex flex-row items-center gap-4 py-3">
                    <div className="hidden flex-row md:flex">
                        <button
                            className={clsx(
                                "bg-emerald-100 text-slate-800 hover:bg-emerald-200 text-md font-header inline-flex rounded-md py-1.5 px-4 font-bold transition ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-75"
                            )}
                        >
                            Jetzt spenden
                        </button>
                    </div>
                    <div className="block lg:hidden"></div>
                </div>
            </div>
        </header>
    );
};

export default Header;
