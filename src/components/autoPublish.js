// Auto-Publishing Component
class AutoPublish {
    constructor() {
        this.publishBtn = document.getElementById('publish-btn');
        this.isPublishing = false;
        this.publishedPages = this.loadPublishedPages();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupLanguageListener();
    }

    setupEventListeners() {
        this.publishBtn.addEventListener('click', () => {
            this.publishPage();
        });

        // Listen for content changes to enable/disable publish button
        window.addEventListener('editorContentChanged', () => {
            this.updatePublishButtonState();
        });

        window.addEventListener('previewUpdated', () => {
            this.updatePublishButtonState();
        });
    }

    setupLanguageListener() {
        window.addEventListener('languageChanged', () => {
            this.updatePublishButtonText();
        });
    }

    updatePublishButtonText() {
        if (this.publishBtn && !this.isPublishing) {
            this.publishBtn.textContent = this.getTranslation('publish');
        }
    }

    updatePublishButtonState() {
        if (!this.publishBtn) return;

        const hasContent = window.richTextEditor && window.richTextEditor.getContent().trim() !== '';
        
        if (hasContent && !this.isPublishing) {
            this.publishBtn.disabled = false;
            this.publishBtn.classList.remove('disabled');
        } else if (!this.isPublishing) {
            this.publishBtn.disabled = true;
            this.publishBtn.classList.add('disabled');
        }
    }

    async publishPage() {
        if (this.isPublishing) return;

        try {
            this.setPublishing(true);
            
            // Get content from preview component
            const previewData = window.dynamicPreview ? window.dynamicPreview.exportPreview() : null;
            
            if (!previewData || !previewData.html.trim()) {
                throw new Error('Nenhum conteúdo para publicar');
            }

            // Generate unique page data
            const pageData = await this.generatePageData(previewData);
            
            // Simulate publishing process (in a real implementation, this would send to a server)
            const publishResult = await this.simulatePublishing(pageData);
            
            if (publishResult.success) {
                this.savePublishedPage(publishResult.page);
                this.showPublishSuccess(publishResult.page);
            } else {
                throw new Error(publishResult.error || 'Erro desconhecido ao publicar');
            }

        } catch (error) {
            console.error('Erro ao publicar:', error);
            this.showPublishError(error.message);
        } finally {
            this.setPublishing(false);
        }
    }

    async generatePageData(previewData) {
        const pageId = this.generateUniqueId();
        const timestamp = new Date().toISOString();
        
        // Get additional data from other components
        const templateData = window.templateSelector ? window.templateSelector.getSelectedTemplate() : null;
        const imagesData = window.imageUpload ? window.imageUpload.getImages() : [];
        
        return {
            id: pageId,
            title: this.extractTitle(previewData.html) || 'Página sem título',
            content: previewData.html,
            rawContent: previewData.rawContent,
            url: this.generatePageUrl(pageId),
            createdAt: timestamp,
            updatedAt: timestamp,
            wordCount: previewData.wordCount,
            readingTime: previewData.readingTime,
            template: templateData,
            images: imagesData.length,
            language: window.languageSelector ? window.languageSelector.getCurrentLanguage() : 'pt-BR',
            metadata: {
                generator: 'Magic Page Wiz',
                version: '1.0.0'
            }
        };
    }

    async simulatePublishing(pageData) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate occasional failures (5% chance)
        if (Math.random() < 0.05) {
            return {
                success: false,
                error: 'Erro de rede. Tente novamente.'
            };
        }

        // Create the published page HTML
        const publishedHTML = this.createPublishedPageHTML(pageData);
        
        // In a real implementation, this would be saved to a server
        // For demo purposes, we'll save to localStorage and create a blob URL
        const blob = new Blob([publishedHTML], { type: 'text/html' });
        const blobUrl = URL.createObjectURL(blob);
        
