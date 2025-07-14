// Image Upload Component
class ImageUpload {
    constructor() {
        this.container = document.getElementById('image-upload');
        this.images = [];
        this.init();
    }

    init() {
        this.createUploadArea();
        this.setupEventListeners();
        this.setupLanguageListener();
    }

    createUploadArea() {
        this.container.innerHTML = `
            <div class="image-upload-area" id="image-drop-zone">
                <div class="upload-icon">🖼️</div>
                <p class="upload-text">${this.getTranslation('imageUploadText')}</p>
                <input type="file" id="image-input" multiple accept="image/*" style="display: none;">
            </div>
            <div class="image-preview" id="image-preview"></div>
        `;
    }

    setupEventListeners() {
        const dropZone = document.getElementById('image-drop-zone');
        const imageInput = document.getElementById('image-input');

        // Drag and drop events
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
            this.handleImageFiles(files);
        });

        // Click to upload
        dropZone.addEventListener('click', () => {
            imageInput.click();
        });

        imageInput.addEventListener('change', (e) => {
            this.handleImageFiles(e.target.files);
        });
    }

    setupLanguageListener() {
        window.addEventListener('languageChanged', () => {
            this.updateTexts();
        });
    }

    updateTexts() {
        const uploadText = document.querySelector('.upload-text');
        if (uploadText) {
            uploadText.textContent = this.getTranslation('imageUploadText');
        }
    }

    handleImageFiles(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                this.processImage(file);
            }
        });
    }

    processImage(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const imageData = {
                id: this.generateId(),
                file: file,
                name: file.name,
                size: this.formatFileSize(file.size),
                url: e.target.result,
                type: file.type,
                uploadDate: new Date().toISOString()
            };

            this.images.push(imageData);
            this.renderImagePreview();
            this.notifyImageAdded(imageData);
        };

        reader.onerror = () => {
            console.error('Erro ao ler arquivo de imagem:', file.name);
        };

        reader.readAsDataURL(file);
    }

    renderImagePreview() {
        const preview = document.getElementById('image-preview');
        
        if (this.images.length === 0) {
            preview.innerHTML = '';
            return;
        }

        preview.innerHTML = this.images.map(image => `
            <div class="image-item" data-image-id="${image.id}">
                <img src="${image.url}" alt="${image.name}" title="${image.name} (${image.size})" 
                     onclick="window.imageUpload.insertImageToEditor('${image.id}')">
                <div class="image-actions">
                    <button class="insert-btn" onclick="window.imageUpload.insertImageToEditor('${image.id}')" 
                            title="Inserir no editor">
                        📝
                    </button>
                    <button class="remove-btn" onclick="window.imageUpload.removeImage('${image.id}')" 
                            title="Remover">
                        ×
                    </button>
                </div>
            </div>
        `).join('');
    }

    insertImageToEditor(imageId) {
        const image = this.images.find(img => img.id === imageId);
        if (image && window.richTextEditor) {
            // Create an optimized image element for the editor
            const imgElement = `<img src="${image.url}" alt="${image.name}" style="max-width: 100%; height: auto; border-radius: 4px; margin: 10px 0;">`;
            
            // Insert into rich text editor
            const editor = document.getElementById('editor');
            if (editor) {
                editor.focus();
                document.execCommand('insertHTML', false, imgElement);
            }

            // Notify components
            window.dispatchEvent(new CustomEvent('imageInserted', {
                detail: {
                    image: image,
                    html: imgElement
                }
            }));
        }
    }

    removeImage(imageId) {
        this.images = this.images.filter(img => img.id !== imageId);
        this.renderImagePreview();
        
        // Notify removal
        window.dispatchEvent(new CustomEvent('imageRemoved', {
            detail: { imageId: imageId }
        }));
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    notifyImageAdded(imageData) {
        window.dispatchEvent(new CustomEvent('imageUploaded', {
            detail: { image: imageData }
        }));
    }

    getTranslation(key) {
        return window.languageSelector ? window.languageSelector.getTranslation(key) : key;
    }

    getImages() {
        return this.images;
    }

    clearImages() {
        this.images = [];
        this.renderImagePreview();
    }

    // Get image by ID
    getImage(imageId) {
        return this.images.find(img => img.id === imageId);
    }

    // Optimize image for web (basic compression)
    optimizeImage(file, maxWidth = 1200, quality = 0.8) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                // Calculate new dimensions
                let { width, height } = img;
                
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                // Draw and compress
                ctx.drawImage(img, 0, 0, width, height);
                
                canvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/jpeg', quality);
            };

            img.src = URL.createObjectURL(file);
        });
    }

    // Create image gallery from uploaded images
    createGallery() {
        if (this.images.length === 0) return '';

        const galleryHTML = `
            <div class="image-gallery">
                <h3>Galeria de Imagens</h3>
                <div class="gallery-grid">
                    ${this.images.map(image => `
                        <div class="gallery-item">
                            <img src="${image.url}" alt="${image.name}" 
                                 onclick="window.imageUpload.showImageModal('${image.id}')">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        return galleryHTML;
    }

    // Show image in modal (for future enhancement)
    showImageModal(imageId) {
        const image = this.getImage(imageId);
        if (image) {
            // Simple implementation - can be enhanced with a proper modal
            const modal = window.open('', '_blank', 'width=800,height=600');
            modal.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${image.name}</title>
                    <style>
                        body { margin: 0; padding: 20px; text-align: center; font-family: Arial, sans-serif; }
                        img { max-width: 100%; max-height: 80vh; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
                        .info { margin-top: 20px; color: #666; }
                    </style>
                </head>
                <body>
                    <img src="${image.url}" alt="${image.name}">
                    <div class="info">
                        <h3>${image.name}</h3>
                        <p>Tamanho: ${image.size}</p>
                        <p>Upload: ${new Date(image.uploadDate).toLocaleString('pt-BR')}</p>
                    </div>
                </body>
                </html>
            `);
        }
    }

    // Export images data
    exportImages() {
        return {
            images: this.images.map(img => ({
                id: img.id,
                name: img.name,
                size: img.size,
                type: img.type,
                uploadDate: img.uploadDate
                // Note: URL is excluded as it's a blob URL that won't persist
            })),
            count: this.images.length,
            exportDate: new Date().toISOString()
        };
    }

    // Validate image file
    validateImage(file) {
        const maxSize = 10 * 1024 * 1024; // 10MB
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

        if (file.size > maxSize) {
            return { valid: false, message: 'Imagem muito grande. Máximo: 10MB' };
        }

        if (!allowedTypes.includes(file.type)) {
            return { valid: false, message: 'Tipo de imagem não suportado' };
        }

        return { valid: true };
    }
}

// Initialize image upload when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.imageUpload = new ImageUpload();
});