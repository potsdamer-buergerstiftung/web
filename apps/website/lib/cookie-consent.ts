export type CookieConsent = {
  v: 1;
  t: string;
  necessary: true;
  analytics: boolean;
};

export const COOKIE_CONSENT_COOKIE_NAME = "pbs_cookie_consent";
export const COOKIE_CONSENT_LOCALSTORAGE_KEY = "pbs_cookie_consent";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 days

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function validateConsent(value: unknown): CookieConsent | null {
  if (!isRecord(value)) return null;

  if (value.v !== 1) return null;
  if (typeof value.t !== "string") return null;
  if (value.necessary !== true) return null;
  if (typeof value.analytics !== "boolean") return null;

  return value as CookieConsent;
}

export function defaultConsent(): CookieConsent {
  return {
    v: 1,
    t: new Date().toISOString(),
    necessary: true,
    analytics: false,
  };
}

export function serializeConsent(consent: CookieConsent): string {
  return encodeURIComponent(JSON.stringify(consent));
}

export function parseConsentFromCookieValue(
  cookieValue: string | undefined | null,
): CookieConsent | null {
  if (!cookieValue) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(cookieValue));
    return validateConsent(parsed);
  } catch {
    return null;
  }
}

export function getCookieValueFromDocumentCookie(
  cookieName: string,
): string | null {
  if (typeof document === "undefined") return null;

  const parts = document.cookie.split(";");
  for (const part of parts) {
    const [name, ...rest] = part.trim().split("=");
    if (name === cookieName) return rest.join("=");
  }

  return null;
}

export function readConsentFromBrowser(): CookieConsent | null {
  const cookieValue = getCookieValueFromDocumentCookie(
    COOKIE_CONSENT_COOKIE_NAME,
  );
  return parseConsentFromCookieValue(cookieValue);
}

export function writeConsentToBrowser(consent: CookieConsent): void {
  if (typeof document === "undefined") return;

  const value = serializeConsent(consent);
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";

  document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=${value}; Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;

  try {
    localStorage.setItem(
      COOKIE_CONSENT_LOCALSTORAGE_KEY,
      JSON.stringify(consent),
    );
  } catch {
    // ignore
  }

  try {
    window.dispatchEvent(
      new CustomEvent("cookie-consent:changed", { detail: consent }),
    );
  } catch {
    // ignore
  }
}

export function deleteCookiesByPrefix(prefix: string): void {
  if (typeof document === "undefined") return;

  const cookiePairs = document.cookie.split(";");
  for (const pair of cookiePairs) {
    const name = pair.split("=")[0]?.trim();
    if (!name) continue;
    if (!name.startsWith(prefix)) continue;

    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
  }
}
