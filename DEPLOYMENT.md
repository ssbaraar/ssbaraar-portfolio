# 🚀 Complete Deployment Guide — Baraar Sreesha Portfolio

**Total time to live:** ~15 minutes (5 min code push + 3 min Vercel import + 5 min custom domain + 2 min verification)
**Monthly cost:** $0 (Vercel Hobby + Cloudflare Free) + ~$0.83/mo if you buy a domain

---

## 📋 Table of contents

1. [What you're deploying](#1-what-youre-deploying)
2. [Pre-deploy checklist](#2-pre-deploy-checklist)
3. [Push to GitHub](#3-push-to-github)
4. [Deploy to Vercel](#4-deploy-to-vercel)
5. [Set environment variables](#5-set-environment-variables)
6. [Verify the deploy](#6-verify-the-deploy)
7. [Custom domain (optional but recommended)](#7-custom-domain)
8. [Cloudflare setup (free bot protection + CDN)](#8-cloudflare-setup)
9. [SEO submission (Google + Bing)](#9-seo-submission)
10. [GEO submission (LLM crawlers)](#10-geo-submission)
11. [Admin panel setup](#11-admin-panel-setup)
12. [Known limitations + upgrade paths](#12-known-limitations)
13. [Ongoing maintenance](#13-ongoing-maintenance)
14. [Rollback procedure](#14-rollback-procedure)
15. [Troubleshooting](#15-troubleshooting)

---

## 1. What you're deploying

A Next.js 16 portfolio with:

- 13 sections (hero, services, case studies, process, tech stack, about, FAQ, blog, contact)
- 3 SEO-optimized blog posts (deep-linked via `?blog=slug`)
- Hidden admin panel at `?admin=1` (bot-trap logs + blog post creator)
- Bot-trap middleware (blocks scrapers, honeypots for `/.env`, `/wp-admin`, etc.)
- 10 security headers (CSP, HSTS, X-Frame-Options, etc.)
- Anti-inspect deterrent (right-click + F12 + Ctrl+U blocked)
- `robots.txt` + `llm.txt` + `sitemap.xml` for SEO/GEO
- Light/dark mode + mobile-first responsive

**Tech stack:** Next.js 16, TypeScript, Tailwind CSS 4, Framer Motion, shadcn/ui, Prisma (SQLite for dev).

---

## 2. Pre-deploy checklist

Before you start, make sure you have:

- [ ] A GitHub account (free)
- [ ] A Vercel account (free, sign up with GitHub at https://vercel.com)
- [ ] Git installed locally (`git --version` should work)
- [ ] SSH key set up with GitHub (test with `ssh -T git@github.com`)
- [ ] (Optional) A domain name from Namecheap (~$10/yr) — `baraarsreesha.com` recommended
- [ ] (Optional) A Cloudflare account (free) — for bot protection + CDN

### Generate a strong admin token

```bash
openssl rand -hex 32
# Copy the output — you'll paste it into Vercel env vars in step 5
```

Save this token somewhere safe. You'll need it to access the admin panel.

---

## 3. Push to GitHub

### Option A — Use the deploy script (recommended)

From the project root:

```bash
./deploy.sh
```

The script will:
1. Run pre-flight checks
2. Init a git repo (if not already)
3. Stage all files (verifies .env and node_modules are NOT staged)
4. Create a commit with a detailed message
5. Prompt you for your GitHub repo URL
6. Push to `main` branch

**Before running it**, create an empty GitHub repo:
1. Go to https://github.com/new
2. Name it `portfolio` (or whatever you like)
3. Set it to **Public** (Vercel Hobby plan works with public repos)
4. **DO NOT** initialize with README/license/.gitignore — the repo must be completely empty
5. Copy the SSH URL (looks like `git@github.com:yourusername/portfolio.git`)

### Option B — Manual

```bash
cd /home/z/my-project

# Init
git init -b main
git add -A

# Verify .env is NOT staged (critical!)
git diff --cached --name-only | grep -E "^\.env$" && echo "STOP: .env is staged!" && exit 1

# Commit
git commit -m "Portfolio v1 — Applied AI & GTM Engineer"

# Add remote + push
git remote add origin git@github.com:YOUR_USERNAME/portfolio.git
git push -u origin main
```

---

## 4. Deploy to Vercel

### Via Vercel dashboard (easiest)

1. Go to **https://vercel.com/new**
2. Sign in with GitHub
3. Click **Import** on your `portfolio` repo
4. Vercel auto-detects:
   - Framework preset: **Next.js** ✅
   - Build command: `next build` ✅
   - Output directory: `.next` ✅
   - Install command: `bun install` (or `npm install`) ✅
5. **Do NOT click Deploy yet** — expand **Environment Variables** first (see step 5)
6. Click **Deploy** → wait ~90 seconds
7. You'll get a URL like `portfolio-xxx.vercel.app` (live immediately)

### Via Vercel CLI (alternative)

```bash
npm i -g vercel
cd /home/z/my-project
vercel          # follow prompts — choose defaults
vercel --prod   # promote to production
```

---

## 5. Set environment variables

In the Vercel import screen (or later in **Project Settings → Environment Variables**), add:

| Name | Value | Environments |
|---|---|---|
| `ADMIN_TOKEN` | (the hex string from `openssl rand -hex 32`) | Production, Preview, Development |
| `DATABASE_URL` | `file:./dev.db` | Production, Preview, Development |

**That's it.** The other env vars in `.env.example` are optional.

After setting env vars on an existing project, you must **redeploy** for them to take effect:
- Vercel dashboard → Deployments → click the most recent → **Redeploy**

---

## 6. Verify the deploy

### Quick check (browser)

Open your Vercel URL (`https://portfolio-xxx.vercel.app`) — you should see the hero section with rotating taglines.

### Automated verification (recommended)

```bash
./verify.sh https://portfolio-xxx.vercel.app
```

This script runs 25+ checks covering:
- HTTP 200 on `/`
- All 10 security headers present
- `robots.txt`, `llm.txt`, `sitemap.xml` accessible
- Bot UA `curl/8.0` blocked (403)
- `SemrushBot` blocked (403)
- `Googlebot` allowed (200)
- Honeypot paths (`/.env`, `/wp-admin`) return 404
- Resume PDF serves (200)
- Blog deep links work
- Admin panel URL loads (200)
- Honeypot API hidden (404 on GET)

### Manual checks

```bash
# Security headers
curl -sI https://portfolio-xxx.vercel.app/ | head -20

# Bot block
curl -A "curl/8.0" -o /dev/null -w "%{http_code}\n" https://portfolio-xxx.vercel.app/
# → 403

# Googlebot allowed
curl -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" -o /dev/null -w "%{http_code}\n" https://portfolio-xxx.vercel.app/
# → 200

# Honeypot
curl -o /dev/null -w "%{http_code}\n" https://portfolio-xxx.vercel.app/.env
# → 404

# Admin panel
open "https://portfolio-xxx.vercel.app/?admin=1"
```

---

## 7. Custom domain

### Buy a domain (Namecheap, ~$10/yr)

1. Go to https://www.namecheap.com
2. Search for `baraarsreesha.com` (or your preferred name)
3. Buy it (~$10 for `.com`, $0.83/mo amortized)
4. Skip all the upsells (privacy protection is free, the rest is unnecessary)

### Add to Vercel

1. Vercel dashboard → your project → **Settings → Domains**
2. Enter `baraarsreesha.com` → click **Add**
3. Vercel shows you DNS records to add:

```
Type   Name  Value                    TTL
A      @     76.76.21.21              Automatic
CNAME  www   cname.vercel-dns.com     Automatic
```

4. Go to Namecheap → Domain → **Advanced DNS → Add New Record**
5. Add the records from Vercel (delete any default ones)
6. Wait 5–30 minutes for DNS propagation
7. Vercel auto-provisions SSL certificates (Let's Encrypt, free, auto-renewing)
8. Once verified, your site is live at `https://baraarsreesha.com`

### Update the canonical URLs

After the domain is live, you'll want to update references to your domain. Two places to update:

1. `public/robots.txt` — `Sitemap: https://baraarsreesha.com/sitemap.xml`
2. `public/sitemap.xml` — `<loc>https://baraarsreesha.com/...</loc>`
3. `public/llm.txt` — `> Site: https://baraarsreesha.com`

These are already set to `baraarsreesha.com` in the repo. If you bought a different domain, search-and-replace before pushing.

---

## 8. Cloudflare setup

**Optional but recommended.** Cloudflare adds DDoS protection, a WAF, bot fight mode, and a global CDN — all free. See `download/CLOUDFLARE-FREE-SETUP.md` for the full guide.

**TL;DR:**
1. Sign up at https://cloudflare.com (free)
2. Add your domain → Cloudflare gives you 2 nameservers
3. Namecheap → Domain → Nameservers → Custom DNS → paste Cloudflare's nameservers
4. Wait 10 min – 24 hr for propagation
5. In Cloudflare, enable:
   - **Security → Bots → Bot Fight Mode** (free)
   - **Security → Settings → Browser Integrity Check** (free)
   - **SSL/TLS → Overview → Full (strict)**
   - **SSL/TLS → Edge Certificates → Always Use HTTPS** + **HSTS** + **Min TLS 1.2**

Architecture after Cloudflare:
```
User → Cloudflare (DDoS + bot block + CDN + SSL) → Vercel (Next.js app)
```

---

## 9. SEO submission

### Google Search Console (free, ~5 min)

1. Go to https://search.google.com/search-console
2. Add property → URL prefix → `https://baraarsreesha.com`
3. Verify ownership:
   - **HTML tag method** (easiest): copy the meta tag → add to your site `<head>` via Vercel dashboard → Settings → Domains → Edit Site Config
   - **OR Domain method**: add a TXT record to your DNS (works through Cloudflare)
4. Submit sitemap:
   - Search Console → Sitemaps → enter `sitemap.xml` → Submit
5. Within 1–7 days, Google starts indexing. Check **Performance** tab to see impressions/clicks.

### Bing Webmaster Tools (free, ~5 min)

1. Go to https://www.bing.com/webmasters
2. Sign in with Google/Microsoft account
3. Add site → verify (same methods as Google)
4. Submit sitemap
5. Bing powers Yahoo + DuckDuckGo results, so this covers ~10% of search traffic you'd otherwise miss.

---

## 10. GEO submission

**GEO = Generative Engine Optimization** — making sure ChatGPT, Claude, Perplexity, Gemini can recommend you when someone asks.

### Your `llm.txt` is already set up

Visit `https://baraarsreesha.com/llm.txt` — you should see the structured plain-text file. It tells LLMs:
- Who you are
- What services you offer + prices
- Your case studies + metrics
- How to contact you

### Help LLM crawlers find it

Your `robots.txt` already allows: `GPTBot`, `ClaudeBot`, `PerplexityBot`, `anthropic-ai`, `ChatGPT-User`, `OAI-SearchBot`, `Applebot-Extended`, `CCBot`, `Google-Extended`.

### Test GEO within 1-2 weeks of crawling

Once your site is indexed by Google (check Search Console), test:
- ChatGPT: "What services does baraarsreesha.com offer?"
- Claude: "Find me an applied AI engineer in Bengaluru who builds Clay+n8n pipelines"
- Perplexity: "baraarsreesha.com"

If they don't mention you yet, share your `llm.txt` URL on LinkedIn — LLM crawlers discover sites via links.

### Speed up LLM discovery (optional)

- Submit your URL to **Common Crawl**: https://commoncrawl.org/contribute-to-common-crawl/ (free, gets you into the dataset most LLMs train on)
- Post your `llm.txt` link on X/LinkedIn with `#llms-txt` hashtag
- Link to your site from your GitHub profile README

---

## 11. Admin panel setup

### First-time access

1. Visit `https://baraarsreesha.com/?admin=1`
2. Modal opens with a token field pre-filled with `sreesha-secret-2026` (default — insecure)
3. Replace with the `ADMIN_TOKEN` you set in Vercel env vars (step 5)
4. Token is saved to localStorage so you don't have to re-enter on this device

### What you can do in the admin panel

**Bot trap tab:**
- View captured bot attempts (IP, UA, path, reason, timestamp)
- Refresh / clear the log

**Blog posts tab:**
- View built-in posts (read-only — edit them in `src/lib/blog-posts.ts`)
- Create new posts via markdown-lite form (`## H2`, `- bullet`, `1. numbered`, `> quote`, ` ```code``` `)
- Preview + delete your own posts
- New posts persist to browser localStorage (visible only on this device until you commit them to code)

### Promoting a user-created blog post to permanent

User-created posts live in localStorage only. To make them permanent (visible to everyone):

1. Create the post in the admin panel
2. Open browser DevTools → Application → Local Storage → `blog_posts`
3. Copy the JSON
4. Paste into `src/lib/blog-posts.ts` as a new entry in the `blogPosts` array
5. Commit + push to GitHub → Vercel auto-deploys

---

## 12. Known limitations

### Bot-trap persistence on Vercel serverless

The honeypot log writes to `/tmp/bot-attempts.jsonl` on each warm serverless instance. On Vercel:
- Each function instance has its own `/tmp`
- Cold starts lose the in-memory buffer
- Hits are spread across multiple instances

**Result:** the admin panel shows hits from the **current warm instance only**. Every hit is also `console.warn`'d to Vercel logs (visible in Vercel dashboard → Logs).

**Upgrade path for full persistence (free tier options):**

1. **Vercel KV** (free: 256MB, 30k commands/mo)
   - Sign up in Vercel dashboard → Storage → Create KV
   - Get `KV_REST_API_URL` + `KV_REST_API_TOKEN`
   - Add to env vars
   - Update `src/lib/bot-trap.ts` to use KV instead of `/tmp`

2. **Axiom** (free: 1GB/day ingestion)
   - Sign up at https://axiom.co
   - Get ingestion token
   - Pipe `console.warn` honeypot logs to Axiom via Vercel log drain
   - Query hits in Axiom's dashboard

3. **Logtail** (free: 1GB/mo) — similar to Axiom

### Anti-inspect deterrent

Blocks right-click, F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S. Determined users can bypass via browser menu → Inspect. Source maps are stripped so the original readable code can't be reconstructed from the minified bundle.

### localStorage-based blog posts

Posts created via the admin panel are stored in the browser's localStorage — they're visible only on the device that created them. To make them public, copy the JSON into `src/lib/blog-posts.ts` and redeploy (see section 11).

---

## 13. Ongoing maintenance

### Update blog posts

Edit `src/lib/blog-posts.ts` → commit → push. Vercel auto-deploys in ~90 sec.

### Update content (services, case studies, etc.)

Each section is a separate component in `src/components/portfolio/`. Edit the data arrays at the top of each file → commit → push.

### Update dependencies

```bash
cd /home/z/my-project
bun upgrade         # or: npm update
git add package.json bun.lock  # or package-lock.json
git commit -m "deps: upgrade"
git push
```

Vercel auto-installs + rebuilds.

### Monitor for security issues

- Vercel dashboard → Logs → watch for 403s (blocked bots) and 404s (honeypot hits)
- Cloudflare dashboard → Security → Events (every blocked request with reason)
- Set up Vercel alert emails for runtime errors

### Renew domain

Namecheap sends renewal emails 30/14/7 days before expiry. Auto-renew is recommended.

---

## 14. Rollback procedure

If a deploy breaks something:

### Quick rollback (Vercel dashboard)

1. Vercel dashboard → your project → **Deployments**
2. Find the last known-good deploy
3. Click the **⋯** menu → **Promote to Production**

Takes ~10 seconds. No code changes needed.

### Roll back via git

```bash
git log --oneline -10                 # find the last good commit
git revert <commit-sha>               # create a revert commit
git push                              # Vercel auto-deploys the revert
```

---

## 15. Troubleshooting

### Build fails on Vercel

**Symptom:** Deploy fails with `Module not found` or `Type error`.

**Fix:**
1. Check the build logs in Vercel dashboard → Deployments → click failed deploy
2. Most common cause: missing dependency. Run `bun install <package>` locally, commit `package.json`, push.
3. TypeScript errors: `next.config.ts` has `typescript.ignoreBuildErrors: true` — should skip TS errors. If you want strict TS, remove that line.

### Page returns 500

**Symptom:** HTTP 500 on `/` after deploy.

**Fix:**
1. Check Vercel → Logs → filter by `Error`
2. Common cause: missing env var. Verify `ADMIN_TOKEN` and `DATABASE_URL` are set in Vercel → Settings → Environment Variables
3. After adding env vars, you MUST redeploy (Vercel → Deployments → ⋯ → Redeploy)

### Admin panel says "Invalid admin token"

**Fix:** The token you typed doesn't match the `ADMIN_TOKEN` env var on Vercel. Verify by checking Vercel → Settings → Environment Variables → `ADMIN_TOKEN`. The token is case-sensitive.

### Custom domain shows "Not Verified"

**Fix:**
1. Verify DNS records are correct (use https://dnschecker.org to check propagation)
2. Cloudflare DNS changes can take 10 min – 24 hr
3. Once DNS propagates, Vercel auto-issues SSL within ~5 min
4. If stuck >24 hr, remove the domain from Vercel and re-add it

### Preview iframe shows "refused to connect"

**Fix:** Already fixed in this repo. The CSP `frame-ancestors` allows `*.space-z.ai`. If you're embedding elsewhere, add that origin to `next.config.ts` → `securityHeaders` → `Content-Security-Policy` → `frame-ancestors`.

### Bot trap not capturing hits

**Symptom:** Admin panel shows "No bots captured yet" even after a few days.

**Fix:**
1. Verify honeypot API is reachable: `curl -X POST https://baraarsreesha.com/api/honeypot -H "content-type: application/json" -d '{"path":"/test","method":"GET","ua":"test","ip":"1.1.1.1","reason":"manual-test"}'` → should return `{"ok":true,"id":"..."}`
2. Manually hit a honeypot: `curl https://baraarsreesha.com/.env` → should return 404
3. Refresh the admin panel after a few minutes (the in-memory + /tmp buffer takes a moment to sync)
4. Check Vercel → Logs → filter for `[honeypot]` to see all captured attempts

### LLMs don't know about my site

**Fix:** Patience. LLM crawlers (GPTBot, ClaudeBot) re-crawl every few weeks. Speed it up:
1. Make sure `robots.txt` allows them (already set)
2. Make sure `llm.txt` is accessible (already is)
3. Share your site on LinkedIn, GitHub, X — LLMs discover URLs via links
4. Submit to Common Crawl (free)

### Google hasn't indexed my site

**Fix:**
1. Submit sitemap in Google Search Console (see step 9)
2. Request indexing of the homepage URL: Search Console → URL Inspection → Request Indexing
3. Wait 1–7 days
4. Get a few backlinks (LinkedIn, GitHub profile, X) — Google prioritizes sites with backlinks

---

## 📞 Quick reference

| Resource | URL |
|---|---|
| Vercel dashboard | https://vercel.com/dashboard |
| Vercel logs | Vercel → your project → Logs |
| Cloudflare dashboard | https://dash.cloudflare.com |
| Google Search Console | https://search.google.com/search-console |
| Bing Webmaster Tools | https://www.bing.com/webmasters |
| Namecheap | https://www.namecheap.com |
| Your live site | https://baraarsreesha.com (after step 7) |
| Your admin panel | https://baraarsreesha.com/?admin=1 |
| Your sitemap | https://baraarsreesha.com/sitemap.xml |
| Your llm.txt | https://baraarsreesha.com/llm.txt |
| Your robots.txt | https://baraarsreesha.com/robots.txt |

---

## 💰 Total monthly cost

| Item | Cost |
|---|---|
| Domain (Namecheap, amortized) | ~$0.83/mo |
| Vercel Hobby | $0 |
| Cloudflare Free | $0 |
| Google Search Console | $0 |
| Bing Webmaster Tools | $0 |
| GitHub | $0 |
| **Total** | **~$0.83/mo** |

That's free forever for practical purposes. The only paid item is the domain registration, which is mandatory for any serious website.

---

## ✅ Final checklist

Before you call this done:

- [ ] Code pushed to GitHub
- [ ] Vercel deploy successful
- [ ] `ADMIN_TOKEN` env var set
- [ ] `./verify.sh https://your-site.vercel.app` passes all checks
- [ ] Custom domain added + verified
- [ ] DNS propagated (check with https://dnschecker.org)
- [ ] SSL auto-provisioned by Vercel
- [ ] Cloudflare set up (nameservers + Bot Fight Mode + SSL Full strict)
- [ ] Sitemap submitted to Google Search Console
- [ ] Sitemap submitted to Bing Webmaster Tools
- [ ] Admin panel accessible at `?admin=1`
- [ ] Tested on mobile (iPhone + Android if possible)
- [ ] Tested in dark mode
- [ ] LinkedIn post announcing the new site (linking to it = SEO backlink)

🎉 You're live. Welcome to the internet.
