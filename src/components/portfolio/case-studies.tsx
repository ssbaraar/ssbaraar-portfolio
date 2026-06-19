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

function CaseCard({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-foreground/20"
    >
      {/* Top accent line */}
      <div className="h-px w-full bg-primary/40" />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* Header */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {study.industry}
            </div>
            <div className="mt-0.5 font-mono-jb text-[11px] text-muted-foreground/70">
              {study.client}
            </div>
          </div>
          <span className="self-start rounded-md border border-border bg-secondary px-2.5 py-1 font-mono-jb text-[10px] uppercase tracking-wider text-muted-foreground">
            {study.type}
          </span>
        </div>

        {/* Headline */}
        <h3 className="font-display text-xl font-bold leading-tight tracking-tight sm:text-2xl">
          {study.headline}
        </h3>

        {/* Results grid */}
        <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {study.results.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.label}
                className="rounded-xl border border-border bg-secondary/50 p-3"
              >
                <Icon className="h-4 w-4 text-primary" strokeWidth={2} />
                <div className="mt-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {r.label}
                </div>
                <div className="mt-0.5 font-display text-sm font-bold leading-tight">
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
              className="rounded-full border border-border bg-secondary px-2.5 py-1 font-mono-jb text-[10px] text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <span className="text-xs text-muted-foreground">
            Case 0{index + 1} · production-deployed
          </span>
          <a
            href="#contact"
            aria-label="Discuss a similar build"
            className="inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:text-primary"
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
    <section id="work" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:mb-14 sm:flex-row sm:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Selected work
            </motion.div>
            <h2 className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              Outcomes,{" "}
              <span className="text-muted-foreground">not screenshots.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Four production deployments — across lead intelligence, sales automation, enterprise RAG, and regulated finance.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
          {cases.map((c, i) => (
            <CaseCard key={c.id} study={c} index={i} />
          ))}
        </div>

        {/* Bonus infrastructure case */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-5 flex flex-col items-start justify-between gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center"
        >
          <div>
            <h3 className="font-display text-lg font-bold">
              Self-hosted n8n on GCP — production automation backbone
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Replaced $500+/mo SaaS subscriptions with self-hosted n8n on GCP — Docker Compose, PostgreSQL, Nginx, SSL. The infrastructure layer behind every GTM/RevOps workflow I ship.
            </p>
          </div>
          <div className="shrink-0 text-left sm:text-right">
            <div className="font-mono-jb text-xs uppercase tracking-wider text-muted-foreground">
              Infrastructure
            </div>
            <div className="font-display text-lg font-bold">Docker · GCP · n8n</div>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 rounded-2xl border border-border bg-card p-7 sm:p-10"
        >
          <Quote className="h-7 w-7 text-primary" />
          <p className="mt-4 font-display text-xl font-medium leading-snug tracking-tight sm:text-2xl">
            &ldquo;I build the system, not just the model. From LangGraph agent
            to FastAPI deployment to HubSpot sync — I own the full stack and I
            don&apos;t leave until it runs in production.&rdquo;
          </p>
          <div className="mt-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground font-display text-sm font-bold text-background">
              B
            </div>
            <div>
              <div className="text-sm font-semibold">Baraar Sreesha</div>
              <div className="text-xs text-muted-foreground">
                Applied AI & GTM Systems Engineer · Bengaluru
              </div>
            </div>
          </div>
        </motion.blockquote>
      </div>
    </section>
  );
}
