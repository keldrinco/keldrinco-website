# keldrin.co

The public site for **Keldrin LLC**. Static HTML with one serverless function. No framework, no build step.

## What is on `main` right now

`main` is the **live branch** and currently serves a deliberate **placeholder homepage** — a single screen carrying the logo, the positioning line, a direct contact route, and the company's entity/location/stage facts. It is intentionally self-contained: all CSS is inline in `index.html`, so it has no dependency on a stylesheet that is still being rebuilt.

It is a placeholder, not an unfinished page. The full site — home, `/about`, `/thank-you`, `/privacy`, a rebuilt design system, and a contact form — lives on the **`site-redesign`** branch and is not deployed yet.

## Files

| Path | Purpose |
|---|---|
| `index.html` | The placeholder page, styles included |
| `assets/logo/` | K-mark in its several forms — see `CLAUDE.md` for which to use where |
| `assets/photos/` | Self-hosted photography as AVIF/WebP/JPEG derivatives |
| `assets/og-cover.jpg` | Share card used by the OG and Twitter meta tags |
| `api/contact.js` | Contact-form handler. Dormant while the placeholder is up — nothing posts to it |
| `vercel.json` | Clean URLs, asset caching, security headers |
| `robots.txt`, `sitemap.xml` | Crawler basics |
| `docs/project-keldrin/` | Mirrored copy of the Project Keldrin knowledge base |

## Local preview

Any static file server works. From the repo root:

```bash
npx serve .
```

## Deployment

Vercel, connected to `keldrinco/keldrinco-website` on GitHub, auto-deploying on push to `main`. GitHub is the source of truth; Vercel watches it. The apex domain `keldrin.co` is canonical and `www` 308-redirects to it.

**GitHub Pages is not in the serving path** — the old `CNAME` and `.nojekyll` files were removed when Vercel took over.

## Environment variables

Set on the Vercel project for Production and Preview. These matter again once the contact form is live:

| Variable | Purpose |
|---|---|
| `SUPABASE_URL` | Project holding the submissions table |
| `SUPABASE_ANON_KEY` | Server-side only; the table's RLS policy grants `anon` INSERT and nothing else |
| `RESEND_API_KEY` | Sends the notification and acknowledgement emails |
| `NOTIFY_FROM` | Verified `From` address, scoped to `send.keldrin.co` |
| `NOTIFY_EMAIL` | Where notifications land (defaults to `hopp@keldrin.co`) |

## Brand

Palette, typography, logo asset registry, and copy guardrails are in `CLAUDE.md`. Brand gold is `#E6BD69`; the charcoal-and-gold palette is deliberately separate from the Keldrin OS palette in the sibling repo.