        return {
            success: true,
            page: {
                ...pageData,
                blobUrl: blobUrl, // For demo purposes
                publishedAt: new Date().toISOString()
            }
        };
    }

    createPublishedPageHTML(pageData) {
        return `<!DOCTYPE html>
<html lang="${pageData.language}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageData.title}</title>
    <meta name="description" content="Página criada com Magic Page Wiz">
    <meta name="generator" content="Magic Page Wiz v${pageData.metadata.version}">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .page-container {
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1, h2, h3, h4, h5, h6 {
            color: #2c3e50;
            margin-top: 30px;
            margin-bottom: 15px;
        }
        h1 { font-size: 2.5rem; text-align: center; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
        h2 { font-size: 2rem; color: #3498db; }
        h3 { font-size: 1.5rem; }
        p { margin-bottom: 15px; }
        img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            margin: 20px 0;
        }
        a {
            color: #3498db;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #f8f9fa;
            font-weight: bold;
        }
        ul, ol {
            margin-left: 20px;
            margin-bottom: 15px;
        }
        li {
            margin-bottom: 5px;
        }
        .page-footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: center;
            color: #666;
            font-size: 0.9rem;
        }
        .stats {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 10px;
            font-size: 0.8rem;
        }
    </style>
</head>
<body>
    <div class="page-container">
        ${pageData.content}
        
        <div class="page-footer">
            <div class="stats">
                <span>📖 ${pageData.wordCount} palavras</span>
                <span>⏱️ ${pageData.readingTime} min de leitura</span>
                <span>📅 ${new Date(pageData.createdAt).toLocaleDateString('pt-BR')}</span>
            </div>
            <p>Página criada com <strong>Magic Page Wiz</strong></p>
        </div>
    </div>
</body>
</html>`;
    }

    extractTitle(html) {
        const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
        if (h1Match) {
            return h1Match[1].replace(/<[^>]*>/g, '').trim();
        }
        
        const firstHeading = html.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/i);
        if (firstHeading) {
            return firstHeading[1].replace(/<[^>]*>/g, '').trim();
        }
        
        return null;
    }

    generateUniqueId() {
        return 'page_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
    }

    generatePageUrl(pageId) {
        // In a real implementation, this would be a real URL
        const baseUrl = 'https://magicpagewiz.com/pages/';
        return baseUrl + pageId;
    }

    setPublishing(isPublishing) {
        this.isPublishing = isPublishing;
        
        if (isPublishing) {
            this.publishBtn.disabled = true;
            this.publishBtn.textContent = 'Publicando...';
            this.publishBtn.classList.add('loading');
        } else {
            this.publishBtn.disabled = false;
            this.publishBtn.textContent = this.getTranslation('publish');
            this.publishBtn.classList.remove('loading');
            this.updatePublishButtonState();
        }
    }

    showPublishSuccess(page) {
        // Create success modal/notification
        const modal = this.createModal(`
            <div class="publish-success">
                <h3>✅ ${this.getTranslation('publishSuccess')}</h3>
                <p><strong>Título:</strong> ${page.title}</p>
                <p><strong>URL:</strong> <a href="${page.blobUrl}" target="_blank">${page.url}</a></p>
                <p><strong>Palavras:</strong> ${page.wordCount}</p>
                <p><strong>Tempo de leitura:</strong> ${page.readingTime} minutos</p>
                <div class="modal-actions">
                    <button onclick="window.open('${page.blobUrl}', '_blank')" class="btn-primary">
                        Ver Página
                    </button>
                    <button onclick="navigator.clipboard.writeText('${page.url}')" class="btn-secondary">
                        Copiar URL
                    </button>
                    <button onclick="this.closest('.modal-overlay').remove()" class="btn-close">
                        Fechar
                    </button>
                </div>
            </div>
        `);
        
        document.body.appendChild(modal);
    }

    showPublishError(errorMessage) {
        const modal = this.createModal(`
            <div class="publish-error">
                <h3>❌ ${this.getTranslation('publishError')}</h3>
                <p>${errorMessage}</p>
                <div class="modal-actions">
                    <button onclick="this.closest('.modal-overlay').remove()" class="btn-close">
                        Fechar
                    </button>
                </div>
            </div>
        `);
        
        document.body.appendChild(modal);
    }

    createModal(content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal">
                ${content}
            </div>
        `;
        
        // Add modal styles if not exists
        if (!document.querySelector('#modal-styles')) {
            const styles = document.createElement('style');
            styles.id = 'modal-styles';
            styles.textContent = `
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .modal {
                    background: white;
                    padding: 30px;
                    border-radius: 8px;
                    max-width: 500px;
                    width: 90%;
                    text-align: center;
                }
                .modal h3 {
                    margin-bottom: 20px;
                    color: #333;
                }
                .modal p {
                    margin-bottom: 15px;
                    text-align: left;
                }
                .modal-actions {
                    margin-top: 25px;
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                .modal-actions button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                }
                .btn-primary {
                    background: #4a90e2;
                    color: white;
                }
                .btn-secondary {
                    background: #6c757d;
                    color: white;
                }
                .btn-close {
                    background: #dc3545;
                    color: white;
                }
                .modal-actions button:hover {
                    opacity: 0.8;
                }
            `;
            document.head.appendChild(styles);
        }
        
        return modal;
    }

    savePublishedPage(page) {
        this.publishedPages.push(page);
        localStorage.setItem('magicPageWizPublished', JSON.stringify(this.publishedPages));
    }

    loadPublishedPages() {
        try {
            const stored = localStorage.getItem('magicPageWizPublished');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Erro ao carregar páginas publicadas:', error);
            return [];
        }
    }

    getPublishedPages() {
        return this.publishedPages;
    }

    getTranslation(key) {
        return window.languageSelector ? window.languageSelector.getTranslation(key) : key;
    }

    // Method to unpublish a page (for future enhancement)
    unpublishPage(pageId) {
        this.publishedPages = this.publishedPages.filter(page => page.id !== pageId);
        localStorage.setItem('magicPageWizPublished', JSON.stringify(this.publishedPages));
    }

    // Method to get publishing statistics
    getPublishingStats() {
        return {
            totalPages: this.publishedPages.length,
            totalWords: this.publishedPages.reduce((sum, page) => sum + page.wordCount, 0),
            averageReadingTime: this.publishedPages.length > 0 
                ? Math.round(this.publishedPages.reduce((sum, page) => sum + page.readingTime, 0) / this.publishedPages.length)
                : 0,
            lastPublished: this.publishedPages.length > 0 
                ? this.publishedPages[this.publishedPages.length - 1].publishedAt
                : null
        };
    }
}

// Initialize auto-publish when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.autoPublish = new AutoPublish();
});