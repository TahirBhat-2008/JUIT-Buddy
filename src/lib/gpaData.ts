export type JuitGrade = "A+" | "A" | "B+" | "B" | "C+" | "C" | "D" | "F";

export interface GradeDefinition {
  grade: JuitGrade;
  points: number;
  description: string;
  badgeColor: string;
  minPercentageHint?: string;
}

export const JUIT_GRADES: GradeDefinition[] = [
  { grade: "A+", points: 10, description: "Outstanding", badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700" },
  { grade: "A",  points: 9,  description: "Excellent",   badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300 dark:border-blue-700" },
  { grade: "B+", points: 8,  description: "Very Good",   badgeColor: "bg-teal-100 text-teal-800 dark:bg-teal-950/80 dark:text-teal-300 border-teal-300 dark:border-teal-700" },
  { grade: "B",  points: 7,  description: "Good",        badgeColor: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700" },
  { grade: "C+", points: 6,  description: "Above Average", badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-700" },
  { grade: "C",  points: 5,  description: "Average",     badgeColor: "bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300 border-orange-300 dark:border-orange-700" },
  { grade: "D",  points: 4,  description: "Pass (Min Passing)", badgeColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/80 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700" },
  { grade: "F",  points: 0,  description: "Fail / Backlog", badgeColor: "bg-red-100 text-red-800 dark:bg-red-950/80 dark:text-red-300 border-red-300 dark:border-red-700" },
];

export interface CourseGradeEntry {
  id: string;
  name: string;
  credits: number;
  grade: JuitGrade;
}

export interface SemesterPreset {
  semNumber: number;
  label: string;
  branch: string;
  courses: Array<{ name: string; credits: number; defaultGrade?: JuitGrade }>;
}

// B.Tech CSE Official Curricula mapped from JUIT Academic Council (2026 Batch Onwards)
export const JUIT_CSE_SEMESTERS: SemesterPreset[] = [
  {
    semNumber: 1,
    label: "Semester 1",
    branch: "B.Tech CSE",
    courses: [
      { name: "Mathematics-I", credits: 4, defaultGrade: "A" },
      { name: "Physics-I", credits: 4, defaultGrade: "B+" },
      { name: "Physics Lab-I", credits: 1, defaultGrade: "A" },
      { name: "Software Development Fundamentals-I", credits: 4, defaultGrade: "A+" },
      { name: "SDF Lab-I", credits: 1, defaultGrade: "A+" },
      { name: "Basic Electronics", credits: 4, defaultGrade: "B+" },
      { name: "Basic Electronics Lab", credits: 1, defaultGrade: "A" },
      { name: "English", credits: 1.5, defaultGrade: "A" },
      { name: "Workshop", credits: 2, defaultGrade: "A" },
    ],
  },
  {
    semNumber: 2,
    label: "Semester 2",
    branch: "B.Tech CSE",
    courses: [
      { name: "Mathematics-II", credits: 4, defaultGrade: "A" },
      { name: "Physics-II", credits: 4, defaultGrade: "B+" },
      { name: "Physics Lab-II", credits: 1, defaultGrade: "A" },
      { name: "Software Development Fundamentals-II", credits: 4, defaultGrade: "A" },
      { name: "SDF Lab-II", credits: 1, defaultGrade: "A+" },
      { name: "Life Skills & Communication Lab", credits: 1, defaultGrade: "A" },
      { name: "Engineering Drawing & Design", credits: 1.5, defaultGrade: "B+" },
      { name: "Universal Human Values (UHV)", credits: 3, defaultGrade: "A" },
    ],
  },
  {
    semNumber: 3,
    label: "Semester 3",
    branch: "B.Tech CSE",
    courses: [
      { name: "Math Foundations for AI & Data Science", credits: 3, defaultGrade: "A" },
      { name: "Theory of Computation", credits: 3, defaultGrade: "B+" },
      { name: "Data Structures", credits: 4, defaultGrade: "A" },
      { name: "Data Structures Lab", credits: 1, defaultGrade: "A+" },
      { name: "Database Management Systems (DBMS)", credits: 3, defaultGrade: "A" },
      { name: "DBMS Lab", credits: 1, defaultGrade: "A+" },
      { name: "UNIX Programming Lab", credits: 2, defaultGrade: "A" },
      { name: "Object Oriented Programming (Java)", credits: 1, defaultGrade: "A" },
      { name: "Economics", credits: 3, defaultGrade: "B+" },
      { name: "Summer Training-I", credits: 2, defaultGrade: "A+" },
      { name: "Competitive Programming-I", credits: 1, defaultGrade: "A" },
    ],
  },
  {
    semNumber: 4,
    label: "Semester 4",
    branch: "B.Tech CSE",
    courses: [
      { name: "HSS Elective - 1", credits: 3, defaultGrade: "A" },
      { name: "Digital Systems & Computer Organisation", credits: 4, defaultGrade: "B+" },
      { name: "DSCO Lab", credits: 1, defaultGrade: "A" },
      { name: "Design & Analysis of Algorithms", credits: 3, defaultGrade: "A" },
      { name: "Algorithms Lab", credits: 1, defaultGrade: "A+" },
      { name: "Artificial Intelligence & ML", credits: 3, defaultGrade: "A" },
      { name: "AI & ML Lab", credits: 1, defaultGrade: "A+" },
      { name: "Software Engineering", credits: 2, defaultGrade: "B+" },
      { name: "Competitive Programming-II", credits: 1, defaultGrade: "A" },
      { name: "Discipline Elective - 1 (+ Lab)", credits: 3, defaultGrade: "A" },
    ],
  },
  {
    semNumber: 5,
    label: "Semester 5",
    branch: "B.Tech CSE",
    courses: [
      { name: "Operating Systems", credits: 3, defaultGrade: "A" },
      { name: "Operating Systems Lab", credits: 1, defaultGrade: "A+" },
      { name: "Computer Networks", credits: 4, defaultGrade: "A" },
      { name: "Computer Networks Lab", credits: 1, defaultGrade: "A+" },
      { name: "Full Stack Development Lab", credits: 1, defaultGrade: "A+" },
      { name: "Discipline Elective - 2 (+ Lab)", credits: 3, defaultGrade: "B+" },
      { name: "Discipline Elective - 3 (+ Lab)", credits: 3, defaultGrade: "A" },
      { name: "Science Elective", credits: 3, defaultGrade: "A" },
      { name: "Summer Training-II", credits: 2, defaultGrade: "A+" },
      { name: "Competitive Programming-III", credits: 1, defaultGrade: "A" },
      { name: "Logical & Quantitative Tech-I", credits: 2, defaultGrade: "A" },
    ],
  },
  {
    semNumber: 6,
    label: "Semester 6",
    branch: "B.Tech CSE",
    courses: [
      { name: "Web Technology", credits: 3, defaultGrade: "A" },
      { name: "Web Technology Lab", credits: 1, defaultGrade: "A+" },
      { name: "Advanced DSA", credits: 3, defaultGrade: "A" },
      { name: "Advanced DSA Lab", credits: 1, defaultGrade: "A+" },
      { name: "Cloud Computing / Info Security", credits: 3, defaultGrade: "A" },
      { name: "Discipline Elective - 4", credits: 3, defaultGrade: "B+" },
      { name: "Discipline Elective - 5", credits: 3, defaultGrade: "A" },
      { name: "Open Elective - 1", credits: 2, defaultGrade: "A" },
      { name: "Soft Skills for Employability", credits: 1, defaultGrade: "A" },
      { name: "Minor Project", credits: 2, defaultGrade: "A+" },
      { name: "Logical & Quantitative Tech-II", credits: 2, defaultGrade: "A" },
    ],
  },
  {
    semNumber: 7,
    label: "Semester 7",
    branch: "B.Tech CSE",
    courses: [
      { name: "Discipline Elective - 6", credits: 3, defaultGrade: "A" },
      { name: "Open Elective - 2", credits: 3, defaultGrade: "A" },
      { name: "Major Project Part - 1", credits: 4, defaultGrade: "A+" },
      { name: "Summer Training - III", credits: 4, defaultGrade: "A+" },
    ],
  },
  {
    semNumber: 8,
    label: "Semester 8",
    branch: "B.Tech CSE",
    courses: [
      { name: "Discipline Elective - 7", credits: 3, defaultGrade: "A" },
      { name: "Open Elective - 3", credits: 3, defaultGrade: "A" },
      { name: "Major Project Part - 2", credits: 8, defaultGrade: "A+" },
    ],
  },
];

// Calculation Utilities
export function getGradePoint(grade: JuitGrade): number {
  const match = JUIT_GRADES.find((g) => g.grade === grade);
  return match ? match.points : 0;
}

export function calculateSgpa(courses: Array<{ credits: number; grade: JuitGrade }>): {
  sgpa: number;
  totalCredits: number;
  earnedPoints: number;
  equivalentPercentage: number;
  hasBacklog: boolean;
} {
  let totalCredits = 0;
  let earnedPoints = 0;
  let hasBacklog = false;

  for (const course of courses) {
    if (course.credits > 0) {
      const pt = getGradePoint(course.grade);
      totalCredits += course.credits;
      earnedPoints += course.credits * pt;
      if (course.grade === "F") {
        hasBacklog = true;
      }
    }
  }

  const sgpa = totalCredits > 0 ? Number((earnedPoints / totalCredits).toFixed(2)) : 0;
  const equivalentPercentage = Number((sgpa * 10).toFixed(1));

  return {
    sgpa,
    totalCredits,
    earnedPoints: Number(earnedPoints.toFixed(2)),
    equivalentPercentage,
    hasBacklog,
  };
}

export function calculateCumulativeCgpa(
  prevCgpa: number,
  prevCredits: number,
  currSgpa: number,
  currCredits: number
): {
  newCgpa: number;
  totalCredits: number;
  diff: number;
} {
  const totalCredits = prevCredits + currCredits;
  if (totalCredits <= 0) {
    return { newCgpa: currSgpa, totalCredits: currCredits, diff: 0 };
  }

  const totalPoints = prevCgpa * prevCredits + currSgpa * currCredits;
  const newCgpa = Number((totalPoints / totalCredits).toFixed(2));
  const diff = Number((newCgpa - prevCgpa).toFixed(2));

  return {
    newCgpa,
    totalCredits,
    diff,
  };
}

export function calculateRequiredSgpa(
  currentCgpa: number,
  completedCredits: number,
  targetCgpa: number,
  upcomingCredits: number
): {
  requiredSgpa: number;
  isPossible: boolean;
  message: string;
  status: "already_achieved" | "achievable" | "impossible";
} {
  if (upcomingCredits <= 0) {
    return {
      requiredSgpa: 0,
      isPossible: false,
      message: "Please enter upcoming semester credits (e.g. 20–24 credits).",
      status: "impossible",
    };
  }

  const totalFutureCredits = completedCredits + upcomingCredits;
  const targetTotalPoints = targetCgpa * totalFutureCredits;
  const currentTotalPoints = currentCgpa * completedCredits;
  const neededPoints = targetTotalPoints - currentTotalPoints;

  const requiredSgpa = Number((neededPoints / upcomingCredits).toFixed(2));

  if (targetCgpa <= currentCgpa) {
    return {
      requiredSgpa,
      isPossible: true,
      message: `You already meet or exceed this target! Keep SGPA above ${requiredSgpa > 0 ? requiredSgpa : 0.0} to maintain it.`,
      status: "already_achieved",
    };
  }

  if (requiredSgpa > 10.0) {
    return {
      requiredSgpa,
      isPossible: false,
      message: `Mathematically impossible in 1 semester (would need SGPA ${requiredSgpa} > max 10.00). Try spreading your target across 2 or 3 semesters.`,
      status: "impossible",
    };
  }

  return {
    requiredSgpa,
    isPossible: true,
    message: `Achievable! You need an SGPA of ${requiredSgpa} in the upcoming semester.`,
    status: "achievable",
  };
}

export function getAcademicStanding(cgpa: number): {
  label: string;
  statusColor: string;
  detail: string;
} {
  if (cgpa >= 8.5) {
    return {
      label: "🌟 First Class with Distinction",
      statusColor: "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800",
      detail: "Outstanding academic performance. Eligible for institute honors, medals, and top-tier placement eligibility.",
    };
  }
  if (cgpa >= 7.5) {
    return {
      label: "✨ First Class (Above Average)",
      statusColor: "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-800",
      detail: "Very strong profile. Meets placement cutoffs for 95%+ visiting tech and core companies.",
    };
  }
  if (cgpa >= 6.5) {
    return {
      label: "👍 First Division",
      statusColor: "text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 border-teal-300 dark:border-teal-800",
      detail: "Solid performance. Meets standard recruitment eligibility criteria.",
    };
  }
  if (cgpa >= 5.0) {
    return {
      label: "🎓 Second Division (Degree Award Safe)",
      statusColor: "text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800",
      detail: "Meets the minimum criteria (5.0 CGPA) required to be awarded the B.Tech degree at 8th semester.",
    };
  }
  if (cgpa >= 4.5) {
    return {
      label: "⚠️ Minimum 1st Year Promotion Cutoff",
      statusColor: "text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/60 border-orange-300 dark:border-orange-800",
      detail: "Eligible for promotion to 2nd year (minimum 4.5 CGPA required at end of 2nd semester), but aim higher to remain safe.",
    };
  }
  return {
    label: "🚨 Academic Probation / Year Back Risk",
    statusColor: "text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-800",
    detail: "Below JUIT 4.5 CGPA cutoff. Students under 4.5 at end of 1st year are placed on Academic Probation or Year Back.",
  };
}
