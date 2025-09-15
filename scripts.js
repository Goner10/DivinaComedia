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



  
  // === Carrusel galería (scroll nativo + snap) ===
  const track = document.querySelector('.carousel-track');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.carousel-arrow--prev');
  const nextBtn = document.querySelector('.carousel-arrow--next');
  let currentIndex = 0;

  if (track && indicators.length) {
    const getSlideWidth = () => track.clientWidth; // cada slide ocupa 100%
    let isAnimating = false;
    let animationTimeout;
    let isUserInteracting = false;
    let resumeTimeout;
    const AUTO_INTERVAL = 3500;

    const scrollToIndex = (index) => {
      if (isAnimating) return;
      isAnimating = true;
      const slideWidth = getSlideWidth();
      track.scrollTo({ left: index * slideWidth, behavior: 'smooth' });
      updateIndicators(index);
      clearTimeout(animationTimeout);
      animationTimeout = setTimeout(() => { isAnimating = false; }, 420);
    };

    const updateIndicators = (activeIdx) => {
      indicators.forEach((dot, i) => dot.classList.toggle('active', i === activeIdx));
      currentIndex = activeIdx;
    };

    // Clic en indicadores
    indicators.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        scrollToIndex(i);
      });
    });

    // Sincronizar al hacer scroll manual (incluye iOS swipe)
    let scrollTimeout;
    const onScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const slideWidth = getSlideWidth();
        const index = Math.round(track.scrollLeft / slideWidth);
        updateIndicators(index);
      }, 80);
    };
    track.addEventListener('scroll', onScroll, { passive: true });

    // Auto-slide usando scroll con pausa inteligente
    let autoSlide = setInterval(() => {
      if (!isUserInteracting) {
        const next = (currentIndex + 1) % indicators.length;
        scrollToIndex(next);
      }
    }, AUTO_INTERVAL);

    // Pausar auto-slide en interacción táctil/ratón
    const pause = () => { isUserInteracting = true; clearInterval(autoSlide); clearTimeout(resumeTimeout); };
    const resume = () => {
      clearInterval(autoSlide);
      clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        isUserInteracting = false;
        autoSlide = setInterval(() => {
          if (!isUserInteracting) {
            const next = (currentIndex + 1) % indicators.length;
            scrollToIndex(next);
          }
        }, AUTO_INTERVAL);
      }, 1200);
    };
    track.addEventListener('touchstart', pause, { passive: true });
    track.addEventListener('touchend', resume, { passive: true });
    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', resume);

    // Flechas (solo si existen)
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        const prev = (currentIndex - 1 + indicators.length) % indicators.length;
        scrollToIndex(prev);
      });
      nextBtn.addEventListener('click', () => {
        const next = (currentIndex + 1) % indicators.length;
        scrollToIndex(next);
      });
    }

    // Ajuste al redimensionar
    window.addEventListener('resize', () => scrollToIndex(currentIndex));
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