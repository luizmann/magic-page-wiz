// Language Selector Component
class LanguageSelector {
    constructor() {
        this.container = document.getElementById('language-selector');
        this.currentLanguage = localStorage.getItem('magicPageWizLang') || 'pt-BR';
        this.translations = {
            'pt-BR': {
                templates: 'Templates',
                upload: 'Upload de Arquivos',
                images: 'Imagens',
                preview: 'Pré-visualização',
                publish: 'Publicar',
                dragDropText: 'Arraste arquivos aqui ou clique para selecionar',
                selectFiles: 'Selecionar Arquivos',
                imageUploadText: 'Clique ou arraste imagens aqui',
                publishSuccess: 'Página publicada com sucesso!',
                publishError: 'Erro ao publicar página',
                bold: 'Negrito',
                italic: 'Itálico',
                underline: 'Sublinhado',
                heading1: 'Título 1',
                heading2: 'Título 2',
                heading3: 'Título 3',
                link: 'Link',
                image: 'Imagem',
                table: 'Tabela'
            },
            'en-US': {
                templates: 'Templates',
                upload: 'File Upload',
                images: 'Images',
                preview: 'Preview',
                publish: 'Publish',
                dragDropText: 'Drag files here or click to select',
                selectFiles: 'Select Files',
                imageUploadText: 'Click or drag images here',
                publishSuccess: 'Page published successfully!',
                publishError: 'Error publishing page',
                bold: 'Bold',
                italic: 'Italic',
                underline: 'Underline',
                heading1: 'Heading 1',
                heading2: 'Heading 2',
                heading3: 'Heading 3',
                link: 'Link',
                image: 'Image',
                table: 'Table'
            },
            'es-ES': {
                templates: 'Plantillas',
                upload: 'Subir Archivos',
                images: 'Imágenes',
                preview: 'Vista Previa',
                publish: 'Publicar',
                dragDropText: 'Arrastra archivos aquí o haz clic para seleccionar',
                selectFiles: 'Seleccionar Archivos',
                imageUploadText: 'Haz clic o arrastra imágenes aquí',
                publishSuccess: '¡Página publicada con éxito!',
                publishError: 'Error al publicar página',
                bold: 'Negrita',
                italic: 'Cursiva',
                underline: 'Subrayado',
                heading1: 'Título 1',
                heading2: 'Título 2',
                heading3: 'Título 3',
                link: 'Enlace',
                image: 'Imagen',
                table: 'Tabla'
            }
        };
        
        this.init();
    }

    init() {
        this.createSelector();
        this.applyTranslations();
        this.setupEventListeners();
    }

    createSelector() {
        this.container.innerHTML = `
            <div class="language-selector">
                <select id="language-select">
                    <option value="pt-BR" ${this.currentLanguage === 'pt-BR' ? 'selected' : ''}>🇧🇷 Português</option>
                    <option value="en-US" ${this.currentLanguage === 'en-US' ? 'selected' : ''}>🇺🇸 English</option>
                    <option value="es-ES" ${this.currentLanguage === 'es-ES' ? 'selected' : ''}>🇪🇸 Español</option>
                </select>
            </div>
        `;
    }

    setupEventListeners() {
        const select = document.getElementById('language-select');
        select.addEventListener('change', (e) => {
            this.changeLanguage(e.target.value);
        });
    }

    changeLanguage(language) {
        this.currentLanguage = language;
        localStorage.setItem('magicPageWizLang', language);
        document.documentElement.lang = language;
        this.applyTranslations();
        
        // Dispatch custom event for other components to listen
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: language }
        }));
    }

    applyTranslations() {
        const translations = this.translations[this.currentLanguage];
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
    }

    getTranslation(key) {
        return this.translations[this.currentLanguage][key] || key;
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }
}

// Initialize language selector when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageSelector = new LanguageSelector();
});