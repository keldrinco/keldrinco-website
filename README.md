# Keldrin Landing Page

A lightweight static landing page for **keldrin.co**. No framework, build step, or dependencies are required.

## Files

- `index.html` — page structure and copy
- `styles.css` — responsive styling
- `script.js` — current year in the footer
- `assets/favicon.svg` — browser icon
- `CNAME` — tells GitHub Pages to use `keldrin.co`

## Before publishing

Search the files for these placeholders and confirm they are correct:

- `hello@keldrin.co`
- `Keldrin LLC`
- `https://keldrin.co/`

The stylized K is currently an inline SVG placeholder based on the brand direction. Replace its `<path>` in both `index.html` and `assets/favicon.svg` once the final Illustrator logo is exported.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload all files from this folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. In **Settings → Pages → Custom domain**, enter `keldrin.co`.
7. After DNS resolves, enable **Enforce HTTPS**.

## GoDaddy DNS

In GoDaddy's DNS manager, remove records that still send the domain to the old website before adding the GitHub Pages records.

For the apex domain (`keldrin.co`), GitHub currently documents these four `A` records:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

For `www`, add:

| Type | Name | Value |
|---|---|---|
| CNAME | www | `YOUR-GITHUB-USERNAME.github.io` |

Replace `YOUR-GITHUB-USERNAME` with the actual account name.

DNS changes can take time to propagate. Keep the `CNAME` file in the repository root.
