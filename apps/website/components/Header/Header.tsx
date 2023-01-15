import clsx from "clsx";
import Link from "next/link";
import Logo from "../Logo";
import HeaderNavBackground from "./HeaderNavBackground";

interface HeaderProps {
    nav?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ nav }) => {
    return (
        <header className="absolute z-40 w-full">
            <div className="z-50 flex w-full flex-row items-center justify-between gap-4 px-4 py-2 md:px-8 md:py-4 lg:px-4 lg:py-6 xl:px-10">
                <Link href="/" className="group -ml-2 block p-2 outline-none">
                    <Logo />
                </Link>
                {nav}
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
            <HeaderNavBackground />
        </header>
    );
};

export default Header;
