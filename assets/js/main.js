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

  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Highlight active nav links
  const page = document.body.getAttribute('data-page');
  if (page && nav) {
    nav.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href.includes(`${page}.html`) || (page === 'home' && href.endsWith('index.html'))) a.classList.add('active');
    });
  }
  // Highlight active tab
  document.querySelectorAll('.tabs-nav .tab').forEach(tab => {
    const href = tab.getAttribute('href') || '';
    if (page && href.includes(`${page}.html`)) tab.classList.add('active');
    if (page === 'home' && href.endsWith('index.html')) tab.classList.add('active');
  });

  // Generic multi-source image loader for any <img data-src-list="url1|url2|...">
  function loadFromList(img, list) {
    const stamp = `?v=${Date.now()}`; // defeat caches
    const sources = list.split('|').map(s => s.trim()).filter(Boolean);
    let i = 0;
    function tryNext() {
      if (i >= sources.length) return false;
      const next = sources[i++];
      img.onerror = () => tryNext();
      img.onload  = () => { img.onerror = null; img.onload = null; };
      img.src = next + stamp;
      return true;
    }
    if (!tryNext()) {
      // As a last resort, show a neutral placeholder rectangle
      const svg = encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480"><rect width="100%" height="100%" fill="#e5e7eb"/></svg>');
      img.src = `data:image/svg+xml;charset=utf-8,${svg}`;
    }
  }

  // Load hero avatar robustly
  const avatar = document.querySelector('.hero-avatar');
  if (avatar) {
    const rawGit = 'https://raw.githubusercontent.com/lldouglass/lldouglass.github.io/main/assets/img/profile.jpg';
    const candidates = [
      'assets/img/profile.jpg',
      'assets/img/profile.jpeg',
      'assets/img/profile.JPG',
      'assets/img/profile.png',
      rawGit
    ];
    loadFromList(avatar, candidates.join('|'));
  }

  // Initialize all multi-source images
  document.querySelectorAll('img[data-src-list]').forEach(img => {
    loadFromList(img, img.getAttribute('data-src-list'));
  });

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
