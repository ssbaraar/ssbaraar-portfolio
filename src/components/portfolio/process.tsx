"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { PhoneCall, FileText, Hammer, Rocket } from "lucide-react";
import { Sparkle } from "@/components/portfolio/doodles";

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

const stepTint = [
  "var(--brand-pink)",
  "var(--brand-lavender)",
  "var(--brand-ochre)",
  "var(--brand-mint)",
];

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-canvas py-20 sm:py-28">
      <Sparkle className="pointer-events-none absolute right-[6%] top-16 hidden h-9 w-9 text-brand-coral/40 lg:block" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero/icon-plane.png"
        alt=""
        className="pointer-events-none absolute left-[2%] top-[30%] hidden h-20 w-20 -rotate-6 select-none object-contain opacity-90 xl:block"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 block text-[12px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
          >
            How we work
          </motion.span>
          <h2 className="font-display text-[2.25rem] font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
            How it works,{" "}
            <span className="font-serif-italic font-normal tracking-normal text-brand-coral">
              step by step.
            </span>
          </h2>
        </div>

        <div className="relative grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-[4.75rem] hidden h-0.5 bg-[repeating-linear-gradient(to_right,var(--border)_0,var(--border)_6px,transparent_6px,transparent_12px)] lg:block" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            const tint = stepTint[i % stepTint.length];
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ "--tint": tint } as React.CSSProperties}
                className={`group relative rounded-3xl border border-border bg-card p-6 transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-0 ${
                  ["lg:-rotate-2", "lg:rotate-1", "lg:-rotate-1", "lg:rotate-2"][i % 4]
                }`}
              >
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{
                      color: "var(--tint)",
                      background:
                        "color-mix(in srgb, var(--tint) 15%, transparent)",
                    }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <span
                    className="font-display text-5xl font-semibold leading-none"
                    style={{
                      color:
                        "color-mix(in srgb, var(--tint) 35%, transparent)",
                    }}
                  >
                    0{step.id}
                  </span>
                </div>
                <h3 className="font-display text-[1.15rem] font-semibold tracking-[-0.02em] text-ink">
                  {step.title}
                </h3>
                <div
                  className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.08em]"
                  style={{ color: "var(--tint)" }}
                >
                  {step.duration}
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
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
