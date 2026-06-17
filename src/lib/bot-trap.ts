/**
 * File-based honeypot log.
 *
 * Writes to /tmp/bot-attempts.jsonl — survives across hot instances
 * within the same serverless container. On Vercel, /tmp is the only
 * writable directory and persists for the lifetime of the warm function.
 *
 * Every hit is also console.warn()'d so it shows in Vercel runtime logs
 * (which is where you'd go to see ALL hits across all instances).
 *
 * For cross-instance persistence, swap this for a free external log
 * sink: Axiom (free 1GB/day), Logtail (free 1GB/mo), or Vercel KV (free).
 */

import { promises as fs } from "fs";
import path from "path";

export type BotAttempt = {
  id: string;
  ts: number;
  ip: string | null;
  method: string;
  path: string;
  ua: string | null;
  reason: string;
  blocked: boolean;
};

const LOG_FILE = "/tmp/bot-attempts.jsonl";
const MAX_ENTRIES = 1000;

export async function logBotAttempt(
  attempt: Omit<BotAttempt, "id" | "ts">
): Promise<BotAttempt> {
  const entry: BotAttempt = {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2),
    ts: Date.now(),
    ...attempt,
  };
  // Append a single JSONL line — atomic on POSIX filesystems
  const line = JSON.stringify(entry) + "\n";
  try {
    await fs.appendFile(LOG_FILE, line, { flag: "a" });
    // Trim file if it gets too large
    const stat = await fs.stat(LOG_FILE).catch(() => null);
    if (stat && stat.size > 200_000) {
      // 200KB — read last 500 lines, rewrite
      const content = await fs.readFile(LOG_FILE, "utf-8");
      const lines = content.split("\n").filter(Boolean).slice(-500);
      await fs.writeFile(LOG_FILE, lines.join("\n") + "\n");
    }
  } catch (err) {
    // Fall back to console-only if fs fails (e.g., read-only FS)
    console.warn("[honeypot] fs write failed", err);
  }
  // Also surface in server logs
  console.warn(
    `[honeypot] ${attempt.method} ${attempt.path} — ${attempt.reason} — ip=${attempt.ip ?? "?"} — ua=${(attempt.ua ?? "").slice(0, 120)}`
  );
  return entry;
}

export async function getBotAttempts(limit = 100): Promise<BotAttempt[]> {
  try {
    const content = await fs.readFile(LOG_FILE, "utf-8");
    const lines = content.split("\n").filter(Boolean);
    const entries: BotAttempt[] = [];
    for (const line of lines) {
      try {
        entries.push(JSON.parse(line) as BotAttempt);
      } catch {
        // skip malformed
      }
    }
    // Newest first
    entries.reverse();
    return entries.slice(0, Math.min(limit, MAX_ENTRIES));
  } catch {
    return [];
  }
}

export async function clearBotAttempts(): Promise<void> {
  try {
    await fs.writeFile(LOG_FILE, "");
  } catch {
    // ignore
  }
}
