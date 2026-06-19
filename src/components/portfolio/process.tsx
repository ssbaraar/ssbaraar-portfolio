"use client";

import { motion } from "framer-motion";
import { PhoneCall, FileText, Hammer, Rocket } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: PhoneCall,
    title: "Discovery call",
    duration: "20 min · free",
    description:
      "We discuss your workflow, pain points, and goals. I ask the right questions to understand what's actually broken.",
  },
  {
    id: 2,
    icon: FileText,
    title: "Scoping & proposal",
    duration: "2–3 days",
    description:
      "I map the architecture, scope the build, define deliverables + acceptance criteria. Fixed-price proposal. No hourly surprises.",
  },
  {
    id: 3,
    icon: Hammer,
    title: "Build & iterate",
    duration: "1–6 weeks",
    description:
      "I build with weekly async Loom updates. You see every major decision. No black boxes, no surprise pivots.",
  },
  {
    id: 4,
    icon: Rocket,
    title: "Deploy + handoff",
    duration: "Final week",
    description:
      "I deploy, write the docs, run a walkthrough call. You own the code. 2-week post-launch support included.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            From discovery to deployment
          </motion.div>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            How it works,{" "}
            <span className="text-muted-foreground">step by step.</span>
          </h2>
        </div>

        <div className="relative grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-[4.5rem] hidden h-px bg-[repeating-linear-gradient(to_right,var(--border)_0,var(--border)_4px,transparent_4px,transparent_8px)] lg:block" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/20"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-secondary text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-primary">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <span className="font-display text-5xl font-bold leading-none text-foreground/8">
                    0{step.id}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold tracking-tight">
                  {step.title}
                </h3>
                <div className="mt-1 font-mono-jb text-[11px] uppercase tracking-wider text-primary">
                  {step.duration}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
