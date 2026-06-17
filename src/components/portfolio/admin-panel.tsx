"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  X,
  RefreshCw,
  Trash2,
  AlertTriangle,
  Bot,
  Lock,
  ExternalLink,
} from "lucide-react";

type Attempt = {
  id: string;
  ts: number;
  ip: string | null;
  method: string;
  path: string;
  ua: string | null;
  reason: string;
  blocked: boolean;
};

const DEFAULT_TOKEN = "sreesha-secret-2026";

export function AdminPanel() {
  const [open, setOpen] = React.useState(false);
  const [token, setToken] = React.useState(DEFAULT_TOKEN);
  const [attempts, setAttempts] = React.useState<Attempt[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Detect ?admin=1 on mount
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (url.searchParams.get("admin") === "1") {
      const stored = localStorage.getItem("admin_token");
      if (stored) setToken(stored);
      setOpen(true);
    }
  }, []);

  const fetchAttempts = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/bot-attempts?token=${encodeURIComponent(token)}&limit=100`
      );
      if (!res.ok) {
        if (res.status === 401) throw new Error("Invalid admin token");
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      setAttempts(data.attempts || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const clearAttempts = React.useCallback(async () => {
    if (!confirm("Clear all captured bot attempts? This cannot be undone.")) return;
    setLoading(true);
    try {
      await fetch(`/api/admin/bot-attempts?token=${encodeURIComponent(token)}`, {
        method: "DELETE",
      });
      setAttempts([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Save token to localStorage whenever it changes
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_token", token);
    }
  }, [token]);

  return (
    <>
      {/* Floating launcher button — only visible when admin mode is on */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-xl"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-coral/10">
                    <Shield className="h-5 w-5 text-coral" />
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-bold tracking-tight">
                      Bot-trap admin
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Captured scraper / scanner attempts on this server instance
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-secondary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Token + actions */}
              <div className="flex flex-col gap-3 border-b border-border bg-secondary/30 p-4 sm:flex-row sm:items-center sm:gap-2">
                <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5">
                  <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    type="password"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="admin token"
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={fetchAttempts}
                    disabled={loading}
                    className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-semibold text-background disabled:opacity-50"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                    Refresh
                  </button>
                  <button
                    type="button"
                    onClick={clearAttempts}
                    disabled={loading || attempts.length === 0}
                    aria-label="Clear log"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-coral disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="pretty-scroll flex-1 overflow-y-auto p-4">
                {error && (
                  <div className="mb-4 flex items-center gap-2 rounded-2xl border border-coral/40 bg-coral/5 p-4 text-sm">
                    <AlertTriangle className="h-4 w-4 text-coral" />
                    <span>{error}</span>
                  </div>
                )}

                {!error && attempts.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
                      <Bot className="h-7 w-7 text-muted-foreground" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">
                      No bots captured yet
                    </h3>
                    <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                      Once scanners start poking at{" "}
                      <code className="rounded bg-secondary px-1.5 py-0.5 font-mono-jb text-xs">
                        /.env
                      </code>{" "}
                      or{" "}
                      <code className="rounded bg-secondary px-1.5 py-0.5 font-mono-jb text-xs">
                        /wp-admin
                      </code>
                      , they&apos;ll show up here. Click <strong>Refresh</strong> to load.
                    </p>
                  </div>
                )}

                {attempts.length > 0 && (
                  <ul className="space-y-2">
                    {attempts.map((a) => (
                      <li
                        key={a.id}
                        className="rounded-2xl border border-border bg-background/60 p-3"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              a.blocked
                                ? "bg-coral/10 text-coral"
                                : "bg-lime/10 text-foreground"
                            }`}
                          >
                            {a.blocked ? "BLOCKED" : "LOGGED"}
                          </span>
                          <span className="font-mono-jb text-xs font-semibold">
                            {a.method}
                          </span>
                          <span className="font-mono-jb text-xs text-foreground/90">
                            {a.path}
                          </span>
                          <span className="ml-auto font-mono-jb text-[10px] text-muted-foreground">
                            {new Date(a.ts).toLocaleString()}
                          </span>
                        </div>
                        <div className="mt-2 grid grid-cols-1 gap-1 text-xs text-muted-foreground sm:grid-cols-2">
                          <div>
                            <span className="font-mono-jb text-[10px] uppercase">
                              reason:{" "}
                            </span>
                            <span className="font-mono-jb">{a.reason}</span>
                          </div>
                          <div>
                            <span className="font-mono-jb text-[10px] uppercase">
                              ip:{" "}
                            </span>
                            <span className="font-mono-jb">{a.ip || "?"}</span>
                          </div>
                          {a.ua && (
                            <div className="col-span-full truncate">
                              <span className="font-mono-jb text-[10px] uppercase">
                                ua:{" "}
                              </span>
                              <span className="font-mono-jb text-foreground/70">
                                {a.ua}
                              </span>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-border bg-secondary/30 p-4 text-xs text-muted-foreground">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    Showing entries from the current warm server instance. Every
                    hit is also in your server logs.
                  </div>
                  <a
                    href="https://www.cloudflare.com/plans/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-foreground hover:underline"
                  >
                    Add Cloudflare for free
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating launcher (only when admin mode is on) */}
      {open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="sr-only"
          aria-hidden
        />
      )}
    </>
  );
}
