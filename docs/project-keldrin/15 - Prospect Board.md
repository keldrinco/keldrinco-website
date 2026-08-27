---
description: The Prospect Board — now shipping in two places: the standalone artifact, and the Prospects feature inside keldrin-os backed by Supabase. Architecture, the palette conflict (resolved Aug 27), the Aug 24 full-field-editability build, and what's left. Part of Project Keldrin — see [[11 - Keldrin OS Build]].
---

# 15 - Prospect Board

Two implementations, one dataset. Both are live.

| | Standalone artifact | Keldrin OS feature |
|---|---|---|
| Where | https://claude.ai/code/artifact/eed2b787-d3dd-41fb-9dd9-11dec9a0f119 | `/dashboard/prospects` in `keldrin-os` |
| Data | Embedded JSON snapshot | Live Supabase `prospects` table |
| Palette | Charcoal + gold | The app's cyan→pink gradient system |
| Purpose | Works today on any device, nothing to deploy | The real home. Multi-user-ready, RLS-backed, part of the OS |

The artifact came first and is the design reference. The OS feature is where it lives from here.

## The OS feature

Built Aug 23 2026 on top of a `prospects` schema that already existed from Aug 20 — the table, its five score components, its generated `score`/`priority` columns and its seven pipeline stages were already there, with 81 RV parks seeded. The board was built to that schema rather than the other way round.

**Files added**

- `src/app/dashboard/prospects/page.tsx` — server component, fetches and normalises
- `src/app/dashboard/prospects/actions.ts` — server actions for stage and note writes
- `src/components/prospects/prospect-workspace.tsx` — client shell: tabs, stat strip, filters, board, table
- `src/components/prospects/prospect-map.tsx` — the SVG map
- `src/components/prospects/prospect-drawer.tsx` — detail panel and editable fields
- `src/lib/prospect-styles.ts` — stage/priority tokens and the ownership-pattern predicates
- `src/lib/types.ts` — `Prospect`, `ProspectStage`, `BusinessType` added alongside `Task`
- `src/components/sidebar.tsx` — Prospects promoted out of "Soon"

**Migrations added**

- `0006_prospects_storage_columns.sql` — `years_in_business`, `square_feet`, and a corrected comment on `score_scale`
- `0007_seed_storage_units.sql` — the 269 storage facilities
- `0008_backfill_rv_park_coordinates.sql` — exact lat/lon for the 81 RV rows, which the original seed left null

0006 and 0008 were applied live through the Supabase connector. 0007 is committed for a manual run — it is 149 KB of machine-generated SQL, and pasting the file into the Supabase SQL editor is more reliable than retyping it.

## Full field editability — WRITTEN TO REPO Aug 24, 2026 (pending Kyle's build/commit/push)

The original drawer only let you edit the working-pipeline fields (next action, drive-by date, notes, owner-contacted) plus stage. Everything else — phone, address, owner clue, unit count, years in business, Google rating, and the rest — was research output the app only displayed. Kyle asked for this to become a MUST-have: on-site/phone research routinely finds a phone number, a corrected address, a named owner, etc. that a gap in the seeded data left blank, and there was no way to write that finding back into the record.

**What changed:** essentially the whole `prospects` row is now editable from the drawer, saved field-by-field on blur (same "saves when you click away" UX the notes fields already used), with the same optimistic-update-and-rollback-on-failure pattern the stage buttons use. Because the kanban cards, table rows, and drawer all read from one shared `rows` state in `prospect-workspace.tsx`, a field edited in the drawer shows up immediately on the card and in the table too — no reload, no separate sync step.

Newly editable, organized into drawer sections:

- **Header** — name, inline-editable.
- **WHY IT SCORES** — the five score components (owner/digital/scale-or-tenure/attention/proximity) are now number inputs with live bar-width feedback; `score` and `priority` stay read-only because Postgres generates them from these five and recalculates automatically once a component saves.
- **OWNERSHIP** — owner clue, ownership type, years in business, sale status.
- **SIZE & FOOTPRINT** (new section) — unit count + unit label as a paired row, square feet.
- **LOCATION & CONTACT** — street address, city, county, state, ZIP, phone, email, website, drive minutes, latitude/longitude.
- **DIGITAL PRESENCE** (new section) — Google rating, review count, place ID, maps URL.
- **AMENITIES** and **FIELD NOTE** (research notes) — converted from static paragraphs to textareas; the FIELD NOTE flagged/VERIFY highlighting now recomputes live as you type.
- **SOURCE** — converted to a text input.

Excluded on purpose: `id`, `user_id`, `business_type`, `created_at`, `updated_at` (identity/bookkeeping, not research output) and `score`/`priority` (Postgres-generated, edit the five score_* inputs instead). `name` and `state` refuse to save as blank (both NOT NULL columns) and snap back visually rather than round-tripping a database error; score_* columns snap to 0 the same way if cleared, since they're NOT NULL too.

**Files changed**

