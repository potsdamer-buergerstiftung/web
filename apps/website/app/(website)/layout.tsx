import Footer from "@components/Footer/Footer";
import Header from "@components/Header";
import HeaderNavItem from "@components/Header/HaderNavItem";
import HeaderSubNavItem from "@components/Header/HeaderSubNavItem";
import HeaderNav from "@components/Header/HeaderNav";
import SocialMediaLinks from "@components/SocialMediaLinks";
import ScrollProgressIndicator from "@components/ScrollProgressIndicator";
import HeaderQuickDonateDrawer from "@components/Header/HeaderQuickDonateDrawer";
import DonationForm from "@components/DonationForm/DonationForm";

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header
                nav={
                    <HeaderNav items={[
                        <HeaderNavItem index={1} label="Die Stiftung">
                            <HeaderSubNavItem label="Wer wir sind" href="/stiftung" />
                            <HeaderSubNavItem label="Unsere Gremien" href="/stiftung/gremien" />
                            <HeaderSubNavItem label="Aktuelles & Veranstaltungen" href="/" />
                            <HeaderSubNavItem label="Presse" href="/" />
                            <HeaderSubNavItem label="Veröffentlichungen" href="/" />
                        </HeaderNavItem>,
                        <HeaderNavItem index={3} label="Projekte & Initiativen">
                            <HeaderSubNavItem label="Unsere Projekte" href="/" />
                        </HeaderNavItem>,
                        <HeaderNavItem index={3} label="Unterstützen & engagieren">
                            <HeaderSubNavItem label="Ehrenamt" href="/" />
                            <HeaderSubNavItem label="Spenden" href="/" />
                            <HeaderSubNavItem label="Unsere Förderer & Partner" href="/" />
                            <HeaderSubNavItem label="Partner werden" href="/" />
                        </HeaderNavItem>,
                        <HeaderNavItem index={4} label="Kontakt" href="/kontakt" />
                    ]} />
                }
            />
            <HeaderQuickDonateDrawer donationForm={<DonationForm />}/>
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