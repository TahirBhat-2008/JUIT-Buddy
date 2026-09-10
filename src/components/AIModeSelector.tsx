"use client";

import { useState, useRef, useEffect } from "react";

export type AIMode = "study" | "juit-info" | "coding";

interface AIModeSelectorProps {
  currentMode: AIMode;
  onModeChange: (mode: AIMode) => void;
}

interface ModeConfig {
  id: AIMode;
  label: string;
  shortLabel: string;
  icon: string;
  badge: string;
  description: string;
  glowClass: string;
  textGradient: string;
  dotColor: string;
}

const MODES: ModeConfig[] = [
  {
    id: "study",
    label: "Study Mode",
    shortLabel: "Study",
    icon: "📚",
    badge: "Academics",
    description: "Concepts, exam prep, notes & formulas",
    glowClass: "mode-glow-study",
    textGradient:
      "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-300 bg-clip-text text-transparent font-black",
    dotColor: "bg-blue-500 shadow-blue-500/50",
  },
  {
    id: "juit-info",
    label: "JUIT Info",
    shortLabel: "Info",
    icon: "🏫",
    badge: "Campus",
    description: "Syllabus, timetable, mess & bus routes",
    glowClass: "mode-glow-info",
    textGradient:
      "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent font-black",
    dotColor: "bg-emerald-500 shadow-emerald-500/50",
  },
  {
    id: "coding",
    label: "Coding Mode",
    shortLabel: "Code",
    icon: "💻",
    badge: "Dev",
    description: "DSA, debugging, algorithms & code",
    glowClass: "mode-glow-coding",
    textGradient:
      "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 dark:from-purple-400 dark:via-fuchsia-300 dark:to-pink-300 bg-clip-text text-transparent font-black",
    dotColor: "bg-purple-500 shadow-purple-500/50",
  },
];

export default function AIModeSelector({
  currentMode,
  onModeChange,
}: AIModeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeConfig = MODES.find((m) => m.id === currentMode) || MODES[0];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* ── 1. Mobile Dynamic Island Mode Pill (< sm) ── */}
      <div className="relative sm:hidden flex-shrink-0" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className={`header-action-btn flex items-center gap-1 px-2 py-0.5 min-[350px]:px-2.5 min-[350px]:py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer select-none whitespace-nowrap ${activeConfig.glowClass} shadow-xs active:scale-95`}
        >
          <span className="text-xs min-[350px]:text-sm">{activeConfig.icon}</span>
          <span className={`text-[11px] min-[350px]:text-xs ${activeConfig.textGradient}`}>
            {activeConfig.shortLabel}
          </span>
          <span
            className={`text-[8px] text-gray-400 dark:text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-blue-500" : ""
            }`}
          >
            ▾
          </span>
        </button>

        {/* Floating Glass Dropdown Menu on Mobile */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-2xs"
              onClick={() => setIsOpen(false)}
            />
            <div className="fixed sm:absolute top-[52px] sm:top-full left-1/2 -translate-x-1/2 mt-1.5 z-50 w-[calc(100vw-24px)] max-w-[270px] p-1.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 shadow-2xl fade-slide-in space-y-1">
              <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 flex items-center justify-between">
                <span>Select AI Focus</span>
                <span className="text-[9px] font-normal text-blue-500">Tap to switch</span>
              </div>
              {MODES.map((mode) => {
                const isSelected = currentMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => {
                      onModeChange(mode.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-slate-100/90 dark:bg-slate-800/90 border border-slate-300/80 dark:border-white/15 " +
                          mode.glowClass
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/40 text-gray-700 dark:text-gray-300 border border-transparent"
                    }`}
                  >
                    <span className="text-lg flex-shrink-0 mt-0.5">{mode.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-gray-900 dark:text-white">
                          {mode.label}
                        </span>
                        {isSelected ? (
                          <span className="text-xs text-blue-500 font-black">✓</span>
                        ) : (
                          <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-slate-100 dark:bg-slate-800 text-gray-400 font-mono">
                            {mode.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">
                        {mode.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* ── 2. Desktop & Tablet Segmented Frosted Glass Slider (>= sm) ── */}
      <div className="hidden sm:inline-flex items-center gap-0.5 md:gap-1 p-1 rounded-2xl bg-slate-100/90 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-inner select-none flex-shrink-0">
        {MODES.map((mode) => {
          const isActive = currentMode === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onModeChange(mode.id)}
              className={`relative flex items-center justify-center gap-1 sm:gap-1.5 px-2 md:px-3 lg:px-4 py-1 sm:py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer select-none whitespace-nowrap flex-shrink-0 ${
                isActive
                  ? `bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm border ${mode.glowClass} scale-[1.02]`
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-slate-800/40 active:scale-95 border border-transparent"
              }`}
              title={mode.description}
            >
              <span className="text-sm transition-transform duration-200">
                {mode.icon}
              </span>
              <span className={isActive ? mode.textGradient : ""}>
                <span className="lg:hidden">{mode.shortLabel}</span>
                <span className="hidden lg:inline">{mode.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

