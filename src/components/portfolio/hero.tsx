"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Calendar, FileDown, MapPin } from "lucide-react";

const rotatingLines = [
  "I build AI systems that work in production, not just demos.",
  "GTM AI · RevOps automation · GenAI agents · RAG systems.",
  "Applied AI Engineer — Bengaluru, India — Remote worldwide.",
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
      className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Availability pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-muted-foreground">
              Available for fractional &amp; full-time — Q3 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            I build{" "}
            <span className="text-primary">AI systems</span>{" "}
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
                transition={{ duration: 0.35 }}
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
              href="https://calendly.com/baraarsreesha/intro"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80 sm:w-auto"
            >
              <Calendar className="h-4 w-4" />
              Book a 20-min intro call
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="#work"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-6 text-sm font-semibold transition-colors hover:border-foreground/20 hover:bg-secondary sm:w-auto"
            >
              See the work
              <span className="text-muted-foreground">↓</span>
            </Link>
            <a
              href="/Baraar_Sreesha_Resume_ATS_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:w-auto"
            >
              <FileDown className="h-4 w-4" />
              Resume
            </a>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-muted-foreground"
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
