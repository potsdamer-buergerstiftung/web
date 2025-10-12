"use client";

import { useEffect } from "react";

export default function VisualEditing() {
  useEffect(() => {
    // Import the Directus Visual Editing library dynamically (client-side only)
    import("@directus/visual-editing").then(({ apply }) => {
      apply({
        directusUrl: "https://portal.potsdamer-buergerstiftung.org",
      });
    });
  }, []);

  return null;
}
