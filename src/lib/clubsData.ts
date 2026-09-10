export type ClubCategory =
  | "all"
  | "technical"
  | "entrepreneurship"
  | "sports"
  | "social"
  | "cultural"
  | "literary"
  | "media";

export interface JuitClub {
  id: string;
  name: string;
  shortName: string;
  acronym?: string;
  category: ClubCategory;
  categoryLabel: string;
  tagline: string;
  icon: string;
  websiteUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  instagram?: string;
  instaUrl?: string;
  email?: string;
  description: string;
  flagshipEvents: string[];
  coreActivities: string[];
  facultyCoordinator?: string;
  studentLeads?: string;
  recruitmentInfo: string;
  accentColor: string;
  tags: string[];
}

export const JYC_OVERVIEW = {
  name: "Jaypee Youth Club (JYC)",
  role: "Apex Governing Student Body of JUIT",
  description:
    "JYC is the central umbrella student council at JUIT Waknaghat that coordinates and supervises all student committees, technical chapters, cultural societies, sports tournaments, and annual mega fests.",
  deanWelfare: "Prof. (Dr.) R.S. Chauhan (Dean of Student Welfare)",
  websiteUrl: "https://jyc.co.in",
  majorFests: [
    {
      name: "Le Fiestus",
      type: "Annual Techno-Cultural Fest",
      desc: "North India's premier 3-day cultural extravaganza with celebrity concerts, star DJ nights, runway vogue, and battle of the bands.",
    },
    {
      name: "Murious",
      type: "Annual Technical & Gaming Fest",
      desc: "JUIT's flagship technical fest featuring national 24-hour hackathons, robotics arena, LAN gaming (Valorant/BGMI), and technical conclaves.",
    },
    {
      name: "Diksha",
      type: "Freshers Welcome Fiesta",
      desc: "The grand induction gala welcoming 1st-year students with Mr. & Ms. Freshers pageant, musical performances, and drama skits.",
    },
    {
      name: "Altitude / Parakram",
      type: "Annual Sports Tournament",
      desc: "High-intensity inter-collegiate and intra-university tournament across cricket, football, basketball, badminton, volleyball, and athletics.",
    },
  ],
};

