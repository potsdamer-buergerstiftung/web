import DonationForm from "@components/DonationForm/DonationForm";

export default function PrivatDonationPage() {
  return (
    <div className="container px-4 mx-auto pt-28 pb-10">
      <DonationForm disableProjectSelection={true} />
    </div>
  );
}
