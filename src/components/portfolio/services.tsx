"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Radar,
  Workflow,
  Database,
  Bot,
  Infinity as InfinityIcon,
  Clock,
  DollarSign,
  ArrowUpRight,
  RotateCw,
  RotateCcw,
} from "lucide-react";
import { Sparkle } from "@/components/portfolio/doodles";

type Service = {
  id: string;
  image: string;
  icon: typeof Radar;
  title: string;
  audience: string;
  tagline: string;
  bullets: string[];
  price: string;
  timeline: string;
};

const services: Service[] = [
  {
    id: "ai-consulting",
    image: "clay-n8n",
    icon: Workflow,
    title: "Embedded AI Consulting",
    audience: "Leadership · Ops · Cross-functional",
    tagline: "I sit with your team, then tell you where AI actually belongs.",
    bullets: [
      "Embedded process mapping — how the work really happens today",
      "AI opportunity map scored by payback, effort, and risk",
      "Build vs buy vs API call, decided per workflow",
      "Adoption roadmap + enablement your team can run without me",
    ],
    price: "$2,500 – $6,000",
    timeline: "2–4 weeks",
  },
  {
    id: "token-economics",
    image: "docs",
    icon: DollarSign,
    title: "AI Cost & Tool Selection Review",
    audience: "Teams already spending on LLMs",
    tagline: "Same output, a fraction of the token bill.",
    bullets: [
      "Token spend teardown per workflow, model, and user",
      "Model routing: cheap default, escalate only when it earns it",
      "Caching, batching, context trimming, prompt-cost fixes",
      "Before/after cost model + budget alerts that hold",
    ],
    price: "$1,500 – $3,500",
    timeline: "1–2 weeks",
  },
  {
    id: "rag",
    image: "rag",
    icon: Database,
    title: "RAG & Document Intelligence",
    audience: "Docs · Wikis · Compliance · Intake",
    tagline: "Query your documents in plain English — with citations.",
    bullets: [
      "Multi-document ingestion + OCR pipeline for scanned intake",
      "Hybrid retrieval (BM25 keyword + vector semantic)",
      "Citation-grounded answers + hallucination guardrails",
      "FastAPI service + Docker deployment, wired into your ops",
    ],
    price: "$3,000 – $8,000",
    timeline: "2–5 weeks",
  },
  {
    id: "agents",
    image: "agents",
    icon: Bot,
    title: "Agentic AI Workflow Build",
    audience: "Multi-step AI systems",
    tagline: "A real multi-agent system — not a chatbot.",
    bullets: [
      "Multi-agent architecture (LangGraph / CrewAI / AutoGen)",
      "Tool calling, planning loops, state mgmt",
      "Self-correcting workflows with error recovery",
      "Observability + evals + cost-per-run budgets",
    ],
    price: "$3,000 – $8,000",
    timeline: "3–5 weeks",
  },
  {
    id: "lead-intel",
    image: "lead-intel",
    icon: Radar,
    title: "GTM Lead Intelligence Sprint",
    audience: "B2B SaaS · Outbound",
    tagline: "100–500 sales-ready accounts in your CRM, every week.",
    bullets: [
      "ICP filter design + account criteria",
      "Sourcing via Clay, Apollo, scraping, Google Maps",
      "Waterfall enrichment + LLM lead scoring within a set cost/lead",
      "HubSpot / Salesforce / Airtable handoff",
    ],
    price: "$1,500 – $3,000",
    timeline: "1–2 weeks",
  },
  {
    id: "retainer",
    image: "retainer",
    icon: InfinityIcon,
    title: "Fractional AI Consultant",
    audience: "Ongoing advisory + engineering",
    tagline: "A consultant who also writes the code, on tap.",
    bullets: [
      "8–20 hrs/week depending on tier",
      "Standing seat in your planning + vendor calls",
      "Monthly AI spend review + roadmap session",
      "Priority response within 4 business hours",
    ],
    price: "$1,500 – $4,000 / mo",
    timeline: "Ongoing",
  },
];

