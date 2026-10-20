import { animate, inView, stagger } from "https://esm.sh/framer-motion@11"
import { mergeProjects } from './projects-data.js?v=6';

const PRM = window.matchMedia('(prefers-reduced-motion: reduce)');
const prefersReducedMotion = () => PRM.matches;

/* ============================================================
   I18N — English (default) + French
   ============================================================ */
const I18N = {
  en: {
    'hero.eyebrow': 'Data Governance Analyst · Toronto', 'hero.scroll': 'Scroll ↓',
    'theme.to_dark': 'Dark', 'theme.to_light': 'Light', 'a11y.theme_toggle': 'Switch theme',
    'footer.tagline': 'Data governance, quality & compliance.', 'footer.eyebrow': 'Let\'s work together?',
    'nav.projects': 'Projects',
    'projects.tag': '01 / Projects', 'projects.title': 'Projects',
    'projects.intro': 'Everything I build on the side, pulled live from my GitHub.',
    'projects.filter_label': 'Filter projects', 'projects.all': 'All',
    'projects.view_code': 'Code', 'projects.view_live': 'Live site',
    'projects.private': 'Private', 'projects.private_note': 'Private repository · code not public',
    'projects.shot_alt': 'Screenshot of {title}', 'projects.updated': 'Updated', 'projects.all_github': 'All repositories on GitHub ↗',
    'projects.type_web': 'Web', 'projects.type_data': 'Data & Finance', 'projects.type_app': 'Apps & AI',
    'projects.type_design': 'Design', 'projects.type_lab': 'Lab',
    'meta.title': 'Mickaël Brousse — Data Governance Analyst',
    'nav.about': 'Profile', 'nav.experience': 'Experience', 'nav.skills': 'Skills',
    'nav.education': 'Education', 'nav.contact': 'Contact', 'nav.available': 'Available',
    'hero.badge': 'Available · Toronto, Canada',
    'hero.subtitle': '3 years of experience in <strong>banking</strong> &amp; <strong>manufacturing</strong> sectors<br />Expert in <strong>GDPR</strong>, <strong>data quality</strong> &amp; <strong>digital transformation</strong>',
    'hero.cta_primary': 'See my projects', 'hero.cta_secondary': 'Contact me',
    'hero.typed': 'Data Governance Analyst',
    'hero.stat_years': 'Years of experience', 'hero.stat_sectors': 'Sectors covered',
    'hero.stat_compliance': 'GDPR compliance',
    'about.tag': '02 / Profile', 'about.title': 'About me',
    'about.p1': 'Data Governance Analyst with over <strong>3 years of experience</strong> in <strong>banking</strong> (BNP Paribas Luxembourg) and <strong>manufacturing</strong> (Michelin). Specialized in building reliable, GDPR-compliant frameworks and optimizing processes to maximize the value of data.',
    'about.p2': 'My expertise sits at the intersection of <strong>data governance</strong>, <strong>quality</strong>, and <strong>regulatory compliance</strong>, with an international scope covering Europe and now the <strong>Canadian</strong> market.',
    'about.p3': 'Passionate about <strong>digital transformation</strong> and <strong>artificial intelligence</strong> applied to enterprise data, I aim to bring rigorous governance expertise while expanding into data engineering and responsible AI.',
    'about.hi_mobility': 'International mobility — Europe & Canada',
    'about.hi_lang': 'Native French · Professional English',
    'about.hi_avail': 'Open to opportunities — Available immediately',
    'about.card_master_t': 'Master', 'about.card_master_d': 'Strategic Management & Digital Transformation',
    'about.card_bnp_d': 'Data Governance Analyst — Luxembourg',
    'about.card_michelin_d': 'Business Analyst / Data Owner — France',
    'about.card_loc_t': 'Toronto, Canada', 'about.card_loc_d': 'Available immediately',
    'exp.tag': '03 / Experience', 'exp.title': 'Professional Journey',
    'exp.bnp_period': 'May 2024 — Nov 2025', 'exp.badge_banking': 'Banking',
    'exp.bnp_li1': 'Led the update of the <strong>Personal Data Processing Register</strong> to ensure GDPR compliance, in coordination with Legal and DPO teams.',
    'exp.bnp_li2': 'Built a <strong>Power BI dashboard</strong> to compare register data against risk assessments, tracking delivery velocity and consistency.',
    'exp.bnp_li3': 'Managed the <strong>SAS-BDN Data Dictionary</strong>: rule definition, semantic inconsistency resolution, and SQL investigation (Oracle).',
    'exp.bnp_li4': 'Presented data quality rules and strategic recommendations to the <strong>CDO</strong> in quarterly governance meetings.',
    'exp.tag_gdpr': 'GDPR',
    'exp.mich1_period': 'Sept 2022 — Aug 2023', 'exp.badge_industry': 'Industry',
    'exp.mich1_li1': 'Structured the <strong>Data Definition framework</strong> for the Manufacturing division, establishing clear standards for Michelin plants worldwide.',
    'exp.mich1_li2': 'Managed data asset documentation in <strong>Collibra</strong>, clarifying responsibilities between Data Owners and Stewards to improve data reliability.',
    'exp.mich1_li3': 'Strengthened <strong>workflows and processes</strong> to support the organization\'s global data governance initiatives.',
    'exp.tag_gov': 'Governance',
    'exp.mich2_period': 'Mar 2022 — Aug 2022', 'exp.badge_internship': 'Internship', 'exp.role_intern': 'Internship',
    'exp.mich2_li1': 'Collaborated with <strong>Engineering, R&amp;D and Supply Chain</strong> teams to align data understanding across the organization.',
    'exp.mich2_li2': 'Analyzed manufacturing data processes to identify <strong>inconsistencies</strong> and support the rollout of governance standards.',
    'exp.mich2_li3': 'Built foundational expertise in complex industrial data environments and <strong>cross-team coordination</strong>.',
    'exp.tag_data_analysis': 'Data Analysis', 'exp.tag_cross': 'Cross-functional',
    'skills.tag': '04 / Skills', 'skills.title': 'Stack & Expertise',
    'skills.cat_core': 'Core Expertise', 'skills.cat_tools': 'Tools & Technologies',
    'skills.cat_approach': 'Approach & Soft Skills',
    'skills.gov_quality': 'Data Governance & Quality', 'skills.gov_gdpr': 'GDPR & Compliance',
    'skills.gov_risk': 'Risk Assessment', 'skills.gov_meta': 'Metadata Management',
    'skills.lvl_expert': 'Expert', 'skills.lvl_advanced': 'Advanced',
    'skills.soft_pm': 'Project Management (PMO)', 'skills.soft_change': 'Change Management',
    'skills.soft_strategy': 'Strategic Thinking', 'skills.soft_stake': 'Stakeholder Management',
    'skills.soft_adequa': 'ADEQUA Method', 'skills.soft_collab': 'Cross-functional Collaboration',
    'skills.soft_problem': 'Problem Solving', 'skills.soft_gam': 'Gamification',
    'edu.tag': '05 / Education', 'edu.title': 'Education',
    'edu.master_t': 'Master — Strategic Management & Digital Transformation',
    'edu.master_link': 'About the program',
    'edu.master_d': 'Specialization in digital strategy, innovation management, and organizational transformation in the digital era.',
    'edu.lic_t': 'Double Bachelor — Economics and Management',
    'edu.lic_d': 'Dual training in economics and organizational management, with a quantitative and analytical approach.',
    'contact.tag': '06 / Contact', 'contact.title': "Let's Work Together",
    'contact.intro': "Available for opportunities in Canada and internationally.<br />Let's talk about your next data project.",
    'contact.eyebrow': 'Get in touch',
    'contact.headline': 'Let\'s talk<span class="ch-accent">?</span>',
    'contact.cta': 'Send a message', 'contact.cta_short': 'Send',
    'contact.f_name': 'Your name', 'contact.f_email': 'Email', 'contact.f_message': 'Message',
    'contact.f_name_ph': 'Jane Smith', 'contact.f_email_ph': 'you@company.com',
    'contact.f_message_ph': 'Tell me about your project…',
    'contact.success': 'I just tried to open your mail client with the message pre-filled.',
    'contact.success_fallback': 'Nothing happened? No mail app set up? Copy the address below and send it from wherever you write email.',
    'contact.copy': 'Copy', 'contact.copied': 'Copied',
    'a11y.skip': 'Skip to main content',
    'a11y.lang_toggle': 'Switch language',
    'a11y.menu': 'Menu',
    'a11y.social_email': 'Email',
    'a11y.social_phone_ca': 'Phone Canada',
    'a11y.copy_email': 'Copy email address',
    'hero.stat_countries': 'International markets',
    'footer.copy': '© <span id="footer-year">{year}</span> Mickaël Brousse',
    'contact.err_name': 'Please enter your name.',
    'contact.err_email': 'Please enter a valid email address.',
    'contact.err_message': 'Please write a short message (at least 10 characters).',
  },
  fr: {
    'hero.eyebrow': 'Data Governance Analyst · Toronto', 'hero.scroll': 'Défiler ↓',
    'theme.to_dark': 'Sombre', 'theme.to_light': 'Clair', 'a11y.theme_toggle': 'Changer de thème',
    'footer.tagline': 'Gouvernance, qualité et conformité des données.', 'footer.eyebrow': 'On travaille ensemble ?',
    'nav.projects': 'Projets',
    'projects.tag': '01 / Projets', 'projects.title': 'Projets',
    'projects.intro': 'Tout ce que je construis à côté, en direct depuis mon GitHub.',
    'projects.filter_label': 'Filtrer les projets', 'projects.all': 'Tout',
    'projects.view_code': 'Code', 'projects.view_live': 'Voir le site',
    'projects.private': 'Privé', 'projects.private_note': 'Dépôt privé · code non public',
    'projects.shot_alt': 'Capture d’écran de {title}', 'projects.updated': 'Mis à jour', 'projects.all_github': 'Tous les dépôts sur GitHub ↗',
    'projects.type_web': 'Web', 'projects.type_data': 'Data & Finance', 'projects.type_app': 'Apps & IA',
    'projects.type_design': 'Design', 'projects.type_lab': 'Labo',
    'meta.title': 'Mickaël Brousse — Data Governance Analyst',
    'nav.about': 'Profil', 'nav.experience': 'Expérience', 'nav.skills': 'Compétences',
    'nav.education': 'Formation', 'nav.contact': 'Contact', 'nav.available': 'Disponible',
    'hero.badge': 'Disponible · Toronto, Canada',
    'hero.subtitle': "3 ans d'expérience dans les secteurs <strong>bancaire</strong> &amp; <strong>manufacturier</strong><br />Expert <strong>RGPD</strong>, <strong>qualité des données</strong> &amp; <strong>transformation digitale</strong>",
    'hero.cta_primary': 'Voir mes projets', 'hero.cta_secondary': 'Me contacter',
    'hero.typed': 'Data Governance Analyst',
    'hero.stat_years': "Ans d'expérience", 'hero.stat_sectors': 'Secteurs couverts',
    'hero.stat_countries': 'Marchés internationaux', 'hero.stat_compliance': 'Conformité RGPD',
    'about.tag': '02 / Profil', 'about.title': 'À propos de moi',
    'about.p1': "Data Governance Analyst avec plus de <strong>3 ans d'expérience</strong> dans les secteurs <strong>bancaire</strong> (BNP Paribas Luxembourg) et <strong>manufacturier</strong> (Michelin). Spécialisé dans la construction de frameworks fiables et conformes au <strong>RGPD</strong>, ainsi que dans l'optimisation des processus pour maximiser la valeur des données.",
    'about.p2': "Mon expérience couvre l'intersection de la <strong>gouvernance des données</strong>, de la <strong>qualité</strong> et de la <strong>conformité réglementaire</strong>, avec une portée internationale couvrant l'Europe et désormais le marché <strong>canadien</strong>.",
    'about.p3': "Passionné par la <strong>transformation digitale</strong> et l'<strong>intelligence artificielle</strong> appliquée aux données d'entreprise, je cherche à apporter une expertise rigoureuse en gouvernance tout en développant des compétences en data engineering et IA responsable.",
    'about.hi_mobility': 'Mobilité internationale — Europe & Canada',
    'about.hi_lang': 'Français natif · Anglais professionnel',
    'about.hi_avail': 'Ouvert aux opportunités — Disponible immédiatement',
    'about.card_master_t': 'Master', 'about.card_master_d': 'Strategic Management & Digital Transformation',
    'about.card_bnp_d': 'Data Governance Analyst — Luxembourg',
    'about.card_michelin_d': 'Business Analyst / Data Owner — France',
    'about.card_loc_t': 'Toronto, Canada', 'about.card_loc_d': 'Disponible immédiatement',
    'exp.tag': '03 / Expérience', 'exp.title': 'Parcours Professionnel',
    'exp.bnp_period': 'Mai 2024 — Nov 2025', 'exp.badge_banking': 'Banque',
    'exp.bnp_li1': 'Pilotage de la mise à jour du <strong>Registre des Traitements de Données Personnelles</strong> pour assurer la conformité RGPD, en coordination avec les équipes Juridique et DPO.',
    'exp.bnp_li2': "Développement d'un <strong>dashboard Power BI</strong> pour comparer les données du registre avec les évaluations des risques, en suivant la vélocité de livraison et la cohérence.",
    'exp.bnp_li3': 'Gestion du <strong>Dictionnaire de Données SAS-BDN</strong> : définition des règles, résolution des incohérences sémantiques et investigation via SQL (Oracle).',
    'exp.bnp_li4': 'Présentation des règles de qualité des données et recommandations stratégiques au <strong>CDO</strong> lors des réunions trimestrielles de gouvernance.',
    'exp.tag_gdpr': 'RGPD',
    'exp.mich1_period': 'Sept 2022 — Août 2023', 'exp.badge_industry': 'Industrie',
    'exp.mich1_li1': 'Structuration du <strong>framework de Définition des Données</strong> pour la division Manufacturing, établissant des standards clairs pour les usines Michelin dans le monde entier.',
    'exp.mich1_li2': 'Gestion de la documentation des actifs de données dans <strong>Collibra</strong>, clarifiant les responsabilités entre Data Owners et Stewards pour améliorer la fiabilité des données.',
    'exp.mich1_li3': "Renforcement des <strong>workflows et processus</strong> pour soutenir les initiatives globales de gouvernance des données de l'organisation.",
    'exp.tag_gov': 'Gouvernance',
    'exp.mich2_period': 'Mars 2022 — Août 2022', 'exp.badge_internship': 'Stage', 'exp.role_intern': 'Stage',
    'exp.mich2_li1': "Collaboration avec les équipes <strong>Engineering, R&amp;D et Supply Chain</strong> pour aligner la compréhension des données au sein de l'organisation.",
    'exp.mich2_li2': 'Analyse des processus de données manufacturing pour identifier les <strong>incohérences</strong> et soutenir le déploiement des standards de gouvernance.',
    'exp.mich2_li3': 'Acquisition d\'une expertise fondamentale dans les environnements de données industriels complexes et la <strong>coordination inter-équipes</strong>.',
    'exp.tag_data_analysis': 'Analyse de données', 'exp.tag_cross': 'Cross-fonctionnel',
    'skills.tag': '04 / Compétences', 'skills.title': 'Stack & Expertises',
    'skills.cat_core': 'Expertise Cœur', 'skills.cat_tools': 'Outils & Technologies',
    'skills.cat_approach': 'Approche & Soft Skills',
    'skills.gov_quality': 'Data Governance & Quality', 'skills.gov_gdpr': 'RGPD & Conformité',
    'skills.gov_risk': 'Évaluation des Risques', 'skills.gov_meta': 'Gestion des Métadonnées',
    'skills.lvl_expert': 'Expert', 'skills.lvl_advanced': 'Avancé',
    'skills.soft_pm': 'Gestion de Projet (PMO)', 'skills.soft_change': 'Conduite du Changement',
    'skills.soft_strategy': 'Pensée Stratégique', 'skills.soft_stake': 'Gestion des Parties Prenantes',
    'skills.soft_adequa': 'Méthode ADEQUA', 'skills.soft_collab': 'Collaboration Transversale',
    'skills.soft_problem': 'Résolution de Problèmes', 'skills.soft_gam': 'Gamification',
    'edu.tag': '05 / Formation', 'edu.title': 'Éducation',
    'edu.master_t': 'Master — Strategic Management & Digital Transformation',
    'edu.master_link': 'Découvrir la formation',
    'edu.master_d': "Spécialisation en stratégie numérique, management de l'innovation et transformation des organisations à l'ère digitale.",
    'edu.lic_t': 'Double Licence — Économie et Management',
    'edu.lic_d': 'Double formation en sciences économiques et management des organisations, avec une approche quantitative et analytique.',
    'contact.tag': '06 / Contact', 'contact.title': 'Travaillons Ensemble',
    'contact.intro': "Disponible pour des opportunités au Canada et à l'international.<br />Parlons de votre prochain projet data.",
    'contact.eyebrow': 'Contact',
    'contact.headline': 'On parle <span class="ch-accent">?</span>',
    'contact.cta': 'Envoyer un message', 'contact.cta_short': 'Envoyer',
    'contact.f_name': 'Votre nom', 'contact.f_email': 'Email', 'contact.f_message': 'Message',
    'contact.f_name_ph': 'Jeanne Dupont', 'contact.f_email_ph': 'vous@entreprise.com',
    'contact.f_message_ph': 'Parlez-moi de votre projet…',
    'contact.success': 'J\'ai tenté d\'ouvrir votre client mail avec le message pré-rempli.',
    'contact.success_fallback': 'Rien ne s\'est passé ? Pas de client mail configuré ? Copiez l\'adresse ci-dessous et écrivez-moi depuis votre webmail habituel.',
    'contact.copy': 'Copier', 'contact.copied': 'Copié',
    'a11y.skip': 'Aller au contenu principal',
    'a11y.lang_toggle': 'Changer de langue',
    'a11y.menu': 'Menu',
    'a11y.social_email': 'Email',
    'a11y.social_phone_ca': 'Téléphone Canada',
    'a11y.copy_email': 'Copier l\'adresse email',
    'footer.copy': '© <span id="footer-year">{year}</span> Mickaël Brousse',
    'contact.err_name': 'Merci d\'indiquer votre nom.',
    'contact.err_email': 'Merci d\'indiquer une adresse email valide.',
    'contact.err_message': 'Merci d\'écrire un court message (10 caractères minimum).',
  },
};

