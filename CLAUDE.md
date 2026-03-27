# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML/CSS/JS website for TZBsystems — a Czech company providing TZB (building technology/HVAC) design services and grants consulting (NZÚ program). Deployed to Firebase Hosting.

## Deployment

```bash
# Deploy to Firebase Hosting
firebase deploy

# Deploy only hosting (not other Firebase services)
firebase deploy --only hosting

# Preview locally before deploying
firebase serve
```

Firebase project: `tzbsystems` (see `.firebaserc`)

## Architecture

**No build step** — raw HTML/CSS/JS files are served directly from `/public/`.

### URL Routing

Firebase rewrites clean URLs to HTML files (configured in `firebase.json`):
- `/projektovani` → `projektovani.html`
- `/dotace` → `dotace.html`
- `/kariera` → `kariera.html`
- `/aplikace` → `aplikace.html`

404s fall back to `404.html`. Subpages under `profese/` and `reference/` are accessed directly by path (no Firebase rewrites configured for them).

### CSS Loading

`public/js/routing.js` dynamically sets the `href` of a `<link id="page-style">` element based on `window.location.pathname.split('/').pop()`. This only works for root-level pages — it loads `css/<pagename>.css` (e.g. `css/dotace.css`). Subpages under `profese/` and `reference/` must include their stylesheets directly in their `<head>`.

Primary stylesheet is `public/css/main.css` (Apple-inspired design system with CSS custom properties: `--blue`, `--text`, `--text-2`, `--bg`, etc.). Shared base styles live in `public/css/global.css`. Page-specific overrides live in `public/css/<page>.css`.

### JavaScript Files

- `public/js/main.js` — cookie banner (`localStorage` key `cookiesAccepted`) + fade-in scroll animations for homepage sections
- `public/js/nav.js` — nav scroll opacity effect, mobile burger menu toggle, fade-in scroll animations for `.profession-card`, `.ref-card`, `.feature-card`, `.step`, `.benefit-card`
- `public/js/routing.js` — dynamic CSS injection (root pages only)
- `public/js/sendEmail.js` — EmailJS (v4, CDN) form submission; PHP fallback at `public/php/send-mail.php`

### Email / Contact Forms

`public/js/sendEmail.js` handles form submissions via **EmailJS** (v4, loaded from CDN). The PHP fallback handler is at `public/php/send-mail.php`.

## Pages

**Root pages:**

| File | Route | Purpose |
|------|-------|---------|
| `index.html` | `/` | Homepage, services overview, contact form |
| `projektovani.html` | `/projektovani` | TZB design services detail |
| `dotace.html` | `/dotace` | NZÚ grants information |
| `kariera.html` | `/kariera` | Job listings |
| `aplikace.html` | `/aplikace` | Applications (placeholder) |
| `cookies.html` | `/cookies` | Cookie preferences |
| `obchodni-podminky.html` | — | Terms & conditions |

**Profession subpages** (`public/profese/`): destova-voda, fotovoltaika, inteligentni, kanalizace, mereni-regulace, ochrana-bleskem, penb, silnoproud, slaboproud, vodovod, vytapeni-chlazeni, vzduchotechnika

**Reference subpages** (`public/reference/`): index (listing), administrativni-budova, bytovy-dum-pardubice, prumyslova-hala, rodinny-dum-chrudim

## Assets

Images use modern formats (WebP, AVIF) for performance. Cache headers in `firebase.json`:
- `/img/**` — 1 year immutable
- `/css/**`, `/js/**` — 30 days

Reference/portfolio images go in `public/img/references/`.

The `public/gemini/` directory contains AI-generated text drafts (`.txt` files) used as content reference — not served to users.

## Language

All content is in Czech (cs-CZ). Keep new content in Czech.