export const JUIT_CLUBS: JuitClub[] = [
  // ── 1. ACM JUIT STUDENT CHAPTER ──
  {
    id: "acm",
    name: "ACM JUIT Student Chapter",
    shortName: "JUIT ACM",
    acronym: "ACM",
    category: "technical",
    categoryLabel: "Technical & Computing",
    tagline: "Advancing Computing as a Science & Profession",
    icon: "💻",
    websiteUrl: "https://juit.acm.org",
    githubUrl: "https://github.com/acm-juit",
    linkedinUrl: "https://www.linkedin.com/company/acm-juit-student-chapter/",
    email: "acm@juit.ac.in",
    description:
      "The official student chapter of the global Association for Computing Machinery (ACM) at JUIT. One of the most active computing bodies on campus, conducting regular competitive programming contests, open-source sprints, web development cohorts, and technical workshops.",
    flagshipEvents: [
      "Qriosity (Annual Tech Quiz)",
      "CodeWithCoffee (CP Contest)",
      "Hour of Code",
      "ACM Winter Hackathon",
      "DSA Bootcamps",
    ],
    coreActivities: [
      "Competitive Programming (Codeforces/LeetCode)",
      "Web & Mobile App Development",
      "Open Source Contributions & Git",
      "Peer-to-Peer Code Reviews",
    ],
    facultyCoordinator: "Dr. Pradeep Kumar Gupta (CSE/IT Dept)",
    recruitmentInfo:
      "Annual inductions held in August–September for freshers and sophomores across Coding, Web Dev, Design, PR & Event Management wings.",
    accentColor: "from-blue-600 to-cyan-600",
    tags: ["acm", "coding", "dsa", "hackathon", "cp", "qriosity", "computer science", "developer"],
  },

  // ── 2. IEEE JUIT STUDENT BRANCH ──
  {
    id: "ieee",
    name: "IEEE JUIT Student Branch",
    shortName: "IEEE JUIT",
    acronym: "IEEE SB",
    category: "technical",
    categoryLabel: "Technical & Research",
    tagline: "Inspiring Global Technical Innovation & Research",
    icon: "⚡",
    websiteUrl: "https://ieeejuitsb.in",
    linkedinUrl: "https://www.linkedin.com/company/ieee-juit-student-branch/",
    email: "ieeesb@juit.ac.in",
    description:
      "The premier international technical professional branch at JUIT affiliated with IEEE Delhi Section. Focuses on electronics, embedded systems, IoT, robotics, artificial intelligence, and IEEE research paper publishing.",
    flagshipEvents: [
      "Electrify (Hardware & IoT)",
      "IEEE Day Celebrations",
      "Paper Presentation Conclave",
      "Robotics Line-Follower Challenge",
    ],
    coreActivities: [
      "Robotics & Embedded Hardware",
      "Research Paper Writing & LaTeX",
      "Machine Learning & AI Seminars",
      "Signal Processing & Circuit Design",
    ],
    facultyCoordinator: "Dr. Salman Raju Dey (ECE Dept)",
    recruitmentInfo:
      "Recruitment rounds in autumn semester for Technical, Research, Web, Graphics, and Logistics domains.",
    accentColor: "from-indigo-600 to-blue-700",
    tags: ["ieee", "robotics", "iot", "research", "ece", "hardware", "circuits", "delhi section"],
  },

  // ── 3. TIEDC INCUBATOR ──
  {
    id: "tiedc",
    name: "Technology Incubation & Entrepreneurship Development Cell",
    shortName: "TIEDC JUIT",
    acronym: "TIEDC",
    category: "entrepreneurship",
    categoryLabel: "Startups & E-Cell",
    tagline: "Fostering Innovation, Ideation & Student Startups",
    icon: "🚀",
    websiteUrl: "https://tiedc.in/",
    linkedinUrl: "https://www.linkedin.com/company/tiedc-juit/",
    instagram: "@tiedcjuit",
    instaUrl: "https://www.instagram.com/tiedcjuit/",
    email: "tiedc@juit.ac.in",
    description:
      "JUIT's official startup incubator supported by the Department of Industries, Himachal Pradesh under the Chief Minister's Startup Scheme. Provides seed funding up to ₹30 Lakhs, legal patent assistance, co-working space, and mentorship.",
    flagshipEvents: [
      "E-Summit JUIT",
      "Ideathon (Pitch Your Startup)",
      "Startup Conclave",
      "Angel Investors & Founders Meet",
    ],
    coreActivities: [
      "H.P. Govt CM Startup Scheme Funding",
      "IPR & Patent Filing Guidance",
      "Pitch Deck Crafting & Business Modeling",
      "Incubation Office Workspace Allocation",
    ],
    facultyCoordinator: "Prof. (Dr.) Ashish Kumar (Civil Dept)",
    recruitmentInfo:
      "Recruits student executives for Corporate Relations, Startup Outreach, Media, and Incubation Operations in September.",
    accentColor: "from-amber-600 to-orange-600",
    tags: ["tiedc", "startup", "entrepreneurship", "incubator", "funding", "e-summit", "patents", "business"],
  },

  // ── 4. SYNAPSE BIOTECH & LIFE SCIENCES SOCIETY ──
  {
    id: "synapse",
    name: "Synapse — The Biotech & Life Sciences Society",
    shortName: "Synapse JUIT",
    acronym: "Synapse",
    category: "technical",
    categoryLabel: "Biotechnology & Bioinformatics",
    tagline: "Decoding Genetics, Bioinformatics & Bio-Innovation",
    icon: "🧬",
    websiteUrl: "https://www.juit.ac.in/department/biotechnology-bioinformatics",
    instagram: "@synapse_club_juit",
    instaUrl: "https://www.instagram.com/synapse_club_juit/",
    email: "synapse@juit.ac.in",
    description:
      "The premier academic society for Biotechnology and Bioinformatics students at JUIT. Organizes bio-hackathons, molecular modeling sessions, pharmaceutical conclaves, and research seminars with leading bio-scientists.",
    flagshipEvents: [
      "Bio-Excellence Symposium",
      "Genomics Hackathon",
      "Drug Design Workshop",
      "National Science Day Quiz",
    ],
    coreActivities: [
      "In-Silico Drug Designing & Molecular Docking",
      "NGS Data Analysis & Python for Biology",
      "CRISPR & Gene Editing Seminars",
      "Industrial Visits to Pharma Units",
    ],
    facultyCoordinator: "Prof. (Dr.) Sudhir Kumar (HoD Biotech & BI)",
    recruitmentInfo:
      "Recruits BT and BI students annually across Technical, Event Management, and Editorial teams.",
    accentColor: "from-emerald-600 to-teal-600",
    tags: ["synapse", "biotech", "bioinformatics", "dna", "genetics", "drug design", "science", "biology"],
  },

  // ── 5. JUIT SPORTS CLUB & COUNCIL ──
  {
    id: "sports-council",
    name: "JUIT Sports Club & Council",
    shortName: "Sports Council",
    acronym: "Sports Council",
    category: "sports",
    categoryLabel: "Sports & Athletics",
    tagline: "Discipline, Endurance, Team Spirit & Glory",
    icon: "🏆",
    websiteUrl: "https://jyc.co.in",
    instagram: "@juit.sportsclub",
    instaUrl: "https://www.instagram.com/juit.sportsclub/",
    email: "sports@juit.ac.in",
    description:
      "Oversees all competitive and recreational sports at JUIT Waknaghat. Manages the basketball court, volleyball ground, badminton hall, floodlit football ground, table tennis, cricket nets, gym, and esports tournaments.",
    flagshipEvents: [
      "Altitude / Parakram (Inter-College Sports Fest)",
      "Inter-Year Premier League (Cricket & Football)",
      "Annual Sports Day Athletics",
      "Campus BGMI & Valorant Esports Cup",
    ],
    coreActivities: [
      "University Teams: Cricket, Football, Basketball, Volleyball",
      "Badminton & Table Tennis Championships",
      "Weightlifting & Gymnasium Guidance",
      "Match Officiating, Refereeing & Logistics",
    ],
    facultyCoordinator: "Dr. Munish Sood (Sports In-Charge, JUIT)",
    recruitmentInfo:
      "Trials held at sports complex and outdoor grounds for university teams in early semester.",
    accentColor: "from-amber-600 to-yellow-600",
    tags: ["sports", "cricket", "football", "basketball", "badminton", "altitude", "gym", "athletics", "jyc"],
  },

  // ── 6. ROTARACT CLUB OF WAKNAGHAT ──
  {
    id: "rotaract",
    name: "Rotaract Club of Waknaghat (RID 3080)",
    shortName: "Rotaract Waknaghat",
    acronym: "Rotaract",
    category: "social",
    categoryLabel: "Youth Leadership & Global Service",
    tagline: "Fellowship Through Service & Youth Leadership",
    icon: "🎖️",
    websiteUrl: "https://rotary3080.org/",
    instagram: "@racw3080",
    instaUrl: "https://www.instagram.com/racw3080/",
    email: "rotaract@juit.ac.in",
    description:
      "Chartered under Rotary International District 3080. A global youth leadership and humanitarian organization empowering young changemakers through community health camps, women empowerment workshops, and international youth exchange.",
    flagshipEvents: [
      "Mahadan (Mega Blood Donation Drive)",
      "Project Padhai (Educational Outreach)",
      "District Rotaract Youth Leadership Conclave",
      "Women Hygiene & Health Drive",
    ],
    coreActivities: [
      "Community Health & Eye Checkup Camps",
      "Literacy & Menstrual Hygiene Drives",
      "Youth Leadership Training (RYLA)",
      "Rotary District Conferences across North India",
    ],
    facultyCoordinator: "Dr. Hemant Sood (Faculty Advisor)",
    recruitmentInfo:
      "Membership drives conducted in August for Board of Directors and general club members.",
    accentColor: "from-rose-600 to-pink-700",
    tags: ["rotaract", "rotary", "service", "district 3080", "leadership", "blood donation", "community"],
  },

  // ── 7. NATIONAL SERVICE SCHEME (NSS JUIT) ──
  {
    id: "nss",
    name: "National Service Scheme (NSS JUIT Chapter)",
    shortName: "NSS JUIT",
    acronym: "NSS",
    category: "social",
    categoryLabel: "National Service & Nation Building",
    tagline: "Not Me But You — Dedicated to Community Service",
    icon: "🇮🇳",
    websiteUrl: "https://nss.gov.in",
    instagram: "@nssjuit",
    instaUrl: "https://www.instagram.com/nssjuit/",
    email: "nss@juit.ac.in",
    description:
      "The official unit of the Ministry of Youth Affairs and Sports, Govt of India at JUIT. Engages university youth in constructive national service, disaster relief training, Swachh Bharat Abhiyan, and rural development camps.",
    flagshipEvents: [
      "7-Day Special Rural Camp in Adopted Village",
      "Swachh Bharat Summer Internship",
      "National Youth Day Celebration",
      "Disaster Management Drill with NDRF/SDRF",
    ],
    coreActivities: [
      "Adopted Village Upliftment (Cleanliness & Water Harvesting)",
      "Blood Donation & Medical Relief Support",
      "National Flag Hoisting on Independence & Republic Day",
      "National Integration Camps (NIC)",
    ],
    facultyCoordinator: "Dr. Amit Srivastava (NSS Program Coordinator)",
    recruitmentInfo:
      "Enrollment starts at semester commencement. NSS volunteers earn official Govt. of India certification upon completion of 240 service hours.",
    accentColor: "from-blue-700 to-indigo-800",
    tags: ["nss", "service", "swachh bharat", "youth affairs", "village", "relief", "government", "patriotism"],
  },
];
