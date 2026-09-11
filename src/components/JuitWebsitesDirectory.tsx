"use client";

import { useState, useMemo } from "react";
import {
  JUIT_OFFICIAL_LINKS,
  JUIT_CATEGORIES,
  JuitLinkCategory,
  JuitLinkItem,
} from "@/lib/juitLinksData";

interface JuitWebsitesDirectoryProps {
  onOpenReport?: () => void;
  initialCategory?: JuitLinkCategory;
}

export default function JuitWebsitesDirectory({
  onOpenReport,
  initialCategory = "all",
}: JuitWebsitesDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<JuitLinkCategory>(initialCategory);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredLinks = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return JUIT_OFFICIAL_LINKS.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      if (!matchesCategory) return false;

      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.url.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q)) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, activeCategory]);

  const getCategoryColor = (cat: JuitLinkItem["category"]) => {
    switch (cat) {
      case "library":
        return "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/60";
      case "academic":
        return "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60";
      case "career":
        return "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60";
      case "campus_services":
        return "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60";
      case "student_bodies":
        return "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/60";
      default:
        return "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700";
    }
  };

  return (
    <div className="space-y-3.5 w-full max-w-full overflow-hidden min-w-0">
      {/* Developer & Direct Report Channel Banner */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50/70 via-indigo-50/30 to-white dark:from-blue-950/30 dark:via-gray-800 dark:to-gray-800 border border-blue-200/80 dark:border-blue-900/60 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 flex items-center justify-center text-base flex-shrink-0">
              🔗
            </span>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                <span>Official JUIT Portals &amp; Resources</span>
                <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  Verified Links
                </span>
              </h4>
              <p className="text-[11px] text-gray-600 dark:text-gray-400">
                Direct access to Webkiosk, LMS, Library, Placements, Fee Portals &amp; Clubs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <a
              href="https://www.linkedin.com/in/tahirbhat-2008-cse"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#0077b5] text-white hover:bg-[#005f93] transition-all flex items-center gap-1 shadow-xs cursor-pointer"
              title="Open Tahir's LinkedIn"
            >
              <span>in</span>
              <span>LinkedIn</span>
              <span className="text-[10px]">↗</span>
            </a>
            {onOpenReport && (
              <button
                type="button"
                onClick={onOpenReport}
                className="text-[11px] font-bold px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <span>🚩 Send Feedback / Report</span>
              </button>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-blue-100 dark:border-gray-700 flex items-center justify-between text-[11px] text-gray-600 dark:text-gray-400 flex-wrap gap-1">
          <div className="flex items-center gap-1.5">
            <span>Developer:</span>
            <strong className="font-mono text-gray-900 dark:text-gray-100 font-semibold">Tahir Bhat (CSE)</strong>
            <span>•</span>
            <span className="font-mono text-gray-700 dark:text-gray-300">tahirbhat2008@gmail.com</span>
            <button
              onClick={() => handleCopy("tahirbhat2008@gmail.com", "dev-email")}
              className="px-1.5 py-0.5 rounded text-[10px] bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-gray-700 dark:text-gray-300 transition-colors border border-gray-200 dark:border-gray-600 cursor-pointer"
            >
              {copiedId === "dev-email" ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            1-Click Direct Links
          </span>
        </div>
      </div>

      {/* Search Portals */}
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          🔍
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search JUIT portals (Webkiosk, Moodle LMS, Library OPAC, Placements, Fees...)"
          className="w-full pl-10 pr-9 py-2.5 bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs p-1 cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>

      {/* Categories & Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 text-xs max-w-full min-w-0">
        {JUIT_CATEGORIES.map((cat) => {
          const count =
            cat.id === "all"
              ? JUIT_OFFICIAL_LINKS.length
              : JUIT_OFFICIAL_LINKS.filter((l) => l.category === cat.id).length;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-transparent dark:border-gray-700/50"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Links Directory Cards */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 px-0.5">
          <span>
            Showing <strong>{filteredLinks.length}</strong> official resources
          </span>
          <span>Tap ↗ to open or 📋 to copy URL</span>
        </div>

        {filteredLinks.length === 0 ? (
          <div className="p-8 text-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
            <span className="text-3xl block mb-2">🔍</span>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              No JUIT portals found matching &quot;{searchQuery}&quot;
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {filteredLinks.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-gray-200/90 dark:border-gray-700/80 bg-white dark:bg-gray-800/90 hover:border-blue-300 dark:hover:border-blue-600/60 transition-all group flex flex-col justify-between gap-3 shadow-xs hover:shadow-sm"
              >
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-lg flex-shrink-0">{item.icon}</span>
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {item.title}
                      </h4>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9.5px] px-2 py-0.5 rounded-full font-semibold border flex-shrink-0 ${getCategoryColor(
                          item.category
                        )}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between text-xs gap-2">
                  <button
                    onClick={() => handleCopy(item.url, item.id)}
                    className="text-[11px] text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>📋</span>
                    <span>{copiedId === item.id ? "Copied!" : "Copy URL"}</span>
                  </button>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>Open Portal</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
