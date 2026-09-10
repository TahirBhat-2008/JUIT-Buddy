export interface JuitRuleItem {
  id: string;
  title: string;
  category: "attendance" | "exams" | "hostel" | "anti_ragging" | "discipline" | "it_policy";
  summary: string;
  keyPoints: string[];
  penalty?: string;
  officialRef?: string;
  badge: string;
  severity: "critical" | "warning" | "info";
  icon: string;
}

export const JUIT_RULE_CATEGORIES = [
  { id: "all", label: "All Rules", icon: "📜" },
  { id: "attendance", label: "Attendance (80% Rule)", icon: "⏱️" },
  { id: "exams", label: "Exams & Grading", icon: "📊" },
  { id: "hostel", label: "Hostel & Curfew", icon: "🏢" },
  { id: "anti_ragging", label: "Anti-Ragging", icon: "🛡️" },
  { id: "discipline", label: "Conduct & Dress Code", icon: "👔" },
  { id: "it_policy", label: "IT & Wi-Fi Policy", icon: "💻" },
] as const;

export const JUIT_RULES: JuitRuleItem[] = [
  // ─── ⏱️ ATTENDANCE RULES ───────────────────────────────────────────────────
  {
    id: "att-80-percent",
    title: "Mandatory 80% Minimum Attendance Requirement",
    category: "attendance",
    badge: "Strict Requirement",
    severity: "critical",
    icon: "⏱️",
    summary: "Every student must maintain at least 80% attendance in lectures, tutorials, and practicals separately in each course to be eligible to appear in End-Semester Examinations (T3).",
    keyPoints: [
      "Calculated independently for lectures, tutorials, and practical lab sessions.",
      "Tracked in real-time on the Campus Lynx student web portal.",
      "Internal Assessment (TA) awards up to 5% marks directly based on high attendance percentage.",
      "No student with attendance below 80% will be issued an exam admit card for that course unless an official medical concession is sanctioned."
    ],
    penalty: "Award of 'F' (Fail due to Attendance Shortage) grade and direct debarment from T3 exams. The course must be repeated.",
    officialRef: "JUIT Academic Ordinance, Section 4.2"
  },
  {
    id: "att-medical-concession",
    title: "Medical & Official Duty Leave Concession (Up to 10%)",
    category: "attendance",
    badge: "Medical Waiver",
    severity: "warning",
    icon: "🏥",
    summary: "A relaxation of attendance up to a maximum of 10% (lowering the threshold from 80% to 70%) may be considered strictly for certified hospitalization or official university representations.",
    keyPoints: [
      "Applicable only for genuine hospitalization or representing JUIT in sanctioned national competitions, hackathons, or sports meets.",
      "Medical certificates from outside doctors must be verified and counter-signed by the JUIT Resident Medical Officer (Dispensary).",
      "Leave application with all supporting hospital documents must be submitted to the Academic Office within 7 working days of returning to campus.",
      "Even with approved medical leave, attendance below 70% cannot be relaxed under any circumstances."
    ],
    penalty: "Rejection of medical waiver if submitted late or unverified, leading to exam debarment.",
    officialRef: "JUIT Academic Regulations, Section 4.5"
  },

  // ─── 📊 EXAMINATIONS & GRADING ─────────────────────────────────────────────
  {
    id: "exam-evaluation-scheme",
    title: "3-Tier Examination & Evaluation Structure",
    category: "exams",
    badge: "Evaluation Scheme",
    severity: "info",
    icon: "📊",
    summary: "Courses are evaluated through continuous assessments and three tiered examinations totaling 100 marks.",
    keyPoints: [
      "Test-1 (T1): 15 Marks (1 Hour duration, held mid-semester).",
      "Test-2 (T2): 25 Marks (1.5 Hours duration, held after 8-9 weeks of teaching).",
      "Test-3 (T3 - End Semester Exam): 35 Marks (2 Hours comprehensive examination).",
      "Teacher Assessment (TA): 25 Marks (Comprising quizzes, assignments, tutorial performance, and attendance).",
      "Lab Courses: Continuous lab evaluation (60%) + Lab exam & viva voce (40%)."
    ],
    officialRef: "JUIT Scheme of Evaluation"
  },
  {
    id: "exam-grading-promotion",
    title: "10-Point Grading System & Academic Promotion",
    category: "exams",
    badge: "Grading Criteria",
    severity: "warning",
    icon: "🎓",
    summary: "Academic performance is awarded on a 10-point letter grade scale with specific minimum CGPA thresholds for promotion.",
    keyPoints: [
      "Grade Scale: A+ (10), A (9), B+ (8), B (7), C+ (6), C (5), D (4), F (0 - Fail).",
      "Minimum passing grade in any theory course is 'D' grade.",
      "End of 1st Year: Minimum CGPA of 4.5 is required to be promoted to the 3rd semester (2nd year).",
      "Minimum CGPA for degree award: 5.0 at the end of the 8th semester.",
      "Backlogs: Courses with 'F' grade must be cleared in Supplementary Examinations or re-registered during the Summer Semester."
    ],
    penalty: "Students falling below 4.5 CGPA at the end of 1st year are placed on Academic Probation or given a Year Back.",
    officialRef: "JUIT Examination Ordinance, Section 6"
  },
  {
    id: "exam-umc-malpractice",
    title: "Unfair Means (UMC) & Cheating in Examinations",
    category: "exams",
    badge: "Zero Tolerance",
    severity: "critical",
    icon: "🚫",
    summary: "Possession of unauthorized material, mobile phones, smartwatches, or cheating in T1, T2, or T3 examinations is treated as a major offense.",
    keyPoints: [
      "Mobile phones, smartwatches, bluetooth devices, and notes are strictly banned inside examination halls.",
      "Talking, peeking, exchanging question papers, or writing on desks constitutes an Unfair Means Case (UMC).",
      "The invigilator immediately confiscates the answer booklet and submits a formal report to the Controller of Examinations.",
      "The student must appear before the university UMC Committee for a formal hearing."
    ],
    penalty: "Cancellation of the entire semester examination papers, award of 'F' in all registered subjects, or semester rustication.",
    officialRef: "JUIT Ordinance on Unfair Means in Examinations"
  },

  // ─── 🏢 HOSTEL & RESIDENTIAL REGULATIONS ──────────────────────────────────
  {
    id: "hostel-curfew-timings",
    title: "Campus Gate & Hostel In-Time Curfew",
    category: "hostel",
    badge: "Curfew Timings",
    severity: "critical",
    icon: "⏰",
    summary: "Strict in-time curfews are enforced daily for the safety and security of all campus residents.",
    keyPoints: [
      "Main Campus Gate Closing: 09:30 PM sharp for all students.",
      "Hostel In-Time: 10:00 PM (Wardens / caretakers take mandatory daily biometric or roll-call attendance).",
      "Library Late Hours: Central Library (LRC) remains open until 12:00 Midnight; students studying in the LRC must return to hostels immediately after closing with security sign-out.",
      "Movement between hostel blocks after 10:30 PM is strictly disallowed."
    ],
    penalty: "Fines for late entry, parental notification, and potential cancellation of hostel seat upon repeated infractions.",
    officialRef: "Hostel Rule Book, Rule 3.1"
  },
  {
    id: "hostel-outstation-leave",
    title: "Night Outstation Leave & Gate Pass Protocol",
    category: "hostel",
    badge: "Gate Pass",
    severity: "warning",
    icon: "🚪",
    summary: "No student may leave the campus overnight or travel outstation without prior approved leave and parental authorization.",
    keyPoints: [
      "Leave must be submitted on the student portal / Warden Office at least 24 hours prior to travel.",
      "Written / SMS confirmation from the student's registered parents or legal guardian is mandatory.",
      "Digital or physical Gate Pass must be shown to security at the Main Gate before exit.",
      "Returning students must sign back in at the security post upon arrival."
    ],
    penalty: "Unauthorized overnight absence is treated as severe indiscipline with formal parental summoning and disciplinary fine.",
    officialRef: "JUIT Hostel Rules, Section 5"
  },
  {
    id: "hostel-prohibited-appliances",
    title: "Prohibition of High-Wattage Electrical Appliances",
    category: "hostel",
    badge: "Fire Safety",
    severity: "warning",
    icon: "⚡",
    summary: "To prevent electrical fire hazards in hostel rooms, high-power heating elements and cooking appliances are strictly prohibited.",
    keyPoints: [
      "Banned items: Electric kettles, room heaters, immersion heating rods, induction stoves, toasters, and electric irons.",
      "Permitted items: Laptops, mobile chargers, study lamps, and low-power personal grooming gadgets.",
      "Hostel management conducts periodic unannounced room inspections for safety compliance."
    ],
    penalty: "Immediate confiscation of the appliance without return, plus a fine of ₹2,000 to ₹5,000 per violation.",
    officialRef: "JUIT Fire Safety & Hostel Rules"
  },
  {
    id: "hostel-substance-ban",
    title: "Complete Ban on Alcohol, Drugs, Smoking & Intoxicants",
    category: "hostel",
    badge: "Zero Tolerance",
    severity: "critical",
    icon: "🚭",
    summary: "JUIT is a strictly alcohol-free, smoke-free, and drug-free university. Possession or consumption on campus is a criminal violation.",
    keyPoints: [
      "Possession, consumption, or distribution of alcoholic beverages, cigarettes, vapes, e-cigarettes, or any narcotic substances is strictly forbidden.",
      "Applies to hostel rooms, campus premises, parking areas, and adjacent university roads.",
      "Security guards and wardens conduct breathalyzer tests and narcotic checks upon suspicion.",
      "Accomplices and students present during consumption face equal liability."
    ],
    penalty: "Immediate suspension from university, heavy financial penalties, permanent expulsion from hostels, and reporting to Himachal Pradesh Police.",
    officialRef: "JUIT Code of Conduct, Rule 8"
  },

  // ─── 🛡️ ANTI-RAGGING REGULATIONS ──────────────────────────────────────────
  {
    id: "ragging-zero-tolerance",
    title: "Supreme Court & UGC Anti-Ragging Mandate",
    category: "anti_ragging",
    badge: "Zero Tolerance",
    severity: "critical",
    icon: "🛡️",
    summary: "Ragging in any form is a non-bailable criminal offense. JUIT strictly follows the directives of the Hon'ble Supreme Court of India.",
    keyPoints: [
      "Ragging includes any conduct (verbal, written, physical, or psychological) that creates intimidation, embarrassment, humiliation, or distress.",
      "Covers teasing, asking juniors to perform menial tasks, asking for passwords, online cyber-bullying, or physical harassment.",
      "Both victims and witnesses have a duty to report incidents immediately.",
      "Anti-Ragging Flying Squads patrol all academic blocks, hostels, and mess halls round the clock."
    ],
    penalty: "Immediate suspension, registration of FIR with Police, cancellation of admission, and permanent rustication without appeal.",
    officialRef: "UGC Regulation No. F. 1-16/2007 (CPP-II) & HP Ragging Prohibition Act"
  },

  // ─── 👔 CONDUCT & DRESS CODE ──────────────────────────────────────────────
  {
    id: "discipline-id-card",
    title: "Mandatory RFID ID Card Display",
    category: "discipline",
    badge: "Identity Policy",
    severity: "info",
    icon: "🪪",
    summary: "All students must wear or carry their official university RFID Smart ID Card at all times on campus premises.",
    keyPoints: [
      "Required for entry into Academic Blocks, Central Library, Examination Halls, and Annapurna Mess.",
      "ID cards are non-transferable; lending an ID card to another student or outsider is an offense.",
      "Lost ID cards must be reported immediately to the Academic Office and replaced upon payment of the duplicate card fee."
    ],
    penalty: "Denial of campus gate entry, library access, or examination seating without a valid ID card.",
    officialRef: "JUIT Security & Identity Guidelines"
  },
  {
    id: "discipline-dress-code",
    title: "Academic Dress Code & Decorum",
    category: "discipline",
    badge: "Dress Code",
    severity: "info",
    icon: "👔",
    summary: "Students are expected to dress respectfully in professional, semi-formal, or decent casual attire within academic buildings.",
    keyPoints: [
      "Permitted: Shirts, t-shirts with sleeves, jeans, trousers, salwar suits, kurtas, formal footwear, sneakers.",
      "Prohibited in Academic Blocks/Labs: Shorts, bermudas, singlets, flip-flops, bathroom slippers, or clothing with offensive text/graphics.",
      "Laboratory Attire: White cotton lab coats and closed-toe leather shoes are strictly mandatory in Chemistry, Biotech, and Workshop labs."
    ],
    penalty: "Faculty or lab instructors may deny entry to lectures or laboratory sessions for dress code violations.",
    officialRef: "JUIT Campus Decorum Guidelines"
  },
  {
    id: "discipline-vehicles",
    title: "Motor Vehicle Regulations on Campus",
    category: "discipline",
    badge: "Campus Traffic",
    severity: "warning",
    icon: "🚗",
    summary: "Strict vehicle restrictions exist due to the hilly terrain and safety of pedestrian students.",
    keyPoints: [
      "First-year students are strictly NOT permitted to bring motorized two-wheelers or four-wheelers to campus.",
      "Senior students must obtain an authorized parking sticker from the Security Office and register vehicle papers.",
      "Campus speed limit is strictly 20 km/h.",
      "Parking is allowed ONLY in marked parking bays on Upper Terrace or Lower Terrace; parking along road curves is banned."
    ],
    penalty: "Wheel-clamping, fine of ₹1,000, and permanent revocation of campus vehicle entry pass.",
    officialRef: "JUIT Traffic Safety Guidelines"
  },

  // ─── 💻 IT & WI-FI POLICY ──────────────────────────────────────────────────
  {
    id: "it-acceptable-usage",
    title: "Campus Wi-Fi & Cyber Security Policy",
    category: "it_policy",
    badge: "IT Guidelines",
    severity: "warning",
    icon: "💻",
    summary: "JUIT network infrastructure, high-speed Wi-Fi, and computer lab facilities must be used responsibly for educational purposes.",
    keyPoints: [
      "Accessing pirated torrenting networks, dark web sites, gambling, or illicit content is blocked and monitored.",
      "Network spoofing, unauthorized vulnerability scanning, packet sniffing, or crypto-mining on campus servers is strictly prohibited.",
      "Each student's login credentials are tied directly to their roll number; students are legally responsible for all traffic from their account."
    ],
    penalty: "Immediate permanent suspension of Wi-Fi access, referral to Proctorial Board, and reporting under the Information Technology Act for cyber offenses.",
    officialRef: "JUIT IT & Network Policy"
  }
];
