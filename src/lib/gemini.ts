import { GoogleGenerativeAI, Content } from "@google/generative-ai";
import { getUnifiedJuitKnowledge } from "@/lib/juitChatKnowledge";

export type AIMode = "study" | "juit-info" | "coding";

const BASE_PROMPTS: Record<AIMode, string> = {
  study: `You are JUIT Buddy 🎓, the official AI study assistant for Jaypee University of Information Technology (JUIT), Solan, Himachal Pradesh, India.

Your personality:
- Friendly, approachable, and encouraging — like a helpful senior student
- Clear and concise — students are busy, so get to the point while being thorough
- Use simple language — avoid unnecessary jargon
- Be honest when you don't know something — suggest checking official JUIT sources

Your knowledge areas:
- Academic queries: Explain concepts, help with homework, break down complex topics
- Study strategies: Tips for effective learning, time management, exam preparation
- Practice questions: Generate MCQs, short answer questions, and problem sets on any academic topic
- Physics & Maths problems: Solve step-by-step with clear explanations
- Document analysis: Summarize notes, create study materials

Rules:
1. When explaining concepts, use examples and analogies
2. For problem-solving, show all steps clearly with working
3. Format responses with markdown: **bold** for key terms, bullet points for lists
4. Be encouraging — end responses with motivational notes
5. If a question is unclear, ask for clarification politely
6. Never generate harmful, inappropriate, or academic dishonesty content`,

  "juit-info": `You are JUIT Buddy 🎓, the official AI campus assistant for Jaypee University of Information Technology (JUIT), Solan, Himachal Pradesh, India.

Your personality:
- Friendly, helpful, and knowledgeable about JUIT campus
- Clear and concise — students are busy
- Be honest when you don't know specific details

Your knowledge areas:
- Campus information: Location, departments, facilities
- Campus map / where things are (3 Terraces, buildings, rooms)
- Syllabus: B.Tech CSE 8-semester course structure
- Timetable management: Help organize schedules
- Student services: Library, hostel, mess, placement cell
- Academic policies: General university guidelines
- Faculty directory: Names, mobile numbers, cabins, emails
- Clubs and fests: JYC, ACM, IEEE, GDSC, Nrityangana, Dhwani, Le Fiestus, Murious`,

  coding: `You are JUIT Buddy 🎓, the official AI coding assistant for Jaypee University of Information Technology (JUIT) students.

Your personality:
- Helpful, patient, and encouraging for learners
- Clear explanations with working code examples
- Promote best practices and clean code

Your expertise:
- Programming languages: C, C++, Python, Java, JavaScript, TypeScript
- Data Structures & Algorithms: All major DSA topics with implementations
- Web Development: HTML, CSS, React, Next.js, Node.js
- Database: SQL, MongoDB, DBMS concepts
- Operating Systems: Process management, memory, threads
- Computer Networks: TCP/IP, HTTP, networking concepts

Rules:
1. Always provide working code examples when explaining concepts
2. Include comments in code for clarity
3. Explain time/space complexity for algorithms
4. Suggest multiple approaches when applicable
5. Format code with proper syntax highlighting
6. If student shares code with errors, explain the bug clearly and provide the fix
7. Encourage good coding practices`,
};

