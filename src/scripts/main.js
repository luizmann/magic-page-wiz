// Main Magic Page Wiz Application
class MagicPageWiz {
    constructor() {
        this.components = {};
        this.isInitialized = false;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeApp();
            });
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        console.log('🎉 Inicializando Magic Page Wiz...');
        
        // Wait a bit for all component scripts to load
        setTimeout(() => {
            this.registerComponents();
            this.setupGlobalEventListeners();
            this.showWelcomeMessage();
            this.isInitialized = true;
            console.log('✅ Magic Page Wiz inicializado com sucesso!');
        }, 100);
    }

    registerComponents() {
        // Register all components
        this.components = {
            languageSelector: window.languageSelector,
            dragDropArea: window.dragDropArea,
            richTextEditor: window.richTextEditor,
            dynamicPreview: window.dynamicPreview,
            templateSelector: window.templateSelector,
            imageUpload: window.imageUpload,
            autoPublish: window.autoPublish
        };

        // Check which components loaded successfully
        Object.entries(this.components).forEach(([name, component]) => {
            if (component) {
                console.log(`✅ Componente ${name} carregado`);
            } else {
                console.warn(`⚠️ Componente ${name} não foi carregado`);
            }
        });
    }

    setupGlobalEventListeners() {
        // Listen for keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleGlobalKeyboardShortcuts(e);
        });

        // Listen for component interactions
        this.setupComponentCommunication();

        // Listen for browser events
        window.addEventListener('beforeunload', (e) => {
            this.handleBeforeUnload(e);
        });

        // Handle errors
        window.addEventListener('error', (e) => {
            this.handleError(e);
        });
    }

    setupComponentCommunication() {
        // File upload to editor integration
        window.addEventListener('imageUploaded', (e) => {
            console.log('📷 Nova imagem carregada:', e.detail.image.name);
        });

        // Template selection updates
        window.addEventListener('templateApplied', (e) => {
            console.log('📄 Template aplicado:', e.detail.templateName);
            this.showNotification(`Template "${e.detail.templateName}" aplicado com sucesso!`, 'success');
        });

        // Content change notifications
        window.addEventListener('editorContentChanged', (e) => {
            // Auto-save functionality could be added here
            this.handleContentChange(e.detail.content);
        });

        // Preview updates
        window.addEventListener('previewUpdated', (e) => {
            this.updateStats(e.detail);
        });

        // Language changes
        window.addEventListener('languageChanged', (e) => {
            console.log('🌍 Idioma alterado para:', e.detail.language);
            this.showNotification('Idioma alterado com sucesso!', 'success');
        });

        // Files changed
        window.addEventListener('filesChanged', (e) => {
            console.log('📁 Arquivos atualizados:', e.detail.files.length, 'arquivos');
        });
    }

    handleGlobalKeyboardShortcuts(e) {
        // Ctrl/Cmd + S: Save (could trigger auto-save or export)
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            this.saveProject();
        }

        // Ctrl/Cmd + P: Publish
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            if (this.components.autoPublish) {
                this.components.autoPublish.publishPage();
            }
        }

        // Ctrl/Cmd + N: New page (reset)
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            this.newPage();
        }

        // Esc: Close modals
        if (e.key === 'Escape') {
            this.closeModals();
        }
    }

    handleContentChange(content) {
        // Could implement auto-save here
        // For now, just update local storage periodically
        clearTimeout(this.autoSaveTimeout);
        this.autoSaveTimeout = setTimeout(() => {
            this.autoSave(content);
        }, 2000);
    }

    autoSave(content) {
        try {
            const saveData = {
                content: content,
                timestamp: new Date().toISOString(),
                language: this.components.languageSelector?.getCurrentLanguage(),
                template: this.components.templateSelector?.getSelectedTemplate()
            };
            
            localStorage.setItem('magicPageWizAutoSave', JSON.stringify(saveData));
            console.log('💾 Auto-save realizado');
        } catch (error) {
            console.error('Erro no auto-save:', error);
        }
    }

    saveProject() {
        try {
            const projectData = {
                content: this.components.richTextEditor?.getContent(),
                template: this.components.templateSelector?.getSelectedTemplate(),
                images: this.components.imageUpload?.getImages(),
                files: this.components.dragDropArea?.getFiles(),
                language: this.components.languageSelector?.getCurrentLanguage(),
                savedAt: new Date().toISOString()
            };

            const dataStr = JSON.stringify(projectData, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `magic-page-wiz-project-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showNotification('Projeto salvo com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao salvar projeto:', error);
            this.showNotification('Erro ao salvar projeto', 'error');
        }
    }

    newPage() {
        if (confirm('Tem certeza que deseja criar uma nova página? O conteúdo atual será perdido.')) {
            // Clear all components
            if (this.components.richTextEditor) {
                this.components.richTextEditor.clear();
            }
            if (this.components.dragDropArea) {
                this.components.dragDropArea.clearFiles();
            }
            if (this.components.imageUpload) {
                this.components.imageUpload.clearImages();
            }
            if (this.components.dynamicPreview) {
                this.components.dynamicPreview.clear();
            }

            this.showNotification('Nova página criada!', 'success');
        }
    }

    updateStats(previewData) {
        // Update any stats display (could be added to UI)
        this.currentStats = {
            wordCount: previewData.wordCount,
            readingTime: previewData.readingTime,
            lastUpdated: new Date()
        };
    }

    showWelcomeMessage() {
        // Show a welcome notification
        setTimeout(() => {
            this.showNotification('Bem-vindo ao Magic Page Wiz! Comece escolhendo um template.', 'info', 5000);
        }, 1000);
    }

    showNotification(message, type = 'info', duration = 3000) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add notification styles if not exists
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 15px 20px;
                    border-radius: 5px;
                    color: white;
                    font-weight: bold;
                    z-index: 1001;
                    max-width: 300px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                    opacity: 0;
                    transform: translateX(100%);
                    transition: all 0.3s ease;
                }
                .notification.show {
                    opacity: 1;
                    transform: translateX(0);
                }
                .notification-success { background: #28a745; }
                .notification-error { background: #dc3545; }
                .notification-warning { background: #ffc107; color: #333; }
                .notification-info { background: #17a2b8; }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove after duration
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
    }

    closeModals() {
        // Close any open modals
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.remove();
        });
    }

    handleBeforeUnload(e) {
        // Warn user if they have unsaved content
        if (this.components.richTextEditor) {
            const content = this.components.richTextEditor.getContent();
            if (content && content.trim() !== '' && content !== '<p></p>') {
                e.preventDefault();
                e.returnValue = 'Você tem conteúdo não salvo. Tem certeza que deseja sair?';
                return e.returnValue;
            }
        }
    }

    handleError(e) {
        console.error('Erro na aplicação:', e.error);
        this.showNotification('Ocorreu um erro inesperado', 'error');
    }

    // Public API methods
    getStats() {
        return this.currentStats;
    }

    getComponents() {
        return this.components;
    }

    isReady() {
        return this.isInitialized;
    }

    // Load project from file
    loadProject(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const projectData = JSON.parse(e.target.result);
                this.restoreProject(projectData);
                this.showNotification('Projeto carregado com sucesso!', 'success');
            } catch (error) {
                console.error('Erro ao carregar projeto:', error);
                this.showNotification('Erro ao carregar projeto', 'error');
            }
        };
        reader.readAsText(file);
    }

    restoreProject(projectData) {
        // Restore content to components
        if (projectData.content && this.components.richTextEditor) {
            this.components.richTextEditor.setContent(projectData.content);
        }
        
        if (projectData.template && this.components.templateSelector) {
            this.components.templateSelector.selectTemplate(projectData.template);
        }
        
        if (projectData.language && this.components.languageSelector) {
            this.components.languageSelector.changeLanguage(projectData.language);
        }
    }

    // Check for auto-saved content
    checkAutoSave() {
        try {
            const autoSave = localStorage.getItem('magicPageWizAutoSave');
            if (autoSave) {
                const saveData = JSON.parse(autoSave);
                const saveDate = new Date(saveData.timestamp);
                const now = new Date();
                const hoursDiff = (now - saveDate) / (1000 * 60 * 60);
                
                if (hoursDiff < 24) { // Only restore if less than 24 hours old
                    if (confirm(`Foi encontrado um rascunho salvo automaticamente em ${saveDate.toLocaleString('pt-BR')}. Deseja restaurá-lo?`)) {
                        this.restoreProject(saveData);
                    }
                }
            }
        } catch (error) {
            console.error('Erro ao verificar auto-save:', error);
        }
    }
}

// Initialize the application
window.magicPageWiz = new MagicPageWiz();

// Check for auto-saved content after initialization
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.magicPageWiz) {
            window.magicPageWiz.checkAutoSave();
        }
    }, 2000);
});
