"use client";

import { motion } from "framer-motion";
import { Star4, Loop } from "@/components/portfolio/doodles";
import {
  Brain,
  Sparkles,
  Database,
  Target,
  Code2,
  Server,
  BarChart2,
  ScanLine,
} from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiPython,
  SiFastapi,
  SiFlask,
  SiDocker,
  SiGooglecloud,
  SiPostgresql,
  SiNginx,
  SiMongodb,
  SiOpenai,
  SiAnthropic,
  SiGooglegemini,
  SiZapier,
  SiHubspot,
  SiSalesforce,
  SiSnowflake,
  SiGit,
  SiMake,
  SiDbt,
} from "react-icons/si";
import type { LucideIcon } from "lucide-react";

// Map of tech name → brand icon component (only where a real brand icon exists)
const brandIcons: Record<string, IconType> = {
  Python: SiPython,
  "Python scraping": SiPython,
  FastAPI: SiFastapi,
  Flask: SiFlask,
  Docker: SiDocker,
  "Docker Compose": SiDocker,
  GCP: SiGooglecloud,
  PostgreSQL: SiPostgresql,
  Nginx: SiNginx,
  MongoDB: SiMongodb,
  "MongoDB Atlas": SiMongodb,
  "OpenAI GPT-4": SiOpenai,
  "Anthropic Claude": SiAnthropic,
  "Google Gemini": SiGooglegemini,
  Zapier: SiZapier,
  HubSpot: SiHubspot,
  Salesforce: SiSalesforce,
  Snowflake: SiSnowflake,
  Git: SiGit,
  Make: SiMake,
  dbt: SiDbt,
};

type Cluster = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

const clusters: Cluster[] = [
  {
    title: "AI orchestration",
    icon: Brain,
    items: ["LangGraph", "CrewAI", "LangChain", "LlamaIndex", "AutoGen", "Agent Zero", "LangFlow"],
  },
  {
    title: "LLM providers",
    icon: Sparkles,
    items: ["OpenAI GPT-4", "Anthropic Claude", "Google Gemini", "Azure OpenAI", "Vertex AI", "Groq"],
  },
  {
    title: "Vector DBs & retrieval",
    icon: Database,
    items: ["Qdrant", "Pinecone", "FAISS", "AstraDB", "MongoDB Atlas", "BM25 Hybrid"],
  },
  {
    title: "GTM & RevOps",
    icon: Target,
    items: ["Clay", "n8n", "Make", "Zapier", "Apollo", "ZoomInfo", "HubSpot", "Salesforce"],
  },
  {
    title: "Backend & APIs",
    icon: Code2,
    items: ["Python", "FastAPI", "Flask", "REST", "Webhooks", "Streaming", "Structured JSON"],
  },
  {
    title: "Infrastructure",
    icon: Server,
    items: ["Docker", "Docker Compose", "GCP", "PostgreSQL", "Nginx", "CI/CD", "Git"],
  },
  {
    title: "Observability & evals",
    icon: BarChart2,
    items: ["LangSmith", "Langfuse", "Phoenix Arize", "Evals", "Guardrails", "Hallucination control"],
  },
  {
    title: "Data & scraping",
    icon: ScanLine,
    items: ["Python scraping", "Google Maps API", "SQL", "Snowflake", "dbt", "MongoDB", "OCR / CV"],
  },
];

const certs = [
  { label: "LangChain: Chat with Your Data", issuer: "DeepLearning.AI" },
  { label: "Multi-Agent Systems with CrewAI", issuer: "DeepLearning.AI" },
  { label: "Generative AI for Everyone", issuer: "Andrew Ng" },
  { label: "Intro to Generative AI", issuer: "Google Cloud" },
  { label: "Dell Technologies AI-THON", issuer: "Dell" },
];

// Per-cluster accent tint, cycled through the Clay brand palette
const clusterTints = [
  "var(--brand-pink)",
  "var(--brand-mint)",
  "var(--brand-lavender)",
  "var(--brand-coral)",
  "var(--brand-ochre)",
  "var(--brand-mint)",
  "var(--brand-pink)",
  "var(--brand-lavender)",
];

function TechBadge({ item }: { item: string }) {
  const BrandIcon = brandIcons[item] as IconType | undefined;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-card px-2.5 py-1 text-[11.5px] font-medium text-ink/75">
      {BrandIcon && <BrandIcon className="h-3 w-3 shrink-0 opacity-70" />}
      {item}
    </span>
  );
}

export function TechStack() {
  return (
    <section id="stack" className="relative overflow-hidden bg-canvas py-20 sm:py-28">
      <Loop className="pointer-events-none absolute right-[4%] top-16 hidden h-12 w-12 text-brand-coral/30 lg:block" />
      <Star4 className="pointer-events-none absolute left-[3%] top-[40%] hidden h-7 w-7 text-ink/15 xl:block" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:mb-16 sm:flex-row sm:items-end">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-3 block text-[12px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
            >
              Tech stack
            </motion.span>
            <h2 className="max-w-2xl font-display text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-5xl">
              The full kit —{" "}
              <span className="font-serif-italic font-normal tracking-normal text-brand-coral">
                picked per job, not per comfort.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] text-muted-foreground">
            I pick the right tool for the problem, not the one I&apos;m most
            comfortable with. Here&apos;s the bench.
          </p>
        </div>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {clusters.map((cluster, i) => {
            const ClusterIcon = cluster.icon;
            const tint = clusterTints[i % clusterTints.length];
            return (
              <motion.div
                key={cluster.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="mb-4 flex items-center gap-2.5">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-xl"
                    style={{
                      color: tint,
                      background: `color-mix(in srgb, ${tint} 16%, transparent)`,
                    }}
                  >
                    <ClusterIcon className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <h3 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-ink">
                    {cluster.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cluster.items.map((item) => (
                    <TechBadge key={item} item={item} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Certs strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 overflow-hidden rounded-3xl bg-surface-card p-6 sm:p-8"
        >
          <h3 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Certifications
          </h3>
          <div className="flex flex-wrap gap-2">
            {certs.map((cert) => (
              <span
                key={cert.label}
                className="inline-flex items-center gap-2 rounded-full bg-card px-3.5 py-1.5 text-[12.5px]"
              >
                <span className="font-semibold text-ink">{cert.label}</span>
                <span className="text-muted-foreground">· {cert.issuer}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
