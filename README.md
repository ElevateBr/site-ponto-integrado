# Espaço Terapêutico Ponto Integrado - Site Estático

## 📋 Descrição

Site estático profissional para o Espaço Terapêutico Ponto Integrado, especializado em Acupuntura e terapias integrativas. O site foi desenvolvido com foco em design moderno, responsividade e experiência do usuário.

## ✨ Características

- **Mobile-First**: Design otimizado para dispositivos móveis primeiro
- **Modular**: Código organizado em módulos para fácil manutenção
- **Design Responsivo**: Adapta-se perfeitamente a todos os dispositivos
- **Navegação Suave**: Scroll suave entre seções
- **Menu Mobile**: Menu hamburger para dispositivos móveis
- **Animações**: Efeitos visuais suaves e profissionais
- **Formulário de Contato**: Com validação avançada e notificações
- **Integração com WhatsApp**: Link direto para mensagens
- **Google Maps**: Integração com mapas para localização
- **Acessibilidade**: Suporte para navegação por teclado e leitores de tela
- **Performance**: Otimizado para carregamento rápido
- **SEO**: Estrutura semântica e meta tags otimizadas

## 🚀 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos modernos com Flexbox e Grid
- **JavaScript ES6+**: Funcionalidades interativas
- **Font Awesome**: Ícones profissionais
- **Google Fonts**: Tipografia elegante (Poppins + Playfair Display)

## 📁 Estrutura do Projeto

```
Site Ponto Integrado/
├── index.html              # Página principal
├── logo.jpg                # Logo da empresa
├── styles.css              # Estilos CSS principais
├── css/
│   ├── base.css            # Estilos base e variáveis CSS
│   ├── components.css      # Componentes reutilizáveis
│   └── sections.css        # Estilos específicos das seções
├── js/
│   ├── navigation.js       # Funcionalidades de navegação
│   ├── forms.js            # Sistema de formulários
│   ├── animations.js       # Sistema de animações
│   └── script.js           # Arquivo principal JavaScript
└── README.md               # Este arquivo
```

## 🎯 Seções do Site

### 1. **Header/Navegação**
- Logo da empresa (logo.jpg)
- Menu de navegação responsivo
- Menu hamburger para mobile

### 2. **Hero/Início**
- Título principal da clínica
- Descrição dos serviços
- Botões de call-to-action
- Ilustração decorativa

### 3. **Sobre Nós**
- Missão da clínica
- Abordagem terapêutica
- Diferenciais da empresa
- Características dos profissionais

### 4. **História da Acupuntura**
- Tradição milenar de 5.000 anos
- Reconhecimento pela OMS
- Fundamentos científicos modernos

### 5. **Casos de Uso**
- Alívio de dores crônicas
- Saúde mental e emocional
- Problemas respiratórios
- Saúde cardiovascular
- Saúde da mulher
- Gravidez e parto

### 6. **Como Funciona**
- Processo de 4 etapas
- Explicação científica
- Benefícios comprovados

### 7. **Serviços**
- Acupuntura Tradicional
- Moxabustão
- Tuina (Massagem Terapêutica)
- Fitoterapia Chinesa
- Terapia com Ventosas
- Avaliação Energética

### 5. **Contato**
- Informações de contato
- Formulário de mensagem
- Links para WhatsApp e e-mail
- Horário de funcionamento

### 6. **Localização**
- Endereço completo
- Instruções de como chegar
- Integração com Google Maps
- Informações de transporte público

### 7. **Footer**
- Links rápidos
- Informações de contato
- Redes sociais
- Copyright

## 🛠️ Como Usar

### 1. **Visualização Local**
```bash
# Abra o arquivo index.html em qualquer navegador moderno
# Ou use um servidor local:
python -m http.server 8000
# Acesse: http://localhost:8000
```

### 2. **Deploy em Produção**
- Faça upload dos arquivos para seu servidor web
- Certifique-se de que todos os arquivos estão na mesma pasta
- O site funcionará em qualquer servidor que suporte HTML estático

## 📱 Responsividade Mobile-First

O site foi desenvolvido seguindo a abordagem **Mobile-First**, garantindo excelente experiência em dispositivos móveis:

- **Mobile**: 320px - 767px (prioridade máxima)
- **Tablet**: 768px - 1199px
- **Desktop**: 1200px+

