"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Radar,
  Workflow,
  Database,
  Bot,
  FileScan,
  Infinity as InfinityIcon,
  Clock,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";

type Service = {
  id: string;
  icon: typeof Radar;
  title: string;
  audience: string;
  outcome: string;
  bullets: string[];
  price: string;
  timeline: string;
  accent: string;
  emoji: string;
};

const services: Service[] = [
  {
    id: "lead-intel",
    icon: Radar,
    title: "GTM Lead Intelligence Sprint",
    audience: "Recruiting • Outbound • B2B SaaS founders",
    outcome:
      "Replace manual prospect research with a pipeline that sources, enriches, scores, and routes 100–500 sales-ready accounts into your CRM every week.",
    bullets: [
      "ICP filter design + account criteria",
      "Sourcing via Clay, Apollo, scraping, Google Maps",
      "Waterfall enrichment + LLM lead scoring",
      "HubSpot / Salesforce / Airtable handoff",
      "AI account summaries + first-line generation",
    ],
    price: "$1,500 – $3,000",
    timeline: "1–2 weeks",
    accent: "var(--lime)",
    emoji: "🛰️",
  },
  {
    id: "clay-n8n",
    icon: Workflow,
    title: "Clay + n8n Outbound Engine",
    audience: "Outbound agencies • SDR teams • Sales-led SaaS",
    outcome:
      "Automate your entire outbound ops — lead sourcing to personalized messaging to CRM sequencing — into one reliable, repeatable system.",
    bullets: [
      "Clay table architecture + waterfall enrichment",
      "n8n automation + HubSpot/Salesforce push",
      "LLM personalization (first lines, research packets)",
      "Slack/email alerts + error handling + monitoring",
      "SDR-ready output — no manual CSV work",
    ],
    price: "$2,500 – $5,000",
    timeline: "2–4 weeks",
    accent: "var(--coral)",
    emoji: "⚙️",
  },
  {
    id: "rag",
    icon: Database,
    title: "RAG System Build",
    audience: "Teams with docs, wikis, or compliance libraries",
    outcome:
      "A production knowledge assistant your team can query in plain English — citation-grounded responses, hybrid retrieval, FastAPI deployment.",
    bullets: [
      "Multi-document ingestion + OCR pipeline if needed",
      "Hybrid retrieval (BM25 keyword + vector semantic)",
      "Metadata-filtered retrieval (dept / date / type)",
      "Citation-grounded answers + hallucination guardrails",
      "FastAPI service + Docker deployment",
    ],
    price: "$3,000 – $6,000",
    timeline: "2–4 weeks",
    accent: "var(--lavender)",
    emoji: "📚",
  },
  {
    id: "agents",
    icon: Bot,
    title: "Agentic AI Workflow Build",
    audience: "Teams that need a multi-step AI system, not a chatbot",
    outcome:
      "Production multi-agent system with tool calling, planning loops, self-correction, and structured output — wired into your stack via API.",
    bullets: [
      "Multi-agent architecture (LangGraph / CrewAI / AutoGen)",
      "Tool calling, planning/execution loops, state mgmt",
      "Self-correcting workflows with error recovery",
      "Observability (LangSmith, Langfuse) + evals",
      "FastAPI + Docker production deployment",
    ],
    price: "$3,000 – $8,000",
    timeline: "3–5 weeks",
    accent: "var(--amber)",
    emoji: "🤖",
  },
  {
    id: "docs",
    icon: FileScan,
    title: "Document Intake + AI Assistant",
    audience: "Forex • Insurance • Mortgage • Legal • Consulting",
    outcome:
      "Automate document-heavy intake and put an AI layer over your docs. Proven at Hyderabad Forex (−40% data entry, −30% onboarding time).",
    bullets: [
      "PDF / form / document ingestion + OCR pipeline",
      "Field extraction + structured data output",
      "RAG assistant for internal document search",
      "FastAPI REST API wired into CRM / ops workflow",
      "Validation + low-confidence human review flags",
    ],
    price: "$3,000 – $8,000",
    timeline: "3–6 weeks",
    accent: "var(--mint)",
    emoji: "📄",
  },
  {
    id: "retainer",
    icon: InfinityIcon,
    title: "Fractional AI Retainer",
    audience: "Companies that need ongoing AI eng — no full-time hire",
    outcome:
      "A dedicated fractional AI engineer — weekly builds, iterations, enrichment, CRM automation, new AI features, monitoring.",
    bullets: [
      "8–20 hrs/week depending on tier",
      "Weekly async updates + Loom walkthroughs",
      "Priority response within 4 business hours",
      "Monthly scope review + roadmap session",
      "Minimum 4-week commitment",
    ],
    price: "$1,500 – $4,000 / mo",
    timeline: "Ongoing",
    accent: "var(--lime)",
    emoji: "♾️",
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/40 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-foreground/15 sm:p-7"
    >
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute -inset-px -z-10 rounded-3xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30"
        style={{ background: service.accent }}
      />

      <div className="mb-5 flex items-start justify-between">
        <div
          className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background/70 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
          style={{ color: service.accent }}
        >
          <Icon className="h-6 w-6" strokeWidth={1.7} />
          <span className="absolute -right-2 -top-2 text-xl">{service.emoji}</span>
        </div>
        <span className="rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono-jb text-[10px] uppercase tracking-wider text-muted-foreground">
          0{index + 1}
        </span>
      </div>

      <h3 className="font-display text-xl font-bold leading-tight tracking-tight sm:text-2xl">
        {service.title}
      </h3>
      <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {service.audience}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {service.outcome}
      </p>

      <ul className="mt-5 space-y-2">
        {service.bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2 text-sm text-foreground/80"
          >
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: service.accent }}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
        <div>
          <div className="flex items-center gap-1.5 font-display text-sm font-bold">
            <DollarSign className="h-3.5 w-3.5" style={{ color: service.accent }} />
            {service.price.replace(/^\$/, "")}
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {service.timeline}
          </div>
        </div>
        <a
          href="#contact"
          aria-label={`Discuss ${service.title}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-foreground"
        >
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </motion.article>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:mb-14 sm:flex-row sm:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              What I build
            </motion.div>
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              Six ways to put me to{" "}
              <span className="squiggly">work</span>.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground sm:text-right">
            Fixed-price or retainer. Every project ships with deployment,
            monitoring, documentation, and a 2-week post-launch support window.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>

        {/* Add-on strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-5 flex flex-col items-start justify-between gap-4 rounded-3xl border border-dashed border-border bg-card/30 p-6 sm:flex-row sm:items-center"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🎁</span>
              <h3 className="font-display text-lg font-bold">AI Audit — entry offer</h3>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              45-min call + written roadmap. Filters out low-intent leads and
              naturally feeds into a bigger project.
            </p>
          </div>
          <div className="text-left sm:text-right">
            <div className="font-display text-2xl font-bold">$150 – $300</div>
            <div className="text-xs text-muted-foreground">fixed scope</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
