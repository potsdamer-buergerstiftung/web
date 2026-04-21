import { Space_Grotesk, Inter } from "next/font/google";

import "../styles/globals.css";
import { ThemeProvider } from "next-themes";

import { CookieConsentBanner } from "@/modules/cookie-consent";
import { UmamiScript } from "@/modules/analytics";

//import VisualEditing from "./VisualEditing";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-header",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}
      lang="de"
      suppressHydrationWarning
    >
      <body className="antialiased bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          //enableSystem
          disableTransitionOnChange
        >
          {/* <VisualEditing /> */}
          {children}
          <UmamiScript />
          <CookieConsentBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
