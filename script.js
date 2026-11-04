const navigationLinks = [...document.querySelectorAll('.nav-link')];
const pageSections = [...document.querySelectorAll('main section[id]')];
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

const closeMenu = () => {
  mainNav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
};

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  mainNav.classList.toggle('is-open', !isOpen);
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
});

document.querySelectorAll('.nav-link, .hire-button').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});

window.matchMedia('(min-width: 761px)').addEventListener('change', (event) => {
  if (event.matches) closeMenu();
});

const savedTheme = localStorage.getItem('portfolio-theme');
const isLightTheme = savedTheme !== 'dark';
document.body.classList.toggle('light-theme', isLightTheme);
themeToggle.setAttribute('aria-label', `Switch to ${isLightTheme ? 'dark' : 'light'} theme`);

themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-theme');
  localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
  themeToggle.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} theme`);
});

const sectionObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    navigationLinks.forEach((link) => {
      link.classList.toggle('is-active', link.hash === `#${entry.target.id}`);
    });
  }
}, { rootMargin: '-35% 0px -55% 0px' });

pageSections.forEach((section) => sectionObserver.observe(section));

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const fields = new FormData(contactForm);
  const subject = encodeURIComponent(`Portfolio enquiry from ${fields.get('name')}`);
  const body = encodeURIComponent(`${fields.get('message')}\n\nFrom: ${fields.get('name')} (${fields.get('email')})`);
  formStatus.textContent = 'Opening your email app to send this message.';
  window.location.href = `mailto:morrisuae1552@gmail.com?subject=${subject}&body=${body}`;
});

document.querySelector('#current-year').textContent = new Date().getFullYear();