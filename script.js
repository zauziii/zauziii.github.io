'use strict';

// Content, photograph, and CV links are rendered by Jekyll.
// JavaScript only enhances the mobile menu and footer year.
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
