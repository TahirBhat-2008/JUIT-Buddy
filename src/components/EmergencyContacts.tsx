"use client";

import { useState, useMemo } from "react";
import { JUIT_OFFICIAL_CONTACTS, JuitContactItem } from "@/lib/juitLinksData";

export type EmergencyFilter = "all" | "emergency" | "health_hostel" | "police_safety" | "administration";

export default function EmergencyContacts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<EmergencyFilter>("emergency");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Speed-dial emergency contacts
  const speedDialContacts = useMemo(() => {
    return [
      {
        id: "sd-security",
        name: "Campus Security (24x7)",
        phone: "+91-1792-239222",
        displayPhone: "01792-239222",
        icon: "🚨",
        badge: "Control Room",
        color: "bg-red-500",
      },
      {
        id: "sd-ambulance",
        name: "Dispensary & Ambulance",
        phone: "+91-1792-239225",
        displayPhone: "01792-239225",
        icon: "🚑",
        badge: "24x7 Doctor",
        color: "bg-rose-500",
      },
      {
        id: "sd-police-112",
        name: "National Police Helpline",
        phone: "112",
        displayPhone: "112",
        icon: "🚓",
        badge: "All-in-One",
        color: "bg-blue-600",
      },
      {
        id: "sd-kandaghat",
        name: "Kandaghat Police Thana",
        phone: "01792-256124",
        displayPhone: "01792-256124",
        icon: "👮",
        badge: "Local Police",
        color: "bg-indigo-600",
      },
      {
        id: "sd-antiragging",
        name: "Anti-Ragging 24x7",
        phone: "1800-180-5522",
        displayPhone: "1800-180-5522",
        icon: "🛡️",
        badge: "Toll-Free",
        color: "bg-purple-600",
      },
      {
        id: "sd-solan-hospital",
        name: "Civil Hospital Solan",
        phone: "01792-224147",
        displayPhone: "01792-224147",
        icon: "🏥",
        badge: "Casualty / ICU",
        color: "bg-emerald-600",
      },
    ];
  }, []);

  const counts = useMemo(() => {
    return {
      all: JUIT_OFFICIAL_CONTACTS.length,
      emergency: JUIT_OFFICIAL_CONTACTS.filter((c) => c.isEmergency).length,
      health_hostel: JUIT_OFFICIAL_CONTACTS.filter((c) => c.category === "health_hostel").length,
      police_safety: JUIT_OFFICIAL_CONTACTS.filter((c) => c.category === "police_safety").length,
      administration: JUIT_OFFICIAL_CONTACTS.filter((c) => c.category === "administration").length,
    };
  }, []);

  const filteredContacts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return JUIT_OFFICIAL_CONTACTS.filter((c) => {
      if (activeFilter === "emergency" && !c.isEmergency) return false;
      if (activeFilter === "health_hostel" && c.category !== "health_hostel") return false;
      if (activeFilter === "police_safety" && c.category !== "police_safety") return false;
      if (activeFilter === "administration" && c.category !== "administration") return false;

      if (!q) return true;
      return (
        c.role.toLowerCase().includes(q) ||
        (c.department && c.department.toLowerCase().includes(q)) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.phone && c.phone.includes(q)) ||
        (c.location && c.location.toLowerCase().includes(q))
      );
    }).sort((a, b) => (a.priority || 99) - (b.priority || 99));
  }, [searchQuery, activeFilter]);

  const FILTERS: Array<{ id: EmergencyFilter; label: string; count: number; icon: string }> = [
    { id: "emergency", label: "24x7 Emergency", count: counts.emergency, icon: "🚨" },
    { id: "health_hostel", label: "Health & Hostels", count: counts.health_hostel, icon: "🏥" },
    { id: "police_safety", label: "Police & Safety", count: counts.police_safety, icon: "👮" },
    { id: "administration", label: "Administration", count: counts.administration, icon: "🏛️" },
    { id: "all", label: "All Contacts", count: counts.all, icon: "📞" },
  ];

  return (
    <div className="space-y-3.5 w-full max-w-full overflow-hidden min-w-0">
      {/* ── 🚨 24x7 Emergency Speed-Dial Quick Cards ── */}
      <div className="p-3 rounded-2xl bg-gradient-to-br from-rose-50 via-red-50/60 to-orange-50/40 dark:from-rose-950/50 dark:via-red-950/30 dark:to-gray-900 border border-rose-200/90 dark:border-rose-800/80 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-base animate-pulse">🚨</span>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-200">
              24x7 Emergency Speed Dial
            </span>
          </div>
          <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/70 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-800">
            One-Tap Call
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {speedDialContacts.map((sd) => (
            <div
              key={sd.id}
              className="p-2 rounded-xl bg-white/95 dark:bg-gray-800/95 border border-rose-200/80 dark:border-rose-900/60 flex flex-col justify-between gap-1.5 shadow-2xs hover:shadow-xs transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-1">
                  <span className="text-sm">{sd.icon}</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {sd.badge}
                  </span>
                </div>
                <div className="font-semibold text-gray-900 dark:text-gray-100 text-[11px] mt-1 leading-tight line-clamp-1">
                  {sd.name}
                </div>
                <div className="font-mono text-[11px] font-bold text-rose-600 dark:text-rose-400">
                  {sd.displayPhone}
                </div>
              </div>

              <div className="flex items-center gap-1 pt-1 border-t border-gray-100 dark:border-gray-700/60">
                <a
                  href={`tel:${sd.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex-1 text-center py-1 rounded-md bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>📞</span>
                  <span>Call</span>
                </a>
                <button
                  onClick={() => handleCopy(sd.phone, sd.id)}
                  className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium text-[10px] transition-colors border border-gray-200 dark:border-gray-600 cursor-pointer"
                  title="Copy phone number"
                >
                  {copiedId === sd.id ? "✓" : "📋"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search Emergency Numbers */}
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          🔍
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search emergency numbers, ambulance, doctor, security, police, warden..."
          className="w-full pl-10 pr-9 py-2.5 bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500 transition-all shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs p-1 cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 text-xs max-w-full min-w-0">
        {FILTERS.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? tab.id === "emergency"
                    ? "bg-rose-600 text-white shadow-sm shadow-rose-500/30"
                    : "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                  : tab.id === "emergency"
                  ? "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50 border border-rose-200 dark:border-rose-800"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-transparent dark:border-gray-700/50"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Contact Cards List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 px-0.5">
          <span>
            Showing <strong>{filteredContacts.length}</strong> {activeFilter === "emergency" ? "emergency" : ""} helplines
          </span>
          <span>Tap 📞 to dial directly</span>
        </div>

        {filteredContacts.length === 0 ? (
          <div className="p-8 text-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
            <span className="text-3xl block mb-2">🔍</span>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              No contacts found matching &quot;{searchQuery}&quot;
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2.5">
            {filteredContacts.map((c) => (
              <div
                key={c.id}
                className={`p-3 rounded-xl border transition-all flex flex-col justify-between gap-2.5 shadow-2xs hover:shadow-xs ${
                  c.isEmergency
                    ? "border-rose-200/90 dark:border-rose-900/60 bg-gradient-to-br from-rose-50/40 via-white to-white dark:from-rose-950/20 dark:via-gray-800 dark:to-gray-800"
                    : "border-gray-200/90 dark:border-gray-700/80 bg-white dark:bg-gray-800"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-1.5">
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 leading-snug">
                      {c.role}
                    </h4>
                    {c.isEmergency && (
                      <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded-md bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-800 flex-shrink-0 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                        24x7 Emergency
                      </span>
                    )}
                    {c.department && !c.isEmergency && (
                      <span className="text-[9.5px] px-1.5 py-0.2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium flex-shrink-0">
                        {c.department}
                      </span>
                    )}
                  </div>

                  {c.location && (
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <span>📍</span>
                      <span className="truncate">{c.location}</span>
                    </p>
                  )}

                  {c.timing && (
                    <p className="text-[10.5px] text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1">
                      <span>🕒</span>
                      <span>{c.timing}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    {c.phone && (
                      <div className="font-mono text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
                        {c.phone}
                      </div>
                    )}
                    {c.email && (
                      <a
                        href={`mailto:${c.email}`}
                        className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline truncate block"
                      >
                        {c.email}
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    {c.phone && (
                      <>
                        <a
                          href={`tel:${c.phone.replace(/[^0-9+]/g, "")}`}
                          className={`px-2.5 py-1 rounded-lg text-white font-bold text-xs transition-all shadow-xs flex items-center gap-1 cursor-pointer active:scale-95 ${
                            c.isEmergency ? "bg-rose-600 hover:bg-rose-700" : "bg-blue-600 hover:bg-blue-700"
                          }`}
                        >
                          <span>📞</span>
                          <span>Call</span>
                        </a>
                        <button
                          onClick={() => handleCopy(c.phone || "", c.id)}
                          className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium border border-gray-200 dark:border-gray-600 cursor-pointer"
                          title="Copy phone"
                        >
                          {copiedId === c.id ? "✓" : "📋"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
