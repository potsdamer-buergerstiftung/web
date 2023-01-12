import "../styles/globals.css";

import { Space_Grotesk } from "@next/font/google";
import Footer from "../components/Footer/Footer";

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
        <main>
          <nav></nav>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
