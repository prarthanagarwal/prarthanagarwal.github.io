# prarthan://ai — the chat worker

The Cloudflare Worker behind the AI chat page. It proxies chat messages to Gemini
with a rich, always-current system prompt built from real sources:

| File | What it is | How it changes |
|---|---|---|
| `worker.js` | Worker source (root of repo) | hand-edited code |
| `worker/knowledge/static.md` | Hand-written facts: bio, resume, links, Surf Time, stack | edit directly |
| `worker/knowledge.md` | Generated: static.md + site data (projects, bucket list, thoughts) | `bun run ai:knowledge` |
| `worker/tweets.json` | Older tweets imported from an X archive (history layer) | `bun run ai:tweets <archive.zip>` |
| `worker/worker.deploy.js` | Generated single-file worker, everything inlined | `bun run ai:knowledge` |

`scripts/build-knowledge.mjs` reads the actual site source (`projects-data.ts`,
the projects page, bucket list, thoughts) so the persona can't drift out of sync
with the site.

## Live tweets (recommended — fresh, $0)

The worker pulls Prarthan's latest tweets + live X profile from
[SocialData.tools](https://socialdata.tools) and caches them in KV. SocialData
allows **3 free requests/minute** on every account; the sync uses 2 requests per
cron run, so it costs nothing.

**One-time setup (dashboard):**
1. Sign up at socialdata.tools → copy your API key.
2. Workers & Pages → **KV** → Create namespace `prarthan-tweets`.
3. Workers & Pages → don-portfolio → **Settings**:
   - Variables & Secrets → add secret `TWEETS_API_KEY` = your SocialData key.
   - Variables → KV Namespace bindings → add binding **`TWEETS_KV`** → `prarthan-tweets`.
   - Triggers → Cron Triggers → add **`*/30 * * * *`** (every 30 min; `*/15` is also fine).
4. Deploy the new code (paste `worker/worker.deploy.js`).

The first chat bootstraps the cache even before the first cron fires; the
bundled archive snapshot is the fallback whenever KV is empty. Optional
variables: `TWITTER_USER_ID`, `TWITTER_SCREEN_NAME`.

## Adding / changing site content

1. Edit the site (or `worker/knowledge/static.md` for bot-only facts).
2. `bun run ai:knowledge` — regenerates `knowledge.md` + `worker.deploy.js`.
3. Paste `worker/worker.deploy.js` into the dashboard editor.

## Optional: import your X archive (deep history)

The live sync only covers the latest tweets; the archive import backfills
everything older, so the bot knows your full history.

1. On X: Settings → Your account → **Download an archive of your data** (~24h).
2. `bun run ai:tweets /path/to/twitter-archive.zip`
   - flags: `--limit 100` (default), `--include-retweets` (excluded by default)
3. `bun run ai:knowledge`, then redeploy.

## Deploying

**Option A — dashboard paste (current flow):**
1. Workers & Pages → don-portfolio → Edit code.
2. Paste the contents of `worker/worker.deploy.js`.
3. Confirm `GEMINI_API_KEY` (+ `TWEETS_API_KEY` and `TWEETS_KV` binding for live tweets).

**Option B — wrangler CLI:**
```
npx wrangler login
npx wrangler secret put GEMINI_API_KEY
npx wrangler secret put TWEETS_API_KEY
# uncomment the kv_namespaces + triggers blocks in wrangler.jsonc and add your KV id
npx wrangler deploy          # uses worker.js + wrangler.jsonc
```

## Model

Defaults to `gemini-3.5-flash-lite` — the cheapest current-gen flash (free-tier
eligible; cheapest paid flash otherwise). `gemini-2.0-flash` is shut down and
the 2.5 family is no longer available to new API users. If the default model
404s for your account, the worker automatically tries `gemini-3.6-flash`,
`gemini-3.5-flash`, then `gemini-3.7-flash`. Set the `GEMINI_MODEL` variable to
force a single model.

## Rate limiting

Best-effort in-memory limit (20 req/min per IP, per isolate). The durable
KV token-bucket upgrade is documented in `docs/rate-limit.md`.
