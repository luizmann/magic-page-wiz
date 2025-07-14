// Rich Text Editor Component
class RichTextEditor {
    constructor() {
        this.toolbarContainer = document.getElementById('rich-text-editor-toolbar');
        this.editorContainer = document.getElementById('rich-text-editor');
        this.content = '';
        this.init();
    }

    init() {
        this.createToolbar();
        this.createEditor();
        this.setupEventListeners();
        this.setupLanguageListener();
    }

    createToolbar() {
        this.toolbarContainer.innerHTML = `
            <div class="toolbar">
                <button type="button" data-command="bold" title="${this.getTranslation('bold')}">
                    <strong>B</strong>
                </button>
                <button type="button" data-command="italic" title="${this.getTranslation('italic')}">
                    <em>I</em>
                </button>
                <button type="button" data-command="underline" title="${this.getTranslation('underline')}">
                    <u>U</u>
                </button>
                <span class="separator">|</span>
                <button type="button" data-command="formatBlock" data-value="h1" title="${this.getTranslation('heading1')}">
                    H1
                </button>
                <button type="button" data-command="formatBlock" data-value="h2" title="${this.getTranslation('heading2')}">
                    H2
                </button>
                <button type="button" data-command="formatBlock" data-value="h3" title="${this.getTranslation('heading3')}">
                    H3
                </button>
                <button type="button" data-command="formatBlock" data-value="p" title="Parágrafo">
                    P
                </button>
                <span class="separator">|</span>
                <button type="button" data-command="justifyLeft" title="Alinhar à esquerda">
                    ⬅
                </button>
                <button type="button" data-command="justifyCenter" title="Centralizar">
                    ↔
                </button>
                <button type="button" data-command="justifyRight" title="Alinhar à direita">
                    ➡
                </button>
                <span class="separator">|</span>
                <button type="button" data-command="insertUnorderedList" title="Lista">
                    •
                </button>
                <button type="button" data-command="insertOrderedList" title="Lista numerada">
                    1.
                </button>
                <span class="separator">|</span>
                <button type="button" id="link-btn" title="${this.getTranslation('link')}">
                    🔗
                </button>
                <button type="button" id="image-btn" title="${this.getTranslation('image')}">
                    🖼
                </button>
                <button type="button" id="table-btn" title="${this.getTranslation('table')}">
                    📊
                </button>
            </div>
        `;
    }

    createEditor() {
        this.editorContainer.innerHTML = `
            <div class="editor" id="editor" contenteditable="true" 
                 data-placeholder="Comece a escrever sua página aqui...">
                <p>Bem-vindo ao Magic Page Wiz! Comece a criar sua página aqui.</p>
            </div>
        `;
    }

    setupEventListeners() {
        const toolbar = this.toolbarContainer.querySelector('.toolbar');
        const editor = document.getElementById('editor');

        // Toolbar button events
        toolbar.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                e.preventDefault();
                this.handleToolbarClick(e.target);
            }
        });

        // Editor events
        editor.addEventListener('input', () => {
            this.content = editor.innerHTML;
            this.notifyContentChanged();
        });

        editor.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // Selection change to update toolbar state
        document.addEventListener('selectionchange', () => {
            if (document.activeElement === editor) {
                this.updateToolbarState();
            }
        });

        // Special button events
        document.getElementById('link-btn').addEventListener('click', () => {
            this.insertLink();
        });

        document.getElementById('image-btn').addEventListener('click', () => {
            this.insertImage();
        });

        document.getElementById('table-btn').addEventListener('click', () => {
            this.insertTable();
        });
    }

    setupLanguageListener() {
        window.addEventListener('languageChanged', () => {
            this.updateToolbarTexts();
        });
    }

    updateToolbarTexts() {
        const buttons = this.toolbarContainer.querySelectorAll('button[title]');
        buttons.forEach(button => {
            const command = button.dataset.command;
            if (command === 'bold') button.title = this.getTranslation('bold');
            if (command === 'italic') button.title = this.getTranslation('italic');
            if (command === 'underline') button.title = this.getTranslation('underline');
        });
    }

    handleToolbarClick(button) {
        const command = button.dataset.command;
        const value = button.dataset.value;

        if (command) {
            document.execCommand(command, false, value);
            document.getElementById('editor').focus();
        }
    }

    handleKeyboardShortcuts(e) {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'b':
                    e.preventDefault();
                    document.execCommand('bold');
                    break;
                case 'i':
                    e.preventDefault();
                    document.execCommand('italic');
                    break;
                case 'u':
                    e.preventDefault();
                    document.execCommand('underline');
                    break;
                case 'k':
                    e.preventDefault();
                    this.insertLink();
                    break;
            }
        }
    }

    updateToolbarState() {
        const buttons = this.toolbarContainer.querySelectorAll('button[data-command]');
        
        buttons.forEach(button => {
            const command = button.dataset.command;
            const isActive = document.queryCommandState(command);
            button.classList.toggle('active', isActive);
        });
    }

    insertLink() {
        const url = prompt('Digite a URL do link:');
        if (url) {
            const text = window.getSelection().toString() || prompt('Digite o texto do link:') || url;
            document.execCommand('insertHTML', false, `<a href="${url}" target="_blank">${text}</a>`);
        }
    }

    insertImage() {
        const url = prompt('Digite a URL da imagem:');
        if (url) {
            const alt = prompt('Digite o texto alternativo (opcional):') || 'Imagem';
            document.execCommand('insertHTML', false, `<img src="${url}" alt="${alt}" style="max-width: 100%; height: auto;">`);
        }
    }

    insertTable() {
        const rows = parseInt(prompt('Número de linhas:')) || 3;
        const cols = parseInt(prompt('Número de colunas:')) || 3;
        
        let tableHTML = '<table border="1" style="border-collapse: collapse; width: 100%; margin: 10px 0;">';
        
        for (let i = 0; i < rows; i++) {
            tableHTML += '<tr>';
            for (let j = 0; j < cols; j++) {
                const tag = i === 0 ? 'th' : 'td';
                tableHTML += `<${tag} style="padding: 8px; border: 1px solid #ddd;">${i === 0 ? `Cabeçalho ${j + 1}` : `Célula ${i},${j + 1}`}</${tag}>`;
            }
            tableHTML += '</tr>';
        }
        
        tableHTML += '</table><p></p>';
        document.execCommand('insertHTML', false, tableHTML);
    }

    getContent() {
        return this.content;
    }

    setContent(content) {
        const editor = document.getElementById('editor');
        editor.innerHTML = content;
        this.content = content;
        this.notifyContentChanged();
    }

    insertImageFromFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = `<img src="${e.target.result}" alt="${file.name}" style="max-width: 100%; height: auto; margin: 10px 0;">`;
            document.execCommand('insertHTML', false, img);
        };
        reader.readAsDataURL(file);
    }

    notifyContentChanged() {
        window.dispatchEvent(new CustomEvent('editorContentChanged', {
            detail: { content: this.content }
        }));
    }

    getTranslation(key) {
        return window.languageSelector ? window.languageSelector.getTranslation(key) : key;
    }

    // Method to apply template content
    applyTemplate(templateContent) {
        this.setContent(templateContent);
    }

    // Method to clear editor
    clear() {
        this.setContent('<p>Comece a escrever sua página aqui...</p>');
    }
}

// Initialize rich text editor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.richTextEditor = new RichTextEditor();
});