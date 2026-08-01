"use client";

import { motion } from "framer-motion";
import { Building2, GraduationCap, MapPin } from "lucide-react";
import { Sparkle, Squiggle } from "@/components/portfolio/doodles";

const experience = [
  {
    period: "Jul 2026 – Present",
    role: "Associate Consultant — AI Consulting & Solutions",
    company: "Motiveminds Consulting",
    location: "Bengaluru, India · Remote",
    icon: Building2,
    bullets: [
      "Embedded with client teams to map process before tooling",
      "Model + vendor selection and AI adoption roadmaps",
      "Token-cost modelling and spend governance per workflow",
    ],
  },
  {
    period: "Jul 2025 – Jun 2026",
    role: "Senior Software Engineer — GenAI & Solutions Architect",
    company: "Motiveminds Consulting",
    location: "Bengaluru, India · Remote",
    icon: Building2,
    bullets: [
      "Enterprise SAP + Salesforce GenAI workflows",
      "Multi-agent systems · RAG @ 95%+ accuracy",
      "FastAPI + LangSmith observability",
    ],
  },
  {
    period: "Jan 2025 – Jul 2025",
    role: "Software Engineer — GenAI / GTM",
    company: "W3 SaaS Technologies",
    location: "Remote · Dubai International Financial Centre",
    icon: Building2,
    bullets: [
      "+20% lead-gen · +50% outbound acceleration",
      "Clay / n8n / Apollo / HubSpot automation",
      "Dockerized FastAPI for fintech-grade workflows",
    ],
  },
  {
    period: "Jul 2024 – Dec 2024",
    role: "GenAI Research Intern",
    company: "Blockchain Laboratories",
    location: "Remote · Wyoming, United States",
    icon: Building2,
    bullets: [
      "Multi-agent prototypes: LangGraph, CrewAI, AutoGen",
      "+25% RAG performance via retrieval eval",
      "Hallucination control research for enterprise PoCs",
    ],
  },
  {
    period: "Apr 2024 – Aug 2024",
    role: "Full Stack Developer",
    company: "Hyderabad Forex Limited",
    location: "Hyderabad, India",
    icon: Building2,
    bullets: [
      "−40% manual data entry · −30% onboarding time",
      "OCR KYC pipeline + FastAPI REST API",
      "Production deployment in regulated finance",
    ],
  },
  {
    period: "2020 – 2024",
    role: "B.E. Computer Science",
    company: "JSS Science and Technology University",
    location: "Mysuru, India",
    icon: GraduationCap,
    bullets: ["Algorithms · systems · databases · networks"],
  },
];

