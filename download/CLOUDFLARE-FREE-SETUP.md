# Cloudflare free-tier setup for the Baraar Sreesha portfolio

**Cost: $0 forever.** Cloudflare's free plan covers everything a personal portfolio needs.

## What you get on the free tier

| Feature | Free tier |
|---|---|
| DDoS protection (unmetered) | ✅ |
| Bot Fight Mode (basic bot blocking) | ✅ |
| WAF custom rules | 3 rules |
| SSL/TLS (auto-renewing) | ✅ |
| CDN + edge caching (unlimited bandwidth) | ✅ |
| Page Rules | 3 |
| Analytics (traffic + threat intel) | ✅ |
| Cloudflare Turnstile (CAPTCHA replacement) | ✅ unlimited |

You do **NOT** need the Pro plan ($25/mo) for a portfolio.

---

## Step-by-step setup (~10 min)

### 1. Create a free Cloudflare account
- Go to **cloudflare.com → Sign Up** (email + password, free)

### 2. Add your domain
- Dashboard → **Add a Site**
- Enter `baraarsreesha.com` (you must own this — buy on Namecheap ~$10/yr first)
- Cloudflare scans your DNS records and imports them automatically

### 3. Change your nameservers
- Cloudflare gives you 2 nameservers like `kai.ns.cloudflare.com` + `lucy.ns.cloudflare.com`
- Log into Namecheap → Domain → Nameservers → Custom DNS → paste the 2 Cloudflare nameservers
- Wait 10 min – 24 hr for propagation (Cloudflare emails you when active)

### 4. Enable the security features (free)
Once Cloudflare says your site is active, go to:

| Setting | Where | What to turn on |
|---|---|---|
| **Bot Fight Mode** | Security → Bots | Toggle ON (free) — blocks known bots automatically |
| **Browser Integrity Check** | Security → Settings | Toggle ON — blocks headless browsers w/o real browser fingerprint |
| **Challenge Passage** | Security → Settings | 30 min — bots solving one challenge stay challenged |
| **SSL/TLS** | SSL/TLS → Overview | Set to **Full (strict)** — end-to-end HTTPS |
| **Always Use HTTPS** | SSL/TLS → Edge Certificates | Toggle ON |
| **HSTS** | SSL/TLS → Edge Certificates | Toggle ON (enables preload list) |
| **Min TLS 1.2** | SSL/TLS → Edge Certificates | Toggle ON |
| **Automatic HTTPS Rewrites** | SSL/TLS → Edge Certificates | Toggle ON |

### 5. Add a WAF rule to block more bots (free, 1 of 3 rules used)
- **Security → WAF → Custom rules → Create rule**
- Rule name: `Block SEO scrapers`
- Field: `User Agent` → `contains` → `SemrushBot|AhrefsBot|MJ12bot|DotBot|PetalBot|Bytespider`
- Action: **Block**
- Deploy

### 6. (Optional) Cloudflare Turnstile on your contact form
If you add a contact form later and want free spam protection:

1. Cloudflare dashboard → **Turnstile → Add site** (free, unlimited)
2. Copy the **site key** (public) and **secret key** (private)
3. Add to `.env`:
   ```
   TURNSTILE_SITE_KEY=your-site-key
   TURNSTILE_SECRET_KEY=your-secret-key
   ```
4. Embed the widget on your form per docs: https://developers.cloudflare.com/turnstile/

---

## How Cloudflare works with Vercel

Your setup will be:

```
User → Cloudflare (DDoS + bot block + CDN + SSL) → Vercel (Next.js app)
```

Cloudflare is your **DNS + edge**. Vercel is your **host**. They talk to each other perfectly — no conflict.

**Important:** In Cloudflare DNS, set your Vercel domain as a `CNAME` to `cname.vercel-dns.com` (Vercel will tell you the exact value when you add the custom domain in Vercel dashboard). Keep Cloudflare proxy ON (orange cloud ☁️).

---

## Verify it's working

After setup, run these checks:

1. **Security headers**: `curl -sI https://baraarsreesha.com/ | head -30` — should show all your CSP / X-Frame-Options headers (from your `next.config.ts`) PLUS `cf-ray` and `server: cloudflare`
2. **Bot block**: `curl -A "SemrushBot" https://baraarsreesha.com/` — should return 403
3. **Honeypot**: `curl https://baraarsreesha.com/.env` — should return 404 (and show up in your admin panel)
4. **Admin panel**: visit `https://baraarsreesha.com/?admin=1` — enter your ADMIN_TOKEN → see the bot attempts captured by your in-app honeypot

---

## Threat intel — what to look at in Cloudflare analytics

- **Security → Events** — every blocked request, with the reason (Bot Fight Mode, WAF rule, etc.)
- **Analytics → Traffic** — total requests, threats blocked, cached vs uncached
- **Security → Bots** — bot-vs-human traffic split over time

For a personal portfolio, you'll typically see:
- 95% legit traffic (humans, Googlebot, social previews)
- 5% bot traffic (scrapers, scanners, vuln-seekers) — all blocked at the edge before they hit your app

---

## Total monthly cost after this setup

| Item | Cost |
|---|---|
| Domain (Namecheap) | ~$10/yr (~$0.83/mo) |
| Cloudflare Free | $0 |
| Vercel Hobby | $0 |
| Email (Gmail forwarding) | $0 |
| **Total** | **~$0.83/mo** |

That's free forever for practical purposes. You're paying only for the domain registration.
