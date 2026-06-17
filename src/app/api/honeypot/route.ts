import { NextRequest, NextResponse } from "next/server";
import { logBotAttempt } from "@/lib/bot-trap";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Honeypot ingest endpoint. Called by proxy (middleware) when a bot/scanner
 * hits a honeypot path or matches a blocked UA. Also callable directly.
 *
 * Persists to /tmp/bot-attempts.jsonl so attempts survive across warm
 * serverless instances within the same Vercel function container.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const ip =
      body.ip ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      req.headers.get("cf-connecting-ip") ||
      null;
    const entry = await logBotAttempt({
      ip,
      method: body.method || req.method,
      path: body.path || "/api/honeypot",
      ua: body.ua || req.headers.get("user-agent"),
      reason: body.reason || "direct-hit",
      blocked: body.reason !== "direct-hit",
    });
    return NextResponse.json({ ok: true, id: entry.id });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Pretend this endpoint doesn't exist for direct visitors
  return new NextResponse(null, { status: 404 });
}
