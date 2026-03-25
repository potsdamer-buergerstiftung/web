"use client";

import { useEffect, useState } from "react";

export function AltchaWidget() {
  if (typeof window === undefined) {
    return null;
  }

  import("altcha");

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains("dark"));
    update();

    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
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
        "--altcha-color-base": isDark ? "#0f172a" : "#f8fafc",
        "--altcha-color-border": "transparent",
        "--altcha-color-border-focus": "transparent",
        "--altcha-color-text": isDark ? "#e2e8f0" : "#0f172a",
        "--altcha-color-text-secondary": isDark ? "#94a3b8" : "#475569",
        "--altcha-color-border-secondary": "transparent",
        "--altcha-color-border-secondary-focus": "transparent",
        "--altcha-color-background": isDark ? "#0f172a" : "#f8fafc",
        "--altcha-color-border-error": "#ef4444",
        "--altcha-color-border-success": "#22c55e",
        "--altcha-color-focus": "#10b981",
        "--altcha-color-label": isDark ? "#e2e8f0" : "#0f172a",
        "--altcha-max-width": "320px",
      }}
    />
  );
}
