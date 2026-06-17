/**
 * Storage abstraction for blog posts + analytics.
 *
 * Strategy:
 *   1. If Vercel KV env vars are set (KV_REST_API_URL + KV_REST_API_TOKEN),
 *      use Vercel KV — posts + analytics persist server-side, visible to
 *      all visitors, survive across serverless instances.
 *   2. Otherwise (local dev, or no KV configured), fall back to a
 *      file-based JSON store at /tmp/storage.json. Works on a single
 *      serverless instance only — sufficient for dev + single-instance deploys.
 *
 * To enable Vercel KV (free, 5 min setup):
 *   1. Vercel dashboard → Storage → Create → KV (free tier: 256MB, 30k cmd/mo)
 *   2. Copy KV_REST_API_URL + KV_REST_API_TOKEN
 *   3. Add to Vercel → Project → Settings → Environment Variables
 *   4. Redeploy
 *
 * The data shape is identical across both backends, so swapping is seamless.
 */

import { blogPosts as builtInPosts, type BlogPost } from "@/lib/blog-posts";
import { promises as fs } from "fs";
import path from "path";

// ─── Types ─────────────────────────────────────────────────────────────────
export type StoredPost = BlogPost & {
  _stored?: boolean;
  _source?: "kv" | "file" | "memory";
};

export type PageView = {
  path: string;
  ts: number;
  referrer?: string | null;
  country?: string | null;
  ua?: string | null;
};

export type AnalyticsSummary = {
  totalViews: number;
  uniquePaths: number;
  viewsByPath: Array<{ path: string; views: number }>;
  viewsByDay: Array<{ date: string; views: number }>;
  viewsByHour: Array<{ hour: number; views: number }>;
  topReferrers: Array<{ referrer: string; views: number }>;
  recentViews: PageView[];
};

// ─── KV client (lazy-loaded) ───────────────────────────────────────────────
const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;
const hasKV = !!(KV_URL && KV_TOKEN);

async function kvGet<T>(key: string): Promise<T | null> {
  if (!hasKV) return null;
  try {
    const res = await fetch(`${KV_URL}/get/${key}`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      next: { revalidate: 0, tags: [key] },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.result === null) return null;
    return JSON.parse(data.result) as T;
  } catch {
    return null;
  }
}

