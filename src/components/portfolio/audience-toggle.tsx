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
    <section className="bg-canvas py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section header */}
        <div className="mb-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 block text-[12px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
          >
            Pick your lane
          </motion.span>
          <h2 className="font-display text-[2rem] font-semibold tracking-[-0.03em] text-ink sm:text-[2.6rem]">
            Same engineer,{" "}
            <span className="font-serif-italic font-normal tracking-normal text-brand-coral">
              two ways to work.
            </span>
          </h2>
        </div>

        {/* Toggle */}
        <div className="mx-auto mb-10 flex max-w-md items-center gap-1.5 rounded-2xl bg-surface-card p-1.5">
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
                  "relative flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
                  isActive ? "text-white" : "text-muted-foreground hover:text-ink"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="audience-pill"
                    className="absolute inset-0 rounded-xl bg-ink"
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
            className="relative overflow-hidden rounded-3xl bg-card p-6 sm:p-10"
          >
            <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h3 className="font-display text-[1.6rem] font-semibold leading-tight tracking-[-0.025em] text-ink sm:text-[2rem]">
                  {data.headline}
                </h3>
                <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground sm:text-base">
                  {data.sub}
                </p>
                <a
                  href={data.href}
                  target={data.href.startsWith("#") ? undefined : "_blank"}
                  rel={data.href.startsWith("#") ? undefined : "noopener noreferrer"}
                  className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {data.cta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div className="grid gap-6">
                <div>
                  <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-brand-pink">
                    {audience === "recruiters" ? "Roles I fit" : "Ways to engage"}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {data.roles.map((role) => (
                      <span
                        key={role}
                        className="rounded-full bg-surface-card px-3 py-1.5 text-[12.5px] font-medium text-ink/80"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-brand-pink">
                    Proof
                  </div>
                  <ul className="space-y-2">
                    {data.proof.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2 text-[13.5px] text-muted-foreground"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" />
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