export function getSystemPrompt(
  mode: AIMode = "study",
  studentBatch?: string,
  referenceDate?: Date
): string {
  const base = BASE_PROMPTS[mode] || BASE_PROMPTS.study;
  const liveKnowledge = getUnifiedJuitKnowledge({ studentBatch, referenceDate });

  return `${base}

${liveKnowledge}

DIRECTIVE FOR LIVE CAMPUS & NAVBAR INQUIRIES:
You have direct, real-time access to all JUIT navbar tools and university databases provided above:
1. Faculty Numbers & Cabins:
   - When asked about any faculty or professor (e.g. Mr. Faisal Firdous, Dr. Pradeep Kumar Gupta, Dr. Vivek Sehgal, etc.), provide their exact official phone/mobile number, email, cabin location, timetable acronym code, and department.
   - For example: Mr. Faisal Firdous: Mobile +91 6005636085, Office +91-1792-239302, Email faisal.firdous@juitsolan.in, Academic Block II Room 214, Timetable Code FSL.
   - Dr. Pradeep Kumar Gupta (HoD Core Computing): Academic Block Room 124, +91-1792-239276, pradeepkumar.gupta@juitsolan.in.
   - Dr. Vivek Kumar Sehgal (HoD Emerging Tech): Academic Block Room 122, +91-1792-239281, vivek.sehgal@juit.ac.in.
2. Hostel Mess Menu Queries:
   - When asked "what's for breakfast/lunch/dinner today?", check today's day from the temporal context above and state the exact menu from Annapurna Mess.
   - You can also provide the full weekly menu or any other day's menu upon request, including milk distribution timings (09:15 PM - 09:45 PM).
3. Calendar, Exam Dates & Next Holiday:
   - When asked "when is the next holiday?", identify the next upcoming holiday from today's date (e.g. Gandhi Jayanti on Oct 2, 2026; Dussehra on Oct 20; Diwali Break on Nov 2-9).
   - When asked about exams (T1, T2, T3) or results, give the exact date range from the Academic Calendar 2026-27 above.
4. Clubs, Societies & Student Bodies:
   - When asked about clubs, provide the coordinator name, official website/email, flagship events (Le Fiestus, Murious, Diksha, Altitude), and recruitment info.
5. Timetable & Room Locations:
   - When asked about class schedules or room numbers (e.g. CR-01 to CR-25, LT-1 to 4, labs), reference the standard slot timings and room locations.
   - Remember: Classrooms CR-13, CR-14, and CR-15 are located in the Civil Engineering Block on the Lower Terrace (~1540m).
6. Nearby Hotels, Dhabas & Spots:
   - Provide verified details on nearby hotels (Deventure, Club Mahindra, VIP Guest House), dhabas (Waknaghat Chowk Sharma Dhaba, Pahadi Maggi Point, Meet & Treet), and tourist spots (Karol Tibba, Mohan Shakti, Toy Train).
7. Official Websites, Library Resources & Portals:
   - When asked about library or any JUIT website links, provide the direct URLs:
     • Central Library / LRC: https://www.juit.ac.in/lrc/home.php
     • Web OPAC (Koha Book Search): https://www.juit.ac.in/lrc/web-opac
     • RemoteXs (Off-Campus Library Access): https://juit.remotexs.in/
     • Institutional Repository / Past Papers (PYQs): http://www.ir.juit.ac.in:8080/jspui/handle/123456789/22
     • Student Web Portal / ERP (Campus Lynx): https://webportal.juit.ac.in:6011/studentportal/
     • LMS / Moodle: https://lms.juit.ac.in/login/index.php
     • Main Website: https://www.juit.ac.in/
     • Online Fee Payment: https://www.juit.ac.in/fee-payment
     • Placement Cell: https://www.juit.ac.in/placement-cell
     • Alumni Portal: https://alumni.juit.ac.in/
     • Anti-Ragging & 24x7 Security: +91-1792-239222, Dispensary Emergency: +91-1792-239225
8. JUIT Official Rules & Regulations:
   - When asked about university rules (e.g. attendance percentage, medical leave, hostel curfew, banned electrical appliances, grading, anti-ragging, dress code, or motor vehicles):
     • Attendance: Mandatory 80% attendance in lectures, tutorials, and practicals separately. Medical waiver allows up to 10% concession (down to 70%) with Dean's approval and RMO endorsement. Attendance below 80% (or 70% with waiver) results in 'F' grade (attendance shortage) and exam debarment.
     • Evaluation & Exams: T1 (15 marks), T2 (25 marks), T3 (35 marks), Teacher Assessment / TA (25 marks). Minimum passing grade is 'D'. Minimum 4.5 CGPA required at the end of 1st year to promote.
     • Hostel Curfew: Main Campus Gate closes at 09:30 PM. Hostel in-time is 10:00 PM with night roll call. Central Library open until 12:00 Midnight. Outstation night leave requires prior portal application and parent authorization.
     • Banned Appliances: Electric heaters, kettles, induction stoves, and immersion rods are strictly banned for fire safety (confiscation + ₹2,000-₹5,000 fine).
     • Substance Ban: Zero tolerance for alcohol, smoking, vaping, or drugs (immediate suspension, expulsion, and police reporting).
     • Anti-Ragging: Zero-tolerance criminal offense under Supreme Court guidelines.
     • Dress Code & ID: Official RFID ID card mandatory at all times. Formal/semi-formal decent attire in Academic Blocks (shorts and slippers prohibited). White lab coats mandatory in Chemistry/Biotech labs.
     • Vehicles: 1st-year students not permitted to keep motorized vehicles on campus. 20 km/h speed limit.

Always answer student queries with warmth, precision, clean bullet points, and exact figures.`;
}

export interface SanitizedChatPayload {
  history: Content[];
  lastMessageText: string;
}

/**
 * Sanitizes chat messages to strictly conform to Google Gemini API requirements:
 * 1. Discards empty strings and prior error notifications ("Sorry, I ran into an issue...").
 * 2. Merges consecutive identical roles so turns strictly alternate (user -> model -> user -> model).
 * 3. Ensures the message being sent to Gemini is always the latest user prompt.
 * 4. Ensures `history[0]` always has role 'user' (Gemini rejects history starting with 'model').
 * 5. Ensures history ends with role 'model' before the new user prompt is transmitted.
 * 6. Safely slices history while maintaining valid alternating turn structure.
 */
