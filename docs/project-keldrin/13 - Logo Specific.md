---
description: Logo asset registry — every rendered use case of the K mark, where each version lives, and how to swap them all at once when the underlying mark changes. Part of Project Keldrin — see [[00 - Project Keldrin Overview]] and [[02 - Company Naming]].
---

# 13 - Logo Specific

## Status: Running with current geometry (decided Aug 26, 2026)

Figma edits to the K mark are paused (not landing the desired result yet). **Kyle's call on Aug 26, 2026: stop treating the current mark as a placeholder.** This is the logo — for now and the foreseeable future — for every use case, including any future mockups. The source of truth for every rendered asset below is still the flattened reference image Kyle shared on Aug 22, 2026, re-exported as needed; a true vector pass through Figma remains possible later, but it's no longer a blocker for using this mark anywhere, and it shouldn't be caveated as "temporary" going forward.

No geometry was touched in producing these exports: the K silhouette is pixel-identical to the reference, only color fills, backgrounds, and crop/canvas treatments were applied per use case.

Caveat worth flagging: because the source is a compressed raster image rather than vector, edges were reconstructed from a color-based alpha mask and upscaled. It holds up cleanly through favicon and hero sizes and any web/social use; a vector re-export would only matter for very large print formats, which aren't a current need.

**When the mark changes next:** regenerate this whole set from the new source in one pass and replace the file at each "Used in" location below — that's the entire point of keeping this list in one place instead of hunting across the website repo, Keldrin OS repo, and social accounts individually.

**Live source (confirmed working Aug 26, 2026):** the mark can always be re-pulled directly from keldrin.co's own deployed assets — `https://keldrin.co/assets/apple-touch-icon.png` (180×180 gold-on-charcoal square, opaque — ideal for profile-photo-style mockups) and `https://keldrin.co/assets/k-mark-hero.png` (1080×1080 gold-on-transparent — ideal for placing on custom backgrounds, e.g. cover photo mockups). Useful fallback any time the original export zip isn't at hand in a session — a fresh session can re-derive a clean cutout of either straight from the live site rather than needing the original files re-uploaded.

## Locked Colors Used

