# 📝 Blog Workflow — How to Add New Posts

This guide covers **three ways** to publish a new blog post, from fastest (admin panel) to most production-ready (commit to code).

---

## 🎯 TL;DR — pick your workflow

| Method | Time | Persistence | SEO | Best for |
|---|---|---|---|---|
| **Admin panel** (browser-only) | 2 min | Browser localStorage (only your device) | ❌ Not SSR'd | Quick drafts, personal preview |
| **Copy to code** (recommended) | 5 min | Committed to git, deploys to Vercel | ✅ Full SSR + JSON-LD | **All production posts** |
| **Markdown file import** | 10 min | Committed to git | ✅ Full SSR | Bulk imports from existing blog |

---

## 1. Admin panel (drafts only — not for production)

The admin panel at `/?admin=1` lets you create blog posts in the browser. Posts are saved to browser `localStorage` and visible **only on the device that created them**.

### Steps

1. Visit `https://yoursite.com/?admin=1`
2. Click **Blog posts** tab → **New post**
3. Fill in:
   - **Title** (required)
   - **Emoji** (e.g. `🏗️`)
   - **Category** (Tutorial / Comparison / Case Study / Opinion)
   - **Excerpt** (1-2 sentences shown on the card)
   - **SEO keywords** (comma-separated)
   - **Body** (markdown-lite format — see below)
4. Click **Publish post**
5. Refresh the homepage or blog index — your post appears with a "New" badge

### Markdown-lite body format

```
## Section heading (H2)

Paragraph text here.

### Subsection heading (H3)

- Bullet point
- Another bullet

1. Numbered step
2. Another step

> A blockquote

```bash
echo "hello world"
```

> 💡 **Tip:** Use the preview button in the admin panel to see how your post will render before publishing.

### Limitations

- ❌ Posts only exist on your device — anyone visiting from another browser won't see them
- ❌ Not server-side rendered — bad for SEO
- ❌ Lost if you clear browser data
- ✅ Great for drafting before committing to code

### Promoting a draft to production

To make a draft visible to everyone:

1. Open DevTools → Application → Local Storage → `blog_posts`
2. Copy the JSON array
3. Paste each post object into `src/lib/blog-posts.ts` (see method 2 below)
4. Commit + push → Vercel auto-deploys

---

## 2. Commit to code (recommended for production)

This is how the 3 built-in posts (`self-hosting-n8n-on-gcp-production-setup`, `langgraph-vs-crewai-vs-autogen-real-comparison`, `replace-2000-mo-apollo-zoominfo-with-clay-pipeline`) were added.

### Steps

1. Open `src/lib/blog-posts.ts` in your editor
2. Copy an existing post object as a template
3. Modify the fields (see schema below)
4. Save → commit → push to GitHub
5. Vercel auto-deploys in ~90 sec
6. Post is live at `https://yoursite.com/?blog=your-slug`

### Post schema

```typescript
{
  slug: "your-post-slug",              // URL-safe, kebab-case, unique
  title: "Your Post Title",            // Shows in card + <title>
  description: "Meta description for SEO",  // ~155 chars
  excerpt: "Short summary shown on the card",  // 1-2 sentences
  category: "Tutorial",                // "Tutorial" | "Comparison" | "Case Study" | "Opinion"
  publishedAt: "2026-06-15",           // YYYY-MM-DD
  readingTime: "8 min",                // Auto-calculated if you use the admin panel
  emoji: "🚀",                         // Any single emoji
  accent: "var(--lime)",               // "var(--lime)" | "var(--coral)" | "var(--lavender)" | "var(--amber)" | "var(--mint)"
  keywords: [                           // SEO keywords (also in llm.txt)
    "your keyword",
    "another keyword",
  ],
  author: {
    name: "Baraar Sreesha",
    role: "Applied AI & GTM Systems Engineer",
  },
  content: [
    // Array of content blocks — see block types below
    { type: "p", text: "Opening paragraph." },
    { type: "h2", text: "Section heading" },
    { type: "ul", items: ["Bullet 1", "Bullet 2"] },
    // ... etc
  ],
}
```

### Block types you can use

