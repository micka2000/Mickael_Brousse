// Project presentation pages: language and theme toggles only.
// Both languages are already in the HTML (data-l), styles.css shows the
// active one. Same localStorage keys as the home page ('lang', 'theme').
(function () {
  var d = document.documentElement;

  function syncLang() {
    var lang = d.getAttribute('lang') === 'fr' ? 'fr' : 'en';
    document.querySelectorAll('.lang-opt').forEach(function (el) {
      el.classList.toggle('active', el.dataset.lang === lang);
    });
  }
  function syncTheme() {
    var dark = d.getAttribute('data-theme') === 'dark';
    document.querySelectorAll('.theme-toggle').forEach(function (b) {
      b.querySelector('.theme-toggle-icon').textContent = dark ? '☀' : '◑';
      b.setAttribute('aria-pressed', String(dark));
    });
  }

  document.addEventListener('click', function (e) {
    var opt = e.target.closest('.lang-opt');
    if (opt) {
      d.setAttribute('lang', opt.dataset.lang);
      try { localStorage.setItem('lang', opt.dataset.lang); } catch (err) {}
      syncLang();
    }
    if (e.target.closest('.theme-toggle')) {
      var next = d.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      d.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (err) {}
      syncTheme();
    }
  });

  syncLang();
  syncTheme();
})();
