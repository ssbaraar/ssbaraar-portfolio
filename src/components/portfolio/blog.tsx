"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowLeft,
  Clock,
  Calendar,
  X,
  Share2,
  Check,
  Sparkles,
} from "lucide-react";
import { blogPosts, type BlogPost, type BlogBlock } from "@/lib/blog-posts";

// Merge seed posts with any user-added posts from localStorage
type StoredPost = BlogPost & { _stored?: boolean };

function useAllPosts(): StoredPost[] {
  const [posts, setPosts] = React.useState<StoredPost[]>(blogPosts);
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("blog_posts");
      if (stored) {
        const userPosts = JSON.parse(stored) as StoredPost[];
        setPosts([...userPosts, ...blogPosts]);
      }
    } catch {
      // ignore
    }
  }, []);
  return posts;
}

function BlogBlockView({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-[15px] leading-relaxed text-foreground/85 sm:text-base sm:leading-[1.75]">
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2 className="mt-10 font-display text-2xl font-bold tracking-tight sm:mt-12 sm:text-3xl">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-7 font-display text-xl font-bold tracking-tight sm:text-2xl">
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
    default:
      return null;
  }
}

function BlogCard({
  post,
  onOpen,
  index,
}: {
  post: StoredPost;
  onOpen: () => void;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/40 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-foreground/15"
    >
      {/* Color band */}
      <div className="h-1.5 w-full" style={{ background: post.accent }} />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Meta */}
        <div className="mb-4 flex items-center gap-2 text-xs">
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
          {post._stored && (
            <span className="ml-auto flex items-center gap-1 rounded-full bg-lime/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground">
              <Sparkles className="h-2.5 w-2.5" />
              New
            </span>
          )}
        </div>

        {/* Title + emoji */}
        <div className="mb-3 flex items-start gap-3">
          <span className="text-3xl">{post.emoji}</span>
          <h3 className="font-display text-lg font-bold leading-tight tracking-tight sm:text-xl">
            {post.title}
          </h3>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:text-primary"
          >
            Read
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function BlogPostModal({
  post,
  onClose,
}: {
  post: BlogPost | null;
  onClose: () => void;
}) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (post) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [post]);

  React.useEffect(() => {
    if (!post) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [post, onClose]);

  const share = async () => {
    if (!post) return;
    const url = `${window.location.origin}/?blog=${post.slug}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, text: post.excerpt, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // ignore
    }
  };

  return (
    <AnimatePresence>
      {post && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-background/80 backdrop-blur-xl sm:p-6"
        >
          <motion.article
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-b-none border border-border bg-background shadow-2xl sm:rounded-3xl"
          >
            {/* Sticky header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/60 bg-background/95 px-4 py-3 backdrop-blur sm:px-6">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to blog</span>
                <span className="sm:hidden">Back</span>
              </button>
              <button
                type="button"
                onClick={share}
                aria-label="Share post"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-secondary"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : (
                  <Share2 className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Article body */}
            <div className="px-4 py-7 sm:px-8 sm:py-10">
              {/* Hero */}
              <div className="mb-7">
                <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
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
                </div>
                <div className="mb-4 text-5xl">{post.emoji}</div>
                <h1 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-balance sm:text-4xl">
                  {post.title}
                </h1>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {post.excerpt}
                </p>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground font-display text-sm font-bold text-background">
                    B
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{post.author.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {post.author.role}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content blocks */}
              <div className="space-y-4 sm:space-y-5">
                {post.content.map((block, i) => (
                  <BlogBlockView key={i} block={block} />
                ))}
              </div>

              {/* Footer CTA */}
              <div className="mt-10 rounded-3xl border border-border bg-card/40 p-6 sm:p-8">
                <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                  Want this for your team?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                  I build production AI systems — RAG, agents, GTM automation —
                  for B2B teams worldwide. Book a 20-minute intro call.
                </p>
                <a
                  href="#contact"
                  onClick={onClose}
                  className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-transform hover:scale-[1.02] active:scale-95"
                >
                  Book a 20-min intro call
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              {/* Close button at bottom for mobile */}
              <button
                type="button"
                onClick={onClose}
                className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-border text-sm font-semibold sm:hidden"
              >
                <X className="h-4 w-4" />
                Close article
              </button>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Blog() {
  const allPosts = useAllPosts();
  const [selected, setSelected] = React.useState<BlogPost | null>(null);

  // Open post from URL query ?blog=slug (for shareable links)
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("blog");
    if (slug) {
      const found = allPosts.find((p) => p.slug === slug);
      if (found) setSelected(found);
    }
  }, [allPosts]);

  const openPost = (post: BlogPost) => {
    setSelected(post);
    // Update URL for shareability without a route change
    const url = new URL(window.location.href);
    url.searchParams.set("blog", post.slug);
    window.history.pushState({}, "", url.toString());
  };

  const closePost = () => {
    setSelected(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("blog");
    window.history.pushState({}, "", url.toString());
  };

  // Handle browser back button
  React.useEffect(() => {
    const onPop = () => {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get("blog");
      if (!slug) setSelected(null);
      else {
        const found = allPosts.find((p) => p.slug === slug);
        if (found) setSelected(found);
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [allPosts]);

  return (
    <section id="blog" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Writing
            </motion.div>
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              Things I&apos;ve{" "}
              <span className="squiggly">shipped &amp; learned</span>.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Tutorials, comparisons, and case studies from 2.5+ years of building production AI systems.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {allPosts.map((post, i) => (
            <BlogCard
              key={post.slug}
              post={post}
              index={i}
              onOpen={() => openPost(post)}
            />
          ))}
        </div>
      </div>

      <BlogPostModal post={selected} onClose={closePost} />
    </section>
  );
}
