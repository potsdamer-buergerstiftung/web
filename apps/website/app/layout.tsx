import "../styles/globals.css";

import { Space_Grotesk } from "@next/font/google";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header";
import HeaderNavItem from "../components/Header/HaderNavItem";

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
    <html className={`${font.variable} font-sans`}>
      <body>
        <Header
          items={[
            <HeaderNavItem index={1}>Die Stiftung</HeaderNavItem>,
            <HeaderNavItem index={2}>Projekte & Initiativen</HeaderNavItem>,
            <HeaderNavItem index={3}>Unterstützen & engagieren</HeaderNavItem>,
            <HeaderNavItem index={4}>Kontakt</HeaderNavItem>,
          ]}
        />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
