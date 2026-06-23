"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import {
  Hourglass,
  Sparkle,
  Squiggle,
  Loop,
  Star4,
  ArrowDoodle,
} from "@/components/portfolio/doodles";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease },
  });

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-canvas pt-28 pb-20 sm:pt-36 sm:pb-28"
    >
      {/* Hand-drawn doodles — scattered around the hero */}
      <div aria-hidden className="pointer-events-none absolute inset-0 text-ink">
        <Hourglass className="absolute left-[4%] top-[20%] hidden h-24 w-20 -rotate-6 opacity-90 lg:block" />
        <Loop className="absolute left-[8%] top-[55%] hidden h-16 w-16 opacity-80 lg:block" />
        <Sparkle className="absolute right-[7%] top-[16%] hidden h-12 w-12 opacity-90 lg:block" />
        <Squiggle className="absolute right-[5%] top-[40%] hidden h-10 w-28 opacity-80 lg:block" />
        <Star4 className="absolute right-[16%] top-[62%] hidden h-9 w-9 opacity-70 lg:block" />
        <ArrowDoodle className="absolute left-[20%] top-[10%] hidden h-16 w-16 opacity-70 xl:block" />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        {/* Announcement pill */}
        <motion.div {...fade(0)} className="mb-7 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card px-3 py-1.5 text-[13px] font-medium text-ink">
            <span className="rounded-full bg-brand-teal px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              Open
            </span>
            Available for fractional &amp; full-time — Q3 2026
          </span>
        </motion.div>

        {/* Headline with italic-serif emphasis */}
        <motion.h1
          {...fade(0.08)}
          className="font-display text-[2.7rem] font-semibold leading-[1.02] tracking-[-0.04em] text-balance text-ink sm:text-6xl lg:text-[4.4rem]"
        >
          Applied AI systems,{" "}
          <span className="font-serif-italic font-normal tracking-normal text-brand-coral">
            shipped to production.
          </span>
        </motion.h1>

        <motion.p
          {...fade(0.18)}
          className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed sm:text-[17px]"
          style={{ color: "#4a4a46" }}
        >
          I&apos;m an Applied AI Engineer who builds RAG pipelines, multi-agent
          systems, and Clay / n8n / HubSpot automation that B2B revenue teams
          actually run — not demos that die in staging.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fade(0.28)}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="https://calendly.com/baraarsreesha/intro"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 active:translate-y-0 sm:w-auto"
          >
            <Calendar className="h-4 w-4" />
            Book a 20-min intro call
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="#work"
            className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-ink/15 bg-card px-7 text-sm font-semibold text-ink transition-colors hover:bg-surface-card sm:w-auto"
          >
            See the work
          </Link>
        </motion.div>

        <motion.p
          {...fade(0.4)}
          className="mt-8 text-[13px] font-medium text-muted-foreground"
        >
          5+ systems shipped · Bengaluru, IST · remote worldwide · replies in 1
          business day
        </motion.p>
      </div>
    </section>
  );
}
