import Footer from "@components/Footer/Footer";
import Header from "@components/Header";
import HeaderNavItem from "@components/Header/HaderNavItem";
import HeaderSubNavItem from "@components/Header/HeaderSubNavItem";
import HeaderNav from "@components/Header/HeaderNav";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header
        nav={
          <HeaderNav
            items={[
              <HeaderNavItem index={1} label="Portal">
                <HeaderSubNavItem label="Wer wir sind" href="/stiftung" />
                <HeaderSubNavItem
                  label="Unsere Gremien"
                  href="/stiftung/gremien"
                />
                <HeaderSubNavItem
                  label="Aktuelles & Veranstaltungen"
                  href="/"
                />
                <HeaderSubNavItem label="Presse" href="/" />
                <HeaderSubNavItem label="Veröffentlichungen" href="/" />
              </HeaderNavItem>,
            ]}
          />
        }
      />
      <main>{children}</main>
      <Footer />
    </>
  );
}
