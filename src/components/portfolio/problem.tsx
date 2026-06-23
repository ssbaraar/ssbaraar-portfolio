"use client";

import { motion } from "framer-motion";
import { TrendingUp, Zap, CheckCircle2, Clock } from "lucide-react";

const problems = [
  {
    icon: Zap,
    title: "Worked in staging, broke on day one.",
    body: "Pilot looked great in the demo. Then it hit real data, real users, real latency. Production is a different planet.",
  },
  {
    icon: Clock,
    title: "Manual work that should've been automated.",
    body: "Revenue team researching leads by hand. CRM updated one field at a time. Prospects routed through spreadsheets.",
  },
  {
    icon: CheckCircle2,
    title: "Beautiful demo. Nobody uses it.",
    body: "Vendor delivered a slick demo. The system around it — retrieval, routing, fallbacks — was never built.",
  },
];

export function Problem() {
  return (
    <section className="relative bg-canvas py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 block text-[12px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
          >
            The problem
          </motion.span>
          <h2 className="font-display text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-5xl">
            Most AI projects never make it to production.{" "}
            <span className="font-serif-italic font-normal tracking-normal text-brand-coral">
              The rest fail in Q1.
            </span>
          </h2>
        </div>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
          {problems.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative overflow-hidden rounded-3xl border border-border bg-surface-card p-7 sm:p-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-coral/15 text-brand-coral">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="font-display text-[1.2rem] font-semibold leading-snug tracking-[-0.02em] text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Reassurance line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 flex items-center gap-3.5 rounded-3xl bg-brand-lavender p-6 text-ink sm:p-7"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ink/10">
            <TrendingUp className="h-5 w-5" strokeWidth={2} />
          </span>
          <p className="text-[15px] sm:text-base">
            <span className="font-semibold">My lane:</span>{" "}
            <span className="text-ink/75">
              AI engineering ∩ revenue operations. I build the system, not just
              the model.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