// Per-card accent (clay palette) for small touches on the white cards
const accents = ["#ff4d8b", "#1a3a3a", "#b8a4ed", "#ffb084", "#e8b94a", "#ff6b5a"];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const accent = accents[index % accents.length];
  const [flipped, setFlipped] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ "--accent": accent } as React.CSSProperties}
      className="[perspective:1600px]"
    >
      <div className="group relative h-[25.5rem] w-full transition-transform duration-300 hover:-translate-y-1.5 sm:h-[26rem]">
        <div
          className="relative h-full w-full transition-transform duration-[650ms] [transform-style:preserve-3d] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* FRONT */}
          <button
            type="button"
            onClick={() => setFlipped(true)}
            aria-label={`Show details for ${service.title}`}
            className="absolute inset-0 flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-border bg-card text-left [backface-visibility:hidden]"
          >
            {/* Clay illustration */}
            <div
              className="relative h-[11.5rem] w-full shrink-0 overflow-hidden"
              style={{ background: "#f6f3ea" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/services/${service.image}.png`}
                alt={`${service.title} — clay illustration`}
                className="h-full w-full object-contain"
                loading="lazy"
              />
              <span className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/80 font-display text-[12px] font-semibold text-ink backdrop-blur">
                0{index + 1}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <h3 className="font-display text-[1.25rem] font-semibold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[1.35rem]">
                {service.title}
              </h3>
              <p className="mt-2 text-[13.5px] font-medium leading-snug text-muted-foreground">
                {service.tagline}
              </p>

              <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-1 font-display text-[16px] font-semibold text-ink">
                  <DollarSign className="h-4 w-4 opacity-60" />
                  {service.price.replace(/^\$/, "")}
                </div>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-transform group-hover:rotate-[-12deg]"
                  style={{
                    color: accent,
                    background: "color-mix(in srgb, var(--accent) 14%, transparent)",
                  }}
                >
                  <RotateCw className="h-3 w-3" />
                  Flip for details
                </span>
              </div>
            </div>
          </button>

          {/* BACK */}
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-5 [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-6">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                What&apos;s included
              </span>
              <button
                type="button"
                onClick={() => setFlipped(false)}
                aria-label="Flip back"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full"
                style={{
                  color: accent,
                  background: "color-mix(in srgb, var(--accent) 14%, transparent)",
                }}
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>

            <h3 className="font-display text-[1.1rem] font-semibold leading-tight text-ink">
              {service.title}
            </h3>
            <div className="mt-1 flex items-center gap-1.5 text-[11.5px] font-medium text-muted-foreground">
              <Clock className="h-3 w-3" />
              {service.timeline} · {service.price}
            </div>

            <ul className="mt-3 space-y-2">
              {service.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-[12.5px] text-ink/75">
                  <span
                    className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: accent }}
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="mt-auto inline-flex h-11 w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-night text-[13px] font-semibold text-white"
            >
              Discuss this build
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative bg-canvas py-20 sm:py-28">
      <Sparkle className="pointer-events-none absolute right-[5%] top-20 hidden h-10 w-10 text-brand-coral/40 lg:block" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero/icon-gear.png"
        alt=""
        className="pointer-events-none absolute -left-2 bottom-[10%] hidden h-24 w-24 select-none object-contain opacity-90 xl:block"
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
              Services
            </motion.span>
            <h2 className="max-w-2xl font-display text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-5xl">
              Advisory first,{" "}
              <span className="font-serif-italic font-normal tracking-normal text-brand-coral">
                then the build
              </span>
              .
            </h2>
          </div>
          <p className="max-w-sm text-[15px] text-muted-foreground sm:text-right">
            Fixed-price or retainer. Every engagement includes a written cost
            model, deployment, and 2-week post-launch support.
          </p>
        </div>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>

        {/* Add-on strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 flex flex-col items-start justify-between gap-4 rounded-3xl bg-brand-teal p-7 text-white sm:flex-row sm:items-center sm:p-8"
        >
          <div>
            <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">
              AI Readiness Audit — entry offer
            </h3>
            <p className="mt-1.5 text-[14px] text-white/80">
              45-min working session + written roadmap: where AI pays off, which
              tools, what it costs to run.
            </p>
          </div>
          <div className="text-left sm:text-right">
            <div className="font-display text-3xl font-semibold">$150 – $300</div>
            <div className="text-[12px] text-white/70">fixed scope</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
