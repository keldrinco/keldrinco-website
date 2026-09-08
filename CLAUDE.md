# keldrinco-website — context for Claude Code

This is the public marketing site for Keldrin LLC (keldrin.co), Kyle Hoppmann's business-acquisitions company. Full project background lives in `docs/project-keldrin/` in this repo — a mirrored copy of the Project Keldrin knowledge base that also lives in a Claude.ai Project. Read `docs/project-keldrin/00 - Project Keldrin Overview.md` first for company context, then `docs/project-keldrin/09 - Website.md` for everything about this specific site.

**This mirror can go stale.** It's refreshed from Cowork sessions when decisions get made there, but if something here looks inconsistent with the live site or you're about to make a call that depends on current state, say so and ask Kyle rather than assuming the mirror is current.

## STOP — scope boundary (added Aug 29, 2026)

**This session works on the website only. Do not touch `C:\GitHub\keldrin-os`.** That project is deliberately paused while Kyle works on business foundations (LLC, business banking, business credit, buy box). It is not abandoned, it is not stale, and it does not need help.

Two specific ways a well-meaning session can do real damage here:

1. **Do not sync the doc mirror backwards.** `docs/project-keldrin/` exists in *both* repos, and the copies have diverged. As of Aug 29, this repo's `11 - Keldrin OS Build.md` is **174 lines behind** the `keldrin-os` copy — it predates a whole Google OAuth build and the note recording why the app is paused. **The `keldrin-os` copy is authoritative for anything Keldrin OS.** If these files need reconciling, changes flow *from* `keldrin-os` *to* here, never the reverse, and only when Kyle asks. Copying this repo's copy over the other one destroys real work.
2. **Do not carry the palette across.** Charcoal + gold is this site. Keldrin OS is slate-graphite + teal. They are separate identities on purpose — see the brand rules below.


## Stack

Static HTML/CSS/JS plus one `/api/contact.js` serverless function. Deployed on Vercel, auto-deploys on push to `main`. Live at keldrin.co (DNS on GoDaddy, apex domain canonical). Backend: Supabase (shared project with keldrin-os) for contact-form storage; Resend for the notification email via custom SMTP.

## Brand rules (do not cross these with Keldrin OS)

- **Palette:** charcoal (`#2C3441`) + gold (`#E6BD69`), locked. This is the ONLY place gold appears in Keldrin. Keldrin OS (the separate internal app, different repo) uses a completely different palette with no gold — slate-graphite surfaces with teal as the single lead accent, settled Aug 29, 2026 (this previously read "cyan/blue/purple/pink", which was the older gradient system; that system and pink specifically were retired). The two identities are deliberately never meant to converge. See `docs/project-keldrin/02 - Company Naming.md` and `13 - Logo Specific.md`.
- **Typography:** Plus Jakarta Sans (headings), Inter (body), JetBrains Mono (eyebrows/buttons/labels).
- **Copy tone:** no fund/portfolio/completed-deal claims Kyle hasn't supplied evidence for; no "we buy businesses" framing — lead with listening. Avoid defensive/negation phrasing ("not a pitch, not a script") — state things positively. Full guardrails in `docs/project-keldrin/00 - Project Keldrin Overview.md`.
- **No people/team/handshake stock photography** — implies a team or office that doesn’t exist yet. Photography is American small-business/land vernacular (grain silos, an aerial of road and farmland, a wheat field) rather than glossy corporate architecture — it matches the asset classes actually being sourced. All photos are **self-hosted** in `assets/photos/` as AVIF/WebP/JPEG derivatives; nothing is hotlinked any more. Credits are in the HTML comment at the foot of `index.html`.
- **Logo:** revised K-mark adopted **Sept 8, 2026**, superseding the geometry locked Aug 26. Source of truth is Kyle’s Illustrator export, kept in Google Drive under `2026/KeldrinLLC/Design Work/Logo/SVG/Artboard 1.svg`, and committed here as `assets/logo/keldrin-tile-square.svg`. Derived web assets live in `assets/logo/`: `keldrin-mark.svg` (transparent, tight crop — hero use), `keldrin-mark-square.svg` (padded square — nav and any square slot), `keldrin-tile-square.svg` (slate tile, as exported — social avatars), plus `keldrin-tile-512.png` and `keldrin-mark-1080.png` rasters. Favicons and `apple-touch-icon.png` are generated from these; the old `k-mark-hero.png` is deleted. **Brand gold is `#E6BD69`** — the CSS previously used `#E5BE68`, which did not match the logo; corrected Sept 8.

## Current state (as of Sept 8, 2026)

Two branches, and it matters which is which:

- **`main` — the live site.** Carries a deliberate **placeholder homepage** (single screen: new logo, positioning line, `hello@keldrin.co`, entity/location/stage facts). It is self-contained: inline CSS, no dependency on `styles.css`. It exists so the domain shows something current and on-brand while the full build is finished.
- **`site-redesign` — the real site, not deployed.** Home + `about` + `thank-you` + `privacy`, rebuilt `styles.css`, mobile nav, self-hosted photography, OG card, JSON-LD/robots/sitemap, `vercel.json`, contact form with phone + intent.

**Do not push `site-redesign` to `main` until Kyle signs off.** Pushing `main` auto-deploys.

Verified previously: the contact form’s Supabase leg works (4 rows in `website_contact_submissions`, RLS scoped to `anon` INSERT only). The **Resend email leg is still unconfirmed** — storage and mail are separate paths and mail failures are swallowed by design.

Open items:
- Kyle to supply a headshot (`assets/photos/kyle.jpg`, 4:5) and rewrite the draft founder bio in `about.html` in his own words. The draft is mine, built only from the Project Keldrin docs, with a marked gap for professional background.
- Confirm whether the operators/lenders/partners relationships are real today — About currently describes the *roles*, not a roster.
- Work phone number not yet obtained; `index.html` has a marked insertion point.
- Booking link (Cal.com or similar) not yet created.
- `db/001_add_phone_intent.sql` has **not** been run against Supabase. The API degrades gracefully without it.

## Verification before calling something done

Preview locally (a simple static server + a real browser, or Playwright) before pushing — this site has a `prefers-reduced-motion`-gated scroll/reveal animation system (`script.js` + `styles.css`) that's easy to break silently. Check both desktop and phone widths (~390px, ~360px).

## Git access

**Committing is fine; pushing is not, until Kyle says the redesign is signed off** (see Current state above — a push to `main` auto-deploys to the live site). Work on `site-redesign`.

You have real git credentials on Kyle's machine, no device-bridge relay needed. Git Credential Manager (bundled with Git for Windows) handles GitHub auth via a browser sign-in on first push; Kyle doesn't need a separate GitHub password for this even though he normally signs into github.com via Google.
