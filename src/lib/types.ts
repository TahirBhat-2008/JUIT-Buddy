export interface MessageImage {
  mimeType: string;
  /** base64 payload WITHOUT the data: URL prefix */
  data: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  /** Optional inline images attached to the message (Gemini vision) */
  images?: MessageImage[];
}

export interface ChatRequest {
  messages: { role: string; content: string }[];
}

export interface ChatResponse {
  reply: string;
  error?: string;
}

// ── Syllabus Detail Types ──────────────────────────────────────────────────

export interface BookEntry {
  author: string;
  title: string;
  edition?: string;
  publisher?: string;
}

export interface OnlineResource {
  title: string;
  url?: string;
}

export interface CourseTopic {
  name: string;
  subtopics?: string[];
}

export interface CourseUnit {
  number: number;
  title: string;
  hours: number;
  topics: CourseTopic[];
}

export interface CourseOutcome {
  id: string;        // e.g. "CO1"
  description: string;
}

export interface EvaluationRow {
  component: string; // e.g. "Mid Semester Exam"
  weightage: number; // percentage, 0-100
}

export interface CourseDetail {
  code: string;                   // e.g. "CS-301"
  title: string;
  credits: { L: number; T: number; P: number };
  semester: number;
  branch: string;                 // e.g. "CSE / IT"
  prerequisites: string[];
  objectives: string[];
  units: CourseUnit[];
  outcomes: CourseOutcome[];
  books: {
    textbooks: BookEntry[];
    references: BookEntry[];
    online: OnlineResource[];
  };
  evaluation: EvaluationRow[];
  meta: {
    category: string;             // BSC / PCC / PEC …
    difficulty?: "Easy" | "Medium" | "Hard";
    lastUpdated: string;          // ISO date string
    faculty?: string;
  };
  /** Optional direct Moodle course URL. Falls back to JUIT Moodle home if omitted. */
  moodleUrl?: string;
}
