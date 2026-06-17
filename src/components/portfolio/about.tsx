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
    accent: "var(--lime)",
    bullets: [
      "Partner directly with enterprise clients on SAP + Salesforce GenAI workflows",
      "Architect multi-agent systems with tool calling, state management, self-correcting execution loops",
      "Build enterprise RAG with citation grounding, hallucination control, 95%+ accuracy",
      "Containerized FastAPI deployment + LangSmith observability + evals",
    ],
  },
  {
    period: "Jan 2025 – Jul 2025",
    role: "Software Engineer — GenAI / GTM",
    company: "W3 SaaS Technologies",
    location: "Remote · Dubai International Financial Centre",
    icon: Building2,
    accent: "var(--coral)",
    bullets: [
      "+20% lead-gen efficiency via Clay / n8n / Apollo / HubSpot / Salesforce",
      "+50% outbound acceleration via automated prospect research + AI personalization",
      "Dockerized Python/FastAPI microservices for fintech-grade workflows",
      "Shipped GenAI SaaS product features using LLM APIs + backend services",
    ],
  },
  {
    period: "Jul 2024 – Dec 2024",
    role: "GenAI Research Intern",
    company: "Blockchain Laboratories",
    location: "Remote · Wyoming, United States",
    icon: Building2,
    accent: "var(--lavender)",
    bullets: [
      "Multi-agent prototypes: LangChain, LangGraph, LangFlow, CrewAI, AutoGen, Agent Zero",
      "+25% RAG and multi-agent performance via advanced vector search + retrieval eval",
      "Researched hallucination control, retrieval grounding, self-correcting workflow patterns",
    ],
  },
  {
    period: "Apr 2024 – Aug 2024",
    role: "Full Stack Developer",
    company: "Hyderabad Forex Limited",
    location: "Hyderabad, India",
    icon: Building2,
    accent: "var(--amber)",
    bullets: [
      "−40% manual data entry via OCR KYC pipeline",
      "−30% onboarding turnaround via FastAPI REST API automation",
      "Production deployment in regulated financial operations",
    ],
  },
  {
    period: "2020 – 2024",
    role: "B.E. Computer Science",
    company: "JSS Science and Technology University",
    location: "Mysuru, India",
    icon: GraduationCap,
    accent: "var(--mint)",
    bullets: ["CSE foundations — algorithms, systems, databases, networks"],
  },
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
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground"
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
              <span className="squiggly-coral">AI engineering</span> and{" "}
              <span className="squiggly">revenue operations</span>.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              <p>
                I got into AI engineering because I kept watching the same thing
                happen: a team would spend months building an AI prototype that
                worked beautifully in a notebook, demo it to the C-suite, get
                budget approved — and then watch it slowly die in staging because
                nobody thought about production.
              </p>
              <p>
                That&apos;s the gap I close. I build AI systems with production
                in mind from day one. That means thinking about latency budgets
                before model selection, building fallback paths before the happy
                path, and writing the monitoring setup before the feature code.
              </p>
              <p>
                My work sits at the intersection of two worlds that don&apos;t
                usually talk to each other: AI engineering and GTM / revenue
                operations. I&apos;ve built multi-agent LangGraph systems for
                enterprise clients, RAG knowledge assistants over thousands of
                internal documents, and Clay + n8n outbound pipelines that
                replaced $2,000/month data subscriptions with fresher custom data.
              </p>
              <p>
                Currently a Senior SWE — GenAI &amp; Solutions Architect at
                Motiveminds Consulting. Open to fractional retainer engagements,
                scoped project builds, and full-time Applied AI / GTM / Forward
                Deployed AI roles at remote-first companies.
              </p>
            </motion.div>

            {/* Quick facts */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-7 grid grid-cols-2 gap-3"
            >
              <div className="rounded-2xl border border-border bg-card/40 p-4 backdrop-blur">
                <div className="font-mono-jb text-[10px] uppercase tracking-wider text-muted-foreground">
                  Based
                </div>
                <div className="mt-1 flex items-center gap-1.5 font-display text-sm font-semibold">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  Bengaluru, India
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card/40 p-4 backdrop-blur">
                <div className="font-mono-jb text-[10px] uppercase tracking-wider text-muted-foreground">
                  Community
                </div>
                <div className="mt-1 font-display text-sm font-semibold">
                  RAG++ Bengaluru · 3,700+ LI
                </div>
              </div>
            </motion.div>
          </div>

          {/* Experience timeline */}
          <div>
            <div className="mb-6 flex items-center gap-2">
              <span className="text-xl">📍</span>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Experience timeline
              </h3>
            </div>

            <div className="relative">
              {/* Vertical line */}
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
                      {/* Node */}
                      <div
                        className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-card"
                        style={{ color: item.accent }}
                      >
                        <Icon className="h-4 w-4" strokeWidth={2} />
                      </div>

                      <div className="rounded-2xl border border-border bg-card/40 p-4 backdrop-blur transition-colors hover:border-foreground/15">
                        <div
                          className="font-mono-jb text-[10px] uppercase tracking-wider"
                          style={{ color: item.accent }}
                        >
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
                              <span
                                className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                                style={{ background: item.accent }}
                              />
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
