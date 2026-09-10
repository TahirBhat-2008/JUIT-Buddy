"use client";

import { useState, useMemo } from "react";
import {
  JUIT_OFFICIAL_LINKS,
  JUIT_OFFICIAL_CONTACTS,
  JUIT_CATEGORIES,
  JuitLinkCategory,
  JuitLinkItem,
  JuitContactItem,
} from "@/lib/juitLinksData";

type ContactSubFilter = "all" | "emergency" | "health_hostel" | "police_safety" | "administration";

interface JuitWebsitesDirectoryProps {
  onOpenReport?: () => void;
  initialTab?: JuitLinkCategory | "contacts" | "emergency";
}

export default function JuitWebsitesDirectory({
  onOpenReport,
  initialTab = "all",
}: JuitWebsitesDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<JuitLinkCategory | "contacts">(
    initialTab === "emergency" ? "contacts" : initialTab
  );
  const [contactSubFilter, setContactSubFilter] = useState<ContactSubFilter>(
    initialTab === "emergency" ? "emergency" : "all"
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const emergencyContactsCount = useMemo(
    () => JUIT_OFFICIAL_CONTACTS.filter((c) => c.isEmergency).length,
    []
  );

  const filteredLinks = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return JUIT_OFFICIAL_LINKS.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      if (!matchesCategory) return false;

      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.url.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q)) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, activeCategory]);

  const filteredContacts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return JUIT_OFFICIAL_CONTACTS.filter((c) => {
      // Sub-filter check
      if (contactSubFilter === "emergency" && !c.isEmergency) return false;
      if (contactSubFilter === "health_hostel" && c.category !== "health_hostel") return false;
      if (contactSubFilter === "police_safety" && c.category !== "police_safety") return false;
      if (contactSubFilter === "administration" && c.category !== "administration") return false;

      if (!q) return true;
      return (
        c.role.toLowerCase().includes(q) ||
        (c.department && c.department.toLowerCase().includes(q)) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.phone && c.phone.includes(q)) ||
        (c.location && c.location.toLowerCase().includes(q))
      );
    }).sort((a, b) => (a.priority || 99) - (b.priority || 99));
  }, [searchQuery, contactSubFilter]);

  // Top speed-dial emergency contacts
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
        name: "National Police Emergency",
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

  const getCategoryColor = (cat: JuitLinkItem["category"]) => {
    switch (cat) {
      case "library":
        return "bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/60";
      case "academic":
        return "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60";
      case "career":
        return "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60";
      case "campus_services":
        return "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60";
      case "student_bodies":
        return "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/60";
      default:
        return "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700";
    }
  };

  return (
    <div className="space-y-4 w-full max-w-full overflow-hidden min-w-0">
      {/* Developer & Direct Report Channel Banner */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-rose-50/70 via-orange-50/30 to-white dark:from-rose-950/30 dark:via-gray-800 dark:to-gray-800 border border-rose-200/80 dark:border-rose-900/60 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-300 flex items-center justify-center text-base flex-shrink-0">
              🚩
            </span>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                <span>Developer &amp; Bug Report Line</span>
                <span className="text-[9.5px] font-bold px-1.5 py-0.2 rounded-md bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                  Direct Channel
                </span>
              </h4>
              <p className="text-[11px] text-gray-600 dark:text-gray-400">
                Created &amp; maintained by Tahir Bhat • Send reports directly from this web app
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <a
              href="https://www.linkedin.com/in/tahirbhat-2008-cse"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#0077b5] text-white hover:bg-[#005f93] transition-all flex items-center gap-1 shadow-xs cursor-pointer"
              title="Open Tahir's LinkedIn"
            >
              <span>in</span>
              <span>LinkedIn</span>
              <span className="text-[10px]">↗</span>
            </a>
            {onOpenReport && (
              <button
                type="button"
                onClick={onOpenReport}
                className="text-[11px] font-bold px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <span>✉️ Open Message Box</span>
              </button>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-rose-100 dark:border-gray-700 flex items-center justify-between text-[11px] text-gray-600 dark:text-gray-400 flex-wrap gap-1">
          <div className="flex items-center gap-1.5">
            <span>Direct Email:</span>
            <strong className="font-mono text-gray-900 dark:text-gray-100 font-semibold">tahirbhat2008@gmail.com</strong>
            <button
              onClick={() => handleCopy("tahirbhat2008@gmail.com", "dev-email")}
              className="px-1.5 py-0.5 rounded text-[10px] bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-gray-700 dark:text-gray-300 transition-colors border border-gray-200 dark:border-gray-600 cursor-pointer"
            >
              {copiedId === "dev-email" ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Inbox delivery without leaving website
          </span>
        </div>
      </div>

      {/* Search Header */}
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          🔍
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search portals, emergency numbers (security, ambulance, police, ragging...)"
          className="w-full pl-10 pr-9 py-2.5 bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs p-1"
          >
            ✕
          </button>
        )}
      </div>

      {/* Categories & Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 text-xs max-w-full min-w-0">
        {JUIT_CATEGORIES.map((cat) => {
          const count =
            cat.id === "all"
              ? JUIT_OFFICIAL_LINKS.length
              : JUIT_OFFICIAL_LINKS.filter((l) => l.category === cat.id).length;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-transparent dark:border-gray-700/50"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}

        {/* 🚨 24x7 Emergency Tab Button */}
        <button
          onClick={() => {
            setActiveCategory("contacts");
            setContactSubFilter("emergency");
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all ${
            activeCategory === "contacts" && contactSubFilter === "emergency"
              ? "bg-rose-600 text-white shadow-sm shadow-rose-500/30 ring-2 ring-rose-400/40"
              : "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50 border border-rose-200 dark:border-rose-800"
          }`}
        >
          <span className="animate-pulse">🚨</span>
          <span>24x7 Emergency</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              activeCategory === "contacts" && contactSubFilter === "emergency"
                ? "bg-white/20 text-white"
                : "bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200"
            }`}
          >
            {emergencyContactsCount}
          </span>
        </button>

        {/* All Contacts Tab Button */}
        <button
          onClick={() => {
            setActiveCategory("contacts");
            setContactSubFilter("all");
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
            activeCategory === "contacts" && contactSubFilter !== "emergency"
              ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-transparent dark:border-gray-700/50"
          }`}
        >
          <span>📞</span>
          <span>All Contacts</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              activeCategory === "contacts" && contactSubFilter !== "emergency"
                ? "bg-white/20 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}
          >
            {JUIT_OFFICIAL_CONTACTS.length}
          </span>
        </button>
      </div>

      {/* View 1: Links Directory */}
      {activeCategory !== "contacts" && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 px-0.5">
            <span>
              Showing <strong>{filteredLinks.length}</strong> official resources
            </span>
            <span>Tap ↗ to open or 📋 to copy link</span>
          </div>

          {filteredLinks.length === 0 ? (
            <div className="p-8 text-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
              <span className="text-3xl block mb-2">🔍</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                No JUIT portals found matching &quot;{searchQuery}&quot;
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {filteredLinks.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-gray-200/90 dark:border-gray-700/80 bg-white dark:bg-gray-800/90 hover:border-blue-300 dark:hover:border-blue-600/60 transition-all group flex flex-col justify-between gap-3 shadow-xs hover:shadow-sm"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-lg flex-shrink-0">{item.icon}</span>
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                          {item.title}
                        </h4>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[9.5px] px-2 py-0.5 rounded-full font-semibold border flex-shrink-0 ${getCategoryColor(
                            item.category
                          )}`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between text-xs gap-2">
                    <button
                      onClick={() => handleCopy(item.url, item.id)}
                      className="text-[11px] text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>📋</span>
                      <span>{copiedId === item.id ? "Copied!" : "Copy URL"}</span>
                    </button>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <span>Open Portal</span>
                      <span className="text-[10px]">↗</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* View 2: Official Contacts & Emergency Directory */}
      {activeCategory === "contacts" && (
        <div className="space-y-3.5">
          {/* ── 🚨 24x7 Emergency Speed-Dial Quick Cards ── */}
          <div className="p-3 rounded-2xl bg-gradient-to-br from-rose-50 via-red-50/50 to-orange-50/30 dark:from-rose-950/40 dark:via-red-950/20 dark:to-gray-900 border border-rose-200 dark:border-rose-800/70 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-base animate-pulse">🚨</span>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-200">
                  24x7 Emergency Speed Dial
                </span>
              </div>
              <span className="text-[10px] font-semibold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/60 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-800">
                Direct Call
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {speedDialContacts.map((sd) => (
                <div
                  key={sd.id}
                  className="p-2 rounded-xl bg-white/95 dark:bg-gray-800/90 border border-rose-200/80 dark:border-rose-900/60 flex flex-col justify-between gap-1.5 shadow-2xs hover:shadow-xs transition-all"
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
                    <div className="font-mono text-[11px] font-bold text-gray-700 dark:text-gray-300">
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
                      className="px-1.5 py-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-gray-600 dark:text-gray-300 text-[10px] font-medium transition-colors cursor-pointer"
                      title="Copy Number"
                    >
                      {copiedId === sd.id ? "✓" : "📋"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-Filter Tabs for Contacts */}
          <div className="flex items-center justify-between gap-2 flex-wrap max-w-full min-w-0">
            <div className="flex flex-wrap gap-1 text-xs max-w-full min-w-0">
              {[
                { id: "all", label: "All Contacts", count: JUIT_OFFICIAL_CONTACTS.length, icon: "📋" },
                { id: "emergency", label: "🚨 24x7 Emergency", count: emergencyContactsCount, icon: "🚨" },
                { id: "health_hostel", label: "Health & Hostels", count: JUIT_OFFICIAL_CONTACTS.filter(c => c.category === "health_hostel").length, icon: "🏥" },
                { id: "police_safety", label: "Police & Safety", count: JUIT_OFFICIAL_CONTACTS.filter(c => c.category === "police_safety").length, icon: "🚓" },
                { id: "administration", label: "Administration", count: JUIT_OFFICIAL_CONTACTS.filter(c => c.category === "administration").length, icon: "🏫" },
              ].map((tab) => {
                const isSelected = contactSubFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setContactSubFilter(tab.id as ContactSubFilter)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? tab.id === "emergency"
                          ? "bg-rose-600 text-white shadow-xs font-bold"
                          : "bg-blue-600 text-white shadow-xs"
                        : tab.id === "emergency"
                          ? "bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected ? "bg-white/20 text-white" : "bg-gray-200/80 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <span className="text-[11px] text-gray-500 dark:text-gray-400">
              Showing {filteredContacts.length} {contactSubFilter === "emergency" ? "emergency" : ""} contacts
            </span>
          </div>

          {/* Contact Cards List */}
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
                  className={`p-3.5 rounded-xl border transition-all shadow-xs ${
                    c.isEmergency
                      ? "bg-rose-50/60 dark:bg-rose-950/25 border-rose-200 dark:border-rose-800/80 hover:border-rose-400 dark:hover:border-rose-700"
                      : "bg-white dark:bg-gray-800/90 border-gray-200/90 dark:border-gray-700/80 hover:border-blue-300 dark:hover:border-blue-700"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100">
                          {c.role}
                        </h4>
                        {c.isEmergency && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-700 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                            <span>24x7 Emergency</span>
                          </span>
                        )}
                        {c.department && !c.isEmergency && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                            {c.department}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2.5 text-xs text-gray-600 dark:text-gray-300">
                        {c.phone && (
                          <div className="flex items-center justify-between gap-2 bg-white dark:bg-gray-900/60 p-2 rounded-lg border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="text-gray-400 flex-shrink-0">📞</span>
                              <span className="font-mono font-bold text-gray-900 dark:text-white truncate">
                                {c.phone}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <a
                                href={`tel:${c.phone.replace(/[^0-9+]/g, "")}`}
                                className={`px-2 py-1 rounded text-[11px] font-bold text-white transition-colors cursor-pointer flex items-center gap-1 ${
                                  c.isEmergency ? "bg-rose-600 hover:bg-rose-700" : "bg-blue-600 hover:bg-blue-700"
                                }`}
                              >
                                <span>Call</span>
                              </a>
                              <button
                                onClick={() => handleCopy(c.phone || "", c.id)}
                                className="px-2 py-1 rounded text-[11px] font-medium bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-gray-700 dark:text-gray-300 transition-colors border border-gray-200 dark:border-gray-600 cursor-pointer"
                                title="Copy Number"
                              >
                                {copiedId === c.id ? "✓" : "📋"}
                              </button>
                            </div>
                          </div>
                        )}

                        {c.email && (
                          <div className="flex items-center justify-between gap-2 bg-white dark:bg-gray-900/60 p-2 rounded-lg border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="text-gray-400 flex-shrink-0">📧</span>
                              <a
                                href={`mailto:${c.email}`}
                                className="font-medium text-blue-600 dark:text-blue-400 hover:underline truncate"
                              >
                                {c.email}
                              </a>
                            </div>
                            <button
                              onClick={() => handleCopy(c.email || "", `email-${c.id}`)}
                              className="px-2 py-1 rounded text-[11px] font-medium bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-gray-700 dark:text-gray-300 transition-colors border border-gray-200 dark:border-gray-600 cursor-pointer flex-shrink-0"
                              title="Copy Email"
                            >
                              {copiedId === `email-${c.id}` ? "✓" : "📋"}
                            </button>
                          </div>
                        )}

                        {c.location && (
                          <div className="flex items-center gap-1.5 sm:col-span-2 text-[11px] text-gray-600 dark:text-gray-300 bg-gray-50/80 dark:bg-gray-900/40 px-2.5 py-1.5 rounded-lg border border-gray-100 dark:border-gray-800">
                            <span className="text-gray-400 flex-shrink-0">📍</span>
                            <span>{c.location}</span>
                          </div>
                        )}

                        {c.timing && (
                          <div className="flex items-center gap-1.5 sm:col-span-2 text-[11px] text-gray-600 dark:text-gray-300 bg-gray-50/80 dark:bg-gray-900/40 px-2.5 py-1.5 rounded-lg border border-gray-100 dark:border-gray-800">
                            <span className="text-gray-400 flex-shrink-0">⏰</span>
                            <span className="font-medium">{c.timing}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
