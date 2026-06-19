"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Rocket, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Audience = "recruiters" | "founders";

const content = {
  recruiters: {
    label: "I'm hiring",
    icon: Briefcase,
    headline: "Hire an engineer who ships, not one who demos.",
    sub: "2.5+ years building RAG, multi-agent workflows, and GTM automation that runs in production. I don't leave until it's deployed, monitored, and the team can run it without me.",
    roles: [
      "Applied AI Engineer",
      "GenAI Engineer",
      "Forward Deployed AI Engineer",
      "GTM Engineer / AI GTM",
      "AI Automation Engineer",
      "Fractional / contract AI",
    ],
    proof: [
      "Senior SWE — GenAI @ Motiveminds (enterprise SAP/Salesforce)",
      "SWE — GenAI/GTM @ W3 SaaS, Dubai DIFC (fintech-grade)",
      "GenAI Research Intern @ Blockchain Laboratories, Wyoming",
      "Full-stack @ Hyderabad Forex (OCR pipeline, regulated finance)",
    ],
    cta: "Download ATS resume",
    href: "/Baraar_Sreesha_Resume_ATS_2026.pdf",
  },
  founders: {
    label: "I need a build",
    icon: Rocket,
    headline: "Your AI pilot stalls in staging. I finish the build.",
    sub: "I work with founder-led B2B SaaS, outbound agencies, and SMBs ($1M–$10M) to replace manual GTM work with systems that actually run.",
    roles: [
      "Lead Intelligence Sprint",
      "Clay + n8n Outbound Engine",
      "RAG Knowledge System",
      "Agentic AI Workflow",
      "Document Intake + AI Assistant",
      "Fractional AI Retainer",
    ],
    proof: [
      "Replaced $2,000/mo data subscriptions with a fresher Clay pipeline",
      "Cut deck + email creation from 2–4 hrs to <10 min (n8n + Gemini)",
      "−40% data entry, −30% onboarding time at Hyderabad Forex (OCR)",
      "Production RAG over hundreds of internal PDFs with citation grounding",
    ],
    cta: "See service packages",
    href: "#services",
  },
} as const;

export function AudienceToggle() {
  const [audience, setAudience] = React.useState<Audience>("recruiters");
  const data = content[audience];

  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Pick your lane
          </motion.div>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Same engineer,{" "}
            <span className="text-muted-foreground">two ways to work with me.</span>
          </h2>
        </div>

        {/* Toggle */}
        <div className="mx-auto mb-10 flex max-w-md items-center gap-1.5 rounded-lg border border-border bg-secondary p-1.5">
          {(Object.keys(content) as Audience[]).map((key) => {
            const item = content[key];
            const Icon = item.icon;
            const isActive = audience === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setAudience(key)}
                className={cn(
                  "relative flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors",
                  isActive ? "text-background" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="audience-pill"
                    className="absolute inset-0 rounded-md bg-foreground"
                    transition={{ type: "spring", stiffness: 350, damping: 32 }}
                  />
                )}
                <Icon className="relative h-4 w-4" />
                <span className="relative">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={audience}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-10"
          >
            <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h3 className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                  {data.headline}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {data.sub}
                </p>
                <a
                  href={data.href}
                  target={data.href.startsWith("#") ? undefined : "_blank"}
                  rel={data.href.startsWith("#") ? undefined : "noopener noreferrer"}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80"
                >
                  {data.cta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div className="grid gap-6">
                <div>
                  <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
                    {audience === "recruiters" ? "Roles I fit" : "Ways to engage"}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {data.roles.map((role) => (
                      <span
                        key={role}
                        className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
                    Proof
                  </div>
                  <ul className="space-y-2">
                    {data.proof.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
