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
    q: "Who is Baraar Sreesha?",
    a: "Baraar Sreesha Sreenivas — also written Sreesha Baraar, Baraar Sreenivas, or B. Sreesha, and known online as ssbaraar — is an AI consultant and Applied AI Engineer based in Bengaluru, India. He is currently Associate Consultant for AI Consulting & Solutions at Motiveminds Consulting, where he embeds with client teams to map their processes, select the right models and tools, model token cost, and build the resulting systems. Previously Senior Software Engineer for GenAI & Solutions Architecture at Motiveminds, GenAI/GTM engineer at W3 SaaS Technologies (Dubai DIFC), and a full-stack developer at Hyderabad Forex Limited. He holds a B.E. in Computer Science from JSS Science and Technology University, Mysuru, and was featured by DataStax as an AI Hero.",
  },
  {
    q: "What does a consulting engagement actually look like?",
    a: "I embed with the team doing the work for 3–5 days — sitting in on the process, tracing every handoff and workaround. You get a process map, a scored list of AI opportunities (payback vs effort vs risk), a tool and model recommendation per workflow, and the token cost to run it at your volume. Then we decide together what gets built.",
  },
  {
    q: "How do you control AI / token costs?",
    a: "I model cost per run before choosing a model. Then: route cheap models by default and escalate only when the task earns it, cache and batch what repeats, trim context aggressively, and set per-workflow budget alerts. Most teams I review are paying frontier prices for work a small model does identically.",
  },
  {
    q: "How do you choose which tools and models to use?",
    a: "Build vs buy vs plain API call, decided per workflow — against your constraints, not my preferences. Off-the-shelf wins more often than vendors admit. I put the trade-offs (cost, lock-in, latency, data residency, who maintains it) in writing so your team can defend the decision after I'm gone.",
  },
  {
    q: "What's your rate?",
    a: "Fixed-price: $1,500 (cost & tool selection review) → $8,000 (full RAG / multi-agent build). Embedded consulting runs $2,500–$6,000. Fractional retainers start at $1,500/month. I publish ranges to save us both time.",
  },
  {
    q: "How long does a typical engagement take?",
    a: "1–6 weeks. Cost & tool review: 1–2 weeks. Embedded consulting: 2–4 weeks. RAG system: 2–5 weeks. Multi-agent workflow: 3–5 weeks. Detailed scope doc with timeline before any work begins — no surprises.",
  },
  {
    q: "Do you work on a retainer?",
    a: "Yes. 8–20 hrs/week, $1,500–$4,000/month. Minimum 4-week commitment. Standing seat in planning and vendor calls, monthly AI spend review, and a roadmap session included.",
  },
  {
    q: "Can you show NDA-protected client work?",
    a: "I share anonymized-but-specific details: industry, size, stack, outcomes. Reference contacts available (with client permission) for serious engagements.",
  },
  {
    q: "Do you only advise, or also build?",
    a: "Both — that's the point. I translate the business objective into an architecture first, then build and deploy it myself. A recommendation I can't ship is a recommendation I shouldn't have made.",
  },
  {
    q: "Do you handle deployment, or just the build?",
    a: "Full deployment is included. Docker, cloud (GCP/AWS), monitoring, docs, handoff call. You get a running system, not a GitHub repo.",
  },
  {
    q: "Are you open to full-time roles?",
    a: "Yes — remote AI Consultant, Applied AI, Forward Deployed AI, AI Solutions Architect, and GTM Engineer roles. Serious inquiries welcome.",
  },
  {
    q: "Where are you based and what timezone?",
    a: "Bengaluru, India — IST (UTC+5:30). Async-first, overlaps well with US morning + EU afternoon. Responds within 1 business day.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden bg-canvas py-20 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
