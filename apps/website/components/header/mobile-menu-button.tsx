"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import { mobileMenuOpen } from "./state";

interface HeaderMobileMenuButtonProps {
  variant?: "open" | "close";
  isDark?: boolean;
}

export default function HeaderMobileMenuButton({
  variant = "open",
  isDark = false,
}: HeaderMobileMenuButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useAtom(mobileMenuOpen);

  const contentColorClass = isDark ? "bg-white" : "bg-slate-800";
  const backgroundColorClass =
    variant === "open"
      ? isDark
        ? "bg-slate-900"
        : "bg-slate-100"
      : "bg-slate-800";

  return (
    <button
      type="button"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-controls="header-navigation"
      aria-expanded={isMenuOpen}
      aria-label={variant === "open" ? "Menü öffnen" : "Menü schließen"}
      className={clsx(
        "rounded-full p-4 ring-primary/40 transition hover:ring-1 focus-visible:outline-none focus-visible:ring-2",
        backgroundColorClass,
      )}
    >
      {variant === "open" && (
        <div className="flex h-6 w-6 flex-col items-start justify-center space-y-1.5">
          <div className={clsx("h-0.5 w-6", contentColorClass)} />
          <div className={clsx("h-0.5 w-5", contentColorClass)} />
        </div>
      )}
      {variant === "close" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
    </button>
  );
}
