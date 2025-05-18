

// Scroll Direction Tracking
let lastScrollY = window.scrollY;
let scrollDirection = 'down';

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
  lastScrollY = currentScrollY;
});

// Glow Elements Setup (ensure these are declared before used)
const glowLeft = document.querySelector('.glow-left');
const glowRight = document.querySelector('.glow-right');

// Glow Toggle on Scroll
window.addEventListener('scroll', () => {
  const halfway = document.body.scrollHeight / 2;
  const scrollPos = window.scrollY + window.innerHeight / 2;

  if (scrollPos < halfway) {
    glowLeft?.classList.add('glow-visible');
    glowRight?.classList.remove('glow-visible');
  } else {
    glowLeft?.classList.remove('glow-visible');
    glowRight?.classList.add('glow-visible');
  }
});

// Intersection Observer for Fade Motion
const fadeElements = document.querySelectorAll('.fade-motion');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const el = entry.target;

    // Remove previous visibility classes
    el.classList.remove('visible-up', 'visible-down', 'out-up', 'out-down');

    if (entry.isIntersecting) {
      el.classList.add(scrollDirection === 'down' ? 'visible-down' : 'visible-up');
    } else {
      el.classList.add(scrollDirection === 'down' ? 'out-down' : 'out-up');
    }
  });
}, {
  threshold: 0.25
});

// Observe all fade elements
fadeElements.forEach(el => observer.observe(el));

// Menu Toggle
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

// Active Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
  const top = window.scrollY;

  sections.forEach(sec => {
    const offset = sec.offsetTop - 100;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
      });

      const targetLink = document.querySelector(`header nav a[href*="${id}"]`);
      if (targetLink) targetLink.classList.add('active');
    }
  });

  // Sticky Header Toggle
  const header = document.querySelector('header');
  header?.classList.toggle('sticky', window.scrollY > 100);

  // Close mobile menu on scroll
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
});






