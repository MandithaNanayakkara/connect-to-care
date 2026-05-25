# Connect To Care

Strategic platform website — institutional tone, four-page architecture.

## Stack

- React 19 + TypeScript
- Vite
- React Router

## Development

```bash
npm install
cp .env.example .env   # optional: analytics, Turnstile, site URL
npm run dev
```

## Pages

| Route      | Purpose |
| ---------- | ------- |
| `/`        | Home — hero, platform model, sectors, impact, partners, contact |
| `/about`   | Who CTC is, services, focus areas, leadership |
| `/impact`  | Case studies, project grid, newsletter |
| `/connect` | Partner inquiry form + contact details |

## Navigation

- **Home top:** Transparent nav over hero; white logo and links at 75% opacity
- **Scroll 60px+:** `rgba(10,37,64,0.97)` + `backdrop-filter: blur(8px)`; compressed height (0.4s)
- **Active link:** Full white vs 75% inactive
- **Partner With Us:** Teal CTA in nav → `/connect`; tracks `partner_cta_click`
- **Mobile:** Hamburger → full-screen navy overlay; Cormorant large links

## Content CMS (no developer)

Edit **`public/content/site.json`** to update hero copy and homepage stats without rebuilding logic. Redeploy or refresh after changes.

Extend this pattern with `caseStudies.json`, `partners.json`, etc. as needed.

## Environment variables

See `.env.example`:

| Variable | Purpose |
| -------- | ------- |
| `VITE_SITE_URL` | Canonical + Open Graph base URL |
| `VITE_PLAUSIBLE_DOMAIN` | Plausible analytics |
| `VITE_GA4_ID` | Google Analytics 4 (optional) |
| `VITE_TURNSTILE_SITE_KEY` | Cloudflare Turnstile on contact form |

## Forms

- Delivers to **info@connecttocare.co** via FormSubmit (activate email on first submit)
- Honeypot field always on
- Turnstile when `VITE_TURNSTILE_SITE_KEY` is set

## SEO & sharing

- Per-page title + meta description in `src/config/pageMeta.ts`
- Open Graph / Twitter cards via `PageMeta`
- Add **`public/og-image.jpg`** (1200×630) for LinkedIn link previews — `og-image.svg` is dev fallback only

## Analytics events

- `partner_cta_click` — nav + hero Partner With Us
- `outbound_click` — LinkedIn, Instagram, newsletter (footer + connect)

## Performance

- Google Fonts: Cormorant Garamond + DM Sans with `display=swap`
- Scroll animations: CSS fade-up + `IntersectionObserver` (`Reveal` component)
- Use `.webp` / `.avif` with `<picture>` fallbacks when adding hero photography (target LCP &lt; 2.5s)

## Build

```bash
npm run build
npm run preview
```

## Push to GitHub

Push **source code only** — not `dist/` or `node_modules/` (they are in `.gitignore`).

```bash
git add .
git commit -m "Describe your change"
git push origin main
```

Repo: [github.com/layer1-studio/Connect-To-Care](https://github.com/layer1-studio/Connect-To-Care)

## Host on GitHub Pages

1. In the repo: **Settings → Pages → Build and deployment → Source** → choose **GitHub Actions**.
2. Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/`.
3. Live URL: **https://layer1-studio.github.io/Connect-To-Care/**

| What you edit | What gets deployed |
| ------------- | ------------------ |
| `index.html` (project root) | Vite uses this as the template; built output is `dist/index.html` |
| `src/`, `public/` | Included in the build automatically |
| `dist/` locally | **Do not commit** — CI builds a fresh `dist/` on GitHub |

Local dev uses `http://localhost:5173/` (base `/`). Production uses base `/Connect-To-Care/`.
