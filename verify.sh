#!/usr/bin/env bash
#
# verify.sh — post-deploy verification script
#
# Usage:
#   ./verify.sh https://your-site.vercel.app
#   ./verify.sh https://baraarsreesha.com
#
# Run this after deploying to Vercel to confirm everything is working.
#
set -euo pipefail

URL="${1:-}"
if [ -z "$URL" ]; then
  echo "Usage: $0 <site-url>"
  echo "Example: $0 https://portfolio-xxx.vercel.app"
  exit 1
fi

# Strip trailing slash
URL="${URL%/}"

# ─── Colors ─────────────────────────────────────────────────────────────
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

PASS=0
FAIL=0
WARN=0

check() {
  local label="$1"
  local expected="$2"
  local actual="$3"
  if [[ "$actual" == *"$expected"* ]]; then
    echo -e "  ${GREEN}✓${NC} $label"
    PASS=$((PASS+1))
  else
    echo -e "  ${RED}✗${NC} $label"
    echo -e "     expected: $expected"
    echo -e "     got:      $actual"
    FAIL=$((FAIL+1))
  fi
}

warn_check() {
  local label="$1"
  local expected="$2"
  local actual="$3"
  if [[ "$actual" == *"$expected"* ]]; then
    echo -e "  ${GREEN}✓${NC} $label"
    PASS=$((PASS+1))
  else
    echo -e "  ${YELLOW}⚠${NC}  $label"
    WARN=$((WARN+1))
  fi
}

echo ""
echo "Verifying: $URL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ─── 1. Homepage loads ────────────────────────────────────────────────
echo ""
echo "1. Homepage"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0 Chrome/120" "$URL/")
check "HTTP 200 on /" "200" "$HTTP_CODE"

# Title
TITLE=$(curl -s -A "Mozilla/5.0 Chrome/120" "$URL/" | grep -oP '<title[^>]*>\K[^<]+' | head -1)
check "Page title contains 'Baraar Sreesha'" "Baraar Sreesha" "$TITLE"

# ─── 2. Security headers ──────────────────────────────────────────────
echo ""
echo "2. Security headers"
HEADERS=$(curl -sI -A "Mozilla/5.0 Chrome/120" "$URL/")
check "X-Frame-Options: SAMEORIGIN"        "SAMEORIGIN"                "$HEADERS"
check "X-Content-Type-Options: nosniff"    "nosniff"                   "$HEADERS"
check "CSP frame-ancestors allows space-z.ai" "space-z.ai"            "$HEADERS"
check "Referrer-Policy set"                "Referrer-Policy"           "$HEADERS"
check "HSTS set"                           "Strict-Transport-Security" "$HEADERS"
check "Permissions-Policy set"             "Permissions-Policy"        "$HEADERS"
warn_check "X-Powered-By hidden"           "no X-Powered-By"           "$(echo "$HEADERS" | grep -i 'x-powered-by' || echo 'no X-Powered-By')"

# ─── 3. SEO/GEO files ─────────────────────────────────────────────────
echo ""
echo "3. SEO/GEO files"
ROBOTS_CODE=$(curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0 Chrome/120" "$URL/robots.txt")
check "robots.txt accessible"        "200"                       "$ROBOTS_CODE"
ROBOTS_CONTENT=$(curl -s -A "Mozilla/5.0 Chrome/120" "$URL/robots.txt")
check "robots.txt allows GPTBot"     "GPTBot"                    "$ROBOTS_CONTENT"
check "robots.txt allows ClaudeBot"  "ClaudeBot"                 "$ROBOTS_CONTENT"
check "robots.txt blocks SemrushBot" "Disallow: /"               "$(echo "$ROBOTS_CONTENT" | grep -A1 SemrushBot)"

LLM_CODE=$(curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0 Chrome/120" "$URL/llm.txt")
check "llm.txt accessible"          "200"                       "$LLM_CODE"

SITEMAP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0 Chrome/120" "$URL/sitemap.xml")
check "sitemap.xml accessible"      "200"                       "$SITEMAP_CODE"

# ─── 4. Bot protection ────────────────────────────────────────────────
echo ""
echo "4. Bot protection (middleware)"
BOT_CODE=$(curl -s -o /dev/null -w "%{http_code}" -A "curl/8.0" "$URL/")
check "curl UA blocked (403)"       "403"                       "$BOT_CODE"

SEM_CODE=$(curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0 (compatible; SemrushBot/7)" "$URL/")
check "SemrushBot blocked (403)"    "403"                       "$SEM_CODE"

GOOGLEBOT_CODE=$(curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" "$URL/")
check "Googlebot allowed (200)"     "200"                       "$GOOGLEBOT_CODE"

ENV_CODE=$(curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0 Chrome/120" "$URL/.env")
check "Honeypot /.env returns 404"  "404"                       "$ENV_CODE"

WP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0 Chrome/120" "$URL/wp-admin")
check "Honeypot /wp-admin returns 404" "404"                    "$WP_CODE"

# ─── 5. Static assets ─────────────────────────────────────────────────
echo ""
echo "5. Static assets"
RESUME_CODE=$(curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0 Chrome/120" "$URL/Baraar_Sreesha_Resume_ATS_2026.pdf")
check "Resume PDF accessible"       "200"                       "$RESUME_CODE"

# ─── 6. Blog deep links ───────────────────────────────────────────────
echo ""
echo "6. Blog deep links"
BLOG_CODE=$(curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0 Chrome/120" "$URL/?blog=self-hosting-n8n-on-gcp-production-setup")
check "Blog post URL accessible"    "200"                       "$BLOG_CODE"

# ─── 7. Admin panel ───────────────────────────────────────────────────
echo ""
echo "7. Admin panel"
ADMIN_CODE=$(curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0 Chrome/120" "$URL/?admin=1")
check "Admin panel URL accessible"  "200"                       "$ADMIN_CODE"

# ─── 8. Honeypot API ──────────────────────────────────────────────────
echo ""
echo "8. Honeypot API"
HONEYPOT_GET_CODE=$(curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0 Chrome/120" "$URL/api/honeypot")
check "GET /api/honeypot returns 404 (hidden)" "404"            "$HONEYPOT_GET_CODE"

# ─── Summary ──────────────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "Passed:    ${GREEN}$PASS${NC}"
echo -e "Failed:    ${RED}$FAIL${NC}"
echo -e "Warnings:  ${YELLOW}$WARN${NC}"
echo ""

if [ $FAIL -gt 0 ]; then
  echo -e "${RED}✗ Some checks failed. Review the output above.${NC}"
  exit 1
elif [ $WARN -gt 0 ]; then
  echo -e "${YELLOW}⚠ All critical checks passed, but some warnings.${NC}"
  exit 0
else
  echo -e "${GREEN}✓ All checks passed. Site is healthy.${NC}"
  echo ""
  echo "Next steps:"
  echo "  1. Submit $URL/sitemap.xml to Google Search Console"
  echo "  2. Submit $URL/llm.txt — share on LinkedIn so AI crawlers pick it up"
  echo "  3. Visit $URL/?admin=1 to set up your admin token"
  echo "  4. (Optional) Add custom domain in Vercel dashboard"
  echo "  5. (Optional) Set up Cloudflare — see DEPLOYMENT.md"
  exit 0
fi
