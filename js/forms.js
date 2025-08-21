// ===== MÓDULO DE FORMULÁRIOS =====

class FormHandler {
    constructor() {
        this.contactForm = document.getElementById('contactForm');
        this.notificationSystem = new NotificationSystem();
        
        this.init();
    }
    
    init() {
        this.setupContactForm();
        this.setupFormValidation();
    }
    
    // Configuração do formulário de contato
    setupContactForm() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactFormSubmit();
            });
        }
    }
    
    // Validação do formulário
    setupFormValidation() {
        const inputs = this.contactForm?.querySelectorAll('input, textarea, select');
        if (inputs) {
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
                
                input.addEventListener('input', () => {
                    this.clearFieldError(input);
                });
            });
        }
    }
    
    // Validação de campo individual
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove classes de erro anteriores
        this.clearFieldError(field);
        
        // Validações específicas por tipo de campo
        switch (field.type) {
            case 'email':
                if (!value) {
                    isValid = false;
                    errorMessage = 'E-mail é obrigatório';
                } else if (!this.isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'E-mail inválido';
                }
                break;
                
            case 'text':
                if (field.id === 'name' && !value) {
                    isValid = false;
                    errorMessage = 'Nome é obrigatório';
                }
                break;
                
            case 'textarea':
                if (field.id === 'message' && !value) {
                    isValid = false;
                    errorMessage = 'Mensagem é obrigatória';
                }
                break;
        }
        
        // Aplica validação
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    // Validação de e-mail
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Mostra erro no campo
    showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove mensagem de erro anterior
        const existingError = field.parentNode.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Cria nova mensagem de erro
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }
    
    // Remove erro do campo
    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.form-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    // Validação completa do formulário
    validateForm() {
        const fields = this.contactForm.querySelectorAll('input, textarea, select');
        let isValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // Manipulação do envio do formulário
    handleContactFormSubmit() {
        if (!this.validateForm()) {
            this.notificationSystem.show('Por favor, corrija os erros no formulário.', 'error');
            return;
        }
        
        // Simula envio (em produção, aqui seria feita uma requisição AJAX)
        this.showLoadingState();
        
        setTimeout(() => {
            this.hideLoadingState();
            this.notificationSystem.show('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            this.contactForm.reset();
            this.clearAllFieldErrors();
        }, 2000);
    }
    
    // Mostra estado de carregamento
    showLoadingState() {
        const submitButton = this.contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="loading"></span> Enviando...';
        }
    }
    
    // Esconde estado de carregamento
    hideLoadingState() {
        const submitButton = this.contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Enviar Mensagem';
        }
    }
    
    // Limpa todos os erros do formulário
    clearAllFieldErrors() {
        const fields = this.contactForm.querySelectorAll('input, textarea, select');
        fields.forEach(field => {
            this.clearFieldError(field);
        });
    }
}

// ===== SISTEMA DE NOTIFICAÇÕES =====

class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.maxNotifications = 3;
    }
    
    show(message, type = 'info', duration = 5000) {
        // Remove notificações existentes se exceder o limite
        if (this.notifications.length >= this.maxNotifications) {
            this.removeOldestNotification();
        }
        
        // Cria nova notificação
        const notification = this.createNotification(message, type);
        this.notifications.push(notification);
        
        // Adiciona ao DOM
        document.body.appendChild(notification);
        
        // Anima entrada
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove automaticamente
        if (duration > 0) {
            setTimeout(() => {
                this.removeNotification(notification);
            }, duration);
        }
        
        return notification;
    }
    
    createNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const colors = {
            success: '#4CAF50',
            error: '#f44336',
            warning: '#ff9800',
            info: '#2196F3'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: ${100 + (this.notifications.length * 80)}px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            max-width: 400px;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
        `;
        
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Fechar notificação">&times;</button>
            </div>
        `;
        
        // Botão de fechar
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            this.removeNotification(notification);
        });
        
        return notification;
    }
    
    removeNotification(notification) {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                    this.notifications = this.notifications.filter(n => n !== notification);
                    this.repositionNotifications();
                }
            }, 300);
        }
    }
    
    removeOldestNotification() {
        if (this.notifications.length > 0) {
            this.removeNotification(this.notifications[0]);
        }
    }
    
    repositionNotifications() {
        this.notifications.forEach((notification, index) => {
            notification.style.top = `${100 + (index * 80)}px`;
        });
    }
    
    clearAll() {
        this.notifications.forEach(notification => {
            this.removeNotification(notification);
        });
    }
}

// Exporta as classes para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FormHandler, NotificationSystem };
} else {
    window.FormHandler = FormHandler;
    window.NotificationSystem = NotificationSystem;
} 