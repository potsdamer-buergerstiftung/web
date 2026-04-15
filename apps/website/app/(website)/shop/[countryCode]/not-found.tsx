import { Metadata } from "next";

import InteractiveLink from "@/modules/common/components/interactive-link";

export const metadata: Metadata = {
  title: "404",
  description: "Etwas ist schiefgelaufen",
};

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ui-fg-base">Seite nicht gefunden</h1>
      <p className="text-small-regular text-ui-fg-base">
        Die Seite, auf die Sie zugreifen wollten, existiert nicht.
      </p>
      <InteractiveLink href="/">Zur Startseite</InteractiveLink>
    </div>
  );
}
