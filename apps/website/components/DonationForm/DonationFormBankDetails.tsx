import { useAtom } from "jotai";
import { projectsAtom, selectedAmountAtom, selectedProjectId, donationProgressAtom } from "./state";
import { PaymentCode } from "sepa-payment-code";
import { QRCodeSVG } from "qrcode.react";
import type { DonationFormConfig } from "./types";

export default function DonationFormBankDetails({ config }: { config: DonationFormConfig }) {
    function onContinueClicked() {
        setFormProgress("PAYMENT");
    }

    const [selectedProject] = useAtom(selectedProjectId);
    const [selectedAmount] = useAtom(selectedAmountAtom);   
    const [projects] = useAtom(projectsAtom);
    const [_formProgress, setFormProgress] = useAtom(donationProgressAtom);

    const selectedProjectTitle =
        selectedProject !== 0
            ? projects.find((project) => project.id === selectedProject)?.title ??
              String(selectedProject)
            : "Allgemeine Arbeit";

    const bankTransferTitle = config.payment.bankTransfer?.title ?? "Banküberweisung";
    const bankTransferDescription =
        config.payment.bankTransfer?.description ??
        "Bitte überweise deine Spende mithilfe der folgenden Bankdetails:";

    const qrCode = new PaymentCode(
        "Buergerstiftung Potsdam",
        "DE93120700000010663300",
        selectedAmount,
        `Spende für ${selectedProjectTitle}`
    );

    return (
        <div className="grid grid-cols-3 gap-10">
            <div className="hidden col-span-1 md:block">
                <div className="bg-white rounded-lg p-8">
                    <img src="/img/payment.svg" />
                </div>
            </div>
            <div className="col-span-3 md:col-span-2">
                <h1 className="font-header font-bold text-3xl">
                    {bankTransferTitle}
                </h1>
                <p className="mt-4">
                    {bankTransferDescription}
                </p>
                <div className="mt-4">
                    <p>IBAN: DE93 1207 0000 0010 6633 00</p>
                    <p>BIC: DEUTDEBB160</p>
                    <p>Bank: Deutsche Bank Potsdam</p>
                    <p>Betrag: {selectedAmount} €</p>
                    <p>
                        Verwendungszweck: Spende für {selectedProjectTitle}
                    </p>
                </div>
                <p className="mt-4 mb-4">
                    Oder scanne den QR-Code mit deiner Banking-App:
                </p>
                <QRCodeSVG value={qrCode.getPayload()} />
                <button
                    className={"text-md font-header inline-flex items-center rounded-md bg-slate-800 py-3 px-5 font-bold text-white transition ease-in-out hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75 mt-16"}
                    onClick={onContinueClicked}
                >
                    Zurück
                </button>
            </div>
        </div>
    );
}
