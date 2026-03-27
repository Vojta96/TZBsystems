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

404s fall back to `404.html`.

### CSS Loading

`public/js/routing.js` dynamically injects page-specific stylesheets at runtime based on the current URL path. The shared base styles live in `public/css/global.css`.

### Email / Contact Forms

`public/js/sendEmail.js` handles form submissions via **EmailJS** (v4, loaded from CDN). The PHP fallback handler is at `public/php/send-mail.php`.

### Cookie Consent

`public/js/main.js` manages the cookie banner and stores user preferences in `localStorage`.

## Pages

| File | Route | Purpose |
|------|-------|---------|
| `index.html` | `/` | Homepage, services overview, contact form |
| `projektovani.html` | `/projektovani` | TZB design services detail |
| `dotace.html` | `/dotace` | NZÚ grants information |
| `kariera.html` | `/kariera` | Job listings |
| `aplikace.html` | `/aplikace` | Applications (placeholder) |
| `cookies.html` | `/cookies` | Cookie preferences |
| `obchodni-podminky.html` | — | Terms & conditions |

## Assets

Images use modern formats (WebP, AVIF) for performance. Cache headers in `firebase.json`:
- `/img/**` — 1 year immutable
- `/css/**`, `/js/**` — 30 days

Reference/portfolio images go in `public/img/references/`.

## Language

All content is in Czech (cs-CZ). Keep new content in Czech.
