"use client";

import { motion } from "framer-motion";
import { TrendingUp, Zap, CheckCircle2, Clock } from "lucide-react";

const problems = [
  {
    icon: Zap,
    emoji: "⚠️",
    title: "It worked in staging, broke on day one.",
    body: "Your AI pilot looked great in the demo. Then it hit real data, real users, real latency. Production is a different planet — and nobody on the team built for it.",
  },
  {
    icon: Clock,
    emoji: "🐌",
    title: "Manual work that should have been automated a year ago.",
    body: "Your revenue team is still researching leads by hand, updating CRM fields one by one, and routing prospects through spreadsheets. You know it's broken. Nobody has the engineering time to fix it.",
  },
  {
    icon: CheckCircle2,
    emoji: "🎭",
    title: "Beautiful demo. System nobody uses.",
    body: "You hired a vendor who delivered a slick demo and a system the team abandoned in week two. The model worked. The system around it — retrieval, routing, fallback logic, monitoring — was never built.",
  },
];

export function Problem() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            The before state
          </motion.div>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Most AI projects{" "}
            <span className="gradient-text-coral">never make it to production</span>.
            The rest fail in Q1.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Not because the model was wrong. Because the system around it — the
            retrieval, the routing, the CRM integration, the fallback logic —
            was never built for the real world. I fix all three. Designed for
            production from day one: monitoring, fallback paths, latency budgets,
            real business outcomes.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
          {problems.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card/40 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-foreground/15 sm:p-7"
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background/70">
                    <Icon className="h-5 w-5 text-coral" strokeWidth={1.8} />
                  </div>
                  <span className="text-3xl">{p.emoji}</span>
                </div>
                <h3 className="font-display text-lg font-bold leading-tight tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
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
          className="mt-7 flex items-center gap-3 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-5"
        >
          <TrendingUp className="h-6 w-6 shrink-0 text-primary" strokeWidth={2} />
          <p className="text-sm font-medium sm:text-base">
            <span className="font-bold">My lane:</span>{" "}
            <span className="text-muted-foreground">
              the intersection of AI engineering and revenue operations. I build
              the system, not just the model — and I don&apos;t leave until it
              runs in production.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
