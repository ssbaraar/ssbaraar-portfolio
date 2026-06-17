"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * PageViewTracker — fires a /api/track POST on every page load.
 *
 * - No cookies, no third-party scripts, GDPR-friendly
 * - Skips admin/honeypot/api paths (filtered server-side too)
 * - Uses navigator.sendBeacon for fire-and-forget (no UI blocking)
 * - Includes referrer + path so the dashboard can show top sources
 */
export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Build the path with query string
    const params = searchParams.toString();
    const fullPath = params ? `${pathname}?${params}` : pathname;

    // Skip admin views + API
    if (
      fullPath.includes("admin=1") ||
      fullPath.startsWith("/api/")
    ) {
      return;
    }

    const payload = {
      path: fullPath,
      referrer: typeof document !== "undefined" ? document.referrer : null,
    };

    // sendBeacon is fire-and-forget, survives page navigation
    try {
      if (
        typeof navigator !== "undefined" &&
        "sendBeacon" in navigator
      ) {
        const blob = new Blob([JSON.stringify(payload)], {
          type: "application/json",
        });
        const ok = navigator.sendBeacon("/api/track", blob);
        if (ok) return;
      }
    } catch {
      // fall through to fetch
    }

    // Fallback to fetch (no await — fire and forget)
    try {
      fetch("/api/track", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // ignore
    }
  }, [pathname, searchParams]);

  return null;
}
