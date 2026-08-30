# keldrinco-website — context for Claude Code

This is the public marketing site for Keldrin LLC (keldrin.co), Kyle Hoppmann's business-acquisitions company. Full project background lives in `docs/project-keldrin/` in this repo — a mirrored copy of the Project Keldrin knowledge base that also lives in a Claude.ai Project. Read `docs/project-keldrin/00 - Project Keldrin Overview.md` first for company context, then `docs/project-keldrin/09 - Website.md` for everything about this specific site.

**This mirror can go stale.** It's refreshed from Cowork sessions when decisions get made there, but if something here looks inconsistent with the live site or you're about to make a call that depends on current state, say so and ask Kyle rather than assuming the mirror is current.

## STOP — scope boundary (added Aug 29, 2026)

**This session works on the website only. Do not touch `C:\GitHub\keldrin-os`.** That project is deliberately paused while Kyle works on business foundations (LLC, business banking, business credit, buy box). It is not abandoned, it is not stale, and it does not need help.

Two specific ways a well-meaning session can do real damage here:

1. **Do not sync the doc mirror backwards.** `docs/project-keldrin/` exists in *both* repos, and the copies have diverged. As of Aug 29, this repo's `11 - Keldrin OS Build.md` is **174 lines behind** the `keldrin-os` copy — it predates a whole Google OAuth build and the note recording why the app is paused. **The `keldrin-os` copy is authoritative for anything Keldrin OS.** If these files need reconciling, changes flow *from* `keldrin-os` *to* here, never the reverse, and only when Kyle asks. Copying this repo's copy over the other one destroys real work.
2. **Do not carry the palette across.** Charcoal + gold is this site. Keldrin OS is slate-graphite + teal. They are separate identities on purpose — see the brand rules below.

There is also **uncommitted work in this repo from Aug 28** (edits to four files under `docs/project-keldrin/`, left over from a Cowork session). Review it with Kyle and decide whether to keep or discard it *before* starting anything new — don't blanket-discard it, and don't assume it was yours.

## Stack

Static HTML/CSS/JS plus one `/api/contact.js` serverless function. Deployed on Vercel, auto-deploys on push to `main`. Live at keldrin.co (DNS on GoDaddy, apex domain canonical). Backend: Supabase (shared project with keldrin-os) for contact-form storage; Resend for the notification email via custom SMTP.

## Brand rules (do not cross these with Keldrin OS)

- **Palette:** charcoal (`#2C3441`) + gold (`#E6BD69`), locked. This is the ONLY place gold appears in Keldrin. Keldrin OS (the separate internal app, different repo) uses a completely different palette with no gold — slate-graphite surfaces with teal as the single lead accent, settled Aug 29, 2026 (this previously read "cyan/blue/purple/pink", which was the older gradient system; that system and pink specifically were retired). The two identities are deliberately never meant to converge. See `docs/project-keldrin/02 - Company Naming.md` and `13 - Logo Specific.md`.
- **Typography:** Plus Jakarta Sans (headings), Inter (body), JetBrains Mono (eyebrows/buttons/labels).
- **Copy tone:** no fund/portfolio/completed-deal claims Kyle hasn't supplied evidence for; no "we buy businesses" framing — lead with listening. Avoid defensive/negation phrasing ("not a pitch, not a script") — state things positively. Full guardrails in `docs/project-keldrin/00 - Project Keldrin Overview.md`.
- **No people/team/handshake stock photography** — implies a team or office that doesn't exist yet. Abstract/architectural photography only (currently 3 Unsplash images, hotlinked by CDN URL, not committed as binaries).
- **Logo:** current K-mark geometry is final, not a placeholder (locked Aug 26, 2026). See `docs/project-keldrin/13 - Logo Specific.md` for the full asset registry and where each exported file is meant to be used.

## Current state (as of Aug 28, 2026)

Stable and considered "done for now" by Kyle — not the active build focus (that's `keldrin-os`, the sibling repo at `C:\GitHub\keldrin-os`, where Claude Code is now doing primary development). Deployment, DNS, contact form (Supabase storage + Resend notification), and scroll motion/photography are all live in production.

Known loose ends:
- `preview-hero-options.html` is a leftover throwaway comparison tool sitting untracked in the repo root — safe to delete.
- Kyle should confirm the contact form's live end-to-end test (a real submission landing in Supabase + triggering the Resend notification email) actually worked.

## Verification before calling something done

Preview locally (a simple static server + a real browser, or Playwright) before pushing — this site has a `prefers-reduced-motion`-gated scroll/reveal animation system (`script.js` + `styles.css`) that's easy to break silently. Check both desktop and phone widths (~390px, ~360px).

## Git access

You have real git credentials on Kyle's machine now — commit and push directly, no device-bridge relay needed. Git Credential Manager (bundled with Git for Windows) handles GitHub auth via a browser sign-in on first push; Kyle doesn't need a separate GitHub password for this even though he normally signs into github.com via Google.
