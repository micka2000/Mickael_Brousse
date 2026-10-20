# TODOS

## 1. `CATALOG_TOKEN` secret (private projects)

A fine-grained, read-only token (all repositories, default metadata permission)
stored as the `CATALOG_TOKEN` Actions secret lets the workflow check that
private projects still exist. Without it, curated private cards stay as they are.

## 2. (Optional) Split `script.js`

About 600 lines. If a third language is added, move `I18N` and `applyLang`
into an `i18n.js` module like `projects-data.js` and `contact-send.js`.
