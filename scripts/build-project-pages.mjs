// Builds one static presentation page per project:
//   data/pages/<slug>.json  ->  projects/<slug>/index.html
// Both languages are in the HTML (data-l="en|fr"); CSS shows the active one,
// so the page needs no translation table and stays readable without JS.
//
// Usage: node scripts/build-project-pages.mjs

import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';

const root = new URL('..', import.meta.url);
const SITE = 'https://micka2000.github.io/Mickael_Brousse/';
const V = 20; // asset version, keep in step with index.html

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
  video: { en: 'In motion', fr: 'En vidéo' },
  videoNote: { en: '30 seconds, no sound. Demo data.', fr: '30 secondes, sans son. Données de démonstration.' },
  evolution: { en: 'Evolution', fr: 'Évolution' },
  evolutionTitle: { en: 'From V1 to V2', fr: 'De la V1 à la V2' },
  gallery: { en: 'In pictures', fr: 'En images' },
  galleryTitle: { en: 'Screens', fr: 'Écrans' },
  takeaways: { en: 'Takeaways', fr: 'Bilan' },
  takeawaysTitle: { en: 'Where it stands', fr: 'Où il en est' },
  highlight: { en: 'What I like most', fr: 'Ce qui me plaît le plus' },
  status: { en: 'Status', fr: 'Statut' },
  next: { en: 'Next project', fr: 'Projet suivant' },
  nextLabel: { en: 'Next project: ', fr: 'Projet suivant : ' },
  demoData: { en: 'Screens use demo data only.', fr: 'Les écrans n’utilisent que des données de démonstration.' },
  zoom: { en: 'Click a screen to see it full size.', fr: 'Cliquez sur un écran pour le voir en grand.' },
  ctaText: { en: 'The code is private. Want to know more?', fr: 'Le code est privé. Envie d’en savoir plus ?' },
  ctaBtn: { en: 'Let’s talk', fr: 'En parler' },
  langLabel: { en: 'Switch language', fr: 'Changer de langue' },
  themeLabel: { en: 'Switch theme', fr: 'Changer de thème' },
  privacy: { en: 'Privacy notice', fr: 'Confidentialité' },
};

// accessible text that follows the language (project-page.js swaps it)
const A = (attr, o) => `${attr}="${esc(o.en)}" data-${attr}-en="${esc(o.en)}" data-${attr}-fr="${esc(o.fr)}"`;

const REQUIRED = ['slug', 'title', 'tagline', 'why', 'hero'];

function shot(src, alt, eager = false) {
  return `<div class="pp-frame"><a class="pp-zoom" href="../../${esc(src)}"><img src="../../${esc(src)}" ${A('alt', alt)} width="1280" height="800"${eager ? '' : ' loading="lazy"'} decoding="async" /></a></div>`;
}

