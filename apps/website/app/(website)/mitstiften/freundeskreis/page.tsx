import DonationForm from "@/components/DonationForm/DonationForm";
import { freundeskreisDonationFormConfig } from "@/components/DonationForm/presets";


export default function FreundeskreisJoinPage() {
    return (
        <div className="container px-4 mx-auto pt-28 pb-10">
            <DonationForm config={freundeskreisDonationFormConfig} />
        </div>
    )
}
