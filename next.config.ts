import type { NextConfig } from "next";

// Security headers — applied to every response
const securityHeaders = [
  // Clickjacking — never allow this site in an iframe
  { key: "X-Frame-Options", value: "DENY" },
  // MIME-type sniffing — browser must respect declared content-type
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Referrer policy — only send origin to same-site, strip to cross-origin
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Permissions policy — lock down browser features we don't use
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()",
  },
  // HSTS — force HTTPS for 2 years, include subdomains
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // CSP — only allow loading from self + a few trusted CDN origins we actually use
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data:",
      "img-src 'self' data: blob: https:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
    ].join("; "),
  },
  // Cross-origin policies — isolate our window from others
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  // Legacy XSS protection (older browsers)
  { key: "X-XSS-Protection", value: "1; mode=block" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  // NEVER ship source maps to production — this is what would let someone
  // reconstruct your readable source from the minified bundle
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  // Strip file-based hints from build output
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
