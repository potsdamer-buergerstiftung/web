"use client"

import * as React from "react"
import Script from "next/script"

import { deleteCookiesByPrefix } from "@/lib/cookie-consent"
import { useCookieConsent } from "@/components/CookieConsent/useCookieConsent"

export default function UmamiScript() {
  const { consent, isLoaded } = useCookieConsent()

  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || ""
  const analyticsAllowed = Boolean(consent?.analytics)

  React.useEffect(() => {
    if (!isLoaded) return
    if (analyticsAllowed) return

    deleteCookiesByPrefix("umami")

    const scripts = document.querySelectorAll<HTMLScriptElement>(
      "script[src*='/analytics/script.js']"
    )
    for (const script of scripts) {
      script.parentElement?.removeChild(script)
    }

    try {
      // Best-effort disable if script is already loaded.
      ;(window as any).umami = undefined
    } catch {
      // ignore
    }
  }, [analyticsAllowed, isLoaded])

  if (!websiteId) return null
  if (!isLoaded) return null
  if (!analyticsAllowed) return null

  return (
    <Script
      src="/analytics/script.js"
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  )
}
