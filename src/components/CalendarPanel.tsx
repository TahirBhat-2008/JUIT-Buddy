"use client";

import { useState, useEffect } from "react";

type EventType = "holiday" | "exam" | "academic" | "event" | "vacation";

type CalEvent = {
  date: string;
  endDate?: string;
  label: string;
  type: EventType;
};

const EVENTS: CalEvent[] = [
  // ── ODD SEM 2026 – Registration & Academic ─────────────────────────────
  { date:"2026-07-17", endDate:"2026-07-18", label:"Online Registration Opens (2nd+ Year)", type:"academic" },
  { date:"2026-07-20", label:"1st Year Offline Registration", type:"academic" },
  { date:"2026-07-20", label:"Classes Begin — 2nd, 3rd & Final Year", type:"academic" },
  { date:"2026-07-21", endDate:"2026-07-25", label:"Induction Program — BTech 1st Year", type:"event" },
  { date:"2026-07-25", label:"Add / Drop Deadline — Odd Sem", type:"academic" },
  { date:"2026-07-27", label:"Classes Begin — 1st Year", type:"academic" },
  { date:"2026-08-03", label:"Late Registration Deadline", type:"academic" },
  { date:"2026-08-05", label:"Diksha", type:"event" },
  { date:"2026-08-29", label:"Attendance Review before T1", type:"academic" },
  { date:"2026-09-25", label:"Summer Training Report Submission", type:"academic" },
  { date:"2026-10-09", label:"Attendance Review before T2", type:"academic" },
  { date:"2026-11-20", label:"Project / Dissertation Submission", type:"academic" },
  { date:"2026-11-25", label:"Attendance Review before T3", type:"academic" },
  { date:"2026-12-01", label:"Last Day of Classes — Odd Sem", type:"academic" },
  { date:"2026-12-01", label:"Students' Feedback Collection", type:"academic" },
  { date:"2026-12-22", label:"Board of Examiners Meeting", type:"academic" },
  { date:"2026-12-24", label:"Results Declaration — Odd Sem", type:"academic" },

  // ── ODD SEM – T1 ───────────────────────────────────────────────────────
  { date:"2026-08-31", label:"T1 Exam Begins", type:"exam" },
  { date:"2026-09-09", label:"T1 Exam Ends", type:"exam" },
  { date:"2026-09-16", label:"T1 Answer Sheets Shown", type:"exam" },
  { date:"2026-09-19", label:"T1 Results Uploaded", type:"exam" },

  // ── ODD SEM – T2 ───────────────────────────────────────────────────────
  { date:"2026-10-10", label:"T2 Exam Begins", type:"exam" },
  { date:"2026-10-19", label:"T2 Exam Ends", type:"exam" },
  { date:"2026-10-29", label:"T2 Answer Sheets Shown", type:"exam" },
  { date:"2026-10-31", label:"T2 Results Uploaded", type:"exam" },

  // ── ODD SEM – Make-up & Project Viva ───────────────────────────────────
  { date:"2026-11-16", endDate:"2026-11-19", label:"Make-up Examination", type:"exam" },
  { date:"2026-11-23", endDate:"2026-11-27", label:"Final Project Viva", type:"exam" },

  // ── ODD SEM – T3 ───────────────────────────────────────────────────────
  { date:"2026-12-02", label:"T3 Exam Begins", type:"exam" },
  { date:"2026-12-15", label:"T3 Exam Ends", type:"exam" },
  { date:"2026-12-19", label:"T3 Answer Sheets Shown", type:"exam" },
  { date:"2026-12-21", label:"T3 Results Uploaded", type:"exam" },

  // ── ODD SEM – Events ───────────────────────────────────────────────────
  { date:"2026-09-24", endDate:"2026-09-26", label:"Murious / Innovate to Excel", type:"event" },
  { date:"2026-10-01", endDate:"2026-10-04", label:"Parakram 2026 — Sports Meet", type:"event" },

  // ── ODD SEM – Gazetted Holidays ────────────────────────────────────────
  { date:"2026-08-15", label:"Independence Day", type:"holiday" },
  { date:"2026-08-28", label:"Raksha Bandhan", type:"holiday" },
  { date:"2026-09-04", label:"Janmashtami", type:"holiday" },
  { date:"2026-10-02", label:"Gandhi Jayanti", type:"holiday" },
  { date:"2026-10-20", label:"Dussehra", type:"holiday" },
  { date:"2026-11-06", endDate:"2026-11-07", label:"Diwali", type:"holiday" },
  { date:"2026-11-09", label:"Govardhan Puja", type:"holiday" },
  { date:"2026-11-24", label:"Guru Nanak Jayanti", type:"holiday" },
  { date:"2026-12-25", label:"Christmas", type:"holiday" },

  // ── ODD SEM – Vacations ────────────────────────────────────────────────
  { date:"2026-11-02", endDate:"2026-11-09", label:"Diwali Break (Student Vacation)", type:"vacation" },
  { date:"2026-12-19", endDate:"2027-01-05", label:"Winter Vacation", type:"vacation" },

  // ── EVEN SEM 2027 – Registration & Academic ────────────────────────────
  { date:"2027-01-06", endDate:"2027-01-07", label:"Online Registration Opens — Even Sem", type:"academic" },
  { date:"2027-01-07", label:"Classes Begin — Even Sem", type:"academic" },
  { date:"2027-01-14", label:"Add / Drop Deadline — Even Sem", type:"academic" },
  { date:"2027-01-22", label:"Late Registration Deadline — Even Sem", type:"academic" },
  { date:"2027-02-06", label:"Attendance Review before T1 — Even Sem", type:"academic" },
  { date:"2027-03-27", label:"Attendance Review before T2 — Even Sem", type:"academic" },
  { date:"2027-05-15", label:"Project / Dissertation Submission", type:"academic" },
  { date:"2027-05-15", label:"Attendance Review before T3 — Even Sem", type:"academic" },
  { date:"2027-05-17", label:"Students' Feedback Collection", type:"academic" },
  { date:"2027-05-18", label:"Last Day of Classes — Even Sem", type:"academic" },
  { date:"2027-06-05", label:"Board of Examiners Meeting — Even Sem", type:"academic" },
  { date:"2027-06-07", label:"Results Declaration — Even Sem", type:"academic" },

  // ── EVEN SEM – T1 ──────────────────────────────────────────────────────
  { date:"2027-02-08", label:"T1 Exam Begins — Even Sem", type:"exam" },
  { date:"2027-02-15", label:"T1 Exam Ends — Even Sem", type:"exam" },
  { date:"2027-03-01", label:"T1 Answer Sheets Shown", type:"exam" },
  { date:"2027-03-03", label:"T1 Results Uploaded", type:"exam" },

  // ── EVEN SEM – T2 ──────────────────────────────────────────────────────
  { date:"2027-03-29", label:"T2 Exam Begins — Even Sem", type:"exam" },
  { date:"2027-04-07", label:"T2 Exam Ends — Even Sem", type:"exam" },
  { date:"2027-04-22", label:"T2 Answer Sheets Shown", type:"exam" },
  { date:"2027-04-24", label:"T2 Results Uploaded", type:"exam" },

  // ── EVEN SEM – Make-up & Project Viva ─────────────────────────────────
  { date:"2027-04-26", endDate:"2027-04-28", label:"Make-up Examination — Even Sem", type:"exam" },
  { date:"2027-05-10", endDate:"2027-05-15", label:"Final Project Viva", type:"exam" },

  // ── EVEN SEM – T3 ──────────────────────────────────────────────────────
  { date:"2027-05-19", label:"T3 Exam Begins — Even Sem", type:"exam" },
  { date:"2027-05-29", label:"T3 Exam Ends — Even Sem", type:"exam" },
  { date:"2027-06-03", label:"T3 Answer Sheets Shown", type:"exam" },
  { date:"2027-06-05", label:"T3 Results Uploaded", type:"exam" },

  // ── EVEN SEM – Events ──────────────────────────────────────────────────
  { date:"2027-03-11", endDate:"2027-03-13", label:"Murious / Innovate to Excel", type:"event" },
  { date:"2027-04-04", endDate:"2027-04-06", label:"Parakram 2027 — Sports Meet", type:"event" },
  { date:"2027-04-30", endDate:"2027-05-02", label:"Le-Fiestus 2027", type:"event" },

  // ── EVEN SEM – Gazetted Holidays ───────────────────────────────────────
  { date:"2027-01-25", label:"HP Statehood Day", type:"holiday" },
  { date:"2027-01-26", label:"Republic Day", type:"holiday" },
  { date:"2027-03-06", label:"Mahashivratri", type:"holiday" },
  { date:"2027-03-09", label:"Id-ul-Fitr*", type:"holiday" },
  { date:"2027-03-22", endDate:"2027-03-23", label:"Holi", type:"holiday" },
  { date:"2027-04-14", label:"Ambedkar Jayanti", type:"holiday" },
  { date:"2027-04-15", label:"Himachal Day", type:"holiday" },
  { date:"2027-04-16", label:"Ram Navami", type:"holiday" },
  { date:"2027-04-19", label:"Mahavir Jayanti", type:"holiday" },
  { date:"2027-05-20", label:"Buddha Purnima", type:"holiday" },

  // ── EVEN SEM – Vacations ───────────────────────────────────────────────
  { date:"2027-03-20", endDate:"2027-03-25", label:"Holi Break (Student Vacation)", type:"vacation" },
  { date:"2027-06-03", endDate:"2027-07-18", label:"Summer Vacation (Student)", type:"vacation" },
];

