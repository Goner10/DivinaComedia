document.addEventListener('DOMContentLoaded', () => {

  // === Navegación de categorías (carta) ===
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

  // === Menú hamburguesa ===
  const menuBtn = document.querySelector('.menu-btn');
  const header = document.querySelector('.header');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => header.classList.toggle('menu-open'));
  }
  document.addEventListener('click', e => {
    if (header.classList.contains('menu-open') && !header.contains(e.target)) {
      header.classList.remove('menu-open');
    }
  });
  window.addEventListener('scroll', () => {
    if (header.classList.contains('menu-open')) header.classList.remove('menu-open');
    header.classList.toggle('scrolled', window.scrollY > 10);
  });

  // === Carrusel galería ===
  const track = document.querySelector('.carousel-track');
  const indicators = document.querySelectorAll('.indicator');
  let currentIndex = 0;
  if (track && indicators.length) {
    indicators.forEach((dot, i) => dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    }));
    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      indicators.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }
    let autoSlide = setInterval(() => { currentIndex = (currentIndex+1)%indicators.length; updateCarousel(); }, 4000);
    let startX = 0, endX = 0;
    track.addEventListener('touchstart', e => { clearInterval(autoSlide); startX = e.touches[0].clientX; });
    track.addEventListener('touchmove', e => endX = e.touches[0].clientX);
    track.addEventListener('touchend', () => {
      if (Math.abs(endX - startX) > 50) {
        currentIndex = endX > startX
          ? (currentIndex - 1 + indicators.length) % indicators.length
          : (currentIndex + 1) % indicators.length;
        updateCarousel();
      }
      autoSlide = setInterval(() => { currentIndex = (currentIndex+1)%indicators.length; updateCarousel(); }, 4000);
    });
  }

  // === Language toggle español/inglés ===
  const langToggleBtn = document.getElementById('lang-toggle');
  const langText      = document.getElementById('lang-text');
  if (langToggleBtn && langText) {
    function updateLangToggle() {
      const isEn = document.documentElement.lang === 'en';
      langText.textContent = isEn ? 'ES' : 'EN';
      langToggleBtn.setAttribute('aria-label', isEn ? 'Cambiar a Español' : 'Switch to English');
    }
    langToggleBtn.addEventListener('click', () => {
      const isEn = document.documentElement.lang === 'en';
      window.location.href = isEn ? 'carta.html' : 'carta-en.html';
    });
    updateLangToggle();
  }


 const bioSection = document.querySelector('.bio-section');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bioSection.classList.add('animate');
        observer.unobserve(bioSection); // solo una vez
      }
    });
  }, { threshold: 0.3 }); // anima cuando 30% visible

  observer.observe(bioSection);


}); 