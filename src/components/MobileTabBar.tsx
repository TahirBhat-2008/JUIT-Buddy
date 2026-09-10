"use client";

import { useState } from "react";

export type SidebarPanel =
  | "none"
  | "timetable"
  | "mess"
  | "campus"
  | "map"
  | "notes"
  | "problems"
  | "calendar"
  | "faculty"
  | "clubs";

interface MobileTabBarProps {
  activePanel: SidebarPanel;
  onTogglePanel: (panel: SidebarPanel) => void;
}

interface TabItem {
  id: SidebarPanel;
  label: string;
  icon: string;
}

// Primary thumb-reachable tabs
const PRIMARY_TABS: TabItem[] = [
  { id: "timetable", label: "Timetable", icon: "📅" },
  { id: "mess", label: "Mess", icon: "🍽️" },
  { id: "campus", label: "Campus", icon: "🏫" },
  { id: "map", label: "Map", icon: "🗺️" },
];

// Everything else lives in the More sheet
const MORE_ITEMS: TabItem[] = [
  { id: "calendar", label: "Academic Calendar", icon: "🗓️", },
  { id: "faculty", label: "Faculty Directory", icon: "👨‍🏫" },
  { id: "clubs", label: "Clubs & Societies", icon: "🎭" },
  { id: "notes", label: "Upload Notes", icon: "📝" },
  { id: "problems", label: "Problem Solver", icon: "🧮" },
];

const MORE_PORTALS: { label: string; href: string; icon: string; badge: string }[] = [
  { label: "JUIT LMS / Moodle", href: "https://lms.juit.ac.in/login/index.php", icon: "🎓", badge: "Moodle" },
  { label: "Campus Lynx Portal", href: "https://webportal.juit.ac.in:6011/studentportal/", icon: "🌐", badge: "Lynx" },
];

export default function MobileTabBar({ activePanel, onTogglePanel }: MobileTabBarProps) {
  const [moreOpen, setMoreOpen] = useState(false);

  const isMoreActive = MORE_ITEMS.some((m) => m.id === activePanel);

  const handleSelect = (panel: SidebarPanel) => {
    setMoreOpen(false);
    onTogglePanel(panel);
  };

  return (
    <>
      {/* Bottom sheet overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden bg-black/50 backdrop-blur-xs transition-opacity duration-200 ${
          moreOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMoreOpen(false)}
        aria-hidden="true"
      />

      {/* More bottom sheet */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 md:hidden transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          moreOpen ? "translate-y-0" : "translate-y-full pointer-events-none"
        }`}
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-2 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 pt-3 pb-2">
            <p className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              All Tools
            </p>
            <button
              onClick={() => setMoreOpen(false)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-bold"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="px-2 pb-2 grid grid-cols-3 gap-1.5">
            {MORE_ITEMS.map((item) => {
              const isActive = activePanel === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl transition-all active:scale-95 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-50 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="text-xl leading-none">{item.icon}</span>
                  <span className="text-[10px] font-semibold text-center leading-tight">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* University portals */}
          <div className="px-3 pb-3 pt-1 border-t border-gray-100 dark:border-gray-800 space-y-1">
            {MORE_PORTALS.map((p) => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="text-lg">{p.icon}</span>
                <span className="flex-1 min-w-0 text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">
                  {p.label}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  {p.badge}
                </span>
                <span className="text-[10px] text-gray-400">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* The tab bar itself */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/80 dark:border-gray-800/80 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-label="Mobile navigation"
      >
        <div className="flex items-stretch justify-around max-w-md mx-auto">
          {PRIMARY_TABS.map((tab) => {
            const isActive = activePanel === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTogglePanel(isActive ? "none" : tab.id)}
                className="relative flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 min-h-[52px] active:scale-95 transition-transform"
                aria-label={tab.label}
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className={`text-lg leading-none transition-transform duration-200 ${
                    isActive ? "scale-110" : ""
                  }`}
                >
                  {tab.icon}
                </span>
                <span
                  className={`text-[10px] font-semibold leading-none ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                )}
              </button>
            );
          })}

          {/* More button */}
          <button
            onClick={() => setMoreOpen((v) => !v)}
            className="relative flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 min-h-[52px] active:scale-95 transition-transform"
            aria-label="More tools"
            aria-expanded={moreOpen}
          >
            <span
              className={`text-lg leading-none transition-transform duration-300 ${
                moreOpen ? "rotate-90" : isMoreActive ? "scale-110" : ""
              }`}
            >
              {moreOpen ? "✕" : "⋯"}
            </span>
            <span
              className={`text-[10px] font-semibold leading-none ${
                moreOpen || isMoreActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              More
            </span>
            {(moreOpen || isMoreActive) && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
}
