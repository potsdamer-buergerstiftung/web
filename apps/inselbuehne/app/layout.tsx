import Script from "next/script";
import { DM_Sans, DM_Serif_Display } from "next/font/google";

import "../styles/globals.css";

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
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "";

  return (
    <html className={`${serif.variable} ${sans.variable}`} lang="de">
      <body className="antialiased">
        {children}
        {websiteId && (
          <Script
            src={"/analytics/script.js"}
            data-website-id={websiteId}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
