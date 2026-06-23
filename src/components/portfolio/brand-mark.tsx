/**
 * Brand mark — a clay "squircle" tile holding a 3-node pipeline monogram
 * (nodes + links = the AI systems / pipeline I build), with a coral spark node.
 * `tone="ink"` for light backgrounds, `tone="cream"` for dark ones.
 */
export function BrandMark({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "cream";
}) {
  const tile = tone === "ink" ? "#141414" : "#FCFBF7";
  const node = tone === "ink" ? "#FCFBF7" : "#141414";
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="64" height="64" rx="16" fill={tile} />
      <path
        d="M24 21 L42 32 L24 43"
        stroke={node}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="21" r="6" fill={node} />
      <circle cx="24" cy="43" r="6" fill={node} />
      <circle cx="42" cy="32" r="6.5" fill="#FF6B5A" />
    </svg>
  );
}
