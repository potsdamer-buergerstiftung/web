import dynamic from "next/dynamic";

const QuickDonateForm = dynamic(() => import("./quick-donate-form"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto h-full min-h-0 w-full max-w-5xl overflow-y-auto px-6 py-12 lg:col-span-2 lg:grid lg:grid-cols-subgrid lg:gap-x-10 lg:gap-y-8 lg:px-8">
      <div className="lg:col-span-2">
        <p className="mx-auto mt-4 max-w-xl text-center">
          Spendenformular wird geladen...
        </p>
      </div>
    </div>
  ),
});

export default function QuickDonateDrawerContent({
  closeButtonRef,
}: {
  closeButtonRef: React.RefObject<HTMLButtonElement>;
}) {
  return <QuickDonateForm closeButtonRef={closeButtonRef} />;
}
