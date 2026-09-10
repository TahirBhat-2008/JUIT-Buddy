"use client";

import AIModeSelector, { AIMode } from "./AIModeSelector";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  onClearChat: () => void;
  messageCount: number;
  studentName: string;
  onLogout: () => void;
  currentMode: AIMode;
  onModeChange: (mode: AIMode) => void;
  isNavOpen?: boolean;
  onToggleNav?: () => void;
  onOpenReport?: () => void;
}

export default function Header({
  onClearChat,
  messageCount,
  studentName,
  onLogout,
  currentMode,
  onModeChange,
  isNavOpen,
  onToggleNav,
  onOpenReport,
}: HeaderProps) {
  const initials = (studentName || "S")
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 header-glass-container w-full max-w-full select-none">
      {/* ── Animated Laser Light Beam along the bottom edge ── */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] w-full max-w-full overflow-hidden pointer-events-none">
        <div className="w-full h-full animate-hairline-slide bg-[linear-gradient(90deg,transparent,rgba(56,189,248,0.8),rgba(168,85,247,0.7),rgba(52,211,153,0.7),transparent)]" />
      </div>

      <div className="w-full max-w-7xl mx-auto h-[52px] sm:h-[58px] px-1.5 min-[350px]:px-2 sm:px-4 flex items-center justify-between sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-2 min-w-0">
        {/* ── Left: Holographic Logo & Brand Title ── */}
        <div className="flex items-center gap-1 min-[350px]:gap-1.5 sm:gap-2 min-w-0 flex-shrink-0 sm:justify-self-start">
          {/* Animated Conic Halo Logo Squircle */}
          <div className="logo-ring flex-shrink-0 shadow-sm">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-[0.75rem] bg-white dark:bg-slate-900 flex items-center justify-center shadow-xs">
              <span className="text-xs sm:text-sm animate-logo-float">🎓</span>
            </div>
          </div>

          <div className="leading-tight min-w-0 flex items-center gap-1.5">
            <div className="flex items-center gap-1">
              <h1 className="text-xs min-[380px]:text-sm sm:text-base font-black tracking-tight animate-brand-shimmer whitespace-nowrap">
                <span>JUIT</span>
                <span className="hidden min-[380px]:inline">&nbsp;Buddy</span>
              </h1>
              <span className="text-[8.5px] font-black px-1.5 py-0.2 rounded-full bg-gradient-to-r from-blue-500/15 via-indigo-500/15 to-purple-500/15 dark:from-blue-400/20 dark:to-purple-400/20 border border-blue-400/40 dark:border-blue-400/30 uppercase tracking-wider hidden lg:inline-flex items-center gap-0.5 animate-ai-badge">
                <span className="text-[9px]">✨</span>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-300 bg-clip-text text-transparent">
                  AI
                </span>
              </span>
            </div>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium hidden xl:flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-xs animate-pulse" />
              <span className="truncate">
                Hi, <strong className="text-gray-700 dark:text-gray-300 font-semibold">{studentName}</strong>
              </span>
            </p>
          </div>
        </div>

        {/* ── Center: Segmented Frosted Glass Mode Selector ── */}
        <div className="flex items-center justify-center min-w-0 flex-shrink-0 sm:justify-self-center px-0.5 min-[350px]:px-1">
          <AIModeSelector currentMode={currentMode} onModeChange={onModeChange} />
        </div>

        {/* ── Right: Modern Action Buttons Cluster ── */}
        <div className="flex items-center gap-0.5 min-[350px]:gap-1 sm:gap-1.5 select-none flex-shrink-0 sm:justify-self-end">
          {/* Clear Chat Button */}
          {messageCount > 0 && (
            <button
              onClick={onClearChat}
              className="header-action-btn w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-800/80 cursor-pointer flex-shrink-0 transition-all duration-200 active:scale-90"
              title="Clear conversation"
            >
              <span className="text-xs">🗑️</span>
            </button>
          )}

          {/* Navigation Drawer Toggle */}
          {onToggleNav && (
            <button
              onClick={onToggleNav}
              className={`header-action-btn h-7 w-7 sm:h-8 sm:w-auto sm:px-2.5 rounded-xl flex items-center justify-center gap-1 text-xs font-semibold cursor-pointer flex-shrink-0 transition-all duration-200 active:scale-95 ${
                isNavOpen
                  ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/30 scale-102"
                  : "text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500"
              }`}
              title={isNavOpen ? "Close navigation panel (Esc)" : "Open campus tools navigation"}
            >
              <span className={`text-xs transition-transform duration-300 ${isNavOpen ? "rotate-45 text-white" : ""}`}>
                🧭
              </span>
              <span className="hidden sm:inline font-bold text-[11px]">Nav</span>
            </button>
          )}

          {/* Report & Feedback Button */}
          {onOpenReport && (
            <button
              onClick={onOpenReport}
              className="header-action-btn w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-xs text-rose-600 dark:text-rose-400 hover:border-rose-300 dark:hover:border-rose-700/80 cursor-pointer flex-shrink-0 transition-all duration-200 active:scale-90"
              title="Report issue / Feedback to developer Tahir Bhat"
            >
              <span className="text-xs">🚩</span>
            </button>
          )}

          {/* Theme Toggle */}
          <ThemeToggle className="header-action-btn w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center cursor-pointer select-none flex-shrink-0 transition-all duration-200 active:scale-90" />

          {/* User Profile / Logout Squircle */}
          <button
            onClick={onLogout}
            title="Switch User / Logout"
            className="relative flex-shrink-0 group cursor-pointer"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-fuchsia-500 text-white flex items-center justify-center text-[10px] sm:text-xs font-black tracking-wider shadow-md shadow-blue-500/25 transition-transform duration-200 group-hover:scale-105 active:scale-90">
              {initials}
            </div>
            {/* Live active dot */}
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
          </button>
        </div>
      </div>
    </header>
  );
}
