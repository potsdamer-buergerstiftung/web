import { DonationForm } from "@components/donation";
import { privateDonationFormConfig } from "@components/DonationForm/presets";


export default function PrivatDonationPage() {
    return (
        <div className="container px-4 mx-auto pt-28 pb-10">
            <DonationForm />
        </div>
    )
}
