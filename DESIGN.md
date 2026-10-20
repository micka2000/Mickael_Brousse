# Mickaël Brousse — Portfolio

Static site on GitHub Pages (`main` branch, repo root), built on the
"Mickaël Brousse Design System" from Claude Design. No build step.

## Files

| Path | Role |
|---|---|
| `index.html` | Single page: hero, projects, profile, experience, skills, education, contact |
| `styles.css` | Page styles. Imports the tokens, then adds aliases (`--bg`, `--accent`, `--accent-warm`) |
| `tokens/*.css` | Design tokens synced from the Claude Design project: colors, fonts, typography, spacing |
| `script.js` | I18N (EN/FR), theme toggle, animations (Motion), project catalog, contact form |
| `projects-data.js` | Pure merge logic for the project catalog (tested) |
| `contact-send.js` | Contact form validation and FormSubmit delivery (tested) |
| `data/catalog.json` | Curated project copy: titles, EN/FR summaries, tags, visuals, private allowlist |
| `data/projects.json` | Generated snapshot of repos that exist (`scripts/build-projects.mjs`) |
| `assets/` | Fonts (local variable TTF), portrait, `og.jpg` (home share preview 1200×630), `icons/` (MB. favicon 32/48/512, apple-touch 180), tool and school logos, project screenshots (WebP 960×600) |
| `tests/` | `node --test tests/*.test.mjs` |

Asset URLs carry `?v=N`. Bump it in `index.html`, `script.js` imports and the
`@import` lines of `styles.css` when those files change, so a deploy never
serves new HTML with an old script.

## Content rules

- The CV (`Mickael Brousse CV.docx`) is the source of truth for experience,
  figures and skills. Do not add claims, figures or feelings it does not state.
- No email address or phone number on the site. Contact goes through the form
  (FormSubmit alias), LinkedIn and GitHub. A test fails if one reappears.
- Every visible string has an EN and an FR key in `I18N`. French uses a
  non-breaking space before `:` and a narrow one before `? ! ;`.

## Project catalog

- Public repos come live from the GitHub API, so a new public repo appears and
  a deleted one disappears on the next page load.
- Private repos show only if listed in `data/catalog.json`, and only while
  `data/projects.json` still lists them (needs the `CATALOG_TOKEN` secret).
- "Live site" appears only for URLs the snapshot checked (HTTP 200).
- To feature a project: add an entry to `data/catalog.json` (order, title,
  type, tags, `summary.en` / `summary.fr`, optional `image`).

## Project pages

`projects/<slug>/index.html` is generated, do not edit it by hand:

1. Write `data/pages/<slug>.json`. Required: `slug`, `title`, `tagline`,
   `why`, `hero` (the build stops otherwise). Optional, in page order:
   `what` (bullets), `flow` (steps), `evolution` (`v1` / `v2`, each with an
   optional `title` and `points`), `gallery`, `highlight`, `status`, `og`,
   `demoData`. A missing section is left out and the numbers follow.
   "Why", "highlight", "status" and the evolution points are the owner's own
   words; the rest must be backed by the project's README or code.
2. Put screenshots in `assets/projects/<slug>/` as WebP (1280×800). Private
   projects are shot with demo data only. The hero image is not repeated in
   the gallery, so plan at least three other screens. Every screen links to
   its full-size file.
3. Add `og.jpg` (1200×630, cropped from the hero) and point `og` at it:
   LinkedIn does not reliably read WebP.
4. Add `"page": "projects/<slug>/"` to the project in `data/catalog.json`.
5. Run `node scripts/build-project-pages.mjs`.

Both languages live in the page (`data-l="en|fr"`); `alt` and `aria-label`
carry `data-*-en` / `data-*-fr` that `project-page.js` applies. Private
projects end with a "Let's talk" button to the contact form.

Evolution block: V1 card on `--bg-inset` (muted text), V2 card on
`--bg-accent-subtle`, an arrow between them (turned down on mobile).
Screenshots sit in a browser frame; while loading the frame shows
`--bg-inset`, in dark mode they are dimmed to 90 %.

## Design system in use

**Type ramp** (Bricolage Grotesque for display, Roboto for text, JetBrains Mono
for code only):

| Role | Spec |
|---|---|
| Hero name | Bricolage 800, `clamp(52px, 7vw, 104px)`, line-height 0.92, −0.03em |
| Section title | Bricolage 800, `clamp(36px, 4.5vw, 48px)`, 1, −0.03em, accent period via `::after` |
| Card titles | Bricolage 800, 22 / 18 / 16px, 1.2, −0.02em |
| Lead / body / small | Roboto 17 / 16 / 14px, line-height 1.65 |
| Role line (hero, project meta) | Roboto 600, 18px, `--fg-2`, sentence case |
| Label / meta | Roboto 600, 11px, caps, +0.08em |
| Card tag | Roboto 600, 10px, caps, +0.07em, pill |

**Buttons** (`.btn` + variant + size): `btn-primary` (filled blue), `btn-tonal`,
`btn-outline`, `btn-text`, `btn-ink` (neutral controls); `btn-sm` 32px, default
40px, `btn-lg` 48px; `btn-icon` for round icon buttons. Pill only. Hover changes
color and shadow; press scales to 0.97 with a ripple.

**Badges**: 11px caps pill. Sector badges use the three brand tones only
(Banking blue, Industry olive, Internship sky). `role-type` is the outline
badge; `skill-level` Expert is filled blue, Advanced is olive tint.

**Surfaces**: cards are separated by shadow, not borders (8px radius, 4px in
dark mode). No gradients. The Profile section is the one full-bleed blue block.

**Themes**: `data-theme="light|dark"` on `<html>`, set before paint from the
saved choice or the system preference. Dark mode uses sky as the accent.
Text selection is themed (sky in light, blue in dark).

**Touch**: under 768px the 32px nav buttons get a 44px hit area (transparent
border), the look does not change. The EN/FR button also switches with
Enter or Space.

## Don't

- No fourth brand color, no gradients, no emoji as design elements.
- No percentage skill bars; levels are badges, and only where the CV backs them.
- No mail-to or phone links.
- No kicker above section titles (no "01 / Projects", no tracked caps
  eyebrow): the Bricolage title with its accent period is the section marker.
  Olive-dark text on paper is below 4.5:1, never use it for small text.
