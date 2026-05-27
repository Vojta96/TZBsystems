# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing website for **TZBsystem s.r.o.**, a Czech BIM/TZB engineering studio. The site is a single-page design in Czech targeting building services professionals.

## Deployment

Hosted on **Firebase Hosting** (project: `tzbsystems`).

```bash
firebase deploy          # deploy to production
firebase serve           # local preview server (port 5000)
firebase deploy --only hosting  # hosting only
```

No build step — the `public/` directory is deployed directly.

## Architecture

The current (`newlook-2`) branch consolidates the site into a single file:

- **[public/index.html](public/index.html)** — entire site: all CSS is inlined in `<style>`, all JS is inlined in `<script>` at the bottom. Sections in order: Header → Hero → Revit/BIM → Profese → Reference → Nábor (hiring) → Kontakt → Footer.
- **[public/img/](public/img/)** — images in `.webp` and `.avif` formats; cache-busted via Firebase headers (1-year immutable).

Legacy files (`public/js/main.js`, `public/js/sendEmail.js`, `public/js/routing.js`) are from the old multi-page version and are no longer wired up in `index.html`.

## Design System (CSS tokens in `:root`)

| Token | Value | Use |
|---|---|---|
| `--navy` / `--sky` | `#0D3B66` | Primary brand color |
| `--sky-l` | `#3B82F6` | Accent / hover |
| `--sky-d` | `#0A2D52` | Dark variant |
| `--bg` | `#F8FAFC` | Page background |
| `--glass` | `rgba(255,255,255,.72)` | Glassmorphism cards |
| `--gap` | `clamp(80px,10vw,130px)` | Section vertical padding |

Glassmorphism cards use the `.glass` utility class. Scroll-reveal uses `data-r` (single element) and `data-s` (staggered children) attributes toggled by an `IntersectionObserver`.

## Inline JS (index.html)

Four small behaviors, all at bottom of `<body>`:
1. **Header scroll** — adds class `.s` when `scrollY > 50` for the frosted glass effect.
2. **Mobile nav** — burger button toggles `.mob-nav.open`.
3. **Scroll reveal** — `IntersectionObserver` adds `.on` to `[data-r]` and `[data-s]` elements.
4. **Form UX** — `doForm()` fakes a 1.3 s submit delay then shows a toast. Forms are **not wired to a backend** — real email sending needs to be implemented (EmailJS credentials exist in `public/js/sendEmail.js` from the old version).

## Firebase Rewrites

`firebase.json` maps clean URLs to old `.html` pages (`/projektovani`, `/dotace`, `/aplikace`, `/kariera`). These pages no longer exist in the current branch but the rewrites are still configured.

## Testing / Screenshots

Playwright is installed (`package.json`) and used for visual testing:

```bash
npm install              # install playwright
npx playwright test      # run tests (if any test files exist)
```