let currentLang = localStorage.getItem('lang') || 'en';

function applyLang(lang) {
  currentLang = lang;
  const dict = I18N[lang] || I18N.en;
  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);
  const year = new Date().getFullYear();
  const subst = (s) => s.replace(/\{year\}/g, year);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] != null) el.textContent = subst(dict[key]);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key] != null) el.innerHTML = subst(dict[key]);
  });
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    el.getAttribute('data-i18n-attr').split(',').forEach(pair => {
      const [attr, key] = pair.trim().split(':');
      if (attr && key && dict[key] != null) el.setAttribute(attr, dict[key]);
    });
  });

  document.querySelectorAll('.lang-opt').forEach(el => {
    el.classList.toggle('active', el.dataset.lang === lang);
  });
}

document.addEventListener('click', e => {
  const opt = e.target.closest('.lang-opt');
  if (opt) applyLang(opt.dataset.lang);
});

applyLang(currentLang);


/* ---- Theme toggle (light / dark) ----
   Initial theme is set inline in <head> (saved choice, else system). */
function syncThemeToggle() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  const dict = I18N[currentLang] || I18N.en;
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.querySelector('.theme-toggle-icon').textContent = dark ? '☀' : '◑';
    const label = btn.querySelector('.theme-toggle-label');
    label.dataset.i18n = dark ? 'theme.to_light' : 'theme.to_dark';
    label.textContent = dict[label.dataset.i18n];
    btn.setAttribute('aria-pressed', String(dark));
  });
}
document.addEventListener('click', e => {
  if (e.target.closest('.theme-toggle')) {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch {}
    syncThemeToggle();
  }
  if (e.target.closest('.lang-opt')) syncThemeToggle();
});
syncThemeToggle();

