# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing website for **TZBsystems** (Ing. Vojtěch Procházka, OSVČ, IČO 07841221, Pardubice), a Czech BIM/TZB engineering studio. Czech-language site targeting building services professionals. Live at https://tzbsystems.cz.

Terminology: the plumbing profession is always called **„Zdravotně-technické instalace"** (abbreviated **ZTI** in tight UI) — never „Sanita" or „Zdravotní technika". The five professions are Vytápění, Vzduchotechnika, ZTI, Elektro, PENB (no MaR). Brand is always **TZBsystems** (with s).

## Deployment

Hosted on **Firebase Hosting** (project: `tzbsystems`).

```bash
firebase deploy          # deploy to production
firebase serve           # local preview server (port 5000)
firebase deploy --only hosting  # hosting only
```

No build step — the `public/` directory is deployed directly.

## Architecture

Multi-page static site (branch `newlook-2`):

- **[public/index.html](public/index.html)** — homepage: Header → Hero (arc of 5 professions) → Revit/BIM → Profese → Reference → Nábor → Kontakt → Footer.
- **Subpages** — `profese.html`, `reference.html`, `kariera.html`, `ochrana-osobnich-udaju.html`, `podminky-pouziti.html`, `404.html`; clean URLs via rewrites in `firebase.json`.
- **[public/css/style.css](public/css/style.css)** — all styles (shared by every page).
- **[public/js/app.js](public/js/app.js)** — shared JS: EmailJS init, header scroll, mobile nav, scroll reveal, toast, hero arc carousel, `doForm()`.
- **[public/img/](public/img/)** — images (`.webp`/`.avif`/`.jpg`); reference project photos live in `img/ref/`.
- **Self-hosted assets** — Inter fonts (`/fonts/`), Font Awesome (`/fa/`), EmailJS SDK (`/js/email.min.js`). No third-party CDN requests (GDPR); keep it that way.

Source materials for reference projects (PDFs, photos, notes) are in the repo-root `reference/` folder — **outside** `public/`, so they are not deployed.

## Design System (CSS tokens in `:root`)

| Token | Value | Use |
|---|---|---|
| `--navy` / `--sky` | `#0D3B66` | Primary brand color |
| `--sky-l` | `#3B82F6` | Accent / hover |
| `--sky-d` | `#0A2D52` | Dark variant |
| `--bg` | `#F8FAFC` | Page background |
| `--glass` | `rgba(255,255,255,.72)` | Glassmorphism cards |
| `--gap` | `clamp(80px,10vw,130px)` | Section vertical padding |

Glassmorphism cards use the `.glass` utility class. Scroll-reveal uses `data-r` (single element) and `data-s` (staggered children) attributes toggled by an `IntersectionObserver`. The mobile nav markup (`.mob-top`/`.mob-links`/`.mob-foot`) must stay identical across all pages.

## Forms (EmailJS — live)

Both forms (kontakt on index, přihláška on index + kariera) send real e-mail via EmailJS from `js/app.js`: service `service_85vcgzd`, template `template_y5hj9l4`, public key in `app.js`. Template fields: `user_name`, `user_email`, `message`, `phone`, `position`, `portfolio`, `form_type` (kontakt/kariera), `time`.

## Caching (firebase.json)

`/img/**`, `*.woff2` and `/fa/webfonts/**` are cached 1 year immutable — **renaming is required when changing such a file**. CSS (`/css/**`, `/fonts/*.css`, `/fa/css/**`) and `/js/**` are cached 30 days.

## Testing / Screenshots

Playwright is installed (`package.json`):

```bash
npm install              # install playwright
npx playwright test      # run tests (if any test files exist)
```

Form e2e test pattern: serve `public/` on localhost, fill the form, submit, assert `.toast.ok` appears (sends a real e-mail — mark it as a test).
