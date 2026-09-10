"use client";

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

interface QuickNavDockProps {
  activePanel: SidebarPanel;
  onTogglePanel: (panel: SidebarPanel) => void;
}

interface NavButton {
  id: SidebarPanel;
  label: string;
  icon: string;
  desc?: string;
}

interface PortalLink {
  label: string;
  href: string;
  icon: string;
  badge: string;
  hoverClass: string;
}

const CAMPUS_TOOLS: NavButton[] = [
  { id: "timetable", label: "Timetable", icon: "📅", desc: "Batch class schedule" },
  { id: "calendar",  label: "Academic Calendar", icon: "🗓️", desc: "Exams, holidays & breaks" },
  { id: "faculty",   label: "Faculty Directory", icon: "👨‍🏫", desc: "Professors, emails & cabins" },
  { id: "clubs",     label: "Clubs & Societies", icon: "🎭", desc: "18+ clubs, fests & handles" },
  { id: "mess",      label: "Mess Menu", icon: "🍽️", desc: "Daily hostel meal menu" },
  { id: "campus",    label: "Campus & Syllabus", icon: "🏫", desc: "Syllabus, info & contacts" },
  { id: "map",       label: "Campus Map", icon: "🗺️", desc: "Interactive campus guide" },
];


const AI_TOOLS: NavButton[] = [
  { id: "notes",    label: "Upload Notes", icon: "📝", desc: "Summarize & ask notes" },
  { id: "problems", label: "Problem Solver", icon: "🧮", desc: "Step-by-step solver" },
];

const PORTAL_LINKS: PortalLink[] = [
  {
    label: "JUIT LMS / Moodle",
    href: "https://lms.juit.ac.in/login/index.php",
    icon: "🎓",
    badge: "Moodle",
    hoverClass: "hover:bg-orange-50 dark:hover:bg-orange-950/40 hover:text-orange-600 dark:hover:text-orange-400 hover:border-orange-200 dark:hover:border-orange-800",
  },
  {
    label: "Campus Lynx Portal",
    href: "https://webportal.juit.ac.in:6011/studentportal/",
    icon: "🌐",
    badge: "Lynx",
    hoverClass: "hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800",
  },
];

export default function QuickNavDock({ activePanel, onTogglePanel }: QuickNavDockProps) {
  const isPanelOpen = activePanel !== "none";

  return (
    <aside
      className={`fixed top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
        isPanelOpen
          ? "lg:right-[26.5rem] right-1.5 opacity-100 translate-x-0 hidden lg:flex"
          : "right-1.5 sm:right-3 md:right-4 opacity-100 translate-x-0 hidden md:flex"
      }`}
    >
      <div
        className="flex flex-col items-center gap-0.5 sm:gap-1 p-1 sm:p-1.5 rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/90 dark:border-gray-800/90 shadow-2xl shadow-blue-950/10 dark:shadow-black/60 max-h-[calc(100dvh-5.5rem)] overflow-y-auto no-scrollbar"
      >
        {/* Top dock indicator */}
        <div className="w-3.5 sm:w-4 h-1 rounded-full bg-gray-300 dark:bg-gray-700 my-0.5 flex-shrink-0" />

        {/* ── Group 1: Campus & Schedule ── */}
        <div className="flex flex-col gap-0.5 sm:gap-1">
          {CAMPUS_TOOLS.map((tool) => {
            const isActive = activePanel === tool.id;
            return (
              <div key={tool.id} className="relative group flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => onTogglePanel(isActive ? "none" : tool.id)}
                  aria-label={tool.label}
                  title={`${tool.label}${tool.desc ? ` — ${tool.desc}` : ""}`}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg transition-all duration-150 cursor-pointer flex-shrink-0 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/80 hover:scale-105 active:scale-95"
                  }`}
                >
                  <span>{tool.icon}</span>
                </button>

                {/* Floating Tooltip */}
                <div className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-gray-950 dark:bg-gray-800 text-white text-xs shadow-2xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 translate-x-1.5 transition-all duration-150 z-50 border border-white/10 hidden sm:flex items-center gap-1.5">
                  <div>
                    <p className="font-semibold leading-tight">{tool.label}</p>
                    {tool.desc && <p className="text-[10px] text-gray-400 leading-none mt-0.5">{tool.desc}</p>}
                  </div>
                  {isActive && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-500 text-white">
                      Open
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-4 sm:w-5 h-px bg-gray-200 dark:bg-gray-800 my-0.5 flex-shrink-0" />

        {/* ── Group 2: AI Study Tools ── */}
        <div className="flex flex-col gap-0.5 sm:gap-1">
          {AI_TOOLS.map((tool) => {
            const isActive = activePanel === tool.id;
            return (
              <div key={tool.id} className="relative group flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => onTogglePanel(isActive ? "none" : tool.id)}
                  aria-label={tool.label}
                  title={`${tool.label}${tool.desc ? ` — ${tool.desc}` : ""}`}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg transition-all duration-200 cursor-pointer flex-shrink-0 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/80 hover:scale-105 active:scale-95"
                  }`}
                >
                  <span>{tool.icon}</span>
                </button>

                {/* Floating Tooltip */}
                <div className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-gray-950 dark:bg-gray-800 text-white text-xs shadow-2xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 translate-x-1.5 transition-all duration-150 z-50 border border-white/10 hidden sm:flex items-center gap-1.5">
                  <div>
                    <p className="font-semibold leading-tight">{tool.label}</p>
                    {tool.desc && <p className="text-[10px] text-gray-400 leading-none mt-0.5">{tool.desc}</p>}
                  </div>
                  {isActive && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-500 text-white">
                      Open
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-4 sm:w-5 h-px bg-gray-200 dark:bg-gray-800 my-0.5 flex-shrink-0" />

        {/* ── Group 3: University Portals (External) ── */}
        <div className="flex flex-col gap-0.5 sm:gap-1">
          {PORTAL_LINKS.map((portal) => (
            <div key={portal.label} className="relative group flex items-center justify-center">
              <a
                href={portal.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={portal.label}
                title={`${portal.label} (Opens in new tab)`}
                className={`w-8.5 h-8.5 sm:w-9.5 sm:h-9.5 rounded-xl flex items-center justify-center text-base sm:text-lg transition-all duration-150 border border-transparent hover:scale-105 active:scale-95 text-gray-700 dark:text-gray-200 cursor-pointer flex-shrink-0 ${portal.hoverClass}`}
              >
                <span>{portal.icon}</span>
              </a>

              {/* Floating Tooltip */}
              <div className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-gray-950 dark:bg-gray-800 text-white text-xs shadow-2xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 translate-x-1.5 transition-all duration-150 z-50 border border-white/10 hidden sm:flex items-center gap-1.5">
                <div>
                  <p className="font-semibold leading-tight">{portal.label}</p>
                  <p className="text-[10px] text-gray-400 leading-none mt-0.5">Opens in new tab</p>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-white/15 text-gray-300">
                  ↗
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