- `src/lib/types.ts` — `ProspectFieldEdits` expanded from 4 fields to nearly the full `Prospect` shape.
- `src/app/dashboard/prospects/actions.ts` — `updateProspectFields` rewritten around an explicit `WRITABLE_FIELDS` allowlist (name/text/number/boolean-typed per column) instead of four hardcoded `if` checks, with server-side clamping to each column's Postgres check-constraint range (e.g. `score_owner` 0–30, `google_rating` 0–5) so a fat-fingered value gets corrected rather than bouncing back as a failed save.
- `src/components/prospects/prospect-drawer.tsx` — rewritten. The static `Row` display component is gone, replaced by a reusable `EditableRow` plus per-field draft state (`toDraft`/`commit`) that mirrors the drawer's existing next-action/notes pattern across every research column. **Important implementation note for future edits to this file:** `EditableRow` has to be a module-level component, not one defined inside `ProspectDrawerBody`'s render — an inline definition gets a new component identity on every keystroke (since typing triggers a re-render), which would remount every input and steal focus after the first character. Caught and fixed before shipping.
- No changes needed to `prospect-workspace.tsx`, `prospect-map.tsx`, or `page.tsx` — their board/table/map rendering already reads whatever is in `rows`/`prospects` generically, so the new fields flow through for free.

**Verification done in the sandbox:** brace-balance check on all three files, plus a `tsc --noEmit` pass against the real files under a paths-mapped tsconfig with hand-written React/JSX stubs (this sandbox has no npm registry access, so `@types/react` couldn't be installed — the stub is a deliberately loose approximation). No genuine type errors surfaced; the handful of `tsc` complaints were confirmed as artifacts of the stub's incomplete JSX/event typing, not real bugs. This was a substitute for, not a replacement of, `npm run build` in Kyle's real environment — as of Aug 27, that real check is available directly via Claude Code running locally (see [[11 - Keldrin OS Build]]).

**Not yet done:**
- Kyle needs to `npm run build` (or at least `npm run dev`) locally to real-compile-check this — same caveat as every other change shipped this way — then commit and push via GitHub Desktop. Vercel deploys on push.
- Explicit phone-width check of the expanded drawer per the standing responsive policy in [[11 - Keldrin OS Build]] — it's a lot more input rows than before, worth a real look on a phone before calling it done.
- Table/Card search and column set weren't touched — `email`, county-only searches, etc. still aren't in the table's search haystack or as visible columns. Not required for this ask, worth a look later if it becomes friction.

## Why score_scale means two different things

The third score component is SCALE for RV parks and TENURE for self storage. Storage operators do not publish unit counts; directories do publish years in business, and it is the better succession signal anyway. Same 0–20 range and weight, so scores stay comparable and the generated columns needed no change. The column comment in Postgres says so, and `scoreComponentLabels()` in `prospect-styles.ts` renders the right label per row.

## The palette question — SETTLED Aug 27, 2026

For a while, this project carried a real cross-doc contradiction: `tailwind.config.ts` stated the cyan/blue/purple/pink gradient is the Keldrin OS app's identity and is *deliberately* separate from the charcoal-and-gold company brand, while [[00 - Project Keldrin Overview]], [[02 - Company Naming]], and [[13 - Logo Specific]] still described an older, never-built "galaxy-gradient" (indigo/purple/gold) direction as if it were the live plan — implying the OS palette should tie back to the brand's gold.

Kyle's call on Aug 23 was to build on what was already in the repo (so Prospects would match Tasks and Dashboard) and settle the documentation question later. **Settled Aug 27, 2026: `tailwind.config.ts` was right all along.** Keldrin OS keeps its own fully separate identity — no gold, no shared DNA with the marketing palette. The three drifted docs have been corrected to match and now point back to [[11 - Keldrin OS Build]] as the canonical source.

**Remaining, smaller cleanup from the same conflict:** the standalone artifact (this doc's "Standalone artifact" column above) still wears charcoal-and-gold, which now visibly disagrees with the settled OS-only palette. Per the Aug 23 handoff, retiring it is probably cleaner than reskinning it now that `/dashboard/prospects` is the real, live home — still an open call, not urgent.

## Design notes

- Stage colors run along the brand gradient — cold cyan at "researched" through pink at "follow-up". Distance along the gradient is distance along the pipeline.
- The map is hand-built, not a tile layer: everything projected into miles from downtown Paducah so the 30/60/90/120-minute rings are true circles, with the Ohio and Mississippi, Kentucky Lake and Lake Barkley as the landmarks. Works with no external requests, which is also what the artifact sandbox required.
- Kanban columns cap at 60 cards and show "+ N more" — 350 draggable nodes in one column is not a useful screen.
- All field writes (stage, notes, and now the full editable set) are optimistic and roll back with a visible message if the write fails.

## Open

- ~~`npm run build` has not been run against this code — the cloud sandbox cannot reach the npm registry.~~ No longer a hard blocker: Claude Code running locally (Aug 27, see [[11 - Keldrin OS Build]]) has the real toolchain. Still needs to actually be run before pushing the Aug 24 full-editability change.
- ~~Repo migration files have drifted from the live database: `prospects_unit_label_no_default` and `prospects_unique_name_per_type` exist in Supabase but only partially in `supabase/migrations`.~~ Reconciled Aug 26, 2026 — `0013_reconcile_prospects_constraints.sql` captures both gaps. Written to the local clone, still pending Kyle's commit/push.
- Route planner: select several A-tier prospects, get an ordered drive-by loop. Coordinates and rings are already there.
- Unit and site counts remain the biggest data gap — now that the drawer can save them directly, a drive-by closes the gap in the app itself instead of needing a separate re-seed.
- Laundromats, car washes and home services are already valid `business_type` values and render as empty tabs. The two-layer directory research method scales straight across.
- Phone-width check of the expanded drawer (see Aug 24 section above).
- Whether to retire or reskin the standalone artifact now that the palette question is settled (see above).

## Related

- [[11 - Keldrin OS Build]] · [[14 - Storage Unit Battle Royale]] · [[04 - Deals]] · [[10 - Legacy Index]]
