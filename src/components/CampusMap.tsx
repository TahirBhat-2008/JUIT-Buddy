"use client";

import { useMemo, useState } from "react";
import {
  CAMPUS_PLACES,
  CAMPUS_ROUTES,
  ACADEMIC_FLOORS,
  TRANSIT_GUIDE,
  TERRACE_DETAILS,
  ZONE_LABEL,
  ZONE_TONE,
  GOOGLE_MAPS_URL,
  GOOGLE_MAPS_EMBED_URL,
  GOOGLE_MAPS_DIRECTIONS_URL,
  OFFICIAL_LOCATION_URL,
  OSM_EMBED_URL,
  OSM_OPEN_URL,
  searchCampusPlaces,
  NEARBY_SPOTS,
  NEARBY_ZONES,
  type CampusPlace,
  type CampusZone,
  type CampusCategory,
  type NearbySpot,
  type NearbyZoneDistance,
} from "@/lib/campusMap";
import BusTimetable from "@/components/BusTimetable";

type MapTab = "map" | "routes" | "floors" | "nearby" | "transit" | "tour";
type MapViewType = "google" | "schematic" | "osm";
type MapFocusMode = "all" | "hostels" | "roads";

type FilterCategory = "all" | "hotel" | "dhaba" | "tourist" | "lecture-theatre" | "classroom" | "tutorial" | "lab" | "hostel" | "food" | "facility";
type FilterFloor = "all" | 0 | 1 | 2 | 3 | 4;

const CATEGORY_CHIPS: Array<{ id: FilterCategory; label: string; icon: string }> = [
  { id: "all", label: "All Spots", icon: "🌟" },
  { id: "hotel", label: "Hotels & Stays", icon: "🏨" },
  { id: "dhaba", label: "Dhabas & Food", icon: "🥘" },
  { id: "tourist", label: "Tourist & Treks", icon: "🌲" },
  { id: "lecture-theatre", label: "LTs (1–4)", icon: "🏛️" },
  { id: "classroom", label: "Classrooms (CR)", icon: "🎓" },
  { id: "tutorial", label: "Tutorials (TR)", icon: "📐" },
  { id: "lab", label: "Labs (CL & Tech)", icon: "💻" },
  { id: "hostel", label: "Hostels", icon: "🏠" },
  { id: "food", label: "Campus Food", icon: "🍽️" },
  { id: "facility", label: "Facilities", icon: "⚡" },
];

const FLOOR_CHIPS: Array<{ id: FilterFloor; label: string; code: string; tag: string }> = [
  { id: "all", label: "All Floors", code: "All Floors", tag: "Every Level" },
  { id: 0, label: "Ground Floor", code: "Ground (L0)", tag: "LT-1, LT-2, Audi" },
  { id: 1, label: "1st Floor", code: "1st Floor (L1)", tag: "LT-3, LT-4, CL-1–4" },
  { id: 2, label: "2nd Floor", code: "2nd Floor (L2)", tag: "CR-1–8, CL-5–10, Physics" },
  { id: 3, label: "3rd Floor", code: "3rd Floor (L3)", tag: "CR-9–17, TR-1–4, Biotech" },
  { id: 4, label: "4th Floor", code: "4th Floor (L4)", tag: "CR-18–25, TR-5–6, Seminar" },
];

// ── JUIT 360° Virtual Tour — real 4K 360° walkthroughs (drag/pan inside the video) ──
const TOUR_VIDEOS: Array<{ id: string; label: string; icon: string; desc: string }> = [
  { id: "vzJCIIhHvM0", label: "Auditorium",  icon: "🎭", desc: "360° inside the JUIT Auditorium — OAT events, fests & seminars" },
  { id: "zmkhvs1FPBs", label: "Campus Walk I",  icon: "🚶", desc: "Part 2 — central walkways, academic block surroundings & terraces" },
  { id: "6xkXTnzRSLE", label: "Campus Walk II", icon: "🚶", desc: "Part 3 — more of the campus in 4K 360°" },
  { id: "ckKbVKs2Luk", label: "Campus Walk III", icon: "🚶", desc: "Part 4 — full-circle campus views in 4K" },
  { id: "7-ATHSKxtNc", label: "Campus Walk IV",  icon: "🚶", desc: "Part 5 — sweeping 360° panoramas of JUIT" },
  { id: "dLYagWPOSiM", label: "Snowfall ❄️",    icon: "🏔️", desc: "Part 6 — JUIT during & after snowfall (a winter must-see!)" },
];

const HOSTEL_LIST = [
  { id: "azad", name: "Azad Bhawan", code: "H-14", tag: "1st Yr Boys" },
  { id: "shastri", name: "Shastri Bhawan", code: "H-1 to H-11", tag: "Senior Boys" },
  { id: "parmar", name: "Parmar Bhawan", code: "H-15", tag: "Senior Boys" },
  { id: "geeta", name: "Geeta Bhawan", code: "H-12/13", tag: "Girls Complex" },
];

