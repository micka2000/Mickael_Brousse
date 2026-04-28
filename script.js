import { animate, inView, stagger } from "https://esm.sh/framer-motion@11"

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
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
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

animate('.hero-badge', { opacity: [0, 1], y: [12, 0] }, { duration: 0.55, delay: 0.1, ease: expo });

const nameWords = document.querySelectorAll('.name-word');
animate(nameWords[0], { opacity: [0, 1], y: [50, 0] }, { duration: 0.75, delay: 0.3, ease: expo });
animate(nameWords[1], { opacity: [0, 1], y: [50, 0] }, { duration: 0.75, delay: 0.48, ease: expo });

animate('.hero-subtitle', { opacity: [0, 1], y: [20, 0] }, { duration: 0.6, delay: 0.85, ease: expo });
animate('.hero-cta',      { opacity: [0, 1], y: [20, 0] }, { duration: 0.55, delay: 1.05, ease: expo });
animate('.hero-social',   { opacity: [0, 1], y: [16, 0] }, { duration: 0.5, delay: 1.2, ease: expo });
animate('.hero-stats',    { opacity: [0, 1], y: [20, 0] }, { duration: 0.55, delay: 1.35, ease: expo });

// Typing effect
const typedEl = document.getElementById('typed-title');
if (typedEl) {
  const text = 'Data Governance Analyst';
  let i = 0;
  const type = () => {
    if (i < text.length) {
      typedEl.textContent += text[i++];
      setTimeout(type, 55);
    }
  };
  setTimeout(type, 420);
}

// Hero mouse parallax on glows
const hero = document.getElementById('hero');
const glow1 = document.querySelector('.glow-1');
const glow2 = document.querySelector('.glow-2');
let ticking = false;

hero.addEventListener('mousemove', (e) => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    animate(glow1, { x: x * 40, y: y * 28 }, { duration: 1.8, ease: 'easeOut' });
    animate(glow2, { x: x * -28, y: y * -20 }, { duration: 2.0, ease: 'easeOut' });
    ticking = false;
  });
});

// ---- Counter Animation ----
let countersStarted = false;
inView('.hero-stats', () => {
  if (countersStarted) return;
  countersStarted = true;
  document.querySelectorAll('.stat-number[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
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
  document.querySelectorAll('.bar-fill').forEach((bar, i) => {
    const target = bar.dataset.width;
    animate(bar, { width: target }, {
      duration: 1.3,
      delay: 0.4 + i * 0.07,
      ease: expo
    });
  });
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
document.querySelectorAll('.contact-cta-block, .contact-card').forEach(el => { el.style.opacity = '0'; });
inView('.contact-cta-block', ({ target }) => {
  animate(target, { opacity: [0, 1], y: [24, 0] }, { duration: 0.7, ease: expo });
}, { amount: 0.25 });

inView('.contact-grid', () => {
  animate('.contact-card',
    { opacity: [0, 1], y: [24, 0] },
    { delay: stagger(0.09), duration: 0.6, ease: expo }
  );
}, { amount: 0.2 });

// ---- Magnetic Buttons ----
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    animate(btn, { x, y }, { duration: 0.2, ease: 'easeOut' });
  });

  btn.addEventListener('mouseleave', () => {
    animate(btn, { x: 0, y: 0 }, { duration: 0.6, ease: expo });
  });
});

// ---- Card Spotlight Effect ----
document.querySelectorAll('.timeline-card, .skill-category, .edu-card, .contact-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  });
});

// ---- Soft tag stagger on skills section ----
inView('.soft-skills', ({ target }) => {
  animate(target.querySelectorAll('.soft-tag'),
    { opacity: [0, 1], scale: [0.85, 1] },
    { delay: stagger(0.05), duration: 0.4, ease: 'easeOut' }
  );
}, { amount: 0.3 });
