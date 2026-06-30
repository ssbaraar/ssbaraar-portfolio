"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Play, ExternalLink, Mic, Video } from "lucide-react";

type Appearance = {
  type: "video" | "podcast";
  title: string;
  publisher: string;
  publisherLogo?: string;
  description: string;
  thumbnail: string;
  url: string;
  date: string;
  badge: string;
  badgeColor: string;
};

const appearances: Appearance[] = [
  {
    type: "video",
    title: "DataStax AI Hero: Sreesha Baraar",
    publisher: "DataStax",
    description:
      "Featured by DataStax as an AI Hero — sharing insights on building with Generative AI, favorite dev tools, and advice for aspiring AI engineers.",
    thumbnail: "https://i.ytimg.com/vi/yYd5TDdlD0A/hqdefault.jpg",
    url: "https://www.youtube.com/shorts/yYd5TDdlD0A",
    date: "2025",
    badge: "AI Hero Feature",
    badgeColor: "#6366f1",
  },
  {
    type: "podcast",
    title: "AI & AI Agents — Setu School Podcast",
    publisher: "Setu School",
    description:
      "Guest on the Setu School podcast discussing AI Agents, multi-agent architectures, and the future of agentic AI systems in production.",
    thumbnail: "",
    url: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7340370584800739328/",
    date: "2025",
    badge: "Podcast Guest",
    badgeColor: "#10b981",
  },
];

function AppearanceCard({ item, index }: { item: Appearance; index: number }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.a
      ref={ref}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/40 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lg"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-foreground/5">
        {item.thumbnail ? (
          <>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Play overlay */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background/90 shadow-lg backdrop-blur-sm">
                <Play className="h-6 w-6 fill-foreground text-foreground" />
              </div>
            </div>
            {/* Dark gradient bottom */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
          </>
        ) : (
          /* Podcast fallback — no thumbnail */
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary to-card">
            <Mic className="h-12 w-12 text-muted-foreground/40" />
          </div>
        )}

        {/* Badge */}
        <div
          className="absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-white shadow"
          style={{ backgroundColor: item.badgeColor }}
        >
          {item.badge}
        </div>

        {/* Type icon */}
        <div className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm">
          {item.type === "video" ? (
            <Video className="h-3.5 w-3.5 text-foreground/70" />
          ) : (
            <Mic className="h-3.5 w-3.5 text-foreground/70" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {item.publisher}
          </span>
          <span className="text-muted-foreground/40">·</span>
          <span className="font-mono text-[10px] text-muted-foreground">{item.date}</span>
        </div>

        <h3 className="font-display text-base font-bold leading-snug tracking-tight sm:text-lg">
          {item.title}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group-hover:text-foreground text-foreground/70">
          {item.type === "video" ? "Watch" : "Listen"}
          <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.a>
  );
}

export function MediaAppearances() {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      aria-label="Media appearances and podcast features"
      className="relative border-y border-border bg-surface-soft py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Media & Features
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Featured by leading AI companies
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Podcast guest and featured engineer — talking production AI systems, agentic architectures, and real-world GTM automation.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:max-w-3xl lg:mx-auto">
          {appearances.map((item, i) => (
            <AppearanceCard key={item.url} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
