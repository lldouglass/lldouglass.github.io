(function () {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Highlight active nav if not set
  const page = document.body.getAttribute('data-page');
  if (page && nav) {
    nav.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href.includes(`${page}.html`) || (page === 'home' && href.endsWith('index.html'))) {
        a.classList.add('active');
      }
    });
  }

  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Contact form -> mailto:
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = encodeURIComponent(data.get('name') || '');
      const email = encodeURIComponent(data.get('email') || '');
      const message = encodeURIComponent(data.get('message') || '');
      const subject = `Website contact from ${decodeURIComponent(name)}`;
      const body = `Name: ${decodeURIComponent(name)}%0AEmail: ${decodeURIComponent(email)}%0A%0A${decodeURIComponent(message)}`;
      window.location.href = `mailto:logan42.ld@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    });
  }
})();
