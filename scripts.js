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
    menuBtn.addEventListener('click', () => {
      header.classList.toggle('menu-open');
    });
  }

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (header.classList.contains('menu-open') && !header.contains(e.target)) {
      header.classList.remove('menu-open');
    }
  });

  // Cerrar menú al hacer scroll y efecto transparente
  window.addEventListener('scroll', () => {
    if (header.classList.contains('menu-open')) {
      header.classList.remove('menu-open');
    }
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // === Carrusel galería ===
  const track = document.querySelector('.carousel-track');
  const indicators = document.querySelectorAll('.indicator');
  let currentIndex = 0;

  if (track && indicators.length > 0) {
    indicators.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
    });

    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      indicators.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    // Auto-slide cada 4 segundos
    let autoSlide = setInterval(nextSlide, 4000);

    function nextSlide() {
      currentIndex = (currentIndex + 1) % indicators.length;
      updateCarousel();
    }

    let startX = 0;
    let endX = 0;
    const swipeThreshold = 50; 

    track.addEventListener('touchstart', (e) => {
      clearInterval(autoSlide); 
      startX = e.touches[0].clientX;
    });

    track.addEventListener('touchmove', (e) => {
      endX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', () => {
      let diff = endX - startX;
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // swipe a la derecha 
          currentIndex = (currentIndex - 1 + indicators.length) % indicators.length;
        } else {
          // swipe a la izquierda
          currentIndex = (currentIndex + 1) % indicators.length;
        }
        updateCarousel();
      }
      
      autoSlide = setInterval(nextSlide, 4000);
    });
  }




  // === Language toggle entre español e ingles ===
  const langToggleBtn = document.getElementById('lang-toggle');
  const langText = document.getElementById('lang-text');
  if (!langToggleBtn || !langText) return;

  
  function updateLangToggle() {
    const isEnglish = document.documentElement.lang === 'en';
    // Sólo cambiamos el texto dentro del <span>
    langText.textContent = isEnglish ? 'ES' : 'EN';
    // Y actualizamos el aria-label si quieres:
    langToggleBtn.setAttribute('aria-label',
      isEnglish ? 'Cambiar a Español' : 'Switch to English'
    );
  }

  langToggleBtn.addEventListener('click', () => {
    const isEnglish = document.documentElement.lang === 'en';
    window.location.href = isEnglish ? 'carta.html' : 'carta-en.html';
  });

  updateLangToggle();

});