```typescript
// Paragraph (default text block)
{ type: "p", text: "Your paragraph text here." }

// Headings
{ type: "h2", text: "Major section heading" }
{ type: "h3", text: "Subsection heading" }

// Lists
{ type: "ul", items: ["First bullet", "Second bullet"] }
{ type: "ol", items: ["First step", "Second step"] }

// Quote
{ type: "quote", text: "The quoted text.", cite: "Optional attribution" }

// Code block (with syntax-styled window chrome)
{ type: "code", lang: "python", code: "print('hello world')" }

// Callout box (tip / warn / info — different colors)
{ type: "callout", variant: "tip", title: "Optional title", text: "Tip body text" }
{ type: "callout", variant: "warn", title: "Watch out", text: "Warning body" }
{ type: "callout", variant: "info", title: "FYI", text: "Info body" }

// Big stat highlight (for case studies)
{ type: "stat", value: "$2,000/mo → $0", label: "Subscription cost savings" }
```

### Example: a minimal new post

```typescript
{
  slug: "my-new-post",
  title: "How I built X with Y",
  description: "A short SEO-friendly description.",
  excerpt: "One-sentence summary for the blog card.",
  category: "Tutorial",
  publishedAt: "2026-07-01",
  readingTime: "5 min",
  emoji: "🎯",
  accent: "var(--lime)",
  keywords: ["how to build x", "y tutorial"],
  author: {
    name: "Baraar Sreesha",
    role: "Applied AI & GTM Systems Engineer",
  },
  content: [
    { type: "p", text: "Opening paragraph explaining what we're building." },
    { type: "h2", text: "Why this matters" },
    { type: "p", text: "Body text." },
    { type: "callout", variant: "tip", title: "Pro tip", text: "Useful advice." },
    { type: "h2", text: "Step 1 — Setup" },
    { type: "code", lang: "bash", code: "npm install something" },
    { type: "h2", text: "Conclusion" },
    { type: "p", text: "Wrapping up." },
    { type: "callout", variant: "tip", title: "Want help?", text: "Book a call." },
  ],
}
```

### Slug best practices

- ✅ `self-hosting-n8n-on-gcp-production-setup` — descriptive, kebab-case
- ✅ `langgraph-vs-crewai-vs-autogen-real-comparison` — keyword-rich
- ❌ `post-1` — too generic
- ❌ `My Post Title!!` — not URL-safe

The slug becomes the URL: `https://yoursite.com/?blog=your-slug`. Make it shareable, memorable, and SEO-friendly (include keywords).

### Reading time calculation

If you commit to code, you set reading time manually. Rough formula:

```
word_count = body_text.split(/\s+/).length
reading_time = Math.max(1, Math.round(word_count / 200)) + " min"
```

Or use the admin panel to draft the post — it auto-calculates reading time — then promote to code.

---

## 3. Markdown file import (for bulk imports)

If you already have blog posts as `.md` files (e.g. from a previous blog), you can convert them to the structured format with a script.

### Quick converter script

Save this as `scripts/convert-md-to-post.ts` and run with `bun scripts/convert-md-to-post.ts path/to/post.md`:

```typescript
import { readFileSync, writeFileSync } from "fs";

const file = process.argv[2];
if (!file) {
  console.error("Usage: bun scripts/convert-md-to-post.ts <markdown-file>");
  process.exit(1);
}

const md = readFileSync(file, "utf-8");
const lines = md.split("\n");

// Extract frontmatter (between --- and ---)
const fmMatch = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
let title = "Untitled";
let slug = "untitled";
let publishedAt = new Date().toISOString().split("T")[0];
let body = md;

if (fmMatch) {
  const fm = fmMatch[1];
  body = fmMatch[2];
  const titleMatch = fm.match(/title:\s*"([^"]+)"/);
  if (titleMatch) title = titleMatch[1];
  const slugMatch = fm.match(/slug:\s*"([^"]+)"/);
  if (slugMatch) slug = slugMatch[1];
  const dateMatch = fm.match(/date:\s*"([^"]+)"/);
  if (dateMatch) publishedAt = dateMatch[1];
}

// Convert markdown to blocks
const blocks = [];
const bodyLines = body.split("\n");
let i = 0;
while (i < bodyLines.length) {
  const line = bodyLines[i].trim();
  if (!line) { i++; continue; }

  if (line.startsWith("## ")) {
    blocks.push({ type: "h2", text: line.slice(3) });
    i++;
  } else if (line.startsWith("### ")) {
    blocks.push({ type: "h3", text: line.slice(4) });
    i++;
  } else if (line.startsWith("> ")) {
    blocks.push({ type: "quote", text: line.slice(2) });
    i++;
  } else if (line.startsWith("- ") || line.startsWith("* ")) {
    const items = [];
    while (i < bodyLines.length && (bodyLines[i].trim().startsWith("- ") || bodyLines[i].trim().startsWith("* "))) {
      items.push(bodyLines[i].trim().slice(2));
      i++;
    }
    blocks.push({ type: "ul", items });
  } else if (/^\d+\.\s/.test(line)) {
    const items = [];
    while (i < bodyLines.length && /^\d+\.\s/.test(bodyLines[i].trim())) {
      items.push(bodyLines[i].trim().replace(/^\d+\.\s/, ""));
      i++;
    }
    blocks.push({ type: "ol", items });
  } else if (line.startsWith("```")) {
    const lang = line.slice(3).trim();
    const codeLines = [];
    i++;
    while (i < bodyLines.length && !bodyLines[i].startsWith("```")) {
      codeLines.push(bodyLines[i]);
      i++;
    }
    i++;
    blocks.push({ type: "code", lang: lang || undefined, code: codeLines.join("\n") });
  } else {
    blocks.push({ type: "p", text: line });
    i++;
  }
}

