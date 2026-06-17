# 🪨 Caveman Guide — Token Setup + Vercel Deploy

Ugg. This guide for portfolio site. Two part:
1. **Token setup** — what go in `.env`, where get token, which one need, which one skip.
2. **Vercel deploy** — step path to put site live. Me NOT push button for you. Me only draw map. You walk.

Site is **Next.js 16** portfolio. It have hidden admin panel, bot-trap, blog, analytics. Most of it run with **zero** token. Only one token really matter. Rest is optional shiny rock.

---

## PART 1 — TOKENS / ENV VARS 🔥

### What env vars exist (and which code actually read them)

Me read the rock walls (the code). Here truth — not all vars in `.env.example` are real. Some just notes for future. This table is the truth:

| Var | Need it? | Code actually read it? | What it do |
|-----|----------|------------------------|------------|
| `DATABASE_URL` | ✅ Yes (build) | Yes — `prisma/schema.prisma`, `src/lib/db.ts` | Prisma database string. Default SQLite file. |
| `ADMIN_TOKEN` | ✅ **Yes (important)** | Yes — `src/app/api/admin/*/route.ts` | Password for hidden admin panel + analytics API. |
| `KV_REST_API_URL` | 🟡 Optional | Yes — `src/lib/storage.ts` | Vercel KV for persistent bot-trap + analytics. |
| `KV_REST_API_TOKEN` | 🟡 Optional | Yes — `src/lib/storage.ts` | Pair with KV URL above. |
| `AXIOM_TOKEN` | ⚪ Skip | **No** — only a comment | Future log sink. Not wired. Ignore for now. |
| `CALENDLY_URL` | ⚪ Skip | **No** — link hardcoded | Calendly link lives in code (`contact.tsx`). |
| `PLAUSIBLE_DOMAIN` | ⚪ Skip | **No** | Future analytics. Not wired. |

**Short version:** you MUST set `ADMIN_TOKEN`. You SHOULD keep `DATABASE_URL`. Everything else = optional or not-yet-real.

---

### 🔑 Token 1 — `ADMIN_TOKEN` (the one that matter)

This is the password to your hidden admin panel at `yoursite.com/?admin=1`.

⚠️ **Big danger:** if you do NOT set this, the code fall back to a **public default** `sreesha-secret-2026` (it written right in `src/components/portfolio/admin-panel.tsx` and the API routes). Anyone who read your code can open your admin panel. So you MUST set a real one before going live.

**Make strong token:**
```bash
openssl rand -hex 32
```
Copy the long output. That is your `ADMIN_TOKEN`.

**How it work (so you not confused later):**
- Server checks `process.env.ADMIN_TOKEN`.
- You open the panel at `/?admin=1`. The panel shows a token box.
- You type your real token into the box. It saved to your browser `localStorage` and sent as `?token=...` on every admin API call.
- If token match the server's `ADMIN_TOKEN`, you in. If not, `401`.

---

### 🗄️ Token 2 — `DATABASE_URL` (keep default, mostly)

```bash
DATABASE_URL=file:./dev.db
```

For this portfolio, SQLite default is fine — the live site does NOT depend on the DB for its main pages.

⚠️ **Cave truth about Vercel + SQLite:** Vercel runs serverless. The file system is **read-only + ephemeral**. A `file:./dev.db` SQLite DB will NOT save new data between requests on Vercel. For a portfolio that's okay (no real DB writes needed). If one day you want real persistent data, swap to Postgres (Neon / Supabase / Vercel Postgres) and put that connection string here instead.

---

### 🤖 Token 3 + 4 — `KV_REST_API_URL` + `KV_REST_API_TOKEN` (optional)

These power **persistent** bot-trap logs + analytics across serverless instances. Without them, the bot-trap still works — but only "in memory" per warm instance (data resets when the instance sleeps). The code degrades gracefully: see `src/lib/storage.ts` — `hasKV` is false → it just skips KV.

**If you want persistence:**
1. Vercel dashboard → your project → **Storage** → create a **KV** (Upstash Redis) store (free tier ~256MB).
2. Vercel auto-injects `KV_REST_API_URL` and `KV_REST_API_TOKEN` into your project env. You usually don't paste these by hand — Vercel links them when you create the store.

Skip this for v1. Add later if you care about keeping bot logs.

---

### Your `.env` for local dev (minimum)

Make a `.env` file in project root (it already exist). Minimum content:
```bash
DATABASE_URL=file:./dev.db
ADMIN_TOKEN=<paste output of: openssl rand -hex 32>
```

