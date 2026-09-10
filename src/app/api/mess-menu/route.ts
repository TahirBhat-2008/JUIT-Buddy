import { NextResponse } from "next/server";
import { fetchMessMenu } from "@/lib/juitData";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await fetchMessMenu();
  return NextResponse.json(data);
}