"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  TrendingDown,
  Clock,
  DollarSign,
  Gauge,
  ArrowUpRight,
  Quote,
} from "lucide-react";
import { Squiggle } from "@/components/portfolio/doodles";

type CaseStudy = {
  id: string;
  client: string;
  industry: string;
  type: string;
  headline: string;
  stack: string[];
  results: { icon: typeof TrendingDown; label: string; value: string }[];
};

const cases: CaseStudy[] = [
  {
    id: "lead-intel",
    client: "US B2B SaaS — Series B, ~80 staff",
    industry: "GTM intelligence",
    type: "GTM Lead Intelligence + HubSpot Automation",
    headline:
      "Killed $2k/mo data subscriptions — fresher data, a fraction of the cost.",
    stack: ["Python", "Clay", "n8n", "HubSpot API", "Google Maps", "LLMs"],
    results: [
      { icon: DollarSign, label: "Subscription cost", value: "$2k/mo → fraction" },
      { icon: Clock, label: "Data freshness", value: "60–90d → 7–14d" },
      { icon: TrendingDown, label: "SDR research", value: "3–4h → <30min/day" },
    ],
  },
  {
    id: "pitch-deck",
    client: "B2B SaaS sales team — US",
    industry: "Sales automation",
    type: "AI Pitch Deck + Outbound Email Automation",
    headline: "Decks + personalized email in minutes, not hours.",
    stack: ["n8n", "Gemini", "Google Slides API", "Gmail API", "Drive"],
    results: [
      { icon: Clock, label: "Time per deck + email", value: "2–4h → <10min" },
      { icon: Gauge, label: "Outbound capacity", value: "10 → 50+/wk" },
      { icon: TrendingDown, label: "Human review gates", value: "every step → 1 gate" },
    ],
  },
  {
    id: "enterprise-rag",
    client: "Enterprise — 500+ employees",
    industry: "Enterprise RAG",
    type: "Multi-document RAG with hybrid retrieval",
    headline: "Citation-grounded assistant over hundreds of internal PDFs.",
    stack: ["LangChain", "LlamaIndex", "FAISS", "AstraDB", "BM25", "FastAPI", "Docker"],
    results: [
      { icon: Clock, label: "Doc search time", value: "30–90min → <2min" },
      { icon: Gauge, label: "Answer grounding", value: "None → 100% cited" },
      { icon: TrendingDown, label: "Cross-doc synthesis", value: "Manual → automated" },
    ],
  },
  {
    id: "forex-ocr",
    client: "Hyderabad Forex Limited — named, disclosed",
    industry: "Regulated finance",
    type: "OCR KYC pipeline + FastAPI automation",
    headline: "−40% manual entry, −30% onboarding at a regulated forex firm.",
    stack: ["Python", "OCR / CV", "FastAPI", "REST APIs"],
    results: [
      { icon: TrendingDown, label: "Manual data entry", value: "−40% auto-extracted" },
      { icon: Clock, label: "Onboarding time", value: "−30% faster" },
      { icon: Gauge, label: "Compliance rework", value: "frequent → reduced" },
    ],
  },
];

const accents = [
  "var(--brand-pink)",
  "var(--brand-lavender)",
  "var(--brand-teal)",
  "var(--brand-ochre)",
];

