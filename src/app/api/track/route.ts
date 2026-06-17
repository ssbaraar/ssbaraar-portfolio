import { NextRequest, NextResponse } from "next/server";
import { recordPageView } from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/track — record a page view (called client-side on every page load)
// No auth required — anyone can record a view (it's just a counter).
// But this is a public endpoint that bots could spam; the proxy middleware
// already blocks known bot UAs, so we get clean human traffic here.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const path: string = body.path || "/";

    // Don't track admin / honeypot / API hits
    if (
      path.startsWith("/api/") ||
      path.startsWith("/admin") ||
      path.includes("admin=1") ||
      path === "/favicon.ico" ||
      path === "/robots.txt" ||
      path === "/sitemap.xml" ||
      path === "/llm.txt"
    ) {
      return NextResponse.json({ ok: true, tracked: false });
    }

    const referrer: string | null =
      body.referrer && body.referrer !== "" ? body.referrer : null;
    const country =
      req.headers.get("x-vercel-ip-country") ||
      req.headers.get("cf-ipcountry") ||
      null;
    const ua = req.headers.get("user-agent");

    // Skip bots (defense in depth — middleware should already block them)
    if (ua) {
      const lower = ua.toLowerCase();
      const botSignals = [
        "bot",
        "crawler",
        "spider",
        "curl",
        "wget",
        "python-requests",
        "scrapy",
        "headless",
      ];
      // Allow-list for legit crawlers we want to count as views
      const allowList = ["googlebot", "bingbot", "duckduckbot"];
      const isAllowed = allowList.some((a) => lower.includes(a));
      if (!isAllowed && botSignals.some((s) => lower.includes(s))) {
        return NextResponse.json({ ok: true, tracked: false, reason: "bot" });
      }
    }

    await recordPageView({
      path,
      referrer: referrer ? referrer.slice(0, 200) : null,
      country,
      ua: ua ? ua.slice(0, 200) : null,
    });

    return NextResponse.json({ ok: true, tracked: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
