"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * "Trusted by teams at" — a 2-row logo wall where each cell smoothly
 * crossfades through the company pool, so logos roll/swap in place.
 *
 * Logos load from /public/logos/<slug>.png. If a file is missing, the cell
 * falls back to a clean styled wordmark — so it looks good before assets land.
 * Add more companies by extending `companies`.
 */
type Company = { name: string; slug: string };

const companies: Company[] = [
  { name: "Motiveminds", slug: "motiveminds" },
  { name: "GranHub", slug: "granhub" },
  { name: "Synergy Solutions", slug: "synergy" },
  { name: "Blockchain Laboratories", slug: "blockchain-laboratories" },
  { name: "W3SaaS", slug: "w3saas" },
  { name: "Evenbound", slug: "evenbound" },
  { name: "Paris Gourmet", slug: "paris-gourmet" },
  { name: "Nine Education", slug: "nine-education" },
  { name: "Hyderabad Forex", slug: "hyderabad-forex" },
];

const CELLS = 8; // 2 rows × 4 on desktop

function LogoMark({ c }: { c: Company }) {
  const [err, setErr] = React.useState(false);
  if (err) {
    return (
      <span className="font-display text-[15px] font-semibold tracking-tight text-ink/55 sm:text-base">
        {c.name}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/logos/${c.slug}.png`}
      alt={c.name}
      onError={() => setErr(true)}
      className="max-h-10 max-w-[130px] object-contain opacity-85 transition-opacity"
    />
  );
}

function LogoCell({ offset, period }: { offset: number; period: number }) {
  const [idx, setIdx] = React.useState(offset % companies.length);

  React.useEffect(() => {
    const id = setInterval(
      () => setIdx((v) => (v + 1) % companies.length),
      period
    );
    return () => clearInterval(id);
  }, [period]);

  const c = companies[idx];
  return (
    <div className="flex h-20 items-center justify-center bg-canvas px-4 sm:h-24">
      <AnimatePresence mode="wait">
        <motion.div
          key={c.slug}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          <LogoMark c={c} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function LogoWall() {
  return (
    <section
      aria-label="Companies I've worked with"
      className="relative border-y border-border bg-surface-soft py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="mb-7 text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by teams at
        </p>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
          {Array.from({ length: CELLS }).map((_, i) => (
            <LogoCell
              key={i}
              // row 2 is offset so the same logo never stacks in a column
              offset={i + Math.floor(i / 4) * 2}
              period={2600 + (i % 4) * 320 + Math.floor(i / 4) * 180}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
