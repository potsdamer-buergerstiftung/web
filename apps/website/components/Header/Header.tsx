import Link from "next/link";
import Logo from "../Logo";
import HeaderDonationButton from "./HeaderDonationButton";
import HeaderMobileMenuButton from "./HeaderMobileMenuButton";
import HeaderNavBackground from "./HeaderNavBackground";

interface HeaderProps {
    nav?: React.ReactNode;
}

export default function Header({ nav }: HeaderProps) {
    return (
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
    );
};
