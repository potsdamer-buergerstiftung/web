import Footer from "@components/Footer/Footer";
import Header from "@components/Header";
import HeaderNavItem from "@components/Header/HaderNavItem";
import HeaderSubNavItem from "@components/Header/HeaderSubNavItem";
import HeaderNav from "@components/Header/HeaderNav";
import SocialMediaLinks from "@components/SocialMediaLinks";
import ScrollProgressIndicator from "@components/ScrollProgressIndicator";
import HeaderQuickDonateDrawer from "@components/Header/HeaderQuickDonateDrawer";
import DonationForm from "@components/DonationForm/DonationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    description: "Wir vernetzen Gleichgesinnte, versammeln engagierte Menschen, bieten Unterstützung als Plattform für Ehrenamt und möchten es den Menschen in Potsdam leichter machen, das Gemeinwohl zu stärken, Gemeinschaftsgefühl zu erleben, ein herzliches Miteinander und eine starke Zukunft für Potsdam zu stiften."
}

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header
                nav={
                    <HeaderNav items={[
                        <HeaderNavItem index={1} label="Die Stiftung">
                            <HeaderSubNavItem label="Wer wir sind" href="/stiftung" />
                            <HeaderSubNavItem label="Gremien & Team" href="/stiftung/gremien" />
                            {/* <HeaderSubNavItem label="Qualität & Transparenz" href="/stiftung/qualitaet-transparenz" />
                            <HeaderSubNavItem label="Unser Netzwerk" href="/stiftung/netzwerk" /> */}
                            <HeaderSubNavItem label="Veröffentlichungen" href="/stiftung/veroeffentlichungen" />
                        </HeaderNavItem>,
                        <HeaderNavItem index={2} label="Aktuelles & Projekte">
                            <HeaderSubNavItem label="Projekte" href="/aktuelles/projekte" />
                            <HeaderSubNavItem label="News & Blog" href="/aktuelles/blog" />
                            <HeaderSubNavItem label="Veranstaltungen" href="/aktuelles/veranstaltungen" />
                            <HeaderSubNavItem label="Presseberichte" href="/aktuelles/presse" />
                        </HeaderNavItem>,
                        <HeaderNavItem index={3} label="Mitmachen">
                            <HeaderSubNavItem label="Ehrenamt" href="/mitmachen" />
                            <HeaderSubNavItem label="Jobs" href="/mitmachen/jobs" />
                        </HeaderNavItem>,
                        <HeaderNavItem index={3} label="Mitstiften">
                        <HeaderSubNavItem label="Privatpersonen" href="/mitstiften/privatpersonen" />
                        <HeaderSubNavItem label="Unternehmen" href="/mitstiften/unternehmen" />
                    </HeaderNavItem>,
                        <HeaderNavItem index={4} label="Kontakt" href="/kontakt" />
                    ]} />
                }
            />
            <HeaderQuickDonateDrawer donationForm={<DonationForm />} />
            <main>
                {children}
            </main>
            <Footer />
            <div className="hidden lg:inline-flex fixed left-[4vh] top-[50%] z-40 origin-top-left items-center align-middle"
                style={{ transform: "rotate(-90deg) translate(-50%, 0)" }}>
                <ScrollProgressIndicator />
            </div>
            <div className="fixed right-[4vh] top-[50%] z-40 hidden origin-top-right items-center align-middle lg:inline-flex" style={{ transform: "rotate(-90deg) translate(50%, -100%)" }}>
                <SocialMediaLinks size="large" direction="horizontal" />
            </div>
        </>
    )
}