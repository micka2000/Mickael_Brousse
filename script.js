/* ============================================
   MICKAËL BROUSSE — PORTFOLIO SCRIPTS
   ============================================ */

// Navbar: add .scrolled class on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// Smooth active nav link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const highlightNav = () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#818cf8';
    }
  });
};

window.addEventListener('scroll', highlightNav, { passive: true });

// Intersection Observer: animate timeline items into view
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 150);
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

timelineItems.forEach(item => timelineObserver.observe(item));

// Intersection Observer: animate skill bars
const barFills = document.querySelectorAll('.bar-fill');
const skillsSection = document.querySelector('#skills');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      barFills.forEach(bar => {
        bar.style.width = bar.style.width; // trigger reflow
        const target = bar.getAttribute('style').match(/width:\s*([\d.]+%)/);
        if (target) {
          const value = target[1];
          bar.style.width = '0%';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              bar.style.width = value;
            });
          });
        }
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

if (skillsSection) skillObserver.observe(skillsSection);

// Fade-in for general sections
const fadeEls = document.querySelectorAll('.section-header, .about-grid, .skills-grid, .edu-grid, .contact-grid');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeObserver.observe(el);
});

// Typing effect for hero title
const titleEl = document.querySelector('.hero-title');
if (titleEl) {
  const text = titleEl.textContent;
  titleEl.textContent = '';
  let i = 0;
  const type = () => {
    if (i < text.length) {
      titleEl.textContent += text[i++];
      setTimeout(type, 45);
    }
  };
  setTimeout(type, 600);
}
