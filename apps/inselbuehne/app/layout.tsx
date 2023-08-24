import "../styles/globals.css";

import { DM_Sans, DM_Serif_Display } from "next/font/google";

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal"],
});

const serif = DM_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${serif.variable} ${sans.variable}`} lang="de">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
