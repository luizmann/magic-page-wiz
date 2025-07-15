// Magic Page Wiz - Internationalization (i18n)
class I18nManager {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {};
        this.supportedLanguages = ['en', 'pt', 'es', 'fr', 'de'];
        this.init();
    }

    init() {
        this.loadTranslations();
        this.setupLanguageSelector();
        this.detectUserLanguage();
    }

    loadTranslations() {
        this.translations = {
            'en': {
                // Navigation
                'builder': 'Builder',
                'ai_generator': 'AI Generator',
                'templates': 'Templates',
                'import': 'Import',
                
                // Common actions
                'save': 'Save',
                'preview': 'Preview',
                'publish': 'Publish',
                'save_as_template': 'Save as Template',
                
                // Elements
                'elements': 'Elements',
                'basic': 'Basic',
                'forms': 'Forms',
                'marketing': 'Marketing',
                'text': 'Text',
                'heading': 'Heading',
                'image': 'Image',
                'video': 'Video',
                'button': 'Button',
                'divider': 'Divider',
                'form': 'Form',
                'input': 'Input',
                'textarea': 'Textarea',
                'checkbox': 'Checkbox',
                'pricing': 'Pricing',
                'testimonial': 'Testimonial',
                'countdown': 'Countdown',
                'social': 'Social',
                
                // Properties
                'properties': 'Properties',
                'select_element': 'Select an element to edit its properties',
                
                // Canvas
                'start_building': 'Start Building Your Page',
                'drag_elements': 'Drag elements from the left panel to create your sales page',
                
                // AI Generator
                'ai_page_generator': 'AI Page Generator',
                'ai_description': 'Describe your sales page and let AI create it for you',
                'ai_prompt_placeholder': 'Describe your product, target audience, and goals...',
                'include_testimonials': 'Include testimonials',
                'include_pricing': 'Include pricing section',
                'include_countdown': 'Include countdown timer',
                'generate_page': 'Generate Page',
                'generated_structure': 'Generated Page Structure:',
                'apply_to_canvas': 'Apply to Canvas',
                
                // Templates
                'template_library': 'Template Library',
                'my_templates': 'My Templates',
                'use_template': 'Use Template',
                
                // Import
                'import_products': 'Import Products',
                'cj_dropshipping': 'CJ Dropshipping',
                'shopify_store': 'Shopify Store',
                'import_from_cj': 'Import from CJ',
                'import_from_shopify': 'Import from Shopify',
                
                // Messages
                'page_saved': 'Page saved successfully!',
                'template_saved': 'Template saved successfully!',
                'ai_page_applied': 'AI-generated page applied successfully!',
                'template_applied': 'Template applied successfully!',
                'product_imported': 'Product imported successfully!',
                'page_published': 'Page published successfully!'
            },
            
            'pt': {
                // Navigation
                'builder': 'Construtor',
                'ai_generator': 'Gerador IA',
                'templates': 'Modelos',
                'import': 'Importar',
                
                // Common actions
                'save': 'Salvar',
                'preview': 'Visualizar',
                'publish': 'Publicar',
                'save_as_template': 'Salvar como Modelo',
                
                // Elements
                'elements': 'Elementos',
                'basic': 'Básicos',
                'forms': 'Formulários',
                'marketing': 'Marketing',
                'text': 'Texto',
                'heading': 'Título',
                'image': 'Imagem',
                'video': 'Vídeo',
                'button': 'Botão',
                'divider': 'Divisor',
                'form': 'Formulário',
                'input': 'Campo',
                'textarea': 'Área de Texto',
                'checkbox': 'Checkbox',
                'pricing': 'Preços',
                'testimonial': 'Depoimento',
                'countdown': 'Contador',
                'social': 'Social',
                
                // Properties
                'properties': 'Propriedades',
                'select_element': 'Selecione um elemento para editar suas propriedades',
                
                // Canvas
                'start_building': 'Comece a Construir Sua Página',
                'drag_elements': 'Arraste elementos do painel esquerdo para criar sua página de vendas',
                
                // AI Generator
                'ai_page_generator': 'Gerador de Página IA',
                'ai_description': 'Descreva sua página de vendas e deixe a IA criá-la para você',
                'ai_prompt_placeholder': 'Descreva seu produto, público-alvo e objetivos...',
                'include_testimonials': 'Incluir depoimentos',
                'include_pricing': 'Incluir seção de preços',
                'include_countdown': 'Incluir contador regressivo',
                'generate_page': 'Gerar Página',
                'generated_structure': 'Estrutura da Página Gerada:',
                'apply_to_canvas': 'Aplicar à Tela',
                
                // Templates
                'template_library': 'Biblioteca de Modelos',
                'my_templates': 'Meus Modelos',
                'use_template': 'Usar Modelo',
                
                // Import
                'import_products': 'Importar Produtos',
                'cj_dropshipping': 'CJ Dropshipping',
                'shopify_store': 'Loja Shopify',
                'import_from_cj': 'Importar do CJ',
                'import_from_shopify': 'Importar do Shopify',
                
                // Messages
                'page_saved': 'Página salva com sucesso!',
                'template_saved': 'Modelo salvo com sucesso!',
                'ai_page_applied': 'Página gerada por IA aplicada com sucesso!',
                'template_applied': 'Modelo aplicado com sucesso!',
                'product_imported': 'Produto importado com sucesso!',
                'page_published': 'Página publicada com sucesso!'
            },
            
            'es': {
                // Navigation
                'builder': 'Constructor',
                'ai_generator': 'Generador IA',
                'templates': 'Plantillas',
                'import': 'Importar',
                
                // Common actions
                'save': 'Guardar',
                'preview': 'Vista Previa',
                'publish': 'Publicar',
                'save_as_template': 'Guardar como Plantilla',
                
                // Elements
                'elements': 'Elementos',
                'basic': 'Básicos',
                'forms': 'Formularios',
                'marketing': 'Marketing',
                'text': 'Texto',
                'heading': 'Encabezado',
                'image': 'Imagen',
                'video': 'Video',
                'button': 'Botón',
                'divider': 'Divisor',
                'form': 'Formulario',
                'input': 'Campo',
                'textarea': 'Área de Texto',
                'checkbox': 'Casilla',
                'pricing': 'Precios',
                'testimonial': 'Testimonio',
                'countdown': 'Contador',
                'social': 'Social',
                
                // Properties
                'properties': 'Propiedades',
                'select_element': 'Selecciona un elemento para editar sus propiedades',
                
                // Canvas
                'start_building': 'Comienza a Construir Tu Página',
                'drag_elements': 'Arrastra elementos del panel izquierdo para crear tu página de ventas',
                
                // AI Generator
                'ai_page_generator': 'Generador de Página IA',
                'ai_description': 'Describe tu página de ventas y deja que la IA la cree para ti',
                'ai_prompt_placeholder': 'Describe tu producto, audiencia objetivo y objetivos...',
                'include_testimonials': 'Incluir testimonios',
                'include_pricing': 'Incluir sección de precios',
                'include_countdown': 'Incluir contador regresivo',
                'generate_page': 'Generar Página',
                'generated_structure': 'Estructura de Página Generada:',
                'apply_to_canvas': 'Aplicar al Lienzo',
                
                // Templates
                'template_library': 'Biblioteca de Plantillas',
                'my_templates': 'Mis Plantillas',
                'use_template': 'Usar Plantilla',
                
                // Import
                'import_products': 'Importar Productos',
                'cj_dropshipping': 'CJ Dropshipping',
                'shopify_store': 'Tienda Shopify',
                'import_from_cj': 'Importar de CJ',
                'import_from_shopify': 'Importar de Shopify',
                
                // Messages
                'page_saved': '¡Página guardada exitosamente!',
                'template_saved': '¡Plantilla guardada exitosamente!',
                'ai_page_applied': '¡Página generada por IA aplicada exitosamente!',
                'template_applied': '¡Plantilla aplicada exitosamente!',
                'product_imported': '¡Producto importado exitosamente!',
                'page_published': '¡Página publicada exitosamente!'
            }
        };
    }

    setupLanguageSelector() {
        // Add language selector to header
        const headerRight = document.querySelector('.header-right');
        if (headerRight && !document.getElementById('language-selector')) {
            const languageSelector = document.createElement('select');
            languageSelector.id = 'language-selector';
            languageSelector.className = 'btn-secondary';
            languageSelector.style.cssText = `
                padding: 0.5rem;
                border: 1px solid #e2e8f0;
                border-radius: 4px;
                background: white;
                margin-right: 1rem;
            `;
            
            this.supportedLanguages.forEach(lang => {
                const option = document.createElement('option');
                option.value = lang;
                option.textContent = this.getLanguageName(lang);
                option.selected = lang === this.currentLanguage;
                languageSelector.appendChild(option);
            });
            
            languageSelector.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
            
            headerRight.insertBefore(languageSelector, headerRight.firstChild);
        }
    }

    getLanguageName(code) {
        const names = {
            'en': '🇺🇸 English',
            'pt': '🇧🇷 Português',
            'es': '🇪🇸 Español',
            'fr': '🇫🇷 Français',
            'de': '🇩🇪 Deutsch'
        };
        return names[code] || code;
    }

    detectUserLanguage() {
        const saved = localStorage.getItem('magic-page-wiz-language');
        if (saved && this.supportedLanguages.includes(saved)) {
            this.setLanguage(saved);
        } else {
            const browserLang = navigator.language.split('-')[0];
            if (this.supportedLanguages.includes(browserLang)) {
                this.setLanguage(browserLang);
            }
        }
    }

    setLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) return;
        
        this.currentLanguage = lang;
        localStorage.setItem('magic-page-wiz-language', lang);
        
        // Update UI
        this.updateUI();
        
        // Update language selector
        const selector = document.getElementById('language-selector');
        if (selector) {
            selector.value = lang;
        }
        
        // Update page builder settings
        if (window.pageBuilder) {
            window.pageBuilder.pageData.settings.language = lang;
        }
    }

    t(key) {
        const translation = this.translations[this.currentLanguage];
        return (translation && translation[key]) || this.translations['en'][key] || key;
    }

    updateUI() {
        // Update static text elements
        const elementsToUpdate = [
            { selector: '.elements-panel h3', key: 'elements' },
            { selector: '[data-category="basic"] h4', key: 'basic' },
            { selector: '[data-category="forms"] h4', key: 'forms' },
            { selector: '[data-category="marketing"] h4', key: 'marketing' },
            { selector: '.properties-panel h3', key: 'properties' },
            { selector: '.no-selection p', key: 'select_element' },
            { selector: '.placeholder-content h3', key: 'start_building' },
            { selector: '.placeholder-content p', key: 'drag_elements' }
        ];

        elementsToUpdate.forEach(({ selector, key }) => {
            const element = document.querySelector(selector);
            if (element) {
                element.textContent = this.t(key);
            }
        });

        // Update buttons
        const buttonsToUpdate = [
            { selector: '#preview-btn', key: 'preview' },
            { selector: '#save-btn', key: 'save' },
            { selector: '#publish-btn', key: 'publish' },
            { selector: '#save-template-btn', key: 'save_as_template' }
        ];

        buttonsToUpdate.forEach(({ selector, key }) => {
            const button = document.querySelector(selector);
            if (button) {
                const icon = button.textContent.split(' ')[0];
                button.textContent = `${icon} ${this.t(key)}`;
            }
        });

        // Update navigation
        const navButtons = [
            { selector: '[data-section="builder"]', key: 'builder', icon: '🎨' },
            { selector: '[data-section="ai"]', key: 'ai_generator', icon: '🤖' },
            { selector: '[data-section="templates"]', key: 'templates', icon: '📋' },
            { selector: '[data-section="import"]', key: 'import', icon: '📥' }
        ];

        navButtons.forEach(({ selector, key, icon }) => {
            const button = document.querySelector(selector);
            if (button) {
                button.innerHTML = `<span>${icon}</span> ${this.t(key)}`;
            }
        });

        // Update element labels
        const elementLabels = [
            { selector: '[data-element="text"] div', key: 'text' },
            { selector: '[data-element="heading"] div', key: 'heading' },
            { selector: '[data-element="image"] div', key: 'image' },
            { selector: '[data-element="video"] div', key: 'video' },
            { selector: '[data-element="button"] div', key: 'button' },
            { selector: '[data-element="divider"] div', key: 'divider' },
            { selector: '[data-element="form"] div', key: 'form' },
            { selector: '[data-element="input"] div', key: 'input' },
            { selector: '[data-element="textarea"] div', key: 'textarea' },
            { selector: '[data-element="checkbox"] div', key: 'checkbox' },
            { selector: '[data-element="pricing"] div', key: 'pricing' },
            { selector: '[data-element="testimonial"] div', key: 'testimonial' },
            { selector: '[data-element="countdown"] div', key: 'countdown' },
            { selector: '[data-element="social"] div', key: 'social' }
        ];

        elementLabels.forEach(({ selector, key }) => {
            const element = document.querySelector(selector);
            if (element) {
                element.textContent = this.t(key);
            }
        });

        // Update AI panel if visible
        const aiTitle = document.querySelector('.ai-content h2');
        if (aiTitle) {
            aiTitle.textContent = `🤖 ${this.t('ai_page_generator')}`;
        }

        const aiDescription = document.querySelector('.ai-content > p');
        if (aiDescription) {
            aiDescription.textContent = this.t('ai_description');
        }

        const aiPrompt = document.getElementById('aiPrompt');
        if (aiPrompt) {
            aiPrompt.placeholder = this.t('ai_prompt_placeholder');
        }

        // Update checkbox labels
        const checkboxLabels = [
            { id: 'includeTestimonials', key: 'include_testimonials' },
            { id: 'includePricing', key: 'include_pricing' },
            { id: 'includeCountdown', key: 'include_countdown' }
        ];

        checkboxLabels.forEach(({ id, key }) => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                const label = checkbox.parentElement;
                label.innerHTML = `<input type="checkbox" id="${id}"> ${this.t(key)}`;
            }
        });

        const generateBtn = document.getElementById('generatePage');
        if (generateBtn) {
            generateBtn.textContent = `✨ ${this.t('generate_page')}`;
        }

        const applyBtn = document.getElementById('applyGenerated');
        if (applyBtn) {
            applyBtn.textContent = this.t('apply_to_canvas');
        }
    }

    // Method to get localized messages for JavaScript alerts
    getLocalizedMessage(key) {
        return this.t(key);
    }
}

// Initialize I18n when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.builder-container')) {
        window.i18n = new I18nManager();
        console.log('🌍 Internationalization initialized successfully!');
    }
});