// ---- Progress Bar ----
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  progressBar.style.transform = `scaleX(${Math.min(scrolled, 1)})`;
}, { passive: true });

// ---- Navbar scroll ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 110) current = s.id;
  });
  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
}, { passive: true });

// ---- Mobile Menu ----
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

function closeMobileMenu() {
  menuOpen = false;
  menuBtn.classList.remove('open');
  animate(mobileMenu, { opacity: 0, y: -8 }, { duration: 0.2, ease: 'easeIn' });
  setTimeout(() => mobileMenu.classList.remove('visible'), 220);
}

menuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  menuBtn.classList.toggle('open', menuOpen);
  if (menuOpen) {
    mobileMenu.classList.add('visible');
    animate(mobileMenu, { opacity: [0, 1], y: [-8, 0] }, { duration: 0.3, ease: [0.16, 1, 0.3, 1] });
  } else {
    closeMobileMenu();
  }
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', closeMobileMenu);
});

// ---- Hero Animations ----
// Staggered entrance with expo-out easing
const expo = [0.16, 1, 0.3, 1];

animate('.hero-eyebrow', { opacity: [0, 1], y: [12, 0] }, { duration: 0.55, delay: 0.1, ease: expo });

const nameWords = document.querySelectorAll('.name-word');
animate(nameWords[0], { opacity: [0, 1], y: [50, 0] }, { duration: 0.75, delay: 0.3, ease: expo });
animate(nameWords[1], { opacity: [0, 1], y: [50, 0] }, { duration: 0.75, delay: 0.48, ease: expo });

