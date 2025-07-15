document.addEventListener('DOMContentLoaded', () => {
  // ================================
  // Interacción category-pill (carta)
  // ================================
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const navHeight = document.querySelector('.category-nav').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - navHeight - 10;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.menu-section');
    const pills = document.querySelectorAll('.category-pill');
    let currentSection = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        currentSection = section.id;
      }
    });
    pills.forEach(pill => {
      pill.classList.remove('active');
      if (pill.getAttribute('href') === `#${currentSection}`) {
        pill.classList.add('active');
      }
    });
  });

  // ================================
  // Interacción header (menú móvil)
  // ================================
  const menuBtn = document.querySelector('.menu-btn');
  const header = document.querySelector('.header');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      header.classList.toggle('menu-open');
    });
  }

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', (e) => {
    const navMenu = document.querySelector('.nav-menu');
    if (header.classList.contains('menu-open')) {
      if (!header.contains(e.target)) {
        header.classList.remove('menu-open');
      }
    }
  });

  // Cerrar menú al hacer scroll
  window.addEventListener('scroll', () => {
    if (header.classList.contains('menu-open')) {
      header.classList.remove('menu-open');
    }
    // Añadir efecto transparente al header
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});