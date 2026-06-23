"use client";

/**
 * Hand-drawn black line-art doodles — The Kiln signature.
 * All use currentColor stroke, no fill, rounded caps. Size via className (w/h).
 */

type DoodleProps = { className?: string; strokeWidth?: number };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function Squiggle({ className, strokeWidth = 6 }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 40" className={className} aria-hidden>
      <path
        d="M6 26 C 20 6, 30 6, 40 22 S 62 38, 74 20 S 100 6, 114 22"
        strokeWidth={strokeWidth}
        {...base}
      />
    </svg>
  );
}

export function Sparkle({ className, strokeWidth = 6 }: DoodleProps) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden>
      <path
        d="M30 6 C 33 22, 38 27, 54 30 C 38 33, 33 38, 30 54 C 27 38, 22 33, 6 30 C 22 27, 27 22, 30 6 Z"
        strokeWidth={strokeWidth}
        {...base}
      />
    </svg>
  );
}

export function Loop({ className, strokeWidth = 6 }: DoodleProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden>
      <path
        d="M40 12 C 8 12, 8 56, 40 56 C 64 56, 70 24, 50 22 C 34 20, 30 44, 46 48 C 60 51, 64 38, 58 34"
        strokeWidth={strokeWidth}
        {...base}
      />
    </svg>
  );
}

export function Scribble({ className, strokeWidth = 6 }: DoodleProps) {
  return (
    <svg viewBox="0 0 130 50" className={className} aria-hidden>
      <path
        d="M8 40 C 28 8, 40 8, 44 30 C 48 8, 62 8, 66 30 C 70 8, 84 8, 88 30 C 92 10, 108 10, 122 26"
        strokeWidth={strokeWidth}
        {...base}
      />
    </svg>
  );
}

export function ArrowDoodle({ className, strokeWidth = 6 }: DoodleProps) {
  return (
    <svg viewBox="0 0 90 80" className={className} aria-hidden>
      <path
        d="M12 14 C 50 6, 78 28, 70 66"
        strokeWidth={strokeWidth}
        {...base}
      />
      <path d="M54 56 L 70 68 L 80 50" strokeWidth={strokeWidth} {...base} />
    </svg>
  );
}

export function Star4({ className, strokeWidth = 6 }: DoodleProps) {
  return (
    <svg viewBox="0 0 50 50" className={className} aria-hidden>
      <path d="M25 6 L25 44 M6 25 L44 25 M12 12 L38 38 M38 12 L12 38" strokeWidth={strokeWidth} {...base} />
    </svg>
  );
}

/** The kiln/hourglass mascot — a friendly clay-firing motif. */
export function Hourglass({ className, strokeWidth = 5 }: DoodleProps) {
  return (
    <svg viewBox="0 0 90 110" className={className} aria-hidden>
      <path d="M18 14 H72 M18 96 H72" strokeWidth={strokeWidth} {...base} />
      <path
        d="M24 14 C 24 40, 66 40, 66 14 M24 96 C 24 70, 66 70, 66 96"
        strokeWidth={strokeWidth}
        {...base}
      />
      <path d="M38 52 C 38 58, 52 58, 52 58 C 52 64, 38 64, 38 70" strokeWidth={strokeWidth - 1} {...base} />
    </svg>
  );
}
