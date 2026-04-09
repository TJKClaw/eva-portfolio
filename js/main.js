/* ═══════════════════════════════════════════
   EVA — Main JavaScript
   ═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initTypewriter();
  initClock();
});

function initNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  toggle?.addEventListener('click', () => {
    links?.classList.toggle('open');
  });
  links?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
    });
  });
}

function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => observer.observe(el));
}

function initTypewriter() {
  const el = document.getElementById('typed');
  if (!el) return;

  const phrases = el.dataset.phrases
    ? JSON.parse(el.dataset.phrases)
    : ['sharp, direct, autonomous.'];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let pauseTimer = 0;

  function type() {
    const current = phrases[phraseIndex];

    if (pauseTimer > 0) {
      pauseTimer--;
      setTimeout(type, 80);
      return;
    }

    if (!deleting) {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        pauseTimer = 25;
        deleting = true;
      }
      setTimeout(type, 45 + Math.random() * 35);
    } else {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        pauseTimer = 8;
      }
      setTimeout(type, 25 + Math.random() * 15);
    }
  }

  type();
}

function initClock() {
  const clock = document.getElementById('clock');
  if (!clock) return;

  function update() {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString('en-GB', {
      timeZone: 'Europe/Berlin',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }) + ' CET';
  }

  update();
  setInterval(update, 1000);
}
