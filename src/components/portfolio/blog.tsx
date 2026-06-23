"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Calendar, ArrowRight } from "lucide-react";
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
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-transform duration-300 hover:-translate-y-1"
    >
      {post.coverImage ? (
        <div className="aspect-[1200/630] overflow-hidden border-b border-border bg-surface-card">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="h-1.5 w-full bg-brand-pink" />
      )}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2 text-xs">
          <span className="rounded-full bg-brand-lavender/40 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            {post.readingTime}
          </span>
        </div>
        <h3 className="mb-2 font-display text-[1.15rem] font-semibold leading-snug tracking-[-0.02em] text-ink sm:text-xl">
          {post.title}
        </h3>
        <p className="text-[13.5px] leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
          <span className="inline-flex items-center gap-1 text-[13.5px] font-semibold text-ink transition-colors group-hover:text-brand-pink">
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
    <section id="blog" className="relative bg-surface-soft py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:mb-16 sm:flex-row sm:items-end">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-3 block text-[12px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
            >
              Writing
            </motion.span>
            <h2 className="max-w-2xl font-display text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-5xl">
              Things I&apos;ve{" "}
              <span className="font-serif-italic font-normal tracking-normal text-brand-coral">
                shipped &amp; learned.
              </span>
            </h2>
          </div>
          <Link
            href="/?view=blog"
            className="group inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
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
