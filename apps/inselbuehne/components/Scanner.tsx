"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

export default function Scanner() {
    const [qr, setQr] = useState<string | null>(null);
    const [requesting, setRequesting] = useState<boolean>(false);

    const [banner, setBanner] = useState<string | null>(null);

    useEffect(() => {
        async function onScanSuccess(decodedText, decodedResult) {
            if (requesting) return;
            setQr(decodedText);
        }

        let html5QrcodeScanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 600, height: 600 } },
            /* verbose= */ false);
        html5QrcodeScanner.render(onScanSuccess, () => { });
    }, []);

    useEffect(() => {
        if (qr) {
            setRequesting(true);
            console.log(qr);
            fetch("/api/hr/scan", { method: "POST", body: JSON.stringify({ qr }) }).then(async (res) => {
                const { log_type, employee } = await res.json();
                console.log(log_type, employee)
                if (log_type === "IN") {
                    setBanner(`Willkommen, ${employee}.`);
                } else if (log_type === "OUT") {
                    setBanner(`Auf Wiedersehen, ${employee}.`);
                } else {
                    setBanner("Fehler");
                }
                setTimeout(() => {
                    setRequesting(false);
                    setQr(null);
                    setBanner(null);
                }, 10000)
            });
        }
    }, [qr]);

    return (
        <>
            <div id="reader" />
            {banner && <div className="fixed top-0 left-0 right-0 bg-white text-center text-2xl py-4">{banner}</div>}
        </>
    )
}