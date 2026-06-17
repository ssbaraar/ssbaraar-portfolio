"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "What's your rate?",
    a: "Fixed-price projects range from $1,500 for a scoped lead intelligence sprint to $8,000 for a full RAG system or multi-agent workflow build. Fractional retainers start at $1,500/month. I publish these ranges because I want to save us both time if the budget isn't a fit. We can discuss specifics on a 20-min intro call.",
  },
  {
    q: "How long does a typical project take?",
    a: "Scoped projects: 1–6 weeks depending on complexity. A lead intelligence sprint is 1–2 weeks. A full RAG system is 3–4 weeks. A multi-agent workflow build is 3–5 weeks. I share a detailed scope doc with timeline before any work begins — no surprises.",
  },
  {
    q: "Do you work on a retainer?",
    a: "Yes. My fractional retainer (8–20 hrs/week, $1,500–$4,000/month) is designed for companies that need ongoing AI engineering without a full-time hire. Minimum 4-week commitment. Weekly async updates + monthly roadmap session included.",
  },
  {
    q: "Can you show NDA-protected client work?",
    a: "Most of my enterprise work is under NDA. For those projects, I share anonymized-but-specific details: industry, company size, stack, and outcomes. I can also provide reference contacts (with client permission) for serious engagements.",
  },
  {
    q: "Do you only do the build, or also the strategy?",
    a: "Both. I help you translate your business objective into an architecture first — then build it. I won't recommend a technology before I understand what's actually broken in your operations. That's a diagnostic conversation, not a sales pitch.",
  },
  {
    q: "What tools / stack do you use?",
    a: "For GenAI: LangGraph, CrewAI, AutoGen, LangChain, LlamaIndex — with OpenAI, Anthropic, Gemini, or Azure OpenAI. For RAG: Qdrant, Pinecone, FAISS, AstraDB. For GTM automation: Clay, n8n, HubSpot, Apollo. Backend: FastAPI + Docker. I pick the right tool for the job, not the one I'm most comfortable with.",
  },
  {
    q: "Do you handle deployment, or just the build?",
    a: "Full deployment is included in every project scope. I deliver a running system, not a GitHub repo. That means Docker containerization, cloud deployment (GCP, AWS, or whatever you use), monitoring setup, documentation, and a handoff call.",
  },
  {
    q: "Are you open to full-time roles?",
    a: "Yes. I'm open to remote Applied AI, GTM Engineer, Forward Deployed AI, and AI Automation Engineering roles at US/global remote companies. Serious inquiries welcome — book an intro call or email me directly.",
  },
  {
    q: "Where are you based and what timezone do you work in?",
    a: "Bengaluru, India — IST (UTC+5:30). I work async-first and overlap well with US morning and EU afternoon. Most of my clients are in the US, UK, and UAE. I respond to all enquiries within 1 business day.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            FAQ
          </motion.div>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            The stuff people{" "}
            <span className="text-muted-foreground">actually ask.</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-border bg-card/40 p-4 backdrop-blur sm:p-6"
        >
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="overflow-hidden rounded-2xl border border-border/60 bg-background/40 px-4 data-[state=open]:border-foreground/15 data-[state=open]:bg-background/60"
              >
                <AccordionTrigger className="py-4 text-left font-display text-base font-semibold tracking-tight hover:no-underline sm:text-lg">
                  <span className="flex items-start gap-3">
                    <span className="font-mono-jb mt-0.5 text-xs text-primary">
                      0{i + 1}
                    </span>
                    <span className="pr-2">{faq.q}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  <span className="pl-7 block">{faq.a}</span>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
