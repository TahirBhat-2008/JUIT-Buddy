"use client";

import { useState, useMemo } from "react";
import {
  JUIT_RULES,
  JUIT_RULE_CATEGORIES,
  JuitRuleItem,
} from "@/lib/juitRulesData";

export default function RulesAndRegulations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>("att-80-percent");

  const filteredRules = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return JUIT_RULES.filter((rule) => {
      const matchesCategory =
        activeCategory === "all" || rule.category === activeCategory;
      if (!matchesCategory) return false;

      if (!q) return true;
      return (
        rule.title.toLowerCase().includes(q) ||
        rule.summary.toLowerCase().includes(q) ||
        rule.badge.toLowerCase().includes(q) ||
        rule.keyPoints.some((p) => p.toLowerCase().includes(q)) ||
        (rule.penalty && rule.penalty.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, activeCategory]);

  const getSeverityStyle = (severity: JuitRuleItem["severity"]) => {
    switch (severity) {
      case "critical":
        return {
          cardBorder: "border-rose-200 dark:border-rose-900/60 hover:border-rose-400",
          iconBg: "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800",
          badge: "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
          penaltyBox: "bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/60 text-rose-800 dark:text-rose-200",
        };
      case "warning":
        return {
          cardBorder: "border-amber-200 dark:border-amber-900/60 hover:border-amber-400",
          iconBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
          badge: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
          penaltyBox: "bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-200",
        };
      default:
        return {
          cardBorder: "border-blue-200 dark:border-blue-900/60 hover:border-blue-400",
          iconBg: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
          badge: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
          penaltyBox: "bg-blue-50/70 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/60 text-blue-800 dark:text-blue-200",
        };
    }
  };

  return (
    <div className="space-y-4 max-w-full min-w-0 overflow-hidden">
      {/* Quick Summary Banner */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-200 dark:border-blue-800/60 flex items-start gap-3 min-w-0">
        <span className="text-2xl flex-shrink-0">📜</span>
        <div className="min-w-0 flex-1">
          <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100">
            Official JUIT Ordinances, Rules & Code of Conduct
          </h4>
          <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-0.5 leading-relaxed">
            Essential policies regarding mandatory <strong>80% attendance</strong>, hostel curfews, anti-ragging mandates, examination grading, and campus decorum.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          🔍
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search rules (attendance, curfew, medical leave, ragging, dress code...)"
          className="w-full pl-10 pr-9 py-2.5 bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs p-1"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-1.5 text-xs max-w-full min-w-0">
        {JUIT_RULE_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count =
            cat.id === "all"
              ? JUIT_RULES.length
              : JUIT_RULES.filter((r) => r.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
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

      {/* Rules Count Indicator */}
      <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 px-0.5">
        <span>
          Showing <strong>{filteredRules.length}</strong> university regulations
        </span>
        <span className="text-[10px]">Click any card to expand details</span>
      </div>

      {/* Rules Listing */}
      {filteredRules.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
          <span className="text-3xl block mb-2">🔍</span>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            No JUIT rules found matching &quot;{searchQuery}&quot;
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}
            className="mt-3 text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Reset filters & search
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRules.map((rule) => {
            const styles = getSeverityStyle(rule.severity);
            const isExpanded = expandedId === rule.id;

            return (
              <div
                key={rule.id}
                className={`rounded-2xl border bg-white dark:bg-gray-800/90 shadow-sm transition-all duration-200 ${styles.cardBorder} ${
                  isExpanded ? "ring-2 ring-blue-500/10 dark:ring-blue-500/20 shadow-md" : ""
                }`}
              >
                {/* Header (Always Clickable) */}
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : rule.id)}
                  className="w-full text-left p-3.5 flex items-start gap-3 justify-between"
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center text-lg flex-shrink-0 shadow-2xs ${styles.iconBg}`}
                    >
                      {rule.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100">
                          {rule.title}
                        </h4>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${styles.badge}`}
                        >
                          {rule.badge}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2 leading-relaxed">
                        {rule.summary}
                      </p>
                    </div>
                  </div>

                  <span className="text-gray-400 text-sm flex-shrink-0 ml-2 pt-1 transition-transform duration-200">
                    {isExpanded ? "▲" : "▼"}
                  </span>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-3.5 pb-3.5 pt-1 space-y-3 border-t border-gray-100 dark:border-gray-700/60 mt-1">
                    {/* Key Regulations List */}
                    <div>
                      <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
                        Key Regulations & Provisions:
                      </p>
                      <ul className="space-y-1.5">
                        {rule.keyPoints.map((point, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-200 leading-relaxed"
                          >
                            <span className="text-blue-500 font-bold mt-0.5">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Penalty Alert Box */}
                    {rule.penalty && (
                      <div
                        className={`p-2.5 rounded-xl border flex items-start gap-2 ${styles.penaltyBox}`}
                      >
                        <span className="text-sm flex-shrink-0">⚠️</span>
                        <div className="min-w-0 flex-1 text-[11px]">
                          <strong className="font-semibold">Violation Consequence / Penalty: </strong>
                          <span>{rule.penalty}</span>
                        </div>
                      </div>
                    )}

                    {/* Footer / Official Ref */}
                    {rule.officialRef && (
                      <div className="flex items-center justify-between pt-1 text-[10px] text-gray-400 dark:text-gray-500 font-mono">
                        <span>Official Reference:</span>
                        <span>{rule.officialRef}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
