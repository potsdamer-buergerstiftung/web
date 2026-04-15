import { Space_Grotesk } from "next/font/google";

import "../styles/globals.css";
import { ThemeProvider } from "next-themes";

import { CookieConsentBanner } from "@/modules/cookie-consent";
import { UmamiScript } from "@/modules/analytics";

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
  return (
    <html
      className={`${font.variable} font-sans`}
      lang="de"
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
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
