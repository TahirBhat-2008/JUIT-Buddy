"use client";

import { useEffect, useState, useMemo } from "react";
import { TimetableData, TimetableEntry, DayKey, FALLBACK_TIMETABLE } from "@/lib/juitData";
import subjectNamesMap from "@/lib/subjectNames.json";
import { FACULTY_MEMBERS } from "@/lib/facultyData";

const days: DayKey[] = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];

const dayLabels: Record<DayKey, string> = {
  MON: "Mon",
  TUE: "Tue",
  WED: "Wed",
  THU: "Thu",
  FRI: "Fri",
  SAT: "Sat",
  SUN: "Sun",
};

export type AcademicYear = "1" | "2" | "3" | "4";

interface YearConfig {
  yearNum: AcademicYear;
  title: string;
  semester: string;
  admissionYear: string;
  defaultBatch: string;
  branches: {
    name: string;
    batches: string[];
  }[];
}

const YEAR_CONFIGS: Record<AcademicYear, YearConfig> = {
  "1": {
    yearNum: "1",
    title: "1st Year",
    semester: "Sem 1 & 2",
    admissionYear: "2026 Batch",
    defaultBatch: "26BT11",
    branches: [
      {
        name: "Common Sections",
        batches: ["26BT11", "26BT12", "26BT13", "26BT14", "26BT15"],
      },
      {
        name: "Batches 01–10",
        batches: ["26BT01", "26BT02", "26BT03", "26BT04", "26BT05", "26BT06", "26BT07", "26BT08", "26BT09", "26BT10"],
      },
      {
        name: "Batches 16–29 & Others",
        batches: [
          "26BT16", "26BT17", "26BT18", "26BT19", "26BT20",
          "26BT21", "26BT22", "26BT23", "26BT24", "26BT25",
          "26BT26", "26BT27", "26BT28", "26BT29",
          "26W11", "26R11"
        ],
      },
    ],
  },
  "2": {
    yearNum: "2",
    title: "2nd Year",
    semester: "Sem 3 & 4",
    admissionYear: "2025 Batch",
    defaultBatch: "25A11",
    branches: [
      {
        name: "CSE Core",
        batches: ["25A11", "25A12", "25A13", "25A14", "25A15", "25A16", "25A17", "25A18", "25A19", "25B11", "25C11"],
      },
      {
        name: "IT & Specialization (AI / DS / Cloud)",
        batches: ["25D11", "25E11", "25E12", "25F11"],
      },
      {
        name: "ECE",
        batches: ["25G11", "25H11", "EEV"],
      },
      {
        name: "Civil Engineering",
        batches: ["25I11", "25I12", "25I13", "25I14", "25I15", "25I16", "25I17"],
      },
      {
        name: "Biotech & Bioinfo",
        batches: ["25J11", "25J12", "25K11", "25L11"],
      },
      {
        name: "Others",
        batches: ["25N11", "25W11"],
      },
    ],
  },
  "3": {
    yearNum: "3",
    title: "3rd Year",
    semester: "Sem 5 & 6",
    admissionYear: "2024 Batch",
    defaultBatch: "24A11",
    branches: [
      {
        name: "CSE Core",
        batches: ["24A11", "24A12", "24A13", "24A14", "24A15", "24A16", "24A17", "24A18", "24A19", "24B11", "24C11"],
      },
      {
        name: "IT & Specialization",
        batches: ["24D11", "24E11", "24F11"],
      },
      {
        name: "ECE",
        batches: ["24G11", "24H11"],
      },
      {
        name: "Civil Engineering",
        batches: ["24I11", "24I12", "24I13"],
      },
      {
        name: "Biotech & Bioinfo",
        batches: ["24J11", "24J12", "24K11", "24L11", "24P11", "24W11"],
      },
    ],
  },
  "4": {
    yearNum: "4",
    title: "4th Year",
    semester: "Sem 7 & 8",
    admissionYear: "2023 Batch",
    defaultBatch: "23A11",
    branches: [
      {
        name: "CSE Core",
        batches: ["23A11", "23A12", "23A13", "23A14", "23A15", "23A16", "23A17", "23A18", "23B11", "23C11"],
      },
      {
        name: "IT & Specialization",
        batches: ["23D11", "23E11"],
      },
      {
        name: "ECE",
        batches: ["23G11", "23H11"],
      },
      {
        name: "Civil Engineering",
        batches: ["23I11", "23I12"],
      },
      {
        name: "Biotech & Bioinfo",
        batches: ["23J11", "23J12", "23K11"],
      },
    ],
  },
};