🔒 **Never commit real `.env`.** Check `.gitignore` already ignore it (it does). The `.env.example` is the safe template you DO commit.

---

## PART 2 — DEPLOY TO VERCEL 🚀 (the map — you walk it)

You need: a **GitHub account** + a **Vercel account** (sign in with GitHub, free Hobby plan). That's it.

### Step 0 — Pre-flight check (do local first)

```bash
# install deps (project uses bun, npm also fine)
bun install        # or: npm install

# make sure it builds clean
bun run build      # or: npm run build
```
If build pass on your machine, it pass on Vercel. If it break, fix before deploy.

> Note: `next.config.ts` has `typescript.ignoreBuildErrors: true` and `output: "standalone"`. Vercel handles Next.js natively — you do NOT need the custom `build`/`start` scripts in `package.json` (those are for self-hosting). Vercel will just run `next build` and serve it.

---

### Step 1 — Push code to GitHub

```bash
# if not already a remote repo, make one on github.com first, then:
git add -A
git commit -m "Portfolio ready for deploy"
git branch -M main
git remote add origin git@github.com:<your-username>/<your-repo>.git   # skip if remote exists
git push -u origin main
```

✅ Double-check the real `.env` did NOT get pushed (`git status` should not list it; `.gitignore` covers it).

---

### Step 2 — Import project into Vercel

1. Go to **https://vercel.com/new**.
2. Click **Import Git Repository** → pick your repo.
3. Vercel auto-detects **Next.js**. Leave defaults:
   - Framework Preset: **Next.js**
   - Build Command: *(leave default — `next build`)*
   - Output / Install: *(leave default)*
4. **Do NOT click Deploy yet.** First open the **Environment Variables** section (next step). If you already clicked deploy, no problem — add env vars after, then redeploy.

---

### Step 3 — Set Environment Variables in Vercel

In the import screen (or later: Project → **Settings** → **Environment Variables**), add:

| Name | Value | Environments |
|------|-------|--------------|
| `ADMIN_TOKEN` | *(your `openssl rand -hex 32` output)* | Production, Preview, Development |
| `DATABASE_URL` | `file:./dev.db` | Production, Preview, Development |

That is the **minimum**. Optional KV vars get added automatically if you create a KV store (Part 1, Token 3+4).

⚠️ Set `ADMIN_TOKEN` to a **fresh** random value here — do NOT reuse the one you may have shown anyone. This is the live password.

---

### Step 4 — Deploy

Click **Deploy**. Wait ~1–2 min. Vercel gives you a URL like `your-project.vercel.app`.

If you added env vars AFTER the first deploy, go to **Deployments** → latest → **⋯** → **Redeploy** so the new env vars take effect.

---

### Step 5 — Verify it live

- Open `https://your-project.vercel.app` → portfolio should load.
- Open `https://your-project.vercel.app/?admin=1` → admin panel modal opens. Paste your `ADMIN_TOKEN` into the token box → data should load (not `401`).
- Check `https://your-project.vercel.app/robots.txt`, `/sitemap.xml`, `/llm.txt` → should return content (SEO/GEO files).

There is a `verify.sh` in the repo — you can read it for a fuller smoke-test checklist.

---

### Step 6 — Custom domain (optional)

1. Buy domain (Namecheap, Cloudflare, etc.).
2. Vercel: Project → **Settings** → **Domains** → add `yourdomain.com`.
3. Vercel shows DNS records. Add them at your registrar (usually an `A` record to Vercel IP + `CNAME` for `www`). Vercel auto-issues HTTPS.
4. Wait for DNS (minutes to a few hours).

The repo's bigger `DEPLOYMENT.md` has extra optional steps (Cloudflare CDN/bot-shield, Google/Bing search submission, LLM crawler submission). Read that when you ready for the fancy stuff.

---

## 🪨 Recap (caveman one-breath version)

1. `openssl rand -hex 32` → that is `ADMIN_TOKEN`. **Must set.**
2. Keep `DATABASE_URL=file:./dev.db`. Fine for portfolio.
3. KV / Axiom / Calendly / Plausible = optional or not-wired. Skip for v1.
4. `bun run build` local → push to GitHub.
5. Vercel → import repo → add `ADMIN_TOKEN` + `DATABASE_URL` env vars → Deploy.
6. Visit site, test `/?admin=1` with your token, check `/robots.txt` `/sitemap.xml` `/llm.txt`.
7. (Optional) add custom domain.

Done. Site live. You smart caveman now. 🔥