### Vantagens do Mobile-First:
- ✅ Carregamento mais rápido em dispositivos móveis
- ✅ Melhor SEO (Google prioriza sites mobile-friendly)
- ✅ Experiência otimizada para a maioria dos usuários
- ✅ Performance superior em conexões lentas

## 🔧 Personalização

### Estrutura Modular
O site foi organizado em módulos para facilitar a manutenção:

- **`css/base.css`**: Variáveis CSS, reset e estilos fundamentais
- **`css/components.css`**: Componentes reutilizáveis (botões, formulários, cards)
- **`css/sections.css`**: Estilos específicos de cada seção
- **`js/navigation.js`**: Funcionalidades de navegação
- **`js/forms.js`**: Sistema de formulários e validação
- **`js/animations.js`**: Sistema de animações e efeitos

### Cores Principais - Identidade Visual Ponto Integrado
```css
--primary-color: #2E7D32      /* Verde escuro - saúde e cura */
--secondary-color: #4CAF50    /* Verde médio - complementar */
--accent-color: #8BC34A      /* Verde claro - vitalidade */
--success-color: #66BB6A     /* Verde sucesso */
--info-color: #81C784        /* Verde informação */
--text-primary: #1B5E20      /* Verde escuro - profissional */
--text-secondary: #388E3C    /* Verde médio - elegante */
--bg-secondary: #F1F8E9      /* Verde muito claro */
--bg-dark: #1B5E20          /* Verde escuro - fundo */
```

**Paleta de Cores Terapêuticas:**
- **Verdes**: Representam saúde, cura, natureza e vitalidade - ideais para uma clínica de acupuntura
- **Harmonia Verde**: Cria uma identidade visual coesa e relaxante
- **Tons Naturais**: Transmitem tranquilidade e conexão com a natureza

### Fontes
- **Títulos**: Playfair Display (serif)
- **Texto**: Poppins (sans-serif)

## 📞 Informações de Contato

Para personalizar as informações de contato, edite o arquivo `index.html`:

```html
<!-- Telefone -->
<p>(11) 99999-9999</p>

<!-- WhatsApp -->
<a href="https://wa.me/5511999999999">Enviar mensagem</a>

<!-- E-mail -->
<a href="mailto:contato@pontointegrado.com.br">Enviar e-mail</a>

<!-- Endereço -->
<p>Rua das Flores, 123 - Centro</p>
<p>São Paulo - SP, 01234-567</p>
```

## 🗺️ Integração com Google Maps

Para adicionar um mapa real do Google Maps:

1. Acesse [Google Maps Platform](https://developers.google.com/maps)
2. Crie uma conta e obtenha uma API key
3. Substitua o placeholder no arquivo `index.html`:

```html
<div id="map" class="google-map">
    <iframe 
        width="100%" 
        height="100%" 
        frameborder="0" 
        style="border:0" 
        src="https://www.google.com/maps/embed/v1/place?key=SUA_API_KEY&q=Rua+das+Flores,+123,+São+Paulo,+SP"
        allowfullscreen>
    </iframe>
</div>
```

## 🎨 Personalização de Imagens

Para adicionar imagens reais:

1. Substitua os placeholders com ícones por imagens
2. Use o atributo `data-src` para lazy loading
3. Mantenha as proporções recomendadas

## 📊 SEO e Meta Tags

O site inclui:
- Meta tags para SEO
- Títulos e descrições otimizados
- Estrutura HTML semântica
- URLs amigáveis para seções

## 🚀 Performance

- CSS e JavaScript otimizados
- Lazy loading para imagens
- Animações CSS otimizadas
- Carregamento assíncrono de fontes

## 🔒 Segurança

- Validação de formulários no cliente
- Sanitização de inputs
- Proteção contra XSS básica

## 📈 Analytics (Opcional)

Para adicionar Google Analytics:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🤝 Suporte

Para dúvidas ou suporte técnico:
- Verifique a documentação
- Teste em diferentes navegadores
- Valide o HTML/CSS

## 📄 Licença

Este projeto foi desenvolvido para uso do Espaço Terapêutico Ponto Integrado.

---

**Desenvolvido com ❤️ para promover saúde e bem-estar através da Acupuntura** #   s i t e - p o n t o - i n t e g r a d o  
 