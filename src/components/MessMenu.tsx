"use client";

import { useEffect, useState } from "react";
import { MessMenu as MessMenuData, FALLBACK_MESS_MENU } from "@/lib/juitData";

type MealKey = "breakfast" | "lunch" | "dinner";

const meals: { key: MealKey; label: string; emoji: string; color: string }[] = [
  { key: "breakfast", label: "Breakfast", emoji: "🌅", color: "border-amber-400 bg-amber-50 dark:border-amber-600 dark:bg-amber-950/30" },
  { key: "lunch", label: "Lunch", emoji: "🌤️", color: "border-emerald-400 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-950/30" },
  { key: "dinner", label: "Dinner", emoji: "🌙", color: "border-indigo-400 bg-indigo-50 dark:border-indigo-600 dark:bg-indigo-950/30" },
];

export default function MessMenu() {
  const [selectedDay, setSelectedDay] = useState(() => {
    const today = new Date().getDay(); // 0 = Sunday
    return today === 0 ? "Sunday" : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][today - 1];
  });
  const [menu, setMenu] = useState<MessMenuData>(FALLBACK_MESS_MENU);
  const [loading, setLoading] = useState(true);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/mess-menu")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data && data.weekly && data.weekly.length > 0) {
          setMenu(data);
          setLive(true);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const today = menu.weekly.find((d) => d.day === selectedDay) || menu.weekly[0];

  return (
    <div className="w-full max-w-full overflow-hidden min-w-0 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">🍽️ Mess Menu</h3>
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full ${
            live
              ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
              : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
          }`}
          title={live ? "Loaded live from juittimetable.me" : "Showing saved snapshot"}
        >
          {live ? "● Live" : loading ? "…" : "Snapshot"}
        </span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{menu.source}</p>

      {/* Day selector */}
      <div className="flex flex-wrap gap-1 mb-3 max-w-full min-w-0">
        {menu.weekly.map((d) => (
          <button
            key={d.day}
            onClick={() => setSelectedDay(d.day)}
            className={`px-2 sm:px-3 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              selectedDay === d.day
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {d.day.slice(0, 3)}
          </button>
        ))}
      </div>

      <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">{today.day}</h4>

      {/* Meals */}
      <div className="space-y-3">
        {meals.map((meal) => {
          const items = (today[meal.key] || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
          const time = menu.mealTimes?.[meal.key];
          return (
            <div key={meal.key} className={`border-l-4 rounded-lg p-3 ${meal.color}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {meal.emoji} {meal.label}
                </span>
                {time && (
                  <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400">{time}</span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item, i) => (
                  <span
                    key={i}
                    className="text-xs bg-white/80 dark:bg-gray-700/80 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-full px-2.5 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Milk distribution */}
      {menu.milkDistribution && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900/60 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 mb-2">🥛 Night Milk Distribution</p>
          {menu.milkDistribution.girls && (
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
              <span className="font-medium">Girls:</span> {menu.milkDistribution.girls.place}
            </p>
          )}
          {menu.milkDistribution.boys && (
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
              <span className="font-medium">Boys:</span> {menu.milkDistribution.boys.place}
            </p>
          )}
          {menu.milkDistribution.firstYearBoys && (
            <p className="text-xs text-gray-600 dark:text-gray-300">
              <span className="font-medium">1st Year Boys:</span>{" "}
              {menu.milkDistribution.firstYearBoys.place}
            </p>
          )}
          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5">
            Updated: {menu.lastUpdated}
          </p>
        </div>
      )}
    </div>
  );
}