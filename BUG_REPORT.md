# Bug Report: ERR_MODULE_NOT_FOUND on All API Endpoints (Vercel Production)

## Summary

Every API endpoint (`/api/attractions/matchup`, `/api/votes/recent`, `/api/attractions`) returns HTTP 500 in production on Vercel. The local development server works correctly.

## Symptom

- **Production URL**: `ranker-attraction.vercel.app`
- **Error shown to user**: "Failed to load matchup. Please try again later."
- **Runtime log error code**: `Error [ERR_MODULE_NOT_FOUND...]` (message truncated by Vercel's log viewer)
- **Vercel response body**: `FUNCTION_INVOCATION_FAILED` — the Lambda crashes before it can respond, meaning the error occurs at module initialization, not inside a request handler.

## Stack

- Express + Drizzle ORM + PostgreSQL (`pg`)
- Bundled with esbuild for Vercel serverless
- Deployed using Vercel Build Output API (`.vercel/output` format)
- Root `package.json` has `"type": "module"`

## Root Cause Hypothesis

The Lambda function crashes on cold-start with `ERR_MODULE_NOT_FOUND`. Since it is a Lambda-level crash (not caught by Express error middleware), some module cannot be resolved during initialization. Candidates:

1. **Drizzle ORM subpath exports** — drizzle-orm uses complex `package.json` `exports` fields. esbuild may fail to correctly resolve some internal dynamic require at runtime.
2. **Native optional dependencies** — `bufferutil`, `utf-8-validate`, or `pg-native` (used by `ws` and `pg`) may cause uncaught require failures despite expected try/catch fallbacks.
3. **`__dirname`-relative requires broken after bundling** — some packages resolve files relative to `__dirname`; after esbuild bundles everything into a single file, `__dirname` points to a different location and those files are not found.

The exact failing module name is unknown because Vercel's log viewer truncates the error message after `Error [ERR_MODULE_NOT_FOUND...`.

## Timeline of Attempts

### Attempt 1 — Vercel `functions` config + nft tracer (commit `b202044`)
- Used `vercel.json` with `outputDirectory`, `functions`, and `rewrites` keys.
- Relied on Vercel's nft (Node File Tracer) to auto-detect and bundle dependencies.
- **Result**: Same `ERR_MODULE_NOT_FOUND` error. nft apparently failed to trace drizzle-orm's subpath exports.

### Attempt 2 — Custom esbuild bundle via Build Output API (commit `1740b3e`)
- Replaced nft tracing with manual esbuild bundling of `api/index.ts`.
- All dependencies inlined into a single CJS file (`1.6 MB`).
- Only `pg-native` excluded as external (expected to be caught by `pg`'s try/catch).
- Generated `.vercel/output` structure directly from `script/build.ts`.
- **Result**: Same `ERR_MODULE_NOT_FOUND` error persists. Build succeeds but Lambda still crashes at runtime.

## What Works

- `npm run dev` locally — full app functional including matchup, live feed, and leaderboard.
- Vercel build step — completes successfully in both attempts.
- Static frontend — loads correctly in production (CSS, JS, HTML).

## Deep Investigation (2026-04-02)

### Bundle Analysis

The esbuild-produced bundle (`.vercel/output/functions/api/index.func/index.js`, 1.6 MB CJS) was analyzed locally:

- **196 `__commonJS` wrappers** — all dependencies properly inlined.
- **No bare `import` statements** — the output is pure CJS.
- **No `import.meta` or top-level await** — safe for CJS runtime.
- **pg uses its ESM entry** (`pg/esm/index.mjs`) during bundling, but esbuild converts it to CJS correctly.

**External `require()` calls found in the bundle:**

| Module | Wrapped in try/catch? | Risk |
|--------|----------------------|------|
| `pg-native` | Yes, but `catch(e) { throw e }` in `pg/lib/native/client.js` — re-throws. Only safe because the module is behind a lazy getter (`pg.native`) that is never accessed by app code. | Low |
| `supports-color` (x5) | Yes — `debug` catches the error gracefully. | None |

No other external or dynamic requires were found that could crash the Lambda.

### Local Reproduction — NOT reproducible

The bundle loads successfully on Node.js v24.14.0 locally:
- `require('./index.js')` — only fails on expected `DATABASE_URL must be set`.
- `import('./index.js')` (ESM dynamic import) — same result, loads fine.

This confirms the issue is **Vercel-Lambda-specific**, not a bundle defect.

### Key Observation: `ERR_MODULE_NOT_FOUND` is an ESM error code

- CJS `require()` failures throw with code `MODULE_NOT_FOUND`.
- ESM resolution failures throw with code `ERR_MODULE_NOT_FOUND`.
- The runtime logs consistently show `ERR_MODULE_NOT_FOUND`, meaning **ESM resolution is involved** in the failure path.

This points to Vercel's `launcherType: "Nodejs"` launcher using ESM `import()` to load the CJS handler file, and something in that CJS-to-ESM bridge failing on the Lambda runtime.

### Current `.vc-config.json`

```json
{
  "runtime": "nodejs22.x",
  "handler": "index.js",
  "launcherType": "Nodejs"
}
```

The `launcherType: "Nodejs"` bypasses Vercel's standard serverless bridge and uses Node.js's native module loader. This is the most likely source of the ESM resolution discrepancy.

---

## Fix Plan

### Phase 1 — Diagnostic Deploy (get the full error message)

Vercel's log viewer truncates `ERR_MODULE_NOT_FOUND` before showing which module is missing. We need the full message.

**Steps:**
1. Modify `script/build.ts` to bundle the handler as `handler.js` instead of `index.js`.
2. Write a small diagnostic `index.js` wrapper:
   ```js
   let handler;
   try {
     handler = require("./handler.js");
   } catch (e) {
     console.error("HANDLER_LOAD_ERROR", JSON.stringify({
       code: e.code, message: e.message, stack: e.stack
     }));
     module.exports = (req, res) => {
       res.writeHead(500, { "content-type": "application/json" });
       res.end(JSON.stringify({ code: e.code, message: e.message }));
     };
     return;  // wrapped in an IIFE
   }
   module.exports = handler.default || handler;
   ```
3. Deploy to Vercel (preview).
4. Hit `/api/attractions` and read the full error from both the HTTP response and runtime logs.
5. Remove the diagnostic wrapper once the error is captured.

### Phase 2 — Fix (apply in order until resolved)

Based on the ESM error code analysis, the fixes are ordered by likelihood:

**Fix 1: Switch esbuild output to ESM format**
- Change `format: "cjs"` to `format: "esm"` in the Vercel function esbuild config.
- Output as `index.mjs` instead of `index.js`.
- Add a `createRequire` banner for any residual CJS patterns: `import { createRequire } from 'module'; const require = createRequire(import.meta.url);`
- Update `.vc-config.json` handler to `index.mjs`.
- Remove the CJS `package.json` (no longer needed).
- **Why this helps**: Eliminates the CJS-to-ESM bridge entirely. The launcher loads a native ESM file, no module format translation needed.

**Fix 2: Remove `launcherType: "Nodejs"`**
- Delete the `launcherType` field from `.vc-config.json`.
- Let Vercel's default serverless bridge handle module loading.
- **Why this helps**: Vercel's default bridge is battle-tested with CJS exports; the `Nodejs` launcher may have edge cases with CJS-via-ESM-import.

**Fix 3: Downgrade to `nodejs20.x` runtime**
- Change `runtime` from `nodejs22.x` to `nodejs20.x` in `.vc-config.json`.
- **Why this helps**: Node.js 20 has different (less aggressive) ESM interop behavior. `require()` of ESM modules was experimental in 20.x vs stable in 22.x.

**Fix 4: Abandon Build Output API — use `@vercel/node` with pre-bundled code**
- Move the esbuild-bundled file directly to `api/index.js`.
- Use `vercel.json` with `functions` and `rewrites` config.
- Let `@vercel/node` builder handle the rest.
- **Why this helps**: Completely bypasses custom `.vc-config.json` and lets Vercel's proven toolchain handle the serverless function.

---

## Relevant Files

| File | Role |
|------|------|
| `api/index.ts` | Vercel serverless function entry point |
| `server/routes.ts` | Express route definitions |
| `server/storage.ts` | Database access layer (Drizzle ORM) |
| `server/db.ts` | PostgreSQL pool + Drizzle client init |
| `shared/schema.ts` | Drizzle table definitions |
| `script/build.ts` | Custom build script (esbuild + Vercel output) |
| `vercel.json` | Vercel config (currently only `buildCommand`) |
| `.vercel/output/functions/api/index.func/.vc-config.json` | Generated Lambda config |
| `.vercel/output/functions/api/index.func/package.json` | Generated `{"type":"commonjs"}` |
