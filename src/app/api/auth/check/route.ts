import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";

export async function GET(req: NextRequest) {
  const session = req.cookies.get("admin_session")?.value;
  const loggedIn = !!(ADMIN_TOKEN && session === ADMIN_TOKEN);
  return NextResponse.json({ ok: true, loggedIn });
}
