"use client";

import { useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Sync with the class applied by the anti-flash script in layout.tsx
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !dark;

    const applyTheme = () => {
      setDark(next);
      document.documentElement.classList.toggle("dark", next);
      try {
        localStorage.setItem("juit-buddy-theme", next ? "dark" : "light");
      } catch {}
    };

    // Use modern View Transitions API for zero-stutter GPU crossfade if available
    if (
      typeof document !== "undefined" &&
      "startViewTransition" in document &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(applyTheme);
    } else {
      applyTheme();
    }
  };

  return (
    <button
      onClick={toggle}
      type="button"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode (☀️)" : "Switch to dark mode (🌙)"}
      className={
        className ||
        "header-action-btn relative w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center overflow-hidden cursor-pointer select-none transition-all duration-200 active:scale-90"
      }
    >
      {/* Sun Icon (light mode) */}
      <svg
        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 transition-all duration-300 ease-out transform ${
          mounted && dark
            ? "rotate-90 scale-0 opacity-0 absolute pointer-events-none"
            : "rotate-0 scale-100 opacity-100"
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" fill="currentColor" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="M4.93 4.93l1.41 1.41" />
        <path d="M17.66 17.66l1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="M6.34 17.66l-1.41 1.41" />
        <path d="M19.07 4.93l-1.41 1.41" />
      </svg>

      {/* Moon Icon (dark mode) */}
      <svg
        className={`w-4 h-4 text-indigo-300 transition-all duration-300 ease-out transform ${
          mounted && dark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0 absolute pointer-events-none"
        }`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73A8.15 8.15 0 019.08 5.49a8.59 8.59 0 01.25-2A1 1 0 008 2.36a10.14 10.14 0 1014 11.69 1 1 0 00-.36-1.05z" />
      </svg>
    </button>
  );
}