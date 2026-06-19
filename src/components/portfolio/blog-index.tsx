"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowLeft,
  Clock,
  Calendar,
  Search,
  Rss,
} from "lucide-react";
import { blogPosts, type BlogPost } from "@/lib/blog-posts";
import { PageViewTracker } from "@/components/portfolio/page-view-tracker";

type StoredPost = BlogPost & { _stored?: boolean };

function useAllPosts(): StoredPost[] {
  const [posts, setPosts] = React.useState<StoredPost[]>(blogPosts);
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("blog_posts");
      if (stored) {
        const userPosts = JSON.parse(stored) as StoredPost[];
        // User posts first (most recent), then built-in
        setPosts([...userPosts, ...blogPosts]);
      }
    } catch {
      // ignore
    }
  }, []);
  return posts;
}

const categories = ["All", "Tutorial", "Comparison", "Case Study", "Opinion"] as const;

function BlogCard({ post }: { post: StoredPost }) {
  return (
    <Link
      href={`/?blog=${post.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-foreground/20"
    >
      {post.coverImage ? (
        <div className="aspect-[1200/630] overflow-hidden border-b border-border bg-secondary/30">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="h-px w-full bg-primary/40" />
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2 text-xs">
          <span className="rounded-md border border-border bg-secondary px-2.5 py-1 font-mono-jb uppercase tracking-wider text-muted-foreground">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            {post.readingTime}
          </span>
          {post._stored && (
            <span className="ml-auto rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
              New
            </span>
          )}
        </div>

        <h3 className="mb-3 font-display text-lg font-bold leading-tight tracking-tight sm:text-xl">
          {post.title}
        </h3>

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
          <span className="inline-flex items-center gap-1 text-sm font-semibold transition-colors group-hover:text-primary">
            Read
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function BlogIndex() {
  const allPosts = useAllPosts();
  const [activeCategory, setActiveCategory] =
    React.useState<(typeof categories)[number]>("All");
  const [search, setSearch] = React.useState("");

  const filtered = React.useMemo(() => {
    return allPosts.filter((p) => {
      if (activeCategory !== "All" && p.category !== activeCategory) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.keywords.some((k) => k.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [allPosts, activeCategory, search]);

  return (
    <>
      <PageViewTracker />
      <main className="flex-1 pt-28 pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        {/* Hero */}
        <div className="mb-12 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground"
          >
            <Rss className="h-3 w-3 text-primary" />
            Writing
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
          >
            Things I&apos;ve{" "}
            shipped &amp; learned.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-base text-muted-foreground sm:text-lg"
          >
            Tutorials, framework comparisons, and case studies from 2.5+ years
            of building production AI and GTM automation systems.
          </motion.p>
        </div>

        {/* Filters + search */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`relative rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-foreground text-background"
                    : "border border-border bg-card/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="w-full rounded-full border border-border bg-card/40 py-2 pl-9 pr-4 text-sm outline-none backdrop-blur transition-colors focus:border-primary sm:w-64"
            />
          </div>
        </div>

        {/* Posts grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
              <Search className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="font-display text-lg font-semibold">
              No posts found
            </h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Try a different search term or category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-4 inline-flex h-9 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium hover:bg-secondary"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((post, i) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Footer CTA */}
        <div className="mt-16 rounded-2xl border border-border bg-card p-7 text-center sm:p-10">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Want this for your team?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
            I build production AI systems — RAG, agents, GTM automation — for
            B2B teams worldwide. Book a 20-minute intro call.
          </p>
          <Link
            href="https://calendly.com/baraarsreesha/intro"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-foreground px-6 text-sm font-semibold text-background transition-opacity hover:opacity-90 active:opacity-80"
          >
            Book a 20-min intro call
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
    </>
  );
}
