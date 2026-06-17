"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  Calendar,
  ArrowRight,
  Rss,
} from "lucide-react";
import { blogPosts, type BlogPost } from "@/lib/blog-posts";

type StoredPost = BlogPost & { _stored?: boolean };

function useRecentPosts(limit = 3): StoredPost[] {
  const [posts, setPosts] = React.useState<StoredPost[]>(
    blogPosts.slice(0, limit)
  );
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("blog_posts");
      if (stored) {
        const userPosts = JSON.parse(stored) as StoredPost[];
        // User posts first (most recent), then built-in
        const all = [...userPosts, ...blogPosts];
        setPosts(all.slice(0, limit));
      }
    } catch {
      // ignore
    }
  }, [limit]);
  return posts;
}

function BlogCard({ post }: { post: StoredPost }) {
  return (
    <Link
      href={`/?blog=${post.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/40 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-foreground/15"
    >
      <div className="h-1.5 w-full" style={{ background: post.accent }} />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
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
        </div>
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
          <span className="inline-flex items-center gap-1 text-sm font-semibold transition-colors group-hover:text-primary">
            Read
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function Blog() {
  const recentPosts = useRecentPosts(3);

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
              <Rss className="h-3 w-3 text-primary" />
              Writing
            </motion.div>
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              Things I&apos;ve{" "}
              <span className="squiggly">shipped &amp; learned</span>.
            </h2>
          </div>
          <Link
            href="/?view=blog"
            className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-card/40 px-4 py-2 text-sm font-semibold backdrop-blur transition-colors hover:border-foreground/15 hover:bg-card"
          >
            View all posts
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
