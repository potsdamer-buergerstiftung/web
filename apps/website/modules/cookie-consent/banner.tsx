"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { defaultConsent } from "@/lib/cookie-consent";

import { useCookieConsent } from "./useCookieConsent";

const OPEN_EVENT = "cookie-consent:open";

export default function CookieConsentBanner() {
  const { consent, isLoaded, setConsent } = useCookieConsent();

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [draftAnalytics, setDraftAnalytics] = React.useState(false);

  const showBanner = isLoaded && consent === null;

  React.useEffect(() => {
    if (!isLoaded) return;
    const initial = consent ?? defaultConsent();
    setDraftAnalytics(initial.analytics);
  }, [isLoaded, consent]);

  React.useEffect(() => {
    function onOpen() {
      const initial = consent ?? defaultConsent();
      setDraftAnalytics(initial.analytics);
      setDialogOpen(true);
    }

    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [consent]);

  function acceptAll() {
    setConsent({ analytics: true });
    setDialogOpen(false);
  }

  function deny() {
    setConsent({ analytics: false });
    setDialogOpen(false);
  }

  function savePreferences() {
    setConsent({ analytics: draftAnalytics });
    setDialogOpen(false);
  }

  if (!isLoaded) return null;

  return (
    <>
      {showBanner && (
        <div
          className={cn(
            "fixed left-4 bottom-4 z-50 max-w-lg rounded-lg bg-background/95 p-4 backdrop-blur supports-backdrop-filter:bg-background/80",
          )}
          role="region"
          aria-label="Cookie-Einstellungen"
        >
          <p className="text-sm text-foreground">
            Diese Website nutzt Cookies und ähnliche Technologien. Du kannst der
            Nutzung optionaler Technologien zustimmen oder sie ablehnen.
          </p>
          <p className="text-sm text-foreground">
            Mehr Informationen findest du in unserer{" "}
            <Link href="/datenschutz" className="px-0 underline">
              Datenschutzerklärung
            </Link>
            .
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <div className="flex-1 flex gap-2">
              <Button variant="secondary" onClick={deny}>
                Ablehnen
              </Button>
              <Button variant="secondary" onClick={() => setDialogOpen(true)}>
                Einstellungen
              </Button>
            </div>
            <Button onClick={acceptAll}>Alle akzeptieren</Button>
          </div>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg lg:max-w-xl">
          <DialogHeader>
            <DialogTitle className="mb-4">Cookie-Einstellungen</DialogTitle>
            <DialogDescription>
              Verwalte hier optionale Technologien. Notwendige Cookies sind
              immer aktiv. Mehr Infos über die Verwendung findest Du in der{" "}
              <Link href="/datenschutz" className="px-0 underline">
                Datenschutzerklärung
              </Link>
              .
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field orientation="horizontal" className="items-start">
              <Checkbox
                id="cookie-necessary"
                name="cookie-necessary"
                checked
                disabled
              />
              <Label
                htmlFor="cookie-necessary"
                className="flex-col items-start gap-1 leading-snug"
              >
                <span className="text-sm font-semibold">Notwendig</span>
                <span className="text-xs text-muted-foreground font-normal leading-normal">
                  Diese Cookies sind für die grundlegenden Funktionen der
                  Website erforderlich und können nicht deaktiviert werden. Sie
                  werden in der Regel nur als Reaktion auf von dir getätigte
                  Aktionen gesetzt, wie z.B. das Festlegen deiner
                  Datenschutzeinstellungen, das Einloggen oder das Ausfüllen von
                  Formularen.
                </span>
              </Label>
            </Field>

            <Field orientation="horizontal" className="items-start">
              <Checkbox
                id="cookie-analytics"
                name="cookie-analytics"
                checked={draftAnalytics}
                onCheckedChange={(checked) =>
                  setDraftAnalytics(Boolean(checked))
                }
              />
              <Label
                htmlFor="cookie-analytics"
                className="flex-col items-start gap-1 leading-snug"
              >
                <span className="text-sm font-semibold">Statistik</span>
                <span className="text-xs text-muted-foreground font-normal leading-normal">
                  Diese Website ist, wie der Großteil der Arbeit der
                  Bürgerstiftung, ehrenamtlich und mit sehr begrenzten
                  Ressourcen betrieben. Anonyme Nutzungsstatistiken helfen uns,
                  Fehler zu erkennen, die wir durch die begrenzte Zeit zum
                  Testen nicht gefunden haben, und die Website zu verbessern.
                  Die gesammelten Daten werden ausschließlich für die
                  Verbesserung der Website verwendet und nicht an Dritte
                  weitergegeben.
                </span>
              </Label>
            </Field>
          </FieldGroup>

          <DialogFooter className="flex flex-wrap">
            <div className="flex-1 flex gap-2">
              <Button variant="secondary" onClick={deny}>
                Ablehnen
              </Button>
              <Button variant="secondary" onClick={acceptAll}>
                Alle akzeptieren
              </Button>
            </div>
            <Button onClick={savePreferences}>Speichern</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
