"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import * as React from "react";

type Stat = {
  value: number;
  suffix?: string;
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
    color: "var(--brand-pink)",
  },
  {
    value: 5,
    suffix: "+",
    label: "deploys",
    hint: "production AI systems shipped",
    color: "var(--brand-teal)",
  },
  {
    value: 40,
    suffix: "%",
    label: "reduction",
    hint: "manual ops via OCR pipeline",
    color: "var(--brand-coral)",
  },
  {
    value: 3700,
    suffix: "+",
    label: "followers",
    hint: "AI community on LinkedIn",
    color: "var(--brand-ochre)",
  },
];

function CountUp({
  to,
  suffix = "",
  decimals = 0,
}: {
  to: number;
  suffix?: string;
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
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="bg-canvas py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative overflow-hidden rounded-3xl border border-border bg-surface-card p-6 sm:p-7"
            >
              <div
                className="font-display text-[2.75rem] font-semibold leading-none tracking-[-0.03em] sm:text-5xl lg:text-6xl"
                style={{ color: stat.color }}
              >
                <CountUp
                  to={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.value % 1 !== 0 ? 1 : 0}
                />
              </div>
              <div className="mt-3 font-display text-[15px] font-semibold text-ink">
                {stat.label}
              </div>
              <div className="mt-1 text-[13px] text-muted-foreground sm:text-sm">
                {stat.hint}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
