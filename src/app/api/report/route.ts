import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface ReportPayload {
  name?: string;
  email?: string;
  category?: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ReportPayload = await req.json();

    if (!body.message || body.message.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Message content cannot be empty." },
        { status: 400 }
      );
    }

    const reportEntry = {
      id: `rep_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      name: body.name?.trim() || "Anonymous Student",
      email: body.email?.trim() || "not-provided@juitbuddy.local",
      category: body.category || "General Feedback",
      message: body.message.trim(),
    };

    // 1. Persist locally to data/reports.json (skipped on Vercel — read-only FS;
    //    email dispatch below is the durable channel there)
    if (!process.env.VERCEL) try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const reportsFile = path.join(dataDir, "reports.json");
      let reports = [];
      if (fs.existsSync(reportsFile)) {
        try {
          reports = JSON.parse(fs.readFileSync(reportsFile, "utf8"));
        } catch {
          reports = [];
        }
      }
      reports.unshift(reportEntry);
      fs.writeFileSync(reportsFile, JSON.stringify(reports, null, 2), "utf8");
    } catch (saveError) {
      console.error("Failed to archive report locally:", saveError);
    }

    // 2. Dispatch direct email to tahirbhat2008@gmail.com via FormSubmit
    let emailDispatched = false;
    let dispatchNote = "";

    try {
      const formSubmitRes = await fetch(
        "https://formsubmit.co/ajax/tahirbhat2008@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Origin: "https://juit-buddy.vercel.app",
            Referer: "https://juit-buddy.vercel.app/report",
          },
          body: JSON.stringify({
            _subject: `[JUIT Buddy Report] ${reportEntry.category} from ${reportEntry.name}`,
            name: reportEntry.name,
            email: reportEntry.email,
            category: reportEntry.category,
            message: reportEntry.message,
            submittedAt: reportEntry.timestamp,
            _template: "table",
          }),
        }
      );

      const resData = await formSubmitRes.json().catch(() => ({}));
      if (formSubmitRes.ok || resData?.success === "true") {
        emailDispatched = true;
      } else {
        dispatchNote = resData?.message || "";
      }
    } catch (dispatchError) {
      console.warn("Direct email forward note:", dispatchError);
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been received and dispatched to tahirbhat2008@gmail.com!",
      emailDispatched,
      dispatchNote,
      reportId: reportEntry.id,
    });
  } catch (error) {
    console.error("Error processing report submission:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error processing report." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    recipient: "tahirbhat2008@gmail.com",
    linkedin: "https://www.linkedin.com/in/tahirbhat-2008-cse",
    status: "active",
  });
}
