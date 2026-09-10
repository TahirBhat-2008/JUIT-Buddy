"use client";

import { useState } from "react";
import { CourseDetail } from "@/lib/types";

const CATEGORY_COLORS: Record<string, string> = {
  BSC: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-200 dark:border-blue-800",
  ESC: "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-900/40 dark:text-cyan-200 dark:border-cyan-800",
  HSC: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-200 dark:border-amber-800",
  PCC: "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-200 dark:border-indigo-800",
  PEC: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/40 dark:text-purple-200 dark:border-purple-800",
  OEC: "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/40 dark:text-pink-200 dark:border-pink-800",
  PRC: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-200 dark:border-emerald-800",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/40 dark:text-green-200",
  Medium: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-200",
  Hard: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-200",
};

const EVAL_COLORS = [
  "bg-blue-500", "bg-indigo-500", "bg-emerald-500", "bg-purple-500", "bg-amber-500",
];

type BookTab = "textbooks" | "references" | "online";

interface Props {
  course: CourseDetail;
  onBack: () => void;
}

export default function SyllabusDetail({ course, onBack }: Props) {
  const [openUnit, setOpenUnit] = useState<number | null>(0);
  const [bookTab, setBookTab] = useState<BookTab>("textbooks");

  const totalHours = course.units.reduce((s, u) => s + u.hours, 0);

  return (
    <div className="space-y-3.5 w-full max-w-full min-w-0 overflow-hidden">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer select-none"
      >
        <span>←</span>
        <span>Back to course list</span>
      </button>

      {/* ── 1. COURSE HEADER ── */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-3 space-y-2.5 min-w-0 max-w-full overflow-hidden">
        <div className="flex items-start justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-mono font-bold text-gray-500 dark:text-gray-400">{course.code}</span>
            <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-snug break-words">
              {course.title}
            </h2>
          </div>
          {/* Quick-access portal buttons */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <a
              href={course.moodleUrl ?? "https://lms.juit.ac.in/login/index.php"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-[10.5px] font-semibold transition-colors shadow-2xs whitespace-nowrap"
              title="Open JUIT LMS (Moodle)"
            >
              <span>🎓</span>
              <span>LMS</span>
            </a>
            <a
              href="https://webportal.juit.ac.in:6011/studentportal/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[10.5px] font-semibold transition-colors shadow-2xs whitespace-nowrap"
              title="Open JUIT Student Web Portal"
            >
              <span>🌐</span>
              <span>Portal</span>
            </a>
          </div>
        </div>

        {/* Credit Statistics 4-Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs min-w-0">
          <div className="bg-white dark:bg-gray-700/80 rounded-lg p-2 border border-gray-200/80 dark:border-gray-600 min-w-0">
            <p className="text-[10px] text-gray-400 dark:text-gray-400 mb-0.5">Credits (L-T-P)</p>
            <p className="font-bold text-gray-800 dark:text-gray-100 text-xs truncate">
              {course.credits.L}-{course.credits.T}-{course.credits.P}
              <span className="font-normal text-gray-400 ml-0.5">
                ({course.credits.L + course.credits.T + course.credits.P} C)
              </span>
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700/80 rounded-lg p-2 border border-gray-200/80 dark:border-gray-600 min-w-0">
            <p className="text-[10px] text-gray-400 dark:text-gray-400 mb-0.5">Semester</p>
            <p className="font-bold text-gray-800 dark:text-gray-100 text-xs truncate">Sem {course.semester}</p>
          </div>
          <div className="bg-white dark:bg-gray-700/80 rounded-lg p-2 border border-gray-200/80 dark:border-gray-600 min-w-0">
            <p className="text-[10px] text-gray-400 dark:text-gray-400 mb-0.5">Branch</p>
            <p className="font-bold text-gray-800 dark:text-gray-100 text-xs truncate">{course.branch}</p>
          </div>
          <div className="bg-white dark:bg-gray-700/80 rounded-lg p-2 border border-gray-200/80 dark:border-gray-600 min-w-0">
            <p className="text-[10px] text-gray-400 dark:text-gray-400 mb-0.5">Total Hours</p>
            <p className="font-bold text-gray-800 dark:text-gray-100 text-xs truncate">{totalHours} hrs</p>
          </div>
        </div>

        {course.prerequisites.length > 0 && (
          <div className="min-w-0 pt-0.5">
            <p className="text-[10px] text-gray-400 dark:text-gray-400 mb-1">Prerequisites</p>
            <div className="flex flex-wrap gap-1 min-w-0">
              {course.prerequisites.map((p) => (
                <span key={p} className="text-[10.5px] px-2 py-0.5 rounded-md bg-orange-50 border border-orange-200 text-orange-700 dark:bg-orange-950/40 dark:border-orange-800/80 dark:text-orange-300 break-words">
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── 2. OBJECTIVES ── */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-3 space-y-2 min-w-0 max-w-full overflow-hidden">
        <h3 className="text-xs font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wider">
          🎯 Course Objectives
        </h3>
        <ol className="space-y-1.5 min-w-0">
          {course.objectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300 min-w-0">
              <span className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-[10px] font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span className="break-words min-w-0 flex-1 leading-relaxed">{obj}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* ── 3. UNIT-WISE BREAKDOWN ── */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-3 space-y-2 min-w-0 max-w-full overflow-hidden">
        <h3 className="text-xs font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wider">
          📖 Unit-wise Topics ({course.units.length} Units)
        </h3>
        <div className="space-y-1.5 min-w-0">
          {course.units.map((unit) => (
            <div key={unit.number} className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden min-w-0">
              <button
                type="button"
                onClick={() => setOpenUnit(openUnit === unit.number ? null : unit.number)}
                className="w-full flex items-center justify-between p-2.5 bg-gray-50 dark:bg-gray-800/80 hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors text-left min-w-0 gap-2 cursor-pointer"
              >
                <div className="flex items-center gap-1.5 min-w-0 flex-1">
                  <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 flex-shrink-0">
                    U{unit.number}
                  </span>
                  <span className="text-xs font-semibold text-gray-800 dark:text-gray-100 break-words line-clamp-2 min-w-0 flex-1">
                    {unit.title}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0 text-gray-400">
                  <span className="text-[10px] font-mono">{unit.hours}h</span>
                  <span className="text-xs">{openUnit === unit.number ? "▲" : "▼"}</span>
                </div>
              </button>
              {openUnit === unit.number && (
                <div className="p-2.5 space-y-1.5 bg-white dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 text-xs min-w-0">
                  {unit.topics.map((topic) => (
                    <div key={topic.name} className="min-w-0 space-y-0.5">
                      <p className="font-medium text-gray-800 dark:text-gray-200 break-words flex items-start gap-1">
                        <span className="text-indigo-500 mt-0.5 flex-shrink-0">▸</span>
                        <span className="break-words min-w-0 flex-1">{topic.name}</span>
                      </p>
                      {topic.subtopics && topic.subtopics.length > 0 && (
                        <ul className="ml-4 space-y-0.5 text-[11px] text-gray-500 dark:text-gray-400 min-w-0">
                          {topic.subtopics.map((st) => (
                            <li key={st} className="break-words min-w-0 leading-tight">
                              • {st}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. COURSE OUTCOMES ── */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-3 space-y-2 min-w-0 max-w-full overflow-hidden">
        <h3 className="text-xs font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wider">
          ✅ Course Outcomes (COs)
        </h3>
        <div className="space-y-1.5 min-w-0">
          {course.outcomes.map((co) => (
            <div key={co.id} className="flex items-start gap-2 text-xs min-w-0">
              <span className="flex-shrink-0 px-1.5 py-0.5 rounded font-mono font-bold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-[10px] mt-0.5">
                {co.id}
              </span>
              <span className="text-gray-600 dark:text-gray-300 break-words min-w-0 flex-1 leading-relaxed">
                {co.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 5. TEXTBOOKS & REFERENCES ── */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-3 space-y-2 min-w-0 max-w-full overflow-hidden">
        <h3 className="text-xs font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wider">
          📚 Books &amp; Resources
        </h3>
        {/* Tabs - wrapped so never cut off */}
        <div className="flex flex-wrap gap-1 mb-2 select-none min-w-0">
          {(["textbooks", "references", "online"] as BookTab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setBookTab(t)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                bookTab === t
                  ? "bg-blue-600 text-white shadow-2xs"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {t === "textbooks" ? "📘 Textbooks" : t === "references" ? "📗 References" : "🌐 Online"}
            </button>
          ))}
        </div>
        <div className="space-y-1.5 min-w-0">
          {bookTab === "textbooks" && course.books.textbooks.map((b, i) => (
            <div key={i} className="text-xs p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 min-w-0">
              <p className="font-semibold text-gray-800 dark:text-gray-100 break-words">{b.title}</p>
              <p className="text-gray-500 dark:text-gray-400 mt-0.5 text-[11px] break-words">{b.author}</p>
              {(b.edition || b.publisher) && (
                <p className="text-gray-400 dark:text-gray-500 mt-0.5 text-[10.5px] break-words">
                  {[b.edition && `${b.edition} ed.`, b.publisher].filter(Boolean).join(" • ")}
                </p>
              )}
            </div>
          ))}
          {bookTab === "references" && course.books.references.map((b, i) => (
            <div key={i} className="text-xs p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 min-w-0">
              <p className="font-semibold text-gray-800 dark:text-gray-100 break-words">{b.title}</p>
              <p className="text-gray-500 dark:text-gray-400 mt-0.5 text-[11px] break-words">{b.author}</p>
              {(b.edition || b.publisher) && (
                <p className="text-gray-400 dark:text-gray-500 mt-0.5 text-[10.5px] break-words">
                  {[b.edition && `${b.edition} ed.`, b.publisher].filter(Boolean).join(" • ")}
                </p>
              )}
            </div>
          ))}
          {bookTab === "online" && course.books.online.map((r, i) => (
            <a
              key={i}
              href={r.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors break-words min-w-0"
            >
              🔗 {r.title}
            </a>
          ))}
        </div>
      </div>

      {/* ── 6. EVALUATION SCHEME ── */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-3 space-y-2 min-w-0 max-w-full overflow-hidden">
        <h3 className="text-xs font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wider">
          📊 Evaluation Scheme
        </h3>
        <div className="space-y-2 min-w-0">
          {course.evaluation.map((row, i) => (
            <div key={row.component} className="space-y-0.5 min-w-0">
              <div className="flex items-center justify-between text-xs min-w-0">
                <span className="text-gray-700 dark:text-gray-300 truncate mr-2">{row.component}</span>
                <span className="font-bold text-gray-800 dark:text-gray-100 flex-shrink-0">{row.weightage}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden w-full max-w-full">
                <div
                  className={`h-full rounded-full ${EVAL_COLORS[i % EVAL_COLORS.length]}`}
                  style={{ width: `${row.weightage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 7. METADATA / TAGS ── */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-3 space-y-1.5 min-w-0 max-w-full overflow-hidden">
        <h3 className="text-xs font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wider">
          🏷️ Tags &amp; Metadata
        </h3>
        <div className="flex flex-wrap gap-1.5 min-w-0">
          <span className={`text-[10.5px] px-2 py-0.5 rounded-md border font-medium ${CATEGORY_COLORS[course.meta.category] || CATEGORY_COLORS.PCC}`}>
            {course.meta.category}
          </span>
          {course.meta.difficulty && (
            <span className={`text-[10.5px] px-2 py-0.5 rounded-md border font-medium ${DIFFICULTY_COLORS[course.meta.difficulty]}`}>
              {course.meta.difficulty}
            </span>
          )}
          {course.meta.faculty && (
            <span className="text-[10.5px] px-2 py-0.5 rounded-md border bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 break-words">
              👤 {course.meta.faculty}
            </span>
          )}
        </div>
      </div>

      {/* ── 8. AI Accuracy Disclaimer ── */}
      <div className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/30 text-[10.5px] text-amber-800 dark:text-amber-200/90 flex items-start gap-2 min-w-0">
        <span className="text-xs flex-shrink-0 mt-0.5">⚠️</span>
        <p className="leading-relaxed min-w-0 break-words">
          <strong className="font-semibold">Note:</strong> This AI can make mistakes. Verify recommended editions and syllabus topics with course faculty or JUIT Web Kiosk.
        </p>
      </div>
    </div>
  );
}
