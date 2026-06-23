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
    <section id="contact" className="relative bg-canvas py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] bg-brand-teal p-8 text-white sm:p-12 lg:p-16"
        >
          {/* soft claymation orbs */}
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-ochre/20 blur-2xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-brand-pink/15 blur-2xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/85">
                Let&apos;s talk
              </span>
              <h2 className="font-display text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.035em] text-balance text-white sm:text-5xl lg:text-[3.5rem]">
                Ready to build something that{" "}
                <span className="text-brand-ochre">actually runs</span> in
                production?
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/75 sm:text-base">
                Manual ops that should be automated. AI prototype that never
                shipped. GTM system on spreadsheets. A 20-min call is enough for me
                to tell you if I can help.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://calendly.com/baraarsreesha/intro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Calendar className="h-4 w-4" />
                  Book a 20-min intro call
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="mailto:ssbaraar02@gmail.com"
                  className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Mail className="h-4 w-4" />
                  Email me
                </a>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-white/55">
                <MapPin className="h-3.5 w-3.5" />
                <span>Bengaluru, India · IST (UTC+5:30)</span>
                <span className="mx-1.5 h-1 w-1 rounded-full bg-white/30" />
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
                    className="group flex items-center justify-between rounded-2xl bg-white/8 p-3.5 transition-colors hover:bg-white/14"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/12 text-white/85">
                        <Icon className="h-4 w-4" strokeWidth={2} />
                      </div>
                      <div>
                        <div className="text-[11px] font-medium uppercase tracking-wide text-white/55">
                          {ch.label}
                        </div>
                        <div className="font-display text-sm font-semibold text-white">
                          {ch.value}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-white/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/80" />
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
