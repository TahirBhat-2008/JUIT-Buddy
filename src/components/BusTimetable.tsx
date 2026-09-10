"use client";

import { useState, useMemo } from "react";
import {
  SOLAN_SHIMLA_BUS_SCHEDULE,
  BUS_ENQUIRY_CONTACTS,
  TRANSIT_CONNECTIVITY_TIPS,
  type BusDirection,
  type BusTimeOfDay,
  type BusCategory,
  type BusScheduleItem,
} from "@/lib/busTimetable";

interface BusTimetableProps {
  initialDirection?: BusDirection;
}

export default function BusTimetable({ initialDirection = "solan_to_shimla" }: BusTimetableProps) {
  const [direction, setDirection] = useState<BusDirection>(initialDirection);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<BusTimeOfDay>("all");
  const [selectedCategory, setSelectedCategory] = useState<BusCategory>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showHelplines, setShowHelplines] = useState<boolean>(false);
  const [showLocalTips, setShowLocalTips] = useState<boolean>(false);

  // Filter buses based on direction, time of day, bus category, and search query
  const filteredBuses = useMemo(() => {
    return SOLAN_SHIMLA_BUS_SCHEDULE.filter((bus) => {
      // Direction match
      if (bus.direction !== direction) return false;

      // Time of day match
      if (selectedTimeOfDay !== "all" && bus.timeOfDay !== selectedTimeOfDay) return false;

      // Bus category match
      if (selectedCategory !== "all") {
        if (selectedCategory === "ordinary" && bus.busType !== "Ordinary") return false;
        if (selectedCategory === "express" && bus.busType !== "Express") return false;
        if (selectedCategory === "deluxe" && bus.busType !== "Deluxe") return false;
        if (selectedCategory === "volvo" && bus.busType !== "Volvo AC") return false;
      }

      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          bus.departureTime.toLowerCase().includes(query) ||
          bus.waknaghatTime.toLowerCase().includes(query) ||
          bus.arrivalTime.toLowerCase().includes(query) ||
          bus.operator.toLowerCase().includes(query) ||
          bus.busType.toLowerCase().includes(query) ||
          bus.fromStation.toLowerCase().includes(query) ||
          bus.toStation.toLowerCase().includes(query) ||
          bus.routeVia.toLowerCase().includes(query) ||
          bus.keyStops.some((stop) => stop.toLowerCase().includes(query)) ||
          (bus.note && bus.note.toLowerCase().includes(query));
        if (!matchesQuery) return false;
      }

      return true;
    });
  }, [direction, selectedTimeOfDay, selectedCategory, searchQuery]);

  // Counts for direction tabs
  const solanToShimlaCount = useMemo(
    () => SOLAN_SHIMLA_BUS_SCHEDULE.filter((b) => b.direction === "solan_to_shimla").length,
    []
  );
  const shimlaToSolanCount = useMemo(
    () => SOLAN_SHIMLA_BUS_SCHEDULE.filter((b) => b.direction === "shimla_to_solan").length,
    []
  );

  const getTypeBadgeColor = (busType: BusScheduleItem["busType"]) => {
    switch (busType) {
      case "Ordinary":
        return "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700";
      case "Express":
        return "bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700";
      case "Deluxe":
        return "bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700";
      case "Volvo AC":
        return "bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700";
    }
  };

  return (
    <div className="w-full max-w-full overflow-hidden min-w-0 space-y-4">
      {/* Header Banner */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 text-white shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🚌</span>
              <h3 className="font-bold text-base leading-tight">Solan ⇄ Waknaghat ⇄ Shimla Timetable</h3>
            </div>
            <p className="text-xs text-blue-100 mt-1 leading-relaxed">
              Official HRTC & local Mudrika bus departures. Waknaghat Chowk (NH-5) is the link point for JUIT Gate 1 (3.5 km).
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
            <button
              type="button"
              onClick={() => setShowHelplines(!showHelplines)}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>📞</span>
              <span>HRTC Helplines</span>
            </button>
            <button
              type="button"
              onClick={() => setShowLocalTips(!showLocalTips)}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>💡</span>
              <span>Taxi & Tips</span>
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Helplines Section (Toggleable) */}
      {showHelplines && (
        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-2.5 fade-slide-in">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <span>📞</span> HRTC Bus Station Inquiry & Helplines
            </h4>
            <button
              type="button"
              onClick={() => setShowHelplines(false)}
              className="text-xs font-bold text-amber-700 dark:text-amber-300 hover:text-amber-900 cursor-pointer"
            >
              ✕ Close
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {BUS_ENQUIRY_CONTACTS.map((item) => (
              <div
                key={item.station}
                className="p-2.5 rounded-xl bg-white dark:bg-gray-900 border border-amber-200/70 dark:border-amber-900/50 flex items-center justify-between gap-2"
              >
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{item.station}</p>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400">{item.desc}</p>
                  <p className="text-[10px] text-amber-700 dark:text-amber-300 font-medium mt-0.5">{item.timing}</p>
                </div>
                <a
                  href={`tel:${item.phone.replace(/[^0-9]/g, "")}`}
                  className="px-2.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] transition-colors flex-shrink-0 flex items-center gap-1"
                >
                  <span>📞</span>
                  <span>{item.phone}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Local Connectivity Tips (Toggleable) */}
      {showLocalTips && (
        <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2.5 fade-slide-in">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
              <span>💡</span> Waknaghat Local Connectivity & Boarding Guide
            </h4>
            <button
              type="button"
              onClick={() => setShowLocalTips(false)}
              className="text-xs font-bold text-blue-700 dark:text-blue-300 hover:text-blue-900 cursor-pointer"
            >
              ✕ Close
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {TRANSIT_CONNECTIVITY_TIPS.map((tip) => (
              <div
                key={tip.title}
                className="p-2.5 rounded-xl bg-white dark:bg-gray-900 border border-blue-200/70 dark:border-blue-900/50 space-y-1"
              >
                <p className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <span className="text-sm">{tip.icon}</span>
                  <span>{tip.title}</span>
                </p>
                <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">{tip.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Direction Switcher (Main Solan <-> Shimla Toggle) */}
      <div className="p-1 rounded-xl bg-gray-100 dark:bg-gray-800/80 flex items-center gap-1 border border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={() => setDirection("solan_to_shimla")}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            direction === "solan_to_shimla"
              ? "bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-xs scale-[1.01]"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <span>Solan ➔ Shimla</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-mono">
            {solanToShimlaCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setDirection(direction === "solan_to_shimla" ? "shimla_to_solan" : "solan_to_shimla")}
          title="Swap Direction"
          className="p-2 rounded-lg text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-200/60 dark:hover:bg-gray-700/60 transition-colors cursor-pointer"
        >
          ⇄
        </button>

        <button
          type="button"
          onClick={() => setDirection("shimla_to_solan")}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            direction === "shimla_to_solan"
              ? "bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-xs scale-[1.01]"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <span>Shimla ➔ Solan</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-mono">
            {shimlaToSolanCount}
          </span>
        </button>
      </div>

      {/* Waknaghat JUIT Boarding Alert Banner */}
      <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-base">📍</span>
          <div>
            <p className="font-bold text-emerald-900 dark:text-emerald-200">
              {direction === "solan_to_shimla"
                ? "Buses reach Waknaghat Chowk ~35–40 mins after Solan departure"
                : "Buses reach Waknaghat Chowk ~40–45 mins after Shimla departure"}
            </p>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
              Board or alight at Waknaghat NH-5 Chowk for JUIT Gate 1 (Shared Maruti Omni / Auto fare: ₹30–₹40).
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-2">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by time, stop, bus type (e.g. 08:30, Volvo, Kandaghat, ISBT)..."
            className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-2.5 text-gray-400 text-xs">🔍</span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Pills Row */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs max-w-full min-w-0">
          {/* Time Filters */}
          <div className="flex items-center flex-wrap gap-1 max-w-full min-w-0">
            {(
              [
                { id: "all", label: "All Day" },
                { id: "morning", label: "🌅 Morning" },
                { id: "afternoon", label: "☀️ Afternoon" },
                { id: "evening", label: "🌙 Evening" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTimeOfDay(t.id)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedTimeOfDay === t.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-1 hidden sm:block" />

          {/* Category Filters */}
          <div className="flex items-center flex-wrap gap-1 max-w-full min-w-0">
            {(
              [
                { id: "all", label: "All Types" },
                { id: "ordinary", label: "🟢 Ordinary (₹35–₹40)" },
                { id: "express", label: "🔵 Express (₹40–₹45)" },
                { id: "deluxe", label: "🟣 Deluxe (₹65–₹75)" },
                { id: "volvo", label: "🟡 Volvo AC (₹110)" },
              ] as const
            ).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCategory(c.id)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === c.id
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count & Frequency Notice */}
      <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 px-1">
        <span>
          Showing <strong>{filteredBuses.length}</strong> departures
        </span>
        <span>Peak frequency: Every 10–15 mins</span>
      </div>

      {/* Bus Schedule Cards List */}
      <div className="space-y-2.5">
        {filteredBuses.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
            <p className="text-2xl mb-1.5">🚌</p>
            <p className="font-semibold text-gray-700 dark:text-gray-300">No matching buses found</p>
            <p className="mt-1">Try clearing your search query or selecting \"All Day\" / \"All Types\".</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedTimeOfDay("all");
                setSelectedCategory("all");
              }}
              className="mt-3 px-3 py-1.5 bg-blue-600 text-white rounded-lg font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredBuses.map((bus) => (
            <div
              key={bus.id}
              className="p-3.5 rounded-2xl border border-gray-200/90 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xs hover:border-blue-300 dark:hover:border-blue-700 transition-all space-y-2.5"
            >
              {/* Card Top Row: Operator & Type Badges + Fares */}
              <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-gray-900 dark:text-white">{bus.operator}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getTypeBadgeColor(bus.busType)}`}>
                    {bus.busType}
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                    • {bus.frequency}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-[10.5px] px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold">
                    Waknaghat: {bus.fareFromWaknaghat}
                  </span>
                  <span className="text-[10.5px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-medium">
                    Full: {bus.fullFare}
                  </span>
                </div>
              </div>

              {/* Timeline Row: Departure -> Waknaghat Passing Time -> Arrival */}
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-1.5 sm:gap-2 text-xs min-w-0">
                {/* Origin */}
                <div className="text-left flex-shrink-0">
                  <p className="font-extrabold text-sm text-gray-900 dark:text-white">{bus.departureTime}</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium truncate max-w-[85px] sm:max-w-[140px]">
                    {bus.fromStation}
                  </p>
                </div>

                {/* Waknaghat Chowk JUIT Link Indicator */}
                <div className="flex-1 min-w-0 flex flex-col items-center px-1 text-center">
                  <div className="w-full flex items-center justify-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 min-w-0">
                    <span className="h-px bg-emerald-300 dark:bg-emerald-700 flex-1 hidden min-[400px]:block" />
                    <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center gap-1 text-[9px] sm:text-[10px] min-w-0">
                      <span>📍</span>
                      <span className="truncate">Waknaghat ~{bus.waknaghatTime}</span>
                    </span>
                    <span className="h-px bg-emerald-300 dark:bg-emerald-700 flex-1 hidden min-[400px]:block" />
                  </div>
                  <span className="text-[9px] sm:text-[9.5px] text-gray-500 dark:text-gray-400 mt-0.5 truncate max-w-full">
                    (JUIT Gate 1 Cut on NH-5)
                  </span>
                </div>

                {/* Destination */}
                <div className="text-right flex-shrink-0">
                  <p className="font-extrabold text-sm text-blue-600 dark:text-blue-400">{bus.arrivalTime}</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium truncate max-w-[85px] sm:max-w-[140px]">
                    {bus.toStation}
                  </p>
                </div>
              </div>

              {/* Route & Stops Row */}
              <div className="text-[11px] text-gray-600 dark:text-gray-400 flex flex-col gap-1">
                <p>
                  <strong className="text-gray-700 dark:text-gray-300 font-semibold">Route: </strong>
                  {bus.routeVia}
                </p>
                {bus.note && (
                  <p className="text-[10.5px] text-blue-700 dark:text-blue-300 bg-blue-50/70 dark:bg-blue-950/30 px-2 py-1 rounded-md border border-blue-100 dark:border-blue-900/50">
                    ℹ️ {bus.note}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Sticky Inquiry Banner */}
      <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 text-xs flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div>
          <p className="font-bold text-gray-900 dark:text-white">Need Live Bus Status or Missing A Bus?</p>
          <p className="text-[11px] text-gray-600 dark:text-gray-400">
            Call Solan HRTC (01792-220171) or Shimla ISBT (0177-2806587) for real-time dispatch updates.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href="tel:01792220171"
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center gap-1"
          >
            <span>📞</span>
            <span>Call Solan</span>
          </a>
          <a
            href="tel:01772806587"
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors flex items-center gap-1"
          >
            <span>📞</span>
            <span>Call Shimla</span>
          </a>
        </div>
      </div>
    </div>
  );
}
