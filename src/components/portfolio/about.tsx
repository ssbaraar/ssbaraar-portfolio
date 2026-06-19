"use client";

import { motion } from "framer-motion";
import { Building2, GraduationCap, MapPin } from "lucide-react";

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
    <section id="about" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* About content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              About me
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
            >
              I&apos;m Baraar Sreesha — I close the gap between{" "}
              <span className="text-primary">AI engineering</span> and{" "}
              <span className="text-primary">revenue operations</span>.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 space-y-3 text-base leading-relaxed text-muted-foreground"
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
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
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
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="font-mono-jb text-[10px] uppercase tracking-wider text-muted-foreground">
                  Based
                </div>
                <div className="mt-1 flex items-center gap-1.5 font-display text-sm font-semibold">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  Bengaluru, India
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="font-mono-jb text-[10px] uppercase tracking-wider text-muted-foreground">
                  Community
                </div>
                <div className="mt-1 font-display text-sm font-semibold">
                  RAG++ · 3,700+ LI
                </div>
              </div>
            </motion.div>
          </div>

          {/* Experience timeline */}
          <div>
            <h3 className="mb-6 font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Experience timeline
            </h3>

            <div className="relative">
              <div className="absolute left-[18px] top-2 bottom-2 w-px bg-border" />

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
                      <div className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground">
                        <Icon className="h-4 w-4" strokeWidth={2} />
                      </div>

                      <div className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-foreground/20">
                        <div className="font-mono-jb text-[10px] uppercase tracking-wider text-primary">
                          {item.period}
                        </div>
                        <h4 className="mt-1 font-display text-base font-bold leading-tight tracking-tight">
                          {item.role}
                        </h4>
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          {item.company} · {item.location}
                        </div>
                        <ul className="mt-3 space-y-1.5">
                          {item.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-start gap-2 text-xs text-foreground/75"
                            >
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
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
