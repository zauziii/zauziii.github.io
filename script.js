'use strict';

// The content and contact links work without JavaScript.
// Configure your own photograph and PDF in site-config.js.
const profileAssets = window.profileAssets || {};

if (profileAssets.portrait) {
  const portrait = new Image();
  portrait.alt = 'Zhi Zhou';
  portrait.width = 480;
  portrait.height = 480;
  portrait.decoding = 'async';
  portrait.style.objectPosition = profileAssets.portraitPosition || '50% 35%';
  portrait.addEventListener('load', () => {
    document.querySelector('.portrait-frame').replaceChildren(portrait);
  }, { once: true });
  // The initials remain visible if the supplied photograph cannot load.
  portrait.src = profileAssets.portrait;
}

if (profileAssets.cv) {
  document.querySelectorAll('[data-cv-link]').forEach((link) => {
    link.href = profileAssets.cv;
    link.target = '_blank';
    link.rel = 'noopener';
    link.setAttribute('aria-label', `${link.textContent.trim()} (PDF, opens in a new tab)`);
  });
  const download = document.querySelector('#cv-download');
  download.href = profileAssets.cv;
  download.download = 'Zhi_Zhou_CV.pdf';
  download.textContent = 'Download CV ↓';
  document.querySelector('#cv-status').textContent = 'Experience, education, and selected publications.';
}

const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const smallScreen = window.matchMedia('(max-width: 760px)');

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
