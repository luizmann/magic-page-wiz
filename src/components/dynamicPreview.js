// Dynamic Preview Component
class DynamicPreview {
    constructor() {
        this.container = document.getElementById('dynamic-preview');
        this.content = '';
        this.init();
    }

    init() {
        this.createPreview();
        this.setupEventListeners();
    }

    createPreview() {
        this.container.innerHTML = `
            <div class="preview-content" id="preview-content">
                <div class="preview-placeholder">
                    <h3>Sua página aparecerá aqui</h3>
                    <p>Comece a editar para ver a pré-visualização em tempo real.</p>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Listen for editor content changes
        window.addEventListener('editorContentChanged', (e) => {
            this.updatePreview(e.detail.content);
        });

        // Listen for template changes
        window.addEventListener('templateApplied', (e) => {
            this.updatePreview(e.detail.content);
        });

        // Listen for image insertions
        window.addEventListener('imageInserted', (e) => {
            this.handleImageInsertion(e.detail);
        });
    }

    updatePreview(content) {
        const previewContent = document.getElementById('preview-content');
        this.content = content;

        if (!content || content.trim() === '' || content === '<p></p>' || content === '<p><br></p>') {
            previewContent.innerHTML = `
                <div class="preview-placeholder">
                    <h3>Sua página aparecerá aqui</h3>
                    <p>Comece a editar para ver a pré-visualização em tempo real.</p>
                </div>
            `;
            return;
        }

        // Clean and process the content for preview
        const processedContent = this.processContent(content);
        previewContent.innerHTML = processedContent;

        // Apply preview-specific styles
        this.applyPreviewStyles();
        
        // Notify that preview was updated
        this.notifyPreviewUpdated();
    }

    processContent(content) {
        // Remove contenteditable attributes and clean up the content
        let processed = content
            .replace(/contenteditable="[^"]*"/g, '')
            .replace(/data-placeholder="[^"]*"/g, '')
            .replace(/<div><br><\/div>/g, '<p></p>')
            .replace(/<div>/g, '<p>')
            .replace(/<\/div>/g, '</p>');

        // Ensure images are responsive in preview
        processed = processed.replace(/<img([^>]*)>/g, (match, attrs) => {
            if (!attrs.includes('style=')) {
                return `<img${attrs} style="max-width: 100%; height: auto;">`;
            }
            return match;
        });

        // Add target="_blank" to external links if not present
        processed = processed.replace(/<a([^>]*href="http[^"]*"[^>]*)>/g, (match, attrs) => {
            if (!attrs.includes('target=')) {
                return `<a${attrs} target="_blank">`;
            }
            return match;
        });

        return processed;
    }

    applyPreviewStyles() {
        const previewContent = document.getElementById('preview-content');
        
        // Add preview-specific classes and styles
        previewContent.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
            heading.style.marginTop = '20px';
            heading.style.marginBottom = '10px';
            heading.style.color = '#333';
        });

        previewContent.querySelectorAll('p').forEach(paragraph => {
            paragraph.style.marginBottom = '15px';
            paragraph.style.lineHeight = '1.6';
        });

        previewContent.querySelectorAll('img').forEach(img => {
            img.style.borderRadius = '4px';
            img.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            img.style.margin = '15px 0';
        });

        previewContent.querySelectorAll('table').forEach(table => {
            table.style.borderCollapse = 'collapse';
            table.style.width = '100%';
            table.style.margin = '15px 0';
        });

        previewContent.querySelectorAll('td, th').forEach(cell => {
            cell.style.padding = '12px';
            cell.style.border = '1px solid #ddd';
            cell.style.textAlign = 'left';
        });

        previewContent.querySelectorAll('th').forEach(header => {
            header.style.backgroundColor = '#f8f9fa';
            header.style.fontWeight = 'bold';
        });

        previewContent.querySelectorAll('a').forEach(link => {
            link.style.color = '#4a90e2';
            link.style.textDecoration = 'none';
        });

        previewContent.querySelectorAll('ul, ol').forEach(list => {
            list.style.marginLeft = '20px';
            list.style.marginBottom = '15px';
        });

        previewContent.querySelectorAll('li').forEach(listItem => {
            listItem.style.marginBottom = '5px';
        });
    }

    handleImageInsertion(imageData) {
        // Handle image insertion from upload component
        if (window.richTextEditor) {
            window.richTextEditor.insertImageFromFile(imageData.file);
        }
    }

    getPreviewContent() {
        return this.content;
    }

    exportPreview() {
        // Return the processed content ready for publishing
        return {
            html: this.processContent(this.content),
            rawContent: this.content,
            timestamp: new Date().toISOString(),
            wordCount: this.getWordCount(),
            readingTime: this.getReadingTime()
        };
    }

    getWordCount() {
        // Remove HTML tags and count words
        const text = this.content.replace(/<[^>]*>/g, '').trim();
        return text ? text.split(/\s+/).length : 0;
    }

    getReadingTime() {
        // Estimate reading time (average 200 words per minute)
        const wordCount = this.getWordCount();
        const minutes = Math.ceil(wordCount / 200);
        return minutes;
    }

    notifyPreviewUpdated() {
        window.dispatchEvent(new CustomEvent('previewUpdated', {
            detail: {
                content: this.content,
                wordCount: this.getWordCount(),
                readingTime: this.getReadingTime()
            }
        }));
    }

    // Method to capture preview as image (for future enhancement)
    async capturePreview() {
        try {
            // This would require html2canvas library for full implementation
            // For now, return a placeholder
            return {
                success: false,
                message: 'Preview capture feature coming soon'
            };
        } catch (error) {
            console.error('Error capturing preview:', error);
            return {
                success: false,
                message: 'Error capturing preview'
            };
        }
    }

    // Method to refresh preview
    refresh() {
        if (window.richTextEditor) {
            const content = window.richTextEditor.getContent();
            this.updatePreview(content);
        }
    }

    // Method to clear preview
    clear() {
        this.updatePreview('');
    }
}

// Initialize dynamic preview when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dynamicPreview = new DynamicPreview();
});