function detectYearFromBatch(b: string): AcademicYear {
  const clean = b.trim().toUpperCase();
  if (clean.startsWith("25")) return "2";
  if (clean.startsWith("24")) return "3";
  if (clean.startsWith("23")) return "4";
  return "1";
}

// Map faculty acronyms to full names
const facultyLookup: Record<string, string> = {};
FACULTY_MEMBERS.forEach((f) => {
  if (f.timetableCode) {
    facultyLookup[f.timetableCode.toUpperCase()] = f.name;
  }
});

function getFacultyName(code: string): string {
  if (!code) return "Faculty";
  const parts = code.split(",").map((p) => p.trim().toUpperCase());
  const names = parts.map((p) => facultyLookup[p] || p);
  return names.join(", ");
}

function getSubjectTitle(code: string): string {
  if (!code) return "Class";
  const mapped = (subjectNamesMap as Record<string, string>)[code];
  if (mapped) return mapped;
  const clean = code.split("/")[0];
  if ((subjectNamesMap as Record<string, string>)[clean]) {
    return (subjectNamesMap as Record<string, string>)[clean];
  }
  return code;
}

const typeColors: Record<TimetableEntry["classType"], string> = {
  L: "bg-blue-50/80 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200 border-blue-200/80 dark:border-blue-800/60",
  T: "bg-purple-50/80 dark:bg-purple-950/30 text-purple-900 dark:text-purple-200 border-purple-200/80 dark:border-purple-800/60",
  P: "bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 border-emerald-200/80 dark:border-emerald-800/60",
};

