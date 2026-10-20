// Project presentation pages: language and theme toggles, accessible text
// in the active language, and a short fade-in for screenshots.
// Both languages are already in the HTML (data-l), styles.css shows the
// active one. Same localStorage keys as the home page ('lang', 'theme').
(function () {
  var d = document.documentElement;

  function lang() { return d.getAttribute('lang') === 'fr' ? 'fr' : 'en'; }

  // alt and aria-label carry data-<attr>-en / data-<attr>-fr
  function syncA11y() {
    var l = lang();
    ['alt', 'aria-label'].forEach(function (attr) {
      document.querySelectorAll('[data-' + attr + '-' + l + ']').forEach(function (el) {
        el.setAttribute(attr, el.getAttribute('data-' + attr + '-' + l));
      });
    });
  }
  function syncLang() {
    document.querySelectorAll('.lang-opt').forEach(function (el) {
      el.classList.toggle('active', el.dataset.lang === lang());
    });
    syncA11y();
  }
  function syncTheme() {
    var dark = d.getAttribute('data-theme') === 'dark';
    document.querySelectorAll('.theme-toggle').forEach(function (b) {
      b.querySelector('.theme-toggle-icon').textContent = dark ? '☀' : '◑';
      b.setAttribute('aria-pressed', String(dark));
    });
  }

  document.addEventListener('click', function (e) {
    var toggle = e.target.closest('.lang-toggle');
    if (toggle) {
      // click on EN or FR picks it; Enter or Space on the button switches
      var opt = e.target.closest('.lang-opt');
      var next = opt ? opt.dataset.lang : (lang() === 'fr' ? 'en' : 'fr');
      d.setAttribute('lang', next);
      try { localStorage.setItem('lang', next); } catch (err) {}
      syncLang();
    }
    if (e.target.closest('.theme-toggle')) {
      var theme = d.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      d.setAttribute('data-theme', theme);
      try { localStorage.setItem('theme', theme); } catch (err) {}
      syncTheme();
    }
  });

  // Screenshots fade in once loaded; the tinted frame shows meanwhile.
  document.querySelectorAll('.pp-frame img').forEach(function (img) {
    if (img.complete) return;
    img.classList.add('pp-loading');
    var done = function () { img.classList.remove('pp-loading'); };
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', done, { once: true });
  });

  syncLang();
  syncTheme();
})();
