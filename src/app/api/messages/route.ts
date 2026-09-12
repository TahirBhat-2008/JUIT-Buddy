import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const passcode = searchParams.get("passcode") || req.headers.get("x-admin-key");

    // Passcode protection: only the admin can view the logs.
    // Configured via ADMIN_PASSCODE env var (falls back to the historical
    // value in local dev; set a strong one in the Vercel dashboard).
    const expectedPasscode = process.env.ADMIN_PASSCODE || "tahir2008";
    if (!passcode || passcode !== expectedPasscode) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Valid admin passcode required." },
        { status: 401 }
      );
    }

    const dataDir = path.join(process.cwd(), "data");
    const userMessagesFile = path.join(dataDir, "user_messages.json");
    const reportsFile = path.join(dataDir, "reports.json");

    let userMessages = [];
    if (fs.existsSync(userMessagesFile)) {
      try {
        userMessages = JSON.parse(fs.readFileSync(userMessagesFile, "utf8"));
      } catch {
        userMessages = [];
      }
    }

    let reports = [];
    if (fs.existsSync(reportsFile)) {
      try {
        reports = JSON.parse(fs.readFileSync(reportsFile, "utf8"));
      } catch {
        reports = [];
      }
    }

    return NextResponse.json({
      success: true,
      recipient: "tahirbhat2008@gmail.com",
      totalChatMessages: userMessages.length,
      totalReports: reports.length,
      chatMessages: userMessages,
      reports: reports,
    });
  } catch (error) {
    console.error("Error retrieving user messages:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve messages" },
      { status: 500 }
    );
  }
}
