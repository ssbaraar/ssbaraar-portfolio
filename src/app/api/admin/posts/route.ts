import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, savePost, deletePost, getStorageStatus } from "@/lib/storage";
import type { BlogPost } from "@/lib/blog-posts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";

function checkAuth(req: NextRequest): boolean {
  if (!ADMIN_TOKEN) return false;
  const session = req.cookies.get("admin_session")?.value;
  if (session === ADMIN_TOKEN) return true;
  const auth = req.headers.get("authorization");
  return auth?.startsWith("Bearer ") ? auth.slice(7) === ADMIN_TOKEN : false;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Parse markdown-lite body into BlogBlock[]
function parseBody(bodyText: string): BlogPost["content"] {
  const lines = bodyText.split("\n");
  const blocks: BlogPost["content"] = [];
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
      blocks.push({
        type: "code",
        lang: lang || undefined,
        code: codeLines.join("\n"),
      });
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
    } else if (trimmed.startsWith("![") && trimmed.includes("](")) {
      // ![alt text](url "optional caption")
      const m = trimmed.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/);
      if (m) {
        blocks.push({
          type: "image",
          alt: m[1] || "image",
          src: m[2],
          caption: m[3],
        });
      } else {
        blocks.push({ type: "p", text: trimmed });
      }
      i++;
    } else {
      blocks.push({ type: "p", text: trimmed });
      i++;
    }
  }
  return blocks;
}

// ─── GET: list all posts ──────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const includeInternal = url.searchParams.get("internal") === "1";

  // Public list (no auth) — for sitemap/llm.txt generation + blog index SSR
  if (!includeInternal) {
    const posts = await getAllPosts();
    return NextResponse.json({
      ok: true,
      count: posts.length,
      posts: posts.map((p) => ({
        slug: p.slug,
        title: p.title,
        description: p.description,
        excerpt: p.excerpt,
        category: p.category,
        publishedAt: p.publishedAt,
        readingTime: p.readingTime,
        emoji: p.emoji,
        accent: p.accent,
        coverImage: p.coverImage,
        keywords: p.keywords,
        _stored: p._stored,
      })),
    });
  }

  // Internal list (auth) — includes full content for editing
  if (!checkAuth(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const posts = await getAllPosts();
  const status = getStorageStatus();
  return NextResponse.json({
    ok: true,
    count: posts.length,
    storage: status,
    posts,
  });
}

// ─── POST: create or update a post ────────────────────────────────────────
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const title: string = (body.title || "").trim();
    const bodyText: string = body.body || "";

    if (!title) {
      return NextResponse.json(
        { ok: false, error: "Title is required" },
        { status: 400 }
      );
    }

    const slug: string = body.slug ? slugify(body.slug) : slugify(title);
    if (!slug) {
      return NextResponse.json(
        { ok: false, error: "Could not generate valid slug" },
        { status: 400 }
      );
    }

    const content = parseBody(bodyText);
    if (content.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Body must have at least one block" },
        { status: 400 }
      );
    }

    const wordCount = bodyText.split(/\s+/).filter(Boolean).length;
    const readingTime = `${Math.max(1, Math.round(wordCount / 200))} min`;

    const post = {
      slug,
      title,
      description: (body.description || body.excerpt || title).trim(),
      excerpt: (body.excerpt || body.description || title).trim(),
      category: (body.category || "Tutorial") as
        | "Tutorial"
        | "Comparison"
        | "Case Study"
        | "Opinion",
      publishedAt: body.publishedAt || new Date().toISOString().split("T")[0],
      readingTime,
      emoji: body.emoji || "📝",
      accent: body.accent || "var(--lime)",
      keywords: Array.isArray(body.keywords)
        ? body.keywords
        : typeof body.keywords === "string"
          ? body.keywords
              .split(",")
              .map((k: string) => k.trim())
              .filter(Boolean)
          : [],
      author: body.author || {
        name: "Baraar Sreesha",
        role: "Applied AI & GTM Systems Engineer",
      },
      content,
      coverImage: body.coverImage || undefined,
      _stored: true as const,
    };

    const saved = await savePost(post);
    if (!saved) {
      return NextResponse.json(
        { ok: false, error: "Failed to save post to storage" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      post,
      url: `/?blog=${slug}`,
      message: "Post published successfully",
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}

// ─── DELETE: remove a post by slug ────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json(
      { ok: false, error: "slug query param required" },
      { status: 400 }
    );
  }
  const deleted = await deletePost(slug);
  return NextResponse.json({ ok: deleted, slug });
}
