import Footer from "@components/Footer/Footer";
import Header from "@components/Header";
import SocialMediaLinks from "@components/SocialMediaLinks";
import ScrollProgressIndicator from "@components/ScrollProgressIndicator";
import { Metadata } from "next";
import HeaderBanner from "@components/Header/HeaderBanner";

export const metadata: Metadata = {
    description: "Wir vernetzen Gleichgesinnte, versammeln engagierte Menschen, bieten Unterstützung als Plattform für Ehrenamt und möchten es den Menschen in Potsdam leichter machen, das Gemeinwohl zu stärken, Gemeinschaftsgefühl zu erleben, ein herzliches Miteinander und eine starke Zukunft für Potsdam zu stiften."
}

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}