"use client";

import { useEffect } from "react";

/**
 * Anti-inspect deterrent.
 *
 * Honest truth: nothing can FULLY hide browser code — the browser must
 * receive it to render. This component just deters the 95% of casual
 * copy-pasters by:
 *   - blocking right-click context menu
 *   - blocking F12, Ctrl+Shift+I/J/C, Cmd+Opt+I/J/C, Ctrl+U (view source)
 *   - printing a friendly console warning when DevTools is opened
 *
 * Determined users can still bypass all of this. Source maps are already
 * stripped in next.config.ts so the original source isn't reconstructable.
 */
export function AntiInspect() {
  useEffect(() => {
    // Big console banner for anyone who opens DevTools
    console.log(
      "%c👋 Hi there!",
      "color: var(--lime, #84cc16); font-size: 28px; font-weight: bold;"
    );
    console.log(
      "%cCurious about how this site is built? Reach out to ssbaraar02@gmail.com — happy to chat about Applied AI / GTM engineering.",
      "color: #888; font-size: 13px;"
    );

    // Block right-click context menu
    const onContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Block common devtools / view-source keyboard shortcuts
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key?.toLowerCase() ?? "";
      // F12
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (Win/Linux)
      // Cmd+Opt+I / Cmd+Opt+J / Cmd+Opt+C (Mac)
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        ["i", "j", "c"].includes(key)
      ) {
        e.preventDefault();
        return false;
      }
      // Ctrl+U — view source
      if ((e.ctrlKey || e.metaKey) && key === "u") {
        e.preventDefault();
        return false;
      }
      // Ctrl+S — save page
      if ((e.ctrlKey || e.metaKey) && key === "s") {
        e.preventDefault();
        return false;
      }
    };

    // Block certain selection on code-like elements (optional, light friction)
    const onCopy = (e: ClipboardEvent) => {
      // Allow copy from inputs/textareas (so users can copy email etc.)
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.closest("a") ||
          target.closest("[data-allow-copy]"))
      ) {
        return; // let it through
      }
      e.preventDefault();
      console.log(
        "%c✋ Copying is disabled. Email ssbaraar02@gmail.com if you need anything.",
        "color: #ff6b5b; font-size: 12px;"
      );
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("copy", onCopy);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("copy", onCopy);
    };
  }, []);

  return null;
}
