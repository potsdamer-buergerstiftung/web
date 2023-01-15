import "../styles/globals.css";

import { Space_Grotesk } from "@next/font/google";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header";
import HeaderNavItem from "../components/Header/HaderNavItem";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";
import HeaderSubNavItem from "../components/Header/HeaderSubNavItem";
import HeaderNav from "../components/Header/HeaderNav";

const font = Space_Grotesk({
  variable: "--font-header",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${font.variable} font-sans`} lang="de">
      <body>
        <Header
          nav={
            <HeaderNav items={[
              <HeaderNavItem index={1} label="Die Stiftung">
                <HeaderSubNavItem label="Wer wir sind" href="/" />
                <HeaderSubNavItem label="Unsere Gremien" href="/" />
                <HeaderSubNavItem label="Aktuelles & Veranstaltungen" href="/" />
                <HeaderSubNavItem label="Presse" href="/" />
                <HeaderSubNavItem label="Veröffentlichungen" href="/" />
              </HeaderNavItem>,
              <HeaderNavItem index={3} label="Projekte & Initiativen">
              <HeaderSubNavItem label="Unsere Projekte" href="/" />
            </HeaderNavItem>,
              <HeaderNavItem index={3} label="Unterstützen & engagieren">
                <HeaderSubNavItem label="Ehrenamt" href="/" />
                <HeaderSubNavItem label="Spenden" href="/" />
                <HeaderSubNavItem label="Unsere Förderer & Partner" href="/" />
                <HeaderSubNavItem label="Partner werden" href="/" />
              </HeaderNavItem>,
              <HeaderNavItem index={4} label="Kontakt" href="/kontakt" />
            ]} />
          }
        />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
