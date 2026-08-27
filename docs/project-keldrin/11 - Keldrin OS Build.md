---
description: The internal web app/dashboard unifying CRM, deals, research, workflows, and operating data. Includes the settled Keldrin OS color system — cyan/pink/orange, deliberately unlike the public brand, now confirmed canonical across all project docs as of Aug 27 — the standing mobile-responsive policy, the Aug 23 OTP-code auth flow, the Aug 23 weather-module/wider-layout/color-pass build, the Aug 23 (session 6) Tasks board redesign, the Aug 24 Prospects full-field-editability build, the Aug 26 session confirming both are live, verifying real phone-width rendering, and reconciling migration drift, and the Aug 27 decision to build Contacts next. Part of Project Keldrin — see [[00 - Project Keldrin Overview]].
---

# 11 - Keldrin OS Build

## Active Priority (Aug 2026)

One of Kyle's two active build priorities alongside [[09 - Website]] (though as of Aug 26/27 this is effectively the sole active build focus — the website is stable and paused). The color system is settled (below) and confirmed canonical project-wide. The remaining goal is feature depth on real workflows plus a clean, repeatable deployment pipeline.

## Decided Aug 27, 2026

- **Next module: Contacts.** Kyle's chosen name for the people/relationship module — supersedes "CRM" as the in-app/product name for this feature (the underlying data-layer workstream doc, [[10 - Legacy Index]], and the working-list doc [[03 - Networking]], keep their existing names). Builds on the Legacy Index data model; comes before Deals (pipeline), which remains the module after that.
- **Cross-doc color conflict resolved.** [[00 - Project Keldrin Overview]], [[02 - Company Naming]], and [[13 - Logo Specific]] previously still described an early, never-built "galaxy-gradient" (indigo/purple/gold) direction for Keldrin OS as if it were current. Kyle's call: the palette actually shipped in this app (below) is correct and permanent. Those three docs have been updated to match; see [[15 - Prospect Board]] for the fullest account of how the conflict originated.
- **Primary development environment moving to Claude Code, run locally against `C:\GitHub\keldrin-os` and `C:\GitHub\keldrinco-website`.** This gives real `npm run build`/`npm run dev` before anything ships, real git operations without the device-bridge relay, and the ability to actually delete files (unblocking the `task-form.tsx`/`task-row.tsx` cleanup below). Cowork/this sandbox remains the tool for the Daily Brief scheduled sync, research/dataset work, and project-doc upkeep. A `CLAUDE.md` + mirrored copy of the Project Keldrin docs was written into both repos on Aug 27 so Claude Code sessions have this same context automatically — see [[00 - Project Keldrin Overview]] for the project-wide picture, this doc for OS-specific detail.

## Standing Policy: Full Responsive / Mobile-First — SETTLED Aug 23, 2026

**Every surface in Keldrin OS must work cleanly from a phone, not just at a desk.** Kyle uses this app while out on scouting missions, not only at a desk. This applies to every current and future page/module — dashboard, Tasks, Prospects, Contacts, and anything built later (Deals, Finances, Calendar) — not as an afterthought pass but as a build requirement from the start:

