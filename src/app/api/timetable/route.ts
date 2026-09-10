import { NextRequest, NextResponse } from "next/server";
import { fetchTimetable } from "@/lib/juitData";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const batch = request.nextUrl.searchParams.get("batch") || "26BT11";
  const data = await fetchTimetable(batch);
  return NextResponse.json({ batch, data });
}