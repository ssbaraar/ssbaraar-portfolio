import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Baraar Sreesha — Applied AI & GTM Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#0a0a0a",
          padding: "64px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Blue top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "oklch(0.65 0.19 264)",
            backgroundColor: "#4f8ef7",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            position: "absolute",
            top: "52px",
            left: "64px",
            width: "48px",
            height: "48px",
            background: "#ffffff",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
            fontWeight: "700",
            color: "#0a0a0a",
          }}
        >
          B
        </div>

        {/* Availability badge */}
        <div
          style={{
            position: "absolute",
            top: "56px",
            right: "64px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "999px",
            padding: "6px 16px",
            fontSize: "13px",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#4f8ef7",
            }}
          />
          Available · Q3 2026
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: "68px",
            fontWeight: "800",
            lineHeight: "1.02",
            letterSpacing: "-2px",
            color: "#ffffff",
            marginBottom: "24px",
            maxWidth: "880px",
          }}
        >
          I build{" "}
          <span style={{ color: "#4f8ef7" }}>AI systems</span>
          {" "}that ship to production.
        </div>

        {/* Sub-line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
          }}
        >
          <div style={{ fontSize: "22px", color: "rgba(255,255,255,0.55)", fontWeight: "400" }}>
            Baraar Sreesha Sreenivas
          </div>
          <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
          <div style={{ fontSize: "22px", color: "rgba(255,255,255,0.55)" }}>
            Applied AI · GTM · RAG · Bengaluru
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
