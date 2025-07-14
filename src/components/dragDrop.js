// Drag and Drop Component
class DragDropArea {
    constructor() {
        this.container = document.getElementById('drag-drop-area');
        this.files = [];
        this.init();
    }

    init() {
        this.createDropArea();
        this.setupEventListeners();
        this.setupLanguageListener();
    }

    createDropArea() {
        this.container.innerHTML = `
            <div class="drag-drop-area" id="drop-zone">
                <div class="icon">📁</div>
                <p class="drop-text">${this.getTranslation('dragDropText')}</p>
                <button class="select-files-btn" id="select-files">${this.getTranslation('selectFiles')}</button>
                <input type="file" id="file-input" multiple style="display: none;">
            </div>
            <div class="file-list" id="file-list"></div>
        `;
    }

    setupEventListeners() {
        const dropZone = document.getElementById('drop-zone');
        const fileInput = document.getElementById('file-input');
        const selectBtn = document.getElementById('select-files');

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
            this.handleFiles(e.dataTransfer.files);
        });

        // Click to select files
        selectBtn.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
        });

        // Click on drop zone to select files
        dropZone.addEventListener('click', (e) => {
            if (e.target === dropZone || e.target.classList.contains('icon') || e.target.classList.contains('drop-text')) {
                fileInput.click();
            }
        });
    }

    setupLanguageListener() {
        window.addEventListener('languageChanged', () => {
            this.updateTexts();
        });
    }

    updateTexts() {
        const dropText = document.querySelector('.drop-text');
        const selectBtn = document.getElementById('select-files');
        
        if (dropText) dropText.textContent = this.getTranslation('dragDropText');
        if (selectBtn) selectBtn.textContent = this.getTranslation('selectFiles');
    }

    handleFiles(fileList) {
        Array.from(fileList).forEach(file => {
            if (!this.files.find(f => f.name === file.name && f.size === file.size)) {
                this.files.push({
                    file: file,
                    name: file.name,
                    size: this.formatFileSize(file.size),
                    type: file.type,
                    id: this.generateId()
                });
            }
        });
        
        this.renderFileList();
        this.notifyFilesChanged();
    }

    renderFileList() {
        const fileList = document.getElementById('file-list');
        
        if (this.files.length === 0) {
            fileList.innerHTML = '';
            return;
        }

        fileList.innerHTML = this.files.map(fileData => `
            <div class="file-item" data-file-id="${fileData.id}">
                <div class="file-info">
                    <strong>${fileData.name}</strong>
                    <small>${fileData.size}</small>
                </div>
                <button class="remove-btn" onclick="window.dragDropArea.removeFile('${fileData.id}')">×</button>
            </div>
        `).join('');
    }

    removeFile(fileId) {
        this.files = this.files.filter(f => f.id !== fileId);
        this.renderFileList();
        this.notifyFilesChanged();
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    getTranslation(key) {
        return window.languageSelector ? window.languageSelector.getTranslation(key) : key;
    }

    notifyFilesChanged() {
        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('filesChanged', {
            detail: { files: this.files }
        }));
    }

    getFiles() {
        return this.files;
    }

    clearFiles() {
        this.files = [];
        this.renderFileList();
        this.notifyFilesChanged();
    }

    // Method to handle file processing (for future expansion)
    processFiles() {
        return new Promise((resolve) => {
            // Simulate file processing
            const processedFiles = this.files.map(fileData => ({
                ...fileData,
                processed: true,
                url: URL.createObjectURL(fileData.file)
            }));
            
            resolve(processedFiles);
        });
    }
}

// Initialize drag and drop area when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dragDropArea = new DragDropArea();
});