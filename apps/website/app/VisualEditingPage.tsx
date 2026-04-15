"use client";

import { apply } from "@directus/visual-editing";
import { useEffect } from "react";

export default function VisualEditingPage() {
  useEffect(() => {
    // Run apply() after the component mounts on the client
    const initVisualEditing = async () => {
      const { disable, enable, remove } = await apply({
        directusUrl: "https://portal.potsdamer-buergerstiftung.org", // Replace with your Directus instance URL
        onSaved: ({ collection, item, payload }) => {
          console.log("Saved:", { collection, item, payload });
          // Optionally refresh data instead of reloading
        },
      });

      // Cleanup on unmount or navigation
      return () => {
        remove(); // Clean up elements when component unmounts
      };
    };

    initVisualEditing();
  }, []);

  return null;
}