- Gold: `#E6BD69` (matches the live site's rendered gold, ~`#E5BE68`)
- Slate/charcoal: `#2C3441` (the deployed apple-touch-icon square currently renders on a darker `#16181C` — worth reconciling which is canonical next time the icon is regenerated)
- Keldrin OS gradient stops used in these logo-mark exports (first-pass "galaxy-gradient" direction): deep indigo `#221B4E` → purple `#6B3FA0` → warm gold `#E6BD69`, applied diagonally. **Superseded Aug 27, 2026** — this was an early proposal explored before the real Keldrin OS UI palette was built, and it was never adopted. The actual shipped Keldrin OS gradient (`bg-brand-gradient` in `tailwind.config.ts`, and the sidebar K-mark fill) is cyan → blue → purple → pink, with orange as a secondary accent — no gold anywhere in the product (see [[11 - Keldrin OS Build]] for the full token table, and [[02 - Company Naming]] for the cross-doc conflict this resolved). The `keldrin-k_galaxy-gradient` and `keldrin-k_os-app-icon` assets below still use the old indigo/purple/gold values and are visually out of sync with the real app as a result.

## Asset Set (`keldrin-k-mark-usecases-v1.zip`)

| File | Description | Intended use |
|---|---|---|
| `keldrin-k_master_source_raw.png` | Cleaned gold-on-transparent master, extracted from the reference image | Source for all other exports — regenerate everything else from this if the crop/alpha needs adjusting |
| `keldrin-k_gold_transparent_{256,512,1080,2048}.png` | Gold mark, transparent background | Website inline logo, letterhead, anywhere placed over a non-charcoal surface |
| `keldrin-k_hero_gold_transparent_3000.png` | Same as above at hero resolution | keldrin.co hero section — large enough to sit as a hero-scale mark or watermark without softening |
| `keldrin-k_primary_{128,256,512,1080}.png` | Gold mark centered on a charcoal square | Social profile photos (@keldrinco), general square app-icon use |
| `favicon.ico` | Multi-size favicon (16/32/48/64px), gold-on-charcoal | keldrin.co `<link rel="icon">` |
| `favicon_{16,32,48,64,180}.png` | Individual favicon sizes, same treatment as above (small sizes use a slightly larger fill fraction for legibility) | Browser tab, PWA manifest icons |
| `apple-touch-icon.png` | 180x180, gold-on-charcoal, flattened to opaque RGB | iOS home-screen icon (`<link rel="apple-touch-icon">`) |
| `keldrin-og-image_1200x630.png` | Gold mark centered on charcoal, standard OG/social-share canvas | `og:image` / Twitter card meta tags on keldrin.co |
| `keldrin-k_mono-black_{256,512,1080}.png` | Solid black mark, transparent background | Light backgrounds, single-color print, apparel |
| `keldrin-k_mono-white_{256,512,1080}.png` | Solid white mark, transparent background | Dark backgrounds, reversed print, watermarks |
| `keldrin-k_galaxy-gradient_{256,512,1080}.png` | Core gradient fill (indigo → purple → gold), transparent background — **outdated direction, see note above** | Not currently a correct representation of Keldrin OS's real in-app palette; do not use for new OS work until regenerated |
| `keldrin-k_os-app-icon_{128,256,512}.png` | Gradient mark centered on a deep-indigo square (`#17142B`) — **outdated direction, see note above** | Same caveat — regenerate against the real OS tokens before using for a Keldrin OS app icon |

## Where Each Version Is Meant to Land

- **keldrin.co hero section:** `keldrin-k_hero_gold_transparent_3000.png` (or the 2048px gold-transparent export if file size matters more than max scale)
- **keldrin.co favicon + head tags:** `favicon.ico`, `favicon_180.png` (as `apple-touch-icon.png`), `keldrin-og-image_1200x630.png`
- **@keldrinco social profile photo:** `keldrin-k_primary_512.png` (or 1080 for platforms that accept higher-res uploads)
- **Keldrin OS app shell / product UI:** the real in-app mark is `src/components/logo-mark.tsx` (the gold-on-transparent PNG used as a CSS mask, filled with the actual `bg-brand-gradient` OS tokens) — **not** `keldrin-k_galaxy-gradient` / `keldrin-k_os-app-icon` from this export set, which are the outdated indigo/purple/gold direction (see [[11 - Keldrin OS Build]])
- **Letterhead / print / anything on a non-charcoal surface:** `keldrin-k_gold_transparent_1080.png`
- **Light-background or single-color contexts:** `keldrin-k_mono-black_512.png`
- **Dark reversed print or watermark use:** `keldrin-k_mono-white_512.png`
- **Any future mockup/concept work (social pages, decks, etc.):** use this mark by default — pull from the export zip if available in-session, or re-derive from the live keldrin.co assets above. No more "placeholder" framing needed.

## Open Items

- Optional future vector pass through Figma, purely for very-large-format print — not currently blocking anything
- Reconcile the documented charcoal `#2C3441` against the darker `#16181C` actually rendering behind the live apple-touch-icon
- **Regenerate `keldrin-k_galaxy-gradient` and `keldrin-k_os-app-icon`** using the real, settled Keldrin OS gradient tokens (cyan → blue → purple → pink, orange accent) instead of the old indigo/purple/gold direction — flagged Aug 27, 2026 as a real mismatch between this asset registry and the shipped app. Not yet fixed; the real in-app mark (`logo-mark.tsx`) already uses the correct tokens, so this only affects standalone exported files, not the live product.
- Decide whether the hero section wants the mark full-color-on-transparent (current default) or reduced-opacity as a background watermark treatment

## Notes

- **Aug 26, 2026:** Kyle confirmed he's running with the current K-mark geometry indefinitely — no more caveating it as a placeholder in mockups. Re-derived a clean transparent cutout and a charcoal-square version directly from keldrin.co's live deployed assets for use in a Facebook Page cover/profile mockup; confirmed the live gold renders as `#E5BE68` (essentially identical to the locked `#E6BD69`) and the icon's square background as `#16181C` (darker than the documented `#2C3441` charcoal — flagged above as an open item).
- **Aug 27, 2026:** Resolved a cross-doc conflict — this doc's "galaxy-gradient" (indigo/purple/gold) direction for Keldrin OS was never actually built; the real shipped OS palette is cyan/blue/purple/pink/orange with no gold, per [[11 - Keldrin OS Build]]. Flagged the two OS-related export assets in this doc as stale and due for regeneration.
(Log future swaps here — date, what changed, which files were regenerated — so this stays the single place to check before touching the logo anywhere.)
