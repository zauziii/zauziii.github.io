'use strict';

// Follow the system until the visitor chooses a theme; storage is optional.
const themeToggle = document.querySelector('.theme-toggle');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
let preferredTheme;
try { preferredTheme = localStorage.getItem('zhi-theme'); } catch (_) {}
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  themeToggle.setAttribute('aria-label', label);
  themeToggle.title = label;
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#0e1d28' : '#ffffff';
}
function updateTheme() {
  applyTheme(preferredTheme === 'light' || preferredTheme === 'dark' ? preferredTheme : (systemTheme.matches ? 'dark' : 'light'));
}
themeToggle.addEventListener('click', () => {
  preferredTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(preferredTheme);
  try { localStorage.setItem('zhi-theme', preferredTheme); } catch (_) {}
});
systemTheme.addEventListener('change', updateTheme);
window.addEventListener('storage', event => {
  if (event.key !== 'zhi-theme' && event.key !== null) return;
  preferredTheme = event.newValue;
  updateTheme();
});
updateTheme();
themeToggle.hidden = false;

// Content, photograph, and CV links are rendered by Jekyll.
// JavaScript enhances navigation; content remains available in the rendered HTML.
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const smallScreen = window.matchMedia('(max-width: 48rem)');

function closeMenu(returnFocus = false) {
  mobileMenu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('span').textContent = '+';
  document.body.classList.remove('menu-open');
  if (returnFocus) menuButton.focus();
}

function updateMenuVisibility() {
  menuButton.hidden = !smallScreen.matches;
  closeMenu();
}

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  if (open) {
    closeMenu();
  } else {
    mobileMenu.hidden = false;
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.querySelector('span').textContent = '−';
    document.body.classList.add('menu-open');
  }
});

mobileMenu.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link) return;
  closeMenu();
  if (link.hash && link.hash.startsWith('#')) {
    const target = document.getElementById(link.hash.slice(1));
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
  }
});

document.addEventListener('keydown', (event) => {
  if (mobileMenu.hidden) return;
  if (event.key === 'Escape') closeMenu(true);
  if (event.key === 'Tab') {
    const links = [...mobileMenu.querySelectorAll('a')];
    const last = links[links.length - 1];
    if (event.shiftKey && document.activeElement === menuButton) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      menuButton.focus();
    }
  }
});

smallScreen.addEventListener('change', updateMenuVisibility);
updateMenuVisibility();
document.querySelector('#copyright-year').textContent = new Date().getFullYear();

// Keep both menus in sync with the section being read.
const navigationLinks = [...document.querySelectorAll('.desktop-nav a, .mobile-menu a')];
const pageSections = [...document.querySelectorAll('main > .section[id]')];
const header = document.querySelector('.site-header');
let activeSection = null;
let navigationFrame = 0;

function updateActiveSection() {
  navigationFrame = 0;
  const readingLine = header.getBoundingClientRect().height + 64;
  let current = '';
  for (const section of pageSections) {
    const heading = section.querySelector('h2');
    if (heading && heading.getBoundingClientRect().top <= readingLine) current = section.id;
  }
  if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    current = pageSections[pageSections.length - 1]?.id || current;
  }
  if (current === activeSection) return;
  activeSection = current;
  for (const link of navigationLinks) {
    if (current && link.hash === '#' + current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}

function scheduleNavigationUpdate() {
  if (!navigationFrame) navigationFrame = window.requestAnimationFrame(updateActiveSection);
}

window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
window.addEventListener('resize', scheduleNavigationUpdate);
window.addEventListener('pageshow', scheduleNavigationUpdate);
scheduleNavigationUpdate();

// Animate each below-the-fold section once, without hiding content by default.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let entranceObserver;
function setupEntrances() {
  entranceObserver?.disconnect();
  document.querySelectorAll('.reveal-enter').forEach(section => section.classList.remove('reveal-enter'));
  if (motionPreference.matches || !('IntersectionObserver' in window)) return;
  entranceObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('reveal-enter');
      entranceObserver.unobserve(entry.target);
      entry.target.addEventListener('animationend', () => entry.target.classList.remove('reveal-enter'), { once: true });
    }
  }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
  for (const section of pageSections) {
    if (section.getBoundingClientRect().top >= window.innerHeight) entranceObserver.observe(section);
  }
}
motionPreference.addEventListener('change', setupEntrances);
setupEntrances();
