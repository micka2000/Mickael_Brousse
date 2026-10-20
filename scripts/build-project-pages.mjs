// Builds one static presentation page per project:
//   data/pages/<slug>.json  ->  projects/<slug>/index.html
// Both languages are in the HTML (data-l="en|fr"); CSS shows the active one,
// so the page needs no translation table and stays readable without JS.
//
// Usage: node scripts/build-project-pages.mjs

import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';

const root = new URL('..', import.meta.url);
const SITE = 'https://micka2000.github.io/Mickael_Brousse/';
const V = 12; // asset version, keep in step with index.html

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// bilingual text; `rich` keeps the authored inline HTML (strong, code)
const L = (o, rich = false) => typeof o === 'string'
  ? (rich ? o : esc(o))
  : `<span data-l="en">${rich ? o.en : esc(o.en)}</span><span data-l="fr">${rich ? o.fr : esc(o.fr)}</span>`;

const UI = {
  back: { en: 'All projects', fr: 'Tous les projets' },
  private: { en: 'Private repository', fr: 'Dépôt privé' },
  privateNote: {
    en: 'The code is private. This page shows what the project does and how it works.',
    fr: 'Le code est privé. Cette page montre ce que fait le projet et comment il fonctionne.',
  },
  why: { en: 'Why', fr: 'Pourquoi' },
  whyTitle: { en: 'The starting point', fr: 'Le point de départ' },
  what: { en: 'What it is', fr: 'Ce que c’est' },
  whatTitle: { en: 'In short', fr: 'En bref' },
  how: { en: 'How it works', fr: 'Comment ça marche' },
  howTitle: { en: 'From source to screen', fr: 'De la source à l’écran' },
  gallery: { en: 'In pictures', fr: 'En images' },
  galleryTitle: { en: 'Screens', fr: 'Écrans' },
  takeaways: { en: 'Takeaways', fr: 'Bilan' },
  takeawaysTitle: { en: 'Where it stands', fr: 'Où il en est' },
  highlight: { en: 'What I like most', fr: 'Ce qui me plaît le plus' },
  status: { en: 'Status', fr: 'Statut' },
  next: { en: 'Next project', fr: 'Projet suivant' },
  demoData: { en: 'Screens use demo data only.', fr: 'Les écrans n’utilisent que des données de démonstration.' },
  themeDark: { en: 'Dark', fr: 'Sombre' },
};

function page(p, all) {
  const i = all.findIndex(x => x.slug === p.slug);
  const next = all.length > 1 ? all[(i + 1) % all.length] : null;
  const desc = p.tagline.en;
  const n = (k, label) => `<span class="section-tag">${k} / ${L(label)}</span>`;

  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(p.title)} — Mickaël Brousse</title>
  <meta name="description" content="${esc(desc)}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${esc(p.title)} — Mickaël Brousse" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:image" content="${SITE}${esc(p.hero.image)}" />
  <meta property="og:url" content="${SITE}projects/${esc(p.slug)}/" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" type="image/png" href="../../assets/portrait.png" />
  <script>
    (function () {
      var d = document.documentElement, t = null, l = null;
      try { t = localStorage.getItem('theme'); l = localStorage.getItem('lang'); } catch (e) {}
      if (!t) t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      d.setAttribute('data-theme', t);
      d.setAttribute('lang', l === 'fr' ? 'fr' : 'en');
    })();
  </script>
  <link rel="stylesheet" href="../../styles.css?v=${V}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
