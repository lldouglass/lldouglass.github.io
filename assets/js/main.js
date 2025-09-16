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
      if (href.includes(`${page}.html`) || (page === 'home' && href.endsWith('index.html'))) {
        a.classList.add('active');
      }
    });
  }
  // Highlight active tab
  document.querySelectorAll('.tabs-nav .tab').forEach(tab => {
    const href = tab.getAttribute('href') || '';
    if (page && href.includes(`${page}.html`)) tab.classList.add('active');
    if (page === 'home' && href.endsWith('index.html')) tab.classList.add('active');
  });

  // Robust hero photo loader (guarantees something shows)
  const avatar = document.querySelector('.hero-avatar');
  if (avatar) {
    const candidates = [
      'assets/img/profile.jpg',
      'assets/img/profile.jpeg',
      'assets/img/profile.JPG',
      'assets/img/profile.png'
    ];
    let i = 0;
    const stamp = `?v=${Date.now()}`; // bust caches aggressively
    function fallback() {
      if (i >= candidates.length) {
        // Last resort placeholder (monogram)
        const svg = encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="280" height="280">
            <rect width="100%" height="100%" fill="#0b1020"/>
            <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle"
                  font-family="system-ui, -apple-system, Segoe UI, Roboto, Arial" font-size="84" fill="#ffffff">LD</text>
          </svg>
        `);
        avatar.src = `data:image/svg+xml;charset=utf-8,${svg}`;
        return;
      }
      avatar.src = `${candidates[i++]}${stamp}`;
    }
    avatar.addEventListener('error', fallback);
    fallback();
  }

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
