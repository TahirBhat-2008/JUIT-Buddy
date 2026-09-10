"use client";

import { useState, useRef, useEffect } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

const QUICK_PROMPTS = [
  { icon: "🍽️", label: "Today's Mess", prompt: "What is on the hostel mess menu today for breakfast, lunch, and dinner?" },
  { icon: "🗓️", label: "Next Holiday", prompt: "When is the next official holiday in the JUIT academic calendar?" },
  { icon: "👨‍🏫", label: "Faculty Number", prompt: "What is the mobile number, office extension, and cabin of Mr. Faisal Firdous?" },
  { icon: "🎭", label: "Clubs & Societies", prompt: "List the active JUIT clubs and technical chapters with their coordinators and activities." },
  { icon: "📅", label: "Timetable Schedule", prompt: "What is the class schedule for batch 26BT11 today and what are the room numbers?" },
  { icon: "📚", label: "Library & Portals", prompt: "Give me the official links for JUIT Central Library (LRC), Web OPAC book search, RemoteXs off-campus access, past question papers, and LMS Moodle." },
  { icon: "🌲", label: "Campus & Dhabas", prompt: "Where are classrooms CR-13..15 located, and what are the best nearby dhabas and hotels?" },
];

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-resize textarea without layout thrashing
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    if (!input) {
      textarea.style.height = "auto";
      return;
    }
    textarea.style.height = "auto";
    const targetHeight = Math.min(textarea.scrollHeight, 180);
    textarea.style.height = `${targetHeight}px`;
  }, [input]);

  // Click outside to collapse if empty
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        !input.trim()
      ) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [input]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setInput("");
    setIsExpanded(false); // Collapse to create space for AI message
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Escape" && !input.trim()) {
      setIsExpanded(false);
      textareaRef.current?.blur();
    }
  };

  const handleChipClick = (prompt: string) => {
    if (isLoading) return;
    onSend(prompt);
    setIsExpanded(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-gradient-to-t from-white via-white/95 to-transparent dark:from-gray-950 dark:via-gray-950/95 dark:to-transparent px-3 sm:px-4 pt-1.5 pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-2.5 border-t border-gray-200/50 dark:border-gray-800/50 transition-all duration-300 ease-out"
    >
      {/* Ambient top light gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 dark:via-indigo-400/25 to-transparent" />

      <div className="max-w-4xl mx-auto">
        {!isExpanded ? (
          /* ── 1. Compact / Smaller State (Default - Creates maximum screen space) ── */
          <div className="space-y-1">
            <div
              onClick={() => {
                setIsExpanded(true);
                setTimeout(() => textareaRef.current?.focus(), 60);
              }}
              className="group flex items-center gap-3 px-3.5 py-2 sm:py-2.5 rounded-full border border-gray-200/80 dark:border-gray-700/80 bg-white/90 dark:bg-gray-900/90 shadow-md shadow-blue-950/5 dark:shadow-black/40 backdrop-blur-md cursor-pointer hover:border-blue-400/80 dark:hover:border-blue-500/80 hover:shadow-xl hover:ring-2 hover:ring-blue-500/10 transition-all duration-200"
              style={{ transform: "translateZ(0)" }}
            >
              {/* Sparkle AI icon */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-purple-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm group-hover:scale-110 transition-transform flex-shrink-0">
                ✨
              </div>

              {/* Click-to-chat input placeholder */}
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate select-none">
                  Ask about syllabus, mess, exam dates, coding, faculty...
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-[11px] ml-2 hidden md:inline">
                    (Click to type ▾)
                  </span>
                </p>
              </div>

              {/* Quick Prompts trigger chip */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(true);
                  setTimeout(() => textareaRef.current?.focus(), 60);
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100/90 dark:bg-gray-800/90 hover:bg-blue-50 dark:hover:bg-blue-950/50 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200/70 dark:border-gray-700/70 transition-colors flex-shrink-0"
                title="View quick prompts"
              >
                <span>💡</span>
                <span>Prompts ▾</span>
              </button>

              {/* Compact Send indicator button */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                <svg
                  className="h-3.5 w-3.5 transform -rotate-45 -mt-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </div>
            </div>

            {/* Sub-row with Mistake Disclaimer + NULL & VOID badge */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-1 px-3 text-[10.5px] select-none text-center sm:text-left">
              <span className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
                <span>⚠️</span>
                <span>This AI can make mistakes. Verify important academic info.</span>
              </span>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gray-950 dark:bg-black text-white text-[10.5px] font-mono tracking-wide shadow-md border border-gray-700/80 dark:border-gray-800 group">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-xs shadow-emerald-400" />
                <span className="text-gray-400 text-[9.5px] uppercase font-sans tracking-widest font-bold">created by</span>
                <span className="font-black text-xs tracking-wider animate-continuous-color font-mono">
                  NULL &amp; VOID
                </span>
                <span className="text-xs text-cyan-400 font-sans group-hover:rotate-12 transition-transform">⚡</span>
              </div>
            </div>
          </div>
        ) : (
          /* ── 2. Expanded / Bigger State (After Click - Full rich chat interface) ── */
          <div className="space-y-2 fade-slide-in">
            {/* Quick Suggestion Chips (Horizontal Scroll) */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 select-none touch-pan-x scroll-smooth">
              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-1 flex-shrink-0 mr-1">
                <span className="text-amber-500">✨</span> Quick:
              </span>
              {QUICK_PROMPTS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleChipClick(item.prompt)}
                  disabled={isLoading}
                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 dark:bg-gray-800/90 hover:bg-blue-50 dark:hover:bg-blue-950/50 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200/80 dark:border-gray-700/80 shadow-2xs hover:shadow-xs hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Elevated Floating Glass Card */}
            <form
              onSubmit={handleSubmit}
              className="relative rounded-3xl border border-gray-200/80 dark:border-gray-700/80 bg-white/90 dark:bg-gray-900/90 shadow-xl shadow-blue-950/5 dark:shadow-black/50 backdrop-blur-md transition-shadow duration-200 focus-within:border-blue-500/80 dark:focus-within:border-blue-400/80 focus-within:ring-4 focus-within:ring-blue-500/15 p-2.5 sm:p-3.5"
              style={{ transform: "translateZ(0)" }}
            >
              {/* Main Auto-Expanding Textarea */}
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about syllabus, mess menu, exam dates, coding, or math..."
                disabled={isLoading}
                rows={1}
                className="w-full resize-none bg-transparent px-2 pt-1 pb-1 text-sm sm:text-base text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none disabled:opacity-50 min-h-[46px] max-h-[180px] leading-relaxed"
              />

              {/* Bottom Toolbar Row inside the card */}
              <div className="flex items-center justify-between pt-1.5 px-1 border-t border-gray-100/80 dark:border-gray-800/80 mt-1 select-none">
                {/* Left toolbar items */}
                <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 flex-wrap">
                  <span className="inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-lg bg-blue-50/80 dark:bg-blue-950/50 text-[10px] border border-indigo-300/40 dark:border-indigo-800/50 shadow-2xs">
                    <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                    <span className="animate-gemini-text font-extrabold">Gemini Flash Lite</span>
                    <span className="animate-zap text-[10px]">⚡</span>
                  </span>

                  {input.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setInput("");
                        if (textareaRef.current) textareaRef.current.style.height = "auto";
                      }}
                      className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors text-[10px] font-semibold px-1.5 py-0.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      ✕ Clear
                    </button>
                  )}

                  {/* Minimize Button */}
                  <button
                    type="button"
                    onClick={() => setIsExpanded(false)}
                    title="Collapse input"
                    className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 px-1.5 py-0.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span>▼</span>
                    <span className="hidden sm:inline">Minimize</span>
                  </button>

                  <span className="hidden md:inline text-[10px] opacity-60">
                    Press <kbd className="px-1 py-0.5 rounded bg-gray-100/90 dark:bg-gray-800 font-mono text-[9px] border border-gray-200/60 dark:border-gray-700/60">Enter ↵</kbd> to send
                  </span>
                </div>

                {/* Right side: Character count + Send Button */}
                <div className="flex items-center gap-2">
                  {input.length > 80 && (
                    <span className="text-[11px] text-gray-400 font-mono hidden sm:inline">
                      {input.length} chars
                    </span>
                  )}

                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        <span className="hidden sm:inline">Thinking...</span>
                      </>
                    ) : (
                      <>
                        <span>Send</span>
                        <svg
                          className="h-3.5 w-3.5 transform -rotate-45 -mt-0.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Footer Row: Mistake Disclaimer + NULL & VOID badge */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-1 text-[10px] text-gray-400 dark:text-gray-500 select-none px-1 text-center sm:text-left pt-0.5">
              <p className="flex items-center gap-1">
                <span>⚠️</span>
                <span>This AI can make mistakes. Verify important academic details &amp; dates.</span>
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gray-950 dark:bg-black text-white text-[10.5px] font-mono tracking-wide shadow-md border border-gray-700/80 dark:border-gray-800 group">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-xs shadow-emerald-400" />
                <span className="text-gray-400 text-[9.5px] uppercase font-sans tracking-widest font-bold">created by</span>
                <span className="font-black text-xs tracking-wider animate-continuous-color font-mono">
                  NULL &amp; VOID
                </span>
                <span className="text-xs text-cyan-400 font-sans group-hover:rotate-12 transition-transform">⚡</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

