import Script from 'next/script';
import { Space_Grotesk } from "next/font/google";

import "../styles/globals.css";

//import VisualEditing from "./VisualEditing";

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
  const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL || '';
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || '';
  
  return (
    <html className={`${font.variable} font-sans`} lang="de">
      <body className="antialiased">
        {/* <VisualEditing /> */}
        {children}
        {umamiUrl && websiteId && (
          <Script
            src={`${umamiUrl}/umami.js`}
            data-website-id={websiteId}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
