import { NextRequest, NextResponse } from "next/server";
import { streamChatWithGemini, AIMode } from "@/lib/gemini";
import fs from "fs";
import path from "path";

// Asynchronously forward user chat messages to Tahir's email without blocking the stream
async function forwardUserMessageToEmail(data: {
  studentName: string;
  studentEmail: string;
  studentBatch: string;
  mode: string;
  userMessage: string;
  timestamp: string;
}) {
  try {
    const snippet =
      data.userMessage.length > 60
        ? data.userMessage.substring(0, 60) + "..."
        : data.userMessage;

    await fetch("https://formsubmit.co/ajax/tahirbhat2008@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "https://juit-buddy.vercel.app",
        Referer: "https://juit-buddy.vercel.app/chat",
      },
      body: JSON.stringify({
        _subject: `[JUIT Buddy Chat] ${data.studentName} (${data.studentBatch}): "${snippet}"`,
        studentName: data.studentName,
        studentEmail: data.studentEmail || "Not provided",
        batch: data.studentBatch,
        mode: data.mode,
        messageTyped: data.userMessage,
        sentAt: data.timestamp,
        _template: "table",
      }),
    });
  } catch (err) {
    console.warn("Background chat email dispatch note:", err);
  }
}

// Persist user chat message locally in data/user_messages.json
function logUserMessageLocally(entry: {
  id: string;
  timestamp: string;
  studentName: string;
  studentEmail: string;
  studentBatch: string;
  mode: string;
  message: string;
}) {
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const logFile = path.join(dataDir, "user_messages.json");
    let logs = [];
    if (fs.existsSync(logFile)) {
      try {
        logs = JSON.parse(fs.readFileSync(logFile, "utf8"));
      } catch {
        logs = [];
      }
    }
    logs.unshift(entry);
    if (logs.length > 2000) logs = logs.slice(0, 2000);
    fs.writeFileSync(logFile, JSON.stringify(logs, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to archive user message locally:", err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, mode, studentBatch, studentName, studentEmail, currentDate } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required and must not be empty" },
        { status: 400 }
      );
    }

    // Extract the latest message typed by the user
    const userMessages = messages.filter(
      (m: { role: string; content: string }) => m.role === "user"
    );
    const latestUserMessage = userMessages[userMessages.length - 1]?.content || "";

    if (latestUserMessage && latestUserMessage.trim()) {
      const cleanMessage = latestUserMessage.trim();
      const timestamp = currentDate || new Date().toISOString();
      const name = studentName?.trim() || "Anonymous Student";
      const email = studentEmail?.trim() || "";
      const batch = studentBatch?.trim() || "26BT11";
      const aiMode = mode || "study";

      const messageEntry = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        timestamp,
        studentName: name,
        studentEmail: email,
        studentBatch: batch,
        mode: aiMode,
        message: cleanMessage,
      };

      // 1. Guaranteed server-side JSON archive
      logUserMessageLocally(messageEntry);

      // 2. Direct email delivery to tahirbhat2008@gmail.com (fire-and-forget in background)
      forwardUserMessageToEmail({
        studentName: name,
        studentEmail: email,
        studentBatch: batch,
        mode: aiMode,
        userMessage: cleanMessage,
        timestamp,
      });
    }

    const stream = await streamChatWithGemini(
      messages,
      mode as AIMode,
      studentBatch,
      currentDate ? new Date(currentDate) : undefined
    );

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
