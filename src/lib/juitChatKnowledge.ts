import { FACULTY_MEMBERS } from "@/lib/facultyData";
import { JUIT_CLUBS, JYC_OVERVIEW } from "@/lib/clubsData";
import { FALLBACK_MESS_MENU, FALLBACK_TIMETABLE } from "@/lib/juitData";
import { NEARBY_SPOTS, CAMPUS_LAYOUT_FOR_AI } from "@/lib/campusMap";
import { JUIT_OFFICIAL_LINKS, JUIT_OFFICIAL_CONTACTS } from "@/lib/juitLinksData";
import { JUIT_RULES } from "@/lib/juitRulesData";
import {
  SOLAN_SHIMLA_BUS_SCHEDULE,
  BUS_ENQUIRY_CONTACTS,
  TRANSIT_CONNECTIVITY_TIPS,
} from "@/lib/busTimetable";

// Complete Official Academic Calendar Events for 2026-27
export const ACADEMIC_CALENDAR_EVENTS = [
  // Odd Semester 2026
  { date: "2026-07-20", label: "Odd Semester Classes Begin", type: "academic" },
  { date: "2026-08-05", label: "Diksha (Freshers Fiesta)", type: "event" },
  { date: "2026-08-15", label: "Independence Day (Gazetted Holiday)", type: "holiday" },
  { date: "2026-08-28", label: "Raksha Bandhan (Gazetted Holiday)", type: "holiday" },
  { date: "2026-08-31", endDate: "2026-09-09", label: "T1 Mid-Semester Examinations", type: "exam" },
  { date: "2026-09-04", label: "Janmashtami (Gazetted Holiday)", type: "holiday" },
  { date: "2026-09-16", label: "T1 Answer Sheets Shown to Students", type: "academic" },
  { date: "2026-09-24", endDate: "2026-09-26", label: "Murious 2026 (Annual Technical & Coding Fest)", type: "event" },
  { date: "2026-10-01", endDate: "2026-10-04", label: "Parakram 2026 (Annual Sports Meet)", type: "event" },
  { date: "2026-10-02", label: "Gandhi Jayanti (Gazetted Holiday)", type: "holiday" },
  { date: "2026-10-10", endDate: "2026-10-19", label: "T2 Examinations", type: "exam" },
  { date: "2026-10-20", label: "Dussehra (Gazetted Holiday)", type: "holiday" },
  { date: "2026-10-29", label: "T2 Answer Sheets Shown to Students", type: "academic" },
  { date: "2026-11-02", endDate: "2026-11-09", label: "Diwali Break (Student Vacation)", type: "vacation" },
  { date: "2026-11-06", endDate: "2026-11-07", label: "Diwali (Gazetted Holiday)", type: "holiday" },
  { date: "2026-11-09", label: "Govardhan Puja (Gazetted Holiday)", type: "holiday" },
  { date: "2026-11-24", label: "Guru Nanak Jayanti (Gazetted Holiday)", type: "holiday" },
  { date: "2026-12-01", label: "Last Day of Odd Semester Classes", type: "academic" },
  { date: "2026-12-02", endDate: "2026-12-15", label: "T3 End-Semester Examinations", type: "exam" },
  { date: "2026-12-19", label: "T3 Answer Sheets Shown to Students", type: "academic" },
  { date: "2026-12-19", endDate: "2027-01-05", label: "Winter Vacation", type: "vacation" },
  { date: "2026-12-24", label: "Results Declaration (Odd Sem)", type: "academic" },
  { date: "2026-12-25", label: "Christmas (Gazetted Holiday)", type: "holiday" },

  // Even Semester 2027
  { date: "2027-01-07", label: "Even Semester Classes Begin", type: "academic" },
  { date: "2027-01-26", label: "Republic Day (Gazetted Holiday)", type: "holiday" },
  { date: "2027-02-08", endDate: "2027-02-15", label: "T1 Examinations (Even Sem)", type: "exam" },
  { date: "2027-02-19", endDate: "2027-02-21", label: "Le Fiestus 2027 (Annual Techno-Cultural Fest)", type: "event" },
  { date: "2027-03-06", label: "Maha Shivratri (Gazetted Holiday)", type: "holiday" },
  { date: "2027-03-20", endDate: "2027-03-25", label: "Holi Break (Student Vacation)", type: "vacation" },
  { date: "2027-03-29", endDate: "2027-04-07", label: "T2 Examinations (Even Sem)", type: "exam" },
  { date: "2027-04-14", label: "Dr. B.R. Ambedkar Jayanti (Gazetted Holiday)", type: "holiday" },
  { date: "2027-04-15", label: "Himachal Day (State Holiday)", type: "holiday" },
  { date: "2027-05-18", label: "Last Day of Even Semester Classes", type: "academic" },
  { date: "2027-05-19", endDate: "2027-05-29", label: "T3 End-Semester Examinations", type: "exam" },
  { date: "2027-06-07", label: "Results Declaration (Even Sem)", type: "academic" },
  { date: "2027-06-08", endDate: "2027-07-15", label: "Summer Vacation", type: "vacation" },
];

