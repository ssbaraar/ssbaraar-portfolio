"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  X,
  RefreshCw,
  Trash2,
  AlertTriangle,
  Bot,
  Lock,
  ExternalLink,
  FileText,
  Plus,
  Eye,
  Save,
  Sparkles,
} from "lucide-react";
import { blogPosts, type BlogPost, type BlogBlock } from "@/lib/blog-posts";

type Attempt = {
  id: string;
  ts: number;
  ip: string | null;
  method: string;
  path: string;
  ua: string | null;
  reason: string;
  blocked: boolean;
};

const DEFAULT_TOKEN = "sreesha-secret-2026";

// ─── Stored blog post helpers ────────────────────────────────────────────────
const STORAGE_KEY = "blog_posts";

type StoredPost = BlogPost & { _stored?: boolean };

function loadStoredPosts(): StoredPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredPost[];
  } catch {
    return [];
  }
}

function saveStoredPosts(posts: StoredPost[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ─── Bot trap panel ─────────────────────────────────────────────────────────
function BotTrapPanel({
  token,
}: {
  token: string;
}) {
  const [attempts, setAttempts] = React.useState<Attempt[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchAttempts = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/bot-attempts?token=${encodeURIComponent(token)}&limit=100`
      );
      if (!res.ok) {
        if (res.status === 401) throw new Error("Invalid admin token");
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      setAttempts(data.attempts || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const clearAttempts = React.useCallback(async () => {
    if (!confirm("Clear all captured bot attempts? This cannot be undone."))
      return;
    setLoading(true);
    try {
      await fetch(`/api/admin/bot-attempts?token=${encodeURIComponent(token)}`, {
        method: "DELETE",
      });
      setAttempts([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  React.useEffect(() => {
    fetchAttempts();
  }, []);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Actions */}
      <div className="flex items-center justify-between gap-2 border-b border-border bg-secondary/30 p-3 sm:p-4">
        <div className="text-xs text-muted-foreground">
          {attempts.length} captured attempt{attempts.length === 1 ? "" : "s"}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={fetchAttempts}
            disabled={loading}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-semibold text-background disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            type="button"
            onClick={clearAttempts}
            disabled={loading || attempts.length === 0}
            aria-label="Clear log"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-coral disabled:opacity-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="pretty-scroll flex-1 overflow-y-auto p-3 sm:p-4">
        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-2xl border border-coral/40 bg-coral/5 p-4 text-sm">
            <AlertTriangle className="h-4 w-4 text-coral" />
            <span>{error}</span>
          </div>
        )}

        {!error && attempts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
              <Bot className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="font-display text-base font-semibold">
              No bots captured yet
            </h3>
            <p className="mt-1 max-w-sm text-xs text-muted-foreground">
              Once scanners start poking at{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 font-mono-jb text-xs">
                /.env
              </code>{" "}
              or{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 font-mono-jb text-xs">
                /wp-admin
              </code>
              , they&apos;ll show up here.
            </p>
          </div>
        )}

        {attempts.length > 0 && (
          <ul className="space-y-2">
            {attempts.map((a) => (
              <li
                key={a.id}
                className="rounded-2xl border border-border bg-background/60 p-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      a.blocked
                        ? "bg-coral/10 text-coral"
                        : "bg-lime/10 text-foreground"
                    }`}
                  >
                    {a.blocked ? "BLOCKED" : "LOGGED"}
                  </span>
                  <span className="font-mono-jb text-xs font-semibold">
                    {a.method}
                  </span>
                  <span className="font-mono-jb text-xs text-foreground/90">
                    {a.path}
                  </span>
                  <span className="ml-auto font-mono-jb text-[10px] text-muted-foreground">
                    {new Date(a.ts).toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-1 text-xs text-muted-foreground sm:grid-cols-2">
                  <div>
                    <span className="font-mono-jb text-[10px] uppercase">
                      reason:{" "}
                    </span>
                    <span className="font-mono-jb">{a.reason}</span>
                  </div>
                  <div>
                    <span className="font-mono-jb text-[10px] uppercase">
                      ip:{" "}
                    </span>
                    <span className="font-mono-jb">{a.ip || "?"}</span>
                  </div>
                  {a.ua && (
                    <div className="col-span-full truncate">
                      <span className="font-mono-jb text-[10px] uppercase">
                        ua:{" "}
                      </span>
                      <span className="font-mono-jb text-foreground/70">
                        {a.ua}
                      </span>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ─── Blog management panel ──────────────────────────────────────────────────
function BlogPanel() {
  const [stored, setStored] = React.useState<StoredPost[]>([]);
  const [showForm, setShowForm] = React.useState(false);
  const [previewPost, setPreviewPost] = React.useState<StoredPost | null>(null);

  // Form state
  const [title, setTitle] = React.useState("");
  const [excerpt, setExcerpt] = React.useState("");
  const [category, setCategory] = React.useState<BlogPost["category"]>("Tutorial");
  const [emoji, setEmoji] = React.useState("📝");
  const [bodyText, setBodyText] = React.useState("");
  const [keywords, setKeywords] = React.useState("");

  React.useEffect(() => {
    setStored(loadStoredPosts());
  }, []);

  const refresh = () => setStored(loadStoredPosts());

  const handleSave = () => {
    if (!title.trim() || !bodyText.trim()) {
      alert("Title and body are required.");
      return;
    }
    // Parse the body text into blocks. Simple markdown-ish format:
    //   ## H2 heading
    //   ### H3 heading
    //   > quote
    //   - bullet item (consecutive lines become a list)
    //   1. numbered item
    //   ```code``` (fenced block)
    //   plain text → paragraph
    const lines = bodyText.split("\n");
    const blocks: BlogBlock[] = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();
      if (!trimmed) {
        i++;
        continue;
      }
      if (trimmed.startsWith("### ")) {
        blocks.push({ type: "h3", text: trimmed.slice(4) });
        i++;
      } else if (trimmed.startsWith("## ")) {
        blocks.push({ type: "h2", text: trimmed.slice(3) });
        i++;
      } else if (trimmed.startsWith("> ")) {
        blocks.push({ type: "quote", text: trimmed.slice(2) });
        i++;
      } else if (trimmed.startsWith("```")) {
        const lang = trimmed.slice(3).trim();
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        i++; // skip closing ```
        blocks.push({ type: "code", lang: lang || undefined, code: codeLines.join("\n") });
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const items: string[] = [];
        while (
          i < lines.length &&
          (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))
        ) {
          items.push(lines[i].trim().slice(2));
          i++;
        }
        blocks.push({ type: "ul", items });
      } else if (/^\d+\.\s/.test(trimmed)) {
        const items: string[] = [];
        while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
          items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
          i++;
        }
        blocks.push({ type: "ol", items });
      } else {
        blocks.push({ type: "p", text: trimmed });
        i++;
      }
    }

    const wordCount = bodyText.split(/\s+/).length;
    const readingTime = `${Math.max(1, Math.round(wordCount / 200))} min`;

    const post: StoredPost = {
      slug: slugify(title) || `post-${Date.now()}`,
      title: title.trim(),
      description: excerpt.trim() || title.trim(),
      excerpt: excerpt.trim() || title.trim(),
      category,
      publishedAt: new Date().toISOString().split("T")[0],
      readingTime,
      emoji: emoji || "📝",
      accent: "var(--lime)",
      keywords: keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
      author: {
        name: "Baraar Sreesha",
        role: "Applied AI & GTM Systems Engineer",
      },
      content: blocks,
      _stored: true,
    };

    const next = [post, ...loadStoredPosts()];
    saveStoredPosts(next);
    setStored(next);

    // Reset form
    setTitle("");
    setExcerpt("");
    setEmoji("📝");
    setBodyText("");
    setKeywords("");
    setShowForm(false);

    alert(`✅ Published "${post.title}". Refresh the blog section to see it.`);
  };

  const handleDelete = (slug: string) => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    const next = loadStoredPosts().filter((p) => p.slug !== slug);
    saveStoredPosts(next);
    setStored(next);
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Actions */}
      <div className="flex items-center justify-between gap-2 border-b border-border bg-secondary/30 p-3 sm:p-4">
        <div className="text-xs text-muted-foreground">
          {stored.length} user-post{stored.length === 1 ? "" : "s"} ·{" "}
          {blogPosts.length} built-in
        </div>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-semibold text-background"
        >
          {showForm ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
          {showForm ? "Cancel" : "New post"}
        </button>
      </div>

      <div className="pretty-scroll flex-1 overflow-y-auto p-3 sm:p-4">
        {/* New post form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 overflow-hidden"
            >
              <div className="rounded-2xl border border-border bg-background/60 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider">
                    New blog post
                  </h3>
                </div>

                <div className="grid gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Self-hosting n8n on GCP: a production setup"
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-muted-foreground">
                        Emoji
                      </label>
                      <input
                        type="text"
                        value={emoji}
                        onChange={(e) => setEmoji(e.target.value)}
                        maxLength={4}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                      <label className="mb-1 block text-xs font-medium text-muted-foreground">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) =>
                          setCategory(e.target.value as BlogPost["category"])
                        }
                        className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                      >
                        <option>Tutorial</option>
                        <option>Comparison</option>
                        <option>Case Study</option>
                        <option>Opinion</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">
                      Excerpt (1-2 sentences shown on the card)
                    </label>
                    <textarea
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      rows={2}
                      placeholder="A short summary of what the reader will learn."
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">
                      SEO keywords (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="n8n GCP, self-host n8n, Docker Compose"
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">
                      Body * (markdown-lite)
                    </label>
                    <textarea
                      value={bodyText}
                      onChange={(e) => setBodyText(e.target.value)}
                      rows={10}
                      placeholder={`## Section heading

Paragraph text here.

- Bullet point
- Another bullet

\`\`\`bash
echo "hello"
\`\`\`

1. Numbered step
2. Another step`}
                      className="pretty-scroll w-full rounded-xl border border-border bg-background px-3 py-2 font-mono-jb text-xs leading-relaxed outline-none focus:border-primary"
                    />
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Supports: <code>## H2</code>, <code>### H3</code>,{" "}
                      <code>- bullet</code>, <code>1. numbered</code>,{" "}
                      <code>&gt; quote</code>, <code>```code```</code>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleSave}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background"
                  >
                    <Save className="h-4 w-4" />
                    Publish post
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User posts list */}
        {stored.length > 0 && (
          <div className="mb-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Your posts
            </div>
            <ul className="space-y-2">
              {stored.map((p) => (
                <li
                  key={p.slug}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-background/60 p-3"
                >
                  <span className="text-xl">{p.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">
                      {p.title}
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                      <span>{p.category}</span>
                      <span>·</span>
                      <span>{p.readingTime}</span>
                      <span>·</span>
                      <span className="font-mono-jb">{p.publishedAt}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => setPreviewPost(p)}
                      aria-label="Preview"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-secondary"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(p.slug)}
                      aria-label="Delete"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-coral hover:bg-coral/5"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Built-in posts (read-only) */}
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Built-in posts (read-only · edit in src/lib/blog-posts.ts)
          </div>
          <ul className="space-y-2">
            {blogPosts.map((p) => (
              <li
                key={p.slug}
                className="flex items-start gap-3 rounded-2xl border border-border bg-background/40 p-3 opacity-80"
              >
                <span className="text-xl">{p.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{p.title}</div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                    <span>{p.category}</span>
                    <span>·</span>
                    <span>{p.readingTime}</span>
                    <span>·</span>
                    <span className="font-mono-jb">{p.publishedAt}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Preview modal */}
        <AnimatePresence>
          {previewPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewPost(null)}
              className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-background/80 p-4 backdrop-blur-xl"
            >
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 16, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="my-8 w-full max-w-2xl rounded-3xl border border-border bg-background p-6 sm:p-8"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full border border-border bg-secondary px-2.5 py-1 font-mono-jb text-[10px] uppercase tracking-wider">
                    Preview
                  </span>
                  <button
                    type="button"
                    onClick={() => setPreviewPost(null)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-4xl">{previewPost.emoji}</div>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight">
                  {previewPost.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {previewPost.excerpt}
                </p>
                <div className="mt-5 space-y-3 text-sm leading-relaxed text-foreground/85">
                  {previewPost.content.slice(0, 8).map((b, i) => {
                    if (b.type === "p") return <p key={i}>{b.text}</p>;
                    if (b.type === "h2")
                      return (
                        <h3
                          key={i}
                          className="mt-4 font-display text-lg font-bold"
                        >
                          {b.text}
                        </h3>
                      );
                    if (b.type === "ul")
                      return (
                        <ul key={i} className="list-disc pl-5">
                          {b.items.map((it, j) => (
                            <li key={j}>{it}</li>
                          ))}
                        </ul>
                      );
                    return <p key={i} className="text-muted-foreground">[block]</p>;
                  })}
                  {previewPost.content.length > 8 && (
                    <p className="text-muted-foreground italic">
                      …{previewPost.content.length - 8} more blocks
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Main admin panel ───────────────────────────────────────────────────────
export function AdminPanel() {
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState<"bots" | "blog">("bots");
  const [token, setToken] = React.useState(DEFAULT_TOKEN);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (url.searchParams.get("admin") === "1") {
      const stored = localStorage.getItem("admin_token");
      if (stored) setToken(stored);
      setOpen(true);
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_token", token);
    }
  }, [token]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-3 backdrop-blur-xl sm:p-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-coral/10">
                  <Shield className="h-5 w-5 text-coral" />
                </div>
                <div>
                  <h2 className="font-display text-base font-bold tracking-tight sm:text-lg">
                    Admin
                  </h2>
                  <p className="text-[11px] text-muted-foreground sm:text-xs">
                    Bot-trap &amp; blog management
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-secondary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-border bg-secondary/20 p-2">
              <button
                type="button"
                onClick={() => setTab("bots")}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  tab === "bots"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Bot className="h-4 w-4" />
                Bot trap
              </button>
              <button
                type="button"
                onClick={() => setTab("blog")}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  tab === "blog"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileText className="h-4 w-4" />
                Blog posts
              </button>
            </div>

            {/* Tab content */}
            {tab === "bots" ? <BotTrapPanel token={token} /> : <BlogPanel />}

            {/* Footer */}
            <div className="border-t border-border bg-secondary/30 p-3 text-[11px] text-muted-foreground sm:p-4 sm:text-xs">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  {tab === "bots" && (
                    <span>Logs persist in /tmp/bot-attempts.jsonl</span>
                  )}
                  {tab === "blog" && (
                    <span>User posts persist in browser localStorage</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-3 w-3" />
                  <input
                    type="password"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="admin token"
                    className="w-40 rounded-full border border-border bg-background px-3 py-1 font-mono-jb text-[11px] outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
