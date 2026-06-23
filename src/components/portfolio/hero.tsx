"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import { ArrowUpRight, Calendar, FileDown, Sparkles } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-canvas pt-28 pb-16 sm:pt-36 sm:pb-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          {/* Left — message */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface-card px-3.5 py-1.5 text-[13px] font-medium text-ink"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-pink opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-pink" />
              </span>
              Available for fractional &amp; full-time — Q3 2026
            </motion.div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease }}
              className="font-display text-[2.9rem] font-semibold leading-[0.98] tracking-[-0.04em] text-balance text-ink sm:text-6xl lg:text-[4.5rem]"
            >
              Go to market with{" "}
              <span className="relative inline-block">
                <span className="relative z-10">AI systems</span>
                <span
                  aria-hidden
                  className="absolute inset-x-[-4px] bottom-[0.1em] -z-0 h-[0.42em] -rotate-1 rounded-full bg-brand-ochre/70"
                />
              </span>{" "}
              that actually ship.
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="mx-auto mt-6 max-w-md text-[17px] leading-relaxed text-body lg:mx-0"
              style={{ color: "#3a3a3a" }}
            >
              Applied AI Engineer building RAG pipelines, multi-agent systems, and
              Clay / n8n / HubSpot automation for B2B revenue teams — production,
              not demos.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32, ease }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
            >
              <Link
                href="https://calendly.com/baraarsreesha/intro"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0 sm:w-auto"
              >
                <Calendar className="h-4 w-4" />
                Book a 20-min intro call
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="#work"
                className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-canvas px-6 text-sm font-semibold text-ink transition-colors hover:bg-surface-card sm:w-auto"
              >
                See the work
              </Link>
              <a
                href="/Baraar_Sreesha_Resume_ATS_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold text-ink/70 transition-colors hover:text-ink"
              >
                <FileDown className="h-4 w-4" />
                Resume
              </a>
            </motion.div>

            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
              className="mt-7 text-[13px] font-medium text-muted-foreground"
            >
              5+ systems shipped · Bengaluru, IST · remote worldwide · replies in 1
              business day
            </motion.p>
          </div>

          {/* Right — claymation scene */}
          <ClayScene reduce={!!reduce} />
        </div>
      </div>
    </section>
  );
}

function ClayScene({ reduce }: { reduce: boolean }) {
  const float: MotionProps = reduce
    ? {}
    : {
        animate: { y: [0, -10, 0] },
        transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      };
  const floatSlow: MotionProps = reduce
    ? {}
    : {
        animate: { y: [0, 8, 0] },
        transition: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
      };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.25, ease }}
      className="relative mx-auto w-full max-w-[480px]"
    >
      {/* Claymation landscape */}
      <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] border border-border bg-surface-soft">
        <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-label="Claymation landscape of layered hills under a soft sun">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff6e6" />
              <stop offset="100%" stopColor="#ffe9d0" />
            </linearGradient>
            <linearGradient id="hillPeach" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffc59c" />
              <stop offset="100%" stopColor="#ffb084" />
            </linearGradient>
            <linearGradient id="hillOchre" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f0c75e" />
              <stop offset="100%" stopColor="#e8b94a" />
            </linearGradient>
            <linearGradient id="hillTeal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a4a48" />
              <stop offset="100%" stopColor="#1a3a3a" />
            </linearGradient>
          </defs>
          <rect width="400" height="400" fill="url(#sky)" />
          {/* sun */}
          <circle cx="288" cy="118" r="46" fill="#ff6b5a" opacity="0.92" />
          <circle cx="288" cy="118" r="46" fill="none" stroke="#ff4d8b" strokeOpacity="0.25" strokeWidth="6" />
          {/* back hill — lavender */}
          <path d="M0 300 Q90 210 200 256 T400 244 V400 H0 Z" fill="#b8a4ed" />
          {/* mid hill — ochre */}
          <path d="M0 330 Q120 250 240 300 T400 288 V400 H0 Z" fill="url(#hillOchre)" />
          {/* front hill — peach */}
          <path d="M0 366 Q110 300 230 344 T400 330 V400 H0 Z" fill="url(#hillPeach)" />
          {/* foreground knoll — teal */}
          <path d="M0 400 Q130 350 280 384 T400 372 V400 H0 Z" fill="url(#hillTeal)" />
          {/* mint dabs */}
          <circle cx="86" cy="332" r="11" fill="#a4d4c5" />
          <circle cx="330" cy="346" r="8" fill="#a4d4c5" />
        </svg>
      </div>

      {/* Floating product chips */}
      <motion.div
        {...float}
        className="absolute -left-3 top-10 rounded-2xl border border-border bg-card px-4 py-3 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)] sm:-left-6"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-pink/15 text-brand-pink">
            <Sparkles className="h-4 w-4" strokeWidth={2.2} />
          </span>
          <div className="leading-tight">
            <div className="text-[11px] font-semibold text-ink">Claygent run</div>
            <div className="font-mono-jb text-[10px] text-muted-foreground">
              482 leads enriched
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        {...floatSlow}
        className="absolute -right-2 bottom-12 rounded-2xl border border-border bg-card px-4 py-3 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)] sm:-right-6"
      >
        <div className="text-[11px] font-semibold text-ink">RAG · cited</div>
        <div className="mt-1 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
          <span className="font-mono-jb text-[10px] text-muted-foreground">
            100% grounded
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
