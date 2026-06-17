"use client";

import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/baraarsreesha" },
  { label: "GitHub", href: "https://github.com/ssbaraar" },
  { label: "HuggingFace", href: "https://huggingface.co/relnse" },
  { label: "Twitter / X", href: "https://twitter.com/sreesha_baraar" },
];

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/?view=blog" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand block */}
          <div>
            <Link
              href="/#top"
              className="group inline-flex items-center gap-2.5 font-display text-base font-semibold"
            >
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-300 group-hover:rotate-[18deg]">
                <span className="font-display text-sm font-bold">B</span>
                <Sparkles className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 text-primary" />
              </span>
              Baraar Sreesha
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Applied AI &amp; GTM Systems Engineer building production RAG,
              agentic workflows, and Clay/n8n GTM automation for revenue teams.
              Bengaluru · remote worldwide.
            </p>
            <p className="mt-4 font-mono-jb text-xs text-muted-foreground/80">
              Open to: fractional retainers · scoped projects · full-time Applied
              AI / GTM / FDE roles
            </p>
          </div>

          {/* Nav */}
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Sitemap
            </div>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Find me
            </div>
            <ul className="space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:ssbaraar02@gmail.com"
                  className="text-sm text-foreground/80 transition-colors hover:text-primary"
                >
                  ssbaraar02@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} Baraar Sreesha Sreenivas.</span>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1">
              Built with <Heart className="h-3 w-3 fill-current text-coral" /> in
              Bengaluru
            </span>
          </div>
          <div className="font-mono-jb">
            v1.0 · Next.js · Tailwind · Framer Motion
          </div>
        </div>
      </div>
    </footer>
  );
}
