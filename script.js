/**
 * ROKY — Portfolio Site
 * script.js — vanilla JS: nav, lightbox, scroll reveal
 */

'use strict';

/* ============================================================
   1. Navigation
   ============================================================ */
(function initNav() {
  const nav        = document.getElementById('nav');
  const toggle     = document.getElementById('navToggle');
  const links      = document.getElementById('navLinks');
  const navLinks   = links.querySelectorAll('.nav__link');

  // --- Scrolled state ---
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  // --- Mobile toggle ---
  toggle.addEventListener('click', function () {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    links.classList.toggle('open', !expanded);
  });

  // Close menu when a link is clicked
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      toggle.setAttribute('aria-expanded', 'false');
      links.classList.remove('open');
    });
  });

  // --- Active link on scroll ---
  const sections = ['hero', 'works', 'about', 'contact'].map(function (id) {
    return document.getElementById(id);
  }).filter(Boolean);

  const linkMap = {};
  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      linkMap[href.slice(1)] = link;
    }
  });

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Remove active from all
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          // Add to matching
          const link = linkMap[entry.target.id];
          if (link) link.classList.add('active');
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(function (s) { sectionObserver.observe(s); });
})();


/* ============================================================
   2. Scroll Reveal
   ============================================================ */
(function initReveal() {
  // Add reveal class to elements that should animate in
  const targets = document.querySelectorAll(
    '.section__header, .gallery__item, .about__portrait, .about__text, .contact__body'
  );

  targets.forEach(function (el) {
    el.classList.add('reveal');
  });

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(function (el) {
    revealObserver.observe(el);
  });
})();


/* ============================================================
   3. Lightbox
   ============================================================ */
(function initLightbox() {
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lightboxImg');
  const lbTitle    = document.getElementById('lightboxTitle');
  const lbMeta     = document.getElementById('lightboxMeta');
  const lbClose    = document.getElementById('lightboxClose');
  const lbPrev     = document.getElementById('lightboxPrev');
  const lbNext     = document.getElementById('lightboxNext');
  const lbBackdrop = document.getElementById('lightboxBackdrop');

  // Collect only image-backed gallery items (exclude text-only cards)
  const items = Array.from(
    document.querySelectorAll('.gallery__item:not(.gallery__item--text)')
  );

  // Build data array from DOM
  const data = items.map(function (item) {
    const img    = item.querySelector('img');
    const title  = item.querySelector('.gallery__title');
    const year   = item.querySelector('.gallery__year');
    const medium = item.querySelector('.gallery__medium');
    return {
      src:    img    ? img.src    : '',
      alt:    img    ? img.alt    : '',
      title:  title  ? title.textContent.trim()  : '',
      year:   year   ? year.textContent.trim()   : '',
      medium: medium ? medium.textContent.trim() : '',
    };
  });

  let currentIndex = 0;
  let isOpen = false;

  // --- Open ---
  function open(index) {
    if (!data.length) return;
    currentIndex = Math.max(0, Math.min(index, data.length - 1));
    render();
    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    isOpen = true;
    lbClose.focus();
  }

  // --- Close ---
  function close() {
    lightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
    isOpen = false;
    lbImg.src = '';
  }

  // --- Navigate ---
  function prev() {
    currentIndex = (currentIndex - 1 + data.length) % data.length;
    render();
  }

  function next() {
    currentIndex = (currentIndex + 1) % data.length;
    render();
  }

  // --- Render current item ---
  function render() {
    const d = data[currentIndex];
    // Animate swap
    lbImg.style.opacity = '0';
    lbImg.style.transform = 'scale(0.97)';

    // Use a tiny timeout so CSS transition fires
    setTimeout(function () {
      lbImg.src = d.src;
      lbImg.alt = d.alt;
      lbTitle.textContent = d.title;
      lbMeta.textContent  = [d.year, d.medium].filter(Boolean).join(' — ');

      lbImg.onload = function () {
        lbImg.style.opacity = '1';
        lbImg.style.transform = '';
      };
      // Fallback if cached
      if (lbImg.complete) {
        lbImg.style.opacity = '1';
        lbImg.style.transform = '';
      }
    }, 80);

    // Prev/next visibility
    lbPrev.style.visibility = data.length > 1 ? '' : 'hidden';
    lbNext.style.visibility = data.length > 1 ? '' : 'hidden';
  }

  // --- Bind click on gallery items ---
  items.forEach(function (item, idx) {
    item.addEventListener('click', function () { open(idx); });
    // Keyboard: Enter / Space
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', 'View artwork ' + (data[idx] ? data[idx].title : ''));
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(idx);
      }
    });
  });

  // Text-only items: still keyboard accessible but don't open lightbox
  document.querySelectorAll('.gallery__item--text').forEach(function (item) {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'article');
  });

  // --- Controls ---
  lbClose.addEventListener('click', close);
  lbBackdrop.addEventListener('click', close);
  lbPrev.addEventListener('click', prev);
  lbNext.addEventListener('click', next);

  // Image transition style (set once)
  lbImg.style.transition = 'opacity 160ms ease, transform 160ms ease';

  // --- Keyboard navigation ---
  document.addEventListener('keydown', function (e) {
    if (!isOpen) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   prev();
    if (e.key === 'ArrowRight')  next();
  });

  // --- Touch / swipe support ---
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', function (e) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next();
      else        prev();
    }
  }, { passive: true });
})();


/* ============================================================
   4. Smooth scroll for anchor links (fallback for older browsers)
   ============================================================ */
(function initSmoothScroll() {
  // CSS scroll-behavior handles modern browsers.
  // This provides a JS fallback and offsets for the fixed nav.
  const NAV_HEIGHT = 56;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();


/* ============================================================
   5. Stagger gallery items on load
   ============================================================ */
(function staggerGallery() {
  // After page loads, stagger the gallery items with small delays
  const items = document.querySelectorAll('.gallery__item');
  items.forEach(function (item, i) {
    item.style.transitionDelay = (i * 35) + 'ms';
  });
})();
