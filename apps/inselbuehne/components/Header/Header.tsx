import HeaderBanner from "./HeaderBanner";
import HeaderMobileNav from "./HeaderMobileNav";
import HeaderNav from "./HeaderNav";

interface HeaderProps {
  nav?: React.ReactNode;
}

export default function Header({ nav }: HeaderProps) {
  return (
    <>
      <HeaderMobileNav />
      <HeaderBanner />
      <header className="h-22 absolute z-40 mt-10 w-full">
        <HeaderNav />
      </header>
    </>
  );
}
