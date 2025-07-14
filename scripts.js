 document.querySelectorAll('.category-pill').forEach(pill => {
            pill.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all pills
                document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked pill
                this.classList.add('active');
                
                // Smooth scroll to section
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const navHeight = document.querySelector('.category-nav').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - navHeight - 10;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Update active pill on scroll
        window.addEventListener('scroll', function() {
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