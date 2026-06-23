"use client";

import { motion } from "framer-motion";

const tools = [
  "LangGraph",
  "CrewAI",
  "LangChain",
  "LlamaIndex",
  "OpenAI",
  "Anthropic",
  "Gemini",
  "Qdrant",
  "Pinecone",
  "FAISS",
  "FastAPI",
  "Docker",
  "Clay",
  "n8n",
  "HubSpot",
  "Apollo",
  "Python",
  "GCP",
  "LangSmith",
  "AutoGen",
];

export function Marquee() {
  return (
    <section
      aria-label="Tools I build with"
      className="relative border-y border-border bg-surface-soft py-6"
    >
      <div className="mb-3 text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        The stack I actually ship with
      </div>
      <div className="relative flex overflow-hidden">
        {/* Left/right fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface-soft to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface-soft to-transparent" />
        <motion.div
          className="flex shrink-0 items-center gap-8 pr-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {[...tools, ...tools].map((tool, i) => (
            <span
              key={`${tool}-${i}`}
              className="whitespace-nowrap text-base font-semibold tracking-[-0.01em] text-ink/70"
            >
              {tool}
              <span className="ml-8 text-brand-pink/50">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
