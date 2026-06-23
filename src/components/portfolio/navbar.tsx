"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/portfolio/brand-mark";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

// Order matches the on-page flow, top to bottom
const navItems = [
  { label: "Services", href: "/#services", id: "services" },
  { label: "Work", href: "/#work", id: "work" },
  { label: "Process", href: "/#process", id: "process" },
  { label: "About", href: "/#about", id: "about" },
  { label: "FAQ", href: "/#faq", id: "faq" },
  { label: "Blog", href: "/?view=blog", id: "blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeId, setActiveId] = React.useState<string | null>(null);

  // Top scroll-progress bar
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  // Sticky-state detection
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view
  React.useEffect(() => {
    const sectionIds = ["services", "work", "process", "about", "faq", "blog", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Trigger when section's top crosses ~30% from the top of viewport
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 1],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "py-2.5" : "py-4"
        )}
      >
        {/* Scroll progress bar — sits on the bottom edge of the navbar pill */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            style={{ scaleX: progressScale }}
            className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-0.5 max-w-7xl origin-left bg-brand-pink"
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div
            className={cn(
              "flex items-center justify-between rounded-full border border-transparent px-4 py-2.5 transition-all duration-300 sm:px-5",
              scrolled &&
                "border-border bg-card/80 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.12)] backdrop-blur-xl"
            )}
          >
            {/* Logo */}
            <Link
              href="/#top"
              className="group flex items-center gap-2.5 font-display text-base font-semibold tracking-tight"
            >
              <BrandMark className="h-9 w-9" />
              <span className="hidden sm:inline">Sreesha</span>
            </Link>

            {/* Desktop nav with active-section highlight */}
            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {/* Active background pill (animated) */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-surface-card"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                    {/* Hover underline (only when not active) */}
                    {!isActive && (
                      <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-brand-pink transition-transform duration-300 group-hover:scale-x-100" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/#contact"
                className="hidden cursor-pointer rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 active:translate-y-0 sm:inline-flex"
              >
                Let&apos;s talk →
              </Link>

              {/* Mobile trigger */}
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/50 backdrop-blur md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-4 py-4">
              <span className="font-display text-lg font-semibold">Menu</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-2 px-4 pt-6">
              {navItems.map((item, i) => {
                const isActive = activeId === item.id;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between border-b border-border/60 py-4 font-display text-3xl font-semibold tracking-tight"
                    >
                      <span className={cn(isActive && "text-primary")}>
                        {item.label}
                      </span>
                      <span className="text-primary">
                        {isActive ? "•" : "→"}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
              <Link
                href="https://calendly.com/baraarsreesha/intro"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mt-6 inline-flex h-14 items-center justify-center rounded-2xl bg-foreground text-lg font-semibold text-background"
              >
                Book a 20-min intro call
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
