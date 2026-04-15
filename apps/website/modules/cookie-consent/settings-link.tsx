"use client";

import * as React from "react";

const OPEN_EVENT = "cookie-consent:open";

export default function CookieSettingsLink({
  className,
  children = "Cookie-Einstellungen",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        try {
          window.dispatchEvent(new Event(OPEN_EVENT));
        } catch {
          // ignore
        }
      }}
    >
      {children}
    </button>
  );
}
