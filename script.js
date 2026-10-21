import { animate, inView, stagger } from "https://esm.sh/framer-motion@11"
import { mergeProjects } from './projects-data.js?v=23';
import { validate, sendContact } from './contact-send.js?v=23';

const PRM = window.matchMedia('(prefers-reduced-motion: reduce)');
const prefersReducedMotion = () => PRM.matches;

/* ============================================================
   I18N — English (default) + French
   ============================================================ */
const I18N = {
  en: {
    'hero.subtitle': "Building reliable &amp; compliant data in <strong>banking</strong> &amp; <strong>manufacturing</strong>.<br />3+ years in <strong>GDPR compliance</strong>, <strong>data quality</strong> &amp; <strong>metadata management</strong>.",
    'about.p1': "Data Governance Analyst with <strong>3+ years</strong> across <strong>banking</strong> (BGL BNP Paribas, Luxembourg) and <strong>manufacturing</strong> (Michelin, France), specializing in <strong>GDPR compliance</strong>, <strong>data quality</strong> and <strong>metadata management</strong>.",
    'about.p2': "Driven to turn data standards into <strong>business-ready tools</strong>, combining analytical thinking, clear communication and business-focused collaboration in a global environment.",
    'about.p3': "That work ranges from a <strong>180-activity GDPR register</strong> to a governance program covering <strong>70 plants</strong> and a Collibra catalog rollout run with a team in Pune, India. Now based in <strong>Toronto</strong>.",
    'exp.bnp_li1': "Overhauled the bank’s <strong>Personal Data Processing Register</strong> (GDPR, equivalent to Quebec’s Law 25): <strong>180 processing activities</strong> reviewed with process owners across every business line, about <strong>52 privacy assessments</strong> a year.",
    'exp.bnp_li2': "Built the <strong>Power BI KPI dashboard</strong> used to track those assessments and steer the quarterly compliance reviews.",
    'exp.bnp_li3': "Cut the <strong>SAS-BDN Data Dictionary</strong> error rate from about 20% to <strong>about 5%</strong>: audited every table and column address via SQL on Oracle, removed duplicate definitions, enforced one definition per data address and added data quality indicators on every new entry.",
    'exp.bnp_li4': "Presented the dictionary and data-protection work to the bank’s data teams to converge on a <strong>single dictionary structure</strong>, laying the groundwork for AI-ready, context-rich definitions.",
    'exp.mich1_li1': "Acted as <strong>PMO</strong> for the Manufacturing data governance program (<strong>70 plants</strong>): co-built the annual roadmap of <strong>36 data projects</strong> and aligned every Data Owner behind its 3 group objectives.",
    'exp.mich1_li2': "Tracked delivery on a <strong>Power BI dashboard</strong> whose velocity curve quickly showed the annual target would be missed.",
    'exp.mich1_li3': "Owned the <strong>3,000-row matrix</strong> assigning every data definition to a business owner and its contributors, wrote the rules that kept it clean, and formalized the Data Definition process through an interactive alignment workshop.",
    'exp.mich1_li4': "Designed and piloted a <strong>Collibra workflow</strong> to move that matrix into the group data catalog, running design sessions in English with the COE team in Pune, India, and applied change management (<strong>ADKAR, ADEQUA</strong>) to the blockers slowing catalog adoption.",
    'exp.mich1_li5': "Replaced a manual monthly follow-up across plants with an <strong>automated progress report</strong> for the steering committee, freeing about 1 day a month for the data owner, and rebuilt the underlying data with plant experts into the group’s master list of machine types.",
    'exp.mich2_li1': "Co-built the Michelin <strong>Collibra meta-model</strong> linking the business and IS layers, authored the <strong>2022–2023 catalog deployment roadmap</strong>, and built the “Collibra for dummies” e-learning that trained both IS experts and managers.",
    'exp.mich2_li2': "Self-trained in <strong>Power BI, Power Apps and VBA</strong> to build three tools adopted across entities, including a cross-plant SharePoint tracker and a bilingual FR/EN data lexicon app.",
    'exp.mich2_li3': "Co-animated the weekly <strong>Data Owner network</strong>, introducing systematic meeting minutes and attendance tracking to drive deliverable accountability.",
    'skills.gov_quality': "Data Governance & Quality",
    'skills.gov_gdpr': "GDPR, Privacy & Compliance",
    'skills.gov_risk': "Risk Assessment",
    'skills.gov_meta': "Metadata Management",
    'skills.gov_mdm': "Master Data Management",
    'skills.gov_catalog': "Data Cataloging",
    'skills.gov_steward': "Data Stewardship",
    'skills.gov_bi': "Business Intelligence",
    'skills.soft_agile': "Agile",
    'skills.soft_bpmn': "BPMN Process Modeling",
    'skills.soft_pm': "Project Management (PMO)",
    'skills.soft_change': "Change Management (ADKAR, ADEQUA)",
    'skills.soft_stake': "Stakeholder Management",
    'skills.soft_workshop': "Workshop Facilitation",
    'skills.soft_collab': "Cross-functional Collaboration",
    'skills.soft_comm': "Clear Communication",
    'edu.lic_t': "Dual Bachelor — Economics and Management",
    'exp.tag_law25': "Law 25",
    'exp.tag_change': "Change management",
    'exp.tag_master': "Master data",
    'hero.eyebrow': 'Data Governance Analyst · Toronto', 'hero.scroll': 'Scroll ↓',
    'theme.to_dark': 'Dark', 'theme.to_light': 'Light', 'a11y.theme_toggle': 'Switch theme',
    'footer.site': 'Site', 'footer.elsewhere': 'Elsewhere', 'footer.data_t': 'Your data', 'footer.data_d': 'No cookies, no tracking. The contact form sends your name, email and message to my inbox, only so I can reply.', 'footer.privacy': 'Privacy notice', 'footer.place': 'Toronto, Canada', 'contact.privacy': 'Your name, email and message are only used to reply to you.',
    'footer.tagline': 'Data governance, quality & compliance.',
    'nav.projects': 'Projects', 'projects.title': 'Projects',
    'projects.intro': 'Everything I build on the side, pulled live from my GitHub.',
    'projects.filter_label': 'Filter projects', 'projects.all': 'All',
    'projects.view_code': 'Code', 'projects.view_live': 'Live site',
    'projects.view_page': 'View project',
    'projects.private': 'Private', 'projects.private_note': 'Private repository · code not public',
    'projects.shot_alt': 'Screenshot of {title}','projects.all_github': 'All repositories on GitHub ↗',
    'projects.type_web': 'Web', 'projects.type_data': 'Data & Finance', 'projects.type_app': 'Apps & AI',
    'projects.type_design': 'Design', 'projects.type_lab': 'Lab',
    'meta.title': 'Mickaël Brousse — Data Governance Analyst',
    'nav.about': 'Profile', 'nav.experience': 'Experience', 'nav.skills': 'Skills',
    'nav.education': 'Education', 'nav.contact': 'Contact', 'nav.available': 'Available',
    'hero.cta_primary': 'See my projects', 'hero.cta_secondary': 'Contact me', 'about.title': 'About me',
    'about.hi_mobility': 'International mobility — Europe & Canada',
    'about.hi_lang': 'Native French · Professional English',
    'about.hi_avail': 'Open to opportunities — Available immediately',
    'about.card_master_t': 'Master', 'about.card_master_d': 'Strategic Management & Digital Transformation',
    'about.card_bnp_d': 'Data Governance Analyst — Luxembourg',
    'about.card_michelin_d': 'Business Analyst / Data Owner — France',
    'about.card_loc_t': 'Toronto, Canada', 'about.card_loc_d': 'Available immediately', 'exp.title': 'Professional Journey',
    'exp.bnp_period': 'May 2024 — Nov 2025', 'exp.badge_banking': 'Banking',
    'exp.tag_gdpr': 'GDPR',
    'exp.mich1_period': 'Sept 2022 — Aug 2023', 'exp.badge_industry': 'Industry',
    'exp.mich2_period': 'Mar 2022 — Aug 2022', 'exp.badge_internship': 'Internship', 'exp.role_intern': 'Internship', 'skills.title': 'Stack & Expertise',
    'skills.cat_core': 'Core Expertise', 'skills.cat_tools': 'Tools & Technologies',
    'skills.tools_data': 'Data & BI', 'skills.tools_office': 'Productivity', 'skills.tools_code': 'Languages',
    'skills.cat_approach': 'Approach & Soft Skills',
    'skills.lvl_expert': 'Expert', 'skills.lvl_advanced': 'Advanced', 'edu.title': 'Education',
    'edu.master_t': 'Master — Strategic Management & Digital Transformation',
    'edu.master_link': 'About the program',
    'edu.master_d': 'Specialization in digital strategy, innovation management, and organizational transformation in the digital era.',
    'edu.lic_d': 'Dual training in economics and organizational management, with a quantitative and analytical approach.', 'contact.title': "Let's Work Together",
    'contact.intro': "Available for opportunities in Canada and internationally.<br />Let's talk about your next data project.",
    'contact.headline': 'Let\'s talk<span class="ch-accent">?</span>',
'contact.cta_short': 'Send',
    'contact.f_name': 'Your name', 'contact.f_email': 'Email', 'contact.f_message': 'Message',
    'contact.f_name_ph': 'Jane Smith', 'contact.f_email_ph': 'you@company.com',
    'contact.f_message_ph': 'Tell me about your project…',
    'contact.sending': 'Sending…', 'contact.sent_t': 'Message sent.', 'contact.sent_d': 'Thanks. I will reply by email.',
    'contact.fail_t': 'The message could not be sent from here.',
    'contact.fail_d': 'Try again in a moment, or write to me on LinkedIn.', 'contact.write_linkedin': 'Message me on LinkedIn', 'footer.cta': 'Send me a message',
    'a11y.skip': 'Skip to main content',
    'a11y.lang_toggle': 'Switch language',
    'a11y.menu': 'Menu',
    'footer.copy': '© <span id="footer-year">{year}</span> Mickaël Brousse',
    'contact.err_name': 'Please enter your name.',
    'contact.err_email': 'Please enter a valid email address.',
    'contact.err_message': 'Please write a short message (at least 10 characters).',
  },
  fr: {
    'hero.subtitle': "Des données fiables et conformes, dans la <strong>banque</strong> et l’<strong>industrie</strong>.<br />Plus de 3 ans en <strong>conformité RGPD</strong>, <strong>qualité des données</strong> et <strong>gestion des métadonnées</strong>.",
    'about.p1': "Data Governance Analyst avec <strong>plus de 3 ans</strong> d’expérience dans la <strong>banque</strong> (BGL BNP Paribas, Luxembourg) et l’<strong>industrie</strong> (Michelin, France), spécialisé en <strong>conformité RGPD</strong>, <strong>qualité des données</strong> et <strong>gestion des métadonnées</strong>.",
    'about.p2': "Je cherche à transformer les standards de données en <strong>outils prêts pour le métier</strong>, en alliant esprit d’analyse, communication claire et collaboration orientée business dans un environnement international.",
    'about.p3': "Ce travail va d’un <strong>registre RGPD de 180 traitements</strong> à un programme de gouvernance couvrant <strong>70 usines</strong> et un déploiement Collibra mené avec une équipe à Pune, en Inde. Aujourd’hui basé à <strong>Toronto</strong>.",
    'exp.bnp_li1': "Refonte du <strong>registre des traitements de données personnelles</strong> de la banque (RGPD, équivalent de la Loi 25 au Québec) : <strong>180 traitements</strong> revus avec les responsables de chaque métier, environ <strong>52 évaluations de confidentialité</strong> par an.",
    'exp.bnp_li2': "Création du <strong>tableau de bord KPI Power BI</strong> qui suit ces évaluations et pilote les revues de conformité trimestrielles.",
    'exp.bnp_li3': "Taux d’erreur du <strong>dictionnaire de données SAS-BDN</strong> ramené d’environ 20 % à <strong>environ 5 %</strong> : audit de chaque table et colonne en SQL sur Oracle, suppression des doublons, une seule définition par donnée et indicateurs de qualité sur chaque nouvelle entrée.",
    'exp.bnp_li4': "Présentation du dictionnaire et du travail de protection des données aux équipes data de la banque pour converger vers une <strong>structure de dictionnaire unique</strong>, base de définitions riches en contexte et prêtes pour l’IA.",
    'exp.mich1_li1': "<strong>PMO</strong> du programme de gouvernance des données Manufacturing (<strong>70 usines</strong>) : co-construction de la feuille de route annuelle de <strong>36 projets data</strong> et alignement de chaque Data Owner sur ses 3 objectifs groupe.",
    'exp.mich1_li2': "Suivi des livraisons sur un <strong>tableau de bord Power BI</strong> dont la courbe de vélocité a vite montré que l’objectif annuel ne serait pas tenu.",
    'exp.mich1_li3': "Responsable de la <strong>matrice de 3 000 lignes</strong> attribuant chaque définition de donnée à un responsable métier et à ses contributeurs, rédaction des règles qui la gardent propre et formalisation du processus de définition des données lors d’un atelier d’alignement interactif.",
    'exp.mich1_li4': "Conception et pilotage d’un <strong>workflow Collibra</strong> pour intégrer cette matrice au catalogue de données du groupe, avec des sessions de conception en anglais avec l’équipe COE de Pune, en Inde, et conduite du changement (<strong>ADKAR, ADEQUA</strong>) sur les freins à l’adoption du catalogue.",
    'exp.mich1_li5': "Remplacement d’un suivi mensuel manuel entre usines par un <strong>rapport d’avancement automatisé</strong> pour le comité de pilotage (environ 1 jour par mois libéré pour le data owner), et reconstruction des données avec les experts usine en référentiel groupe des types de machines.",
    'exp.mich2_li1': "Co-construction du <strong>méta-modèle Collibra</strong> de Michelin reliant les couches métier et SI, rédaction de la <strong>feuille de route de déploiement du catalogue 2022–2023</strong> et création de l’e-learning « Collibra pour les nuls » destiné aux experts SI comme aux managers.",
    'exp.mich2_li2': "Autoformation à <strong>Power BI, Power Apps et VBA</strong> pour créer trois outils adoptés par plusieurs entités, dont un suivi SharePoint inter-usines et une application de lexique de données bilingue FR/EN.",
    'exp.mich2_li3': "Co-animation du <strong>réseau hebdomadaire des Data Owners</strong>, avec comptes rendus systématiques et suivi des présences pour responsabiliser sur les livrables.",
    'skills.gov_quality': "Gouvernance & qualité des données",
    'skills.gov_gdpr': "RGPD, confidentialité & conformité",
    'skills.gov_risk': "Évaluation des risques",
    'skills.gov_meta': "Gestion des métadonnées",
    'skills.gov_mdm': "Gestion des données de référence",
    'skills.gov_catalog': "Catalogage des données",
    'skills.gov_steward': "Data stewardship",
    'skills.gov_bi': "Business intelligence",
    'skills.soft_agile': "Agile",
    'skills.soft_bpmn': "Modélisation BPMN",
    'skills.soft_pm': "Gestion de projet (PMO)",
    'skills.soft_change': "Conduite du changement (ADKAR, ADEQUA)",
    'skills.soft_stake': "Gestion des parties prenantes",
    'skills.soft_workshop': "Animation d’ateliers",
    'skills.soft_collab': "Collaboration transverse",
    'skills.soft_comm': "Communication claire",
    'edu.lic_t': "Double licence — Économie et management",
    'exp.tag_law25': "Loi 25",
    'exp.tag_change': "Conduite du changement",
    'exp.tag_master': "Données de référence",
    'hero.eyebrow': 'Data Governance Analyst · Toronto', 'hero.scroll': 'Défiler ↓',
    'theme.to_dark': 'Sombre', 'theme.to_light': 'Clair', 'a11y.theme_toggle': 'Changer de thème',
    'footer.site': 'Site', 'footer.elsewhere': 'Ailleurs', 'footer.data_t': 'Vos données', 'footer.data_d': 'Ni cookies ni pistage. Le formulaire envoie votre nom, votre email et votre message dans ma boîte mail, uniquement pour vous répondre.', 'footer.privacy': 'Confidentialité', 'footer.place': 'Toronto, Canada', 'contact.privacy': 'Votre nom, votre email et votre message servent uniquement à vous répondre.',
    'footer.tagline': 'Gouvernance, qualité et conformité des données.',
    'nav.projects': 'Projets', 'projects.title': 'Projets',
    'projects.intro': 'Tout ce que je construis à côté, en direct depuis mon GitHub.',
    'projects.filter_label': 'Filtrer les projets', 'projects.all': 'Tout',
    'projects.view_code': 'Code', 'projects.view_live': 'Voir le site',
    'projects.view_page': 'Voir le projet',
    'projects.private': 'Privé', 'projects.private_note': 'Dépôt privé · code non public',
    'projects.shot_alt': 'Capture d’écran de {title}','projects.all_github': 'Tous les dépôts sur GitHub ↗',
    'projects.type_web': 'Web', 'projects.type_data': 'Data & Finance', 'projects.type_app': 'Apps & IA',
    'projects.type_design': 'Design', 'projects.type_lab': 'Labo',
    'meta.title': 'Mickaël Brousse — Data Governance Analyst',
    'nav.about': 'Profil', 'nav.experience': 'Expérience', 'nav.skills': 'Compétences',
    'nav.education': 'Formation', 'nav.contact': 'Contact', 'nav.available': 'Disponible',
    'hero.cta_primary': 'Voir mes projets', 'hero.cta_secondary': 'Me contacter', 'about.title': 'À propos de moi',
    'about.hi_mobility': 'Mobilité internationale — Europe & Canada',
    'about.hi_lang': 'Français natif · Anglais professionnel',
    'about.hi_avail': 'Ouvert aux opportunités — Disponible immédiatement',
    'about.card_master_t': 'Master', 'about.card_master_d': 'Strategic Management & Digital Transformation',
    'about.card_bnp_d': 'Data Governance Analyst — Luxembourg',
    'about.card_michelin_d': 'Business Analyst / Data Owner — France',
    'about.card_loc_t': 'Toronto, Canada', 'about.card_loc_d': 'Disponible immédiatement', 'exp.title': 'Parcours Professionnel',
    'exp.bnp_period': 'Mai 2024 — Nov 2025', 'exp.badge_banking': 'Banque',
    'exp.tag_gdpr': 'RGPD',
    'exp.mich1_period': 'Sept 2022 — Août 2023', 'exp.badge_industry': 'Industrie',
    'exp.mich2_period': 'Mars 2022 — Août 2022', 'exp.badge_internship': 'Stage', 'exp.role_intern': 'Stage', 'skills.title': 'Stack & Expertises',
    'skills.cat_core': 'Expertise Cœur', 'skills.cat_tools': 'Outils & Technologies',
    'skills.tools_data': 'Data & BI', 'skills.tools_office': 'Productivité', 'skills.tools_code': 'Langages',
    'skills.cat_approach': 'Approche & Soft Skills',
    'skills.lvl_expert': 'Expert', 'skills.lvl_advanced': 'Avancé', 'edu.title': 'Éducation',
    'edu.master_t': 'Master — Strategic Management & Digital Transformation',
    'edu.master_link': 'Découvrir la formation',
    'edu.master_d': "Spécialisation en stratégie numérique, management de l'innovation et transformation des organisations à l'ère digitale.",
    'edu.lic_d': 'Double formation en sciences économiques et management des organisations, avec une approche quantitative et analytique.', 'contact.title': 'Travaillons Ensemble',
    'contact.intro': "Disponible pour des opportunités au Canada et à l'international.<br />Parlons de votre prochain projet data.",
    'contact.headline': 'On parle <span class="ch-accent">?</span>',
'contact.cta_short': 'Envoyer',
    'contact.f_name': 'Votre nom', 'contact.f_email': 'Email', 'contact.f_message': 'Message',
    'contact.f_name_ph': 'Jeanne Dupont', 'contact.f_email_ph': 'vous@entreprise.com',
    'contact.f_message_ph': 'Parlez-moi de votre projet…',
    'contact.sending': 'Envoi…', 'contact.sent_t': 'Message envoyé.', 'contact.sent_d': 'Merci, je vous réponds par e-mail.',
    'contact.fail_t': 'Le message n\u2019a pas pu partir d\u2019ici.',
    'contact.fail_d': 'Réessayez dans un instant, ou écrivez-moi sur LinkedIn.', 'contact.write_linkedin': 'M’écrire sur LinkedIn', 'footer.cta': 'M’envoyer un message',
    'a11y.skip': 'Aller au contenu principal',
    'a11y.lang_toggle': 'Changer de langue',
    'a11y.menu': 'Menu',
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

// A click on EN or FR picks that language; Enter or Space on the button
// (target = the button itself) switches to the other one.
document.addEventListener('click', e => {
  const toggle = e.target.closest('.lang-toggle');
  if (!toggle) return;
  const opt = e.target.closest('.lang-opt');
  applyLang(opt ? opt.dataset.lang : (currentLang === 'fr' ? 'en' : 'fr'));
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
  if (e.target.closest('.lang-toggle')) syncThemeToggle();
});
syncThemeToggle();

// ---- Progress Bar ----
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  progressBar.style.transform = `scaleX(${Math.min(scrolled, 1)})`;
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
  const pageBtn = p.page ? `<a class="btn btn-primary btn-sm" href="${esc(p.page)}">${esc(t('projects.view_page'))} <span aria-hidden="true">→</span></a>` : '';
  const links = p.private
    ? (pageBtn || `<span class="project-private-note">${esc(t('projects.private_note'))}</span>`)
    : [
        pageBtn,
        p.live ? `<a class="btn btn-tonal btn-sm" href="${esc(p.live)}" target="_blank" rel="noopener">${esc(t('projects.view_live'))} <span aria-hidden="true">↗</span></a>` : '',
        `<a class="btn btn-text btn-sm" href="${esc(p.code)}" target="_blank" rel="noopener">${esc(t('projects.view_code'))} <span aria-hidden="true">↗</span></a>`,
      ].join('');
  return `
    <article class="project-card${p.private ? ' is-private' : ''}">
      ${projectVisual(p, i)}
      <div class="project-body">
        <span class="project-meta">${esc(meta)}</span>
        <h3 class="project-title">${p.page ? `<a href="${esc(p.page)}">${esc(pick(p.title))}</a>` : esc(pick(p.title))}</h3>
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
  // A summary that overflows is a scroll region: reachable by keyboard too
  grid.querySelectorAll('.project-desc').forEach(d => {
    if (d.scrollHeight <= d.clientHeight) return;
    d.tabIndex = 0;
    d.classList.add('is-scroll');
    d.addEventListener('scroll', () => {
      d.classList.toggle('at-end', d.scrollTop + d.clientHeight >= d.scrollHeight - 2);
    }, { passive: true });
  });
  if (!prefersReducedMotion()) {
    animate(grid.querySelectorAll('.project-card'),
      { opacity: [0, 1], y: [16, 0] },
      { delay: stagger(0.05), duration: 0.45, ease: expo });
  }
}

document.addEventListener('click', e => {
  const btn = e.target.closest('.project-filter');
  if (btn) { projectFilter = btn.dataset.filter; renderProjects(); return; }
  if (e.target.closest('.lang-toggle')) renderProjects();
});

loadProjects();