/**
 * Builds dynamic context string containing live data from all navbar tools:
 * - Current day, date, and meal of the day
 * - Mess menu for today and the full week
 * - Next upcoming holiday and exam dates
 * - Faculty directory (phone numbers, cabins, emails, codes)
 * - Clubs and communities (events, websites, emails, coordinators)
 * - Timetable slots and room numbers
 * - Campus layout and nearby spots
 */
export function getUnifiedJuitKnowledge(options?: {
  studentBatch?: string;
  referenceDate?: Date;
}): string {
  // Use provided reference date or current local time
  const now = options?.referenceDate || new Date();
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const dateStr = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // 1. Determine today's mess menu
  const todayMenu =
    FALLBACK_MESS_MENU.weekly.find(
      (m) => m.day.toLowerCase() === dayName.toLowerCase()
    ) || FALLBACK_MESS_MENU.weekly[0];

  // 2. Determine next upcoming holiday and upcoming exam
  const todayIso = now.toISOString().split("T")[0];
  const upcomingHolidays = ACADEMIC_CALENDAR_EVENTS.filter(
    (e) => (e.type === "holiday" || e.type === "vacation") && e.date >= todayIso
  ).sort((a, b) => a.date.localeCompare(b.date));

  const upcomingExams = ACADEMIC_CALENDAR_EVENTS.filter(
    (e) => e.type === "exam" && (e.endDate || e.date) >= todayIso
  ).sort((a, b) => a.date.localeCompare(b.date));

  const nextHoliday = upcomingHolidays[0];
  const nextExam = upcomingExams[0];

  // 3. Compact Faculty listing
  const facultySummary = FACULTY_MEMBERS.map((f) => {
    const contact = [
      f.mobile ? `Mob: ${f.mobile}` : "",
      f.phone ? `Off: ${f.phone}` : "",
      `Email: ${f.email}`,
      f.office ? `Cabin: ${f.office}` : "",
      f.timetableCode ? `Code: ${f.timetableCode}` : "",
    ]
      .filter(Boolean)
      .join(" | ");
    return `• ${f.name} (${f.designation}, ${f.department}) — ${contact}`;
  }).join("\n");

  // 4. Clubs & Student Bodies listing
  const clubsSummary = JUIT_CLUBS.map((c) => {
    const contactInfo = [
      c.websiteUrl ? `Website: ${c.websiteUrl}` : "",
      c.instagram ? `Instagram: ${c.instagram}` : "",
      c.email ? `Email: ${c.email}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    return `• ${c.name} [${c.acronym || c.shortName}]${contactInfo ? ` (${contactInfo})` : ""}
   Category: ${c.categoryLabel}
   Flagship Events: ${c.flagshipEvents.join(", ")}
   Domains: ${c.coreActivities.join(", ")}
   Coordinator: ${c.facultyCoordinator || "JYC Student Council"}
   Recruitment: ${c.recruitmentInfo}`;
  }).join("\n\n");

  // 5. Full Weekly Mess Menu
  const messWeekly = FALLBACK_MESS_MENU.weekly
    .map((m) => {
      return `[${m.day}]
- Breakfast: ${m.breakfast}
- Lunch: ${m.lunch}
- Dinner: ${m.dinner}`;
    })
    .join("\n\n");

  // 6. Academic Calendar & Holidays summary
  const calendarSummary = ACADEMIC_CALENDAR_EVENTS.map((e) => {
    const dates = e.endDate ? `${e.date} to ${e.endDate}` : e.date;
    return `• ${dates}: ${e.label} [${e.type.toUpperCase()}]`;
  }).join("\n");

  // 7. Nearby spots summary
  const nearbySummary = NEARBY_SPOTS.map((s) => {
    return `• ${s.name} [${s.zoneDistance.toUpperCase()}] (${s.category.toUpperCase()}) — ${s.distanceKm} (${s.travelTime}) | Price: ${s.priceRange} | ${s.specialty} | Transit: ${s.howToReach || "Shared auto/direct bus"}${s.bestTimeToVisit ? ` | Best Time: ${s.bestTimeToVisit}` : ""}`;
  }).join("\n");

  // 8. Timetable slot references
  const timetableSlotInfo = `Standard Slot Timing Reference:
- Slot 1: 10:00 AM – 10:55 AM
- Slot 2: 11:00 AM – 11:55 AM
- Slot 3: 12:00 PM – 12:55 PM
- Slot 4: 01:00 PM – 01:55 PM
- Slot 5: 02:00 PM – 02:55 PM
- Slot 6: 03:00 PM – 03:55 PM
- Slot 7: 04:00 PM – 04:55 PM
- Slot 8: 05:00 PM – 05:55 PM

Default 1st-Year Batch (26BT11) Schedule:
- Monday:
  • 10:00 AM: English / Language Lab (LANGULAB, Faculty JBSW_RS12)
  • 12:00 PM: Physics Lecture (CR-04, Faculty HAZ)
  • 02:00 PM: Software Dev Fundamentals (CR-15, Faculty FSL / Faisal Firdous)
  • 03:00 PM: Basic Electronics (CR-15, Faculty HSL)
- Tuesday:
  • 10:00 AM: Mathematics-I (CR-04)
  • 11:00 AM: Basic Electronics (CR-04)
  • 02:00 PM - 04:00 PM: Software Dev Fundamentals Lab (CL-01 / CL-02)
- Wednesday:
  • 10:00 AM: Physics-I Lecture (CR-04)
  • 12:00 PM: Mathematics-I (CR-04)
  • 02:00 PM - 04:00 PM: Physics Lab (PHLAB, Level 2)
- Thursday:
  • 11:00 AM: Software Dev Fundamentals (CR-04)
  • 12:00 PM: Mathematics-I (CR-04)
  • 03:00 PM - 05:00 PM: Basic Electronics Lab (ECL, Level 2)
- Friday:
  • 10:00 AM: Software Dev Fundamentals (CR-04)
  • 11:00 AM: Mathematics-I (CR-04)
  • 02:00 PM: Physics Tutorial (TR-01, Level 3)
- Saturday:
  • 10:00 AM - 12:00 PM: Engineering Workshop Practice`;

  // 7. Format Official Websites & Library Portals
  const officialLinksSummary = JUIT_OFFICIAL_LINKS.map(
    (l) => `• ${l.title} [${l.badge || l.category}]: ${l.url} — ${l.description}`
  ).join("\n");

  const officialContactsSummary = JUIT_OFFICIAL_CONTACTS.map(
    (c) =>
      `• ${c.role} (${c.department}): Phone ${c.phone || "N/A"}, Email ${c.email || "N/A"}, Location: ${c.location || "Main Campus"}${c.isEmergency ? " [24x7 EMERGENCY]" : ""}`
  ).join("\n");

  // 8. Format Official University Rules & Ordinances
  const rulesSummary = JUIT_RULES.map(
    (r) => `• ${r.title} [${r.badge}]: ${r.summary}\n  Key Provisions: ${r.keyPoints.join(" | ")}${r.penalty ? `\n  ⚠️ Violation Penalty: ${r.penalty}` : ""}`
  ).join("\n\n");

  // 9. Format Solan ⇄ Waknaghat ⇄ Shimla Bus Timetable & Transit Guide
  const solanToShimlaBuses = SOLAN_SHIMLA_BUS_SCHEDULE.filter((b) => b.direction === "solan_to_shimla");
  const shimlaToSolanBuses = SOLAN_SHIMLA_BUS_SCHEDULE.filter((b) => b.direction === "shimla_to_solan");

  const busScheduleSummary = `
Direction 1: Solan ➔ Waknaghat Chowk ➔ Shimla (${solanToShimlaBuses.length} verified departures):
${solanToShimlaBuses.map((b) => `• ${b.departureTime} (Solan) ➔ ~${b.waknaghatTime} (Waknaghat JUIT Cut) ➔ ${b.arrivalTime} (Shimla) | ${b.busType} (${b.operator}) | Fare from Waknaghat: ${b.fareFromWaknaghat} (Full: ${b.fullFare}) | Via: ${b.routeVia}${b.note ? ` | Note: ${b.note}` : ""}`).join("\n")}

Direction 2: Shimla ➔ Waknaghat Chowk ➔ Solan (${shimlaToSolanBuses.length} verified departures):
${shimlaToSolanBuses.map((b) => `• ${b.departureTime} (Shimla) ➔ ~${b.waknaghatTime} (Waknaghat JUIT Cut) ➔ ${b.arrivalTime} (Solan) | ${b.busType} (${b.operator}) | Fare from Waknaghat: ${b.fareFromWaknaghat} (Full: ${b.fullFare}) | Via: ${b.routeVia}${b.note ? ` | Note: ${b.note}` : ""}`).join("\n")}

Local Waknaghat & Taxi Connectivity:
${TRANSIT_CONNECTIVITY_TIPS.map((t) => `• ${t.title}: ${t.detail}`).join("\n")}

HRTC Station Inquiry Numbers:
${BUS_ENQUIRY_CONTACTS.map((c) => `• ${c.station}: ${c.phone} (${c.timing}) — ${c.desc}`).join("\n")}
`;

  return `══════════════════════════════════════════════════════════════
JUIT LIVE KNOWLEDGE BASE (REAL DATA FROM ALL NAVBAR SECTIONS)
══════════════════════════════════════════════════════════════

📅 CURRENT TEMPORAL CONTEXT:
- Today's Date: ${dayName}, ${dateStr}
- Active Student Batch: ${options?.studentBatch || "26BT11 (1st Year CSE)"}
- Today's Mess Menu (${dayName}):
  • Breakfast: ${todayMenu.breakfast}
  • Lunch: ${todayMenu.lunch}
  • Dinner: ${todayMenu.dinner}
- Next Upcoming Holiday: ${
    nextHoliday
      ? `${nextHoliday.label} on ${nextHoliday.date}`
      : "Gandhi Jayanti on October 2, 2026"
  }
- Next Upcoming Exam: ${
    nextExam
      ? `${nextExam.label} (${nextExam.date} to ${nextExam.endDate || nextExam.date})`
      : "T2 Examinations (October 10 – October 19, 2026)"
  }
- Next Vacation Break: Diwali Break (November 2 to November 9, 2026)

📜 JUIT OFFICIAL RULES, REGULATIONS & CODE OF CONDUCT:
${rulesSummary}

🌐 OFFICIAL JUIT WEBSITES, LIBRARY RESOURCES & STUDENT PORTALS:
${officialLinksSummary}

📞 OFFICIAL UNIVERSITY HELPLINES, OFFICES & EMERGENCY CONTACTS:
${officialContactsSummary}

🍽️ HOSTEL MESS MENU & TIMINGS (ANNAPURNA MESS):
- Meal Timings: Breakfast: 07:30 - 09:30 AM | Lunch: 12:00 - 02:00 PM | Dinner: 07:30 - 09:00 PM
- Night Milk Distribution: 09:15 PM - 09:45 PM (Girls at Geeta Bhawan; Boys at Dining Hall 1 & Peach Tree)
Full Weekly Menu:
${messWeekly}

🗓️ ACADEMIC CALENDAR 2026-27 (EXAMS, HOLIDAYS & VACATIONS):
${calendarSummary}

👨‍🏫 COMPLETE JUIT FACULTY & PROFESSOR DIRECTORY:
(Includes mobile numbers, office extension, cabins, and timetable codes)
${facultySummary}

🎭 JUIT CLUBS, SOCIETIES & STUDENT BODIES:
Apex Council: ${JYC_OVERVIEW.name} (Website: ${JYC_OVERVIEW.websiteUrl}) — Supervised by ${JYC_OVERVIEW.deanWelfare}
Major Festivals:
• Le Fiestus: Annual 3-day techno-cultural fest (concerts, pro-nites, rock bands, vogue fashion)
• Murious: Annual technical & coding fest (hackathons, robotics, LAN gaming)
• Diksha: Freshers induction gala (Mr. & Ms. Freshers pageant)
• Altitude / Parakram: Annual inter-college sports tournament

All Student Clubs:
${clubsSummary}

📅 TIMETABLE & CLASS SCHEDULE DETAILS:
${timetableSlotInfo}

🏫 CAMPUS LAYOUT & CLASSROOM LOCATIONS:
${CAMPUS_LAYOUT_FOR_AI}
CR-13, CR-14, CR-15 Location Note: Classrooms CR-13, CR-14, and CR-15 are located in the Civil Engineering Block on the Lower Terrace (~1540m).

🚩 DEVELOPER CONTACT & REPORT AREA (DIRECT FEEDBACK CHANNEL):
- Lead Developer: Tahir Bhat
- Direct Email: tahirbhat2008@gmail.com
- LinkedIn Profile: https://www.linkedin.com/in/tahirbhat-2008-cse
- How users can submit bug reports or feedback:
  Students can click the "🚩 Report" button in the top navigation header or navigate to Campus Info -> Websites & Contacts tab to open the direct message box.
  Users can enter their message directly into the on-screen message box without leaving the website, and it is delivered directly to Tahir's email (tahirbhat2008@gmail.com).

CR-01 to CR-08 are on 2nd Floor (Level 2).
CR-09 to CR-12, CR-16, CR-17 are on 3rd Floor (Level 3).
CR-18 to CR-25 are on 4th Floor (Level 4).
LT-1 & LT-2 are on Ground Floor (Level 0); LT-3 & LT-4 on 1st Floor (Level 1).

🌲 NEARBY HOTELS, DHABAS & TOURIST SPOTS:
${nearbySummary}


📊 JUIT 10-POINT CGPA & SGPA GRADING SYSTEM:
• Grading Scale:
  - A+ : 10.0 (Outstanding)
  - A  : 9.0  (Excellent)
  - B+ : 8.0  (Very Good)
  - B  : 7.0  (Good)
  - C+ : 6.0  (Above Average)
  - C  : 5.0  (Average)
  - D  : 4.0  (Pass - minimum passing grade)
  - F  : 0.0  (Fail / Backlog)
• Evaluation Weightage:
  - T1 Exam: 15%
  - T2 Exam: 25%
  - T3 Exam: 35%
  - Internal / Teacher Assessment (TA): 25% (Quizzes, assignments, attendance, tutorials)
• SGPA Formula:
  SGPA = Sum(Course Credit * Grade Point) / Sum(Course Credits)
• Cumulative CGPA Formula:
  CGPA = Sum of (SGPA_i * Credits_i) for all semesters / Total Completed Credits
  Equivalently: ((Previous CGPA * Previous Credits) + (Current SGPA * Current Credits)) / (Previous Credits + Current Credits)
• JUIT Degree & Promotion Cutoffs:
  - 1st Year Promotion: Minimum 4.5 CGPA required at the end of 2nd semester to promote to 3rd semester.
  - Degree Award: Minimum 5.0 CGPA required to graduate at the end of 8th semester.
  - First Division: CGPA >= 6.5.
  - First Division with Distinction: CGPA >= 8.5 without any academic backlogs.
• Approximate Percentage Conversion:
  Equivalent Percentage = CGPA * 10.0 (as per standard JUIT transcript guidelines).

🚌 SOLAN ⇄ WAKNAGHAT ⇄ SHIMLA BUS TIMETABLE & TRANSIT SCHEDULE (HRTC & MUDRIKA):
${busScheduleSummary}
══════════════════════════════════════════════════════════════`;
}
