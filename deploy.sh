#!/usr/bin/env bash
#
# deploy.sh — one-command deploy of the Baraar Sreesha portfolio to GitHub + Vercel
#
# Usage:
#   ./deploy.sh                    # interactive — prompts for GitHub repo URL
#   ./deploy.sh <github-url>       # non-interactive — pass the repo URL
#   ./deploy.sh --skip-push        # just init + commit, don't push
#
# Example:
#   ./deploy.sh git@github.com:ssbaraar/portfolio.git
#
set -euo pipefail

# ─── Colors ─────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log()   { echo -e "${BLUE}→${NC} $1"; }
ok()    { echo -e "${GREEN}✓${NC} $1"; }
warn()  { echo -e "${YELLOW}⚠${NC} $1"; }
die()   { echo -e "${RED}✗${NC} $1" >&2; exit 1; }

# ─── Pre-flight checks ─────────────────────────────────────────────────
log "Running pre-flight checks..."

command -v git >/dev/null 2>&1 || die "git is not installed. Install from https://git-scm.com"

# Make sure we're in the project root (script lives in /home/z/my-project)
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

[ -f "package.json" ]         || die "No package.json found in $PROJECT_DIR. Are you in the project root?"
[ -f "next.config.ts" ]       || die "No next.config.ts found."
[ -d "src" ]                  || die "No src/ directory found."

# Make sure .env.example exists, warn if .env doesn't
[ -f ".env.example" ] || warn "No .env.example found — you'll need to set env vars manually on Vercel."

# Make sure we're not committing .env
if [ -f ".env" ] && ! grep -q "^.env$" .gitignore 2>/dev/null; then
  warn ".env file exists but isn't in .gitignore. Adding it now."
  echo ".env" >> .gitignore
  ok ".env added to .gitignore"
fi

ok "Pre-flight checks passed"

# ─── Step 1: git init (if not already) ─────────────────────────────────
log "Checking git repository state..."

if [ ! -d ".git" ]; then
  log "Initializing git repository..."
  git init -b main >/dev/null 2>&1 || die "git init failed"
  ok "Git repository initialized on main branch"
else
  ok "Git repository already exists"
fi

# ─── Step 2: stage + verify ────────────────────────────────────────────
log "Staging files..."

git add -A

# Sanity check: make sure .env is NOT staged
if git diff --cached --name-only | grep -q "^\.env$"; then
  die ".env was staged! This is a security issue. Remove it from staging and add to .gitignore."
fi

# Sanity check: make sure node_modules is NOT staged
if git diff --cached --name-only | grep -q "^node_modules/"; then
  die "node_modules was staged! Make sure node_modules is in .gitignore."
fi

STAGED_COUNT=$(git diff --cached --name-only | wc -l | tr -d ' ')
ok "Staged $STAGED_COUNT files"

# ─── Step 3: commit ────────────────────────────────────────────────────
log "Creating commit..."

# Check if there are staged changes to commit
if git diff --cached --quiet; then
  warn "No changes to commit (working tree clean)"
else
  # Use existing commit if amending, otherwise new commit
  COMMIT_MSG="Portfolio v1 — Applied AI & GTM Engineer

- Hero with rotating taglines + animated blobs
- Audience toggle (recruiters vs founders)
- 6 service cards with unique icons
- 4 production case studies
- Process timeline, tech stack clusters, About, FAQ
- Blog system with 3 SEO-optimized posts + admin panel
- Bot-trap middleware + honeypot endpoints
- Anti-inspect deterrent + 10 security headers
- llm.txt + sitemap.xml + updated robots.txt for SEO/GEO
- Light/dark mode + mobile-first responsive"

  if git log --oneline -1 >/dev/null 2>&1; then
    # Has previous commits — make a new one
    git commit -m "$COMMIT_MSG" >/dev/null 2>&1 || die "git commit failed"
  else
    # First commit
    git commit -m "$COMMIT_MSG" >/dev/null 2>&1 || die "git commit failed"
  fi
  ok "Commit created"
fi

# ─── Step 4: push (or skip) ────────────────────────────────────────────
if [[ "${1:-}" == "--skip-push" ]]; then
  warn "Skipping push (--skip-push flag)"
  echo ""
  echo "Next steps:"
  echo "  1. Create an empty repo on GitHub: https://github.com/new"
  echo "  2. Run: git remote add origin git@github.com:YOUR_USERNAME/portfolio.git"
  echo "  3. Run: git push -u origin main"
  echo "  4. Go to https://vercel.com/new and import the repo"
  exit 0
fi

# Get the GitHub URL from arg or prompt
GITHUB_URL="${1:-}"
if [ -z "$GITHUB_URL" ]; then
  echo ""
  echo "Push to GitHub. Create an empty repo first at https://github.com/new"
  echo "(Do NOT initialize with README/license/.gitignore — the repo must be empty.)"
  echo ""
  read -rp "GitHub repo URL (e.g. git@github.com:USERNAME/portfolio.git): " GITHUB_URL
  [ -z "$GITHUB_URL" ] && die "No GitHub URL provided. Re-run with the URL as an argument."
fi

# Set remote
if git remote get-url origin >/dev/null 2>&1; then
  log "Updating origin remote to $GITHUB_URL..."
  git remote set-url origin "$GITHUB_URL"
else
  log "Adding origin remote..."
  git remote add origin "$GITHUB_URL"
fi
ok "Remote 'origin' set to $GITHUB_URL"

# Push
log "Pushing to GitHub..."
if git push -u origin main 2>&1; then
  ok "Pushed to GitHub"
else
  # Maybe the branch is master?
  warn "Push failed. Trying 'master' branch name..."
  git branch -m main master 2>/dev/null || true
  git push -u origin master 2>&1 || die "Push failed. Check your GitHub URL and SSH key."
  ok "Pushed to GitHub (master branch)"
fi

# ─── Step 5: next steps ────────────────────────────────────────────────
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ Code pushed to GitHub${NC}"
echo ""
echo "Next: deploy to Vercel (free, ~3 minutes)"
echo ""
echo "  1. Go to: https://vercel.com/new"
echo "  2. Sign in with GitHub"
echo "  3. Click 'Import' on your portfolio repo"
echo "  4. Framework preset: Next.js (auto-detected)"
echo "  5. Expand 'Environment Variables' and add:"
echo "     Name:  ADMIN_TOKEN"
echo "     Value: $(openssl rand -hex 32)"
echo "     (Save this value — you'll need it for the admin panel)"
echo "  6. Click 'Deploy' — wait ~90 seconds"
echo "  7. You'll get a URL like portfolio-xxx.vercel.app"
echo ""
echo "Then verify (replace with your Vercel URL):"
echo "  curl -sI https://portfolio-xxx.vercel.app/ | head -20"
echo "  open https://portfolio-xxx.vercel.app/?admin=1"
echo ""
echo "Optional: custom domain → Vercel dashboard → Settings → Domains"
echo "Optional: Cloudflare setup → see DEPLOYMENT.md"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
