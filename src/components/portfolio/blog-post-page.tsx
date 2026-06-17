"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Check,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { blogPosts, type BlogPost, type BlogBlock } from "@/lib/blog-posts";
import { PageViewTracker } from "@/components/portfolio/page-view-tracker";

// ─── Block renderer (shared with the old modal) ────────────────────────────
function BlogBlockView({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-[15px] leading-relaxed text-foreground/85 sm:text-base sm:leading-[1.8]">
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2
          id={block.text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").slice(0, 60)}
          className="mt-12 scroll-mt-24 font-display text-2xl font-bold tracking-tight sm:mt-14 sm:text-3xl"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-8 font-display text-xl font-bold tracking-tight sm:text-2xl">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="space-y-2.5">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground/85 sm:text-base"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-2.5">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground/85 sm:text-base"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary font-mono-jb text-xs font-bold">
                {i + 1}
              </span>
              <span className="pt-0.5">{item}</span>
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="my-6 border-l-4 border-primary bg-secondary/40 p-5 italic">
          <p className="text-base leading-relaxed text-foreground/90">
            {block.text}
          </p>
          {block.cite && (
            <cite className="mt-2 block text-sm text-muted-foreground">
              — {block.cite}
            </cite>
          )}
        </blockquote>
      );
    case "code":
      return (
        <div className="my-5 overflow-hidden rounded-2xl border border-border bg-foreground">
          {block.lang && (
            <div className="flex items-center justify-between border-b border-background/10 px-4 py-2">
              <span className="font-mono-jb text-[10px] uppercase tracking-wider text-background/60">
                {block.lang}
              </span>
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-background/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-background/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-background/20" />
              </div>
            </div>
          )}
          <pre className="pretty-scroll overflow-x-auto p-4 text-[13px] leading-relaxed text-background/90">
            <code className="font-mono-jb">{block.code}</code>
          </pre>
        </div>
      );
    case "callout":
      return (
        <div
          className={`my-6 rounded-2xl border p-5 ${
            block.variant === "tip"
              ? "border-primary/40 bg-primary/5"
              : block.variant === "warn"
                ? "border-coral/40 bg-coral/5"
                : "border-lavender/40 bg-lavender/5"
          }`}
        >
          {block.title && (
            <div className="mb-2 flex items-center gap-2">
              <span className="text-base">
                {block.variant === "tip"
                  ? "💡"
                  : block.variant === "warn"
                    ? "⚠️"
                    : "ℹ️"}
              </span>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider">
                {block.title}
              </h4>
            </div>
          )}
          <p className="text-[15px] leading-relaxed text-foreground/85 sm:text-base">
            {block.text}
          </p>
        </div>
      );
    case "stat":
      return (
        <div className="my-5 flex items-center gap-4 rounded-2xl border border-border bg-card/40 p-5">
          <div className="font-display text-2xl font-bold text-primary sm:text-3xl">
            {block.value}
          </div>
          <div className="text-sm text-muted-foreground">{block.label}</div>
        </div>
      );
    case "image":
      return (
        <figure className="my-6">
          <div className="overflow-hidden rounded-2xl border border-border bg-card/40">
            <img
              src={block.src}
              alt={block.alt}
              className="h-auto w-full"
              loading="lazy"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-2 text-center text-xs text-muted-foreground">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    default:
      return null;
  }
}

// ─── Reading progress bar ──────────────────────────────────────────────────
function ReadingProgress() {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setProgress(total > 0 ? Math.min(100, (current / total) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent">
      <div
        className="h-full bg-primary transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// ─── Mini top navbar for blog post ─────────────────────────────────────────
function BlogNavBar({ slug }: { slug: string }) {
  const router = useRouter();
  const [copied, setCopied] = React.useState(false);

  const share = async () => {
    const url = `${window.location.origin}/?blog=${slug}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // ignore
    }
  };

  const goBack = () => {
    // If there's history, go back; otherwise navigate to blog index
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/?view=blog");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back to blog</span>
          <span className="sm:hidden">Back</span>
        </button>

        {/* Breadcrumb */}
        <nav className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/?view=blog" className="hover:text-foreground">
            Blog
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="max-w-[200px] truncate text-foreground/80">
            {slug}
          </span>
        </nav>

        <button
          type="button"
          onClick={share}
          aria-label="Share post"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
        >
          {copied ? (
            <Check className="h-4 w-4 text-primary" />
          ) : (
            <Share2 className="h-4 w-4" />
          )}
        </button>
      </div>
    </header>
  );
}

// ─── Table of contents (sticky, desktop only) ──────────────────────────────
function TableOfContents({ post }: { post: BlogPost }) {
  const headings = post.content
    .filter((b): b is { type: "h2"; text: string } => b.type === "h2")
    .map((b) => ({
      id: b.text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").slice(0, 60),
      text: b.text,
    }));

  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 hidden max-h-[calc(100vh-7rem)] overflow-y-auto lg:block">
      <div className="mb-3 font-mono-jb text-[10px] uppercase tracking-wider text-muted-foreground">
        On this page
      </div>
      <ul className="space-y-2 border-l border-border/60">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`-ml-px block border-l-2 py-1 pl-3 text-xs leading-relaxed transition-colors ${
                activeId === h.id
                  ? "border-primary font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── Related posts ─────────────────────────────────────────────────────────
function RelatedPosts({
  currentSlug,
  allPosts,
}: {
  currentSlug: string;
  allPosts: BlogPost[];
}) {
  const related = allPosts.filter((p) => p.slug !== currentSlug).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
        Keep reading
      </h2>
      <div className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-3">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/?blog=${post.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/40 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:border-foreground/15"
          >
            <div
              className="mb-3 h-1 w-10 rounded-full"
              style={{ background: post.accent }}
            />
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xl">{post.emoji}</span>
              <span className="font-mono-jb text-[10px] uppercase tracking-wider text-muted-foreground">
                {post.category} · {post.readingTime}
              </span>
            </div>
            <h3 className="font-display text-base font-bold leading-tight tracking-tight">
              {post.title}
            </h3>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold transition-colors group-hover:text-primary">
              Read
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── JSON-LD structured data for SEO ───────────────────────────────────────
function ArticleJsonLd({ post }: { post: BlogPost }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      url: "https://baraarsreesha.com",
    },
    publisher: {
      "@type": "Person",
      name: "Baraar Sreesha",
      url: "https://baraarsreesha.com",
    },
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://baraarsreesha.com/?blog=${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─── Main component ────────────────────────────────────────────────────────
type BlogPostPageProps =
  | { post: BlogPost; allPosts: BlogPost[]; slug?: never }
  | { slug: string; allPosts: BlogPost[]; post?: never };

export function BlogPostPage(props: BlogPostPageProps) {
  // If we got a slug (not a built-in post), try localStorage on the client.
  // IMPORTANT: hooks must be called unconditionally — declare them first,
  // then do the conditional render afterwards.
  const [post, setPost] = React.useState<BlogPost | null>(props.post ?? null);

  React.useEffect(() => {
    if (!props.post && props.slug) {
      try {
        const stored = localStorage.getItem("blog_posts");
        if (stored) {
          const userPosts = JSON.parse(stored) as BlogPost[];
          const found = userPosts.find((p) => p.slug === props.slug);
          if (found) setPost(found);
        }
      } catch {
        // ignore
      }
    }
  }, [props.post, props.slug]);

  // Loading state for user-created posts (slug passed, post not yet found)
  if (!post) {
    return (
      <>
        <BlogNavBar slug={props.slug ?? ""} />
        <main className="flex-1">
          <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary mx-auto">
              <Sparkles className="h-7 w-7 text-muted-foreground animate-pulse" />
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight">
              Loading post...
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              If this doesn&apos;t load, the post may only exist in the browser
              where it was created.
            </p>
            <Link
              href="/?view=blog"
              className="mt-6 inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <ArticleJsonLd post={post} />
      <ReadingProgress />
      <BlogNavBar slug={post.slug} />
      <PageViewTracker />

      <main className="flex-1">
        {/* Article hero */}
        <section className="pt-10 pb-8 sm:pt-16 sm:pb-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            {/* Cover image */}
            {post.coverImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="mb-8 overflow-hidden rounded-3xl border border-border bg-card/40"
              >
                <img
                  src={post.coverImage}
                  alt={`${post.title} — cover image`}
                  className="h-auto w-full"
                />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 flex flex-wrap items-center gap-2 text-xs"
            >
              <span
                className="rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono-jb uppercase tracking-wider"
                style={{ color: post.accent }}
              >
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                {post.readingTime}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 }}
              className="mb-5 text-6xl"
            >
              {post.emoji}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl"
            >
              {post.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {post.excerpt}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-7 flex items-center gap-3 border-y border-border/60 py-5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground font-display text-sm font-bold text-background">
                B
              </div>
              <div>
                <div className="text-sm font-semibold">{post.author.name}</div>
                <div className="text-xs text-muted-foreground">
                  {post.author.role}
                </div>
              </div>
              <Link
                href="/#contact"
                className="ml-auto hidden items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold transition-colors hover:bg-secondary sm:inline-flex"
              >
                Work with me
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Article body + TOC */}
        <section className="pb-12 sm:pb-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[1fr_220px]">
              <article className="min-w-0 space-y-4 sm:space-y-5">
                {post.content.map((block, i) => (
                  <BlogBlockView key={i} block={block} />
                ))}
              </article>
              <aside className="hidden lg:block">
                <TableOfContents post={post} />
              </aside>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="border-t border-border bg-card/30 py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="rounded-3xl border border-border bg-card/40 p-7 text-center backdrop-blur sm:p-10">
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Want this for your team?
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
                I build production AI systems — RAG, agents, GTM automation —
                for B2B teams worldwide. Book a 20-minute intro call.
              </p>
              <Link
                href="/#contact"
                className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-transform hover:scale-[1.02] active:scale-95"
              >
                Book a 20-min intro call
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Related posts */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <RelatedPosts
              currentSlug={post.slug}
              allPosts={props.allPosts}
            />
          </div>
        </section>
      </main>
    </>
  );
}
