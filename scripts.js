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
    // Event listeners para los indicadores
    indicators.forEach((dot, i) => dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    }));

    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      indicators.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    // Auto-slide
    let autoSlide = setInterval(() => { 
      currentIndex = (currentIndex + 1) % indicators.length; 
      updateCarousel(); 
    }, 3000);

    // Variables para el manejo de touch
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    let isScrolling = false;

    // Touch events mejorados para iOS
    track.addEventListener('touchstart', (e) => {
      clearInterval(autoSlide);
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isScrolling = false;
      
      // Prevenir el comportamiento por defecto en iOS
      e.preventDefault();
    }, { passive: false });

    track.addEventListener('touchmove', (e) => {
      if (!startX || !startY) return;
      
      endX = e.touches[0].clientX;
      endY = e.touches[0].clientY;
      
      const diffX = Math.abs(endX - startX);
      const diffY = Math.abs(endY - startY);
      
      // Determinar si es scroll vertical u horizontal
      if (!isScrolling) {
        isScrolling = diffY > diffX;
      }
      
      // Si es movimiento horizontal, prevenir scroll vertical
      if (diffX > diffY && diffX > 10) {
        e.preventDefault();
      }
    }, { passive: false });

    track.addEventListener('touchend', (e) => {
      if (!startX || isScrolling) {
        // Reiniciar auto-slide
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
          // Swipe derecha (imagen anterior)
          currentIndex = (currentIndex - 1 + indicators.length) % indicators.length;
        } else {
          // Swipe izquierda (imagen siguiente)
          currentIndex = (currentIndex + 1) % indicators.length;
        }
        updateCarousel();
      }

      // Reset valores
      startX = 0;
      startY = 0;
      endX = 0;
      endY = 0;
      
      // Reiniciar auto-slide
      autoSlide = setInterval(() => { 
        currentIndex = (currentIndex + 1) % indicators.length; 
        updateCarousel(); 
      }, 3000);
      
      e.preventDefault();
    }, { passive: false });

    // Pausar auto-slide cuando el usuario interactúa
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