function page(p, all) {
  const i = all.findIndex(x => x.slug === p.slug);
  const next = all.length > 1 ? all[(i + 1) % all.length] : null;
  const desc = p.tagline.en;
  const og = p.og || p.hero.image;
  const ogJpg = /\.jpe?g$/i.test(og);

  // Sections are optional (except Why); numbers follow what is present.
  const sections = [];
  const add = (key, label, title, body, inset = false, wide = false) => sections.push({ key, label, title, body, inset, wide });

  if (p.video) {
    const v = l => `<video class="pp-video" data-l="${l}" controls playsinline preload="none" width="1440" height="900"
            poster="../../${esc(p.video[l].poster)}" aria-label="${esc(p.video[l].label)}">
            <source src="../../${esc(p.video[l].src)}" type="video/mp4" />
          </video>`;
    add('video', UI.video, UI.video,
      `<div class="pp-video-wrap">${v('en')}${v('fr')}</div>
        <p class="pp-footnote">${L(UI.videoNote)}</p>`, false, true);
  }
  add('why', UI.why, UI.whyTitle,
    `<blockquote class="pp-quote"><p>${L(p.why)}</p><cite>Mickaël Brousse</cite></blockquote>`, false, false);
  if (p.what?.length) add('what', UI.what, UI.whatTitle,
    `<ul class="pp-list">${p.what.map(w => `<li>${L(w, true)}</li>`).join('')}</ul>`, true, false);
  if (p.flow?.length) add('how', UI.how, UI.howTitle,
    `<ol class="pp-flow">${p.flow.map((s, k) => `
          <li class="pp-step"><span class="pp-step-n">${String(k + 1).padStart(2, '0')}</span><strong>${L(s.title)}</strong><span>${L(s.text)}</span></li>`).join('')}
        </ol>`, false, true);
  if (p.evolution) {
    const card = (v, tag) => `<div class="pp-evo-card pp-evo-card--${tag}">
            <span class="pp-card-label">${tag.toUpperCase()}</span>
            ${v.title ? `<strong class="pp-evo-title">${L(v.title)}</strong>` : ''}
            <ul class="pp-list">${v.points.map(x => `<li>${L(x, true)}</li>`).join('')}</ul>
          </div>`;
    add('evolution', UI.evolution, UI.evolutionTitle,
      `<div class="pp-evo">
          ${card(p.evolution.v1, 'v1')}
          <span class="pp-evo-arrow" aria-hidden="true">→</span>
          ${card(p.evolution.v2, 'v2')}
        </div>`, false, true);
  }
  const gallery = (p.gallery || []).filter(g => g.image !== p.hero.image);
  if (gallery.length) add('gallery', UI.gallery, UI.galleryTitle,
    `<div class="pp-gallery">${gallery.map(g => `
          <figure class="pp-shot">${shot(g.image, g.caption)}<figcaption>${L(g.caption)}</figcaption></figure>`).join('')}
        </div>
        <p class="pp-footnote">${L(UI.zoom)}${p.demoData ? ` ${L(UI.demoData)}` : ''}</p>`, true, true);
  if (p.highlight || p.status) add('takeaways', UI.takeaways, UI.takeawaysTitle,
    `<div class="pp-takeaways">
          ${p.highlight ? `<div class="pp-card pp-card--blue"><span class="pp-card-label">${L(UI.highlight)}</span><p>${L(p.highlight)}</p></div>` : ''}
          ${p.status ? `<div class="pp-card pp-card--olive"><span class="pp-card-label">${L(UI.status)}</span><p>${L(p.status)}</p></div>` : ''}
        </div>`, false, true);

  const body = sections.map((s, k) => {
    const head = `<div class="section-header"><h2>${L(s.title)}</h2></div>`;
    return `
    <section class="pp-section${s.inset ? ' pp-section--inset' : ''}" id="${s.key}">
      <div class="container${s.wide ? '' : ' pp-grid'}">
        ${head}
        ${s.body}
      </div>
    </section>`;
  }).join('\n');

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
  <meta property="og:image" content="${SITE}${esc(og)}" />${ogJpg ? `
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />` : ''}
  <meta property="og:image:alt" content="${esc(p.hero.alt.en)}" />
  <meta property="og:url" content="${SITE}projects/${esc(p.slug)}/" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" type="image/png" sizes="32x32" href="../../assets/icons/favicon-32.png" />
  <link rel="icon" type="image/png" sizes="48x48" href="../../assets/icons/favicon-48.png" />
  <link rel="icon" type="image/png" sizes="512x512" href="../../assets/icons/icon-512.png" />
  <link rel="apple-touch-icon" href="../../assets/icons/apple-touch-icon.png" />
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
        <button class="btn btn-outline btn-sm lang-toggle" type="button" ${A('aria-label', UI.langLabel)}>
          <span class="lang-opt" data-lang="en">EN</span><span class="lang-sep">/</span><span class="lang-opt" data-lang="fr">FR</span>
        </button>
        <button class="btn btn-ink btn-sm theme-toggle" type="button" ${A('aria-label', UI.themeLabel)}>
          <span class="theme-toggle-icon" aria-hidden="true">◑</span>
        </button>
      </div>
    </div>
  </nav>

  <main>
    <header class="pp-hero container">
      <p class="hero-eyebrow pp-meta">${L(p.type)} · ${p.year}${p.private ? ` · ${L(UI.private)}` : ''}</p>
      <h1 class="pp-title">${esc(p.title)}<span class="pp-dot">.</span></h1>
      <p class="pp-tagline">${L(p.tagline)}</p>
      <div class="project-tags pp-tags">${(p.tags || []).map(t => `<span>${esc(t)}</span>`).join('')}</div>
      ${p.private ? `<p class="pp-private-note">${L(UI.privateNote)}</p>` : ''}
      <figure class="pp-hero-shot">${shot(p.hero.image, p.hero.alt, true)}</figure>
    </header>
${body}

    <div class="container pp-end">
      ${p.private ? `<div class="pp-cta">
        <p>${L(UI.ctaText)}</p>
        <a class="btn btn-primary btn-lg" href="../../#contact">${L(UI.ctaBtn)} <span aria-hidden="true">→</span></a>
      </div>` : ''}
      <nav class="pp-next" ${A('aria-label', UI.next)}>
        <a class="btn btn-text" href="../../#projects"><span aria-hidden="true">←</span> ${L(UI.back)}</a>
        ${next ? `<a class="btn btn-outline" href="../${esc(next.slug)}/">${L(UI.nextLabel)}${esc(next.title)} <span aria-hidden="true">→</span></a>` : ''}
      </nav>
    </div>
  </main>

  <footer>
    <div class="container">
      <div class="footer-bottom">
        <p>© <span class="pp-year">${new Date().getFullYear()}</span> Mickaël Brousse</p>
        <p><a class="footer-privacy" href="../../privacy/">${L(UI.privacy)}</a> · Toronto, Canada</p>
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
for (const f of files) {
  const p = JSON.parse(await readFile(new URL(f, dir), 'utf8'));
  const missing = REQUIRED.filter(k => !p[k]);
  if (missing.length) throw new Error(`data/pages/${f}: missing ${missing.join(', ')}`);
  pages.push(p);
}
// same order as the catalog
pages.sort((a, b) => (catalog.projects[a.slug]?.order ?? 99) - (catalog.projects[b.slug]?.order ?? 99));

for (const p of pages) {
  const out = new URL(`projects/${p.slug}/`, root);
  await mkdir(out, { recursive: true });
  await writeFile(new URL('index.html', out), page(p, pages));
  console.log(`projects/${p.slug}/index.html`);
}