const wordCount = body.split(/\s+/).length;
const readingTime = `${Math.max(1, Math.round(wordCount / 200))} min`;

const post = {
  slug: slug || title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").slice(0, 80),
  title,
  description: title,
  excerpt: blocks.find(b => b.type === "p")?.text || title,
  category: "Tutorial",
  publishedAt,
  readingTime,
  emoji: "📝",
  accent: "var(--lime)",
  keywords: [],
  author: { name: "Baraar Sreesha", role: "Applied AI & GTM Systems Engineer" },
  content: blocks,
};

console.log("Converted post:");
console.log(JSON.stringify(post, null, 2));
console.log("\nCopy this object into src/lib/blog-posts.ts");
```

---

## 📐 Anatomy of a great blog post

### Title (60-70 chars)

- Include 1-2 primary keywords
- Be specific (numbers, frameworks, outcomes)
- ✅ "Self-hosting n8n on GCP: A production setup with Docker, PostgreSQL, and Nginx"
- ❌ "n8n on GCP"

### Description / Meta description (150-160 chars)

- Restate the value prop in different words
- Include keywords Google might rank you for
- ✅ "Step-by-step guide to deploying n8n on Google Cloud Platform with Docker Compose, PostgreSQL, Nginx, and free Let's Encrypt SSL. Replaces $500+/mo SaaS subscriptions."

### Excerpt (1-2 sentences)

- Hook the reader in 1-2 sentences
- Promise a specific outcome
- ✅ "I replaced $500+/month in SaaS automation subscriptions with a self-hosted n8n instance on GCP. Here's the exact setup, plus the 3 mistakes I made so you don't have to."

### Body structure

1. **Hook paragraph** — why this matters, who it's for
2. **What you'll need** — prerequisites list
3. **Numbered steps** — H2 per step, code blocks for commands
4. **Callouts** — tip / warn / info boxes for emphasis
5. **Results / metrics** — stat blocks with numbers
6. **What NOT to do** — common pitfalls
7. **CTA at the end** — book a call, subscribe, etc.

### Keywords (5-10)

Mix of:
- Primary keyword ("self-host n8n")
- Secondary keywords ("n8n GCP", "n8n Docker Compose")
- Long-tail ("n8n vs Zapier cost comparison")

---

## 🔍 SEO checklist per post

Before committing a new post, verify:

- [ ] Slug is URL-safe and includes a primary keyword
- [ ] Title is 60-70 chars and includes the keyword
- [ ] Description is 150-160 chars and includes the keyword
- [ ] Excerpt is 1-2 sentences with a clear hook
- [ ] At least 1 H2 per ~200 words (helps Google parse structure)
- [ ] At least 1 code block or stat block (Google loves structured content)
- [ ] Keywords array has 5-10 entries
- [ ] Reading time is accurate (word count / 200)
- [ ] Published date is correct (YYYY-MM-DD)
- [ ] No typos (run `bun run lint` to catch syntax issues)
- [ ] Test the URL `https://yoursite.com/?blog=your-slug` works after deploy
- [ ] Test the JSON-LD: open DevTools → Elements → search for `application/ld+json`

### Verify SEO after deploy

```bash
# Check the meta tags are SSR'd
curl -s https://yoursite.com/?blog=your-slug | grep -E "<title|description|og:"

# Check JSON-LD is present
curl -s https://yoursite.com/?blog=your-slug | grep "application/ld+json"

# Check the article shows in sitemap
curl -s https://yoursite.com/sitemap.xml | grep your-slug
```

