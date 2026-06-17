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
  FileText,
  Plus,
  Eye,
  Save,
  Sparkles,
  BarChart3,
  Users,
  Globe,
  Clock,
  Image as ImageIcon,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { blogPosts, type BlogPost } from "@/lib/blog-posts";

const DEFAULT_TOKEN = "sreesha-secret-2026";

// ─── Types ─────────────────────────────────────────────────────────────────
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

type View = {
  path: string;
  ts: number;
  referrer?: string | null;
  country?: string | null;
  ua?: string | null;
};

type Analytics = {
  totalViews: number;
  uniquePaths: number;
  viewsByPath: Array<{ path: string; views: number }>;
  viewsByDay: Array<{ date: string; views: number }>;
  viewsByHour: Array<{ hour: number; views: number }>;
  topReferrers: Array<{ referrer: string; views: number }>;
  recentViews: View[];
  storage?: { backend: string; configured: boolean; helpUrl: string };
};

type StoredPost = BlogPost & { _stored?: boolean };

// ─── Helpers ───────────────────────────────────────────────────────────────
function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  return `${day}d ago`;
}

function flagEmoji(country?: string | null): string {
  if (!country || country.length !== 2) return "🌐";
  const codePoints = country
    .toUpperCase()
    .split("")
    .map((c) => 0x1f1e6 + c.charCodeAt(0) - 65);
  return String.fromCodePoint(...codePoints);
}