export default function CampusMap() {
  const [activeTab, setActiveTab] = useState<MapTab>("map");
  const [mapView, setMapView] = useState<MapViewType>("google");
  const [mapFocusMode, setMapFocusMode] = useState<MapFocusMode>("all");
  const [isMapExpanded, setIsMapExpanded] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("all");
  const [selectedFloor, setSelectedFloor] = useState<FilterFloor>("all");
  const [selectedId, setSelectedId] = useState<string>("academic-block");
  const [tourVideoId, setTourVideoId] = useState<string>(TOUR_VIDEOS[0].id);

  // Route Finder State
  const [fromPlaceId, setFromPlaceId] = useState<string>("azad");
  const [toPlaceId, setToPlaceId] = useState<string>("cr-05");

  // Floor Guide State
  const [selectedFloorIndex, setSelectedFloorIndex] = useState(0);

  // Nearby Spots in Map Area State
  const [activeSpotOnMap, setActiveSpotOnMap] = useState<NearbySpot | null>(null);
  const [mapNearbyZoneFilter, setMapNearbyZoneFilter] = useState<"all" | NearbyZoneDistance>("all");

  // Nearby Guide Tab State
  const [nearbyFilter, setNearbyFilter] = useState<"all" | "hotel" | "dhaba" | "tourist">("all");
  const [nearbyZoneFilter, setNearbyZoneFilter] = useState<"all" | NearbyZoneDistance>("all");
  const [nearbySearch, setNearbySearch] = useState("");

  const zoneCounts = useMemo(() => {
    return {
      campus_local: NEARBY_SPOTS.filter((s) => s.zoneDistance === "campus_local").length,
      kandaghat_valley: NEARBY_SPOTS.filter((s) => s.zoneDistance === "kandaghat_valley").length,
      solan_region: NEARBY_SPOTS.filter((s) => s.zoneDistance === "solan_region").length,
      shimla_chail: NEARBY_SPOTS.filter((s) => s.zoneDistance === "shimla_chail").length,
    };
  }, []);

  const categoryCounts = useMemo(() => {
    return {
      hotel: NEARBY_SPOTS.filter((s) => s.category === "hotel").length,
      dhaba: NEARBY_SPOTS.filter((s) => s.category === "dhaba").length,
      tourist: NEARBY_SPOTS.filter((s) => s.category === "tourist").length,
    };
  }, []);

  const filteredNearbySpots = useMemo(() => {
    let list = NEARBY_SPOTS;
    if (nearbyZoneFilter !== "all") {
      list = list.filter((s) => s.zoneDistance === nearbyZoneFilter);
    }
    if (nearbyFilter !== "all") {
      list = list.filter((s) => s.category === nearbyFilter);
    }
    const q = nearbySearch.trim().toLowerCase();
    if (!q) return list;
    return list.filter((s) => {
      const hay = `${s.name} ${s.shortName} ${s.location} ${s.description} ${s.specialty} ${s.priceRange} ${s.howToReach || ""} ${s.tags.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [nearbyZoneFilter, nearbyFilter, nearbySearch]);

  const displayNearbySpotsInMapArea = useMemo(() => {
    if (mapNearbyZoneFilter === "all") return NEARBY_SPOTS;
    return NEARBY_SPOTS.filter((s) => s.zoneDistance === mapNearbyZoneFilter);
  }, [mapNearbyZoneFilter]);

  const currentGoogleMapsEmbedUrl = useMemo(() => {
    if (activeSpotOnMap) {
      const q = activeSpotOnMap.embedMapQuery || activeSpotOnMap.name;
      return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=h&z=15&output=embed`;
    }
    return GOOGLE_MAPS_EMBED_URL;
  }, [activeSpotOnMap]);

  const handleViewSpotOnMap = (spot: NearbySpot) => {
    setActiveSpotOnMap(spot);
    setMapView("google");
    setActiveTab("map");
  };

  // Filtered Places
  const filteredPlaces = useMemo(() => {
    return searchCampusPlaces(searchQuery, {
      category: selectedCategory,
      floorLevel: selectedFloor,
    });
  }, [searchQuery, selectedCategory, selectedFloor]);

  const selectedPlace = useMemo(() => {
    return CAMPUS_PLACES.find((p) => p.id === selectedId) || CAMPUS_PLACES[0];
  }, [selectedId]);

  // Active Route
  const activeRoute = useMemo(() => {
    // Check if there's a predefined route
    const direct = CAMPUS_ROUTES.find(
      (r) => r.fromId === fromPlaceId && r.toId === toPlaceId
    );
    if (direct) return direct;

    // Synthesize route between any two points
    const fromP = CAMPUS_PLACES.find((p) => p.id === fromPlaceId);
    const toP = CAMPUS_PLACES.find((p) => p.id === toPlaceId);
    if (!fromP || !toP) return null;

    const elevDiff = toP.altitudeMeters - fromP.altitudeMeters;
    const isSameTerrace = fromP.terrace === toP.terrace;
    const duration = isSameTerrace ? "2–3 mins" : Math.abs(elevDiff) > 60 ? "6–8 mins" : "4–5 mins";
    const elevText =
      elevDiff === 0
        ? "Level walk (0 m)"
        : elevDiff > 0
        ? `+${elevDiff} m (Uphill)`
        : `${elevDiff} m (Downhill)`;

    const stepsText =
      isSameTerrace
        ? "Level paved campus walkway (~40 steps)"
        : Math.abs(elevDiff) > 60
        ? "Serpentine hill road / academic ramp stairs (~180 steps)"
        : "Central pedestrian covered hill stairway (~110 steps)";

    const floorGuidance =
      toP.parentBuildingId === "civil"
        ? `Proceed down to the Civil Engineering Block on the Lower Terrace (~1,540 m) near Gate 1.`
        : toP.floor
        ? `Inside Academic Block: Take the central stairway or elevator to ${toP.floor}.`
        : null;

    return {
      id: "custom",
      fromId: fromP.id,
      toId: toP.id,
      title: `${fromP.shortName || fromP.name} ➔ ${toP.shortName || toP.name}`,
      duration,
      stepsCount: stepsText,
      elevationChange: elevText,
      directions: [
        `Start from ${fromP.name} on the ${fromP.terrace} Terrace (~${fromP.altitudeMeters} m).`,
        isSameTerrace
          ? `Follow the direct paved promenade across the ${fromP.terrace} Terrace.`
          : elevDiff > 0
          ? `Take the central connecting stairway/ramp ascending from ${fromP.terrace} to ${toP.terrace} Terrace.`
          : `Walk downhill via the paved hill pathway descending to ${toP.terrace} Terrace.`,
        floorGuidance,
        `Arrive at ${toP.name} (${toP.hint.split(".")[0]}).`,
      ].filter(Boolean) as string[],
    };
  }, [fromPlaceId, toPlaceId]);

  const handleSelectPlaceOnMap = (id: string) => {
    setSelectedId(id);
  };

  const handleNavigateHere = (id: string) => {
    const place = CAMPUS_PLACES.find((p) => p.id === id);
    if (place?.googleMapsUrl && place.isNearbySpot) {
      window.open(place.googleMapsUrl, "_blank", "noopener,noreferrer");
      return;
    }
    setToPlaceId(id);
    setActiveTab("routes");
  };

  return (
    <div className="w-full max-w-full overflow-hidden min-w-0 space-y-3.5 select-none text-gray-800 dark:text-gray-100">
      {/* ── 1. Top Navigation Sub-Tabs ── */}
      <div className="flex items-center gap-1 p-1 bg-gray-100/90 dark:bg-gray-800/90 rounded-xl border border-gray-200/70 dark:border-gray-700/70 shadow-2xs overflow-x-auto no-scrollbar min-w-0 touch-pan-x">
        <button
          onClick={() => setActiveTab("map")}
          className={`flex-1 min-w-fit py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === "map"
              ? "bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-xs scale-102"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <span>🗺️</span>
          <span>Map<span className="hidden sm:inline"> View</span></span>
        </button>

        <button
          onClick={() => setActiveTab("routes")}
          className={`flex-1 min-w-fit py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === "routes"
              ? "bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-xs scale-102"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <span>🧭</span>
          <span>Route<span className="hidden sm:inline">s Finder</span></span>
        </button>

        <button
          onClick={() => setActiveTab("floors")}
          className={`flex-1 min-w-fit py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === "floors"
              ? "bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-xs scale-102"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <span>🏢</span>
          <span>Floors<span className="hidden sm:inline"> &amp; CRs</span></span>
        </button>

        <button
          onClick={() => setActiveTab("nearby")}
          className={`flex-1 min-w-fit py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === "nearby"
              ? "bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 shadow-xs scale-102"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <span>🌲</span>
          <span>Nearby<span className="hidden sm:inline"> Guide</span></span>
        </button>

        <button
          onClick={() => setActiveTab("transit")}
          className={`flex-1 min-w-fit py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === "transit"
              ? "bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-xs scale-102"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <span>🚌</span>
          <span>Buses<span className="hidden sm:inline"> &amp; Transit</span></span>
        </button>

        <button
          onClick={() => setActiveTab("tour")}
          className={`flex-1 min-w-fit py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap ${
            activeTab === "tour"
              ? "bg-white dark:bg-gray-900 text-fuchsia-600 dark:text-fuchsia-400 shadow-xs scale-102"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <span>🔄</span>
          <span>360°<span className="hidden sm:inline"> Tour</span></span>
        </button>
      </div>

      {/* ── TAB 1: INTERACTIVE MAP VIEW ── */}
      {activeTab === "map" && (
        <div className="space-y-3 fade-slide-in">
          {/* Top Bar: View Mode, Focus Toggles & Fullscreen */}
          <div className="space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  {mapView === "google"
                    ? "Waknaghat Satellite View"
                    : mapView === "schematic"
                    ? "JUIT 3-Terrace Layout"
                    : "OpenStreetMap View"}
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {mapView === "google"
                    ? "🛰️ Real Aerial Hybrid"
                    : mapView === "osm"
                    ? "🗺️ Street Map"
                    : mapFocusMode === "hostels"
                    ? "🏠 Hostels Focus"
                    : mapFocusMode === "roads"
                    ? "🛣️ Roads Focus"
                    : "🌟 20+ Landmarks"}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Expand / Shrink Map Canvas Toggle */}
                <button
                  onClick={() => setIsMapExpanded((prev) => !prev)}
                  className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 transition-colors flex items-center gap-1 cursor-pointer"
                  title={isMapExpanded ? "Collapse to standard height" : "Expand map for high-detail view"}
                >
                  <span>{isMapExpanded ? "⤡ Standard" : "⤢ Expand"}</span>
                </button>

                {/* Satellite / Schematic / Street Switcher */}
                <div className="flex items-center gap-0.5 bg-gray-100 dark:bg-gray-800 p-0.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[11px]">
                  <button
                    onClick={() => setMapView("google")}
                    className={`px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer ${
                      mapView === "google"
                        ? "bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-2xs"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    🛰️ Satellite (Real)
                  </button>
                  <button
                    onClick={() => setMapView("schematic")}
                    className={`px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer ${
                      mapView === "schematic"
                        ? "bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-2xs"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    🎨 Schematic
                  </button>
                  <button
                    onClick={() => setMapView("osm")}
                    className={`px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer ${
                      mapView === "osm"
                        ? "bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-2xs"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    🗺️ Street
                  </button>
                </div>
              </div>
            </div>

            {/* Map Clarity & Focus Modes */}
            {mapView === "schematic" && (
              <div className="flex items-center justify-between gap-1.5 flex-wrap bg-gray-50 dark:bg-gray-800 p-1.5 rounded-xl border border-gray-200/80 dark:border-gray-700/80 text-xs">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setMapFocusMode("all")}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer text-[11px] ${
                      mapFocusMode === "all"
                        ? "bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-2xs border border-gray-200 dark:border-gray-700"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    ✨ Standard View
                  </button>

                  <button
                    onClick={() => setMapFocusMode("hostels")}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer text-[11px] flex items-center gap-1 ${
                      mapFocusMode === "hostels"
                        ? "bg-amber-500 text-white shadow-xs"
                        : "text-gray-600 dark:text-gray-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-600 dark:hover:text-amber-400"
                    }`}
                  >
                    <span>🏠</span>
                    <span>Focus Hostels</span>
                  </button>

                  <button
                    onClick={() => setMapFocusMode("roads")}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer text-[11px] flex items-center gap-1 ${
                      mapFocusMode === "roads"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    <span>🛣️</span>
                    <span>Highlight Roads</span>
                  </button>
                </div>

                <span className="text-[10.5px] font-medium text-gray-600 dark:text-gray-300 hidden sm:inline">
                  {mapFocusMode === "hostels" ? "Hover/tap any hostel to inspect" : mapFocusMode === "roads" ? "Showing highway & ring road" : "Interactive 2.5D Campus"}
                </span>
              </div>
            )}

            {/* Dedicated Hostels Quick Access Selector */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1 text-[10px] uppercase tracking-wider">
                🏠 Hostels:
              </span>
              {HOSTEL_LIST.map((h) => {
                const isCurSelected = selectedId === h.id;
                return (
                  <button
                    key={h.id}
                    onClick={() => {
                      setSelectedId(h.id);
                      if (mapView === "schematic") {
                        setMapFocusMode("hostels");
                      }
                    }}
                    className={`px-2 py-0.5 rounded-lg font-semibold flex-shrink-0 transition-all cursor-pointer border flex items-center gap-1 ${
                      isCurSelected
                        ? "bg-amber-500 text-white border-amber-600 shadow-2xs scale-102"
                        : "bg-white dark:bg-gray-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700 font-semibold"
                    }`}
                  >
                    <span className="text-[10px] opacity-75">{h.code}</span>
                    <span>{h.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Map Canvas / Embed */}
          {mapView === "google" ? (
            /* Real Google Maps Satellite Hybrid Embed */
            <div className="relative rounded-2xl overflow-hidden border border-gray-300/80 dark:border-gray-800 bg-slate-950 text-white shadow-xl">
              {/* Floating Top Bar on Satellite Map */}
              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10 gap-2">
                {activeSpotOnMap ? (
                  <div className="bg-emerald-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-400/40 text-[11px] font-bold text-emerald-300 shadow-md flex items-center gap-1.5 pointer-events-auto">
                    <span>{activeSpotOnMap.icon}</span>
                    <span>{activeSpotOnMap.name} ({activeSpotOnMap.distanceKm.replace(" from Gate 1", "")})</span>
                  </div>
                ) : (
                  <div className="bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15 text-[11px] font-semibold text-white shadow-md flex items-center gap-1.5 pointer-events-auto">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>🛰️ Real Satellite Imagery (Waknaghat)</span>
                  </div>
                )}

                <div className="flex items-center gap-1.5 pointer-events-auto">
                  {activeSpotOnMap && (
                    <button
                      onClick={() => setActiveSpotOnMap(null)}
                      className="text-[11px] font-bold bg-white/95 dark:bg-gray-900/95 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-700 shadow-md hover:bg-emerald-50 transition-all flex items-center gap-1 cursor-pointer"
                      title="Reset map view to JUIT Campus"
                    >
                      <span>↺ Campus View</span>
                    </button>
                  )}
                  <a
                    href={activeSpotOnMap ? (activeSpotOnMap.googleMapsUrl || GOOGLE_MAPS_URL) : GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold bg-white/95 dark:bg-gray-900/95 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-lg border border-gray-300 dark:border-gray-700 shadow-md hover:bg-blue-50 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Full Google Maps</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>

              <iframe
                title={activeSpotOnMap ? `${activeSpotOnMap.name} Map` : "Jaypee University of Information Technology Real Satellite Hybrid Map"}
                src={currentGoogleMapsEmbedUrl}
                className={`w-full ${
                  isMapExpanded ? "h-[500px] sm:h-[560px]" : "h-72 sm:h-84"
                } border-0 transition-all duration-300`}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Bottom Status Bar */}
              <div className="absolute bottom-2 left-2.5 right-2.5 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-gray-300 flex items-center justify-between gap-2 z-10">
                {activeSpotOnMap ? (
                  <>
                    <span className="flex items-center gap-1 font-semibold text-emerald-400 truncate">
                      📍 {activeSpotOnMap.location} • ⏱️ {activeSpotOnMap.travelTime}
                    </span>
                    <a
                      href={activeSpotOnMap.directionsUrl || activeSpotOnMap.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-emerald-300 underline font-bold flex items-center gap-1 flex-shrink-0"
                    >
                      <span>🚗 Directions from Gate 1</span>
                      <span>↗</span>
                    </a>
                  </>
                ) : (
                  <>
                    <span className="flex items-center gap-1 font-mono text-emerald-400">
                      📍 31.0165° N, 77.0702° E • JUIT Waknaghat
                    </span>
                    <span className="hidden sm:inline text-gray-300">
                      Authentic mountain terrain, hillside road &amp; hostel footprints
                    </span>
                  </>
                )}
              </div>
            </div>
          ) : mapView === "schematic" ? (
            <div className="relative rounded-2xl overflow-hidden border border-gray-300/80 dark:border-gray-800/90 bg-slate-950 text-white shadow-xl select-none">
              {/* Top ambient altitude indicator bar */}
              <div className="absolute top-2 left-2.5 right-2.5 flex flex-wrap items-center justify-between gap-1 text-[9px] sm:text-[10px] font-mono text-gray-300 z-10 pointer-events-none min-w-0">
                <span className="bg-slate-900/80 px-1.5 sm:px-2 py-0.5 rounded-md border border-white/10 backdrop-blur-xs flex items-center gap-1 shadow-xs truncate max-w-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span className="truncate">▲ 1,620m Upper Ridge (Academics &amp; LRC)</span>
                </span>
                <span className="bg-slate-900/80 px-1.5 sm:px-2 py-0.5 rounded-md border border-white/10 backdrop-blur-xs flex items-center gap-1 shadow-xs truncate max-w-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span className="truncate">▼ 1,530m Lower Valley (Gate 1 &amp; Civil)</span>
                </span>
              </div>

              {/* Vector SVG Schematic of JUIT Waknaghat */}
              <svg
                viewBox="0 0 800 520"
                className={`w-full transition-all duration-300 ${
                  isMapExpanded ? "h-[500px] sm:h-[560px]" : "h-72 sm:h-80"
                } object-cover`}
                style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))" }}
              >
                {/* Background & Gradients */}
                <defs>
                  <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#080c14" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  <linearGradient id="upperGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#172554" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#0f172a" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="middleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2e1065" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0f172a" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="lowerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#064e3b" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#022c22" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="hostelRoofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                  <linearGradient id="academicRoofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                  <linearGradient id="messRoofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ea580c" />
                    <stop offset="100%" stopColor="#c2410c" />
                  </linearGradient>
                </defs>

                {/* Base Sky & Mountain Terrain */}
                <rect x="0" y="0" width="800" height="520" fill="url(#skyGrad)" />

                {/* Mountain Ridge Silhouettes (Distant Himalayas) */}
                <path
                  d="M 0,45 Q 120,20 250,38 T 500,22 T 800,40 L 800,90 L 0,90 Z"
                  fill="#1e293b"
                  opacity="0.35"
                />

                {/* ── 1. UPPER TERRACE (~1,620m) ── */}
                <path
                  d="M 25,35 Q 400,15 775,35 L 785,145 Q 400,160 15,145 Z"
                  fill="url(#upperGrad)"
                  stroke="#3b82f6"
                  strokeWidth="1.8"
                  strokeDasharray="6 3"
                  className="opacity-90"
                />
                <text x="35" y="48" fill="#60a5fa" fontSize="9.5" fontWeight="bold" letterSpacing="1">
                  ▲ UPPER TERRACE • ACADEMICS, LT &amp; LRC (~1,620m)
                </text>

                {/* ── 2. MIDDLE TERRACE (~1,580m) ── */}
                <path
                  d="M 15,155 Q 400,170 785,155 L 790,370 Q 400,385 10,370 Z"
                  fill="url(#middleGrad)"
                  stroke="#f59e0b"
                  strokeWidth="1.8"
                  strokeDasharray="6 3"
                  className="opacity-90"
                />
                <text x="30" y="168" fill="#fbbf24" fontSize="9.5" fontWeight="bold" letterSpacing="1">
                  ◆ MIDDLE TERRACE • HOSTELS, MESS &amp; SPORTS (~1,580m)
                </text>

                {/* ── 3. LOWER TERRACE (~1,540m) ── */}
                <path
                  d="M 10,380 Q 400,395 790,380 L 795,510 Q 400,518 5,510 Z"
                  fill="url(#lowerGrad)"
                  stroke="#10b981"
                  strokeWidth="1.8"
                  strokeDasharray="6 3"
                  className="opacity-90"
                />
                <text x="25" y="393" fill="#34d399" fontSize="9.5" fontWeight="bold" letterSpacing="1">
                  ▼ LOWER TERRACE • GATE 1, CIVIL ENGG &amp; RESIDENCES (~1,540m)
                </text>

                {/* ──────────────────────────────────────────────────────────
                    THE ROAD NETWORK (High Clarity, Asphalt + Lane Striping)
                   ────────────────────────────────────────────────────────── */}

                {/* 1. Main Waknaghat Campus Access Road (Asphalt Outer Casing) */}
                <path
                  d="M 90,510 C 90,460 140,440 180,430 C 250,415 250,380 200,345 C 150,310 110,285 120,245 C 130,220 180,215 230,215 C 310,215 360,225 410,220 C 470,215 560,205 610,195 C 670,185 685,150 635,125 C 570,95 480,105 400,100 L 350,100"
                  fill="none"
                  stroke={mapFocusMode === "roads" ? "#38bdf8" : "#334155"}
                  strokeWidth={mapFocusMode === "roads" ? 18 : 14}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all"
                />
                {/* Main Access Road Surface (Dark Asphalt) */}
                <path
                  d="M 90,510 C 90,460 140,440 180,430 C 250,415 250,380 200,345 C 150,310 110,285 120,245 C 130,220 180,215 230,215 C 310,215 360,225 410,220 C 470,215 560,205 610,195 C 670,185 685,150 635,125 C 570,95 480,105 400,100 L 350,100"
                  fill="none"
                  stroke="#0f172a"
                  strokeWidth={mapFocusMode === "roads" ? 14 : 10}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Main Access Road Center Highway Stripe (Yellow Dashed) */}
                <path
                  d="M 90,510 C 90,460 140,440 180,430 C 250,415 250,380 200,345 C 150,310 110,285 120,245 C 130,220 180,215 230,215 C 310,215 360,225 410,220 C 470,215 560,205 610,195 C 670,185 685,150 635,125 C 570,95 480,105 400,100 L 350,100"
                  fill="none"
                  stroke={mapFocusMode === "roads" ? "#38bdf8" : "#f59e0b"}
                  strokeWidth={mapFocusMode === "roads" ? 2.5 : 1.8}
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                />

                {/* 2. Hostel Ring Road Loop (Connecting Azad H-14, Shastri H-1..11, Parmar H-15, Mess & Geeta H-12/13) */}
                <path
                  d="M 120,245 C 120,185 170,175 230,175 C 310,175 360,180 430,180 C 490,180 560,190 620,195 C 650,198 670,200 700,205"
                  fill="none"
                  stroke={mapFocusMode === "roads" ? "#fbbf24" : "#475569"}
                  strokeWidth={mapFocusMode === "roads" ? 15 : 11}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 120,245 C 120,185 170,175 230,175 C 310,175 360,180 430,180 C 490,180 560,190 620,195 C 650,198 670,200 700,205"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth={mapFocusMode === "roads" ? 11 : 7}
                  strokeLinecap="round"
                />
                <path
                  d="M 120,245 C 120,185 170,175 230,175 C 310,175 360,180 430,180 C 490,180 560,190 620,195 C 650,198 670,200 700,205"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="1.2"
                  strokeDasharray="5 5"
                />

                {/* Boys Hostel Internal Access Loop (Shastri & Parmar Courtyard) */}
                <path
                  d="M 230,175 L 230,310 C 230,325 320,325 320,290"
                  fill="none"
                  stroke={mapFocusMode === "roads" ? "#fbbf24" : "#475569"}
                  strokeWidth={mapFocusMode === "roads" ? 13 : 9}
                  strokeLinecap="round"
                />
                <path
                  d="M 230,175 L 230,310 C 230,325 320,325 320,290"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth={mapFocusMode === "roads" ? 9 : 5}
                  strokeLinecap="round"
                />

                {/* Mess & Tuc Shop Plaza Courtyard Loop */}
                <path
                  d="M 430,180 L 430,235 C 430,250 490,250 530,235 L 530,205"
                  fill="none"
                  stroke={mapFocusMode === "roads" ? "#fbbf24" : "#475569"}
                  strokeWidth={mapFocusMode === "roads" ? 13 : 9}
                  strokeLinecap="round"
                />
                <path
                  d="M 430,180 L 430,235 C 430,250 490,250 530,235 L 530,205"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth={mapFocusMode === "roads" ? 9 : 5}
                  strokeLinecap="round"
                />

                {/* 3. Central Hillside Covered Stairway (110 Steps: Annapurna Mess ➔ Academic Block) */}
                <line
                  x1="430"
                  y1="180"
                  x2="390"
                  y2="105"
                  stroke="#0284c7"
                  strokeWidth="11"
                  strokeLinecap="round"
                />
                <line
                  x1="430"
                  y1="180"
                  x2="390"
                  y2="105"
                  stroke="#38bdf8"
                  strokeWidth="7"
                  strokeDasharray="2 3"
                />
                {/* Stair Rails */}
                <line x1="426" y1="180" x2="386" y2="105" stroke="#7dd3fc" strokeWidth="1.2" />
                <line x1="434" y1="180" x2="394" y2="105" stroke="#7dd3fc" strokeWidth="1.2" />

                {/* 4. Academic Boulevard Promenade (Auditorium ➔ LT ➔ Academic ➔ LRC ➔ Nescafe) */}
                <path
                  d="M 95,78 C 160,70 230,68 390,65 C 470,65 550,68 680,78"
                  fill="none"
                  stroke="#1e3a8a"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <path
                  d="M 95,78 C 160,70 230,68 390,65 C 470,65 550,68 680,78"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="4"
                  strokeDasharray="3 3"
                />

                {/* 5. Pedestrian Trails (Helipad, Sports Ground & Mandir) */}
                <line x1="120" y1="245" x2="80" y2="225" stroke="#94a3b8" strokeWidth="4" strokeDasharray="3 3" />
                <line x1="320" y1="310" x2="365" y2="350" stroke="#94a3b8" strokeWidth="4" strokeDasharray="3 3" />
                <line x1="410" y1="430" x2="550" y2="440" stroke="#10b981" strokeWidth="4" strokeDasharray="4 3" />

                {/* ── Road Sign Badges on Map ── */}
                <g transform="translate(130, 350) rotate(-40)">
                  <rect x="-65" y="-9" width="130" height="18" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
                  <text x="0" y="3.5" fill="#fef08a" fontSize="8" fontWeight="bold" textAnchor="middle">
                    🛣️ Main Waknaghat Road
                  </text>
                </g>

                <g transform="translate(280, 163)">
                  <rect x="-70" y="-8" width="140" height="16" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                  <text x="0" y="3.5" fill="#bae6fd" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                    🔄 Hostel Ring Road (Boys &amp; Girls)
                  </text>
                </g>

                <g transform="translate(440, 140) rotate(-62)">
                  <rect x="-48" y="-8" width="96" height="16" rx="4" fill="#082f49" stroke="#38bdf8" strokeWidth="1" />
                  <text x="0" y="3.5" fill="#e0f2fe" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                    🪜 110 Steps (Mess ➔ Academics)
                  </text>
                </g>

                <g transform="translate(300, 52)">
                  <rect x="-55" y="-7" width="110" height="15" rx="3" fill="#172554" stroke="#60a5fa" strokeWidth="0.8" />
                  <text x="0" y="3.5" fill="#bfdbfe" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                    🏛️ Academic Promenade
                  </text>
                </g>

                {/* ──────────────────────────────────────────────────────────
                    THE BUILDINGS (2.5D Architectural Blocks with Clear Badges)
                   ────────────────────────────────────────────────────────── */}
                {CAMPUS_PLACES.map((place) => {
                  if (place.isPrimaryBuilding === false) return null;
                  const isSelected =
                    selectedId === place.id ||
                    selectedPlace.parentBuildingId === place.id;
                  const isHostel = place.zone === "hostel";
                  const isHostelFocus = mapFocusMode === "hostels";
                  const isRoadFocus = mapFocusMode === "roads";

                  const posX = (place.svgPos.x / 100) * 800;
                  const posY = (place.svgPos.y / 100) * 520;

                  // Dim non-hostels when in hostel focus mode
                  const groupOpacity =
                    isHostelFocus && !isHostel && !isSelected
                      ? 0.35
                      : isRoadFocus && !isSelected
                      ? 0.55
                      : 1;

                  return (
                    <g
                      key={place.id}
                      onClick={() => handleSelectPlaceOnMap(place.id)}
                      className="cursor-pointer transition-all group"
                      transform={`translate(${posX}, ${posY})`}
                      opacity={groupOpacity}
                    >
                      {/* Highlight Pulsing Radar Ring on Selected */}
                      {isSelected && (
                        <circle
                          r="28"
                          fill="none"
                          stroke={isHostel ? "#f59e0b" : "#38bdf8"}
                          strokeWidth="2.5"
                          className="animate-ping opacity-75"
                        />
                      )}

                      {/* ── CASE A: HOSTEL BUILDINGS (2.5D Isometric Terracotta Block) ── */}
                      {isHostel ? (
                        <g className="transition-transform group-hover:scale-115">
                          {/* 3D Isometric Roof */}
                          <polygon
                            points="-32,-8 0,-22 32,-8 0,6"
                            fill="url(#hostelRoofGrad)"
                            stroke="#78350f"
                            strokeWidth="1"
                            style={{ filter: isSelected ? "drop-shadow(0 0 8px #f59e0b)" : "none" }}
                          />
                          {/* Roof Ridge Line */}
                          <line x1="0" y1="-22" x2="0" y2="6" stroke="#fef3c7" strokeWidth="1.2" opacity="0.6" />

                          {/* Front Left Wall */}
                          <polygon
                            points="-32,-8 0,6 0,26 -32,12"
                            fill="#92400e"
                            stroke="#78350f"
                            strokeWidth="0.8"
                          />
                          {/* Front Right Wall */}
                          <polygon
                            points="0,6 32,-8 32,12 0,26"
                            fill="#b45309"
                            stroke="#78350f"
                            strokeWidth="0.8"
                          />

                          {/* Windows Grid (Warm Glowing Yellow) */}
                          <rect x="-24" y="-1" width="5" height="4" rx="0.5" fill="#fef08a" opacity="0.9" />
                          <rect x="-14" y="3" width="5" height="4" rx="0.5" fill="#fef08a" opacity="0.9" />
                          <rect x="-24" y="7" width="5" height="4" rx="0.5" fill="#fef08a" opacity="0.9" />
                          <rect x="-14" y="11" width="5" height="4" rx="0.5" fill="#fef08a" opacity="0.9" />
                          <rect x="8" y="3" width="5" height="4" rx="0.5" fill="#fef08a" opacity="0.9" />
                          <rect x="18" y="-1" width="5" height="4" rx="0.5" fill="#fef08a" opacity="0.9" />
                          <rect x="8" y="11" width="5" height="4" rx="0.5" fill="#fef08a" opacity="0.9" />
                          <rect x="18" y="7" width="5" height="4" rx="0.5" fill="#fef08a" opacity="0.9" />

                          {/* Hostel Code Pill on Roof */}
                          <rect
                            x="-14"
                            y="-18"
                            width="28"
                            height="11"
                            rx="3"
                            fill="#451a03"
                            stroke="#f59e0b"
                            strokeWidth="1"
                          />
                          <text
                            x="0"
                            y="-10"
                            textAnchor="middle"
                            fill="#fef3c7"
                            fontSize="7.5"
                            fontWeight="bold"
                          >
                            {place.code || "H"}
                          </text>

                          {/* Permanent Name Banner Below Hostel */}
                          <rect
                            x="-40"
                            y="29"
                            width="80"
                            height="14"
                            rx="4"
                            fill="#090d16"
                            stroke={isSelected ? "#f59e0b" : "#475569"}
                            strokeWidth={isSelected ? "1.6" : "0.9"}
                          />
                          <text
                            x="0"
                            y="39"
                            textAnchor="middle"
                            fill={isSelected ? "#fef08a" : "#f8fafc"}
                            fontSize="8"
                            fontWeight="bold"
                          >
                            {place.shortName || place.name}
                          </text>

                          {/* Occupancy Badge (When selected or in Hostels focus mode) */}
                          {(isSelected || isHostelFocus) && place.occupancy && (
                            <g transform="translate(0, -32)">
                              <rect
                                x="-45"
                                y="-6"
                                width="90"
                                height="12"
                                rx="3"
                                fill="#78350f"
                                stroke="#f59e0b"
                                strokeWidth="0.8"
                              />
                              <text
                                x="0"
                                y="2.5"
                                textAnchor="middle"
                                fill="#fef3c7"
                                fontSize="6.5"
                                fontWeight="bold"
                              >
                                {place.occupancy}
                              </text>
                            </g>
                          )}
                        </g>
                      ) : place.id === "academic-block" ? (
                        /* ── CASE B: ACADEMIC BLOCK (Large 2-Wing Royal Blue Complex) ── */
                        <g className="transition-transform group-hover:scale-110">
                          {/* 2.5D Roof */}
                          <polygon
                            points="-42,-6 0,-20 42,-6 0,8"
                            fill="url(#academicRoofGrad)"
                            stroke="#1e3a8a"
                            strokeWidth="1"
                            style={{ filter: isSelected ? "drop-shadow(0 0 10px #38bdf8)" : "none" }}
                          />
                          <polygon points="-42,-6 0,8 0,28 -42,14" fill="#1e3a8a" stroke="#172554" strokeWidth="0.8" />
                          <polygon points="0,8 42,-6 42,14 0,28" fill="#1d4ed8" stroke="#172554" strokeWidth="0.8" />

                          {/* Classroom Windows */}
                          <rect x="-34" y="0" width="6" height="4" fill="#93c5fd" opacity="0.9" />
                          <rect x="-22" y="5" width="6" height="4" fill="#93c5fd" opacity="0.9" />
                          <rect x="-10" y="10" width="6" height="4" fill="#93c5fd" opacity="0.9" />
                          <rect x="6" y="10" width="6" height="4" fill="#93c5fd" opacity="0.9" />
                          <rect x="18" y="5" width="6" height="4" fill="#93c5fd" opacity="0.9" />
                          <rect x="30" y="0" width="6" height="4" fill="#93c5fd" opacity="0.9" />

                          {/* Code Tag */}
                          <rect x="-18" y="-18" width="36" height="11" rx="3" fill="#172554" stroke="#60a5fa" strokeWidth="1" />
                          <text x="0" y="-10" textAnchor="middle" fill="#dbeafe" fontSize="7.5" fontWeight="bold">
                            AB-I &amp; II
                          </text>

                          {/* Name Banner */}
                          <rect
                            x="-52"
                            y="30"
                            width="104"
                            height="14"
                            rx="4"
                            fill="#090d16"
                            stroke={isSelected ? "#38bdf8" : "#3b82f6"}
                            strokeWidth={isSelected ? "1.6" : "0.9"}
                          />
                          <text
                            x="0"
                            y="40"
                            textAnchor="middle"
                            fill={isSelected ? "#67e8f9" : "#f8fafc"}
                            fontSize="8"
                            fontWeight="bold"
                          >
                            🏫 Academic Block (CR01-25)
                          </text>
                        </g>
                      ) : place.id === "library" ? (
                        /* ── CASE C: CENTRAL LIBRARY LRC (3-Tier Cyan Stepped Complex) ── */
                        <g className="transition-transform group-hover:scale-110">
                          <polygon
                            points="-30,-6 0,-18 30,-6 0,6"
                            fill="#0284c7"
                            stroke="#0369a1"
                            strokeWidth="1"
                            style={{ filter: isSelected ? "drop-shadow(0 0 10px #38bdf8)" : "none" }}
                          />
                          <polygon points="-30,-6 0,6 0,24 -30,12" fill="#0369a1" stroke="#075985" strokeWidth="0.8" />
                          <polygon points="0,6 30,-6 30,12 0,24" fill="#0ea5e9" stroke="#075985" strokeWidth="0.8" />

                          {/* Code Tag */}
                          <rect x="-14" y="-16" width="28" height="11" rx="3" fill="#082f49" stroke="#38bdf8" strokeWidth="1" />
                          <text x="0" y="-8" textAnchor="middle" fill="#e0f2fe" fontSize="7.5" fontWeight="bold">
                            LRC
                          </text>

                          {/* Name Banner */}
                          <rect
                            x="-45"
                            y="26"
                            width="90"
                            height="14"
                            rx="4"
                            fill="#090d16"
                            stroke={isSelected ? "#38bdf8" : "#0284c7"}
                            strokeWidth={isSelected ? "1.6" : "0.9"}
                          />
                          <text
                            x="0"
                            y="36"
                            textAnchor="middle"
                            fill={isSelected ? "#67e8f9" : "#f8fafc"}
                            fontSize="8"
                            fontWeight="bold"
                          >
                            📚 Central Library (LRC)
                          </text>
                        </g>
                      ) : place.id === "mess" ? (
                        /* ── CASE D: ANNAPURNA DINING MESS (2-Level Food Complex) ── */
                        <g className="transition-transform group-hover:scale-110">
                          <polygon
                            points="-34,-6 0,-18 34,-6 0,6"
                            fill="url(#messRoofGrad)"
                            stroke="#9a3412"
                            strokeWidth="1"
                            style={{ filter: isSelected ? "drop-shadow(0 0 10px #f97316)" : "none" }}
                          />
                          <polygon points="-34,-6 0,6 0,25 -34,13" fill="#9a3412" stroke="#7c2d12" strokeWidth="0.8" />
                          <polygon points="0,6 34,-6 34,13 0,25" fill="#c2410c" stroke="#7c2d12" strokeWidth="0.8" />

                          {/* Dining Windows */}
                          <rect x="-24" y="1" width="6" height="4" fill="#fed7aa" opacity="0.9" />
                          <rect x="-12" y="6" width="6" height="4" fill="#fed7aa" opacity="0.9" />
                          <rect x="8" y="6" width="6" height="4" fill="#fed7aa" opacity="0.9" />
                          <rect x="20" y="1" width="6" height="4" fill="#fed7aa" opacity="0.9" />

                          {/* Code Tag */}
                          <rect x="-15" y="-16" width="30" height="11" rx="3" fill="#431407" stroke="#ea580c" strokeWidth="1" />
                          <text x="0" y="-8" textAnchor="middle" fill="#ffedd5" fontSize="7.5" fontWeight="bold">
                            MESS
                          </text>

                          {/* Name Banner */}
                          <rect
                            x="-48"
                            y="28"
                            width="96"
                            height="14"
                            rx="4"
                            fill="#090d16"
                            stroke={isSelected ? "#ea580c" : "#c2410c"}
                            strokeWidth={isSelected ? "1.6" : "0.9"}
                          />
                          <text
                            x="0"
                            y="38"
                            textAnchor="middle"
                            fill={isSelected ? "#fdba74" : "#f8fafc"}
                            fontSize="8"
                            fontWeight="bold"
                          >
                            🍽️ Annapurna Mess (2 Floors)
                          </text>
                        </g>
                      ) : (
                        /* ── CASE E: OTHER CAMPUS LANDMARKS (Civil, Gym, Helipad, Gate 1, etc.) ── */
                        <g className="transition-transform group-hover:scale-110">
                          {/* Landmark Base Disc / Square */}
                          <circle
                            r={isSelected ? "16" : "13"}
                            fill={
                              place.zone === "academic"
                                ? "#1d4ed8"
                                : place.zone === "food"
                                ? "#c2410c"
                                : place.zone === "sports"
                                ? "#7e22ce"
                                : "#047857"
                            }
                            stroke="#ffffff"
                            strokeWidth={isSelected ? "2.2" : "1.2"}
                            className="shadow-md"
                          />

                          {/* Emoji Icon */}
                          <text
                            textAnchor="middle"
                            dy="4"
                            fontSize={isSelected ? "13" : "11"}
                            className="select-none pointer-events-none"
                          >
                            {place.icon}
                          </text>

                          {/* Code Chip */}
                          {place.code && (
                            <g transform="translate(0, -18)">
                              <rect
                                x="-13"
                                y="-6"
                                width="26"
                                height="10"
                                rx="2.5"
                                fill="#0f172a"
                                stroke="#94a3b8"
                                strokeWidth="0.8"
                              />
                              <text x="0" y="1.5" textAnchor="middle" fill="#f1f5f9" fontSize="6.5" fontWeight="bold">
                                {place.code}
                              </text>
                            </g>
                          )}

                          {/* Name Banner */}
                          <rect
                            x="-38"
                            y="18"
                            width="76"
                            height="13"
                            rx="3.5"
                            fill="#090d16"
                            stroke={isSelected ? "#38bdf8" : "#475569"}
                            strokeWidth={isSelected ? "1.5" : "0.7"}
                          />
                          <text
                            x="0"
                            y="27.5"
                            textAnchor="middle"
                            fill={isSelected ? "#67e8f9" : "#f1f5f9"}
                            fontSize="7.5"
                            fontWeight="bold"
                          >
                            {place.shortName || place.name}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Bottom Map Legend */}
              <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[9px] bg-slate-900/90 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-white/10 text-gray-300 flex-wrap gap-1">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Academics
                </span>
                <span className="flex items-center gap-1 font-bold text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Hostels (H-1 to H-15)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" /> Food &amp; Mess
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" /> Sports &amp; Gym
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Facilities
                </span>
                <span className="flex items-center gap-1 text-sky-400 font-semibold">
                  <span className="w-3 h-1 bg-yellow-400 inline-block rounded-xs" /> Asphalt Roads
                </span>
              </div>
            </div>
          ) : (
            /* OpenStreetMap Real Street Embed */
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md">
              <iframe
                title="JUIT Waknaghat on OpenStreetMap"
                src={OSM_EMBED_URL}
                className={`w-full ${
                  isMapExpanded ? "h-[500px] sm:h-[560px]" : "h-72 sm:h-80"
                } rounded-2xl border-0`}
                loading="lazy"
              />
              <div className="absolute top-2 right-2 flex gap-1 z-10">
                <a
                  href={OSM_OPEN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10.5px] font-semibold bg-white/90 dark:bg-gray-900/90 text-gray-800 dark:text-white px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700 shadow-xs hover:bg-blue-50"
                >
                  Full OSM ↗
                </a>
              </div>
            </div>
          )}

          {/* ── Nearby Spots to Visit (Map Area Explorer) ── */}
          <div className="rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-50/70 via-teal-50/30 to-white dark:from-emerald-950/30 dark:via-gray-900/50 dark:to-gray-900 p-3.5 shadow-xs space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl p-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800">
                  🌲
                </span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                      Nearby Spots &amp; Outings
                    </h4>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      {NEARBY_SPOTS.length} Spots
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400">
                    Tap any spot to preview on the map above, get 1-click directions from Gate 1, &amp; view transit advice
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setActiveTab("transit")}
                  className="text-[11px] font-bold text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 px-2.5 py-1 rounded-xl border border-blue-200 dark:border-blue-800 transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>🚌</span>
                  <span>Bus Timetable</span>
                </button>
                <button
                  onClick={() => setActiveTab("nearby")}
                  className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 px-2.5 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800 transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>All 31 Spots</span>
                  <span>➔</span>
                </button>
              </div>
            </div>

            {/* Zone Filter Chips */}
            <div className="flex flex-wrap items-center gap-1 text-[11px]">
              <button
                onClick={() => setMapNearbyZoneFilter("all")}
                className={`px-2.5 py-1 rounded-lg font-bold flex-shrink-0 transition-all cursor-pointer border text-[10.5px] ${
                  mapNearbyZoneFilter === "all"
                    ? "bg-emerald-600 text-white border-emerald-700 shadow-2xs scale-102"
                    : "bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100"
                }`}
              >
                🌟 All Radii ({NEARBY_SPOTS.length})
              </button>

              {(Object.keys(NEARBY_ZONES) as NearbyZoneDistance[]).map((zk) => {
                const z = NEARBY_ZONES[zk];
                const count = zoneCounts[zk];
                const isSel = mapNearbyZoneFilter === zk;
                return (
                  <button
                    key={zk}
                    onClick={() => setMapNearbyZoneFilter(zk)}
                    className={`px-2.5 py-1 rounded-lg font-bold flex-shrink-0 transition-all cursor-pointer border text-[10.5px] flex items-center gap-1 ${
                      isSel
                        ? "bg-emerald-600 text-white border-emerald-700 shadow-2xs scale-102"
                        : "bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span>{z.icon}</span>
                    <span>{z.shortLabel}</span>
                    <span className="text-[9px] opacity-75">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Horizontal Carousel of Nearby Spots */}
            <div className="flex gap-2 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none">
              {displayNearbySpotsInMapArea.map((spot) => {
                const isCur = activeSpotOnMap?.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    onClick={() => {
                      if (activeSpotOnMap?.id === spot.id) {
                        setActiveSpotOnMap(null);
                      } else {
                        setActiveSpotOnMap(spot);
                        setMapView("google");
                      }
                    }}
                    className={`flex-shrink-0 p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between w-48 sm:w-52 ${
                      isCur
                        ? "bg-emerald-600 text-white border-emerald-700 shadow-md scale-102 ring-2 ring-emerald-400"
                        : "bg-white dark:bg-gray-800 hover:bg-emerald-50/60 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 shadow-2xs"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="text-xl">{spot.icon}</span>
                        <span
                          className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-md ${
                            isCur
                              ? "bg-white/25 text-white"
                              : spot.category === "tourist"
                              ? "bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-800"
                              : spot.category === "dhaba"
                              ? "bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800"
                              : "bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800"
                          }`}
                        >
                          {spot.distanceKm.replace(" from Gate 1", "")}
                        </span>
                      </div>
                      <p className={`text-xs font-bold line-clamp-1 ${isCur ? "text-white" : "text-gray-900 dark:text-gray-50"}`}>
                        {spot.shortName || spot.name}
                      </p>
                      <p className={`text-[10.5px] font-medium line-clamp-1 mt-0.5 ${isCur ? "text-white/90" : "text-gray-600 dark:text-gray-300"}`}>
                        {spot.location.split(",")[0]}
                      </p>
                    </div>
                    <div className={`mt-2.5 pt-1.5 border-t flex items-center justify-between text-[10px] ${
                      isCur ? "border-white/20 text-white" : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                    }`}>
                      <span className="font-medium">⏱️ {spot.travelTime}</span>
                      <span className={`font-bold underline ${isCur ? "text-white" : "text-emerald-700 dark:text-emerald-400"}`}>
                        {isCur ? "Active On Map ✓" : "Preview Map →"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Spotlight Card in Map Area */}
            {activeSpotOnMap && (
              <div className="p-3.5 rounded-xl bg-white dark:bg-gray-800 border-2 border-emerald-500 dark:border-emerald-600 shadow-md space-y-2.5 fade-slide-in">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <span className="text-2xl p-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800">
                      {activeSpotOnMap.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-gray-50">
                          {activeSpotOnMap.name}
                        </h4>
                        <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800">
                          {NEARBY_ZONES[activeSpotOnMap.zoneDistance]?.name}
                        </span>
                      </div>
                      <p className="text-[11px] font-medium text-gray-700 dark:text-gray-300 mt-0.5">
                        📍 {activeSpotOnMap.location} • ⏱️ {activeSpotOnMap.travelTime} • 💰 {activeSpotOnMap.priceRange}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveSpotOnMap(null)}
                    className="text-xs text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 px-1.5 py-0.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    title="Clear Spotlight"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-xs font-normal text-gray-800 dark:text-gray-200 leading-relaxed">
                  {activeSpotOnMap.description}
                </p>

                {/* Specialty & Transit Advice */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-gray-900 dark:text-gray-100">
                    <strong className="text-emerald-900 dark:text-emerald-300 font-bold block mb-0.5">
                      ✨ Highlights &amp; Specialty:
                    </strong>
                    <span className="text-emerald-950 dark:text-emerald-100 leading-relaxed font-medium">{activeSpotOnMap.specialty}</span>
                  </div>

                  {activeSpotOnMap.howToReach && (
                    <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-gray-900 dark:text-gray-100">
                      <strong className="text-blue-900 dark:text-blue-300 font-bold block mb-0.5">
                        🚌 Transit from Gate 1:
                      </strong>
                      <span className="text-blue-950 dark:text-blue-100 leading-relaxed font-medium">{activeSpotOnMap.howToReach}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-gray-200 dark:border-gray-700 flex-wrap">
                  <span className="text-[10.5px] font-semibold text-gray-700 dark:text-gray-300">
                    {activeSpotOnMap.bestTimeToVisit && `🕒 Best time: ${activeSpotOnMap.bestTimeToVisit}`}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setActiveSpotOnMap(null)}
                      className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 transition-colors cursor-pointer"
                    >
                      ↺ Campus Map
                    </button>
                    <a
                      href={activeSpotOnMap.directionsUrl || activeSpotOnMap.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>🚗 Directions from Gate 1</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Direct Navigation Links Row */}
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            <a
              href={GOOGLE_MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-2 text-center font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1"
            >
              <span>📍</span>
              <span>Google Maps</span>
            </a>

            <button
              onClick={() => handleNavigateHere(selectedPlace.id)}
              className="py-2 px-2 text-center font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-xl border border-gray-200/80 dark:border-gray-700 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>🧭</span>
              <span>Directions</span>
            </button>

            <a
              href={OFFICIAL_LOCATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-2 text-center font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-xl border border-gray-200/80 dark:border-gray-700 transition-colors flex items-center justify-center gap-1"
            >
              <span>ℹ️</span>
              <span>Location Guide</span>
            </a>
          </div>

          {/* Selected Place Highlight Card */}
          <div className="rounded-2xl border border-blue-200/90 dark:border-blue-800/80 bg-gradient-to-br from-blue-50/90 via-indigo-50/40 to-white dark:from-blue-950/40 dark:via-gray-900/60 dark:to-gray-900 p-3.5 shadow-xs space-y-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-300/40 dark:border-blue-600/40 flex items-center justify-center text-xl flex-shrink-0">
                  {selectedPlace.icon}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                      {selectedPlace.name}
                    </h3>
                    {selectedPlace.code && (
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-600 text-white shadow-2xs">
                        {selectedPlace.code}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        TERRACE_DETAILS[selectedPlace.terrace].badgeBg
                      }`}
                    >
                      {selectedPlace.terrace} Terrace (~{selectedPlace.altitudeMeters}m)
                    </span>
                    <span className="text-[10px] font-semibold text-gray-700 dark:text-gray-300">
                      • {ZONE_LABEL[selectedPlace.zone]}
                    </span>
                    {selectedPlace.distanceKm && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300">
                        📍 {selectedPlace.distanceKm}
                      </span>
                    )}
                    {selectedPlace.travelTime && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300">
                        ⏱️ {selectedPlace.travelTime}
                      </span>
                    )}
                    {selectedPlace.priceRange && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300">
                        💰 {selectedPlace.priceRange}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleNavigateHere(selectedPlace.id)}
                className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-2xs transition-colors flex-shrink-0 cursor-pointer"
                title="Get walking directions to here"
              >
                Go Here →
              </button>
            </div>

            <p className="text-xs font-normal text-gray-800 dark:text-gray-200 leading-relaxed">
              {selectedPlace.hint}
            </p>

            {/* Direct Google Maps & Phone Buttons for Nearby Spots */}
            {selectedPlace.googleMapsUrl && (
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <a
                  href={selectedPlace.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <span>📍 Open in Google Maps</span>
                  <span>↗</span>
                </a>
                {selectedPlace.phone && (
                  <a
                    href={`tel:${selectedPlace.phone}`}
                    className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>📞 Call {selectedPlace.phone}</span>
                  </a>
                )}
              </div>
            )}

            {/* Floor Location & Floor Guide Link */}
            {selectedPlace.floor && (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/80 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-base flex-shrink-0">🏢</span>
                  <div>
                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 block">
                      Floor Location
                    </span>
                    <p className="text-xs font-bold text-gray-900 dark:text-gray-100">
                      {selectedPlace.floor}
                    </p>
                  </div>
                </div>
                {selectedPlace.floorLevel !== undefined && (
                  <button
                    onClick={() => {
                      setSelectedFloorIndex(selectedPlace.floorLevel!);
                      setActiveTab("floors");
                    }}
                    className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10.5px] shadow-2xs transition-all cursor-pointer flex items-center gap-1 flex-shrink-0"
                    title="View in Academic Block Floor Directory"
                  >
                    <span>Floor Guide</span>
                    <span>➔</span>
                  </button>
                )}
              </div>
            )}

            {/* Hostel Occupancy & Warden Information */}
            {selectedPlace.occupancy && (
              <div className="text-xs font-semibold text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800 flex items-center gap-1.5">
                <span>🏠 Occupancy:</span>
                <span>{selectedPlace.occupancy}</span>
              </div>
            )}

            {selectedPlace.warden && (
              <div className="text-[11.5px] text-amber-900 dark:text-amber-100 bg-amber-50/70 dark:bg-amber-950/30 px-2.5 py-1 rounded-lg border border-amber-200/60 dark:border-amber-800/60 flex items-center gap-1.5">
                <span>👨‍💼 {selectedPlace.warden}</span>
              </div>
            )}

            {/* Micro Details (Floors, Timings & Amenities) */}
            <div className="pt-2 border-t border-blue-200/50 dark:border-blue-800/50 flex flex-wrap gap-2 text-[11px] text-gray-600 dark:text-gray-400">
              {selectedPlace.floor && (
                <div className="flex items-center gap-1">
                  <span>🏢</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{selectedPlace.floor}</span>
                </div>
              )}
              {selectedPlace.timings && (
                <div className="flex items-center gap-1">
                  <span>⏱️</span>
                  <span>{selectedPlace.timings}</span>
                </div>
              )}
            </div>

            {selectedPlace.facilities && selectedPlace.facilities.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {selectedPlace.facilities.map((fac) => (
                  <span
                    key={fac}
                    className="text-[9.5px] font-medium px-2 py-0.5 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-semibold shadow-2xs"
                  >
                    ✓ {fac}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Search Input, Category Pills & Floor Quick Filter */}
          <div className="space-y-2">
            <div className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search CR-01..25, LT-1..4, TRs, Labs, Hostels, Hotels, Dhabas, Tourist spots..."
                className="w-full pl-8 pr-7 py-2 text-xs border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-xs pointer-events-none">
                🔍
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Room Type & Category Filter Chips */}
            <div className="flex flex-wrap gap-1 text-xs">
              {CATEGORY_CHIPS.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                      isSelected
                        ? "bg-blue-600 text-white shadow-xs scale-102"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Floor Quick Selector Bar */}
            <div className="flex flex-wrap items-center gap-1 text-[11px] pt-0.5">
              <span className="font-bold text-gray-700 dark:text-gray-300 text-[10px] uppercase tracking-wider mr-1 flex items-center gap-1">
                <span>🏢</span>
                <span>Floor:</span>
              </span>
              {FLOOR_CHIPS.map((fl) => {
                const isSelected = selectedFloor === fl.id;
                return (
                  <button
                    key={`fl-${fl.id}`}
                    type="button"
                    onClick={() => setSelectedFloor(fl.id)}
                    className={`px-2 py-0.5 rounded-md font-semibold whitespace-nowrap transition-all cursor-pointer text-[10.5px] border ${
                      isSelected
                        ? "bg-indigo-600 text-white border-indigo-700 shadow-2xs scale-102"
                        : "bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 font-semibold"
                    }`}
                  >
                    {fl.code}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filtered Place Cards List */}
          <div className="space-y-1.5 max-h-60 overflow-y-auto pr-0.5">
            {filteredPlaces.length === 0 ? (
              <div className="text-center py-6 space-y-1 text-gray-600 dark:text-gray-300">
                <p className="text-xs font-semibold">
                  No matching locations found for &ldquo;{searchQuery}&rdquo;.
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Try searching &ldquo;CR-05&rdquo;, &ldquo;LT-2&rdquo;, &ldquo;TR-01&rdquo;, &ldquo;CL-03&rdquo;, or &ldquo;2nd Floor&rdquo;.
                </p>
              </div>
            ) : (
              filteredPlaces.map((place) => {
                const isSelected = selectedId === place.id;
                return (
                  <button
                    key={place.id}
                    type="button"
                    onClick={() => handleSelectPlaceOnMap(place.id)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? "border-blue-500 bg-blue-50/80 dark:bg-blue-900/30 shadow-2xs scale-101"
                        : "border-gray-200/80 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-base flex-shrink-0">{place.icon}</span>
                      <div className="truncate">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p className="text-xs font-semibold text-gray-800 dark:text-gray-100 truncate">
                            {place.name}
                          </p>
                          {place.floorLevel !== undefined && (
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${
                                place.floorLevel === 0
                                  ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
                                  : place.floorLevel === 1
                                  ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                                  : place.floorLevel === 2
                                  ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                                  : place.floorLevel === 3
                                  ? "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                                  : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                              }`}
                            >
                              {place.floorLevel === 0
                                ? "Ground Floor (L0)"
                                : `${place.floorLevel}${
                                    place.floorLevel === 1
                                      ? "st"
                                      : place.floorLevel === 2
                                      ? "nd"
                                      : place.floorLevel === 3
                                      ? "rd"
                                      : "th"
                                  } Floor (L${place.floorLevel})`}
                            </span>
                          )}
                        </div>
                        <p className="text-[10.5px] font-medium text-gray-600 dark:text-gray-300 truncate">
                          {place.floor ? `${place.floor.split(",")[0]} • ` : ""}{place.terrace} Terrace • {ZONE_LABEL[place.zone]}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-md border flex-shrink-0 ${
                        ZONE_TONE[place.zone]
                      }`}
                    >
                      {place.code || place.shortName || place.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ── TAB 1.5: JUIT 360° VIRTUAL TOUR ── */}
      {activeTab === "tour" && (
        <div className="space-y-3 fade-slide-in">
          {/* Header */}
          <div className="rounded-xl border border-fuchsia-200/70 dark:border-fuchsia-800/60 bg-gradient-to-r from-fuchsia-50 via-purple-50 to-indigo-50 dark:from-fuchsia-950/30 dark:via-purple-950/30 dark:to-indigo-950/30 p-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔄</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-extrabold text-gray-900 dark:text-white leading-tight">
                  JUIT 360° Virtual Tour
                </h3>
                <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-snug mt-0.5">
                  Real 4K 360° walkthroughs — <span className="font-bold">drag inside the video</span> to look around, or tap the 🔄 card icon / move your phone to explore.
                </p>
              </div>
            </div>
          </div>

          {/* Video selector chips */}
          <div className="flex flex-wrap gap-1.5">
            {TOUR_VIDEOS.map((v) => (
              <button
                key={v.id}
                onClick={() => setTourVideoId(v.id)}
                title={v.desc}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer active:scale-95 whitespace-nowrap ${
                  tourVideoId === v.id
                    ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-md shadow-fuchsia-500/25 scale-105"
                    : "bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 border border-gray-200/70 dark:border-gray-700/70"
                }`}
              >
                <span aria-hidden>{v.icon}</span>
                <span>{v.label}</span>
              </button>
            ))}
          </div>

          {/* Active video description */}
          <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 -mt-1 px-0.5">
            {TOUR_VIDEOS.find((v) => v.id === tourVideoId)?.desc}
          </p>

          {/* 360° player — YouTube supports native drag-to-pan for 360° videos */}
          <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg bg-black">
            <iframe
              key={tourVideoId}
              title="JUIT 360° Virtual Tour Video"
              src={`https://www.youtube.com/embed/${tourVideoId}?rel=0`}
              className="w-full h-56 sm:h-64 border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              loading="lazy"
            />
          </div>

          {/* Tip + playlist link */}
          <div className="flex items-center justify-between gap-2 flex-wrap text-[11px]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-fuchsia-50 dark:bg-fuchsia-950/40 text-fuchsia-700 dark:text-fuchsia-300 font-semibold border border-fuchsia-200/70 dark:border-fuchsia-800/70">
              📱 Best on phone: move your device to look around
            </span>
            <a
              href="https://www.youtube.com/playlist?list=PLvvBs_YBMqqDgDeuK8Pg0qrkxJPgwMsPz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              🎬 Full 360° Playlist <span>↗</span>
            </a>
          </div>
        </div>
      )}

      {/* ── TAB 2: CAMPUS ROUTE FINDER ── */}
      {activeTab === "routes" && (
        <div className="space-y-3.5 fade-slide-in">
          {/* Header Description */}
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Campus Walking Navigation
            </h3>
            <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">
              Paved routes &amp; stairs
            </span>
          </div>

          {/* Quick Route Preset Chips */}
          <div>
            <span className="text-[10.5px] font-semibold text-gray-500 dark:text-gray-400 block mb-1.5">
              Popular Student Routes:
            </span>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => {
                  setFromPlaceId("azad");
                  setToPlaceId("lt-complex");
                }}
                className="text-[10.5px] font-medium px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:scale-102 transition-all cursor-pointer"
              >
                🏃 Morning Class (Azad ➔ LT-1)
              </button>
              <button
                onClick={() => {
                  setFromPlaceId("geeta");
                  setToPlaceId("mess");
                }}
                className="text-[10.5px] font-medium px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300 hover:scale-102 transition-all cursor-pointer"
              >
                🍽️ Meal Time (Geeta ➔ Mess)
              </button>
              <button
                onClick={() => {
                  setFromPlaceId("shastri");
                  setToPlaceId("library");
                }}
                className="text-[10.5px] font-medium px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:scale-102 transition-all cursor-pointer"
              >
                📚 Study (Shastri ➔ LRC)
              </button>
              <button
                onClick={() => {
                  setFromPlaceId("parmar");
                  setToPlaceId("dispensary");
                }}
                className="text-[10.5px] font-medium px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 hover:scale-102 transition-all cursor-pointer"
              >
                🏥 Emergency (Hostel ➔ Dispensary)
              </button>
            </div>
          </div>

          {/* From & To Selectors */}
          <div className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-2.5">
            <div>
              <label className="text-[10.5px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                From Location:
              </label>
              <select
                value={fromPlaceId}
                onChange={(e) => setFromPlaceId(e.target.value)}
                className="w-full text-xs font-semibold p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-500"
              >
                {CAMPUS_PLACES.filter((p) => !p.isNearbySpot).map((p) => (
                  <option key={`from-${p.id}`} value={p.id}>
                    {p.icon} {p.name} {p.floor ? `• ${p.floor.split(",")[0]}` : `(${p.terrace} Terrace)`}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  const temp = fromPlaceId;
                  setFromPlaceId(toPlaceId);
                  setToPlaceId(temp);
                }}
                className="w-7 h-7 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-xs text-gray-500 hover:text-blue-600 shadow-2xs hover:scale-110 transition-transform cursor-pointer"
                title="Swap origin and destination"
              >
                ⇅
              </button>
            </div>

            <div>
              <label className="text-[10.5px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                To Destination:
              </label>
              <select
                value={toPlaceId}
                onChange={(e) => setToPlaceId(e.target.value)}
                className="w-full text-xs font-semibold p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-500"
              >
                {CAMPUS_PLACES.filter((p) => !p.isNearbySpot).map((p) => (
                  <option key={`to-${p.id}`} value={p.id}>
                    {p.icon} {p.name} {p.floor ? `• ${p.floor.split(",")[0]}` : `(${p.terrace} Terrace)`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Route Summary Card */}
          {activeRoute && (
            <div className="rounded-2xl border border-blue-300 dark:border-blue-800 bg-white dark:bg-gray-900 shadow-sm p-3.5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-gray-900 dark:text-white">
                  {activeRoute.title}
                </h4>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  ⏱️ {activeRoute.duration}
                </span>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/70 border border-gray-200/60 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 font-bold block text-[9.5px]">ELEVATION</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">
                    {activeRoute.elevationChange}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/70 border border-gray-200/60 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 font-bold block text-[9.5px]">EFFORT / STEPS</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">
                    {activeRoute.stepsCount}
                  </span>
                </div>
              </div>

              {/* Turn by turn directions */}
              <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Step-by-Step Walking Directions:
                </span>
                <div className="space-y-1.5">
                  {activeRoute.directions.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── TAB 3: CLASSROOMS & FLOOR DIRECTORY ── */}
      {activeTab === "floors" && (
        <div className="space-y-3 fade-slide-in">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Academic Block Floor Directory
            </h3>
            <span className="text-[10.5px] font-semibold text-gray-600 dark:text-gray-300">Upper Terrace (~1620m)</span>
          </div>

          {/* Floor Selector Buttons */}
          <div className="grid grid-cols-5 gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 min-w-0">
            {ACADEMIC_FLOORS.map((fl, idx) => {
              const isSelected = selectedFloorIndex === idx;
              return (
                <button
                  key={fl.floor}
                  onClick={() => setSelectedFloorIndex(idx)}
                  className={`py-1.5 px-0.5 sm:px-1 rounded-lg text-xs font-semibold transition-all text-center cursor-pointer min-w-0 ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-xs scale-102"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <div className="font-bold truncate">{fl.levelNum === 0 ? "Ground" : `${fl.levelNum}F`}</div>
                  <div className="text-[8.5px] sm:text-[9px] opacity-75 font-normal truncate">Level {fl.levelNum}</div>
                </button>
              );
            })}
          </div>

          {/* Active Floor Card */}
          {ACADEMIC_FLOORS[selectedFloorIndex] && (
            <div className="rounded-2xl border border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-900 p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                  {ACADEMIC_FLOORS[selectedFloorIndex].floor}
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  Level {ACADEMIC_FLOORS[selectedFloorIndex].levelNum}
                </span>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-300">
                {ACADEMIC_FLOORS[selectedFloorIndex].description}
              </p>

              <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 block mb-1">
                  Primary Room Codes:
                </span>
                <p className="text-xs font-mono font-bold text-gray-900 dark:text-gray-100">
                  {ACADEMIC_FLOORS[selectedFloorIndex].rooms}
                </p>
              </div>

              {/* Key spots on floor */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Offices, Labs &amp; Landmarks:
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {ACADEMIC_FLOORS[selectedFloorIndex].keySpots.map((spot) => (
                    <div
                      key={spot}
                      className="flex items-center gap-2 p-1.5 rounded-lg bg-gray-50 dark:bg-gray-800/60 text-xs text-gray-700 dark:text-gray-300"
                    >
                      <span className="text-blue-500 font-bold">•</span>
                      <span>{spot}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* LRC Library Floor Guide Info */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/40 p-3 text-xs space-y-1">
            <p className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
              <span>📚</span>
              <span>Central Library (LRC) 3-Floor Layout</span>
            </p>
            <p className="text-[11px] text-gray-700 dark:text-gray-300 leading-relaxed">
              Ground: Circulation &amp; Daily Reading • 1st Floor: Book Stacks &amp; Archives • 2nd Floor: Digital Library &amp; IEEE Terminal Lab.
            </p>
          </div>
        </div>
      )}

      {/* ── TAB 4: NEARBY HOTELS, DHABAS & TOURIST SPOTS ── */}
      {activeTab === "nearby" && (
        <div className="space-y-3.5 fade-slide-in">
          {/* Header Description */}
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Nearby Guide • Hotels, Dhabas &amp; Tourist Attractions
            </h3>
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              {NEARBY_SPOTS.length} Verified Locations
            </span>
          </div>

          {/* 4 Intuitive Travel Zone Radii Navigation Cards */}
          <div className="space-y-1.5">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <span>📍</span>
              <span>Filter by Travel Radius from Gate 1:</span>
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {(Object.keys(NEARBY_ZONES) as NearbyZoneDistance[]).map((zk) => {
                const z = NEARBY_ZONES[zk];
                const count = zoneCounts[zk];
                const isSelected = nearbyZoneFilter === zk;
                return (
                  <button
                    key={zk}
                    type="button"
                    onClick={() => setNearbyZoneFilter((prev) => (prev === zk ? "all" : zk))}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-emerald-600 text-white border-emerald-700 shadow-sm scale-102 ring-2 ring-emerald-400/50"
                        : "bg-white dark:bg-gray-800 hover:bg-emerald-50/50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-base">{z.icon}</span>
                        <span className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded-md ${
                          isSelected ? "bg-white/20 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                        }`}>
                          {z.badge}
                        </span>
                      </div>
                      <p className={`text-xs font-bold mt-1 line-clamp-1 ${isSelected ? "text-white" : "text-gray-900 dark:text-white"}`}>
                        {z.name}
                      </p>
                    </div>
                    <div className={`mt-2 pt-1 border-t text-[10px] flex items-center justify-between gap-2 w-full ${
                      isSelected ? "border-white/20 text-white/90" : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium"
                    }`}>
                      <span>{count} spots</span>
                      <span className="font-semibold">{isSelected ? "Selected ✓" : "Filter →"}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            {nearbyZoneFilter !== "all" && (
              <div className="flex items-center justify-between px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[11px] text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <span>
                  Filtering: <strong>{NEARBY_ZONES[nearbyZoneFilter].name}</strong> ({NEARBY_ZONES[nearbyZoneFilter].transitHint})
                </span>
                <button
                  onClick={() => setNearbyZoneFilter("all")}
                  className="font-bold underline hover:text-emerald-950 dark:hover:text-emerald-100 cursor-pointer ml-2"
                >
                  Show All Radii
                </button>
              </div>
            )}
          </div>

          {/* Sub-Category Filter Chips */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => setNearbyFilter("all")}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  nearbyFilter === "all"
                    ? "bg-emerald-600 text-white shadow-xs scale-102"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <span>🌟</span>
                <span>All Types ({filteredNearbySpots.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setNearbyFilter("tourist")}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  nearbyFilter === "tourist"
                    ? "bg-purple-600 text-white shadow-xs scale-102"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <span>🌲</span>
                <span>Tourist &amp; Treks ({categoryCounts.tourist})</span>
              </button>

              <button
                type="button"
                onClick={() => setNearbyFilter("dhaba")}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  nearbyFilter === "dhaba"
                    ? "bg-amber-600 text-white shadow-xs scale-102"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <span>🥘</span>
                <span>Dhabas &amp; Food ({categoryCounts.dhaba})</span>
              </button>

              <button
                type="button"
                onClick={() => setNearbyFilter("hotel")}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  nearbyFilter === "hotel"
                    ? "bg-blue-600 text-white shadow-xs scale-102"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <span>🏨</span>
                <span>Hotels &amp; Stays ({categoryCounts.hotel})</span>
              </button>
            </div>

            {/* In-tab Search */}
            <div className="relative">
              <input
                type="search"
                value={nearbySearch}
                onChange={(e) => setNearbySearch(e.target.value)}
                placeholder="Search Sadhupul river, Karol Tibba, Kali Ka Tibba, Jatoli, Mohan Shakti, dhabas, paranthas, Shimla..."
                className="w-full pl-8 pr-7 py-2 text-xs border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-xs pointer-events-none">
                🔍
              </span>
              {nearbySearch && (
                <button
                  onClick={() => setNearbySearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-2.5">
            {filteredNearbySpots.length === 0 ? (
              <div className="text-center py-8 space-y-1 text-gray-600 dark:text-gray-300">
                <p className="text-xs font-semibold">No nearby spots matching &ldquo;{nearbySearch}&rdquo;.</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">Try &ldquo;Sadhupul&rdquo;, &ldquo;hotel&rdquo;, &ldquo;parantha&rdquo;, &ldquo;trek&rdquo;, or reset the radius filter.</p>
              </div>
            ) : (
              filteredNearbySpots.map((spot) => (
                <div
                  key={spot.id}
                  className="p-3.5 rounded-2xl border border-gray-200/90 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs hover:border-emerald-400/60 dark:hover:border-emerald-600/60 transition-all space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 text-xl flex items-center justify-center flex-shrink-0 border border-gray-200 dark:border-gray-700">
                        {spot.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                            {spot.name}
                          </h4>
                          <span
                            className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                              spot.category === "hotel"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                                : spot.category === "dhaba"
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                                : "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
                            }`}
                          >
                            {spot.category === "hotel" ? "🏨 Hotel / Stay" : spot.category === "dhaba" ? "🥘 Dhaba / Food" : "🌲 Tourist Spot"}
                          </span>
                          <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            {NEARBY_ZONES[spot.zoneDistance]?.shortLabel}
                          </span>
                        </div>
                        <p className="text-[10.5px] text-gray-500 dark:text-gray-400 mt-0.5">
                          📍 {spot.location}
                        </p>
                      </div>
                    </div>

                    <a
                      href={spot.directionsUrl || spot.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-2xs transition-colors flex items-center gap-1 flex-shrink-0 cursor-pointer"
                    >
                      <span>🚗 Go</span>
                      <span>↗</span>
                    </a>
                  </div>

                  {/* Badges Row: Distance, Travel Time, Price Range */}
                  <div className="flex items-center gap-1.5 flex-wrap text-[10.5px]">
                    <span className="font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300">
                      📍 {spot.distanceKm}
                    </span>
                    <span className="font-semibold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300">
                      ⏱️ {spot.travelTime}
                    </span>
                    <span className="font-semibold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300">
                      💰 {spot.priceRange}
                    </span>
                    {spot.bestTimeToVisit && (
                      <span className="font-medium px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
                        🕒 {spot.bestTimeToVisit}
                      </span>
                    )}
                    {spot.hours && (
                      <span className="font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                        🚪 {spot.hours}
                      </span>
                    )}
                  </div>

                  {/* Description & Specialty */}
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    {spot.description}
                  </p>

                  <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/70 dark:border-gray-700/70 text-[11px] text-gray-700 dark:text-gray-300">
                    <strong className="text-gray-900 dark:text-white font-semibold">✨ Specialty / Must-Try: </strong>
                    <span>{spot.specialty}</span>
                  </div>

                  {/* How to reach transit instructions */}
                  {spot.howToReach && (
                    <div className="p-2 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/60 text-[11px] text-blue-900 dark:text-blue-200 flex items-start gap-1.5">
                      <span className="text-sm flex-shrink-0">🚌</span>
                      <div>
                        <strong className="font-semibold">Transit from Gate 1: </strong>
                        <span>{spot.howToReach}</span>
                      </div>
                    </div>
                  )}

                  {/* Actions & Contact */}
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-gray-100 dark:border-gray-800 flex-wrap">
                    <div className="flex items-center gap-2">
                      {spot.phone && (
                        <a
                          href={`tel:${spot.phone}`}
                          className="text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          <span>📞</span>
                          <span>{spot.phone}</span>
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleViewSpotOnMap(spot)}
                        className="text-[10.5px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800 transition-colors flex items-center gap-1 cursor-pointer"
                        title="View and preview this destination in the Map Area"
                      >
                        <span>🗺️ View on Map Canvas</span>
                        <span>➔</span>
                      </button>
                      <a
                        href={spot.directionsUrl || spot.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10.5px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 px-2 py-1 rounded-md border border-blue-200 dark:border-blue-800 transition-colors flex items-center gap-1"
                      >
                        <span>🚗 Directions</span>
                        <span>↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ── TAB 5: TRANSIT & REACHING WAKNAGHAT ── */}
      {activeTab === "transit" && (
        <div className="space-y-4 fade-slide-in">
          {/* Solan - Waknaghat - Shimla Bus Timetable */}
          <BusTimetable />

          {/* Highway & Regional Reachability Divider */}
          <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              🛣️ Highway &amp; Regional Distances
            </h4>
          </div>

          {/* Quick Highway Info */}
          <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-white dark:from-emerald-950/40 dark:via-gray-900/60 dark:to-gray-900 border border-emerald-200 dark:border-emerald-800 text-xs space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-lg">🛣️</span>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">NH-5 (Shimla–Solan National Highway)</p>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
                  {TRANSIT_GUIDE.highway}
                </p>
              </div>
            </div>
            <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
              GPS Coordinates: <strong className="font-mono">{TRANSIT_GUIDE.coordinates}</strong>
            </p>
          </div>

          {/* Distance & Travel Times Table */}
          <div className="space-y-1.5">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Distances &amp; Travel Times:
            </span>
            <div className="space-y-1.5">
              {TRANSIT_GUIDE.distances.map((item) => (
                <div
                  key={item.to}
                  className="p-2.5 rounded-xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between gap-2 text-xs"
                >
                  <div>
                    <p className="font-bold text-gray-800 dark:text-gray-100">{item.to}</p>
                    <p className="text-[10.5px] font-medium text-gray-600 dark:text-gray-400">{item.mode}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-extrabold text-blue-600 dark:text-blue-400">{item.distance}</p>
                    <p className="text-[10.5px] font-bold text-gray-700 dark:text-gray-300">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Helpful Local Travel Tips */}
          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-xs space-y-1.5">
            <p className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
              <span>💡</span>
              <span>Local Transit Tips</span>
            </p>
            <div className="space-y-1 text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
              {TRANSIT_GUIDE.tips.map((tip, idx) => (
                <p key={idx}>• {tip}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