- No fixed-width layout element (sidebar, wide tables, kanban boards) may force horizontal scroll on the whole page — wide content gets its own `overflow-x` scroll region instead.
- Sidebar nav collapses to an off-canvas drawer with a hamburger trigger below the `md` breakpoint; unchanged (static 240px) at `md` and up.
- Page padding steps down on narrow viewports (`px-4` below `sm`, `px-8` at `sm+`) rather than staying flat.
- Stat/metric strips and multi-column grids collapse to fewer columns (e.g. `grid-cols-4` → `grid-cols-2`) on narrow viewports rather than compressing into unreadable cells.
- **Board/kanban views may either scroll horizontally with their columns, or stack columns vertically (one full-width column per row), on mobile — either is acceptable so long as nothing squeezes all columns into the viewport or forces whole-page horizontal scroll.** (Revised Aug 26, 2026 — see verification note below. Originally written as "scrolls horizontally" only; the Tasks board's `grid-cols-1 sm:grid-cols-2 xl:grid-cols-4` vertical-stack pattern was found live and judged a legitimate, arguably more thumb-friendly alternative rather than a bug, so the policy wording is broadened to match reality instead of flagging it for a rewrite.)
- Detail drawers/panels use `w-[min(Npx,96vw)]` sizing so they never exceed the viewport.
- **Before calling a new UI feature done, explicitly check it at phone width** (Chrome DevTools device toolbar, an actual phone, or the same-origin-iframe technique below) — don't assume desktop-verified is enough.

Origin: the responsive/mobile pass built Aug 23, 2026 (session 4) fixed exactly these gaps app-wide (sidebar drawer, padding, drawer stat grid — see history below), and Kyle asked Aug 23 (session 6) that this be made an explicit standing rule going forward rather than a one-time cleanup.

### How to actually check phone width — Aug 26, 2026, updated Aug 27

From Cowork: every prior session's `resize_window` browser-automation call silently failed to affect real rendering: it reports success and changes the OS window, but `window.innerWidth` inside the tab stayed at full desktop width. **Working fix:** inject a **same-origin `<iframe>`** into the loaded page with explicit `width`/`height` attributes (e.g. 390×844). An iframe gets its own independent layout viewport sized by its own attributes — `contentWindow.innerWidth` inside it is genuinely 390px and every Tailwind breakpoint evaluates against that real number, not a spoofed one. Cookies/auth carry over fine since it's the same origin. Steps: navigate the tab to the target page first (establishes the session), then `javascript_tool` to replace `document.body` with a single iframe pointing at the same URL, sized to the phone viewport; screenshot as normal; to scroll, don't use the `computer` tool's wheel action (it scrolls the outer tab, not the iframe) — instead find the actual scrollable element via JS (`getComputedStyle(el).overflowY` + `scrollHeight > clientHeight`) and set its `.scrollTop` directly.

**From Claude Code locally (Aug 27):** real Playwright viewport tests against `localhost:3000` are now possible and are the better long-term replacement for the iframe workaround — a genuine browser context at any device size, no spoofing tricks needed.

## Concept

Keldrin OS is the internal web application: a central operating layer for Keldrin rather than a collection of disconnected spreadsheets and apps. Private, daily-use tool covering dashboard, tasks, prospects, contacts/CRM, deals, finances, calendar and networking — similar in spirit to Monday.com/ClickUp but custom-built, iterated over time rather than built all at once. Kyle wants it usable from his phone while out on scouting missions, not just at a desk.

## Color System — SETTLED Aug 23, 2026, confirmed canonical Aug 27, 2026

**Keldrin OS uses a dark cyan → blue → purple → pink gradient system with orange as a secondary accent. This is deliberate, it is decided, and it is the ONLY place in Keldrin where this palette appears.**

Everything outside the OS — the website, the logo, the brand guide, social, decks, documents, any client- or public-facing surface — stays on the charcoal / gold / slate-blue brand palette in [[01 - Brand DNA]], [[02 - Company Naming]] and [[09 - Website]]. The two systems are not meant to converge.

The authoritative definition is **`tailwind.config.ts` in the `keldrin-os` repo.** This doc records the decision; the config holds the values.

**Cross-doc conflict, resolved Aug 27, 2026:** [[00 - Project Keldrin Overview]], [[02 - Company Naming]], and [[13 - Logo Specific]] had drifted out of sync with this — they still described an early "galaxy-gradient" (indigo → purple → gold) direction as if it were the live plan for Keldrin OS. That direction was explored before this palette was settled and was never built. All three docs have been corrected to point here as the canonical source. Full history of how the conflict arose is in [[15 - Prospect Board]].

**The ramp as built:**

| Token | Hex | Role |
|---|---|---|
| `ink-950` … `ink-400` | `#07080B` → `#5A6273` | Dark base, near-black with a cool blue cast |
| `accent-cyan` | `#22C7DE` | Gradient stop 1, eyebrow text, active/in-progress states, primary create actions |
| `accent-teal` | `#2DD4BF` | Positive signal (a named owner, a completed task, a live sync) |
| `accent-blue` | `#4F8DF5` | Gradient stop 2, low priority |
| `accent-indigo` | `#6366F1` | Focus rings, form borders |
| `accent-purple` | `#A855F7` | Gradient stop 3, mid-priority, cross-source insight callouts, edit/save actions |
| `accent-pink` | `#EC4899` | Gradient stop 4, urgent priority |
| `accent-rose` | `#E93A7A` | Errors, blocked, overdue states |
| `accent-orange` / `accent-amber` | `#F97316` / `#FB923C` | Secondary accent, high priority tasks, Tasks module identity color |

**Composites:** `bg-brand-gradient` (cyan→blue→purple→pink, 100°) for headings, wordmark and active rails · `bg-brand-button` (teal→indigo→pink, tighter) for primary buttons · `bg-brand-glow` (three radial washes) as ambient page background · `.text-gradient` helper for gradient text (as of Aug 23 session 5, no longer used in the sidebar — see below).

- Semantic meaning maps onto *position along the gradient*, not arbitrary color picks.
- Orange is the secondary accent and was historically kept scarce — "look at this" without meaning "something is wrong" — but Kyle asked (session 6) to weave it in more broadly, and it's now also the Tasks module's identity color (already used for the Tasks dashboard-card icon chip) and shows up as the board's active view-toggle pill, the quick-add "Add" button, and — pre-existing, not new — the High priority badge.
- **Solid vs. gradient buttons (decided session 6):** primary action buttons increasingly use a single solid accent color rather than the `bg-brand-button` gradient, chosen per action so the button's color hints at what it does rather than being decorative: cyan = create/open ("+ New task"), purple = save/edit confirmation ("Save"), orange = a fast inline add ("Add" in quick-add rows). `bg-brand-button`/`bg-brand-gradient` remain in use elsewhere (Prospects' view toggle, headings, the "Call" button) — this is a per-button choice, not a system-wide replacement.
- Dark mode only. Not planned to change.

## Sidebar Logo — SETTLED Aug 23, 2026

`src/components/logo-mark.tsx` renders the real Keldrin K silhouette (same mark as the `keldrinco-website` nav — see [[13 - Logo Specific]]) instead of the earlier placeholder. Technique: the gold-on-transparent PNG (`public/brand/keldrin-k-mark.png`) is used as a CSS `mask-image` on a `span` filled with `bg-brand-gradient` — same shape, OS gradient fill, no new asset needed. (Note: this correctly uses the real OS gradient tokens, not the outdated galaxy-gradient export flagged in [[13 - Logo Specific]].)

