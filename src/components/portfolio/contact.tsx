"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Mail,
  Linkedin,
  Github,
  Twitter,
  Boxes,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "ssbaraar02@gmail.com",
    href: "mailto:ssbaraar02@gmail.com",
    accent: "var(--lime)",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "3,700+ followers",
    href: "https://linkedin.com/in/baraarsreesha",
    accent: "var(--coral)",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "27 public repos",
    href: "https://github.com/ssbaraar",
    accent: "var(--lavender)",
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    value: "@sreesha_baraar",
    href: "https://twitter.com/sreesha_baraar",
    accent: "var(--amber)",
  },
  {
    icon: Boxes,
    label: "HuggingFace",
    value: "relnse",
    href: "https://huggingface.co/relnse",
    accent: "var(--mint)",
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Final CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="noise-overlay relative overflow-hidden rounded-[2rem] border border-border bg-foreground p-7 text-background sm:p-12 lg:p-16"
        >
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
            <div
              className="blob animate-blob absolute -left-16 -top-16 h-72 w-72 rounded-full opacity-30"
              style={{ background: "var(--lime)" }}
            />
            <div
              className="blob animate-blob absolute -right-16 -bottom-16 h-72 w-72 rounded-full opacity-20"
              style={{ background: "var(--coral)", animationDelay: "5s" }}
            />
          </div>

          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-background/70 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Let&apos;s talk
              </div>
              <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Ready to build something that{" "}
                <span style={{ color: "var(--lime)" }}>actually runs</span> in
                production?
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-background/70 sm:text-base">
                If you have a manual ops workflow that should be automated, an
                AI prototype that never made it to production, or a GTM system
                still running on spreadsheets — let&apos;s talk. A 20-minute call
                is enough for me to tell you if I can help and what it would look
                like.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://calendly.com/baraarsreesha/intro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-background px-6 text-sm font-semibold text-foreground transition-transform hover:scale-[1.03] active:scale-95"
                >
                  <Calendar className="h-4 w-4" />
                  Book a 20-min intro call
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="mailto:ssbaraar02@gmail.com"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-background/30 px-6 text-sm font-semibold text-background transition-colors hover:bg-background/10"
                >
                  <Mail className="h-4 w-4" />
                  Email me
                </a>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-background/60">
                <MapPin className="h-3.5 w-3.5" />
                <span>Bengaluru, India · IST (UTC+5:30)</span>
                <span className="mx-1.5 h-1 w-1 rounded-full bg-background/40" />
                <span>Responds within 1 business day</span>
              </div>
            </div>

            {/* Channel list */}
            <div className="flex flex-col gap-2.5">
              {channels.map((ch) => {
                const Icon = ch.icon;
                return (
                  <a
                    key={ch.label}
                    href={ch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-2xl border border-background/15 bg-background/5 p-3.5 backdrop-blur transition-all hover:bg-background/10"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-background/15 bg-background/10"
                        style={{ color: ch.accent }}
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.8} />
                      </div>
                      <div>
                        <div className="font-mono-jb text-[10px] uppercase tracking-wider text-background/60">
                          {ch.label}
                        </div>
                        <div className="font-display text-sm font-semibold">
                          {ch.value}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-background/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-background" />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
