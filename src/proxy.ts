/** Legit search engine crawlers you WANT indexing your portfolio. */
const ALLOWED_UA_FRAGMENTS = [
  "googlebot",
  "bingbot",
  "duckduckbot",
  "slurp", // Yahoo
  "baiduspider-news",
  "yandex.com/bots", // Yandex legit crawler (with verification URL)
  "twitterbot",
  "facebookexternalhit",
  "linkedinbot",
  "slackbot",
  "whatsapp",
  "telegrambot",
  "applebot",
  "pinterestbot",
  "discordbot",
  "skypeuripreview",
];

/**
 * Known malicious / scraper user-agent fragments.
 *
 * We deliberately do NOT block Googlebot / Bingbot / Slurp / DuckDuckBot —
 * those are legit search engine crawlers you WANT indexing your portfolio.
 *
 * The list below targets: content scrapers, SEO tools that ignore robots.txt,
 * known vuln scanners, and obvious bot frameworks.
 */
const BLOCKED_UA_FRAGMENTS = [
  // SEO scrapers (these ignore robots.txt and hammer sites)
  "semrushbot",
  "ahrefsbot",
  "mj12bot",
  "dotbot",
  "petalbot",
  "bytespider",
  "yandexbot", // generic Yandex crawler (we keep YandexBot News only)
  "baiduspider",
  "serpstatbot",
  "dataforseobot",
  "blexbot",
  "seokicks",
  "linkdexbot",
  "backlinkcrawler",
  // Vuln scanners
  "nikto",
  "sqlmap",
  "nmap",
  "masscan",
  "zgrab",
  "wpscan",
  "acunetix",
  "nessus",
  "openvas",
  // Bot frameworks (no legit browser sends these)
  "python-requests",
  "python-urllib",
  "scrapy",
  "httpx/",
  "curl",
  "wget",
  "go-http-client",
  "okhttp",
  "phantomjs",
  "headless-chrome",
  "puppeteer",
  "playwright",
];

/** Honeypot paths — real users never visit these, only scanners do. */
const HONEYPOT_PATHS = [
  "/.env",
  "/.env.local",
  "/.env.production",
  "/.git/config",
  "/.git/HEAD",
  "/wp-admin",
  "/wp-admin/",
  "/wp-login.php",
  "/wp-content/",
  "/xmlrpc.php",
  "/phpmyadmin",
  "/phpmyadmin/",
  "/admin.php",
  "/administrator",
  "/admin/login",
  "/.aws/credentials",
  "/.ssh/id_rsa",
  "/config.php",
  "/database.sql",
  "/backup.sql",
  "/.DS_Store",
  "/vendor/phpunit",
  "/cgi-bin/",
  "/owa/",
  "/solr/",
  "/struts/",
  "/jenkins/",
  "/actuator/",
  "/manager/html",
];

function isBotUA(ua: string | null): { bot: boolean; reason: string } {
  if (!ua || ua.trim() === "") return { bot: true, reason: "empty-ua" };
  const lower = ua.toLowerCase();
  // Allow-list takes priority — legit search engine / social preview bots pass
  for (const frag of ALLOWED_UA_FRAGMENTS) {
    if (lower.includes(frag)) {
      return { bot: false, reason: "" };
    }
  }
  // Then check block-list
  for (const frag of BLOCKED_UA_FRAGMENTS) {
    if (lower.includes(frag)) {
      return { bot: true, reason: `ua:${frag}` };
    }
  }
  return { bot: false, reason: "" };
}

function isHoneypotPath(pathname: string): boolean {
  const p = pathname.toLowerCase();
  return HONEYPOT_PATHS.some(
    (hp) => p === hp || p.startsWith(hp) || p === `${hp}/`
  );
}

function getClientIP(req: Request): string | null {
  const headers = req.headers;
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    null
  );
}

export function proxy(request: Request) {
  const url = new URL(request.url);
  const { pathname } = url;
  const ua = request.headers.get("user-agent");
  const ip = getClientIP(request);

  // 1. Honeypot path — log + 404 (don't reveal we detected them)
  if (isHoneypotPath(pathname)) {
    // Avoid import cycle: import dynamically
    // (Next.js middleware runs in edge runtime — can't use Prisma here)
    // We log via a fetch to our own /api/honeypot endpoint.
    try {
      const baseUrl = url.origin;
      // Fire-and-forget
      fetch(`${baseUrl}/api/honeypot`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          path: pathname,
          method: request.method,
          ua,
          ip,
          reason: "honeypot-path",
        }),
      }).catch(() => {});
    } catch {
      // ignore
    }
    return new Response("Not Found", { status: 404 });
  }

  // 2. Known bot UA — block with 403
  const { bot, reason } = isBotUA(ua);
  if (bot) {
    try {
      fetch(`${url.origin}/api/honeypot`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          path: pathname,
          method: request.method,
          ua,
          ip,
          reason,
        }),
      }).catch(() => {});
    } catch {
      // ignore
    }
    return new Response("Forbidden", {
      status: 403,
      headers: { "content-type": "text/plain" },
    });
  }

  // 3. Allowed request — let it through
  return undefined;
}

export const config = {
  // Run middleware on everything except:
  //  - Next internals (_next/*)
  //  - Static assets (favicon, robots, sitemap, logo, resume PDF)
  //  - Our own honeypot + admin API endpoints (so middleware's internal
  //    fetch to /api/honeypot doesn't get re-blocked by itself)
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llm.txt|logo.svg|Baraar_Sreesha_Resume_ATS_2026.pdf|api/honeypot|api/admin|api/track|blog).*)",
  ],
};
