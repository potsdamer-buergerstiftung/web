"use client";

import { useEffect } from "react";

export function AltchaWidget() {
  useEffect(() => {
    void import("altcha");
  }, []);

  return (
    <altcha-widget
      challengeurl="/api/altcha"
      auto="onsubmit"
      debug
      hidelogo
      hidefooter
      strings='{"label":"Ich bin kein Bot"}'
      style={{
        "--altcha-border-radius": "0.375rem",
        "--altcha-border-width": "0",
        "--altcha-color-base": "transparent",
        "--altcha-color-border": "transparent",
        "--altcha-color-border-focus": "transparent",
        "--altcha-color-text": "var(--foreground)",
        "--altcha-max-width": "320px",
      }}
    />
  );
}
