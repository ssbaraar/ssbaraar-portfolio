"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Sparkle, Star4 } from "@/components/portfolio/doodles";

const faqs = [
  {
    q: "What's your rate?",
    a: "Fixed-price: $1,500 (lead intelligence sprint) → $8,000 (full RAG / multi-agent build). Fractional retainers start at $1,500/month. I publish ranges to save us both time. Specifics on a 20-min call.",
  },
  {
    q: "How long does a typical project take?",
    a: "1–6 weeks. Lead intelligence sprint: 1–2 weeks. RAG system: 3–4 weeks. Multi-agent workflow: 3–5 weeks. Detailed scope doc with timeline before any work begins — no surprises.",
  },
  {
    q: "Do you work on a retainer?",
    a: "Yes. 8–20 hrs/week, $1,500–$4,000/month. Minimum 4-week commitment. Weekly async updates + monthly roadmap session included.",
  },
  {
    q: "Can you show NDA-protected client work?",
    a: "I share anonymized-but-specific details: industry, size, stack, outcomes. Reference contacts available (with client permission) for serious engagements.",
  },
  {
    q: "Do you only do the build, or also the strategy?",
    a: "Both. I translate your business objective into an architecture first — then build it. I won't recommend a technology before I understand what's actually broken.",
  },
  {
    q: "What tools / stack do you use?",
    a: "GenAI: LangGraph, CrewAI, AutoGen, LangChain. RAG: Qdrant, Pinecone, FAISS. GTM: Clay, n8n, HubSpot, Apollo. Backend: FastAPI + Docker. Right tool for the job, not the one I'm most comfortable with.",
  },
  {
    q: "Do you handle deployment, or just the build?",
    a: "Full deployment is included. Docker, cloud (GCP/AWS), monitoring, docs, handoff call. You get a running system, not a GitHub repo.",
  },
  {
    q: "Are you open to full-time roles?",
    a: "Yes — remote Applied AI, GTM Engineer, Forward Deployed AI, AI Automation Engineering roles. Serious inquiries welcome.",
  },
  {
    q: "Where are you based and what timezone?",
    a: "Bengaluru, India — IST (UTC+5:30). Async-first, overlaps well with US morning + EU afternoon. Responds within 1 business day.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden bg-canvas py-20 sm:py-28">
      <Sparkle className="pointer-events-none absolute left-[8%] top-24 hidden h-9 w-9 text-brand-coral/40 lg:block" />
      <Star4 className="pointer-events-none absolute right-[9%] top-28 hidden h-7 w-7 text-ink/15 lg:block" />
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 block text-[12px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
          >
            FAQ
          </motion.span>
          <h2 className="font-display text-[2.25rem] font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
            The stuff people{" "}
            <span className="font-serif-italic font-normal tracking-normal text-brand-coral">
              actually ask.
            </span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-card p-4 sm:p-6"
        >
          <Accordion type="single" collapsible className="space-y-2.5">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="overflow-hidden rounded-2xl bg-surface-card px-4 data-[state=open]:bg-surface-strong"
              >
                <AccordionTrigger className="py-4 text-left font-display text-[15px] font-semibold tracking-[-0.02em] text-ink hover:no-underline sm:text-[17px]">
                  <span className="flex items-start gap-3">
                    <span className="mt-0.5 font-display text-[13px] font-bold text-brand-pink">
                      0{i + 1}
                    </span>
                    <span className="pr-2">{faq.q}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
                  <span className="block pl-7">{faq.a}</span>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
