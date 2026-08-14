#!/usr/bin/env bun
// Imports tweets from an official X (Twitter) archive into worker/tweets.json,
// which the AI worker bundles into its context.
//
//   1) On X: Settings → Your account → Download an archive of your data
//      (takes ~24h; you'll get an email with a zip).
//   2) bun scripts/import-tweets.mjs /path/to/twitter-archive.zip
//
// Options:
//   --limit N            keep the N most recent tweets (default 100)
//   --include-retweets   keep retweets too (excluded by default — low signal)
//
// Then rebuild the knowledge bundle: bun scripts/build-knowledge.mjs

import { execSync } from "child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync, rmSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { tmpdir } from "os";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);

const input = args.find((a) => !a.startsWith("--"));
if (!input) {
  console.error("Usage: bun scripts/import-tweets.mjs <twitter-archive.zip|folder> [--limit N] [--include-retweets]");
  process.exit(1);
}
if (!existsSync(input)) {
  console.error(`No such file or folder: ${input}`);
  process.exit(1);
}
const limitFlag = args.find((a) => a.startsWith("--limit="));
const limit = limitFlag ? parseInt(limitFlag.split("=")[1], 10) : 100;
const includeRetweets = args.includes("--include-retweets");
if (!Number.isFinite(limit) || limit < 1) {
  console.error("--limit must be a positive number");
  process.exit(1);
}

// --- Resolve archive folder (extract if given a zip)
let dir = input;
if (input.endsWith(".zip")) {
  dir = join(tmpdir(), `x-archive-${process.pid}`);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  execSync(`ditto -x -k ${JSON.stringify(input)} ${JSON.stringify(dir)}`);
  console.log(`✔ extracted archive to ${dir}`);
}

// --- Find and parse all tweet files (tweets.js, tweets_partN.js, tweet.js, ...)
function findTweetFiles(d) {
  const out = [];
  const walk = (p) => {
    for (const name of readdirSync(p)) {
      const full = join(p, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (/^tweets?(_.*)?\.js$/.test(name)) out.push(full);
    }
  };
  walk(d);
  return out;
}
function parseTweetFile(p) {
  const raw = readFileSync(p, "utf8");
  const m = raw.match(/^window\.YTD\.tweets?(?:\.part\d+)?\s*=\s*/);
  const body = m ? raw.slice(m[0].length) : raw;
  return JSON.parse(body.replace(/;\s*$/, ""));
}

const files = findTweetFiles(dir);
if (files.length === 0) {
  console.error("No tweet files found. This doesn't look like an extracted X archive —");
  console.error("the zip should contain files like data/tweets.js or tweets.js.");
  process.exit(1);
}

const seen = new Set();
let total = 0;
const tweets = [];
for (const f of files) {
  const batch = parseTweetFile(f);
  for (const entry of batch) {
    const t = entry?.tweet;
    if (!t?.id_str || !t?.full_text || seen.has(t.id_str)) continue;
    seen.add(t.id_str);
    total++;
    if (!includeRetweets && t.full_text.startsWith("RT @")) continue;
    tweets.push({ id: t.id_str, date: t.created_at, text: t.full_text });
  }
}
console.log(`✔ parsed ${total} tweets from ${files.length} file(s)`);

tweets.sort((a, b) => new Date(b.date) - new Date(a.date));
const kept = tweets.slice(0, limit);
const outPath = join(root, "worker/tweets.json");
writeFileSync(outPath, JSON.stringify(kept, null, 2));

console.log(`✔ wrote ${kept.length} tweets to worker/tweets.json`);
if (kept.length > 0) {
  console.log(`  newest: ${kept[0].date} — "${kept[0].text.slice(0, 60)}..."`);
  console.log(`  oldest kept: ${kept[kept.length - 1].date}`);
}
console.log("\nNow run: bun scripts/build-knowledge.mjs   (to inline them into the deployable worker)");
