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
    industry: "B2B SaaS · Sales-led",
    type: "GTM Lead Intelligence + HubSpot Automation",
    headline:
      "Replaced $2,000/mo data subscriptions with a custom pipeline at a fraction of cost — and fresher.",
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
    industry: "Outbound · Sales automation",
    type: "AI Pitch Deck + Outbound Email Automation",
    headline:
      "Deck + personalized email delivered in minutes, not hours. Sales team redirected to closing.",
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
    industry: "Knowledge management",
    type: "Multi-document RAG with hybrid retrieval",
    headline:
      "Citation-grounded knowledge assistant over hundreds of internal PDFs — production-deployed.",
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
    industry: "Forex · Financial services",
    type: "OCR KYC pipeline + FastAPI automation",
    headline:
      "40% reduction in manual data entry. 30% faster onboarding. Production OCR at a regulated financial firm.",
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

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        {/* Header */}
        <div className="mb-5 flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-ink">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: "var(--accent)" }}
              />
              {study.industry}
            </div>
            <div className="mt-1 text-[12px] text-muted-foreground">
              {study.client}
            </div>
          </div>
          <span
            className="self-start rounded-full px-3 py-1 text-[11px] font-semibold"
            style={{
              color: "var(--accent)",
              background: "color-mix(in srgb, var(--accent) 14%, transparent)",
            }}
          >
            {study.type}
          </span>
        </div>

        {/* Headline */}
        <h3 className="font-display text-[1.4rem] font-semibold leading-[1.12] tracking-[-0.025em] text-ink sm:text-[1.6rem]">
          {study.headline}
        </h3>

        {/* Results grid */}
        <div className="mt-6 grid grid-cols-3 gap-2.5">
          {study.results.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.label}
                className="rounded-2xl bg-surface-card p-3"
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg"
                  style={{
                    color: "var(--accent)",
                    background:
                      "color-mix(in srgb, var(--accent) 16%, transparent)",
                  }}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                </span>
                <div className="mt-2 text-[9.5px] font-medium uppercase tracking-wide text-muted-foreground">
                  {r.label}
                </div>
                <div className="mt-0.5 font-display text-[12.5px] font-semibold leading-tight text-ink">
                  {r.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stack */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {study.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-surface-card px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
          <span className="text-[12px] text-muted-foreground">
            Case 0{index + 1} · production-deployed
          </span>
          <a
            href="#contact"
            aria-label="Discuss a similar build"
            className="inline-flex cursor-pointer items-center gap-1 text-[13.5px] font-semibold text-ink transition-colors"
            onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "")}
          >
            Build something like this
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function CaseStudies() {
  return (
    <section id="work" className="relative bg-surface-soft py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:mb-16 sm:flex-row sm:items-end">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-teal px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white"
            >
              Selected work
            </motion.span>
            <h2 className="max-w-3xl font-display text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-5xl">
              Outcomes,{" "}
              <span className="text-muted-foreground">not screenshots.</span>
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