## Greeting Logic — SETTLED Aug 23, 2026

Three states: **"Good morning"** 4am–noon, **"Good afternoon"** noon–6pm, **"Good evening"** 6pm–4am. No "Good night." `src/components/greeting.tsx`, computed client-side to avoid the Vercel-UTC mismatch.

## Daily Brief Dashboard — LIVE Aug 23, 2026

Deployed and confirmed working at `keldrin-os.vercel.app/dashboard`. Replaced the placeholder module-card grid with a real daily-operations view, originally validated with an interactive mockup built from Kyle's actual inbox/calendar/task content.

**Architecture — no OAuth apps needed.** The sync rides on the Gmail / Microsoft 365 / Google Calendar connectors already available to Claude/Cowork sessions on Kyle's account rather than wiring OAuth directly into the Next.js app. A **scheduled task** (`Keldrin OS — Daily Brief sync`, trigger id `trig_01Q9guvH7waZFNGsg3Hu7vcD`, daily 6:30am America/Chicago / `30 11 * * *` UTC — will drift an hour whenever DST flips) fires a fresh Claude session each morning that pulls Gmail (personal), Outlook (work), Calendar, and open Tasks, categorizes/summarizes them, and writes one row into `daily_brief_snapshots`. The Next.js app just reads the latest row — no live API calls, no token management, from the app itself. This sync stays a Cowork/scheduled-task responsibility even after development work moves to Claude Code locally — it needs the Gmail/Outlook/Calendar connectors that only exist in this environment.

**Tables** (`supabase/migrations/0009_daily_brief.sql`, `0010_daily_brief_grants.sql`):
- `daily_brief_snapshots` — one row per sync run: `narrative` (text) plus `today`/`tomorrow`/`this_week` (jsonb action-item arrays), `gmail`/`outlook` (jsonb digests), `calendar` (jsonb, day-grouped events with business/personal tags and optional cross-source `insight` notes). RLS: user can `select` their own rows; writes go through the scheduled job's service-level Supabase access, not the app.
- `brief_item_state` — per-item done/dismissed state, keyed by a stable `item_key` (`task:<uuid>` mirrors a real task, `email:gmail:<id>`/`email:outlook:<id>` for email items, `brief:<slug>`/`cal:<slug>` for brief-only items). Full user CRUD via RLS.

**App code:** `src/app/dashboard/actions.ts` (`setBriefItemStatus`), `src/components/brief/` (`daily-brief.tsx`, `email-module.tsx`, `calendar-module.tsx`, `tasks-summary.tsx`, `action-checkbox.tsx`, `weather-module.tsx`/`weather-icons.tsx`), `src/lib/brief-styles.ts`, `src/lib/types.ts`, `src/lib/weather.ts`, `src/app/dashboard/page.tsx`.

**Two bugs hit and fixed during the original rollout (both worth remembering):**

1. **Build failure — TS type mismatch.** `email-module.tsx` declared `type Tab = "needs_action" | "fyi" | "filtered"` but only ever set `tab` to two of those three values. Fixed by narrowing `Tab` to the two values actually used.
2. **"No sync yet" on every module despite the snapshot existing.** The two new tables never got base table-level grants (RLS only filters on top of a base grant). Fixed live via `grant select on daily_brief_snapshots to authenticated; grant select, insert, update on brief_item_state to authenticated;` (`0010_daily_brief_grants.sql`). **Root cause of why 0001/0003's tables got auto-granted and 0009's didn't is still unconfirmed** — worth watching on the next brand-new table.

**Status:** deployed and confirmed live by Kyle.

## Weather Module + Wider Layout + Color Pass — LIVE, confirmed Aug 23, 2026 (session 6)

