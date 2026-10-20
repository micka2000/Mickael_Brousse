# TODOS

## 1. Push the catalog workflow

`.github/workflows/projects.yml` is ready locally but GitHub refuses it from a
token without the `workflow` scope. Run `gh auth refresh -h github.com -s workflow`,
then commit and push it. Until then `data/projects.json` is only refreshed by
running `node scripts/build-projects.mjs` by hand.

## 2. `CATALOG_TOKEN` secret (private projects)

A fine-grained, read-only token (all repositories, default metadata permission)
stored as the `CATALOG_TOKEN` Actions secret lets the workflow check that
private projects still exist. Without it, curated private cards stay as they are.

## 3. Dedicated favicon set

The hero `portrait.png` doubles as favicon and apple-touch-icon. A square
crop or an `MB.` monogram at 32/180/512 px would be sharper and lighter.

## 4. (Optional) Split `script.js`

About 600 lines. If a third language is added, move `I18N` and `applyLang`
into an `i18n.js` module like `projects-data.js` and `contact-send.js`.
