import "../styles/globals.css";

import { Space_Grotesk } from "@next/font/google";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header";
import HeaderNavItem from "../components/Header/HaderNavItem";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";

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
          items={[
            <HeaderNavItem index={1}>Die Stiftung</HeaderNavItem>,
            <HeaderNavItem index={2}>Projekte & Initiativen</HeaderNavItem>,
            <HeaderNavItem index={3}>Unterstützen & engagieren</HeaderNavItem>,
            <HeaderNavItem index={4} href="/kontakt">Kontakt</HeaderNavItem>,
          ]}
        />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
