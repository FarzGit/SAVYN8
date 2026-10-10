#!/usr/bin/env node
/**
 * Claims lint (spec §12.3). Scans site copy for words a general-wellness brand must not use,
 * framework names that must never appear on the page, and competitor names.
 * Exits 1 on any hit. Runs automatically before `pnpm build`.
 *
 * Skip a single line with a trailing `claims-allow` comment (use sparingly, explain why).
 * Files in ALLOW_FILES are skipped entirely (legal text must quote the disclaimer).
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const SCAN = ["src/content", "src/config", "src/app", "src/components", "src/sections"];
const EXT = /\.(ts|tsx|md|mdx)$/;
const ALLOW_FILES = new Set(["src/content/legal.ts"]);

const BANNED = [
  // Regulated / medical claims
  /\bdiagnos(e|es|ed|ing|is)\b/i,
  /\bdetect(s|ed|ing|ion)?\b/i,
  /\bscreen(s|ing)? for\b/i,
  /\btreat(s|ed|ing|ment)?\b/i,
  /\bcures?\b/i,
  /\bprevent(s|ed|ing|ion)?\b/i,
  /\bmedical[- ]grade\b/i,
  /\bclinical[- ]grade\b/i,
  /\bFDA\b/,
  /\babnormal\b/i,
  /\barrhythmias?\b/i,
  /\bAFib\b/i,
  /\bseizures?\b/i,
  /\bapnea\b/i,
  /\bECG\b/,
  /\bEKG\b/,
  /\bEEG\b/,
  /\bbioimpedance\b/i,
  // Framework / platform names never shown on the page
  /\bMote\b/,
  /\bSense\s*\/\s*Understand\s*\/\s*Act\b/i,
  // No competitor names anywhere on the site
  /\bOura\b/i,
  /\bWhoop\b/i,
  /\bUltrahuman\b/i,
  /\bGabit\b/i,
  /\bRingConn\b/i,
];

function walk(dir, out = []) {
  let entries = [];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (EXT.test(name)) out.push(p);
  }
  return out;
}

const files = (process.argv.slice(2).length ? process.argv.slice(2) : SCAN.flatMap((d) => walk(join(ROOT, d))));
let hits = 0;

for (const file of files) {
  const rel = relative(ROOT, file).split(sep).join("/");
  if (ALLOW_FILES.has(rel)) continue;
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, i) => {
    if (line.includes("claims-allow")) return;
    for (const re of BANNED) {
      const m = line.match(re);
      if (m) {
        hits++;
        console.error(`${rel}:${i + 1}  banned term "${m[0]}"  →  ${line.trim().slice(0, 120)}`);
      }
    }
  });
}

if (hits) {
  console.error(`\nclaims lint: ${hits} problem(s). Use wellness language only (see docs/SEVYN8_BUILD_SPEC.md §12.2).`);
  process.exit(1);
}
console.log(`claims lint: ${files.length} files clean.`);