</head>
<body class="project-page">
  <nav id="navbar">
    <div class="nav-container">
      <a class="nav-logo" href="../../">MB<span class="dot">.</span></a>
      <a class="btn btn-text btn-sm pp-back" href="../../#projects"><span aria-hidden="true">←</span> ${L(UI.back)}</a>
      <div class="pp-nav-actions">
        <button class="btn btn-outline btn-sm lang-toggle" type="button" aria-label="Language">
          <span class="lang-opt" data-lang="en">EN</span><span class="lang-sep">/</span><span class="lang-opt" data-lang="fr">FR</span>
        </button>
        <button class="btn btn-ink btn-sm theme-toggle" type="button" aria-label="Theme">
          <span class="theme-toggle-icon" aria-hidden="true">◑</span>
        </button>
      </div>
    </div>
  </nav>

  <main>
    <header class="pp-hero container">
      <p class="hero-eyebrow">${L(p.type)} · ${p.year}${p.private ? ` · ${L(UI.private)}` : ''}</p>
      <h1 class="pp-title">${esc(p.title)}<span class="pp-dot">.</span></h1>
      <p class="pp-tagline">${L(p.tagline)}</p>
      <div class="project-tags pp-tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>
      ${p.private ? `<p class="pp-private-note">${L(UI.privateNote)}</p>` : ''}
      <figure class="pp-frame pp-hero-shot">
        <img src="../../${esc(p.hero.image)}" alt="${esc(p.hero.alt.en)}" width="1280" height="800" />
      </figure>
    </header>

    <section class="pp-section">
      <div class="container pp-grid">
        <div class="section-header">${n('01', UI.why)}<h2>${L(UI.whyTitle)}</h2></div>
        <blockquote class="pp-quote"><p>${L(p.why)}</p><cite>Mickaël Brousse</cite></blockquote>
      </div>
    </section>

    <section class="pp-section pp-section--inset">
      <div class="container pp-grid">
        <div class="section-header">${n('02', UI.what)}<h2>${L(UI.whatTitle)}</h2></div>
        <ul class="pp-list">${p.what.map(w => `<li>${L(w, true)}</li>`).join('')}</ul>
      </div>
    </section>

    <section class="pp-section">
      <div class="container">
        <div class="section-header">${n('03', UI.how)}<h2>${L(UI.howTitle)}</h2></div>
        <ol class="pp-flow">${p.flow.map((s, k) => `
          <li class="pp-step"><span class="pp-step-n">${String(k + 1).padStart(2, '0')}</span><strong>${L(s.title)}</strong><span>${L(s.text)}</span></li>`).join('')}
        </ol>
      </div>
    </section>

    <section class="pp-section pp-section--inset">
      <div class="container">
        <div class="section-header">${n('04', UI.gallery)}<h2>${L(UI.galleryTitle)}</h2></div>
        <div class="pp-gallery">${p.gallery.map(g => `
          <figure class="pp-shot"><div class="pp-frame"><img src="../../${esc(g.image)}" alt="${esc(g.caption.en)}" width="1280" height="800" loading="lazy" decoding="async" /></div><figcaption>${L(g.caption)}</figcaption></figure>`).join('')}
        </div>
        ${p.demoData ? `<p class="pp-footnote">${L(UI.demoData)}</p>` : ''}
      </div>
    </section>

    <section class="pp-section">
      <div class="container">
        <div class="section-header">${n('05', UI.takeaways)}<h2>${L(UI.takeawaysTitle)}</h2></div>
        <div class="pp-takeaways">
          <div class="pp-card pp-card--blue"><span class="pp-card-label">${L(UI.highlight)}</span><p>${L(p.highlight)}</p></div>
          <div class="pp-card pp-card--olive"><span class="pp-card-label">${L(UI.status)}</span><p>${L(p.status)}</p></div>
        </div>
      </div>
    </section>

    <nav class="pp-next container" aria-label="${esc(UI.next.en)}">
      <a class="btn btn-outline" href="../../#projects"><span aria-hidden="true">←</span> ${L(UI.back)}</a>
      ${next ? `<a class="btn btn-primary" href="../${esc(next.slug)}/">${L(UI.next)} : ${esc(next.title)} <span aria-hidden="true">→</span></a>` : ''}
    </nav>
  </main>

  <footer>
    <div class="container">
      <div class="footer-bottom">
        <p>© <span class="pp-year">${new Date().getFullYear()}</span> Mickaël Brousse</p>
        <p class="footer-place">TORONTO · CA</p>
      </div>
    </div>
  </footer>
  <script src="../../project-page.js?v=${V}" defer></script>
</body>
</html>
`;
}

const dir = new URL('data/pages/', root);
const files = (await readdir(dir)).filter(f => f.endsWith('.json')).sort();
const catalog = JSON.parse(await readFile(new URL('data/catalog.json', root), 'utf8'));
const pages = [];
for (const f of files) pages.push(JSON.parse(await readFile(new URL(f, dir), 'utf8')));
// same order as the catalog
pages.sort((a, b) => (catalog.projects[a.slug]?.order ?? 99) - (catalog.projects[b.slug]?.order ?? 99));

for (const p of pages) {
  const out = new URL(`projects/${p.slug}/`, root);
  await mkdir(out, { recursive: true });
  await writeFile(new URL('index.html', out), page(p, pages));
  console.log(`projects/${p.slug}/index.html`);
}
