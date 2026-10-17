const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  revealElements.forEach(el => observer.observe(el));
} else revealElements.forEach(el => el.classList.add('visible'));


// Subtle 3D pointer tilt for the profile card (disabled on touch devices).
const profileCard = document.querySelector('.profile-hover-card');
const profilePhoto = profileCard?.querySelector('.profile-photo');
if (profileCard && profilePhoto && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  profileCard.addEventListener('pointermove', (event) => {
    const rect = profileCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 8;
    const rotateX = (0.5 - y) * 6;
    profilePhoto.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(-7px)`;
  });
  profileCard.addEventListener('pointerleave', () => {
    profilePhoto.style.transform = '';
  });
}
