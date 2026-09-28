'use strict';

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
