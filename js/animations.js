// ===== MÓDULO DE ANIMAÇÕES =====

class AnimationManager {
    constructor() {
        this.animatedElements = [];
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupParallaxEffects();
        this.setupTooltips();
        this.setupHoverEffects();
    }
    
    // Configuração do Intersection Observer para animações de entrada
    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateElement(entry.target);
                    }
                });
            }, this.observerOptions);
            
            // Observa elementos para animação
            const elementsToAnimate = document.querySelectorAll(
                '.service-card, .feature, .contact-item, .about-text, .about-image, ' +
                '.history-highlight, .use-case-card, .work-step'
            );
            
            elementsToAnimate.forEach(el => {
                this.observer.observe(el);
                this.animatedElements.push(el);
            });
        }
    }
    
    // Anima elemento quando entra na viewport
    animateElement(element) {
        element.classList.add('fade-in-up');
        element.classList.add('animate');
        
        // Remove da observação após animar
        if (this.observer) {
            this.observer.unobserve(element);
        }
    }
    
    // Efeitos parallax suaves
    setupParallaxEffects() {
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.3;
                hero.style.transform = `translateY(${rate}px)`;
            });
        }
    }
    
    // Sistema de tooltips
    setupTooltips() {
        const serviceCards = document.querySelectorAll('.service-card, .use-case-card');
        let currentTooltip = null;
        
        serviceCards.forEach(card => {
            const title = card.querySelector('h3');
            const description = card.querySelector('p');
            
            if (title && description) {
                title.addEventListener('mouseenter', () => {
                    this.showTooltip(title, description.textContent);
                });
                
                title.addEventListener('mouseleave', () => {
                    this.hideTooltip();
                });
            }
        });
        
        // Função para mostrar tooltip
        this.showTooltip = (element, text) => {
            this.hideTooltip();
            
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = text;
            
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            setTimeout(() => tooltip.classList.add('show'), 10);
            currentTooltip = tooltip;
        };
        
        // Função para esconder tooltip
        this.hideTooltip = () => {
            if (currentTooltip) {
                currentTooltip.remove();
                currentTooltip = null;
            }
        };
    }
    
    // Efeitos de hover aprimorados
    setupHoverEffects() {
        const cards = document.querySelectorAll('.card, .service-card, .use-case-card, .feature');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addHoverEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeHoverEffect(card);
            });
        });
    }
    
    // Adiciona efeito de hover
    addHoverEffect(element) {
        element.style.transform = 'translateY(-8px) scale(1.02)';
        element.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
    }
    
    // Remove efeito de hover
    removeHoverEffect(element) {
        element.style.transform = '';
        element.style.boxShadow = '';
    }
    
    // Animação de contador para números
    animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // Animação de loading
    showLoading(element) {
        element.innerHTML = '<span class="loading"></span>';
        element.disabled = true;
    }
    
    hideLoading(element, originalText) {
        element.innerHTML = originalText;
        element.disabled = false;
    }
    
    // Animação de scroll suave para navegadores antigos
    smoothScrollPolyfill(target, duration = 1000) {
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
    }
    
    // Verifica suporte a smooth scroll
    checkSmoothScrollSupport() {
        return 'scrollBehavior' in document.documentElement.style;
    }
    
    // Aplica polyfill se necessário
    applySmoothScrollPolyfill() {
        if (!this.checkSmoothScrollSupport()) {
            const links = document.querySelectorAll('a[href^="#"]');
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector(link.getAttribute('href'));
                    if (target) {
                        this.smoothScrollPolyfill(target);
                    }
                });
            });
        }
    }
    
    // Animação de entrada para elementos específicos
    animateOnScroll() {
        const elements = document.querySelectorAll('[data-animate]');
        
        elements.forEach(element => {
            const animationType = element.dataset.animate;
            const delay = element.dataset.delay || 0;
            
            setTimeout(() => {
                element.classList.add(animationType);
            }, delay);
        });
    }
    
    // Efeito de digitação para textos
    typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Animação de pulse para elementos
    addPulseEffect(element) {
        element.classList.add('pulse');
        
        element.addEventListener('animationend', () => {
            element.classList.remove('pulse');
        });
    }
    
    // Remove todas as animações
    clearAnimations() {
        this.animatedElements.forEach(element => {
            element.classList.remove('fade-in-up', 'animate');
        });
        
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// ===== SISTEMA DE ANIMAÇÕES CSS =====

class CSSAnimationManager {
    constructor() {
        this.animations = {
            fadeInUp: 'fadeInUp 0.6s ease-out',
            slideInRight: 'slideInRight 0.3s ease-out',
            slideInLeft: 'slideInLeft 0.3s ease-out',
            zoomIn: 'zoomIn 0.5s ease-out',
            bounce: 'bounce 0.6s ease-out'
        };
        
        this.init();
    }
    
    init() {
        this.addCSSAnimations();
    }
    
    // Adiciona animações CSS dinamicamente
    addCSSAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideInLeft {
                from {
                    transform: translateX(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes zoomIn {
                from {
                    transform: scale(0.8);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }
            
            @keyframes bounce {
                0%, 20%, 53%, 80%, 100% {
                    transform: translateY(0);
                }
                40%, 43% {
                    transform: translateY(-30px);
                }
                70% {
                    transform: translateY(-15px);
                }
                90% {
                    transform: translateY(-4px);
                }
            }
            
            .animate-fadeInUp { animation: ${this.animations.fadeInUp}; }
            .animate-slideInRight { animation: ${this.animations.slideInRight}; }
            .animate-slideInLeft { animation: ${this.animations.slideInLeft}; }
            .animate-zoomIn { animation: ${this.animations.zoomIn}; }
            .animate-bounce { animation: ${this.animations.bounce}; }
        `;
        
        document.head.appendChild(style);
    }
    
    // Aplica animação a um elemento
    applyAnimation(element, animationType, delay = 0) {
        setTimeout(() => {
            element.classList.add(`animate-${animationType}`);
        }, delay);
    }
    
    // Remove animação de um elemento
    removeAnimation(element, animationType) {
        element.classList.remove(`animate-${animationType}`);
    }
}

// ===== GERENCIADOR DA MARCA D'ÁGUA =====
class WatermarkManager {
    constructor() {
        this.watermark = document.querySelector('.watermark');
        this.init();
    }
    
    init() {
        if (this.watermark) {
            // Garante que a marca d'água seja visível
            this.watermark.style.display = 'block';
            this.watermark.style.visibility = 'visible';
        }
    }
}

// Exporta as classes para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AnimationManager, CSSAnimationManager, WatermarkManager };
} else {
    window.AnimationManager = AnimationManager;
    window.CSSAnimationManager = CSSAnimationManager;
    window.WatermarkManager = WatermarkManager;
} 