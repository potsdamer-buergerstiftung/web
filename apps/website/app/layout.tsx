import Script from "next/script";
import { Space_Grotesk } from "next/font/google";

import "../styles/globals.css";
import { ThemeProvider } from "next-themes";

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
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "";

  return (
    <html className={`${font.variable} font-sans`} lang="de">
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <VisualEditing /> */}
          {children}
          {websiteId && (
            <Script
              src={"/analytics/script.js"}
              data-website-id={websiteId}
              strategy="afterInteractive"
            />
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
