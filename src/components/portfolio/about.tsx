"use client";

import { motion } from "framer-motion";
import { Building2, GraduationCap, MapPin } from "lucide-react";
import { Sparkle, Squiggle } from "@/components/portfolio/doodles";

const experience = [
  {
    period: "Jul 2025 – Present",
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
  "LangGraph multi-agent",
  "RAG · 95%+ accuracy",
  "Clay + n8n GTM",
  "FastAPI · Docker",
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-surface-soft py-20 sm:py-28">
      <Sparkle className="pointer-events-none absolute right-[5%] top-16 hidden h-9 w-9 text-brand-coral/40 lg:block" />
      <Squiggle className="pointer-events-none absolute left-[3%] bottom-20 hidden h-8 w-24 text-ink/15 xl:block" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* About content */}
          <div>
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
                AI engineering
              </span>{" "}
              and{" "}
              <span className="font-serif-italic font-normal tracking-normal text-brand-coral">
                revenue operations
              </span>
              .
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 space-y-3 text-[15.5px] leading-relaxed text-muted-foreground"
            >
              <p>
                I build AI systems that ship to production — not just demos.
                Latency budgets before model selection. Fallback paths before the
                happy path. Monitoring before the feature code.
              </p>
              <p>
                Currently Senior SWE — GenAI &amp; Solutions Architect at
                Motiveminds Consulting. Open to fractional, scoped, and full-time
                Applied AI / GTM / FDE roles.
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

          {/* Experience timeline */}
          <div>
            <h3 className="mb-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Experience timeline
            </h3>

            <div className="relative">
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
    </section>
  );
}