animate('.hero-subtitle', { opacity: [0, 1], y: [20, 0] }, { duration: 0.6, delay: 0.85, ease: expo });
animate('.hero-cta',      { opacity: [0, 1], y: [20, 0] }, { duration: 0.55, delay: 1.05, ease: expo });
animate('.hero-social',   { opacity: [0, 1], y: [16, 0] }, { duration: 0.5, delay: 1.2, ease: expo });
animate('.hero-stats',    { opacity: [0, 1], y: [20, 0] }, { duration: 0.55, delay: 1.35, ease: expo });

// ---- Counter Animation ----
let countersStarted = false;
inView('.hero-stats', () => {
  if (countersStarted) return;
  countersStarted = true;
  document.querySelectorAll('.stat-number[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    if (prefersReducedMotion()) { el.textContent = target; return; }
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(eased * target);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}, { amount: 0.5 });

// ---- Section Headers ----
inView('.section-header', ({ target }) => {
  animate(target, { opacity: [0, 1], y: [20, 0] }, { duration: 0.65, ease: expo });
}, { amount: 0.35 });

// ---- About ----
inView('.about-text', ({ target }) => {
  animate(target, { opacity: [0, 1], x: [-28, 0] }, { duration: 0.75, ease: expo });
}, { amount: 0.2 });

inView('.about-cards', ({ target }) => {
  animate(target.querySelectorAll('.info-card'),
    { opacity: [0, 1], x: [28, 0] },
    { delay: stagger(0.1), duration: 0.65, ease: expo }
  );
}, { amount: 0.2 });

// ---- Timeline ----
document.querySelectorAll('.timeline-item').forEach(el => { el.style.opacity = '0'; });
inView('.timeline', () => {
  animate('.timeline-item',
    { opacity: [0, 1], x: [-36, 0] },
    { delay: stagger(0.2), duration: 0.75, ease: expo }
  );
  animate('.timeline-dot',
    { scale: [0, 1], opacity: [0, 1] },
    { delay: stagger(0.2, { startDelay: 0.15 }), duration: 0.45, ease: 'backOut' }
  );
}, { amount: 0.1 });

// ---- Skills ----
inView('#skills', () => {
  animate('.skill-category',
    { opacity: [0, 1], y: [32, 0] },
    { delay: stagger(0.12), duration: 0.65, ease: expo }
  );
  animate('.skill-row',
    { opacity: [0, 1], x: [-12, 0] },
    { delay: stagger(0.05, { start: 0.25 }), duration: 0.5, ease: expo }
  );
}, { amount: 0.15 });

// ---- Education ----
document.querySelectorAll('.edu-card').forEach(el => { el.style.opacity = '0'; });
inView('.edu-grid', ({ target }) => {
  animate(target.querySelectorAll('.edu-card'),
    { opacity: [0, 1], y: [28, 0] },
    { delay: stagger(0.15), duration: 0.7, ease: expo }
  );
}, { amount: 0.15 });

// ---- Contact ----
document.querySelectorAll('.contact-pitch, .contact-form, .contact-card').forEach(el => { el.style.opacity = '0'; });
inView('.contact-layout', ({ target }) => {
  animate(target.querySelector('.contact-pitch'), { opacity: [0, 1], x: [-24, 0] }, { duration: 0.7, ease: expo });
  animate(target.querySelector('.contact-form'),  { opacity: [0, 1], x: [24, 0]  }, { duration: 0.7, delay: 0.1, ease: expo });
}, { amount: 0.2 });

inView('.contact-grid', () => {
  animate('.contact-card',
    { opacity: [0, 1], y: [24, 0] },
    { delay: stagger(0.09), duration: 0.6, ease: expo }
  );
}, { amount: 0.2 });

// ---- Contact form → mailto with validation ----
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const fields = {
    name:    { input: contactForm.querySelector('#cf-name'),    err: contactForm.querySelector('#cf-name-err'),    test: v => v.length > 0 },
    email:   { input: contactForm.querySelector('#cf-email'),   err: contactForm.querySelector('#cf-email-err'),   test: v => EMAIL_RE.test(v) },
    message: { input: contactForm.querySelector('#cf-message'), err: contactForm.querySelector('#cf-message-err'), test: v => v.length >= 10 },
  };
  const setError = (f, on) => {
    f.input.classList.toggle('cf-input--error', on);
    f.input.setAttribute('aria-invalid', on ? 'true' : 'false');
    if (f.err) f.err.hidden = !on;
  };
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    let firstInvalid = null;
    Object.values(fields).forEach(f => {
      const ok = f.test(f.input.value.trim());
      setError(f, !ok);
      if (!ok && !firstInvalid) firstInvalid = f.input;
    });
    if (firstInvalid) { firstInvalid.focus(); return; }
    const subject = `[Portfolio] ${fields.name.input.value.trim()}`;
    const body = `${fields.message.input.value.trim()}\n\n— ${fields.name.input.value.trim()}\n${fields.email.input.value.trim()}`;
    const href = `mailto:mickabrousse@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    const success = document.getElementById('cf-success');
    if (success) success.hidden = false;
  });
  const copyBtn = document.getElementById('cf-copy-btn');
  if (copyBtn) {
    const label = copyBtn.querySelector('.cf-copy-label');
    const origKey = 'contact.copy';
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('mickabrousse@gmail.com');
      } catch {
        const r = document.createRange();
        r.selectNode(document.querySelector('.cf-copy-addr'));
        const sel = window.getSelection();
        sel.removeAllRanges(); sel.addRange(r);
        try { document.execCommand('copy'); } catch {}
        sel.removeAllRanges();
      }
      copyBtn.classList.add('cf-copy-btn--copied');
      if (label) {
        const lang = document.documentElement.lang === 'fr' ? 'fr' : 'en';
        label.textContent = I18N[lang]['contact.copied'];
        label.dataset.i18n = 'contact.copied';
      }
      setTimeout(() => {
        copyBtn.classList.remove('cf-copy-btn--copied');
        if (label) {
          const lang = document.documentElement.lang === 'fr' ? 'fr' : 'en';
          label.textContent = I18N[lang][origKey];
          label.dataset.i18n = origKey;
        }
      }, 1800);
    });
  }
  Object.values(fields).forEach(f => {
    f.input.addEventListener('input', () => {
      if (f.input.classList.contains('cf-input--error') && f.test(f.input.value.trim())) {
        setError(f, false);
      }
      const success = document.getElementById('cf-success');
      if (success) success.hidden = true;
    });
    f.input.addEventListener('blur', () => {
      const v = f.input.value.trim();
      if (v.length > 0 && !f.test(v)) setError(f, true);
    });
  });
}

// ---- Button ripple (DS MBButton) ----
document.addEventListener('pointerdown', e => {
  const btn = e.target.closest('.btn');
  if (!btn || prefersReducedMotion()) return;
  const r = btn.getBoundingClientRect();
  const dot = document.createElement('span');
  dot.className = 'btn-ripple';
  dot.style.left = `${e.clientX - r.left}px`;
  dot.style.top = `${e.clientY - r.top}px`;
  btn.appendChild(dot);
  dot.addEventListener('animationend', () => dot.remove());
});

// ---- Soft tag stagger on skills section ----
inView('.soft-skills', ({ target }) => {
  animate(target.querySelectorAll('.soft-tag'),
    { opacity: [0, 1], scale: [0.85, 1] },
    { delay: stagger(0.05), duration: 0.4, ease: 'easeOut' }
  );
}, { amount: 0.3 });

/* ============================================================
   PROJECTS — catalog of GitHub repositories
   data/catalog.json   curated copy, visuals, private allowlist
   data/projects.json  snapshot rebuilt every 6 h by GitHub Actions
                       (scripts/build-projects.mjs): which repos exist,
                       which private ones are allowed, verified live URLs
   GitHub API (live)   public repos right now
   A repo that disappears from GitHub disappears from the site: public ones
   at once (live API), private ones at the next snapshot.
   ============================================================ */
const GH_USER = 'micka2000';
const SNAPSHOT_URLS = [
  // freshest copy, straight from the branch (no Pages rebuild needed)
  `https://raw.githubusercontent.com/${GH_USER}/Mickael_Brousse/main/data/projects.json`,
  'data/projects.json',
];
const TYPE_ORDER = ['web', 'data', 'app', 'design', 'lab'];
// DS ProjectCard thumbnail cycle: blue, olive, ink, sky
const THUMBS = ['blue', 'olive', 'ink', 'sky'];

