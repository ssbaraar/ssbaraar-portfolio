import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 15; // 15 minutes

async function checkRateLimit(ip: string): Promise<{ blocked: boolean; remaining: number }> {
  if (!KV_URL || !KV_TOKEN) return { blocked: false, remaining: RATE_LIMIT };
  const key = `rl:login:${ip}`;
  try {
    const incrRes = await fetch(`${KV_URL}/incr/${key}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
    });
    if (!incrRes.ok) return { blocked: false, remaining: RATE_LIMIT };
    const { result: count } = await incrRes.json();
    if (count === 1) {
      await fetch(`${KV_URL}/expire/${key}/${RATE_WINDOW}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${KV_TOKEN}` },
      });
    }
    const remaining = Math.max(0, RATE_LIMIT - count);
    return { blocked: count > RATE_LIMIT, remaining };
  } catch {
    return { blocked: false, remaining: RATE_LIMIT };
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const { blocked, remaining } = await checkRateLimit(ip);
    if (blocked) {
      return NextResponse.json(
        { ok: false, error: "Too many attempts. Try again in 15 minutes." },
        { status: 429, headers: { "Retry-After": String(RATE_WINDOW) } }
      );
    }

    const { username, password } = await req.json();

    if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !ADMIN_TOKEN) {
      return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
    }

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const res = NextResponse.json({ ok: true, remaining: RATE_LIMIT });
      res.cookies.set("admin_session", ADMIN_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return res;
    }

    return NextResponse.json(
      { ok: false, error: "Invalid credentials", remaining },
      { status: 401 }
    );
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
