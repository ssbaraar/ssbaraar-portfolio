"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * "Trusted by teams at" — a 2-row logo wall.
 *
 * Rotation is COORDINATED: the 8 cells always show 8 DISTINCT companies at once
 * (never a duplicate). On each slow tick a single cell swaps to the one company
 * currently hidden, with a smooth crossfade. With 9 companies and 8 cells the
 * hidden one rotates through, so every company gets airtime.
 *
 * Logos load from /public/logos/<file>. Missing files fall back to a styled
 * wordmark. Add companies by extending `companies`.
 */
type Company = { name: string; file?: string };

const companies: Company[] = [
  { name: "Motiveminds", file: "/logos/motiveminds.png" },
  { name: "GranHub", file: "/logos/granhub.png" },
  { name: "Synergy Solutions", file: "/logos/synergy.png" },
  { name: "Blockchain Laboratories", file: "/logos/blockchain-laboratories.jpeg" },
  { name: "W3SaaS", file: "/logos/w3saas.png" },
  { name: "Evenbound", file: "/logos/evenbound.svg" },
  { name: "Paris Gourmet", file: "/logos/paris-gourmet.webp" },
  { name: "Nine Education", file: "/logos/nine-education.webp" },
  { name: "Hyderabad Forex", file: "/logos/hyderabad-forex.png" },
];

const CELLS = 8; // 2 rows × 4 on desktop
const SWAP_MS = 2600; // slightly faster cadence

function LogoMark({ c }: { c: Company }) {
  const [err, setErr] = React.useState(false);
  if (err || !c.file) {
    return (
      <span className="font-display text-[15px] font-semibold tracking-tight text-ink/55 sm:text-base">
        {c.name}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={c.file}
      alt={c.name}
      onError={() => setErr(true)}
      className="max-h-11 max-w-[140px] object-contain opacity-90 transition-opacity"
    />
  );
}

function LogoCell({ company }: { company: Company }) {
  return (
    <div className="relative flex h-20 items-center justify-center bg-canvas px-4 sm:h-24">
      {/* default (sync) AnimatePresence overlaps exit+enter -> true crossfade, no blank */}
      <AnimatePresence>
        <motion.div
          key={company.name}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center px-4"
        >
          <LogoMark c={company} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function LogoWall() {
  // slots[i] = index into `companies` shown in cell i. Always all-distinct.
  const [slots, setSlots] = React.useState<number[]>(() =>
    Array.from({ length: CELLS }, (_, i) => i % companies.length)
  );

  React.useEffect(() => {
    // Nothing to rotate if there aren't more companies than cells.
    if (companies.length <= CELLS) return;
    let cursor = 0;
    const id = setInterval(() => {
      setSlots((prev) => {
        const shown = new Set(prev);
        // the (single, with 9/8) company not currently visible
        let hidden = -1;
        for (let i = 0; i < companies.length; i++) {
          if (!shown.has(i)) {
            hidden = i;
            break;
          }
        }
        if (hidden === -1) return prev;
        const next = prev.slice();
        next[cursor % CELLS] = hidden; // swap one cell to the hidden company
        cursor += 1;
        return next;
      });
    }, SWAP_MS);
    return () => clearInterval(id);
  }, []);

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
          {slots.map((companyIdx, cellIdx) => (
            <LogoCell key={cellIdx} company={companies[companyIdx]} />
          ))}
        </div>
      </div>
    </section>
  );
}
