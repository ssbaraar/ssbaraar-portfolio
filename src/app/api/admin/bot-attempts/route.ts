import { NextRequest, NextResponse } from "next/server";
import { getBotAttempts, clearBotAttempts } from "@/lib/bot-trap";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Admin read endpoint for honeypot logs. Protected by a simple
 * admin token query param — set ADMIN_TOKEN in your .env before deploying.
 *
 * Access via /api/admin/bot-attempts?token=YOUR_TOKEN
 */
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "sreesha-secret-2026";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const limit = Number(url.searchParams.get("limit") || 100);
  const attempts = await getBotAttempts(limit);
  return NextResponse.json({
    ok: true,
    count: attempts.length,
    attempts,
    serverTime: Date.now(),
  });
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  await clearBotAttempts();
  return NextResponse.json({ ok: true, cleared: true });
}
