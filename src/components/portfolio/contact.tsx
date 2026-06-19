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
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "3,700+ followers",
    href: "https://linkedin.com/in/baraarsreesha",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "27 public repos",
    href: "https://github.com/ssbaraar",
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    value: "@sreesha_baraar",
    href: "https://twitter.com/sreesha_baraar",
  },
  {
    icon: Boxes,
    label: "HuggingFace",
    value: "ssbaraar",
    href: "https://huggingface.co/ssbaraar",
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground p-7 text-background sm:p-12 lg:p-16"
        >
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-background/15 bg-background/8 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-background/60">
                <span className="h-1.5 w-1.5 rounded-full bg-background/60" />
                Let&apos;s talk
              </div>
              <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-balance text-background sm:text-5xl lg:text-6xl">
                Ready to build something that{" "}
                <span className="text-primary">actually runs</span> in production?
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-background/60 sm:text-base">
                Manual ops that should be automated. AI prototype that never shipped. GTM system on spreadsheets. A 20-min call is enough for me to tell you if I can help.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://calendly.com/baraarsreesha/intro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-background px-6 text-sm font-semibold text-foreground transition-opacity hover:opacity-90 active:opacity-80"
                >
                  <Calendar className="h-4 w-4" />
                  Book a 20-min intro call
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="mailto:ssbaraar02@gmail.com"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-background/20 px-6 text-sm font-semibold text-background transition-colors hover:bg-background/8"
                >
                  <Mail className="h-4 w-4" />
                  Email me
                </a>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-background/50">
                <MapPin className="h-3.5 w-3.5" />
                <span>Bengaluru, India · IST (UTC+5:30)</span>
                <span className="mx-1.5 h-1 w-1 rounded-full bg-background/30" />
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
                    className="group flex items-center justify-between rounded-xl border border-background/10 bg-background/5 p-3.5 transition-colors hover:bg-background/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-background/10 bg-background/8 text-background/70">
                        <Icon className="h-4 w-4" strokeWidth={1.8} />
                      </div>
                      <div>
                        <div className="font-mono-jb text-[10px] uppercase tracking-wider text-background/50">
                          {ch.label}
                        </div>
                        <div className="font-display text-sm font-semibold text-background">
                          {ch.value}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-background/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-background/70" />
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
