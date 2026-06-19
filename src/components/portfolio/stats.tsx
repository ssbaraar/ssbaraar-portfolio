"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import * as React from "react";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
  hint: string;
};

const stats: Stat[] = [
  {
    value: 2.5,
    suffix: "+",
    label: "yrs",
    hint: "production AI experience",
  },
  {
    value: 5,
    suffix: "+",
    label: "deploys",
    hint: "production AI systems shipped",
  },
  {
    value: 40,
    suffix: "%",
    label: "reduction",
    hint: "manual ops via OCR pipeline",
  },
  {
    value: 3700,
    suffix: "+",
    label: "followers",
    hint: "AI community on LinkedIn",
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
              className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-7"
            >
              <div className="font-display text-4xl font-bold leading-none tracking-tight text-foreground sm:text-5xl lg:text-6xl">
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
