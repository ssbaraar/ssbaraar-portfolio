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
};

const services: Service[] = [
  {
    id: "lead-intel",
    icon: Radar,
    title: "GTM Lead Intelligence Sprint",
    audience: "Recruiting · Outbound · B2B SaaS founders",
    outcome:
      "Replace manual prospect research with a pipeline that sources, enriches, scores, and routes 100–500 sales-ready accounts into your CRM every week.",
    bullets: [
      "ICP filter design + account criteria",
      "Sourcing via Clay, Apollo, scraping, Google Maps",
      "Waterfall enrichment + LLM lead scoring",
      "HubSpot / Salesforce / Airtable handoff",
    ],
    price: "$1,500 – $3,000",
    timeline: "1–2 weeks",
  },
  {
    id: "clay-n8n",
    icon: Workflow,
    title: "Clay + n8n Outbound Engine",
    audience: "Outbound agencies · SDR teams · Sales-led SaaS",
    outcome:
      "Automate your entire outbound ops — lead sourcing to personalized messaging to CRM sequencing — into one reliable, repeatable system.",
    bullets: [
      "Clay table architecture + waterfall enrichment",
      "n8n automation + HubSpot/Salesforce push",
      "LLM personalization (first lines, research packets)",
      "Alerts + error handling + monitoring + docs",
    ],
    price: "$2,500 – $5,000",
    timeline: "2–4 weeks",
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
      "Citation-grounded answers + hallucination guardrails",
      "FastAPI service + Docker deployment",
    ],
    price: "$3,000 – $6,000",
    timeline: "2–4 weeks",
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
      "Tool calling, planning loops, state mgmt",
      "Self-correcting workflows with error recovery",
      "Observability + evals + FastAPI/Docker deploy",
    ],
    price: "$3,000 – $8,000",
    timeline: "3–5 weeks",
  },
  {
    id: "docs",
    icon: FileScan,
    title: "Document Intake + AI Assistant",
    audience: "Forex · Insurance · Mortgage · Legal · Consulting",
    outcome:
      "Automate document-heavy intake and put an AI layer over your docs. Proven at Hyderabad Forex (−40% data entry, −30% onboarding time).",
    bullets: [
      "PDF / form / document ingestion + OCR pipeline",
      "Field extraction + structured data output",
      "RAG assistant for internal document search",
      "FastAPI REST API wired into CRM / ops",
    ],
    price: "$3,000 – $8,000",
    timeline: "3–6 weeks",
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
    ],
    price: "$1,500 – $4,000 / mo",
    timeline: "Ongoing",
  },
];

// Clay 6-color feature-card cycle: pink → teal → lavender → peach → ochre → cream
type Skin = {
  card: string;
  text: string;
  soft: string;
  tile: string;
  rule: string;
  dot: string;
  btn: string;
};

const skins: Skin[] = [
  { card: "bg-brand-pink", text: "text-white", soft: "text-white/85", tile: "bg-white/20 text-white", rule: "border-white/25", dot: "bg-white/70", btn: "bg-white text-ink" },
  { card: "bg-brand-teal", text: "text-white", soft: "text-white/80", tile: "bg-white/15 text-white", rule: "border-white/20", dot: "bg-brand-mint", btn: "bg-white text-ink" },
  { card: "bg-brand-lavender", text: "text-ink", soft: "text-ink/75", tile: "bg-ink/10 text-ink", rule: "border-ink/15", dot: "bg-ink/50", btn: "bg-ink text-white" },
  { card: "bg-brand-peach", text: "text-ink", soft: "text-ink/75", tile: "bg-ink/10 text-ink", rule: "border-ink/15", dot: "bg-ink/50", btn: "bg-ink text-white" },
  { card: "bg-brand-ochre", text: "text-ink", soft: "text-ink/75", tile: "bg-ink/10 text-ink", rule: "border-ink/15", dot: "bg-ink/50", btn: "bg-ink text-white" },
  { card: "bg-surface-card", text: "text-ink", soft: "text-muted-foreground", tile: "bg-ink/[0.06] text-ink", rule: "border-ink/10", dot: "bg-ink/40", btn: "bg-ink text-white" },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  const s = skins[index % skins.length];
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-8 ${s.card} ${s.text}`}
    >
      <div className="mb-6 flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${s.tile}`}>
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        <span className={`font-display text-sm font-semibold ${s.soft}`}>
          0{index + 1}
        </span>
      </div>

      <h3 className="font-display text-[1.45rem] font-semibold leading-[1.1] tracking-[-0.02em]">
        {service.title}
      </h3>
      <p className={`mt-2 text-[13px] font-medium ${s.soft}`}>{service.audience}</p>
      <p className={`mt-3 text-[14px] leading-relaxed ${s.soft}`}>
        {service.outcome}
      </p>

      <ul className="mt-5 space-y-2.5">
        {service.bullets.map((b) => (
          <li key={b} className={`flex items-start gap-2.5 text-[13.5px] ${s.soft}`}>
            <span className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${s.dot}`} />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className={`mt-auto flex items-center justify-between border-t ${s.rule} pt-5`}>
        <div>
          <div className="flex items-center gap-1.5 font-display text-base font-semibold">
            <DollarSign className="h-4 w-4 opacity-70" />
            {service.price.replace(/^\$/, "")}
          </div>
          <div className={`mt-0.5 flex items-center gap-1.5 text-[12px] ${s.soft}`}>
            <Clock className="h-3 w-3" />
            {service.timeline}
          </div>
        </div>
        <a
          href="#contact"
          aria-label={`Discuss ${service.title}`}
          className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-transform group-hover:rotate-12 ${s.btn}`}
        >
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </motion.article>
  );
}

export function Services() {
  return (
    <section id="services" className="relative bg-canvas py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:mb-16 sm:flex-row sm:items-end">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-pink px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white"
            >
              What I build
            </motion.span>
            <h2 className="max-w-2xl font-display text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-5xl">
              Six ways to put me to work.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] text-muted-foreground sm:text-right">
            Fixed-price or retainer. Every project ships with deployment + 2-week
            post-launch support.
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
              AI Audit — entry offer
            </h3>
            <p className="mt-1.5 text-[14px] text-white/80">
              45-min call + written roadmap. Filters tire-kickers, feeds bigger
              projects.
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
