"use client";

import { motion } from "framer-motion";
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

function TechBadge({ item }: { item: string }) {
  const BrandIcon = brandIcons[item] as IconType | undefined;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2.5 py-1 font-mono-jb text-[11px] text-foreground/80">
      {BrandIcon && <BrandIcon className="h-3 w-3 shrink-0 opacity-70" />}
      {item}
    </span>
  );
}

export function TechStack() {
  return (
    <section id="stack" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Tech stack
            </motion.div>
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              The full kit —{" "}
              <span className="text-muted-foreground">picked per job, not per comfort.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            I pick the right tool for the problem, not the one I&apos;m most
            comfortable with. Here&apos;s the bench.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
          {clusters.map((cluster, i) => {
            const ClusterIcon = cluster.icon;
            return (
              <motion.div
                key={cluster.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/20"
              >
                <div className="mb-3 flex items-center gap-2">
                  <ClusterIcon className="h-3.5 w-3.5 shrink-0 text-primary/70" strokeWidth={1.8} />
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
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
          className="mt-5 overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8"
        >
          <h3 className="mb-4 font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Certifications
          </h3>
          <div className="flex flex-wrap gap-2">
            {certs.map((cert) => (
              <span
                key={cert.label}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5 text-xs"
              >
                <span className="font-medium">{cert.label}</span>
                <span className="text-muted-foreground">· {cert.issuer}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