let projects = [];
let projectFilter = 'all';

const esc = (v) => String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pick = (v) => (v && typeof v === 'object') ? (v[currentLang] || v.en) : v;
const t = (key) => (I18N[currentLang] || I18N.en)[key] || I18N.en[key] || key;

async function getJSON(url) {
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  return res.json();
}
async function firstJSON(urls) {
  for (const u of urls) {
    try { return await getJSON(u); } catch {}
  }
  return null;
}

async function loadProjects() {
  const bust = `?v=${Date.now()}`;
  const [catalog, snapshot, live] = await Promise.all([
    getJSON(`data/catalog.json${bust}`).catch(() => ({ hidden: [], projects: {} })),
    firstJSON(SNAPSHOT_URLS.map(u => u + bust)),
    getJSON(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=pushed`).catch(() => null),
  ]);
  projects = mergeProjects({ catalog, snapshot, live });
  renderProjects();
}

function renderProjectFilters() {
  const bar = document.querySelector('.project-filters');
  if (!bar) return;
  const types = TYPE_ORDER.filter(ty => projects.some(p => p.type === ty));
  if (!types.includes(projectFilter)) projectFilter = 'all';
  bar.innerHTML = ['all', ...types].map(ty => {
    const label = ty === 'all' ? t('projects.all') : t(`projects.type_${ty}`);
    const count = ty === 'all' ? projects.length : projects.filter(p => p.type === ty).length;
    const on = ty === projectFilter;
    return `<button type="button" class="btn btn-outline btn-sm project-filter${on ? ' is-active' : ''}" data-filter="${ty}" aria-pressed="${on}">${esc(label)}<span class="project-filter-count">${count}</span></button>`;
  }).join('');
}

function projectVisual(p, i) {
  const badge = p.private ? `<span class="project-badge">${esc(t('projects.private'))}</span>` : '';
  if (p.image) {
    const alt = t('projects.shot_alt').replace('{title}', pick(p.title));
    return `
      <div class="project-thumb project-thumb--shot">
        <img src="${esc(p.image)}" alt="${esc(alt)}" width="960" height="600" loading="lazy" decoding="async" />
        ${badge}
      </div>`;
  }
  const tone = THUMBS[i % THUMBS.length];
  return `
    <div class="project-thumb project-thumb--${tone}" aria-hidden="true">
      <span class="project-abbr">${esc(p.abbr)}</span>
      ${badge}
    </div>`;
}

function projectCard(p, i) {
  const meta = [t(`projects.type_${p.type}`), p.year].filter(Boolean).join(' · ');
  const links = p.private
    ? `<span class="project-private-note">${esc(t('projects.private_note'))}</span>`
    : [
        p.live ? `<a class="btn btn-tonal btn-sm" href="${esc(p.live)}" target="_blank" rel="noopener">${esc(t('projects.view_live'))} <span aria-hidden="true">↗</span></a>` : '',
        `<a class="btn btn-text btn-sm" href="${esc(p.code)}" target="_blank" rel="noopener">${esc(t('projects.view_code'))} <span aria-hidden="true">↗</span></a>`,
      ].join('');
  return `
    <article class="project-card${p.private ? ' is-private' : ''}">
      ${projectVisual(p, i)}
      <div class="project-body">
        <span class="project-meta">${esc(meta)}</span>
        <h3 class="project-title">${esc(pick(p.title))}</h3>
        <p class="project-desc">${esc(pick(p.summary))}</p>
        <div class="project-tags">${p.tags.map(tag => `<span>${esc(tag)}</span>`).join('')}</div>
        <div class="project-links">${links}</div>
      </div>
    </article>`;
}

function renderProjects() {
  const grid = document.getElementById('projectGrid');
  if (!grid || !projects.length) return;
  renderProjectFilters();
  const list = projectFilter === 'all' ? projects : projects.filter(p => p.type === projectFilter);
  grid.innerHTML = list.map(projectCard).join('');
  if (!prefersReducedMotion()) {
    animate(grid.querySelectorAll('.project-card'),
      { opacity: [0, 1], y: [16, 0] },
      { delay: stagger(0.05), duration: 0.45, ease: expo });
  }
}

document.addEventListener('click', e => {
  const btn = e.target.closest('.project-filter');
  if (btn) { projectFilter = btn.dataset.filter; renderProjects(); return; }
  if (e.target.closest('.lang-opt')) renderProjects();
});

loadProjects();
