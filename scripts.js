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
  // Clic en indicadores
  indicators.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });
  });

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    indicators.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
  }

  // Auto-slide
  let autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % indicators.length;
    updateCarousel();
  }, 3000);

  // Touch (iOS y Android friendly)
  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;
  let isScrolling = false;

  // touchstart (sin preventDefault)
  track.addEventListener('touchstart', (e) => {
    clearInterval(autoSlide);
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isScrolling = false;
  }, { passive: true });

  // touchmove
  track.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
    endY = e.touches[0].clientY;

    const diffX = Math.abs(endX - startX);
    const diffY = Math.abs(endY - startY);

    if (!isScrolling) {
      isScrolling = diffY > diffX;
    }

    if (!isScrolling && diffX > 10) {
      e.preventDefault(); // bloquea scroll vertical solo si desliza horizontal
    }
  }, { passive: false });

  // touchend
  track.addEventListener('touchend', () => {
    if (startX === 0 || isScrolling) {
      autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % indicators.length;
        updateCarousel();
      }, 3000);
      return;
    }

    const diffX = endX - startX;
    const minSwipeDistance = 50;

    if (Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0) {
        currentIndex = (currentIndex - 1 + indicators.length) % indicators.length;
      } else {
        currentIndex = (currentIndex + 1) % indicators.length;
      }
      updateCarousel();
    }

    startX = startY = endX = endY = 0;

    autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % indicators.length;
      updateCarousel();
    }, 3000);
  }, { passive: false });

  // Pausa al pasar el mouse (solo desktop)
  track.addEventListener('mouseenter', () => clearInterval(autoSlide));
  track.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % indicators.length;
      updateCarousel();
    }, 3000);
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


const sectionsToAnimate = document.querySelectorAll('.bio-section, .carta2-section, .reserva-cta, .galeria-section, .info-section');

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // al entrar en viewport dispara la animación
      entry.target.classList.add('animate');
      // dejamos de observarla 
      obs.unobserve(entry.target);
    }
  });
}, {
  
  rootMargin: '0px 0px -100px 0px',
  threshold: 0
});
sectionsToAnimate.forEach(section => observer.observe(section));


}); 