const typeBadges: Record<TimetableEntry["classType"], { label: string; style: string }> = {
  L: { label: "Lecture", style: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30" },
  T: { label: "Tutorial", style: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30" },
  P: { label: "Lab", style: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30" },
};

export default function Timetable({ batch: batchProp }: { batch?: string }) {
  const initialYear = detectYearFromBatch(batchProp || "26BT11");
  const [selectedYear, setSelectedYear] = useState<AcademicYear>(initialYear);
  const [selectedBranch, setSelectedBranch] = useState<string>("All");
  const [batch, setBatch] = useState(batchProp || "26BT11");
  const [customInput, setCustomInput] = useState(batchProp || "26BT11");
  const [selectedDay, setSelectedDay] = useState<DayKey>(() => {
    const today = new Date().getDay();
    return (days[today === 0 ? 5 : today - 1] || "MON") as DayKey;
  });
  const [timetable, setTimetable] = useState<TimetableData>(FALLBACK_TIMETABLE);
  const [loading, setLoading] = useState(false);
  const [live, setLive] = useState(false);
  const [localCache, setLocalCache] = useState<Record<string, TimetableData>>({});

  const yearConfig = YEAR_CONFIGS[selectedYear];

  // Sync when parent batch changes
  useEffect(() => {
    if (batchProp && batchProp.trim().length >= 4) {
      const clean = batchProp.trim().toUpperCase();
      setBatch(clean);
      setCustomInput(clean);
      setSelectedYear(detectYearFromBatch(clean));
    }
  }, [batchProp]);

  // Handle switching years
  const handleSelectYear = (year: AcademicYear) => {
    setSelectedYear(year);
    setSelectedBranch("All");
    const targetBatch = YEAR_CONFIGS[year].defaultBatch;
    setBatch(targetBatch);
    setCustomInput(targetBatch);
  };

  // Fetch timetable on batch change with instant local cache
  useEffect(() => {
    if (!batch || batch.length < 4) return;

    if (localCache[batch]) {
      setTimetable(localCache[batch]);
      setLive(true);
      return;
    }

    let cancelled = false;
    setLoading(true);
    fetch(`/api/timetable?batch=${encodeURIComponent(batch)}`)
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return;
        if (json.data && Object.keys(json.data).length > 0) {
          setTimetable(json.data);
          setLocalCache((prev) => ({ ...prev, [batch]: json.data }));
          setLive(true);
        }
      })
      .catch(() => {
        // Handled by API fallback
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [batch, localCache]);


  const filteredEntries = useMemo(() => {
    return (timetable[selectedDay] || [])
      .slice()
      .sort((a, b) => a.slot - b.slot);
  }, [timetable, selectedDay]);

  // Current year's branches and available batches
  const availableBatches = useMemo(() => {
    if (selectedBranch === "All") {
      return yearConfig.branches.flatMap((b) => b.batches);
    }
    const found = yearConfig.branches.find((b) => b.name === selectedBranch);
    return found ? found.batches : [];
  }, [yearConfig, selectedBranch]);

  const todayIndex = new Date().getDay();
  const currentTodayKey = days[todayIndex === 0 ? 5 : todayIndex - 1] as DayKey;

  return (
    <div className="w-full max-w-full overflow-hidden min-w-0 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-sm p-4 space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-1.5">
            <span>📅</span>
            <span>Weekly Timetable</span>
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {yearConfig.title} • {yearConfig.semester} • <span className="font-semibold text-blue-600 dark:text-blue-400">{batch}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
              live
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-500/30"
                : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-500/30"
            }`}
            title={live ? "Loaded live from juittimetable.me" : "Showing verified saved snapshot"}
          >
            {live ? "● Live" : loading ? "Loading..." : "Snapshot"}
          </span>
        </div>
      </div>

      {/* 1. Academic Year Navigation Tabs */}
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5 flex items-center justify-between">
          <span>Select Academic Year</span>
          <span className="text-[10px] text-gray-400 font-normal">All 4 Years Available</span>
        </div>
        <div className="grid grid-cols-4 gap-1 p-1 bg-gray-100 dark:bg-gray-800/70 rounded-xl">
          {(["1", "2", "3", "4"] as AcademicYear[]).map((y) => {
            const isSelected = selectedYear === y;
            const cfg = YEAR_CONFIGS[y];
            return (
              <button
                key={y}
                onClick={() => handleSelectYear(y)}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center ${
                  isSelected
                    ? "bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-xs scale-[1.02]"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <div className="font-bold">{cfg.title}</div>
                <div className="text-[9px] opacity-70 font-normal">{cfg.admissionYear.split(" ")[0]}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Branch Filter (for 2nd, 3rd, 4th Year) */}
      {yearConfig.branches.length > 1 && (
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
            Branch / Stream
          </div>
          <div className="flex flex-wrap gap-1 max-w-full min-w-0">
            <button
              onClick={() => setSelectedBranch("All")}
              className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedBranch === "All"
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold shadow-2xs"
                  : "bg-gray-100/90 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              All Streams
            </button>
            {yearConfig.branches.map((b) => (
              <button
                key={b.name}
                onClick={() => setSelectedBranch(b.name)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedBranch === b.name
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold shadow-2xs"
                    : "bg-gray-100/90 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. Batch Quick Selector Pills */}
      <div>
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
          <span>Batch Selection ({availableBatches.length} Available)</span>
        </div>
        <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-1.5 bg-gray-50/80 dark:bg-gray-950/40 rounded-xl border border-gray-200/50 dark:border-gray-800/60">
          {availableBatches.map((b) => {
            const isActive = batch === b;
            return (
              <button
                key={b}
                onClick={() => {
                  setBatch(b);
                  setCustomInput(b);
                }}
                className={`px-2 py-0.5 rounded-md text-xs font-mono font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-xs scale-105"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200/80 dark:border-gray-700 hover:border-blue-400"
                }`}
              >
                {b}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Manual Custom Batch Search Input */}
      <div className="flex items-center gap-1.5">
        <div className="relative flex-1">
          <input
            type="text"
            value={customInput}
            onChange={(e) => {
              const v = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
              if (v.length <= 8) setCustomInput(v);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && customInput.trim().length >= 4) {
                const clean = customInput.trim().toUpperCase();
                setBatch(clean);
                setSelectedYear(detectYearFromBatch(clean));
              }
            }}
            placeholder="Type custom batch e.g. 25A14, 24C11"
            className="w-full pl-3 pr-7 py-1.5 text-xs font-mono border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 focus:border-blue-400"
          />
          {customInput && (
            <button
              onClick={() => {
                setBatch(yearConfig.defaultBatch);
                setCustomInput(yearConfig.defaultBatch);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs"
              title="Reset to default"
            >
              ✕
            </button>
          )}
        </div>
        <button
          onClick={() => {
            if (customInput.trim().length >= 4) {
              const clean = customInput.trim().toUpperCase();
              setBatch(clean);
              setSelectedYear(detectYearFromBatch(clean));
            }
          }}
          disabled={customInput.trim() === batch || customInput.trim().length < 4}
          className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          Load
        </button>
      </div>

      {/* 5. Day of Week Tabs */}
      <div className="flex gap-1 max-w-full min-w-0 pb-0.5">
        {days.map((day) => {
          const isSelected = selectedDay === day;
          const isToday = currentTodayKey === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-1 min-w-[42px] py-1.5 rounded-lg text-xs font-semibold transition-all text-center cursor-pointer relative ${
                isSelected
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {dayLabels[day]}
              {isToday && (
                <span
                  className={`absolute top-0.5 right-1 w-1.5 h-1.5 rounded-full ${
                    isSelected ? "bg-white" : "bg-emerald-500"
                  }`}
                  title="Today"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* 6. Class Schedule List */}
      <div className="space-y-2 pt-1">
        {loading ? (
          <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-xs">
            <span className="animate-spin inline-block mr-1.5">⚡</span> Loading {batch} timetable...
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-xs bg-gray-50/50 dark:bg-gray-950/20 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
            <span className="text-xl block mb-1">🎉</span>
            No scheduled classes on {dayLabels[selectedDay]} for batch <strong className="text-gray-700 dark:text-gray-300">{batch}</strong>
          </div>
        ) : (
          filteredEntries.map((entry, i) => {
            const badge = typeBadges[entry.classType];
            const fullSubject = getSubjectTitle(entry.subject);
            const fullFaculty = getFacultyName(entry.faculty);

            return (
              <div
                key={`${selectedDay}-${entry.subject}-${entry.time}-${i}`}
                className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${typeColors[entry.classType]}`}
              >
                {/* Time Column */}
                <div className="flex-shrink-0 w-16 sm:w-20 text-center">
                  <span className="text-[11px] font-mono font-bold leading-tight block">
                    {entry.time.split(" - ")[0]}
                  </span>
                  <span className="text-[9px] text-gray-400 dark:text-gray-500 font-mono">
                    to {entry.time.split(" - ")[1]}
                  </span>
                </div>

                {/* Subject & Details Column */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border uppercase tracking-wider ${badge.style}`}>
                      {badge.label}
                    </span>
                    <span className="text-[10px] font-mono font-semibold opacity-70">
                      {entry.subject}
                    </span>
                  </div>

                  <h4 className="font-semibold text-xs text-gray-900 dark:text-gray-100 line-clamp-1 leading-snug">
                    {fullSubject}
                  </h4>

                  <div className="flex items-center gap-2 mt-1 text-[11px] opacity-80 flex-wrap">
                    <span className="inline-flex items-center gap-1 font-mono font-medium">
                      📍 {entry.room}
                    </span>
                    <span>•</span>
                    <span className="truncate" title={fullFaculty}>
                      👨‍🏫 {fullFaculty}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}