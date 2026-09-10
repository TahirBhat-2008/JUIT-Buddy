"use client";

import { useState, useMemo } from "react";
import {
  JUIT_GRADES,
  JUIT_CSE_SEMESTERS,
  type JuitGrade,
  type CourseGradeEntry,
  calculateSgpa,
  calculateCumulativeCgpa,
  calculateRequiredSgpa,
  getAcademicStanding,
  getGradePoint,
} from "@/lib/gpaData";

type CalcMode = "sgpa" | "cgpa" | "target" | "rules";

interface GpaCalculatorProps {
  initialSemester?: number;
}

export default function GpaCalculator({ initialSemester = 1 }: GpaCalculatorProps) {
  const [activeMode, setActiveMode] = useState<CalcMode>("sgpa");

  // ── Mode 1: SGPA State ──
  const [selectedSemPreset, setSelectedSemPreset] = useState<number>(initialSemester);
  const [courses, setCourses] = useState<CourseGradeEntry[]>(() => {
    const preset = JUIT_CSE_SEMESTERS.find((s) => s.semNumber === initialSemester) || JUIT_CSE_SEMESTERS[0];
    return preset.courses.map((c, idx) => ({
      id: `course-${idx}-${Date.now()}`,
      name: c.name,
      credits: c.credits,
      grade: c.defaultGrade || "A",
    }));
  });

  // ── Mode 2: Cumulative CGPA State ──
  const [prevCgpa, setPrevCgpa] = useState<string>("7.50");
  const [prevCredits, setPrevCredits] = useState<string>("45");
  const [currSgpa, setCurrSgpa] = useState<string>("8.25");
  const [currCredits, setCurrCredits] = useState<string>("22");

  // Multi-semester history state
  const [multiSemHistory, setMultiSemHistory] = useState<Array<{ sem: number; sgpa: string; credits: string }>>([
    { sem: 1, sgpa: "7.80", credits: "23" },
    { sem: 2, sgpa: "8.10", credits: "22.5" },
    { sem: 3, sgpa: "", credits: "24" },
    { sem: 4, sgpa: "", credits: "23" },
  ]);

  // ── Mode 3: Target CGPA Predictor State ──
  const [targetCurrentCgpa, setTargetCurrentCgpa] = useState<string>("7.20");
  const [targetCompletedCredits, setTargetCompletedCredits] = useState<string>("45");
  const [desiredCgpa, setDesiredCgpa] = useState<string>("8.00");
  const [upcomingCredits, setUpcomingCredits] = useState<string>("22");

  // ── Calculations ──
  const sgpaResult = useMemo(() => calculateSgpa(courses), [courses]);
  const sgpaStanding = useMemo(() => getAcademicStanding(sgpaResult.sgpa), [sgpaResult.sgpa]);

  const cumulativeResult = useMemo(() => {
    const pCgpa = parseFloat(prevCgpa) || 0;
    const pCreds = parseFloat(prevCredits) || 0;
    const cSgpa = parseFloat(currSgpa) || 0;
    const cCreds = parseFloat(currCredits) || 0;
    return calculateCumulativeCgpa(pCgpa, pCreds, cSgpa, cCreds);
  }, [prevCgpa, prevCredits, currSgpa, currCredits]);

  const cumulativeStanding = useMemo(
    () => getAcademicStanding(cumulativeResult.newCgpa),
    [cumulativeResult.newCgpa]
  );

  const multiSemCgpa = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;
    for (const item of multiSemHistory) {
      const s = parseFloat(item.sgpa);
      const c = parseFloat(item.credits);
      if (!isNaN(s) && !isNaN(c) && s > 0 && c > 0) {
        totalPoints += s * c;
        totalCredits += c;
      }
    }
    const cgpa = totalCredits > 0 ? Number((totalPoints / totalCredits).toFixed(2)) : 0;
    return { cgpa, totalCredits, totalPoints: Number(totalPoints.toFixed(2)) };
  }, [multiSemHistory]);

  const targetResult = useMemo(() => {
    const curCgpa = parseFloat(targetCurrentCgpa) || 0;
    const compCreds = parseFloat(targetCompletedCredits) || 0;
    const desCgpa = parseFloat(desiredCgpa) || 0;
    const upCreds = parseFloat(upcomingCredits) || 0;
    return calculateRequiredSgpa(curCgpa, compCreds, desCgpa, upCreds);
  }, [targetCurrentCgpa, targetCompletedCredits, desiredCgpa, upcomingCredits]);

  // Handle Loading a Preset Semester
  const handleSelectPreset = (semNum: number) => {
    setSelectedSemPreset(semNum);
    const preset = JUIT_CSE_SEMESTERS.find((s) => s.semNumber === semNum);
    if (preset) {
      setCourses(
        preset.courses.map((c, idx) => ({
          id: `course-${semNum}-${idx}-${Date.now()}`,
          name: c.name,
          credits: c.credits,
          grade: c.defaultGrade || "A",
        }))
      );
    }
  };

  // Course mutations
  const handleUpdateCourse = (id: string, field: keyof CourseGradeEntry, value: string | number) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleAddCourse = () => {
    setCourses((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        name: `Elective / Subject ${prev.length + 1}`,
        credits: 3,
        grade: "A",
      },
    ]);
  };

  const handleRemoveCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSetAllGrades = (grade: JuitGrade) => {
    setCourses((prev) => prev.map((c) => ({ ...c, grade })));
  };

  const handleSendToCgpa = () => {
    setCurrSgpa(sgpaResult.sgpa.toFixed(2));
    setCurrCredits(sgpaResult.totalCredits.toString());
    setActiveMode("cgpa");
  };

  return (
    <div className="w-full max-w-full overflow-hidden min-w-0 space-y-4 text-gray-800 dark:text-gray-100">
      {/* Top Banner */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 text-white shadow-sm">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📊</span>
              <h3 className="font-bold text-base leading-tight">JUIT CGPA &amp; SGPA Calculator</h3>
            </div>
            <p className="text-xs text-blue-100 mt-1">
              Official JUIT 10-point scale • Pre-filled B.Tech CSE curricula • Target grade predictor
            </p>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white">
            10-Point Scale
          </span>
        </div>
      </div>

      {/* Mode Navigation Tabs — 2×2 tile grid, labels never clip */}
      <div className="grid grid-cols-2 gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        {(
          [
            { id: "sgpa", icon: "🎯", label: "Semester SGPA" },
            { id: "cgpa", icon: "📈", label: "Cumulative CGPA" },
            { id: "target", icon: "🎯", label: "Target Predictor" },
            { id: "rules", icon: "📜", label: "Grading Scale" },
          ] as const
        ).map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setActiveMode(m.id)}
            className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95 ${
              activeMode === m.id
                ? "bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <span aria-hidden>{m.icon}</span>
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      {/* ── MODE 1: SEMESTER SGPA CALCULATOR ── */}
      {activeMode === "sgpa" && (
        <div className="space-y-4 fade-slide-in">
          {/* Preset Semester Selector */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Quick Load B.Tech CSE Semester:
              </span>
              <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                Auto-loads subjects &amp; credits
              </span>
            </div>
            <div className="flex items-center flex-wrap gap-1">
              {JUIT_CSE_SEMESTERS.map((s) => (
                <button
                  key={s.semNumber}
                  type="button"
                  onClick={() => handleSelectPreset(s.semNumber)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    selectedSemPreset === s.semNumber
                      ? "bg-blue-600 text-white shadow-2xs"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  Sem {s.semNumber}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Grade All Shortcuts */}
          <div className="flex items-center justify-between gap-2 flex-wrap text-xs pt-1">
            <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
              Quick apply to all:
            </span>
            <div className="flex items-center gap-1 flex-wrap">
              {(["A+", "A", "B+", "B"] as JuitGrade[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => handleSetAllGrades(g)}
                  className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-gray-700 dark:text-gray-300 text-[10.5px] font-bold border border-gray-200 dark:border-gray-700 transition-colors cursor-pointer"
                >
                  All {g}
                </button>
              ))}
            </div>
          </div>

          {/* Course Rows */}
          <div className="space-y-2">
            {courses.map((course, index) => {
              const pt = getGradePoint(course.grade);
              const pointsEarned = Number((course.credits * pt).toFixed(1));
              return (
                <div
                  key={course.id}
                  className="p-2.5 rounded-xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  {/* Left: Course Name */}
                  <div className="w-full sm:flex-1 min-w-0">
                    <input
                      type="text"
                      value={course.name}
                      onChange={(e) => handleUpdateCourse(course.id, "name", e.target.value)}
                      className="w-full font-semibold text-gray-900 dark:text-gray-100 bg-transparent border-b border-transparent hover:border-gray-300 dark:hover:border-gray-700 focus:border-blue-500 focus:outline-hidden text-xs truncate"
                      placeholder="Course name"
                    />
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                      <span>Course #{index + 1}</span>
                      <span>•</span>
                      <span>{pointsEarned} pts</span>
                    </div>
                  </div>

                  {/* Right: Controls (Credits + Grade + Delete) */}
                  <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto flex-shrink-0">
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <label className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                        Credits:
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max="12"
                        value={course.credits}
                        onChange={(e) =>
                          handleUpdateCourse(
                            course.id,
                            "credits",
                            Math.max(0, parseFloat(e.target.value) || 0)
                          )
                        }
                        className="w-12 text-center p-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-bold text-gray-900 dark:text-gray-100 text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <select
                        value={course.grade}
                        onChange={(e) =>
                          handleUpdateCourse(course.id, "grade", e.target.value as JuitGrade)
                        }
                        className="p-1 px-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-bold text-gray-900 dark:text-gray-100 cursor-pointer focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                      >
                        {JUIT_GRADES.map((g) => (
                          <option key={g.grade} value={g.grade}>
                            {g.grade} ({g.points} pts)
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() => handleRemoveCourse(course.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors cursor-pointer text-xs"
                        title="Remove course"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Course Button */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              type="button"
              onClick={handleAddCourse}
              className="px-3 py-1.5 rounded-xl border border-dashed border-blue-400 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>➕</span>
              <span>Add Subject / Elective</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectPreset(selectedSemPreset)}
              className="text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors cursor-pointer"
            >
              Reset Semester Courses
            </button>
          </div>

          {/* SGPA Result Summary Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-white dark:from-emerald-950/40 dark:via-gray-900/80 dark:to-gray-900 border border-emerald-200 dark:border-emerald-800 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  Calculated SGPA
                </span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
                    {sgpaResult.sgpa.toFixed(2)}
                  </span>
                  <span className="text-sm font-bold text-gray-500 dark:text-gray-400">/ 10.00</span>
                </div>
              </div>

              <div className="text-right flex flex-col items-end">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Total Credits
                </span>
                <span className="text-xl font-black text-gray-900 dark:text-white">
                  {sgpaResult.totalCredits}
                </span>
                <span className="text-[10.5px] font-medium text-gray-500 dark:text-gray-400">
                  {sgpaResult.earnedPoints} grade points
                </span>
              </div>
            </div>

            {/* Performance Standing Badge */}
            <div className={`p-2.5 rounded-xl border text-xs leading-relaxed ${sgpaStanding.statusColor}`}>
              <p className="font-bold flex items-center gap-1.5">
                <span>{sgpaStanding.label}</span>
                <span className="text-[10px] font-mono">({sgpaResult.equivalentPercentage}% approx)</span>
              </p>
              <p className="text-[11px] mt-0.5 opacity-90">{sgpaStanding.detail}</p>
            </div>

            {/* Backlog Alert if any F grade */}
            {sgpaResult.hasBacklog && (
              <div className="p-2.5 rounded-xl bg-red-100 dark:bg-red-950/80 border border-red-300 dark:border-red-700 text-xs text-red-800 dark:text-red-200">
                ⚠️ <strong>Backlog Notice:</strong> One or more courses have an 'F' grade (0 points).
                Must be cleared in Supplementary Examination or Summer Semester.
              </div>
            )}

            {/* Send to CGPA Button */}
            <button
              type="button"
              onClick={handleSendToCgpa}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>➡️</span>
              <span>Use this SGPA ({sgpaResult.sgpa.toFixed(2)}) in Cumulative CGPA Calculator</span>
            </button>
          </div>
        </div>
      )}

      {/* ── MODE 2: CUMULATIVE CGPA CALCULATOR ── */}
      {activeMode === "cgpa" && (
        <div className="space-y-4 fade-slide-in">
          {/* Quick 2-Part Cumulative Form */}
          <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3 shadow-2xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Combine Previous CGPA + This Semester
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Previous Completed */}
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/70 dark:border-gray-700 space-y-2">
                <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  1. Previous Academic History
                </p>
                <div>
                  <label className="text-[10.5px] font-semibold text-gray-600 dark:text-gray-400 block mb-1">
                    Previous Cumulative CGPA:
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={prevCgpa}
                    onChange={(e) => setPrevCgpa(e.target.value)}
                    className="w-full p-2 text-xs font-bold rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. 7.50"
                  />
                </div>
                <div>
                  <label className="text-[10.5px] font-semibold text-gray-600 dark:text-gray-400 block mb-1">
                    Previous Completed Credits:
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="200"
                    value={prevCredits}
                    onChange={(e) => setPrevCredits(e.target.value)}
                    className="w-full p-2 text-xs font-bold rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. 45"
                  />
                </div>
              </div>

              {/* Current Semester */}
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/70 dark:border-gray-700 space-y-2">
                <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  2. Current Semester
                </p>
                <div>
                  <label className="text-[10.5px] font-semibold text-gray-600 dark:text-gray-400 block mb-1">
                    Current Semester SGPA:
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={currSgpa}
                    onChange={(e) => setCurrSgpa(e.target.value)}
                    className="w-full p-2 text-xs font-bold rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. 8.25"
                  />
                </div>
                <div>
                  <label className="text-[10.5px] font-semibold text-gray-600 dark:text-gray-400 block mb-1">
                    Current Semester Credits:
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="40"
                    value={currCredits}
                    onChange={(e) => setCurrCredits(e.target.value)}
                    className="w-full p-2 text-xs font-bold rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. 22"
                  />
                </div>
              </div>
            </div>

            {/* Result Display */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-blue-950/40 dark:via-gray-900 dark:to-gray-900 border border-blue-200 dark:border-blue-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                    New Combined CGPA
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-black text-gray-900 dark:text-white">
                      {cumulativeResult.newCgpa.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400">/ 10.00</span>
                    <span
                      className={`text-xs font-extrabold px-1.5 py-0.5 rounded-md ${
                        cumulativeResult.diff >= 0
                          ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300"
                          : "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300"
                      }`}
                    >
                      {cumulativeResult.diff >= 0 ? `+${cumulativeResult.diff}` : cumulativeResult.diff}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 block">Total Credits</span>
                  <span className="text-base font-extrabold text-gray-800 dark:text-gray-200">
                    {cumulativeResult.totalCredits}
                  </span>
                </div>
              </div>

              <div className={`p-2 rounded-lg border text-[11px] font-semibold ${cumulativeStanding.statusColor}`}>
                {cumulativeStanding.label}
              </div>
            </div>
          </div>

          {/* Multi-Semester Table */}
          <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Semester-by-Semester Progression
              </h4>
              <span className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400">
                Overall: {multiSemCgpa.cgpa.toFixed(2)} CGPA
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {multiSemHistory.map((item, idx) => (
                <div
                  key={item.sem}
                  className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700 flex items-center justify-between gap-2"
                >
                  <span className="font-bold text-gray-800 dark:text-gray-200">Sem {item.sem}</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      value={item.sgpa}
                      onChange={(e) => {
                        const val = e.target.value;
                        setMultiSemHistory((prev) =>
                          prev.map((it, i) => (i === idx ? { ...it, sgpa: val } : it))
                        );
                      }}
                      placeholder="SGPA"
                      className="w-16 p-1 text-center font-bold text-xs rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                    <span className="text-gray-400 text-[10px]">@</span>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="35"
                      value={item.credits}
                      onChange={(e) => {
                        const val = e.target.value;
                        setMultiSemHistory((prev) =>
                          prev.map((it, i) => (i === idx ? { ...it, credits: val } : it))
                        );
                      }}
                      placeholder="Credits"
                      className="w-14 p-1 text-center font-semibold text-xs rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              ))}
            </div>

            {multiSemHistory.length < 8 && (
              <button
                type="button"
                onClick={() =>
                  setMultiSemHistory((prev) => [
                    ...prev,
                    { sem: prev.length + 1, sgpa: "", credits: "22" },
                  ])
                }
                className="w-full py-1.5 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 text-xs font-semibold cursor-pointer"
              >
                + Add Semester {multiSemHistory.length + 1}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── MODE 3: TARGET CGPA PREDICTOR ── */}
      {activeMode === "target" && (
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4 shadow-2xs fade-slide-in">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Target CGPA Goal Planner
            </h4>
            <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5">
              Determine the exact SGPA needed in your upcoming semester to achieve your desired CGPA.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                Current Cumulative CGPA:
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={targetCurrentCgpa}
                onChange={(e) => setTargetCurrentCgpa(e.target.value)}
                className="w-full p-2 font-bold rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                placeholder="e.g. 7.20"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                Completed Credits So Far:
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="200"
                value={targetCompletedCredits}
                onChange={(e) => setTargetCompletedCredits(e.target.value)}
                className="w-full p-2 font-bold rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                placeholder="e.g. 45"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                Target Desired CGPA:
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={desiredCgpa}
                onChange={(e) => setDesiredCgpa(e.target.value)}
                className="w-full p-2 font-bold rounded-xl border border-blue-400 dark:border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 8.00"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                Upcoming Semester Credits:
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="35"
                value={upcomingCredits}
                onChange={(e) => setUpcomingCredits(e.target.value)}
                className="w-full p-2 font-bold rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                placeholder="e.g. 22"
              />
            </div>
          </div>

          {/* Target Result Box */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 via-blue-50 to-white dark:from-indigo-950/40 dark:via-gray-900 dark:to-gray-900 border border-indigo-200 dark:border-indigo-800 space-y-2 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300">
              Required Next Semester SGPA
            </span>
            <div className="flex items-baseline gap-2">
              <span
                className={`text-3xl sm:text-4xl font-black ${
                  targetResult.status === "impossible"
                    ? "text-red-600 dark:text-red-400"
                    : "text-blue-600 dark:text-blue-400"
                }`}
              >
                {targetResult.requiredSgpa > 0 ? targetResult.requiredSgpa.toFixed(2) : "0.00"}
              </span>
              <span className="text-xs font-bold text-gray-500">/ 10.00</span>
            </div>

            <div
              className={`p-2.5 rounded-xl border text-xs leading-relaxed ${
                targetResult.status === "impossible"
                  ? "bg-red-50 dark:bg-red-950/60 border-red-300 text-red-800 dark:text-red-300"
                  : targetResult.status === "already_achieved"
                  ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 text-emerald-800 dark:text-emerald-300"
                  : "bg-blue-50 dark:bg-blue-950/60 border-blue-300 text-blue-800 dark:text-blue-300"
              }`}
            >
              {targetResult.message}
            </div>
          </div>
        </div>
      )}

      {/* ── MODE 4: JUIT GRADING SCALE & RULES ── */}
      {activeMode === "rules" && (
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4 shadow-2xs fade-slide-in text-xs">
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white text-sm">
              Official JUIT 10-Point Letter Grading Scale
            </h4>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
              Academic Council Examination Ordinance Criteria
            </p>
          </div>

          {/* Grade Scale Table */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-x-auto max-w-full">
            <table className="min-w-[280px] w-full text-left text-xs">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="p-2.5">Letter Grade</th>
                  <th className="p-2.5">Grade Points</th>
                  <th className="p-2.5">Academic Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {JUIT_GRADES.map((g) => (
                  <tr key={g.grade} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded-md font-bold border text-[11px] ${g.badgeColor}`}>
                        {g.grade}
                      </span>
                    </td>
                    <td className="p-2.5 font-extrabold text-gray-900 dark:text-white font-mono">
                      {g.points}.0
                    </td>
                    <td className="p-2.5 text-gray-700 dark:text-gray-300">
                      {g.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Promotion & Backlog Ordinances */}
          <div className="space-y-2 pt-1">
            <h5 className="font-bold text-gray-800 dark:text-gray-200 uppercase text-[10.5px] tracking-wider">
              Essential JUIT Academic Ordinances:
            </h5>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-1.5 text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                • <strong>1st Year Promotion Cutoff:</strong> Minimum <strong>4.5 CGPA</strong> is required at the end of the 2nd semester to promote to the 3rd semester (2nd year).
              </p>
              <p>
                • <strong>Degree Award Threshold:</strong> Minimum <strong>5.0 CGPA</strong> across all 8 semesters is mandatory for the award of B.Tech degree.
              </p>
              <p>
                • <strong>Minimum Passing Grade:</strong> Grade 'D' (4 points) is the minimum required to pass any theory or lab course.
              </p>
              <p>
                • <strong>Backlog &amp; 'F' Grade:</strong> Courses with 'F' grade yield 0 points and must be cleared in Supplementary Examinations or Summer Semester.
              </p>
              <p>
                • <strong>Internal Marks Distribution:</strong> T1 (15 marks) + T2 (25 marks) + T3 (35 marks) + Teacher Assessment (25 marks) = 100 marks total.
              </p>
              <p>
                • <strong>Equivalent Percentage Formula:</strong> Standard formula at JUIT is `Percentage = CGPA × 10`.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
