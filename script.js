document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  const sun = document.querySelector('svg[data-theme="light"]');
  const moon = document.querySelector('svg[data-theme="dark"]');
  const setTheme = (t) => {
    body.classList.toggle('light-theme', t === 'light');
    body.classList.toggle('dark-theme', t === 'dark');
    if (sun) sun.style.display = t === 'light' ? 'block' : 'none';
    if (moon) moon.style.display = t === 'dark' ? 'block' : 'none';
    localStorage.setItem('theme', t);
  };
  if (sun) sun.addEventListener('click', () => setTheme('dark'));
  if (moon) moon.addEventListener('click', () => setTheme('light'));
  setTheme(localStorage.getItem('theme') || 'dark');

  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Сообщение отправлено! Я свяжусь с вами в ближайшее время!');
      form.reset();
    });
  }

  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('show', window.scrollY > 300);
    });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const hamburger = document.querySelector('.hamburger');
  const nav = document.getElementById('site-navigation');
  if (hamburger && nav) {
    const closeNav = () => {
      body.classList.remove('nav-open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    };
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = body.classList.toggle('nav-open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#site-navigation') && !e.target.closest('.hamburger')) closeNav();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });
  }

  function showModal(title, text) {
    if (document.querySelector('.window')) return;
    const container = document.createElement('div');
    container.className = 'window-overlay';
    const win = document.createElement('div');
    win.className = 'window';
    win.innerHTML = `<div class="window-content"><h2>${title}</h2><p>${text}</p><button class="window-close">Закрыть</button></div>`;
    container.appendChild(win);
    document.body.appendChild(container);
    document.body.classList.add('modal-open');

    const onKey = (e) => { if (e.key === 'Escape') close(); };
    const close = () => {
      container.remove();
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', onKey);
    };
    win.querySelector('.window-close').addEventListener('click', close);
    container.addEventListener('click', (ev) => { if (ev.target === container) close(); });
    document.addEventListener('keydown', onKey);
  }

  const btndown = document.querySelector('.btndown');
  if (btndown) {
    btndown.addEventListener('click', (e) => {
      e.preventDefault();
      showModal('Download CV', 'Download will start soon.');
    });
  }
});