export function sanitizeHistoryAndLastMessage(
  messages: { role: string; content: string }[]
): SanitizedChatPayload {
  if (!messages || messages.length === 0) {
    return { history: [], lastMessageText: "Hello" };
  }

  // 1. Normalize items and filter out blanks & error notifications
  const cleanItems: { role: "user" | "model"; text: string }[] = [];
  for (const m of messages) {
    if (!m || typeof m.content !== "string") continue;
    const text = m.content.trim();
    if (!text) continue;
    if (text.startsWith("Sorry, I ran into an issue")) continue;

    const role: "user" | "model" = m.role === "user" ? "user" : "model";

    // Merge consecutive identical roles into one combined turn
    if (cleanItems.length > 0 && cleanItems[cleanItems.length - 1].role === role) {
      cleanItems[cleanItems.length - 1].text += "\n\n" + text;
    } else {
      cleanItems.push({ role, text });
    }
  }

  if (cleanItems.length === 0) {
    return { history: [], lastMessageText: "Hello" };
  }

  // 2. Extract the last user message to be sent
  let lastMessageText = "";
  if (cleanItems[cleanItems.length - 1].role === "user") {
    lastMessageText = cleanItems.pop()!.text;
  } else {
    // If the conversation list somehow ended on a model message, fallback
    lastMessageText = "Please continue";
  }

  // 3. Gemini Rule: History must start with 'user'
  while (cleanItems.length > 0 && cleanItems[0].role !== "user") {
    cleanItems.shift();
  }

  // 4. Gemini Rule: History must end with 'model' so the new message is 'user'
  while (cleanItems.length > 0 && cleanItems[cleanItems.length - 1].role !== "model") {
    const popped = cleanItems.pop();
    if (popped) {
      lastMessageText = popped.text + "\n\n" + lastMessageText;
    }
  }

  // 5. Limit message history to last 10 messages (up to 5 back-and-forth pairs)
  let windowed = cleanItems.slice(-10);
  // Re-verify that the windowed slice still starts with 'user'
  while (windowed.length > 0 && windowed[0].role !== "user") {
    windowed.shift();
  }

  const history: Content[] = windowed.map((item) => ({
    role: item.role,
    parts: [{ text: item.text }],
  }));

  return {
    history,
    lastMessageText,
  };
}

export async function chatWithGemini(
  messages: { role: string; content: string }[],
  mode: AIMode = "study",
  studentBatch?: string,
  referenceDate?: Date
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const resolvedMode: AIMode = BASE_PROMPTS[mode] ? mode : "study";
  const modelName = process.env.GEMINI_MODEL || "gemini-flash-lite-latest";

  const systemInstruction = getSystemPrompt(resolvedMode, studentBatch, referenceDate);

  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction,
    generationConfig: {
      maxOutputTokens: 2048,
    },
  });

  const { history, lastMessageText } = sanitizeHistoryAndLastMessage(messages);

  const chat = model.startChat({ history });
  const result = await chat.sendMessage(lastMessageText);

  return result.response.text();
}

export async function streamChatWithGemini(
  messages: {
    role: string;
    content: string;
    attachments?: { mimeType: string; data: string }[];
  }[],
  mode: AIMode = "study",
  studentBatch?: string,
  referenceDate?: Date
): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const resolvedMode: AIMode = BASE_PROMPTS[mode] ? mode : "study";
  const modelName = process.env.GEMINI_MODEL || "gemini-flash-lite-latest";

  const systemInstruction = getSystemPrompt(resolvedMode, studentBatch, referenceDate);

  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction,
    generationConfig: {
      maxOutputTokens: 2048,
    },
  });

  const { history, lastMessageText } = sanitizeHistoryAndLastMessage(messages);

  // Attach any inline files (images / PDFs) from the latest user message so
  // vision & document questions actually reach the model.
  const latestUser = [...messages].reverse().find((m) => m.role === "user");
  const fileParts = (latestUser?.attachments || [])
    .filter((f) => f && typeof f.data === "string" && typeof f.mimeType === "string")
    .filter((f) => f.mimeType.startsWith("image/") || f.mimeType === "application/pdf")
    .slice(0, 4)
    .map((f) => ({ inlineData: { mimeType: f.mimeType, data: f.data } }));

  const chat = model.startChat({ history });
  const result = await chat.sendMessageStream([
    { text: lastMessageText },
    ...fileParts,
  ]);
  const encoder = new TextEncoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });
}

