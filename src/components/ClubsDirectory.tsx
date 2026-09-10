"use client";

import { useMemo, useState } from "react";
import {
  JUIT_CLUBS,
  JYC_OVERVIEW,
  type ClubCategory,
} from "@/lib/clubsData";

const CATEGORY_TABS: Array<{ id: ClubCategory; label: string; icon: string }> = [
  { id: "all", label: "All Bodies", icon: "🌟" },
  { id: "technical", label: "Technical & Computing", icon: "💻" },
  { id: "entrepreneurship", label: "Startups & E-Cell", icon: "🚀" },
  { id: "sports", label: "Sports & Athletics", icon: "🏆" },
  { id: "social", label: "Social & Service", icon: "🤝" },
];

export default function ClubsDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ClubCategory>("all");

  const filteredClubs = useMemo(() => {
    let list = JUIT_CLUBS;

    if (selectedCategory !== "all") {
      list = list.filter((club) => club.category === selectedCategory);
    }

    const q = searchQuery.trim().toLowerCase();
    if (!q) return list;

    return list.filter((club) => {
      const haystack = [
        club.name,
        club.shortName,
        club.acronym || "",
        club.instagram || "",
        club.tagline,
        club.description,
        club.facultyCoordinator || "",
        ...club.flagshipEvents,
        ...club.coreActivities,
        ...club.tags,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-4 select-none text-gray-800 dark:text-gray-100">
      {/* ── 1. APEX JYC BANNER & ANNUAL FESTS SPOTLIGHT ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-950 text-white p-4 shadow-xl border border-indigo-500/30">
        {/* Background glow circle */}
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2.5">
              <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl shadow-inner flex-shrink-0">
                🏛️
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-extrabold tracking-tight text-white">
                    {JYC_OVERVIEW.name}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Apex Council
                  </span>
                </div>
                <p className="text-xs text-blue-200 font-medium">
                  {JYC_OVERVIEW.role} • {JYC_OVERVIEW.deanWelfare}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap flex-shrink-0">
              {JYC_OVERVIEW.websiteUrl && (
                <a
                  href={JYC_OVERVIEW.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/20 transition-all cursor-pointer shadow-xs"
                >
                  <span>🌐</span>
                  <span>JYC Portal</span>
                  <span>↗</span>
                </a>
              )}
            </div>
          </div>

          <p className="text-xs text-blue-100/90 leading-relaxed">
            {JYC_OVERVIEW.description}
          </p>

          {/* 4 Major Campus Festivals */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 block">
              🎉 Major Campus Festivals Organized by JYC:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {JYC_OVERVIEW.majorFests.map((fest) => (
                <div
                  key={fest.name}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-xs transition-colors"
                >
                  <p className="font-bold text-xs text-amber-300">{fest.name}</p>
                  <p className="text-[10px] text-blue-200/90 leading-tight mt-0.5">{fest.type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. SEARCH INPUT & CATEGORY FILTER PILLS ── */}
      <div className="space-y-2">
        <div className="relative">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ACM, IEEE, TIEDC, Synapse, Sports, Rotaract, NSS..."
            className="w-full pl-9 pr-8 py-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs transition-all"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
            🔍
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills (wrap — every label always visible) */}
        <div className="flex flex-wrap gap-1.5 text-xs max-w-full min-w-0">
          {CATEGORY_TABS.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={
                  "px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer " +
                  (isSelected
                    ? "bg-blue-600 text-white shadow-xs scale-102"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700")
                }
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 3. CLUBS LIST GRID ── */}
      <div className="space-y-3">
        {filteredClubs.length === 0 ? (
          <div className="text-center py-10 space-y-2 text-gray-400">
            <span className="text-3xl">🔍</span>
            <p className="text-xs">No clubs or communities match &ldquo;{searchQuery}&rdquo;.</p>
            <p className="text-[11px] text-gray-400">
              Try searching by name like &ldquo;ACM&rdquo;, &ldquo;IEEE&rdquo;, &ldquo;TIEDC&rdquo;, &ldquo;Synapse&rdquo;, or &ldquo;NSS&rdquo;.
            </p>
          </div>
        ) : (
          filteredClubs.map((club) => (
            <div
              key={club.id}
              className="group rounded-2xl border border-gray-200/90 dark:border-gray-800/90 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-4 shadow-xs hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all space-y-3"
            >
              {/* Top Row: Icon + Names (full width, never crushed) */}
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                  {club.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
                      {club.name}
                    </h4>
                    {club.acronym && (
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        {club.acronym}
                      </span>
                    )}
                    <span className="text-[9.5px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      {club.categoryLabel}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                    &ldquo;{club.tagline}&rdquo;
                  </p>
                </div>
              </div>              {/* Action Links Row (own row — never squeezes the club name) */}
              <div className="flex items-center gap-1.5 flex-wrap">
                  {club.websiteUrl && (
                    <a
                      href={club.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold text-xs border border-blue-200/80 dark:border-blue-800/80 transition-all hover:scale-102 active:scale-98 cursor-pointer shadow-2xs"
                      title={"Visit " + club.shortName + " official website"}
                    >
                      <span>🌐</span>
                      <span className="hidden sm:inline">Website</span>
                      <span>↗</span>
                    </a>
                  )}

                  {club.instaUrl && (
                    <a
                      href={club.instaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 hover:from-pink-500/20 hover:to-indigo-500/20 text-pink-600 dark:text-pink-400 font-bold text-xs border border-pink-200/80 dark:border-pink-800/80 transition-all hover:scale-102 active:scale-98 cursor-pointer shadow-2xs"
                      title={"View " + (club.instagram || club.shortName) + " on Instagram"}
                    >
                      <span>📸</span>
                      <span className="font-mono text-[11px]">{club.instagram || "Instagram"}</span>
                      <span>↗</span>
                    </a>
                  )}

                  {club.email && (
                    <a
                      href={"mailto:" + club.email}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium text-xs border border-gray-200 dark:border-gray-700 transition-all hover:scale-102 active:scale-98 cursor-pointer"
                      title={"Email " + club.email}
                    >
                      <span>✉️</span>
                      <span className="hidden sm:inline">Email</span>
                    </a>
                  )}

                  {club.githubUrl && (
                    <a
                      href={club.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs border border-gray-200 dark:border-gray-700 transition-transform hover:scale-105"
                      title="GitHub Organization"
                    >
                      💻
                    </a>
                  )}

                  {club.linkedinUrl && (
                    <a
                      href={club.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs border border-blue-200 dark:border-blue-800 transition-transform hover:scale-105"
                      title="LinkedIn Page"
                    >
                      💼
                    </a>
                  )}
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed break-words">
                {club.description}
              </p>

              {/* Flagship Events Pills */}
              {club.flagshipEvents.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    🔥 Flagship Events &amp; Competitions:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {club.flagshipEvents.map((evt) => (
                      <span
                        key={evt}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                      >
                        ⚡ {evt}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Core Domains / Focus */}
              {club.coreActivities.length > 0 && (
                <div className="p-2.5 rounded-xl bg-gray-50/80 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 text-[11px] space-y-1">
                  <span className="font-bold text-gray-700 dark:text-gray-300 block text-[10.5px]">
                    🎯 Core Domains &amp; Activities:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-gray-600 dark:text-gray-400">
                    {club.coreActivities.map((act) => (
                      <span key={act} className="flex items-center gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{act}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Metadata: Faculty Coordinator & Contact */}
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2 flex-wrap text-[11px] text-gray-500 dark:text-gray-400">
                {club.facultyCoordinator && (
                  <span className="flex items-center gap-1">
                    <span>👨‍🏫 Faculty Coordinator:</span>
                    <strong className="text-gray-700 dark:text-gray-300">{club.facultyCoordinator}</strong>
                  </span>
                )}
                {club.email && (
                  <span className="text-gray-500 dark:text-gray-400 font-mono text-[10.5px]">
                    {club.email}
                  </span>
                )}
              </div>

              {/* Recruitment Note */}
              <div className="text-[10.5px] text-amber-800 dark:text-amber-200 bg-amber-50/70 dark:bg-amber-950/30 px-2.5 py-1.5 rounded-lg border border-amber-200/60 dark:border-amber-800/60 flex items-center gap-1.5">
                <span>📢</span>
                <span className="break-words"><strong>Recruitment / Inductions: </strong>{club.recruitmentInfo}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
