import { NextRequest, NextResponse } from "next/server";
import { getAnalytics, getStorageStatus } from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";

function checkAuth(req: NextRequest): boolean {
  if (!ADMIN_TOKEN) return false;
  const session = req.cookies.get("admin_session")?.value;
  if (session === ADMIN_TOKEN) return true;
  const auth = req.headers.get("authorization");
  return auth?.startsWith("Bearer ") ? auth.slice(7) === ADMIN_TOKEN : false;
}

// GET /api/admin/analytics — full analytics summary for dashboard
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const limit = Number(new URL(req.url).searchParams.get("limit") || 1000);
  const summary = await getAnalytics(limit);
  const storage = getStorageStatus();
  return NextResponse.json({
    ok: true,
    storage,
    ...summary,
  });
}
