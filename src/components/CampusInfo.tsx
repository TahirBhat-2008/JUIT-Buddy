"use client";

import { useState } from "react";
import SyllabusDirectory from "@/components/SyllabusDirectory";
import JuitWebsitesDirectory from "@/components/JuitWebsitesDirectory";
import RulesAndRegulations from "@/components/RulesAndRegulations";
import GpaCalculator from "@/components/GpaCalculator";
import BusTimetable from "@/components/BusTimetable";

export type InfoTab = "syllabus" | "calculator" | "bus" | "rules" | "contacts" | "campus";

const campusHighlights = [
  { label: "📍 Campus Location", value: "Waknaghat, P.O. Dumehar, Kandaghat, Solan, H.P. (Pin: 173234)" },
  { label: "🏔️ Top Terrace (~1560m)", value: "Admin Block, LT-1..3, Central Library LRC, Auditorium, Temple" },
  { label: "🏛️ Middle Terrace (~1550m)", value: "Academic Block I & II, Computer Labs, Faculty Cabins, Cafeteria" },
  { label: "🌲 Lower Terrace (~1540m)", value: "Civil Block (CR 13-15), Sports Ground, Basketball Court, OAT" },
  { label: "🍽️ Nearby Dhabas", value: "Waknaghat Chowk (Sharma Dhaba, Pahadi Maggi Point, Meet & Treet)" },
  { label: "🏨 Nearby Hotels", value: "Deventure Hotel (Kandaghat), Club Mahindra Kandaghat, VIP Guest House" },
];

const TABS: Array<{ id: InfoTab; label: string; icon: string }> = [
  { id: "syllabus",   label: "Syllabus",     icon: "📚" },
  { id: "calculator", label: "GPA Calc",     icon: "📊" },
  { id: "bus",        label: "Bus Timetable",icon: "🚌" },
  { id: "rules",      label: "Rules",        icon: "📜" },
  { id: "contacts",   label: "Emergency",    icon: "📞" },
  { id: "campus",     label: "Guide",        icon: "🌲" },
];

export default function CampusInfo({
  onOpenMap,
  onOpenReport,
}: {
  onOpenMap?: () => void;
  onOpenReport?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<InfoTab>("syllabus");

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 p-2.5 sm:p-3 w-full max-w-full overflow-hidden min-w-0 space-y-3">
      {/* ── Segmented Tab Selector (wrapping tile grid — nothing clipped at any width) ── */}
      <div
        className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-gray-100/80 dark:bg-gray-900/60 border border-gray-200/60 dark:border-gray-700/60 select-none"
        role="tablist"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center gap-0.5 px-1 py-2 rounded-xl text-[11px] font-semibold leading-tight transition-all cursor-pointer active:scale-95 ${
              activeTab === tab.id
                ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            <span className="text-base" aria-hidden>
              {tab.icon}
            </span>
            <span className="whitespace-nowrap">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── 1. Accurate & Modern Syllabus Directory ── */}
      {activeTab === "syllabus" && (
        <SyllabusDirectory />
      )}

      {/* ── 2. CGPA & SGPA Calculator Tab ── */}
      {activeTab === "calculator" && (
        <div className="min-w-0">
          <GpaCalculator />
        </div>
      )}

      {/* ── 3. Bus Timetable Tab ── */}
      {activeTab === "bus" && (
        <div className="min-w-0">
          <BusTimetable />
        </div>
      )}

      {/* ── 4. Rules & Regulations Tab ── */}
      {activeTab === "rules" && (
        <div className="min-w-0">
          <RulesAndRegulations />
        </div>
      )}

      {/* ── 5. Portals & Emergency Contacts Tab ── */}
      {activeTab === "contacts" && (
        <div className="min-w-0">
          <JuitWebsitesDirectory onOpenReport={onOpenReport} />
        </div>
      )}

      {/* ── 6. Campus & Nearby Guide Tab ── */}
      {activeTab === "campus" && (
        <div className="space-y-3 min-w-0">
          {onOpenMap && (
            <button
              type="button"
              onClick={onOpenMap}
              className="w-full text-left p-3 rounded-xl border border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 via-indigo-50 to-white dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-gray-900 hover:from-blue-100 dark:hover:from-blue-900/40 transition-all cursor-pointer shadow-2xs group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900 dark:text-blue-100 flex items-center gap-1.5">
                  <span>🗺️</span>
                  <span>Interactive 3D Campus Map Guide</span>
                </span>
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                  Open Map →
                </span>
              </div>
              <span className="block text-[11px] text-gray-600 dark:text-gray-300 mt-0.5 leading-relaxed">
                Click to explore interactive terrace locations, classroom rooms, academic blocks, hostels, and LRC.
              </span>
            </button>
          )}

          <div className="space-y-1.5 pt-1">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 block">
              🏔️ Campus Layout, Elevations & Local Points:
            </span>
            <div className="space-y-1.5">
              {campusHighlights.map((info) => (
                <div
                  key={info.label}
                  className="p-2.5 rounded-xl bg-gray-50/90 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700/60 text-xs space-y-0.5"
                >
                  <p className="font-bold text-gray-900 dark:text-white text-[11.5px]">{info.label}</p>
                  <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">{info.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
