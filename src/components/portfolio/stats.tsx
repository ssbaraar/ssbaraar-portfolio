"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import * as React from "react";

type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  hint: string;
  color: string;
};

const stats: Stat[] = [
  {
    value: 2.5,
    suffix: "+",
    label: "yrs",
    hint: "production AI experience",
    color: "var(--lime)",
  },
  {
    value: 5,
    suffix: "+",
    label: "deploys",
    hint: "production AI systems shipped",
    color: "var(--coral)",
  },
  {
    value: 40,
    suffix: "%",
    label: "reduction",
    hint: "manual ops via OCR pipeline",
    color: "var(--lavender)",
  },
  {
    value: 3700,
    suffix: "+",
    label: "followers",
    hint: "AI community on LinkedIn",
    color: "var(--amber)",
  },
];

function CountUp({
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    latest.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );

  React.useEffect(() => {
    if (inView) {
      const controls = animate(count, to, {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [inView, to, count]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card/40 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:border-foreground/15 sm:p-7"
            >
              <div
                className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-30"
                style={{ background: stat.color }}
              />
              <div
                className="font-display text-4xl font-bold leading-none tracking-tight sm:text-5xl lg:text-6xl"
                style={{ color: stat.color }}
              >
                <CountUp
                  to={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.value % 1 !== 0 ? 1 : 0}
                />
              </div>
              <div className="mt-3 font-display text-sm font-semibold sm:text-base">
                {stat.label}
              </div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {stat.hint}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
