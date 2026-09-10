"use client";

import { useState, useMemo } from "react";
import { FACULTY_MEMBERS, DEPARTMENTS, FacultyMember } from "@/lib/facultyData";

export default function FacultyDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [onlyHods, setOnlyHods] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter logic
  const filteredFaculty = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return FACULTY_MEMBERS.filter((faculty) => {
      // Dept filter
      if (selectedDept !== "all" && faculty.deptKey !== selectedDept) {
        return false;
      }

      // HoD filter
      if (onlyHods && !faculty.isHod) {
        return false;
      }

      // Query filter
      if (!q) return true;

      const inName = faculty.name.toLowerCase().includes(q);
      const inDept = faculty.department.toLowerCase().includes(q);
      const inDesig = faculty.designation.toLowerCase().includes(q);
      const inEmail = faculty.email.toLowerCase().includes(q);
      const inOffice = faculty.office?.toLowerCase().includes(q) ?? false;
      const inCode = faculty.timetableCode?.toLowerCase().includes(q) ?? false;
      const inPhone = faculty.phone?.includes(q) ?? false;
      const inMobile = faculty.mobile?.includes(q) ?? false;
      const inAreas = faculty.areas.some((area) => area.toLowerCase().includes(q));

      return inName || inDept || inDesig || inEmail || inOffice || inCode || inPhone || inMobile || inAreas;
    });
  }, [searchQuery, selectedDept, onlyHods]);


  const handleCopyEmail = (id: string, email: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Department counts
  const deptCounts = useMemo(() => {
    const counts: Record<string, number> = { all: FACULTY_MEMBERS.length };
    FACULTY_MEMBERS.forEach((f) => {
      counts[f.deptKey] = (counts[f.deptKey] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="w-full max-w-full overflow-hidden min-w-0 space-y-3 select-none">
      {/* ── Search Bar ── */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, subject, code (e.g. HAZ, HSL), dept..."
          className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">
          🔍
        </span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 w-4 h-4 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            ✕
          </button>
        )}
      </div>

      {/* ── Department Filter Pills ── */}
      <div className="flex items-center flex-wrap gap-1 max-w-full min-w-0 py-0.5">
        {DEPARTMENTS.map((dept) => {
          const isSelected = selectedDept === dept.key;
          const count = deptCounts[dept.key] || 0;
          return (
            <button
              key={dept.key}
              onClick={() => setSelectedDept(dept.key)}
              className={`flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all ${
                isSelected
                  ? "bg-blue-600 border-blue-600 text-white shadow-xs font-semibold"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {"icon" in dept && <span>{dept.icon}</span>}
              <span>{dept.label}</span>
              <span className={`text-[10px] ml-0.5 px-1 rounded-full ${isSelected ? "bg-white/25 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-500"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Secondary Toolbar (Count + HoD toggle) ── */}
      <div className="flex items-center justify-between text-xs px-0.5">
        <span className="text-[11px] text-gray-500 dark:text-gray-400">
          Showing <strong className="text-gray-800 dark:text-gray-200">{filteredFaculty.length}</strong> of {FACULTY_MEMBERS.length} faculty
        </span>
        <button
          onClick={() => setOnlyHods(!onlyHods)}
          className={`text-[11px] px-2 py-0.5 rounded-md border font-medium transition-all ${
            onlyHods
              ? "bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700"
              : "bg-gray-50 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-100"
          }`}
        >
          {onlyHods ? "⭐ HoDs & Deans Only" : "Show All Roles"}
        </button>
      </div>

      {/* ── Faculty Cards List ── */}
      <div className="space-y-2">
        {filteredFaculty.length === 0 ? (
          <div className="py-8 text-center rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-dashed border-gray-200 dark:border-gray-700 p-4">
            <span className="text-3xl">👨‍🏫</span>
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-2">No faculty members found</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Try searching a different name, subject, or department</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDept("all");
                setOnlyHods(false);
              }}
              className="mt-3 text-[11px] px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredFaculty.map((f) => (
            <div
              key={f.id}
              className="rounded-2xl border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-gray-800/70 p-3 shadow-xs hover:shadow-md transition-all hover:border-blue-200 dark:hover:border-blue-800/60 space-y-2"
            >
              {/* Top Row: Avatar + Name + Badges */}
              <div className="flex items-start gap-2.5">
                {/* Initial Avatar */}
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
                  {f.name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/, "").slice(0, 2).toUpperCase()}
                </div>

                {/* Name & Title */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
                      {f.name}
                    </p>
                    {f.isHod && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-0.5">
                        ⭐ HoD / Lead
                      </span>
                    )}
                    {f.timetableCode && (
                      <span
                        onClick={() => setSearchQuery(f.timetableCode!)}
                        title="Click to search by timetable code"
                        className="text-[10px] font-mono font-semibold px-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-colors"
                      >
                        {f.timetableCode}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                    {f.designation}
                  </p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500">
                    {f.department}
                  </p>
                </div>
              </div>

              {/* Office / Cabin */}
              {f.office && (
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/60 px-2 py-1 rounded-lg">
                  <span className="text-xs">📍</span>
                  <span className="truncate">{f.office}</span>
                </div>
              )}

              {/* Research / Specialization tags */}
              {f.areas.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {f.areas.map((area) => (
                    <button
                      key={area}
                      onClick={() => setSearchQuery(area)}
                      title={`Filter faculty specializing in ${area}`}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
                    >
                      {area}
                    </button>
                  ))}
                </div>
              )}

              {/* Contact Actions Row */}
              <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1.5 border-t border-gray-100 dark:border-gray-700/60">
                {/* Email link + copy button */}
                <div className="flex items-center gap-1 min-w-0">
                  <a
                    href={`mailto:${f.email}`}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline truncate"
                  >
                    <span>📧</span>
                    <span className="truncate">{f.email}</span>
                  </a>
                  <button
                    onClick={(e) => handleCopyEmail(f.id, f.email, e)}
                    title="Copy Email"
                    className="p-1 rounded text-[11px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
                  >
                    {copiedId === f.id ? "✓ Copied" : "📋"}
                  </button>
                </div>

                {/* Phone & Mobile buttons */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {f.mobile && (
                    <a
                      href={`tel:${f.mobile}`}
                      title={`Mobile: ${f.mobile}`}
                      className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-lg bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/60 transition-colors"
                    >
                      <span>📱</span>
                      <span>{f.mobile}</span>
                    </a>
                  )}
                  {f.phone && (
                    <a
                      href={`tel:${f.phone}`}
                      title={`Office: ${f.phone}`}
                      className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/40 transition-colors"
                    >
                      <span>📞</span>
                      <span>{f.mobile ? "Office" : "Call"}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

          ))
        )}
      </div>

      {/* Footer Info */}
      <p className="text-[10px] text-center text-gray-400 dark:text-gray-500 pt-1 border-t border-gray-100 dark:border-gray-800">
        JUIT Waknaghat Faculty Directory · Data sourced from official department listings
      </p>
    </div>
  );
}