// ─── Bot trap tab ──────────────────────────────────────────────────────────
function BotTrapPanel() {
  const [attempts, setAttempts] = React.useState<Attempt[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchAttempts = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/bot-attempts?token=${DEFAULT_TOKEN}&limit=100`);
      if (res.ok) {
        const data = await res.json();
        setAttempts(data.attempts || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  const clearAttempts = async () => {
    if (!confirm("Clear all captured bot attempts?")) return;
    await fetch(`/api/admin/bot-attempts?token=${DEFAULT_TOKEN}`, { method: "DELETE" });
    setAttempts([]);
  };

  React.useEffect(() => {
    fetchAttempts();
  }, [fetchAttempts]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between gap-2 border-b border-border bg-secondary/30 p-3">
        <div className="text-xs text-muted-foreground">
          {attempts.length} captured
        </div>
        <div className="flex gap-2">
          <button onClick={fetchAttempts} disabled={loading}
            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-foreground px-3 text-xs font-semibold text-background disabled:opacity-50">
            <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button onClick={clearAttempts} disabled={attempts.length === 0}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-coral disabled:opacity-50">
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>
      <div className="pretty-scroll flex-1 overflow-y-auto p-3">
        {attempts.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <Bot className="h-10 w-10 text-muted-foreground/50" />
            <p className="mt-2 text-xs text-muted-foreground">No bots captured yet</p>
          </div>
        ) : (
          <ul className="space-y-1.5">
            {attempts.slice(0, 50).map((a) => (
              <li key={a.id} className="rounded-xl border border-border bg-background/60 p-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-coral/10 px-1.5 py-0.5 text-[9px] font-bold text-coral">
                    {a.blocked ? "BLOCKED" : "LOG"}
                  </span>
                  <span className="font-mono-jb font-semibold">{a.method}</span>
                  <span className="font-mono-jb truncate">{a.path}</span>
                  <span className="ml-auto text-muted-foreground">{timeAgo(a.ts)}</span>
                </div>
                <div className="mt-1 text-muted-foreground">
                  <span className="font-mono-jb">{a.reason}</span> · {a.ip || "?"}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ─── Overview tab (analytics) ──────────────────────────────────────────────
function OverviewPanel() {
  const [data, setData] = React.useState<Analytics | null>(null);
  const [loading, setLoading] = React.useState(true);

  const fetch_ = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/analytics?token=${DEFAULT_TOKEN}&limit=2000`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetch_();
    const id = setInterval(fetch_, 30000); // refresh every 30s
    return () => clearInterval(id);
  }, [fetch_]);

  if (loading && !data) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
        Failed to load analytics
      </div>
    );
  }

  const maxDayViews = Math.max(...data.viewsByDay.map((d) => d.views), 1);
  const maxHourViews = Math.max(...data.viewsByHour.map((h) => h.views), 1);

  return (
    <div className="pretty-scroll flex-1 overflow-y-auto p-3 sm:p-4">
      {/* Storage warning */}
      {data.storage && !data.storage.configured && (
        <div className="mb-4 flex items-start gap-2 rounded-xl border border-amber/40 bg-amber/5 p-3 text-xs">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber" />
          <div>
            <strong>Storage: file-based (dev only).</strong> Set up Vercel KV for
            cross-instance persistence.{" "}
            <a href={data.storage.helpUrl} target="_blank" rel="noopener noreferrer"
              className="underline">
              Docs ↗
            </a>
          </div>
        </div>
      )}

      {/* Stat cards */}
      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <StatCard icon={BarChart3} label="Total views" value={data.totalViews} accent="var(--lime)" />
        <StatCard icon={FileText} label="Unique pages" value={data.uniquePaths} accent="var(--coral)" />
        <StatCard icon={Users} label="Today" value={data.viewsByDay.slice(-1)[0]?.views || 0} accent="var(--lavender)" />
        <StatCard icon={Globe} label="Referrers" value={data.topReferrers.length} accent="var(--amber)" />
      </div>

      {/* Daily chart */}
      <div className="mb-4 rounded-2xl border border-border bg-background/60 p-3">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Last 14 days
          </h3>
          <button onClick={fetch_} className="text-xs text-muted-foreground hover:text-foreground">
            <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
        <div className="flex h-24 items-end gap-1">
          {data.viewsByDay.slice(-14).map((d, i) => (
            <div key={i} className="group relative flex-1">
              <div
                className="w-full rounded-t bg-primary/70 transition-all hover:bg-primary"
                style={{ height: `${(d.views / maxDayViews) * 100}%`, minHeight: d.views > 0 ? "4px" : "0" }}
              />
              <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-foreground px-1.5 py-0.5 text-[10px] text-background opacity-0 transition-opacity group-hover:opacity-100">
                {d.views} · {d.date.slice(5)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly chart */}
      <div className="mb-4 rounded-2xl border border-border bg-background/60 p-3">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          By hour (UTC)
        </h3>
        <div className="flex h-16 items-end gap-0.5">
          {data.viewsByHour.map((h) => (
            <div key={h.hour} className="group relative flex-1">
              <div
                className="w-full rounded-t bg-lavender/60 hover:bg-lavender"
                style={{ height: `${(h.views / maxHourViews) * 100}%`, minHeight: h.views > 0 ? "2px" : "0" }}
              />
            </div>
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
          <span>00</span><span>06</span><span>12</span><span>18</span><span>23</span>
        </div>
      </div>

      {/* Top pages */}
      <div className="mb-4 rounded-2xl border border-border bg-background/60 p-3">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Top pages
        </h3>
        <ul className="space-y-1.5">
          {data.viewsByPath.slice(0, 5).map((p) => (
            <li key={p.path} className="flex items-center gap-2 text-xs">
              <span className="flex-1 truncate font-mono-jb">{p.path}</span>
              <span className="font-bold">{p.views}</span>
              <div className="h-1.5 w-12 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${(p.views / data.viewsByPath[0].views) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Top referrers */}
      {data.topReferrers.length > 0 && (
        <div className="rounded-2xl border border-border bg-background/60 p-3">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Top referrers
          </h3>
          <ul className="space-y-1.5">
            {data.topReferrers.slice(0, 5).map((r) => (
              <li key={r.referrer} className="flex items-center gap-2 text-xs">
                <span className="flex-1 truncate font-mono-jb">{r.referrer}</span>
                <span className="font-bold">{r.views}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, accent }: {
  icon: typeof BarChart3;
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background/60 p-3">
      <Icon className="h-4 w-4" style={{ color: accent }} />
      <div className="mt-2 font-display text-2xl font-bold leading-none">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

// ─── Visitors tab (recent views) ───────────────────────────────────────────
function VisitorsPanel() {
  const [data, setData] = React.useState<Analytics | null>(null);
  const [loading, setLoading] = React.useState(true);

  const fetch_ = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/analytics?token=${DEFAULT_TOKEN}&limit=500`);
      if (res.ok) setData(await res.json());
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetch_();
    const id = setInterval(fetch_, 15000);
    return () => clearInterval(id);
  }, [fetch_]);

  if (loading && !data) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!data || data.recentViews.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
        <Users className="h-10 w-10 text-muted-foreground/50" />
        <p className="mt-2 text-xs text-muted-foreground">No visitors tracked yet</p>
        <p className="text-[10px] text-muted-foreground/70">Page views appear here in real-time</p>
      </div>
    );
  }

  return (
    <div className="pretty-scroll flex-1 overflow-y-auto p-3">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          {data.recentViews.length} recent · auto-refresh 15s
        </div>
        <button onClick={fetch_} className="text-xs text-muted-foreground hover:text-foreground">
          <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>
      <ul className="space-y-1.5">
        {data.recentViews.map((v, i) => (
          <li key={i} className="rounded-xl border border-border bg-background/60 p-2.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-base">{flagEmoji(v.country)}</span>
              <span className="flex-1 truncate font-mono-jb">{v.path}</span>
              <span className="text-muted-foreground">{timeAgo(v.ts)}</span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
              {v.country && <span>📍 {v.country}</span>}
              {v.referrer && (
                <span className="truncate">
                  <span className="opacity-60">from</span> {v.referrer}
                </span>
              )}
              {!v.referrer && <span className="opacity-60">direct</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Posts tab (list + create + delete) ────────────────────────────────────
function PostsPanel() {
  const [posts, setPosts] = React.useState<StoredPost[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  // Form state
  const [title, setTitle] = React.useState("");
  const [excerpt, setExcerpt] = React.useState("");
  const [category, setCategory] = React.useState<BlogPost["category"]>("Tutorial");
  const [emoji, setEmoji] = React.useState("📝");
  const [coverImage, setCoverImage] = React.useState("");
  const [keywords, setKeywords] = React.useState("");
  const [bodyText, setBodyText] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const fetch_ = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/posts?token=${DEFAULT_TOKEN}&internal=1`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetch_();
  }, [fetch_]);

  const handleSave = async () => {
    setError(null);
    setSuccess(null);
    if (!title.trim() || !bodyText.trim()) {
      setError("Title and body are required.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/posts?token=${DEFAULT_TOKEN}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title, excerpt, category, emoji, coverImage, keywords, body: bodyText,
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error || "Failed to save");
      } else {
        setSuccess(`Published! Live at ${data.url}`);
        setTitle(""); setExcerpt(""); setEmoji("📝");
        setCoverImage(""); setKeywords(""); setBodyText("");
        setShowForm(false);
        fetch_();
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string, isStored: boolean) => {
    if (!isStored) {
      alert("Built-in posts can only be deleted by editing src/lib/blog-posts.ts");
      return;
    }
    if (!confirm(`Delete "${slug}"? This removes it from the live site + sitemap + llm.txt.`)) return;
    await fetch(`/api/admin/posts?token=${DEFAULT_TOKEN}&slug=${slug}`, { method: "DELETE" });
    fetch_();
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between gap-2 border-b border-border bg-secondary/30 p-3">
        <div className="text-xs text-muted-foreground">
          {posts.length} posts · {posts.filter((p) => p._stored).length} stored
        </div>
        <button onClick={() => setShowForm((v) => !v)}
          className="inline-flex h-8 items-center gap-1.5 rounded-full bg-foreground px-3 text-xs font-semibold text-background">
          {showForm ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
          {showForm ? "Cancel" : "New post"}
        </button>
      </div>

      <div className="pretty-scroll flex-1 overflow-y-auto p-3">
        {/* Messages */}
        {error && (
          <div className="mb-3 rounded-xl border border-coral/40 bg-coral/5 p-2.5 text-xs text-coral">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-3 flex items-start gap-2 rounded-xl border border-primary/40 bg-primary/5 p-2.5 text-xs">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
            <div>{success}</div>
          </div>
        )}

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-3 overflow-hidden"
            >
              <div className="rounded-2xl border border-border bg-background/60 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <h3 className="text-xs font-bold uppercase tracking-wider">New blog post</h3>
                </div>
                <div className="space-y-2.5">
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title *"
                    className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-primary" />
                  <div className="grid grid-cols-3 gap-2">
                    <input type="text" value={emoji} onChange={(e) => setEmoji(e.target.value)} maxLength={4}
                      placeholder="📝"
                      className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-primary" />
                    <select value={category} onChange={(e) => setCategory(e.target.value as BlogPost["category"])}
                      className="col-span-2 rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-primary">
                      <option>Tutorial</option>
                      <option>Comparison</option>
                      <option>Case Study</option>
                      <option>Opinion</option>
                    </select>
                  </div>
                  <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2}
                    placeholder="Excerpt (1-2 sentences)"
                    className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-primary" />
                  {/* Cover image URL with preview */}
                  <div>
                    <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      <ImageIcon className="mr-1 inline h-3 w-3" />
                      Cover image URL (optional)
                    </label>
                    <input type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="/blog/my-cover.svg  OR  https://..."
                      className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-primary" />
                    {coverImage && (
                      <div className="mt-1.5 overflow-hidden rounded-lg border border-border">
                        <img src={coverImage} alt="cover preview" className="h-24 w-full object-cover" />
                      </div>
                    )}
                  </div>
                  <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)}
                    placeholder="SEO keywords (comma-separated)"
                    className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-primary" />
                  <div>
                    <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      Body * (markdown-lite — supports ## h2, - bullet, 1. num, &gt; quote, ```code```, ![alt](url))
                    </label>
                    <textarea value={bodyText} onChange={(e) => setBodyText(e.target.value)} rows={8}
                      placeholder={"## Section heading\n\nParagraph text.\n\n- Bullet\n\n![Alt](/blog/image.png \"caption\")"}
                      className="pretty-scroll w-full rounded-lg border border-border bg-background px-2.5 py-1.5 font-mono-jb text-xs leading-relaxed outline-none focus:border-primary" />
                  </div>
                  <button onClick={handleSave} disabled={saving}
                    className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-full bg-foreground px-4 text-sm font-semibold text-background disabled:opacity-50">
                    {saving ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                    {saving ? "Publishing..." : "Publish post"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Posts list */}
        {loading ? (
          <div className="flex justify-center py-12">
            <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <ul className="space-y-1.5">
            {posts.map((p) => (
              <li key={p.slug}
                className="flex items-start gap-2 rounded-xl border border-border bg-background/60 p-2.5">
                <span className="text-base">{p.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-semibold">{p.title}</div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-1 text-[10px] text-muted-foreground">
                    <span>{p.category}</span>
                    <span>·</span>
                    <span>{p.readingTime}</span>
                    <span>·</span>
                    <span className="font-mono-jb">{p.publishedAt}</span>
                    {p._stored && (
                      <>
                        <span>·</span>
                        <span className="rounded bg-lime/20 px-1 font-bold uppercase text-foreground">stored</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 gap-1">
                  <a href={`/?blog=${p.slug}`} target="_blank" rel="noopener noreferrer"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border hover:bg-secondary">
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <button onClick={() => handleDelete(p.slug, !!p._stored)}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-coral hover:bg-coral/5">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ─── Main admin dashboard ──────────────────────────────────────────────────
type Tab = "overview" | "visitors" | "posts" | "bots";

export function AdminPanel() {
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState<Tab>("overview");
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

  const tabs: Array<{ id: Tab; label: string; icon: typeof BarChart3 }> = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "visitors", label: "Visitors", icon: Users },
    { id: "posts", label: "Posts", icon: FileText },
    { id: "bots", label: "Bots", icon: Bot },
  ];

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
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-3 sm:p-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-coral/10">
                  <Shield className="h-4.5 w-4.5 text-coral" />
                </div>
                <div>
                  <h2 className="font-display text-sm font-bold tracking-tight sm:text-base">
                    Dashboard
                  </h2>
                  <p className="text-[10px] text-muted-foreground sm:text-xs">
                    Analytics · posts · bot-trap
                  </p>
                </div>
              </div>
              <button
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-secondary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 overflow-x-auto border-b border-border bg-secondary/20 p-2">
              {tabs.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                      tab === t.id
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* Tab content */}
            {tab === "overview" && <OverviewPanel />}
            {tab === "visitors" && <VisitorsPanel />}
            {tab === "posts" && <PostsPanel />}
            {tab === "bots" && <BotTrapPanel />}

            {/* Footer */}
            <div className="border-t border-border bg-secondary/30 p-2.5 sm:p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="text-[10px] text-muted-foreground sm:text-xs">
                  <Clock className="mr-1 inline h-3 w-3" />
                  Auto-refreshes every 15-30s
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="h-3 w-3 text-muted-foreground" />
                  <input
                    type="password"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="admin token"
                    className="w-32 rounded-full border border-border bg-background px-2.5 py-1 font-mono-jb text-[10px] outline-none focus:border-primary sm:w-40 sm:text-xs"
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
