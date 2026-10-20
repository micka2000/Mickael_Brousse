# TODOS

Open work surfaced during the design review on 2026-04-28.

## 1. ~~Wire up real form delivery~~ (done 2026-10-20)

Shipped with FormSubmit (`contact-send.js`, tests in `tests/`). No address
or phone number is published on the site.

## 2. Dedicated favicon set (32×32 + 180×180)

**What:** Generate proper favicon and apple-touch-icon assets from a
square-cropped portrait or a monogram (MB.) instead of serving the full hero
portrait.png as the favicon.

**Why:** The hero portrait at 32×32 is mushy — recognizable as a person, not as
a brand. Also: serving a ~hundreds-of-KB PNG just to render a 32×32 tab icon
is wasteful, especially on mobile.

**Pros:** Crisp tab identity, lower bytes, future-proof for bookmark/PWA icons.

**Cons:** ~10 min in any image tool. Need to decide: portrait crop (personal)
or monogram MB. (brand).

**Estimate:** 15 min including export at 16/32/180/512 px sizes.

## 3. RF Dewi Ultrabold @font-face (if licensed)

**What:** Self-host RF Dewi Ultrabold (.woff2) and add @font-face declarations
so the display typeface matches the original Claude Design bundle exactly.

**Why:** Currently substituted by Bricolage Grotesque 800 from Google Fonts —
visually close, intentionally chosen by the design system as the substitute,
but RF Dewi is the "real" thing.

**Pros:** Pixel-perfect match to source design.

**Cons:** Requires owning the RF Dewi license. Bricolage substitution is good
enough that this is taste, not necessity.

## 4. Document `aria-label="Phone France"` parity

**What:** The hero social row only has Email + Canada phone + LinkedIn. The
French phone exists in the contact-grid below but not as a hero shortcut. If
that's intentional (Toronto-first audience), document it. If not, add it.

**Why:** Asymmetry that may confuse — the contact section advertises both
phone numbers as equal, but the hero promotes only Canada.

**Estimate:** 1 minute decision, 1 minute to add if needed.

## 5. (Optional) Replace `currentLang` global with module-scoped state

**What:** `let currentLang = ...` at the top of script.js is technically global
in the module scope but used by closures all over. Could move I18N + applyLang
+ runTyping into a small `i18n.js` module.

**Why:** The script.js file is at ~480 lines and growing. A second translation
pair (es, de) would tip it past readability.

**Cons:** Premature unless a third language is added.
