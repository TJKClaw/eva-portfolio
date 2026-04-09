/* ============================================
   EVA PORTFOLIO - Main JavaScript
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAnimations();
  initTerminalTyping();
  initCountUp();
});

function initNavigation() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 50);
  });
  toggle?.addEventListener('click', () => {
    links?.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    if (links?.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = ''; spans[1].style.opacity = '1'; spans[2].style.transform = '';
    }
  });
  links?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      const spans = toggle?.querySelectorAll('span');
      if (spans) { spans[0].style.transform = ''; spans[1].style.opacity = '1'; spans[2].style.transform = ''; }
    });
  });
}

function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => { entry.target.classList.add('visible'); }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  document.querySelectorAll('.animate-on-scroll').forEach(el => { observer.observe(el); });
}

function initTerminalTyping() {
  const terminal = document.querySelector('.terminal-body');
  if (!terminal) return;
  const lines = terminal.querySelectorAll('.terminal-line');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(10px)';
    line.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    setTimeout(() => { line.style.opacity = '1'; line.style.transform = 'translateY(0)'; }, 500 + i * 400);
  });
}

function initCountUp() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          if (!isNaN(target)) animateCount(el, target);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll('.stat-number[data-count]').forEach(el => { observer.observe(el); });
}

function animateCount(el, target) {
  let current = 0;
  const step = target / (2000 / 16);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}
