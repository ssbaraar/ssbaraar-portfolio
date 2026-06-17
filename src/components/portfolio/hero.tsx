"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  FileDown,
  MapPin,
  Sparkles,
  Bot,
  Network,
  Workflow,
} from "lucide-react";

const rotatingLines = [
  "I build AI systems that work in production, not just demos.",
  "GTM AI • RevOps automation • GenAI agents • RAG systems.",
  "Applied AI Engineer — Bengaluru, India — Remote worldwide.",
];

const floatingIcons = [
  { Icon: Bot, className: "left-[6%] top-[22%]", color: "var(--lime)", delay: 0 },
  { Icon: Workflow, className: "right-[8%] top-[18%]", color: "var(--coral)", delay: 0.4 },
  { Icon: Network, className: "left-[12%] bottom-[18%]", color: "var(--lavender)", delay: 0.8 },
  { Icon: Sparkles, className: "right-[10%] bottom-[24%]", color: "var(--amber)", delay: 1.2 },
];

export function Hero() {
  const [lineIndex, setLineIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setLineIndex((i) => (i + 1) % rotatingLines.length);
    }, 3800);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="noise-overlay relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24"
    >
      {/* Animated blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="blob animate-blob absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full opacity-50"
          style={{ background: "var(--lime)" }}
        />
        <div
          className="blob animate-blob absolute -right-32 top-20 h-[26rem] w-[26rem] rounded-full opacity-40"
          style={{ background: "var(--coral)", animationDelay: "4s" }}
        />
        <div
          className="blob animate-blob absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full opacity-30"
          style={{ background: "var(--lavender)", animationDelay: "8s" }}
        />
      </div>

      {/* Floating decorative icons - desktop only */}
      {floatingIcons.map(({ Icon, className, color, delay }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + delay, duration: 0.6 }}
          className={`pointer-events-none absolute hidden lg:block ${className}`}
        >
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 6, 0] }}
            transition={{
              duration: 6 + delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card/70 backdrop-blur"
            style={{ color }}
          >
            <Icon className="h-6 w-6" strokeWidth={1.6} />
          </motion.div>
        </motion.div>
      ))}

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Availability pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-muted-foreground">
              Available for fractional & full-time — Q3 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            I build{" "}
            <span className="relative inline-block">
              <span className="gradient-text-lime">AI systems</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M2 6 Q 50 2, 100 5 T 198 4"
                  stroke="var(--lime)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </svg>
            </span>{" "}
            that ship to production —{" "}
            <span className="text-muted-foreground">not just demos.</span>
          </motion.h1>

          {/* Rotating subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-7 flex h-7 items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={lineIndex}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="font-mono-jb text-sm text-muted-foreground sm:text-base"
              >
                <span className="text-primary">›</span> {rotatingLines[lineIndex]}
                <span className="ml-0.5 inline-block h-4 w-2 animate-blink bg-primary align-middle" />
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="#contact"
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-transform hover:scale-[1.02] active:scale-95 sm:w-auto"
            >
              <Calendar className="h-4 w-4" />
              Book a 20-min intro call
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="#work"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-card/50 px-6 text-sm font-semibold backdrop-blur transition-colors hover:border-primary/60 hover:bg-card sm:w-auto"
            >
              See the work
              <span className="text-primary">↓</span>
            </Link>
            <a
              href="/Baraar_Sreesha_Resume_ATS_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:w-auto"
            >
              <FileDown className="h-4 w-4" />
              Resume
            </a>
          </motion.div>

          {/* Location footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground"
          >
            <MapPin className="h-3.5 w-3.5" />
            <span>Bengaluru, India · IST (UTC+5:30)</span>
            <span className="mx-1.5 h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span>Responds within 1 business day</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