async function kvSet<T>(key: string, value: T): Promise<boolean> {
  if (!hasKV) return false;
  try {
    const res = await fetch(`${KV_URL}/set/${key}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function kvKeys(prefix: string): Promise<string[]> {
  if (!hasKV) return [];
  try {
    const res = await fetch(`${KV_URL}/keys/${prefix}*`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      next: { revalidate: 0 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.result || []) as string[];
  } catch {
    return [];
  }
}

// ─── File-based fallback (dev / single-instance) ───────────────────────────
const STORAGE_FILE = "/tmp/portfolio-storage.json";

type FileStore = {
  posts: StoredPost[];
  views: PageView[];
};

async function fileRead(): Promise<FileStore> {
  try {
    const content = await fs.readFile(STORAGE_FILE, "utf-8");
    return JSON.parse(content) as FileStore;
  } catch {
    return { posts: [], views: [] };
  }
}

async function fileWrite(data: FileStore): Promise<void> {
  try {
    await fs.writeFile(STORAGE_FILE, JSON.stringify(data));
  } catch (err) {
    console.warn("[storage] file write failed", err);
  }
}

// ─── Public API: blog posts ────────────────────────────────────────────────
/**
 * Returns ALL posts: built-in (from code) + stored (from KV/file).
 * Stored posts come first (most recent), then built-in.
 */
export async function getAllPosts(): Promise<StoredPost[]> {
  let stored: StoredPost[] = [];

  if (hasKV) {
    const ids = await kvKeys<string[]>("post:").catch(() => []);
    // KV keys endpoint returns array of key names
    const keys = Array.isArray(ids) ? ids : [];
    const posts = await Promise.all(
      keys.map((k) => kvGet<StoredPost>(k))
    );
    stored = posts.filter((p): p is StoredPost => p !== null);
  } else {
    const file = await fileRead();
    stored = file.posts;
  }

  // Mark source
  const marked = stored.map((p) => ({
    ...p,
    _stored: true,
    _source: hasKV ? ("kv" as const) : ("file" as const),
  }));

  // Dedupe by slug (built-in wins ties)
  const storedSlugs = new Set(marked.map((p) => p.slug));
  const builtInFiltered = builtInPosts.filter(
    (p) => !storedSlugs.has(p.slug)
  );

  return [...marked, ...builtInFiltered];
}

export async function getPostBySlug(
  slug: string
): Promise<StoredPost | null> {
  // Check stored first
  if (hasKV) {
    const stored = await kvGet<StoredPost>(`post:${slug}`);
    if (stored) return { ...stored, _stored: true, _source: "kv" as const };
  } else {
    const file = await fileRead();
    const found = file.posts.find((p) => p.slug === slug);
    if (found) return { ...found, _stored: true, _source: "file" as const };
  }
  // Then check built-in
  const builtIn = builtInPosts.find((p) => p.slug === slug);
  return builtIn ? builtIn : null;
}

export async function savePost(post: StoredPost): Promise<boolean> {
  // Strip internal fields before saving
  const clean: StoredPost = {
    slug: post.slug,
    title: post.title,
    description: post.description,
    excerpt: post.excerpt,
    category: post.category,
    publishedAt: post.publishedAt,
    readingTime: post.readingTime,
    emoji: post.emoji,
    accent: post.accent,
    keywords: post.keywords,
    author: post.author,
    content: post.content,
    coverImage: post.coverImage,
    _stored: true,
  };

  if (hasKV) {
    return kvSet(`post:${post.slug}`, clean);
  } else {
    const file = await fileRead();
    const idx = file.posts.findIndex((p) => p.slug === post.slug);
    if (idx >= 0) {
      file.posts[idx] = clean;
    } else {
      file.posts.unshift(clean);
    }
    await fileWrite(file);
    return true;
  }
}

export async function deletePost(slug: string): Promise<boolean> {
  if (hasKV) {
    try {
      const res = await fetch(`${KV_URL}/del/post:${slug}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${KV_TOKEN}` },
      });
      return res.ok;
    } catch {
      return false;
    }
  } else {
    const file = await fileRead();
    file.posts = file.posts.filter((p) => p.slug !== slug);
    await fileWrite(file);
    return true;
  }
}

// ─── Public API: analytics ─────────────────────────────────────────────────
const MAX_VIEWS = 5000; // cap to keep KV/file size reasonable

export async function recordPageView(view: Omit<PageView, "ts">): Promise<void> {
  const entry: PageView = { ...view, ts: Date.now() };

  if (hasKV) {
    // Append to a list — KV supports LPUSH
    try {
      await fetch(`${KV_URL}/lpush/views`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${KV_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      });
      // Trim to last MAX_VIEWS
      await fetch(`${KV_URL}/ltrim/views/0/${MAX_VIEWS - 1}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${KV_TOKEN}` },
      }).catch(() => {});
    } catch (err) {
      console.warn("[analytics] kv record failed", err);
    }
  } else {
    const file = await fileRead();
    file.views.unshift(entry);
    if (file.views.length > MAX_VIEWS) {
      file.views = file.views.slice(0, MAX_VIEWS);
    }
    await fileWrite(file);
  }
}

export async function getAnalytics(limit = 1000): Promise<AnalyticsSummary> {
  let views: PageView[] = [];

  if (hasKV) {
    try {
      const res = await fetch(`${KV_URL}/lrange/views/0/-1`, {
        headers: { Authorization: `Bearer ${KV_TOKEN}` },
        next: { revalidate: 0 },
      });
      if (res.ok) {
        const data = await res.json();
        const arr = data.result || [];
        views = arr
          .map((s: string) => {
            try {
              return JSON.parse(s) as PageView;
            } catch {
              return null;
            }
          })
          .filter((v: PageView | null): v is PageView => v !== null);
      }
    } catch (err) {
      console.warn("[analytics] kv read failed", err);
    }
  } else {
    const file = await fileRead();
    views = file.views;
  }

  views = views.slice(0, limit);

  // Aggregate
  const viewsByPath = new Map<string, number>();
  const viewsByDay = new Map<string, number>();
  const viewsByHour = new Map<number, number>();
  const referrers = new Map<string, number>();

  for (const v of views) {
    viewsByPath.set(v.path, (viewsByPath.get(v.path) || 0) + 1);
    const day = new Date(v.ts).toISOString().split("T")[0];
    viewsByDay.set(day, (viewsByDay.get(day) || 0) + 1);
    const hour = new Date(v.ts).getHours();
    viewsByHour.set(hour, (viewsByHour.get(hour) || 0) + 1);
    if (v.referrer) {
      referrers.set(v.referrer, (referrers.get(v.referrer) || 0) + 1);
    }
  }

  const sortByValue = (a: [string, number], b: [string, number]) =>
    b[1] - a[1];

  return {
    totalViews: views.length,
    uniquePaths: viewsByPath.size,
    viewsByPath: Array.from(viewsByPath.entries())
      .sort(sortByValue)
      .map(([path, views]) => ({ path, views })),
    viewsByDay: Array.from(viewsByDay.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-30) // last 30 days
      .map(([date, views]) => ({ date, views })),
    viewsByHour: Array.from({ length: 24 }, (_, h) => ({
      hour: h,
      views: viewsByHour.get(h) || 0,
    })),
    topReferrers: Array.from(referrers.entries())
      .sort(sortByValue)
      .slice(0, 10)
      .map(([referrer, views]) => ({ referrer, views })),
    recentViews: views.slice(0, 20),
  };
}

// ─── Storage status (for admin dashboard display) ──────────────────────────
export function getStorageStatus(): {
  backend: "vercel-kv" | "file" | "memory";
  configured: boolean;
  helpUrl: string;
} {
  if (hasKV) {
    return {
      backend: "vercel-kv",
      configured: true,
      helpUrl: "https://vercel.com/docs/storage/vercel-kv",
    };
  }
  return {
    backend: "file",
    configured: false,
    helpUrl: "https://vercel.com/docs/storage/vercel-kv",
  };
}