---

## 📅 Content calendar suggestions

Based on Sreesha's existing content + ICP, here are post ideas ranked by SEO opportunity:

### Tier 1 — High search volume, high intent

1. **"LangGraph tutorial: build a production multi-agent system"** (Tutorial)
2. **"Clay enrichment guide: from CSV to CRM-ready leads"** (Tutorial)
3. **"RAG vs fine-tuning: when to use each"** (Comparison)
4. **"n8n vs Zapier vs Make: 2026 comparison"** (Comparison)
5. **"Best vector database for RAG: Qdrant vs Pinecone vs FAISS"** (Comparison)

### Tier 2 — Case studies (lower volume, higher intent)

6. **"How I built a Clay + n8n + HubSpot outbound engine for a SaaS sales team"** (Case Study)
7. **"Enterprise RAG deployment: 500+ PDFs, citation grounding, FastAPI"** (Case Study)
8. **"OCR pipeline for regulated finance: Hyderabad Forex case study"** (Case Study)

### Tier 3 — Opinion / thought leadership

9. **"Why 95% of AI automations will break in Q3 2026"** (Opinion)
10. **"Forward-deployed AI engineering: what it actually means"** (Opinion)
11. **"Fractional AI engineer vs full-time hire: the math"** (Opinion)

### Posting cadence

- **Tier 1:** 1 post / month (high effort, high reward)
- **Tier 2:** 1 post / month (medium effort, reinforces portfolio)
- **Tier 3:** 1 post / 2 months (low effort, builds voice)

Total: ~2 posts / month = 24 posts / year. After 12 months, you'll have a content moat that ranks for dozens of long-tail AI engineering keywords.

---

## 🚀 Promotion checklist (per post)

After publishing a new post:

1. **Share on LinkedIn** with a 1-paragraph teaser + the URL
2. **Share on X/Twitter** with a punchy hook + the URL
3. **Submit to Hacker News** (if it's a Tutorial or Comparison — they love technical content)
4. **Submit to Reddit** — r/MachineLearning, r/LangChain, r/n8n, r/salesforce, etc.
5. **Pin to GitHub profile README** — link the post URL
6. **Cross-link from older posts** — add a "Related: [new post]" callout in existing posts
7. **Add to `llm.txt`** — append the post URL + 1-line summary at the bottom of `public/llm.txt`
8. **Re-submit sitemap** to Google Search Console after publishing

---

## 🛠️ Maintenance

### Update an existing post

1. Find the post in `src/lib/blog-posts.ts` by slug
2. Edit the content blocks
3. Update `publishedAt` if it's a major revision (otherwise leave it)
4. Commit + push → Vercel auto-deploys

### Delete a post

1. Remove the post object from `src/lib/blog-posts.ts`
2. Update `public/sitemap.xml` to remove the URL
3. Update `public/llm.txt` to remove the link
4. (Optional) Add a 301 redirect in `next.config.ts` if the URL has backlinks

### Check what's ranking

- Google Search Console → Performance → filter by URL containing `?blog=`
- See impressions, clicks, CTR, average position
- Double down on what's working

---

## ❓ FAQ

**Q: Can I schedule posts for future dates?**
A: Not currently. Posts appear as soon as you commit them. For scheduling, set `publishedAt` to a future date and add a check in `page.tsx` to hide posts where `publishedAt > today`. Or use Vercel's deploy hooks to schedule commits.

**Q: How do I add images to posts?**
A: Drop the image in `public/blog/your-post-slug/image-name.png`, then reference it in a paragraph block: `{ type: "p", text: "![Alt text](/blog/your-post-slug/image-name.png)" }`. Markdown images are not yet parsed — you'd need to add a new block type `{ type: "image", src, alt, caption }` and render it in `BlogBlockView`.

**Q: Can I add a custom domain per blog post?**
A: No — all posts live at `/?blog=slug`. For custom URLs, you'd need to migrate to Next.js dynamic routes (`/blog/[slug]`) which requires multiple files. The current pattern is fine for SEO — Google treats `?blog=slug` URLs as unique pages.

**Q: How do I see analytics per post?**
A: Enable Vercel Analytics (free) in the Vercel dashboard. Then add `export const analytics = true` to the top of `page.tsx`. You'll see per-URL page views in the Vercel dashboard.

**Q: Can I export all posts to markdown?**
A: Not yet. Add a script that iterates `blogPosts` and writes each as a `.md` file with frontmatter. Useful for backups or migrating to another platform.
