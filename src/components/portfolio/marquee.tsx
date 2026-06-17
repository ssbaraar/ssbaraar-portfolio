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
      className="relative border-y border-border/60 bg-card/30 py-5"
    >
      <div className="mb-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        The stack I actually ship with
      </div>
      <div className="relative flex overflow-hidden">
        {/* Left/right fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <motion.div
          className="flex shrink-0 items-center gap-8 pr-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {[...tools, ...tools].map((tool, i) => (
            <span
              key={`${tool}-${i}`}
              className="font-mono-jb whitespace-nowrap text-base font-medium text-muted-foreground/80"
            >
              {tool}
              <span className="ml-8 text-primary/40">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
