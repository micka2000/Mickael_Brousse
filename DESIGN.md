# Mickaël Brousse — Design System

The portfolio follows the "Mickaël Brousse Design System" generated via Claude
Design (paper background, blue/olive/sky brand, Bricolage Grotesque + DM Sans).
Source of truth: `:root` in `styles.css`. This file documents the *why* so the
system stays coherent over time.

## North star

A senior data-governance professional's portfolio that reads as **considered, not
templated**. The default failure mode for portfolios is "AI-generated SaaS
landing page." This system fights that by leaning on:
- One serious display typeface (Bricolage Grotesque), one clean body (DM Sans),
  one mono accent (JetBrains Mono — used sparingly for labels/eyebrows).
- A paper background instead of pure white — warmer, less sterile.
- Three brand colors (blue, olive, sky) used with restraint: blue is the only
  primary action color; olive and sky are atmospheric accents (decorative blocks
  behind the portrait, sector tones, success state).
- Typographic hierarchy doing the work — minimal decorative iconography.

## Color tokens

| Token | Value | Use |
|---|---|---|
| `--color-blue` | `#003FA3` | Primary brand, CTAs, accent dot, focus rings, "Expert" tag, Banking sector |
| `--color-blue-tint` | `#D6E2F7` | Soft backgrounds (info-card icon bg) |
| `--color-olive` | `#C1C182` | Decorative block (portrait), success state border, "Industry" hover |
| `--color-olive-dark` | `#9A9A52` | "Advanced" tag, Industry sector tone |
| `--color-sky` | `#B1C3E6` | Decorative block (portrait), Internship sector |
| `--color-paper` | `#F5F3EE` | Page background (light) |
| `--color-ink` | `#0F0F0F` | Body text |

Sector tones (`--banking`, `--industry`, `--internship`) map to blue / olive-dark
/ sky-dark — used only on timeline badges. Don't introduce a 4th sector color.

Dark mode swaps backgrounds + uses `--color-sky` as the accent (blue is too
saturated against ink). Both themes share the same brand palette; only the
semantic mappings change.

## Typography

| Family | Weights | Use |
|---|---|---|
| Bricolage Grotesque | 400, 600, 700, 800 | Display: `h1`–`h3`, hero name, contact-card-value |
| DM Sans | 300, 400, 500, 600 | Body, paragraphs, list items, form fields |
| JetBrains Mono | 400, 500, 600 | Eyebrows, labels, skill levels, contact-card-label, monospace addresses |

Hero name uses Bricolage Grotesque 800. Body sits at 16px / line-height 1.65.
The mono is intentional — it signals "data professional" without saying it.

## Spacing & radii

Implicit scale (rem): 0.4, 0.5, 0.7, 0.85, 1, 1.25, 1.5, 2, 2.5. Don't
introduce new values mid-component — pick the closest existing one.

Radii: `--radius-sm` (4px) for chips/icon backgrounds, `--radius-md` (8px) for
cards, `--radius-lg` (16px) for hero portrait container, `--radius-pill` for
tags and the copy address.

## Component vocabulary

| Pattern | When to use |
|---|---|
| `.timeline-item` | Chronological items (experience). Don't reuse for non-temporal lists. |
| `.skill-row` | Flat list with right-aligned level/value. Replaces former `.skill-bar`. |
| `.soft-tag` / `.tool-tag` | Inline pills for finite enumerations (skills, tools). Logo + label for tools. |
| `.info-card` | Compact icon + label + sub-label. Reserved for the About sidebar. |
| `.contact-card` | Label + value pair. Typography-first, no icon. |
| `.section-tag` | "01 / Profile" eyebrow above each section heading. |
| `.btn-primary` / `.btn-outline` | Only two button styles. Magnetic effect via `.magnetic`. |
| `.lang-toggle` | EN / FR switch. Single instance, top-right of nav. |

## What NOT to do

- **No icon-in-circle decorations.** Icons are reserved for: navigation social
  links, form action buttons, education card avatars, info-card avatars in the
  About sidebar. Anywhere else, kill the icon and let typography work.
- **No fake percentage skill bars.** "Expert" / "Advanced" badges only —
  arbitrary 87%-vs-92% reads as AI slop, not as expertise.
- **No fourth brand color.** If a new accent is needed, reach for `--color-sky`
  or `--color-olive`. Adding a 4th breaks the calm palette.
- **No symmetrical 4-card grids of icon + title + description.** That pattern
  was removed (former "Data & AI" block) precisely because it screamed template.
- **No emojis as design elements.** Use SVG icons where icons are warranted.
- **No `text-align: center` on dense content.** Center is reserved for
  section headers and the contact pitch column.

## Interaction patterns

- **Magnetic buttons** (`.magnetic`) — subtle pull on mousemove, snap back on
  leave. Reserved for the two hero CTAs.
- **Typed hero title** — types out the role in the configured language.
  Has a static fallback text inside the `<span>` for no-JS / SEO.
- **In-view animations** via Motion — opacity + small y/x translation, never
  scale-pop or rotate. Threshold: `amount: 0.15`–`0.25`.
- **Lang toggle** persists to `localStorage` under `mb_lang`, default `en`.
  All translatable strings live in `script.js` `I18N` map. New strings: add to
  both `en` and `fr` blocks, mark in HTML with `data-i18n`, `data-i18n-html`,
  or `data-i18n-attr`.
- **Form validation** is honest: client-side only, mailto handoff with
  copy-to-clipboard fallback. Never claim delivery succeeded — the form says
  "I tried to open your mail client."

## Accessibility minimums

- Body text never below 16px, contrast ≥ 4.5:1 against `--bg`.
- Form labels are visible (not placeholder-as-label). Errors use `aria-describedby`.
- Touch targets ≥ 44px on mobile (nav links, lang toggle, contact cards).
- `prefers-reduced-motion` should disable typed cursor + dot-pulse + magnetic
  effects (TODO — not yet wired).

## Adding a new section

1. Use `.section-header` with `.section-tag` ("06 / X") + `<h2>`.
2. Wrap in `.container`. Pick *one* layout: full-width grid, two-column with
   sidebar, or vertical timeline. Don't invent a fourth.
3. Reuse existing patterns above. If you need a new component, ask whether it
   really differs from `.info-card`, `.skill-row`, or `.contact-card` — usually
   it doesn't.
4. Add i18n keys for every visible string (en + fr).
5. Update this file's component vocabulary table.