function parseYMD(str: string) {
  const [y, m, d] = str.split("-").map(Number);
  return { year: y, month: m - 1, day: d };
}

function isoDate(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

// Expand range events into individual date entries for lookup
function buildDateMap(): Map<string, CalEvent[]> {
  const map = new Map<string, CalEvent[]>();
  for (const ev of EVENTS) {
    const s = parseYMD(ev.date);
    const start = new Date(s.year, s.month, s.day);
    let end = start;
    if (ev.endDate) {
      const e = parseYMD(ev.endDate);
      end = new Date(e.year, e.month, e.day);
    }
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = isoDate(d.getFullYear(), d.getMonth(), d.getDate());
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(ev);
    }
  }
  return map;
}

const DATE_MAP = buildDateMap();

const DOT_COLORS: Record<EventType, string> = {
  holiday:  "bg-red-500",
  exam:     "bg-purple-500",
  academic: "bg-blue-500",
  event:    "bg-emerald-500",
  vacation: "bg-amber-400",
};

const BADGE_COLORS: Record<EventType, string> = {
  holiday:  "bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-200 border-red-300 dark:border-red-800 font-medium",
  exam:     "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  academic: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  event:    "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  vacation: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
};

const ICONS: Record<EventType, string> = {
  holiday:  "🏖️",
  exam:     "📝",
  academic: "🎓",
  event:    "🎉",
  vacation: "🌴",
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_HEADERS = [
  { label: "Su", isSunday: true },
  { label: "Mo", isSunday: false },
  { label: "Tu", isSunday: false },
  { label: "We", isSunday: false },
  { label: "Th", isSunday: false },
  { label: "Fr", isSunday: false },
  { label: "Sa", isSunday: false },
];

// ── Live Weather (Open-Meteo, free & keyless) for JUIT Waknaghat campus ────
type WeatherData = {
  temp: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  code: number;
  isDay: boolean;
  max: number;
  min: number;
  rainChance: number;
  tomorrow: { code: number; max: number; min: number; rainChance: number };
  dayAfter: { code: number; max: number; min: number; rainChance: number };
};

const JUIT_COORDS = { lat: 30.8614, lon: 77.1166 }; // JUIT Waknaghat, Solan, HP
const WEATHER_CACHE_KEY = "juit-buddy-weather";
const WEATHER_CACHE_MS = 30 * 60 * 1000; // 30 minutes

// WMO weather interpretation codes → icon + label
function wmoInfo(code: number, isDay: boolean): { icon: string; label: string } {
  if (code === 0) return isDay ? { icon: "☀️", label: "Clear sky" } : { icon: "🌙", label: "Clear night" };
  if (code === 1) return isDay ? { icon: "🌤️", label: "Mostly clear" } : { icon: "🌙", label: "Mostly clear" };
  if (code === 2) return { icon: "⛅", label: "Partly cloudy" };
  if (code === 3) return { icon: "☁️", label: "Overcast" };
  if (code === 45 || code === 48) return { icon: "🌫️", label: "Foggy hills" };
  if (code >= 51 && code <= 57) return { icon: "🌦️", label: "Drizzle" };
  if (code >= 61 && code <= 67) return { icon: "🌧️", label: "Rain" };
  if (code >= 71 && code <= 77) return { icon: "🌨️", label: "Snow" };
  if (code >= 80 && code <= 82) return { icon: "🌦️", label: "Rain showers" };
  if (code === 85 || code === 86) return { icon: "🌨️", label: "Snow showers" };
  if (code >= 95) return { icon: "⛈️", label: "Thunderstorm" };
  return { icon: "🌡️", label: "—" };
}

// Campus-relevant tip derived from the weather
function weatherTip(w: WeatherData): string {
  if (w.code >= 95) return "Thunderstorm alert — avoid open areas & plan indoor study 🌩️";
  if (w.rainChance >= 60 || w.code >= 61) return "Carry an umbrella — the Waknaghat road gets slippery 🌂";
  if (w.code === 45 || w.code === 48) return "Dense fog on the hills — morning buses may run late 🌫️";
  if (w.code >= 71) return "Snow expected — dress in layers, roads may be icy 🧥";
  if (w.temp <= 8) return "Feels freezing on the terraces — wear a warm jacket 🧣";
  if (w.temp >= 34) return "Hot & sunny — hydrate often between classes 💧";
  if (w.rainChance >= 35) return `Might drizzle later (${w.rainChance}% chance) — an umbrella wouldn't hurt ☂️`;
  if (w.wind >= 30) return "Windy on the open terraces — hold on to your notes 💨";
  return "Pleasant campus weather — perfect for the OAT or sports ground ☺️";
}

function WeatherCard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // Serve from localStorage cache if fresh (< 30 min) — panel remounts on
    // every drawer open, so this avoids spamming the API on each open.
    try {
      const cached = JSON.parse(localStorage.getItem(WEATHER_CACHE_KEY) || "null");
      if (cached && cached.ts && cached.data && Date.now() - cached.ts < WEATHER_CACHE_MS) {
        setWeather(cached.data);
        return () => { cancelled = true; };
      }
    } catch {
      // corrupted cache — fall through to a fresh fetch
    }

    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${JUIT_COORDS.lat}&longitude=${JUIT_COORDS.lon}` +
      "&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m" +
      "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max" +
      "&timezone=Asia%2FKolkata&forecast_days=3";

    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((j) => {
        if (cancelled) return;
        const w: WeatherData = {
          temp: Math.round(j.current.temperature_2m),
          feelsLike: Math.round(j.current.apparent_temperature),
          humidity: Math.round(j.current.relative_humidity_2m),
          wind: Math.round(j.current.wind_speed_10m),
          code: j.current.weather_code,
          isDay: j.current.is_day === 1,
          max: Math.round(j.daily.temperature_2m_max[0]),
          min: Math.round(j.daily.temperature_2m_min[0]),
          rainChance: j.daily.precipitation_probability_max?.[0] ?? 0,
          tomorrow: {
            code: j.daily.weather_code[1],
            max: Math.round(j.daily.temperature_2m_max[1]),
            min: Math.round(j.daily.temperature_2m_min[1]),
            rainChance: j.daily.precipitation_probability_max?.[1] ?? 0,
          },
          dayAfter: {
            code: j.daily.weather_code[2],
            max: Math.round(j.daily.temperature_2m_max[2]),
            min: Math.round(j.daily.temperature_2m_min[2]),
            rainChance: j.daily.precipitation_probability_max?.[2] ?? 0,
          },
        };
        setWeather(w);
        try {
          localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify({ ts: Date.now(), data: w }));
        } catch {
          // quota full — weather is non-essential, skip caching
        }
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => { cancelled = true; };
  }, []);

  if (failed) return null; // weather is a bonus — fail silently
  if (!weather) {
    return (
      <div className="rounded-xl border border-sky-200/70 dark:border-sky-800/60 bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/30 p-3 flex items-center gap-3 animate-pulse">
        <span className="text-2xl">⛅</span>
        <div className="flex-1">
          <p className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wide">Waknaghat Weather</p>
          <p className="text-xs text-sky-500/80 dark:text-sky-500/70">Fetching live campus weather…</p>
        </div>
      </div>
    );
  }

  const info = wmoInfo(weather.code, weather.isDay);
  const day = (d: WeatherData["tomorrow"], label: string) => {
    const di = wmoInfo(d.code, true);
    return (
      <div className="flex-1 min-w-0 text-center rounded-lg bg-white/60 dark:bg-gray-900/40 py-1.5 px-1">
        <p className="text-[9px] font-bold text-sky-600/80 dark:text-sky-400/80 uppercase tracking-wider">{label}</p>
        <p className="text-base leading-tight" aria-hidden>{di.icon}</p>
        <p className="text-[10px] font-bold text-gray-700 dark:text-gray-200">{d.max}° <span className="text-gray-400 dark:text-gray-500 font-medium">/ {d.min}°</span></p>
        <p className="text-[9px] text-blue-500 dark:text-blue-400 font-semibold">💧 {d.rainChance}%</p>
      </div>
    );
  };

  return (
    <div className="rounded-xl border border-sky-200/70 dark:border-sky-800/60 bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 dark:from-sky-950/30 dark:via-blue-950/30 dark:to-indigo-950/30 p-3 space-y-2">
      {/* Current conditions */}
      <div className="flex items-center gap-3">
        <span className="text-3xl leading-none" aria-hidden>{info.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wide">
            Waknaghat Campus Weather
          </p>
          <p className="text-lg font-extrabold text-gray-900 dark:text-white leading-tight">
            {weather.temp}°C
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 ml-1.5">{info.label}</span>
          </p>
        </div>
        <div className="text-right flex-shrink-0 text-[10px] font-semibold text-gray-500 dark:text-gray-400 space-y-0.5">
          <p>↑ {weather.max}° ↓ {weather.min}°</p>
          <p>💧 {weather.rainChance}% · 💨 {weather.wind} km/h</p>
          <p>Feels {weather.feelsLike}°C</p>
        </div>
      </div>

      {/* Campus tip */}
      <p className="text-[11px] font-medium text-sky-800/90 dark:text-sky-200/90 leading-snug">
        {weatherTip(weather)}
      </p>

      {/* 3-day outlook */}
      <div className="flex gap-1.5">
        {day({ code: weather.code, max: weather.max, min: weather.min, rainChance: weather.rainChance }, "Today")}
        {day(weather.tomorrow, "Tomorrow")}
        {day(weather.dayAfter, wmoInfo(weather.dayAfter.code, true).label === "—" ? "Day+2" : "Day+2")}
      </div>
    </div>
  );
}

export default function CalendarPanel() {
  const today = new Date();
  const todayStr = isoDate(today.getFullYear(), today.getMonth(), today.getDate());

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<string | null>(todayStr);

  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Next upcoming exam
  const nextExam = EVENTS
    .filter(e => e.type === "exam" && e.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(y => y - 1);
    } else {
      setMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(y => y + 1);
    } else {
      setMonth(m => m + 1);
    }
  };

  const goToday = () => {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
    setSelectedDay(todayStr);
  };

  const selectedEvents = selectedDay ? (DATE_MAP.get(selectedDay) ?? []) : [];
  const uniqueSelected = selectedEvents.filter(
    (ev, i, arr) => arr.findIndex(x => x.label === ev.label && x.date === ev.date) === i
  );

  // All holidays & vacations in currently viewed month
  const monthHolidays: { event: CalEvent; dates: string[] }[] = [];
  const seenLabels = new Set<string>();

  for (let d = 1; d <= daysInMonth; d++) {
    const dStr = isoDate(year, month, d);
    const evs = DATE_MAP.get(dStr) ?? [];
    for (const ev of evs) {
      if (ev.type === "holiday" || ev.type === "vacation") {
        if (!seenLabels.has(ev.label)) {
          seenLabels.add(ev.label);
          monthHolidays.push({ event: ev, dates: [dStr] });
        }
      }
    }
  }

  const holidayCount = monthHolidays.filter(h => h.event.type === "holiday").length;
  const vacationCount = monthHolidays.filter(h => h.event.type === "vacation").length;

  return (
    <div className="w-full max-w-full overflow-hidden min-w-0 space-y-3 select-none">
      {/* ── Live Campus Weather ──────────────────────────────────────────── */}
      <WeatherCard />

      {/* ── Next Exam Banner ─────────────────────────────────────────────── */}
      {nextExam && (
        <div className="rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 p-3 flex items-center gap-3">
          <span className="text-2xl">📝</span>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-purple-500 uppercase tracking-wide">Next Exam</p>
            <p className="text-sm font-bold text-purple-900 dark:text-purple-100 leading-tight truncate">
              {nextExam.label}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            {(() => {
              const diff = Math.ceil(
                (new Date(nextExam.date + "T00:00:00").getTime() -
                  new Date(todayStr + "T00:00:00").getTime()) /
                  86400000
              );
              return (
                <p
                  className={`text-sm font-extrabold ${
                    diff <= 7
                      ? "text-red-600 dark:text-red-400"
                      : "text-purple-600 dark:text-purple-300"
                  }`}
                >
                  {diff === 0 ? "Today!" : diff === 1 ? "Tomorrow" : `In ${diff}d`}
                </p>
              );
            })()}
            <p className="text-[10px] text-purple-400">
              {new Date(nextExam.date + "T00:00:00").toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              })}
            </p>
          </div>
        </div>
      )}

      {/* ── Month Navigator ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/60 p-2 rounded-xl border border-gray-200 dark:border-gray-700">
        <button
          onClick={prevMonth}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold text-lg transition-colors"
          title="Previous month"
        >
          ‹
        </button>
        <div className="text-center">
          <p className="font-bold text-gray-900 dark:text-gray-100 text-sm">
            {MONTH_NAMES[month]} {year}
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-0.5">
            {holidayCount > 0 && (
              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 font-bold border border-red-200 dark:border-red-800">
                🏖️ {holidayCount} {holidayCount === 1 ? "Holiday" : "Holidays"}
              </span>
            )}
            {vacationCount > 0 && (
              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold border border-amber-200 dark:border-amber-800">
                🌴 Vacation
              </span>
            )}
            {holidayCount === 0 && vacationCount === 0 && (
              <span className="text-[10px] text-gray-400">Regular working month</span>
            )}
          </div>
        </div>
        <button
          onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold text-lg transition-colors"
          title="Next month"
        >
          ›
        </button>
      </div>

      {/* ── Day-of-week Headers ──────────────────────────────────────────── */}
      <div className="overflow-x-auto -mx-1 px-1">
        <div className="grid grid-cols-7 gap-1 min-w-[280px]">
        {DAY_HEADERS.map(d => (
          <div
            key={d.label}
            className={`text-center text-[10px] font-bold py-1 ${
              d.isSunday
                ? "text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-950/20 rounded-md"
                : "text-gray-400 dark:text-gray-500"
            }`}
          >
            {d.label}
          </div>
        ))}

        {/* Leading empty cells */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Day cells */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = isoDate(year, month, day);
          const evs = DATE_MAP.get(dateStr) ?? [];
          const isToday = dateStr === todayStr;
          const isSelected = dateStr === selectedDay;

          const holidayEv = evs.find(e => e.type === "holiday");
          const vacationEv = evs.find(e => e.type === "vacation");
          const examEv = evs.find(e => e.type === "exam");

          const isHoliday = !!holidayEv;
          const isVacation = !isHoliday && !!vacationEv;
          const isExam = !isHoliday && !isVacation && !!examEv;
          const hasOtherEvents = evs.length > 0 && !isHoliday && !isVacation && !isExam;

          const dayOfWeek = new Date(year, month, day).getDay();
          const isSunday = dayOfWeek === 0;

          // Distinctive cell background & borders
          let cellStyle = "";
          if (isSelected) {
            if (isHoliday) {
              cellStyle = "bg-red-600 border-red-700 text-white font-black shadow-md ring-2 ring-red-400 ring-offset-2 dark:ring-offset-gray-900";
            } else if (isVacation) {
              cellStyle = "bg-amber-600 border-amber-700 text-white font-black shadow-md ring-2 ring-amber-400 ring-offset-2 dark:ring-offset-gray-900";
            } else if (isExam) {
              cellStyle = "bg-purple-600 border-purple-700 text-white font-black shadow-md ring-2 ring-purple-400 ring-offset-2 dark:ring-offset-gray-900";
            } else {
              cellStyle = "bg-blue-600 border-blue-700 text-white font-black shadow-md ring-2 ring-blue-400 ring-offset-2 dark:ring-offset-gray-900";
            }
          } else if (isHoliday) {
            // PROMINENT HOLIDAY STYLING: Vivid soft red background, red border, red text, slight glow
            cellStyle = "bg-red-100 dark:bg-red-950/70 border-red-300 dark:border-red-700/80 text-red-800 dark:text-red-200 font-extrabold shadow-xs hover:bg-red-200 dark:hover:bg-red-900/80 ring-1 ring-red-400/40";
          } else if (isVacation) {
            // Prominent vacation styling: warm amber tint
            cellStyle = "bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700/80 text-amber-900 dark:text-amber-200 font-semibold hover:bg-amber-200 dark:hover:bg-amber-900/70";
          } else if (isExam) {
            // Exam styling: crisp purple tint
            cellStyle = "bg-purple-100 dark:bg-purple-950/60 border-purple-300 dark:border-purple-700/80 text-purple-900 dark:text-purple-200 font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/70";
          } else if (isToday) {
            cellStyle = "bg-blue-50 dark:bg-blue-900/40 border-blue-400 dark:border-blue-600 text-blue-800 dark:text-blue-200 font-bold ring-1 ring-blue-400";
          } else if (isSunday) {
            cellStyle = "bg-red-50/40 dark:bg-red-950/15 border-transparent text-red-500/80 dark:text-red-400/80 hover:bg-red-50 dark:hover:bg-red-950/30";
          } else if (hasOtherEvents) {
            cellStyle = "bg-gray-50 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100";
          } else {
            cellStyle = "border-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400";
          }

          const types = [...new Set(evs.map(e => e.type))] as EventType[];

          return (
            <button
              key={day}
              onClick={() => setSelectedDay(isSelected ? null : dateStr)}
              className={`relative flex flex-col items-center justify-between p-1 rounded-xl min-h-[2.85rem] transition-all border ${cellStyle}`}
              title={
                holidayEv
                  ? `🏖️ Holiday: ${holidayEv.label}`
                  : vacationEv
                  ? `🌴 Vacation: ${vacationEv.label}`
                  : examEv
                  ? `📝 Exam: ${examEv.label}`
                  : undefined
              }
            >
              {/* Day Number */}
              <span
                className={`text-xs leading-none ${
                  isHoliday ? "text-red-700 dark:text-red-200 font-black" : ""
                }`}
              >
                {day}
              </span>

              {/* High-visibility icon / indicator */}
              <div className="flex items-center justify-center min-h-[14px]">
                {isHoliday ? (
                  <span className="text-[11px] leading-none animate-pulse">🏖️</span>
                ) : isVacation ? (
                  <span className="text-[10px] leading-none">🌴</span>
                ) : isExam ? (
                  <span className="text-[10px] leading-none">📝</span>
                ) : types.length > 0 ? (
                  <div className="flex gap-0.5 justify-center">
                    {types.slice(0, 3).map(t => (
                      <span
                        key={t}
                        className={`w-1.5 h-1.5 rounded-full ${
                          isSelected ? "bg-white/90" : DOT_COLORS[t]
                        }`}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            </button>
          );
        })}
        </div>
      </div>

      {/* ── Legend Bar ───────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-1 p-2 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/60">
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
          <span className="text-xs">🏖️</span>
          <span className="text-[10px] font-bold">Holiday (Off Day)</span>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
          <span className="text-xs">🌴</span>
          <span className="text-[10px] font-semibold">Vacation</span>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
          <span className="text-xs">📝</span>
          <span className="text-[10px] font-semibold">Exam</span>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          <span className="text-xs">🎓</span>
          <span className="text-[10px] font-semibold">Academic</span>
        </div>
      </div>

      {/* ── Prominent Holidays & Breaks in Current Month ──────────────────── */}
      {monthHolidays.length > 0 && (
        <div className="rounded-xl border border-red-200 dark:border-red-800/70 bg-red-50/60 dark:bg-red-950/30 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-black text-red-700 dark:text-red-300 uppercase tracking-wide flex items-center gap-1.5">
              <span>🏖️</span>
              <span>Off-Days in {MONTH_NAMES[month]}</span>
            </p>
            <span className="text-[10px] text-red-600 dark:text-red-400 font-semibold">
              Click to view on grid
            </span>
          </div>
          <div className="space-y-1.5">
            {monthHolidays.map(({ event: ev }, idx) => {
              const [sy, sm, sd] = ev.date.split("-").map(Number);
              const startDate = new Date(sy, sm - 1, sd);
              const isSelectedEv = selectedDay === ev.date;

              let dateText = startDate.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                weekday: "short",
              });

              if (ev.endDate && ev.endDate !== ev.date) {
                const [ey, em, ed] = ev.endDate.split("-").map(Number);
                const endDate = new Date(ey, em - 1, ed);
                dateText = `${startDate.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                })} – ${endDate.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                })}`;
              }

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDay(ev.date)}
                  className={`w-full text-left flex items-center justify-between p-2 rounded-lg border transition-all ${
                    isSelectedEv
                      ? "bg-red-600 border-red-700 text-white shadow-sm"
                      : ev.type === "holiday"
                      ? "bg-white dark:bg-gray-800 border-red-200 dark:border-red-800/60 text-red-900 dark:text-red-200 hover:bg-red-100/70 dark:hover:bg-red-900/40"
                      : "bg-white dark:bg-gray-800 border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 hover:bg-amber-100/70 dark:hover:bg-amber-900/40"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-base flex-shrink-0">
                      {ev.type === "holiday" ? "🏖️" : "🌴"}
                    </span>
                    <span className="text-xs font-bold truncate">{ev.label}</span>
                  </div>
                  <span
                    className={`text-[11px] font-semibold flex-shrink-0 ml-2 ${
                      isSelectedEv ? "text-white/90" : "opacity-75"
                    }`}
                  >
                    {dateText}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Selected Day Events Card ─────────────────────────────────────── */}
      {selectedDay && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-1.5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {new Date(selectedDay + "T00:00:00").toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            {uniqueSelected.some(e => e.type === "holiday") && (
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/50 dark:text-red-200">
                🏖️ Off Day
              </span>
            )}
          </div>

          {uniqueSelected.length === 0 ? (
            <div className="p-3 text-center rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-dashed border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-400">No scheduled events on this day</p>
            </div>
          ) : (
            uniqueSelected.map((ev, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 p-2.5 rounded-xl border text-xs ${
                  BADGE_COLORS[ev.type]
                }`}
              >
                <span className="text-base flex-shrink-0">{ICONS[ev.type]}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-bold leading-snug">{ev.label}</p>
                    <span className="text-[10px] uppercase font-bold opacity-75 capitalize">
                      {ev.type}
                    </span>
                  </div>
                  {ev.endDate && ev.endDate !== ev.date && (
                    <p className="opacity-70 text-[10px] mt-0.5">
                      Until{" "}
                      {new Date(ev.endDate + "T00:00:00").toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ── Go to Today Button ───────────────────────────────────────────── */}
      <button
        onClick={goToday}
        className="w-full text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline py-1 flex items-center justify-center gap-1"
      >
        <span>⊙</span> Jump to Today ({new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" })})
      </button>

      <p className="text-[10px] text-center text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-800 pt-2">
        Official JUIT Academic Calendar 2026–27 · Ref: JUIT/WKG/REGR/2026-27/0935
      </p>
    </div>
  );
}
