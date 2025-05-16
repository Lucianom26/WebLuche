// Menú hamburguesa (responsive)
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    burger.classList.remove('active');
                }
            }
        });
    });

    // Efecto scroll navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.style.boxShadow = window.scrollY > 50 ? 
                '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none';
        });
    }

    // Implementación mínima de Swiper
    if (document.querySelector('.swiper-container')) {
        class Swiper {
            constructor(selector) {
                this.container = document.querySelector(selector);
                this.slides = this.container.querySelectorAll('.swiper-slide');
                this.currentIndex = 0;
                this.init();
            }
            
            init() {
                // Navegación
                const nextBtn = this.container.querySelector('.swiper-button-next');
                const prevBtn = this.container.querySelector('.swiper-button-prev');
                
                if (nextBtn) nextBtn.addEventListener('click', () => this.next());
                if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
                
                // Autoplay
                this.interval = setInterval(() => this.next(), 3000);
                
                // Paginación
                this.setupPagination();
                this.update();
            }
            
            next() {
                this.currentIndex = (this.currentIndex + 1) % this.slides.length;
                this.update();
            }
            
            prev() {
                this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
                this.update();
            }
            
            update() {
                this.slides.forEach((slide, index) => {
                    slide.style.display = index === this.currentIndex ? 'block' : 'none';
                });
                
                // Actualizar paginación
                if (this.paginationEl) {
                    const bullets = this.paginationEl.querySelectorAll('.swiper-pagination-bullet');
                    bullets.forEach((bullet, index) => {
                        bullet.classList.toggle('active', index === this.currentIndex);
                    });
                }
            }
            
            setupPagination() {
                this.paginationEl = this.container.querySelector('.swiper-pagination');
                if (!this.paginationEl) return;
                
                this.slides.forEach((_, index) => {
                    const bullet = document.createElement('span');
                    bullet.className = `swiper-pagination-bullet ${index === 0 ? 'active' : ''}`;
                    bullet.addEventListener('click', () => {
                        this.currentIndex = index;
                        this.update();
                    });
                    this.paginationEl.appendChild(bullet);
                });
            }
        }
        
        // Inicializar
        new Swiper('.swiper-container');
    }
});