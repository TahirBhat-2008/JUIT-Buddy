"use client";

import { useState, useMemo } from "react";
import {
  SYLLABUS_YEARS,
  JUIT_SYLLABUS_SEMESTERS,
  SyllabusSubject,
  SyllabusSemester,
} from "@/lib/syllabusData";
import { SYLLABUS_DETAILS } from "@/lib/syllabusDetails";
import SyllabusDetail from "@/components/SyllabusDetail";

const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  PCC: { bg: "bg-indigo-50 dark:bg-indigo-950/40", text: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-200 dark:border-indigo-800" },
  BSC: { bg: "bg-blue-50 dark:bg-blue-950/40",     text: "text-blue-700 dark:text-blue-300",     border: "border-blue-200 dark:border-blue-800" },
  ESC: { bg: "bg-cyan-50 dark:bg-cyan-950/40",     text: "text-cyan-700 dark:text-cyan-300",     border: "border-cyan-200 dark:border-cyan-800" },
  HSC: { bg: "bg-amber-50 dark:bg-amber-950/40",   text: "text-amber-700 dark:text-amber-300",   border: "border-amber-200 dark:border-amber-800" },
  PEC: { bg: "bg-purple-50 dark:bg-purple-950/40", text: "text-purple-700 dark:text-purple-300", border: "border-purple-200 dark:border-purple-800" },
  OEC: { bg: "bg-pink-50 dark:bg-pink-950/40",     text: "text-pink-700 dark:text-pink-300",     border: "border-pink-200 dark:border-pink-800" },
  PRC: { bg: "bg-emerald-50 dark:bg-emerald-950/40", text: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-800" },
  OMC: { bg: "bg-gray-100 dark:bg-gray-800",       text: "text-gray-700 dark:text-gray-300",     border: "border-gray-300 dark:border-gray-700" },
  Audit: { bg: "bg-gray-100 dark:bg-gray-800",     text: "text-gray-600 dark:text-gray-400",     border: "border-gray-300 dark:border-gray-700" },
};

const CATEGORY_NAMES: Record<string, string> = {
  PCC: "Core Computer Science",
  BSC: "Basic Sciences",
  ESC: "Engineering Science",
  HSC: "Humanities & Social Sciences",
  PEC: "Professional Elective",
  OEC: "Open Elective",
  PRC: "Project & Internship",
  OMC: "Mandatory Non-Credit",
  Audit: "Audit Course",
};

const OFFICIAL_PDF = "https://www.juit.ac.in/Syllabus2026/BTech_CSE_Course_Structure_2026_Batch_Onwards.pdf";

export default function SyllabusDirectory() {
  const [activeYear, setActiveYear] = useState<1 | 2 | 3 | 4>(2);
  const [activeSemNum, setActiveSemNum] = useState<number>(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "theory" | "lab" | "elective" | "project">("all");
  const [selectedCourseName, setSelectedCourseName] = useState<string | null>(null);

  // When year changes, auto-select its first semester
  const handleYearChange = (year: 1 | 2 | 3 | 4) => {
    setActiveYear(year);
    const yr = SYLLABUS_YEARS.find((y) => y.year === year);
    if (yr) {
      setActiveSemNum(yr.semesters[0]);
    }
  };

  const currentYearObj = SYLLABUS_YEARS.find((y) => y.year === activeYear) || SYLLABUS_YEARS[1];
  const currentSem = JUIT_SYLLABUS_SEMESTERS.find((s) => s.semNumber === activeSemNum) || JUIT_SYLLABUS_SEMESTERS[2];

  // If search query is active, search across ALL 8 semesters for convenience
  const isSearching = searchQuery.trim().length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const q = searchQuery.trim().toLowerCase();

    const results: Array<{ subject: SyllabusSubject; semNumber: number; semLabel: string }> = [];
    for (const sem of JUIT_SYLLABUS_SEMESTERS) {
      for (const sub of sem.subjects) {
        const matchesType =
          filterType === "all" ||
          (filterType === "theory" && (sub.type === "theory" || sub.type === "other")) ||
          (filterType === "lab" && sub.type === "lab") ||
          (filterType === "elective" && sub.type === "elective") ||
          (filterType === "project" && sub.type === "project");

        if (!matchesType) continue;

        const inName = sub.name.toLowerCase().includes(q);
        const inCode = sub.code.toLowerCase().includes(q);
        const inDesc = sub.description.toLowerCase().includes(q);
        const inOptions = sub.electiveOptions?.some((o) => o.toLowerCase().includes(q)) || false;

        if (inName || inCode || inDesc || inOptions) {
          results.push({
            subject: sub,
            semNumber: sem.semNumber,
            semLabel: sem.label,
          });
        }
      }
    }
    return results;
  }, [searchQuery, filterType, isSearching]);

  // Filter subjects for the currently active semester
  const semesterSubjects = useMemo(() => {
    return currentSem.subjects.filter((sub) => {
      const matchesType =
        filterType === "all" ||
        (filterType === "theory" && (sub.type === "theory" || sub.type === "other")) ||
        (filterType === "lab" && sub.type === "lab") ||
        (filterType === "elective" && sub.type === "elective") ||
        (filterType === "project" && sub.type === "project");

      return matchesType;
    });
  }, [currentSem, filterType]);

  // Group semester subjects into categories
  const theorySubjects = semesterSubjects.filter((s) => s.type === "theory" || s.type === "other");
  const labSubjects = semesterSubjects.filter((s) => s.type === "lab");
  const electiveOrProjectSubjects = semesterSubjects.filter((s) => s.type === "elective" || s.type === "project");

  // If a detailed course is selected, render SyllabusDetail
  if (selectedCourseName) {
    const detail = SYLLABUS_DETAILS[selectedCourseName];
    if (detail) {
      return (
        <SyllabusDetail
          course={detail}
          onBack={() => setSelectedCourseName(null)}
        />
      );
    }
  }

  return (
    <div className="space-y-3 w-full max-w-full min-w-0 overflow-hidden">
      {/* ── 1. Top Title & Quick Portals Bar ── */}
      <div className="rounded-xl bg-gradient-to-br from-blue-50/90 via-indigo-50/40 to-white dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900 border border-blue-100/90 dark:border-blue-900/40 p-2.5 sm:p-3 shadow-2xs space-y-2 min-w-0 max-w-full overflow-hidden">
        <div className="flex items-center justify-between gap-1.5 min-w-0">
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <span className="text-base flex-shrink-0">📚</span>
            <h2 className="font-extrabold text-xs sm:text-sm text-gray-900 dark:text-white tracking-tight truncate">
              B.Tech CSE Curriculum
            </h2>
          </div>
          <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex-shrink-0 whitespace-nowrap">
            All 8 Sems
          </span>
        </div>

        <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug break-words">
          Accurate syllabus regulations, (L-T-P) hours, unit topics, textbooks & evaluation.
        </p>

        {/* Direct official links - 3 column grid that never overflows */}
        <div className="grid grid-cols-3 gap-1.5 pt-0.5 min-w-0">
          <a
            href={OFFICIAL_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 px-1.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[10.5px] font-semibold transition-colors text-center shadow-2xs min-w-0"
            title="Download official Academic Council B.Tech CSE Curriculum PDF"
          >
            <span>📄</span>
            <span className="truncate">Syllabus PDF</span>
            <span className="text-[9px]">↗</span>
          </a>
          <a
            href="https://lms.juit.ac.in/login/index.php"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 px-1.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-[10.5px] font-semibold transition-colors text-center shadow-2xs min-w-0"
            title="Open JUIT LMS Moodle Portal"
          >
            <span>🎓</span>
            <span className="truncate">Moodle</span>
            <span className="text-[9px]">↗</span>
          </a>
          <a
            href="https://www.juit.ac.in/examination-cell-question-paper-bank"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 px-1.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[10.5px] font-semibold transition-colors text-center shadow-2xs min-w-0"
            title="Previous Year Question Papers (PYQ Archive)"
          >
            <span>📁</span>
            <span className="truncate">PYQs</span>
            <span className="text-[9px]">↗</span>
          </a>
        </div>
      </div>

      {/* ── 2. Academic Year Tabs (4 Columns - Clean & Perfectly Spaced) ── */}
      <div className="space-y-1.5 min-w-0 max-w-full">
        <div className="flex items-center justify-between px-0.5 text-[10.5px] min-w-0">
          <span className="font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 flex-shrink-0">
            Select Year
          </span>
          <span className="text-blue-600 dark:text-blue-400 font-semibold truncate ml-2">
            {currentYearObj.stage}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-gray-100/90 dark:bg-gray-900/80 border border-gray-200/80 dark:border-gray-800 select-none min-w-0">
          {SYLLABUS_YEARS.map((yr) => {
            const isSelected = activeYear === yr.year;
            return (
              <button
                key={yr.year}
                type="button"
                onClick={() => handleYearChange(yr.year)}
                className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-lg text-center transition-all cursor-pointer select-none active:scale-95 min-w-0 ${
                  isSelected
                    ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-200/80 dark:border-blue-800 font-bold"
                    : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/40 font-medium"
                }`}
              >
                <span className="text-xs font-bold leading-tight whitespace-nowrap">Yr {yr.year}</span>
                <span className="text-[9px] opacity-75 whitespace-nowrap leading-tight mt-0.5">
                  Sem {yr.semesters[0]}&amp;{yr.semesters[1]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 3. Semester Sub-Selector (2 Columns with Proper Truncation) ── */}
      <div className="space-y-1.5 min-w-0 max-w-full">
        <div className="flex items-center justify-between px-0.5 text-[10.5px] min-w-0">
          <span className="font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 flex-shrink-0">
            Semester
          </span>
          <span className="text-gray-500 dark:text-gray-400 font-medium truncate ml-2">
            {currentSem.totalCredits} Credits · {currentSem.subjects.length} Courses
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 min-w-0">
          {currentYearObj.semesters.map((semNum) => {
            const sem = JUIT_SYLLABUS_SEMESTERS.find((s) => s.semNumber === semNum)!;
            const isSelected = activeSemNum === semNum;
            return (
              <button
                key={semNum}
                type="button"
                onClick={() => setActiveSemNum(semNum)}
                className={`p-2 rounded-xl border text-left transition-all cursor-pointer relative select-none active:scale-[0.98] min-w-0 overflow-hidden ${
                  isSelected
                    ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-transparent shadow-sm"
                    : "bg-white dark:bg-gray-800 border-gray-200/80 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-blue-400"
                }`}
              >
                <div className="flex items-center justify-between gap-1 min-w-0">
                  <span className="text-xs font-bold truncate">{sem.label}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-semibold flex-shrink-0 whitespace-nowrap ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {sem.totalCredits} C
                  </span>
                </div>
                <p
                  className={`text-[10px] mt-0.5 truncate leading-tight ${
                    isSelected ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {sem.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 4. Search & Responsive Filter Chips (Wrapped - Never Cut Off) ── */}
      <div className="space-y-1.5 pt-0.5 min-w-0 max-w-full">
        {/* Search Input Box */}
        <div className="relative min-w-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subjects or codes (e.g. 25B11CI318)..."
            className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all min-w-0"
          />
          <span className="absolute left-2.5 top-2 text-xs text-gray-400 pointer-events-none">
            🔍
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1.5 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer p-0.5"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Chips: Flex-Wrap so chips neatly fit without horizontal cutting */}
        <div className="flex flex-wrap gap-1 select-none min-w-0 pt-0.5">
          {[
            { id: "all", label: "All", count: isSearching ? searchResults.length : currentSem.subjects.length, icon: "🌐" },
            { id: "theory", label: "Theory", count: isSearching ? searchResults.filter(r => r.subject.type === "theory" || r.subject.type === "other").length : currentSem.subjects.filter((s) => s.type === "theory" || s.type === "other").length, icon: "📘" },
            { id: "lab", label: "Labs", count: isSearching ? searchResults.filter(r => r.subject.type === "lab").length : currentSem.subjects.filter((s) => s.type === "lab").length, icon: "🧪" },
            { id: "elective", label: "Electives", count: isSearching ? searchResults.filter(r => r.subject.type === "elective").length : currentSem.subjects.filter((s) => s.type === "elective").length, icon: "🎯" },
            { id: "project", label: "Projects", count: isSearching ? searchResults.filter(r => r.subject.type === "project").length : currentSem.subjects.filter((s) => s.type === "project").length, icon: "💼" },
          ].map((chip) => {
            const isActive = filterType === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setFilterType(chip.id as any)}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10.5px] font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-2xs"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <span className="text-[11px]">{chip.icon}</span>
                <span>{chip.label}</span>
                <span className={`text-[9.5px] px-1 py-0.2 rounded-full font-bold ${
                  isActive ? "bg-white/25 text-white" : "bg-gray-200/80 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}>
                  {chip.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 5. Course Cards (Live Search Results or Grouped Semester View) ── */}
      {isSearching ? (
        searchResults.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-6 text-center bg-gray-50/50 dark:bg-gray-900/30 min-w-0">
            <span className="text-2xl block mb-1">🔍</span>
            <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
              No courses match "{searchQuery}"
            </p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
              Try a different keyword or course code (e.g. 25B11CI318).
            </p>
            <button
              onClick={() => { setSearchQuery(""); setFilterType("all"); }}
              className="mt-2.5 px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-semibold cursor-pointer hover:bg-blue-700 transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="space-y-2 min-w-0">
            <div className="flex items-center justify-between px-0.5 text-[11px] font-bold text-blue-600 dark:text-blue-400 min-w-0">
              <span className="truncate">✨ Found {searchResults.length} matching courses across 8 semesters</span>
              <button
                onClick={() => setSearchQuery("")}
                className="text-[10px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 underline cursor-pointer flex-shrink-0 ml-2"
              >
                Back to {currentSem.label}
              </button>
            </div>
            <div className="space-y-1.5 min-w-0">
              {searchResults.map(({ subject, semLabel }) => (
                <SubjectCard
                  key={subject.code + semLabel}
                  subject={subject}
                  extraBadge={semLabel}
                  onSelect={() => setSelectedCourseName(subject.name)}
                />
              ))}
            </div>
          </div>
        )
      ) : (
        <div className="space-y-2.5 min-w-0 max-w-full">
          {/* Group 1: Theory Courses */}
          {theorySubjects.length > 0 && (
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center justify-between px-0.5 min-w-0">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1 truncate">
                  <span>📘</span>
                  <span>Core &amp; Theory ({theorySubjects.length})</span>
                </span>
                <span className="text-[9.5px] text-gray-400 flex-shrink-0">Click to view details</span>
              </div>
              <div className="space-y-1.5 min-w-0">
                {theorySubjects.map((sub) => (
                  <SubjectCard
                    key={sub.code}
                    subject={sub}
                    onSelect={() => setSelectedCourseName(sub.name)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Group 2: Practical Labs */}
          {labSubjects.length > 0 && (
            <div className="space-y-1.5 pt-0.5 min-w-0">
              <div className="flex items-center justify-between px-0.5 min-w-0">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1 truncate">
                  <span>🧪</span>
                  <span>Practical Laboratories ({labSubjects.length})</span>
                </span>
                <span className="text-[9.5px] text-gray-400 flex-shrink-0">Hands-on coding</span>
              </div>
              <div className="space-y-1.5 min-w-0">
                {labSubjects.map((sub) => (
                  <SubjectCard
                    key={sub.code}
                    subject={sub}
                    onSelect={() => setSelectedCourseName(sub.name)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Group 3: Electives & Capstone Projects */}
          {electiveOrProjectSubjects.length > 0 && (
            <div className="space-y-1.5 pt-0.5 min-w-0">
              <div className="flex items-center justify-between px-0.5 min-w-0">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1 truncate">
                  <span>🎯</span>
                  <span>Electives &amp; Capstones ({electiveOrProjectSubjects.length})</span>
                </span>
                <span className="text-[9.5px] text-gray-400 flex-shrink-0">Track options</span>
              </div>
              <div className="space-y-1.5 min-w-0">
                {electiveOrProjectSubjects.map((sub) => (
                  <SubjectCard
                    key={sub.code}
                    subject={sub}
                    onSelect={() => setSelectedCourseName(sub.name)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── 6. Category Legend (Collapsible to save vertical space & prevent clutter) ── */}
      <details className="group p-2.5 rounded-xl bg-gray-50/80 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 text-[10px] min-w-0 overflow-hidden">
        <summary className="font-bold text-gray-700 dark:text-gray-300 cursor-pointer list-none flex items-center justify-between select-none">
          <span>🏷️ Curriculum Category Codes &amp; Legend</span>
          <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
        </summary>
        <div className="grid grid-cols-2 gap-1.5 pt-2 min-w-0">
          {Object.entries(CATEGORY_NAMES).map(([key, name]) => {
            const style = CATEGORY_STYLES[key] || CATEGORY_STYLES.OMC;
            return (
              <div
                key={key}
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded border ${style.bg} ${style.border} min-w-0`}
              >
                <strong className={`font-mono font-bold text-[9px] ${style.text}`}>{key}</strong>
                <span className="text-[9.5px] text-gray-600 dark:text-gray-300 truncate">{name}</span>
              </div>
            );
          })}
        </div>
      </details>

      {/* ── 7. AI Accuracy Disclaimer ── */}
      <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200/80 dark:border-amber-900/40 text-[10.5px] text-amber-800 dark:text-amber-200/90 flex items-start gap-2 min-w-0">
        <span className="text-xs flex-shrink-0 mt-0.5">⚠️</span>
        <p className="leading-relaxed min-w-0 break-words">
          <strong className="font-semibold">Note:</strong> This AI can make mistakes. Always cross-verify critical syllabus details, exam evaluation weightages, and credits with official JUIT notices.
        </p>
      </div>
    </div>
  );
}

function SubjectCard({
  subject,
  extraBadge,
  onSelect,
}: {
  subject: SyllabusSubject;
  extraBadge?: string;
  onSelect: () => void;
}) {
  const catStyle = CATEGORY_STYLES[subject.category] || CATEGORY_STYLES.OMC;

  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full text-left group relative rounded-xl border border-gray-200/80 dark:border-gray-700/70 bg-white dark:bg-slate-800/90 hover:border-blue-400 dark:hover:border-blue-500 p-2.5 sm:p-3 transition-all duration-150 hover:shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/40 min-w-0 overflow-hidden max-w-full"
    >
      <div className="flex items-start justify-between gap-1.5 min-w-0">
        <div className="min-w-0 flex-1 space-y-1">
          {/* Top Row: Code, Category, L-T-P, and Credits aligned */}
          <div className="flex items-center justify-between gap-1 min-w-0">
            <div className="flex items-center gap-1 flex-wrap min-w-0">
              {extraBadge && (
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex-shrink-0">
                  {extraBadge}
                </span>
              )}
              <span className="font-mono text-[9.5px] font-bold px-1.5 py-0.2 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 flex-shrink-0">
                {subject.code}
              </span>
              <span
                className={`text-[9px] font-bold px-1.5 py-0.2 rounded border flex-shrink-0 ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
              >
                {subject.category}
              </span>
              {subject.lectureHours && (
                <span className="text-[9.5px] text-gray-400 dark:text-gray-500 font-mono flex-shrink-0">
                  ({subject.lectureHours})
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 flex-shrink-0 whitespace-nowrap pl-1">
              {subject.credits} {subject.credits === "Qualifying" ? "" : "C"}
            </span>
          </div>

          {/* Subject Title */}
          <h3 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug break-words">
            {subject.name}
          </h3>

          {/* Subject Description */}
          <p className="text-[10.5px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed break-words">
            {subject.description}
          </p>

          {/* Elective options preview if available */}
          {subject.electiveOptions && subject.electiveOptions.length > 0 && (
            <div className="pt-0.5 space-y-0.5 min-w-0">
              <span className="text-[9.5px] font-bold text-purple-700 dark:text-purple-300 block">
                Tracks:
              </span>
              <div className="text-[10px] text-gray-600 dark:text-gray-300 flex flex-wrap gap-x-2 gap-y-0.5 min-w-0">
                {subject.electiveOptions.map((opt, i) => (
                  <span key={i} className="inline-flex items-center gap-1 min-w-0 break-words">
                    <span className="text-gray-400 flex-shrink-0">•</span>
                    <span className="break-words">{opt}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Arrow Action Indicator */}
        <div className="flex items-center justify-center pl-0.5 flex-shrink-0 self-center">
          <span className="w-5 h-5 rounded-md bg-gray-50 dark:bg-gray-700 group-hover:bg-blue-600 group-hover:text-white text-gray-400 dark:text-gray-300 flex items-center justify-center text-[11px] font-bold transition-colors">
            →
          </span>
        </div>
      </div>
    </button>
  );
}