const chips = [
  "Process audit → AI roadmap",
  "Model & tool selection",
  "Token-cost governance",
  "LangGraph · RAG · FastAPI",
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-surface-soft py-20 sm:py-28">
      <Sparkle className="pointer-events-none absolute right-[5%] top-16 hidden h-9 w-9 text-brand-coral/40 lg:block" />
      <Squiggle className="pointer-events-none absolute left-[3%] bottom-20 hidden h-8 w-24 text-ink/15 xl:block" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* On lg the row height is set by the left column (so it's never clipped);
            the timeline scrolls inside that exact height. */}
        <div className="grid items-stretch gap-10 rounded-[2rem] lg:grid-cols-[1fr_1.2fr] lg:gap-14 lg:border lg:border-border lg:p-10">
          {/* About content — always fully visible */}
          <div className="flex flex-col">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-3 block text-[12px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
            >
              About
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[2.6rem]"
            >
              I close the gap between{" "}
              <span className="font-serif-italic font-normal tracking-normal text-brand-coral">
                the AI strategy
              </span>{" "}
              and{" "}
              <span className="font-serif-italic font-normal tracking-normal text-brand-coral">
                the running system
              </span>
              .
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 }}
              className="mt-4 text-[13px] font-medium text-muted-foreground"
            >
              <strong className="font-semibold text-ink">
                Baraar Sreesha Sreenivas
              </strong>{" "}
              · Associate Consultant, AI Consulting &amp; Solutions ·
              Motiveminds Consulting · Bengaluru, India
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 space-y-3 text-[15.5px] leading-relaxed text-muted-foreground"
            >
              <p>
                Most AI work fails before a line of code is written — the wrong
                process, the wrong model, a cost curve nobody sized. So I start
                by sitting with the people doing the work, map what actually
                happens, and only then decide where AI earns its place.
              </p>
              <p>
                Then I build it. Cost per run before model selection. Fallback
                paths before the happy path. Monitoring before the feature code.
              </p>
              <p>
                Currently Associate Consultant — AI Consulting &amp; Solutions at
                Motiveminds Consulting. Open to fractional advisory, scoped
                builds, and full-time AI consulting / Applied AI / FDE roles.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-[12.5px] font-medium text-ink"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
                  {chip}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 grid grid-cols-2 gap-3"
            >
              <div className="rounded-2xl bg-card p-4">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Based
                </div>
                <div className="mt-1 flex items-center gap-1.5 font-display text-[15px] font-semibold text-ink">
                  <MapPin className="h-4 w-4 text-brand-pink" />
                  Bengaluru, India
                </div>
              </div>
              <div className="rounded-2xl bg-card p-4">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Community
                </div>
                <div className="mt-1 font-display text-[15px] font-semibold text-ink">
                  RAG++ · 3,700+ LI
                </div>
              </div>
            </motion.div>
          </div>

          {/* Experience timeline — scrolls within the card on desktop */}
          <div className="flex flex-col lg:min-h-0">
            <div className="mb-5 flex shrink-0 items-baseline justify-between">
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Experience timeline
              </h3>
              <span className="hidden text-[11px] font-medium text-muted-foreground/70 lg:block">
                Scroll for more
              </span>
            </div>

            <div className="relative lg:min-h-[24rem] lg:flex-1">
              {/* Fade masks so the cut-off edge reads as intentional */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden h-8 bg-gradient-to-b from-surface-soft to-transparent lg:block"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden h-12 bg-gradient-to-t from-surface-soft to-transparent lg:block"
              />

              {/* Absolute on lg so the timeline never inflates the row —
                  the left column alone decides the card height. */}
              <div className="lg:absolute lg:inset-0 lg:overflow-y-auto lg:pr-3 lg:[scrollbar-color:color-mix(in_srgb,var(--ink)_18%,transparent)_transparent] lg:[scrollbar-width:thin] lg:[&::-webkit-scrollbar-thumb]:rounded-full lg:[&::-webkit-scrollbar-thumb]:bg-ink/15 lg:[&::-webkit-scrollbar-track]:bg-transparent lg:[&::-webkit-scrollbar]:w-1.5 lg:hover:[&::-webkit-scrollbar-thumb]:bg-ink/25">
                <div className="relative lg:pb-8">
                  <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-border" />

                  <div className="space-y-4">
                    {experience.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={`${item.company}-${i}`}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 0.4, delay: i * 0.08 }}
                          className="relative pl-12"
                        >
                          <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal text-white">
                            <Icon className="h-4 w-4" strokeWidth={2} />
                          </div>

                          <div className="rounded-2xl bg-card p-4 transition-transform duration-300 hover:-translate-y-0.5">
                            <div className="text-[11px] font-semibold uppercase tracking-wide text-brand-pink">
                              {item.period}
                            </div>
                            <h4 className="mt-1 font-display text-[15px] font-semibold leading-tight tracking-[-0.02em] text-ink">
                              {item.role}
                            </h4>
                            <div className="mt-0.5 text-[12px] text-muted-foreground">
                              {item.company} · {item.location}
                            </div>
                            <ul className="mt-3 space-y-1.5">
                              {item.bullets.map((b) => (
                                <li
                                  key={b}
                                  className="flex items-start gap-2 text-[12.5px] text-ink/75"
                                >
                                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-pink/60" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