function CaseCard({ study, index }: { study: CaseStudy; index: number }) {
  const accent = accents[index % accents.length];
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ "--accent": accent } as React.CSSProperties}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-transform duration-300 hover:-translate-y-1"
    >
      {/* Top accent bar */}
      <div className="h-2 w-full" style={{ background: "var(--accent)" }} />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* Compact label row */}
        <div className="mb-4 flex items-center gap-2">
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{
              color: "var(--accent)",
              background: "color-mix(in srgb, var(--accent) 14%, transparent)",
            }}
          >
            {study.industry}
          </span>
          <span className="text-[11px] font-medium text-muted-foreground">
            Case 0{index + 1}
          </span>
        </div>

        {/* Headline — short, max 2 lines */}
        <h3 className="line-clamp-2 font-display text-[1.3rem] font-semibold leading-[1.14] tracking-[-0.025em] text-ink sm:text-[1.45rem]">
          {study.headline}
        </h3>

        {/* Metrics — the hero of the card */}
        <div className="mt-5 grid grid-cols-3 gap-2.5">
          {study.results.map((r) => (
            <div key={r.label} className="rounded-2xl bg-surface-card p-3 text-center">
              <div
                className="font-display text-[15px] font-bold leading-tight"
                style={{ color: "var(--accent)" }}
              >
                {r.value}
              </div>
              <div className="mt-1 text-[9.5px] font-medium leading-tight text-muted-foreground">
                {r.label}
              </div>
            </div>
          ))}
        </div>

        {/* Stack — capped */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {study.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-surface-card px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {study.stack.length > 4 && (
            <span className="text-[11px] font-medium text-muted-foreground/70">
              +{study.stack.length - 4}
            </span>
          )}
        </div>

        <a
          href="#contact"
          aria-label="Discuss a similar build"
          className="group/btn mt-5 inline-flex cursor-pointer items-center gap-1.5 text-[13.5px] font-semibold text-ink transition-colors"
          onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "")}
        >
          Build something like this
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </a>
      </div>
    </motion.article>
  );
}

export function CaseStudies() {
  return (
    <section id="work" className="relative overflow-hidden bg-surface-soft py-20 sm:py-28">
      <Squiggle className="pointer-events-none absolute right-[4%] top-24 hidden h-9 w-24 text-ink/20 lg:block" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero/icon-spark.png"
        alt=""
        className="pointer-events-none absolute left-[1%] bottom-[14%] hidden h-20 w-20 select-none object-contain opacity-90 xl:block"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:mb-16 sm:flex-row sm:items-end">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-3 block text-[12px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
            >
              Case studies
            </motion.span>
            <h2 className="max-w-3xl font-display text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-5xl">
              Outcomes, not{" "}
              <span className="font-serif-italic font-normal tracking-normal text-brand-coral">
                screenshots.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] text-muted-foreground">
            Four production deployments — across lead intelligence, sales
            automation, enterprise RAG, and regulated finance.
          </p>
        </div>

        <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
          {cases.map((c, i) => (
            <CaseCard key={c.id} study={c} index={i} />
          ))}
        </div>

        {/* Bonus infrastructure case */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 flex flex-col items-start justify-between gap-4 overflow-hidden rounded-3xl bg-brand-peach p-7 text-ink sm:flex-row sm:items-center sm:p-8"
        >
          <div>
            <h3 className="font-display text-[1.3rem] font-semibold tracking-[-0.02em]">
              Self-hosted n8n on GCP — production automation backbone
            </h3>
            <p className="mt-1.5 max-w-2xl text-[14px] text-ink/75">
              Replaced $500+/mo SaaS subscriptions with self-hosted n8n on GCP —
              Docker Compose, PostgreSQL, Nginx, SSL. The infrastructure layer
              behind every GTM/RevOps workflow I ship.
            </p>
          </div>
          <div className="shrink-0 text-left sm:text-right">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-ink/60">
              Infrastructure
            </div>
            <div className="font-display text-[1.3rem] font-semibold">
              Docker · GCP · n8n
            </div>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 rounded-3xl bg-card p-8 sm:p-10"
        >
          <Quote className="h-8 w-8 text-brand-pink" fill="currentColor" />
          <p className="mt-4 font-display text-[1.35rem] font-medium leading-snug tracking-[-0.02em] text-ink sm:text-[1.7rem]">
            &ldquo;I build the system, not just the model. From LangGraph agent
            to FastAPI deployment to HubSpot sync — I own the full stack and I
            don&apos;t leave until it runs in production.&rdquo;
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-teal font-display text-base font-semibold text-white">
              B
            </div>
            <div>
              <div className="text-[14px] font-semibold text-ink">
                Baraar Sreesha
              </div>
              <div className="text-[12px] text-muted-foreground">
                Applied AI &amp; GTM Systems Engineer · Bengaluru
              </div>
            </div>
          </div>
        </motion.blockquote>
      </div>
    </section>
  );
}
