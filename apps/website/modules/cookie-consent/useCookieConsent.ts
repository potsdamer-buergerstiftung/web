"use client";

import * as React from "react";

import {
  type CookieConsent,
  COOKIE_CONSENT_LOCALSTORAGE_KEY,
  defaultConsent,
  readConsentFromBrowser,
  validateConsent,
  writeConsentToBrowser,
  deleteCookiesByPrefix,
} from "@/lib/cookie-consent";

export type CookieConsentState = CookieConsent | null | undefined;

export function useCookieConsent() {
  const [consent, setConsentState] =
    React.useState<CookieConsentState>(undefined);

  React.useEffect(() => {
    setConsentState(readConsentFromBrowser());
  }, []);

  React.useEffect(() => {
    function refreshFromBrowser() {
      setConsentState(readConsentFromBrowser());
    }

    function onConsentChanged(event: Event) {
      const customEvent = event as CustomEvent;
      const maybeConsent = validateConsent(customEvent.detail);
      setConsentState(maybeConsent ?? readConsentFromBrowser());
    }

    function onStorage(event: StorageEvent) {
      if (event.key !== COOKIE_CONSENT_LOCALSTORAGE_KEY) return;
      if (!event.newValue) return refreshFromBrowser();
      try {
        const parsed = JSON.parse(event.newValue);
        const maybeConsent = validateConsent(parsed);
        setConsentState(maybeConsent ?? readConsentFromBrowser());
      } catch {
        refreshFromBrowser();
      }
    }

    window.addEventListener("cookie-consent:changed", onConsentChanged);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("cookie-consent:changed", onConsentChanged);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  function setConsent(next: Pick<CookieConsent, "analytics">) {
    const current = consent ?? defaultConsent();
    const updated: CookieConsent = {
      ...current,
      ...next,
      t: new Date().toISOString(),
      necessary: true,
      v: 1,
    };

    writeConsentToBrowser(updated);

    if (!updated.analytics) {
      deleteCookiesByPrefix("umami");
    }

    setConsentState(updated);
  }

  return {
    consent,
    hasChoice: consent !== null && consent !== undefined,
    isLoaded: consent !== undefined,
    setConsent,
  };
}
