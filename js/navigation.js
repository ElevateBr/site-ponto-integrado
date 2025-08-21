// ===== MÓDULO DE NAVEGAÇÃO =====

class Navigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.header = document.querySelector('.header');
        this.backToTopButton = document.getElementById('backToTop');
        
        this.init();
    }
    
    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupBackToTop();
        this.setupHeaderEffects();
        this.setupKeyboardNavigation();
        this.setupActiveSectionHighlighting();
    }
    
    // Menu mobile (hamburger)
    setupMobileMenu() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
            
            // Fecha o menu ao clicar em um link
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            });
        }
    }
    
    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        
        // Previne scroll do body quando menu está aberto
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Navegação suave para links internos
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    
                    // Remove a classe active de todos os links
                    this.navLinks.forEach(navLink => {
                        navLink.classList.remove('active');
                    });
                    
                    // Adiciona a classe active ao link clicado
                    link.classList.add('active');
                    
                    this.scrollToSection(href);
                }
            });
        });
    }
    
    scrollToSection(sectionId) {
        const target = document.querySelector(sectionId);
        if (target) {
            const headerHeight = this.header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Botão "Voltar ao Topo"
    setupBackToTop() {
        if (this.backToTopButton) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    this.backToTopButton.classList.add('show');
                } else {
                    this.backToTopButton.classList.remove('show');
                }
            });
            
            this.backToTopButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    // Header com efeito de transparência no scroll
    setupHeaderEffects() {
        if (this.header) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 100) {
                    this.header.style.background = 'rgba(255, 255, 255, 0.98)';
                    this.header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
                } else {
                    this.header.style.background = 'rgba(255, 255, 255, 0.95)';
                    this.header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                }
            });
        }
    }
    
    // Destaca a seção ativa no menu durante o scroll
    setupActiveSectionHighlighting() {
        // Lista de todas as seções do site
        const sections = document.querySelectorAll('section[id]');
        
        if (sections.length === 0) return;
        
        // Função para verificar qual seção está visível
        const updateActiveSection = () => {
            const scrollPosition = window.pageYOffset + 150; // Offset para melhor detecção
            let currentSection = '';
            
            // Se estiver no topo da página, marca "Início" como ativo
            if (scrollPosition < 200) {
                currentSection = 'inicio';
            } else {
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');
                    
                    // Verifica se a seção está visível na viewport
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        currentSection = sectionId;
                    }
                });
                
                // Se chegou ao final da página, marca a última seção como ativa
                if (scrollPosition + window.innerHeight >= document.documentElement.scrollHeight) {
                    const lastSection = sections[sections.length - 1];
                    if (lastSection) {
                        currentSection = lastSection.getAttribute('id');
                    }
                }
            }
            
            // Atualiza a classe active nos links
            if (currentSection) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                const activeLink = document.querySelector(`.nav-link[href="#${currentSection}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        };
        
        // Adiciona o listener de scroll com throttling para melhor performance
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateActiveSection();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Executa uma vez para definir a seção inicial
        updateActiveSection();
    }
    
    // Navegação por teclado
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });
    }
}

// Exporta a classe para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Navigation;
} else {
    window.Navigation = Navigation;
} 