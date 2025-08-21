// ===== ARQUIVO PRINCIPAL JAVASCRIPT =====

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== INICIALIZAÇÃO DOS MÓDULOS =====
    
    // Sistema de navegação
    const navigation = new Navigation();
    
    // Sistema de formulários
    const formHandler = new FormHandler();
    
    // Sistema de animações
    const animationManager = new AnimationManager();
    const cssAnimationManager = new CSSAnimationManager();
    
    // ===== FUNCIONALIDADES ADICIONAIS =====
    
    // Melhorias de acessibilidade
    setupAccessibility();
    
    // Lazy loading para imagens
    setupLazyLoading();
    
    // Preloader
    setupPreloader();
    
    // Melhorias de performance
    setupPerformanceOptimizations();
    
    // ===== CONFIGURAÇÕES DE ACESSIBILIDADE =====
    
    function setupAccessibility() {
        // Adiciona atributos ARIA para melhor acessibilidade
        const buttons = document.querySelectorAll('button, .btn');
        buttons.forEach((button) => {
            if (!button.getAttribute('aria-label')) {
                const text = button.textContent.trim();
                if (text) {
                    button.setAttribute('aria-label', text);
                }
            }
        });
        
        // Adiciona suporte para navegação por teclado em cards
        const interactiveCards = document.querySelectorAll('.service-card, .feature, .use-case-card');
        interactiveCards.forEach(card => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
        
        // Navegação por teclado global
        document.addEventListener('keydown', function(e) {
            // Fecha notificações com Escape
            if (e.key === 'Escape') {
                const notifications = document.querySelectorAll('.notification');
                notifications.forEach(notification => notification.remove());
            }
        });
    }
    
    // ===== LAZY LOADING =====
    
    function setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    // ===== PRELOADER =====
    
    function setupPreloader() {
        window.addEventListener('load', function() {
            const preloader = document.querySelector('.preloader');
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // ===== OTIMIZAÇÕES DE PERFORMANCE =====
    
    function setupPerformanceOptimizations() {
        // Debounce para eventos de scroll
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                // Executa código de scroll otimizado
                handleScrollOptimized();
            }, 16); // ~60fps
        });
        
        // Throttle para eventos de resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(() => {
                handleResizeOptimized();
            }, 250);
        });
    }
    
    function handleScrollOptimized() {
        // Código otimizado para scroll
        const scrollY = window.pageYOffset;
        
        // Atualiza elementos que dependem do scroll
        updateScrollDependentElements(scrollY);
    }
    
    function handleResizeOptimized() {
        // Código otimizado para resize
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Atualiza elementos que dependem do viewport
        updateViewportDependentElements(viewportWidth, viewportHeight);
    }
    
    function updateScrollDependentElements(scrollY) {
        // Atualiza elementos baseados no scroll
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    function updateViewportDependentElements(width, height) {
        // Atualiza elementos baseados no viewport
        const responsiveElements = document.querySelectorAll('[data-responsive]');
        responsiveElements.forEach(element => {
            if (width < 768) {
                element.classList.add('mobile');
                element.classList.remove('tablet', 'desktop');
            } else if (width < 1200) {
                element.classList.add('tablet');
                element.classList.remove('mobile', 'desktop');
            } else {
                element.classList.add('desktop');
                element.classList.remove('mobile', 'tablet');
            }
        });
    }
    
    // ===== FUNCIONALIDADES ESPECÍFICAS DO SITE =====
    
    // Contador de estatísticas (opcional)
    setupStatisticsCounters();
    
    // Sistema de depoimentos (opcional)
    setupTestimonials();
    
    // Sistema de FAQ (opcional)
    setupFAQ();
    
    function setupStatisticsCounters() {
        const counters = document.querySelectorAll('[data-counter]');
        if (counters.length > 0) {
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = parseInt(counter.dataset.counter);
                        animationManager.animateCounter(counter, target);
                        counterObserver.unobserve(counter);
                    }
                });
            });
            
            counters.forEach(counter => counterObserver.observe(counter));
        }
    }
    
    function setupTestimonials() {
        const testimonialContainer = document.querySelector('.testimonials-container');
        if (testimonialContainer) {
            // Sistema de carrossel de depoimentos
            let currentIndex = 0;
            const testimonials = testimonialContainer.querySelectorAll('.testimonial');
            const total = testimonials.length;
            
            if (total > 1) {
                setInterval(() => {
                    testimonials[currentIndex].classList.remove('active');
                    currentIndex = (currentIndex + 1) % total;
                    testimonials[currentIndex].classList.add('active');
                }, 5000);
            }
        }
    }
    
    function setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (question && answer) {
                question.addEventListener('click', () => {
                    const isOpen = item.classList.contains('open');
                    
                    // Fecha todos os outros itens
                    faqItems.forEach(otherItem => {
                        otherItem.classList.remove('open');
                    });
                    
                    // Abre/fecha o item atual
                    if (!isOpen) {
                        item.classList.add('open');
                    }
                });
            }
        });
    }
    
    // ===== MELHORIAS DE UX =====
    
    // Adiciona classe para dispositivos touch
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
    
    // Adiciona classe para dispositivos com hover
    if (window.matchMedia('(hover: hover)').matches) {
        document.body.classList.add('hover-device');
    }
    
    // ===== TRATAMENTO DE ERROS =====
    
    window.addEventListener('error', function(e) {
        console.error('Erro JavaScript:', e.error);
        // Aqui você pode enviar o erro para um serviço de monitoramento
    });
    
    // ===== INICIALIZAÇÃO COMPLETA =====
    
    console.log('Site do Espaço Terapêutico Ponto Integrado carregado com sucesso!');
    
    // Dispara evento de inicialização completa
    window.dispatchEvent(new CustomEvent('siteReady'));
});

// ===== POLYFILLS E COMPATIBILIDADE =====

// Polyfill para IntersectionObserver
if (!('IntersectionObserver' in window)) {
    // Carrega polyfill se necessário
    const script = document.createElement('script');
    script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
    document.head.appendChild(script);
}

// Polyfill para smooth scroll
if (!('scrollBehavior' in document.documentElement.style)) {
    // Aplica polyfill customizado
    const smoothScrollPolyfill = function(target, duration = 1000) {
        const targetPosition = target.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    };
    
    // Aplica o polyfill aos links internos
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    smoothScrollPolyfill(target, 1000);
                }
            });
        });
    });
} 