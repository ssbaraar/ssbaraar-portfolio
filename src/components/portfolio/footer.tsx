"use client";

import Link from "next/link";

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/baraarsreesha" },
  { label: "GitHub", href: "https://github.com/ssbaraar" },
  { label: "HuggingFace", href: "https://huggingface.co/ssbaraar" },
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
    <footer className="relative mt-auto overflow-hidden bg-surface-soft">
      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-14 sm:px-8 sm:pt-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand block */}
          <div>
            <Link
              href="/#top"
              className="inline-flex items-center gap-2.5 font-display text-base font-semibold text-ink"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-ink font-display text-sm font-bold text-white">
                B
              </span>
              Baraar Sreesha
            </Link>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
              Applied AI &amp; GTM Systems Engineer building production RAG,
              agentic workflows, and Clay/n8n GTM automation for revenue teams.
              Bengaluru · remote worldwide.
            </p>
            <p className="mt-4 text-[12.5px] text-muted-foreground/80">
              Open to: fractional retainers · scoped projects · full-time Applied
              AI / GTM / FDE roles
            </p>
          </div>

          {/* Nav */}
          <div>
            <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Sitemap
            </div>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-ink/70 transition-colors hover:text-brand-pink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Find me
            </div>
            <ul className="space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] text-ink/70 transition-colors hover:text-brand-pink"
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:ssbaraar02@gmail.com"
                  className="text-[14px] text-ink/70 transition-colors hover:text-brand-pink"
                >
                  ssbaraar02@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-[12px] text-muted-foreground sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Baraar Sreesha Sreenivas.</span>
          <div>Next.js · Tailwind · Framer Motion · Clay-inspired design</div>
        </div>
      </div>

      {/* Signature claymation mountain horizon */}
      <svg
        aria-hidden
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="mt-10 block h-24 w-full sm:h-32"
      >
        <path d="M0 160 V96 Q180 40 360 86 T720 78 T1080 70 T1440 96 V160 Z" fill="#b8a4ed" />
        <path d="M0 160 V120 Q220 72 440 112 T880 104 T1440 120 V160 Z" fill="#ffb084" />
        <path d="M0 160 V138 Q260 104 520 134 T1040 128 T1440 140 V160 Z" fill="#1a3a3a" />
      </svg>
    </footer>
  );
}