Kyle asked for: more width/density (less unused margin), a weather module to the right of the Daily Brief card, distinct accent colors per module (both mail modules sharing one color, the rest different), more "pop"/animation (the dashboard felt too dark/flat), then two rounds of follow-up tweaks (darker/less-busy Daily Brief background, correct zip 42001 not 42003, sidebar wordmark + active nav label switched from gradient text to plain white, keep the K icon's gradient as-is) — then all of it built into the real app and pushed.

**Validated first as an interactive mockup**, then ported into the real `keldrin-os` repo in session 5: https://claude.ai/code/artifact/1aa76966-ab6a-43df-a09c-99fd56a0eec6 (republished in place twice for follow-up tweaks — darker hero background, zip fix).

**Confirmed LIVE as of session 6** — a live check of `keldrin-os.vercel.app/dashboard` shows the widened `max-w-[1700px]` layout, the Weather module next to Daily Brief, per-module accent colors (Tasks = orange/amber icon chip), and the plain-white sidebar wordmark, all rendering in production.

**Files that shipped:** `src/lib/weather.ts`, `src/components/brief/weather-icons.tsx`, `src/components/brief/weather-module.tsx` (Open-Meteo, server-side, no API key, Paducah KY 42001, `revalidate: 1800`), plus updates to `globals.css`, `sidebar.tsx`, `daily-brief.tsx`, `email-module.tsx`, `calendar-module.tsx`, `tasks-summary.tsx`, and `page.tsx`.

## Tasks Board Redesign — LIVE, confirmed Aug 26, 2026

Kyle asked to expand Tasks from the old bare-bones list (quick-add row + flat rows with inline priority/status dropdowns and a delete link) into something full-width, board-style, and more interactive — checkboxes, richer dropdowns, and tasks editable in place (due date, title, notes). Validated as an interactive mockup first, then built into the real app the same session (Aug 23, session 6), written to the local clone, and **confirmed by Kyle tonight (Aug 26) as committed and pushed.**

**Mockup:** https://claude.ai/code/artifact/611a9e8c-8d79-405d-8f3d-7c9b6fe83372 (republished in place once, for the button-color pass below). Kyle approved the design and asked for it to be built for real.

**Button color pass (before porting to code):** Kyle asked to replace the mockup's gradient primary buttons with solid colors from the accent ramp, one per action, and to weave the orange accent in more broadly (see the note added to the Color System section above). Landed as cyan/purple/orange on New task / Save / Add respectively, both in the mockup and in the real component code.

**Built into the real app.** Checked the live Supabase schema before building — the `tasks` table already has an unused nullable `description` column, so the drawer's "Notes" field maps to that with **no migration needed**. The schema's real `status` enum is `not_started | in_progress | blocked | done` (four values) and `priority` is `urgent | high | medium | low` (four values) — both richer than the mockup's simplified 3-status/3-priority preview, so the real board uses all four of each: **four board columns** (To Do / In Progress / Blocked / Done) instead of the mockup's three, and priority filters/pills include Urgent and use the app's pre-existing priority color convention (urgent=pink, **high=orange**, medium=purple, low=blue) rather than the mockup's placeholder colors.

**Files written into `C:\GitHub\keldrin-os`:**

- `src/lib/types.ts` — added `TaskFieldEdits` (title/description/status/priority/due_date, all optional) and `TaskCreateInput` types.
- `src/lib/task-styles.ts` — added a `hex` value to every `STATUS_STYLES` entry (previously priority-only) so board column headers and the drawer's status buttons can use solid-color dots/fills the same way Prospects' stage buttons do; `PRIORITY_STYLES` gained `hex` too.
- `src/app/dashboard/tasks/actions.ts` — added `createTaskQuick` (board quick-add / drawer create) and a consolidated `updateTaskFields(id, edits)` (mirrors `updateProspectFields`) so one call covers any combination of field changes instead of one action per field. Existing `createTask`, `updateTaskStatus`, `updateTaskPriority`, `deleteTask` kept for compatibility (the last two now just call `updateTaskFields` under the hood). All task mutations now also `revalidatePath("/dashboard")`, not just `/dashboard/tasks` — the dashboard's Tasks Summary and Daily Brief modules read the same table and previously wouldn't refresh until a manual reload.
- `src/components/tasks/task-workspace.tsx` (new) — the client-side board, mirroring `prospect-workspace.tsx`'s pattern: optimistic local state + `useTransition`, rollback with a banner on write failure. Stat strip (Open / Overdue / High priority / Due this week), search + priority filter + Board/List toggle + "+ New task" toolbar, a 4-column drag-and-drop board with per-column quick-add, and a sortable list/table view. Checkboxes toggle Done ⇄ In Progress on both card and row.
- `src/components/tasks/task-drawer.tsx` (new) — slide-in edit/create drawer (`w-[min(460px,94vw)]`, same sizing convention as `prospect-drawer.tsx`). Priority and status are button groups that apply instantly on click (like Prospects' stage buttons); title, due date, and notes are staged locally and committed together by the purple Save button, with a two-step Delete confirm.
- `src/app/dashboard/tasks/page.tsx` — rewritten to the dashboard's `max-w-[1700px]` wrapper (previously `max-w-3xl`, noticeably narrower than every other page) and now renders `<TaskWorkspace>` instead of the old `<TaskForm>`/`<TaskRow>` list.

**Left in place but no longer used:** `src/components/tasks/task-form.tsx` and `task-row.tsx` — nothing imports them anymore. **Still not deleted as of Aug 27** — this sandbox's Filesystem MCP tools (`move_file`, `create_directory`, `read_text_file`, etc.) all still fail with the same `draft-07 outputSchema` validator bug first seen Aug 23, so there was no way to delete or move files on Kyle's machine from Cowork. **Now that development is moving to Claude Code running locally (Decided Aug 27, above), this is trivially unblocked** — Claude Code has normal filesystem access on Kyle's machine and can delete these directly once a session is pointed at the repo.

**Mobile verified Aug 26, 2026 (tonight)** — using the same-origin-iframe technique (see the responsive policy section above), confirmed at a real 390×844 viewport: sidebar collapses correctly to the hamburger/off-canvas drawer, the stat strip and toolbar wrap cleanly, and the board itself uses `grid-cols-1 sm:grid-cols-2 xl:grid-cols-4` — i.e. **columns stack vertically one-per-row on phone width** rather than scrolling horizontally. No horizontal overflow anywhere (`document.documentElement.scrollWidth` matched viewport width exactly at every scroll position tested). This differs from the standing policy's original literal wording ("scrolls horizontally with its columns") but was judged a legitimate, arguably better mobile pattern for a 4-column board — the policy wording above has been broadened to allow either. The task drawer was also opened and checked at the same width: fully readable, no clipped buttons, Delete/Cancel/Save all fit on one row.

**Not yet done:**
- Decide whether Board or List should be the default view (currently Board).

## Prospects Full Field Editability — LIVE, confirmed Aug 26, 2026

Kyle called this a MUST-have: Prospects is meant to be filled in as on-site/phone research closes data gaps (a phone number found, an owner named, a unit count confirmed), and the drawer previously only let you edit the four working-pipeline fields (next action, drive-by date, notes, owner-contacted) plus stage — everything else, including phone, address, and every other research column, was read-only.

Now essentially the whole `prospects` row is editable from the drawer, saving field-by-field on blur with the same optimistic-update/rollback-on-failure pattern already used elsewhere, and — because the kanban cards, table rows, and drawer all read one shared state in `prospect-workspace.tsx` — an edit shows up on the card and in the table immediately, no reload. Full detail, the field list, and the files changed (`src/lib/types.ts`, `src/app/dashboard/prospects/actions.ts`, `src/components/prospects/prospect-drawer.tsx`) are in [[15 - Prospect Board]].

Written to the local clone Aug 24; **confirmed by Kyle tonight (Aug 26) as committed and pushed.**

**Mobile verified Aug 26, 2026 (tonight)** — opened a real prospect's drawer at a genuine 390px viewport (same-origin-iframe technique). The stat row correctly collapses to `grid-cols-2`, the pipeline-stage buttons wrap into a clean 3+3+1 layout, Call/Open-in-Maps sit side by side without crowding, and every one of the now much-longer field list's label/value rows (Ownership, Size & Footprint, Location & Contact, Digital Presence, Amenities, Field Note, Source) renders full-width with no truncation or horizontal overflow all the way to the bottom of a 2290px-tall drawer. No fixes needed.

## Mobile Home Parks added to Prospects — LIVE, Aug 26, 2026

A separate session earlier today built the third sourcing dataset — 365 mobile home parks across KY/IL/MO/TN, same method and scoring model as the RV Park and Storage Unit datasets. Full detail in [[17 - Mobile Home Parks]]. Seeded into the same `prospects` table as `business_type = 'mobile_home_park'`, bringing the live total to **715 rows** (350 RV park + self-storage, plus 365 mobile home park), confirmed via `list_tables`. Prospects now shows three type tabs (All / RV Parks / Mobile Homes / …). No code changes were needed in the OS itself — the type tabs and kanban were already generic over `business_type`.

**Migration bookkeeping note:** the live Supabase migration history shows this landed as five separate `seed_mobile_home_parks_part1`–`part5` migrations (split for size), while the repo has one consolidated `0012_seed_mobile_home_parks.sql`. Cosmetic difference only — same end state — not worth splitting the repo file to match.

## Responsive / Mobile Pass — LIVE, confirmed Aug 23, 2026 (session 6)

Kyle needs the app usable on his phone during scouting missions, not just at a desk. It wasn't — the sidebar was a fixed 240px column with no mobile behavior, eating most of a phone screen permanently. Fixed directly in the local clone (`C:\GitHub\keldrin-os`) via the desktop file bridge in session 4; **now promoted to a standing policy** (see top of this doc) rather than a one-time pass.

**What changed:**

- `src/components/sidebar.tsx` — below the `md` breakpoint it's now an off-canvas drawer (fixed, slides in from the left, backdrop click closes it, nav-link click closes it) triggered by a hamburger button in a new mobile top bar (logo + menu button, `md:hidden`). At `md` and up it renders exactly as before — a static 240px sidebar, no visual change on desktop.
- `src/app/dashboard/layout.tsx` — container is now `flex-col md:flex-row` so the mobile top bar stacks above content instead of squeezing into a row; added `min-w-0` on the content pane so a wide inner element (like the Prospects table or kanban board) can't force horizontal scroll on the whole page.
- `src/app/dashboard/page.tsx`, `src/app/dashboard/tasks/page.tsx`, `src/app/dashboard/prospects/page.tsx` — page padding was a flat `px-8`, too wide for a phone; now `px-4` below `sm`, `px-8` at `sm` and up. Prospects' `main` is `min-h-screen` on mobile (lets the page scroll naturally) and `md:h-screen` on desktop (keeps the fixed-height layout with its own internal scroll region).
- `src/components/prospects/prospect-workspace.tsx` — same padding treatment across the type tabs, stat strip, filter bar, count line, and save-error banner. The search input is full-width on mobile, fixed `sm:w-56` at `sm+`. Kanban board and the sortable table already scrolled horizontally inside their container and needed no structural change.
- `src/components/prospects/prospect-drawer.tsx` — the four-stat row (score/drive/units/years) was a flat `grid-cols-4`, cramped on a narrow phone; now `grid-cols-2 sm:grid-cols-4`. Drawer body padding `p-4` below `sm`, `p-6` at `sm+`. The drawer itself was already `w-[min(485px,96vw)]` and needed no change.
- The Tasks page's own responsive treatment was rebuilt this session as part of the board redesign above (grid columns, stat strip, drawer sizing all follow the same policy).

**Verified working** by Kyle at phone width via Chrome DevTools device toolbar (session 4). **Confirmed pushed/live and independently re-verified by Claude tonight (Aug 26)** via the same-origin-iframe technique for both Tasks and Prospects — see their sections above.

## Local Dev Environment — SET UP Aug 23, 2026

Kyle installed Node.js locally (previously had none). Working now:

- `npm install` required `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` first — Windows PowerShell's default `Restricted` policy blocks npm's `.ps1` shims from running at all. One-time fix, already applied.
- `.env.local` created manually by Kyle (the remote device-bridge tools refuse to write `.env.local` or any env file, by design). Contains `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- `npm run dev` confirmed working, serves `localhost:3000`.
- 5 npm audit vulnerabilities (4 high, 1 critical) surfaced on install — left alone deliberately, almost certainly transitive dev-tooling deps.
- This unlocks real local verification (`npm run dev`, `npm run build`) before pushing — and, as of Aug 27, is exactly the environment Claude Code runs in directly (see Decided Aug 27 above).

## Auth Flow — OTP Code Login — LIVE, confirmed Aug 23, 2026 (session 6)

Original magic-link flow required opening the email client and clicking a link, which opened the app in a **new tab** — clunky at a desk, worse on mobile mid-scouting-trip. Fixed by adding a same-tab 6-digit code path alongside the existing link.

**Code change:** `src/app/login/page.tsx` rewritten. After requesting a sign-in, the page now shows a code-entry form and calls `supabase.auth.verifyOtp({ email, token, type: "email" })` directly client-side — no redirect, no new tab. The magic-link click still works too as a fallback.

**Supabase/Resend setup (all done, confirmed working):** custom SMTP via Resend (`smtp.resend.com`, port 465, sender `noreply@keldrin.co`, dedicated `Keldrin OS SMTP` API key), OTP template edited to show the 6-digit code. **Confirmed working end-to-end by Kyle.**

**Confirmed pushed/live** as of session 6.

## Migration Drift — reconciled (partially) Aug 26, 2026

The open item "repo migration files have drifted from the live database" (tracked since Aug 23) was investigated tonight by comparing `supabase/migrations/*.sql` in the repo against `list_migrations`/`list_tables`/`pg_indexes` on the live "Keldrin OS" Supabase project. Findings:

- **Real drift, now fixed:** two changes applied live on Aug 20 never landed as repo files — dropping `unit_label`'s default (its right value depends on `business_type`, so a single default was wrong for most rows) and a unique index `prospects_user_type_name_key` on `(user_id, business_type, lower(name))` that the seed scripts rely on for de-duplication. Both are now captured, idempotently, in `supabase/migrations/0013_reconcile_prospects_constraints.sql`, written into the local clone tonight. **Needs Kyle's commit/push** like the other pending files — this is a good first real task to hand to a local Claude Code session (see Decided Aug 27, above).
- **Not actually drift (expected):** `create_website_contact_submissions` / `grant_anon_insert_contact_submissions` exist in the live migration history but aren't in the `keldrin-os` repo — that table (`website_contact_submissions`) belongs to the `keldrinco-website` app, which shares this same Supabase project. Nothing to reconcile.
- **Not actually drift (expected):** `0005_seed_rv_parks.sql` and `0007_seed_storage_units.sql` exist as repo files but don't appear in Supabase's own migration history table — both were large seeds pasted directly into the Supabase SQL editor rather than run through the migration tool (documented at the time in the Aug 23 handoff), so they were never recorded there. The data is live either way.
- **Cosmetic only:** today's mobile-home-park seed is one file in the repo (`0012_seed_mobile_home_parks.sql`) but five migrations in Supabase's history (split for size) — same end state, not worth changing.

## Shipped so far

- **Auth** — Supabase magic link *and* same-tab 6-digit code, both via custom SMTP (Resend); middleware-guarded `/dashboard`. Live.
- **Tasks** — full CRUD, priority and status color-coded from the accent ramp, board/list views, drag-and-drop, notes, full-width layout. Live and confirmed pushed as of Aug 26; mobile-verified.
- **Prospects** — the sourcing board. 715 targets across RV parks, self-storage, and (as of today) mobile home parks; kanban across seven stages, sortable table, drive-time map, detail drawer with nearly every field editable. Live and confirmed pushed as of Aug 26; mobile-verified. See [[15 - Prospect Board]] and [[17 - Mobile Home Parks]].
- **Dashboard / Daily Brief** — see above. Live.
- **Responsive layout** — mobile drawer nav + responsive spacing across dashboard, tasks, and prospects; a real same-origin-iframe verification technique now exists for checking this from the sandbox going forward. Live, and a standing policy for all future work (see top of doc).
- **Weather module + wider layout + per-module colors** — see above. Live.

## Relationship to Other Workstreams

- [[10 - Legacy Index]] is the CRM/data layer this app is built around — and, as of Aug 27, the immediate data-model target for the Contacts module
- [[03 - Networking]] is the working-list workstream Contacts will become the in-app home for
- [[04 - Deals]] is the first real-world test case — the RV Park, Storage Unit, and Mobile Home Park datasets are what Prospects holds
- [[15 - Prospect Board]] documents the first substantial feature
- [[17 - Mobile Home Parks]] documents the third sourcing dataset, added to Prospects Aug 26
- [[09 - Website]] shares infrastructure (GitHub, Vercel, Supabase, and now Resend/SMTP) but explicitly NOT the color system
- [[05 - Systems & SOPs]] supplies the operational logic the app should encode

## Technical Infrastructure

- **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind 3.4 · Supabase (auth + Postgres with RLS)
- **Repo:** `keldrinco/keldrin-os` (private) · local clone `C:\GitHub\keldrin-os`
- **Deploy:** Vercel team `Keldrin` (`team_lrmAS0V3OoV5xORTaFCQxNvw`), project `keldrin-os` (`prj_BtlK7MWMuzIsPHZGzpoLz0emt3Bq`), Git-linked to `main`. Live at `keldrin-os.vercel.app`. Every push to main deploys.
- **Database:** Supabase project `Keldrin OS` (`xorkgbbjpdfpkiflrkeo`), us-east-2, Postgres 17. Kyle's single user_id: `60708236-8dee-4f75-96fa-8f43b7972603` (hopp@keldrin.co). `tasks` table: `id, user_id, title, description, status, priority, due_date, created_at, updated_at`. `prospects` table now 715 rows across `rv_park`/`self_storage`/`mobile_home_park`.
- **Env:** `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, in `.env.local` locally and in Vercel project settings.
- **Email/SMTP:** Supabase Auth sends through Resend custom SMTP (see Auth Flow section).
- **Weather:** Open-Meteo, free/no API key, fetched server-side in `src/lib/weather.ts`.
- **Push access:** this Cowork sandbox has no git credentials for the private `keldrin-os` repo — this is one of the main reasons development is moving to Claude Code running locally (Decided Aug 27, above). Historical workflow, still valid for any future Cowork-side edits: edit in the sandbox, write finished files into Kyle's local clone via the device bridge (`device_request_folder_access` + `device_commit_files` — refuses to write `.env.local`/env files by design), Kyle commits/pushes via GitHub Desktop, Vercel deploys on push.
- **File deletion still blocked from Cowork:** as of Aug 26, every `mcp__remote-devices__Filesystem__*` tool (`read_text_file`, `move_file`, `create_directory`, etc.) fails with `Tool '...' has an invalid outputSchema: JSON Schema declares an unsupported dialect ("$schema": "http://json-schema.org/draft-07/schema#")` — a validator incompatibility on that MCP server, not a permissions issue. This is a non-issue for Claude Code running locally, which has normal filesystem access.
- **New-table grants:** apply_migration via the Supabase MCP does not reliably grant base authenticated privileges the way the Supabase dashboard SQL editor does for older tables — check `information_schema.role_table_grants` for any new table before assuming RLS alone makes it queryable.
- **Reading live schema/constraints for drift checks:** `pg_constraint` only shows named constraints (checks, PKs, FKs, explicitly-added uniques) — a unique index created with plain `CREATE UNIQUE INDEX` (not `ADD CONSTRAINT ... UNIQUE`) won't show up there. Query `pg_indexes` (or `\d` equivalent) as well when reconciling — this is how `prospects_user_type_name_key` was found tonight after `pg_constraint` alone came up empty.
- **TypeScript verification without Node:** historical Cowork-sandbox limitation (no npm registry access, so hand-stubbed React/JSX ambient types were used as a substitute for real `tsc`/`npm run build`) — no longer needed once work happens in Claude Code locally, which has the real toolchain.
- **Daily Brief sync:** scheduled task, not a Vercel cron — runs as a Claude session hitting Gmail/Microsoft 365/Google Calendar/Supabase connectors directly. Stays in Cowork (see Decided Aug 27, above).
- **Artifact reads:** this session's environment blocks `*.frame.claudeusercontent.com`, so it cannot read back a previously-published artifact's live HTML to edit it in place unless it was published by this same session — every edit not from this session forks a new artifact URL instead.
- **Verifying real mobile rendering:** the same-origin-iframe technique documented in the Standing Policy section above works from Cowork; from Claude Code locally, a real Playwright viewport test against `localhost:3000` is the better option going forward.
- Cost-sensitive: free/low-cost tiers wherever practical.

## Build Philosophy

Build the working dashboard incrementally around real workflows rather than designing an abstract all-in-one system upfront. Every table gets RLS and least-privilege grants from the start. Every new page/feature must meet the standing mobile-responsive policy (see top of doc) before being considered done — and actually verify it with a real viewport check, not just by inspecting the Tailwind classes. When a mockup precedes a real feature, check the live app and the real database schema before building so the ported version can improve on the mockup's simplifications (see Tasks board: 4 statuses/priorities vs. the mockup's 3) rather than just copying it verbatim.

## Open Decisions

- Whether `keldrin-os.vercel.app` eventually moves to an `app.keldrin.co` subdomain
- Additional dashboard modules — suggestions logged below
- DST will shift the Daily Brief sync's fire time by an hour relative to Kyle's local morning — revisit the cron then
- Whether to fix the `*.frame.claudeusercontent.com` network allowlist gap so future sessions can edit mockups in place instead of forking new URLs
- Whether Kyle wants Board or List as the default Tasks view
- Kyle needs to commit/push pending changes: the migration file (`0013_reconcile_prospects_constraints.sql`) and the two UI tweaks (`task-workspace.tsx`, `prospect-workspace.tsx`) from Aug 26 — a good first task for a local Claude Code session

## Notes

- **Aug 23, 2026 (session 3):** Swapped the sidebar's placeholder K for the real Keldrin mark. Fixed the greeting to a 4am/noon/6pm three-state split. Built and published an interactive dashboard mockup, then built the real thing: `daily_brief_snapshots`/`brief_item_state` tables, a scheduled Claude session as the sync engine, full component set. Confirmed live and working by Kyle.
- **Aug 23, 2026 (session 4):** Made the app responsive end-to-end (sidebar → mobile drawer, padding, drawer stat grid). Got Kyle a working local dev environment. Replaced the magic-link-only login with a same-tab 6-digit OTP code flow via Resend custom SMTP — confirmed working end-to-end.
- **Aug 23, 2026 (session 5):** Kyle asked for a weather module, a wider/denser layout, distinct per-module accent colors, and more animation/"pop." Published a revised mockup first for preview, then built it into the real app.
- **Aug 23, 2026 (session 6):** Confirmed via a live check of `keldrin-os.vercel.app` that sessions 4 and 5's work were all live in production. Wrote the app-wide mobile-responsive requirement down as a standing policy. Built and published an interactive Tasks board mockup, then — after Kyle approved it and asked for one button-color tweak (solid cyan/purple/orange instead of gradients, weaving orange in more broadly) and gave the go-ahead to build — ported it into the real app: checked the live `tasks` table schema first (found the `description` column already there for notes, and the real 4-value status/priority enums), then wrote `task-workspace.tsx`, `task-drawer.tsx`, updated `actions.ts`/`types.ts`/`task-styles.ts`/`page.tsx` into the local clone.
- **Aug 24, 2026:** Kyle called out full Prospects field editability as a MUST-have — on-site/phone research needs to be able to fill in gaps (a found phone number, a confirmed unit count) and see it saved and reflected live everywhere. Read the live `prospects` schema and the existing drawer/actions/types code first, then expanded `ProspectFieldEdits` from 4 fields to nearly the whole row, rewrote `updateProspectFields` around an explicit per-column allowlist with server-side bounds clamping, and rewrote the drawer with a generalized editable-field pattern across nine sections. Caught and fixed one real bug before shipping: an inline-defined editable-row component would have remounted (and stolen focus from) every input on each keystroke — moved it to module scope instead. Verified with a brace-balance check and a `tsc --noEmit` pass under a hand-stubbed React/JSX environment (no npm registry access in this sandbox). Written into `C:\GitHub\keldrin-os` and confirmed byte-for-byte on Kyle's machine after a mid-session connection drop.
- **Aug 26, 2026 (earlier session, same day):** A separate session built the Mobile Home Parks dataset (365 parks, four states) and seeded it into `prospects`. See [[17 - Mobile Home Parks]].
- **Aug 26, 2026 (this session):** Kyle confirmed the Aug 23/24 Tasks-board and Prospects-editability work is committed and pushed. Verified both live at genuine phone width using a newly-found same-origin-iframe technique (documented above) that finally works around the long-standing `resize_window` tooling bug — both held up cleanly, with one worth-noting deviation (Tasks board stacks columns vertically on mobile rather than scrolling horizontally, judged fine and folded into the standing policy). Attempted to delete the two dead Tasks files; confirmed the Filesystem MCP tools are still broken (draft-07 schema bug), so left them in place for Kyle to remove manually. Reconciled the long-standing migration-drift item: found and wrote `0013_reconcile_prospects_constraints.sql` capturing two real gaps (unit_label default, unique name-per-type index), and confirmed the other apparent gaps were expected, not drift. Later in the same session, two small UI tweaks: moved the Tasks toolbar's "+ New task" button to sit left of the search bar instead of far right (`task-workspace.tsx`), and fixed a stray vertical scrollbar with up/down arrow buttons appearing at the right edge of the Prospects type-tabs row — root cause was the classic CSS quirk where `overflow-x-auto` with no explicit `overflow-y` gets treated as `overflow-y: auto` too, so a hairline height mismatch in the tab buttons was enough to trigger a needless scrollbar; fixed by adding `overflow-y-hidden` alongside it (`prospect-workspace.tsx`). Both written into the local clone — **pending Kyle's commit/push**, same as the migration file above.
- **Aug 27, 2026:** Kyle decided to move primary development to Claude Code running locally against both repos, with Cowork continuing to handle the Daily Brief sync, research/data work, and project-doc upkeep. Resolved the cross-doc color-system conflict (this doc's palette confirmed canonical; [[00 - Project Keldrin Overview]], [[02 - Company Naming]], and [[13 - Logo Specific]] updated to match). Decided the next Keldrin OS module is Contacts (people/relationship layer), ahead of Deals. Wrote `CLAUDE.md` and a mirrored copy of the Project Keldrin docs into both `C:\GitHub\keldrin-os` and `C:\GitHub\keldrinco-website` so Claude Code sessions have this context automatically.
- **Module suggestions discussed (not yet built):** a Prospect Follow-Up Radar (stale/no-contact-in-N-days prospects surfaced daily); a Weekly Momentum scorecard; a Networking/Mentor Pulse (likely folds into the new Contacts module); a Drive-By Planner (clusters nearby Prospects by drive time + weather); a lightweight Wins/Journal capture feeding [[06 - Lessons Learned]]. None built yet.
