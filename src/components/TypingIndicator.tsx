"use client";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3 fade-slide-in">
      <div className="flex items-start gap-2.5 sm:gap-3 max-w-[85%] sm:max-w-[70%]">
        {/* Avatar */}
        <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-base sm:text-lg shadow-sm animate-avatar-halo ring-1 ring-blue-400/20">
          🎓
        </div>

        {/* Compact Typing Bubble */}
        <div className="relative overflow-hidden glass-surface border border-gray-200/80 dark:border-gray-800/90 border-l-[3px] border-l-blue-500 dark:border-l-blue-400 rounded-2xl rounded-tl-md px-4 py-2.5 shadow-xs">
          {/* Gemini Gradient Animated Dots */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 animate-gemini-dot-1 shadow-xs" />
            <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 animate-gemini-dot-2 shadow-xs" />
            <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 animate-gemini-dot-3 shadow-xs" />
            <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">thinking…</span>
          </div>

          {/* Bottom shimmer bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-shimmer-bar" />
          </div>
        </div>
      </div>
    </div>
  );
}
