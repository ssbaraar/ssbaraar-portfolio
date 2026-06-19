"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Calendar, ArrowRight, Rss } from "lucide-react";
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
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-foreground/20"
    >
      {post.coverImage ? (
        <div className="aspect-[1200/630] overflow-hidden border-b border-border bg-secondary">
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
        </div>
        <h3 className="mb-2 font-display text-lg font-bold leading-tight tracking-tight sm:text-xl">
          {post.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
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
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground"
            >
              <Rss className="h-3 w-3 text-primary" />
              Writing
            </motion.div>
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              Things I&apos;ve shipped &amp; learned.
            </h2>
          </div>
          <Link
            href="/?view=blog"
            className="group inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:border-foreground/20 hover:bg-secondary"
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
