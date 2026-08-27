# keldrinco-website — context for Claude Code

This is the public marketing site for Keldrin LLC (keldrin.co), Kyle Hoppmann's business-acquisitions company. Full project background lives in `docs/project-keldrin/` in this repo — a mirrored copy of the Project Keldrin knowledge base that also lives in a Claude.ai Project. Read `docs/project-keldrin/00 - Project Keldrin Overview.md` first for company context, then `docs/project-keldrin/09 - Website.md` for everything about this specific site.

**This mirror can go stale.** It's refreshed from Cowork sessions when decisions get made there, but if something here looks inconsistent with the live site or you're about to make a call that depends on current state, say so and ask Kyle rather than assuming the mirror is current.

## Stack

Static HTML/CSS/JS plus one `/api/contact.js` serverless function. Deployed on Vercel, auto-deploys on push to `main`. Live at keldrin.co (DNS on GoDaddy, apex domain canonical). Backend: Supabase (shared project with keldrin-os) for contact-form storage; Resend for the notification email via custom SMTP.

## Brand rules (do not cross these with Keldrin OS)

- **Palette:** charcoal (`#2C3441`) + gold (`#E6BD69`), locked. This is the ONLY place gold appears in Keldrin. Keldrin OS (the separate internal app, different repo) uses a completely different cyan/blue/purple/pink palette with no gold — the two are deliberately never meant to converge. See `docs/project-keldrin/02 - Company Naming.md` and `13 - Logo Specific.md`.
- **Typography:** Plus Jakarta Sans (headings), Inter (body), JetBrains Mono (eyebrows/buttons/labels).
- **Copy tone:** no fund/portfolio/completed-deal claims Kyle hasn't supplied evidence for; no "we buy businesses" framing — lead with listening. Avoid defensive/negation phrasing ("not a pitch, not a script") — state things positively. Full guardrails in `docs/project-keldrin/00 - Project Keldrin Overview.md`.
- **No people/team/handshake stock photography** — implies a team or office that doesn't exist yet. Abstract/architectural photography only (currently 3 Unsplash images, hotlinked by CDN URL, not committed as binaries).
- **Logo:** current K-mark geometry is final, not a placeholder (locked Aug 26, 2026). See `docs/project-keldrin/13 - Logo Specific.md` for the full asset registry and where each exported file is meant to be used.

## Current state (as of Aug 27, 2026)

Stable and considered "done for now" by Kyle — not the active build focus (that's `keldrin-os`, the sibling repo at `C:\GitHub\keldrin-os`). Deployment, DNS, contact form (Supabase storage + Resend notification), and scroll motion/photography are all live in production.

Known loose ends:
- `preview-hero-options.html` is a leftover throwaway comparison tool sitting untracked in the repo root — safe to delete.
- Kyle should confirm the contact form's live end-to-end test (a real submission landing in Supabase + triggering the Resend notification email) actually worked.

## Verification before calling something done

Preview locally (a simple static server + a real browser, or Playwright) before pushing — this site has a `prefers-reduced-motion`-gated scroll/reveal animation system (`script.js` + `styles.css`) that's easy to break silently. Check both desktop and phone widths (~390px, ~360px).
