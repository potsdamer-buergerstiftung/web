import {
  DonationFormActions,
  DonationFormContent,
  DonationFormProgress,
} from "@/modules/donation";

export default function QuickDonateForm() {
  return (
    <>
      <div className="mx-auto h-full min-h-0 w-full max-w-5xl overflow-y-auto px-6 py-12 lg:col-span-2 lg:grid lg:grid-cols-subgrid lg:gap-x-10 lg:gap-y-8 lg:px-8">
        <div className="lg:col-span-2">
          <h4 className="mb-3 text-center text-sm font-semibold uppercase text-gray-600">
            Mitstiften & Unterstützen
          </h4>
          <h1 className="font-header text-center text-4xl font-bold">
            Spenden
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center">
            Wir legen bei unseren Projekten großen Wert darauf, dass sie
            nachhaltig wirken. Das ist jedoch nur möglich, wenn wir langfristig
            planen und fördern können. Mit Deiner regelmäßigen und verlässlichen
            Unterstützung können wir diese wichtigen Voraussetzungen schaffen.
          </p>
        </div>
        <DonationFormProgress className="shrink-0" />
        <div className="mt-8 min-w-0 lg:mt-0">
          <DonationFormContent />
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-5xl shrink-0 self-end gap-8 px-6 py-4 lg:col-span-2 lg:grid lg:grid-cols-subgrid lg:gap-x-10 lg:gap-y-0 lg:px-8">
        <div />
        <div className="min-w-0">
          <DonationFormActions className="justify-start" />
        </div>
      </div>
    </>
  );
}
