---
description: Keldrin naming rationale, domain strategy, terminology (acquisitions/holdings/capital/equity), brand architecture, and visual identity direction. Part of Project Keldrin — see [[00 - Project Keldrin Overview]].
---

# 02 - Company Naming

## Naming Rationale

Keldrin was selected from a made-up-name exploration because it's distinctive, flexible, professional, and doesn't pigeonhole the company into one asset class (RV parks, laundromats, car washes, etc.).

An online baby-name source encountered during research described "Keldrin" as relating to a riverbank/source/stream and "brave warrior." That story resonates because Kyle lives in a river city (Paducah, KY) — but it should be treated as brand lore, not verified etymology, unless independently researched.

## Brand Architecture

- Public brand: **KELDRIN** (appears simply as this)
- Legal entity: **Keldrin LLC**
- Internal umbrella/codename: **Project Keldrin**
- Website: **keldrin.co**
- Social handle: **@keldrinco**

## Naming Guardrails

- Avoid adding "Capital," "Equity," "Holdings," or similar institutional-sounding descriptors just to appear larger than the company is
- "Acquisitions" is strongly aligned with the founder's intended direction but doesn't need to be permanently embedded in the legal name
- Keldrin should have room to grow into an umbrella brand spanning acquisitions, operations, resources/playbooks, and potentially future investment/portfolio functions

## Visual Identity — K Mark, Version 1 (Locked Aug 21, 2026)

The geometric K monogram is locked as of Aug 21, 2026. Source of truth is now a hand-coded SVG (no Illustrator dependency) covering: primary lockup, transparent gold, monochrome black, monochrome white, and a galaxy-gradient variant for Keldrin OS. Delivered as `keldrin-k-mark-v1.zip`.

**What changed from the original Illustrator-era version, per Kyle's own revision notes:**
- Closed the floating bottom-left point on the left stem — it was a fully disconnected shape with a sharp acute tip; now connects directly into the main stem with no gap
- Squared the small chevron notch (partway down the mark) from a mismatched 44.4°/48.2° angle to a clean, symmetric 45°/45°
- Matched the thickness of the two lower legs (down-left to the stem, down-right to the corner). The down-right leg originally tapered from 73px to 88px wide along its own length and didn't match the down-left leg's ~64px — both are now a constant 63.64px, matching the top arm's stroke weight
- Silhouette and overall proportions are otherwise unchanged from Kyle's original design

**Open item (not yet acted on):** the mark still mixes a couple of slightly different diagonal angles in the overall silhouette (upper arm ~45°, the top-level arm-vs-stem relationship wasn't re-derived from scratch). Flagged as a possible future "true v2" pass to lock every angle to one exact grid — not required to ship on the current version.

### Locked Brand Colors (Marketing/Website Palette)

- Gold: `#E6BD69`
- Slate/charcoal: `#2C3441`

### Asset Set (in `keldrin-k-mark-v1.zip`)

| File | Use |
|---|---|
| `keldrin-k_primary` (svg/png) | Gold mark on slate square — social profile photos, app icons |
| `keldrin-k_gold_transparent` (svg/png) | Gold mark, transparent bg — website, letterhead |
| `keldrin-k_mono-black` (svg/png) | Solid black, transparent bg — light backgrounds, single-color print, apparel |
| `keldrin-k_mono-white` (svg/png) | Solid white, transparent bg — dark backgrounds, reversed print, watermarks |
| `keldrin-k_galaxy-gradient` (svg/png) | An early first-pass gradient direction (deep indigo → purple → warm gold) explored for Keldrin OS before the real OS palette was settled — see the superseded-direction note below. Kept as a historical asset. |
| `favicon.ico` | Multi-size (16/32/48/64px) favicon for keldrin.co, built from the primary lockup |

All exported at 1080px, 512px, 256px plus the infinitely-scalable SVG source. Typography and full spacing/usage rules are still open (see below).

### Two Separate Palettes

The gold/slate pair above is the **marketing palette** — for the website, social, and public-facing materials (see [[09 - Website]]).

**Keldrin OS uses its own, fully separate product palette — settled Aug 23, 2026, and reaffirmed Aug 27, 2026 as canonical after a cross-doc conflict surfaced: cyan → blue → purple → pink with orange as secondary accent. No gold. No shared DNA with the marketing palette, deliberately.** The full token table lives in [[11 - Keldrin OS Build]], which is the authoritative source for the OS palette going forward.

The "galaxy-gradient" direction referenced above (indigo → purple → gold) was an early first-pass proposal explored *before* the real OS palette was built — it was never implemented in the app and is now superseded. It's kept in this doc and in [[13 - Logo Specific]] as a historical record of that exploration, not as current direction. The exported `keldrin-k_galaxy-gradient` and OS app-icon logo assets still use those old indigo/purple/gold values and are out of sync with the real app as a result — see [[13 - Logo Specific]] for the flagged regeneration task.

## Digital Presence Reference

| Asset | Current / Preferred |
|---|---|
| Website | keldrin.co |
| Founder email | hopp@keldrin.co |
| Public/general email | hello@keldrin.co preferred; contact@ already exists |
| Social handle | @keldrinco |
| Platforms reserved | TikTok, X/Twitter, Instagram, Facebook Business Page, GitHub |
| LinkedIn / Blinq email | hopp@keldrin.co |

## Open Decisions

- Typography pairing and full spacing/usage rules for the brand guide
- Whether to formally trademark the K mark

## Notes

- **Aug 27, 2026:** Resolved a standing conflict between this doc and [[11 - Keldrin OS Build]] over the Keldrin OS product palette — this doc previously still described the galaxy-gradient (indigo/purple/gold) direction as the live plan, while doc 11 documented a completely different palette (cyan/blue/purple/pink/orange) as already settled and shipped in the real app. Kyle's call: the shipped palette is correct and permanent; this doc updated to match. See [[11 - Keldrin OS Build]] and [[15 - Prospect Board]] for the full history of the conflict.
(Add logo revisions, typography tests, and naming decisions here as they develop.)
