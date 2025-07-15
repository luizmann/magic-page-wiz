// Magic Page Wiz - Builder Main JavaScript
class PageBuilder {
    constructor() {
        this.currentSection = 'builder';
        this.selectedElement = null;
        this.pageData = {
            elements: [],
            settings: {
                title: 'Untitled Page',
                language: 'en'
            }
        };
        this.history = [];
        this.historyIndex = -1;
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupToolbar();
        this.setupCanvas();
        this.setupShortcuts();
        this.loadSavedState();
    }

    setupNavigation() {
        const navBtns = document.querySelectorAll('.nav-btn');
        navBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.switchSection(section);
            });
        });
    }

    switchSection(section) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Hide all panels
        document.querySelectorAll('.ai-panel, .templates-panel, .import-panel').forEach(panel => {
            panel.classList.add('hidden');
        });

        // Show selected panel
        if (section !== 'builder') {
            const panelMap = {
                'ai': 'aiPanel',
                'templates': 'templatesPanel',
                'import': 'importPanel'
            };
            const panel = document.getElementById(panelMap[section]);
            if (panel) {
                panel.classList.remove('hidden');
            }
        }

        this.currentSection = section;
    }

    setupToolbar() {
        // View mode buttons
        document.getElementById('desktop-view').addEventListener('click', () => this.setViewMode('desktop'));
        document.getElementById('tablet-view').addEventListener('click', () => this.setViewMode('tablet'));
        document.getElementById('mobile-view').addEventListener('click', () => this.setViewMode('mobile'));

        // Undo/Redo
        document.getElementById('undo').addEventListener('click', () => this.undo());
        document.getElementById('redo').addEventListener('click', () => this.redo());

        // Header buttons
        document.getElementById('preview-btn').addEventListener('click', () => this.preview());
        document.getElementById('save-btn').addEventListener('click', () => this.save());
        document.getElementById('publish-btn').addEventListener('click', () => this.publish());
    }

    setViewMode(mode) {
        const canvas = document.getElementById('pageCanvas');
        canvas.className = `canvas ${mode}-view`;
        
        // Update active button
        document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${mode}-view`).classList.add('active');
    }

    setupCanvas() {
        const canvas = document.getElementById('pageCanvas');
        
        // Click handler for canvas
        canvas.addEventListener('click', (e) => {
            if (e.target === canvas || e.target.classList.contains('canvas-placeholder')) {
                this.selectElement(null);
            }
        });

        // Set desktop as default view
        this.setViewMode('desktop');
    }

    setupShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'z':
                        e.preventDefault();
                        if (e.shiftKey) {
                            this.redo();
                        } else {
                            this.undo();
                        }
                        break;
                    case 's':
                        e.preventDefault();
                        this.save();
                        break;
                    case 'p':
                        e.preventDefault();
                        this.preview();
                        break;
                }
            }
            
            if (e.key === 'Delete' && this.selectedElement) {
                e.preventDefault();
                this.deleteElement(this.selectedElement);
            }
        });
    }

    addElement(elementType, data = {}) {
        const element = this.createElement(elementType, data);
        this.insertElementIntoCanvas(element);
        this.saveState();
        return element;
    }

    createElement(elementType, data = {}) {
        const id = 'el_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        
        const elementData = {
            id,
            type: elementType,
            content: this.getDefaultContent(elementType),
            styles: this.getDefaultStyles(elementType),
            ...data
        };

        this.pageData.elements.push(elementData);
        return elementData;
    }

    getDefaultContent(elementType) {
        const defaults = {
            text: { text: 'Click to edit text' },
            heading: { text: 'Your Heading Here', level: 'h2' },
            image: { src: 'https://via.placeholder.com/400x200', alt: 'Image' },
            video: { src: '', provider: 'youtube' },
            button: { text: 'Click Here', link: '#' },
            divider: { style: 'solid' },
            form: { fields: [{ type: 'email', label: 'Email', required: true }] },
            input: { type: 'text', label: 'Input Field', placeholder: 'Enter text...' },
            textarea: { label: 'Message', placeholder: 'Enter your message...' },
            checkbox: { label: 'I agree to terms', checked: false },
            pricing: { 
                title: 'Basic Plan',
                price: '$99',
                features: ['Feature 1', 'Feature 2', 'Feature 3']
            },
            testimonial: {
                text: 'This is an amazing product!',
                author: 'John Doe',
                title: 'Customer',
                image: 'https://via.placeholder.com/60x60'
            },
            countdown: {
                endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                title: 'Limited Time Offer!'
            },
            social: {
                platforms: ['facebook', 'twitter', 'instagram']
            }
        };

        return defaults[elementType] || {};
    }

    getDefaultStyles(elementType) {
        const defaults = {
            text: { fontSize: '16px', color: '#333', lineHeight: '1.5' },
            heading: { fontSize: '32px', color: '#333', fontWeight: 'bold' },
            image: { width: '100%', height: 'auto' },
            video: { width: '100%', height: '400px' },
            button: { 
                backgroundColor: '#667eea', 
                color: 'white', 
                padding: '12px 24px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer'
            },
            divider: { height: '2px', backgroundColor: '#e2e8f0', margin: '20px 0' }
        };

        return defaults[elementType] || {};
    }

    insertElementIntoCanvas(elementData) {
        const canvas = document.getElementById('pageCanvas');
        
        // Remove placeholder if this is the first element
        const placeholder = canvas.querySelector('.canvas-placeholder');
        if (placeholder) {
            placeholder.remove();
        }

        const elementHTML = this.renderElement(elementData);
        canvas.insertAdjacentHTML('beforeend', elementHTML);

        // Add event listeners to the new element
        const elementEl = canvas.querySelector(`[data-element-id="${elementData.id}"]`);
        this.setupElementEvents(elementEl, elementData);
    }

    renderElement(elementData) {
        const { id, type, content, styles } = elementData;
        
        const styleString = Object.entries(styles).map(([key, value]) => {
            const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
            return `${cssKey}: ${value}`;
        }).join('; ');

        let innerHTML = '';
        
        switch (type) {
            case 'text':
                innerHTML = `<p style="${styleString}">${content.text}</p>`;
                break;
            case 'heading':
                innerHTML = `<${content.level} style="${styleString}">${content.text}</${content.level}>`;
                break;
            case 'image':
                innerHTML = `<img src="${content.src}" alt="${content.alt}" style="${styleString}">`;
                break;
            case 'video':
                innerHTML = `<div class="video-container" style="${styleString}">
                    <iframe width="100%" height="100%" src="${content.src}" frameborder="0" allowfullscreen></iframe>
                </div>`;
                break;
            case 'button':
                innerHTML = `<button style="${styleString}" onclick="window.open('${content.link}', '_blank')">${content.text}</button>`;
                break;
            case 'divider':
                innerHTML = `<hr style="${styleString}">`;
                break;
            case 'testimonial':
                innerHTML = `<div class="testimonial" style="text-align: center; padding: 20px;">
                    <img src="${content.image}" alt="${content.author}" style="width: 60px; height: 60px; border-radius: 50%; margin-bottom: 10px;">
                    <p style="font-style: italic; margin-bottom: 10px;">"${content.text}"</p>
                    <strong>${content.author}</strong><br>
                    <small>${content.title}</small>
                </div>`;
                break;
            case 'pricing':
                innerHTML = `<div class="pricing-card" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; text-align: center;">
                    <h3>${content.title}</h3>
                    <div style="font-size: 2rem; font-weight: bold; color: #667eea; margin: 20px 0;">${content.price}</div>
                    <ul style="list-style: none; padding: 0;">
                        ${content.features.map(feature => `<li style="margin: 10px 0;">✓ ${feature}</li>`).join('')}
                    </ul>
                </div>`;
                break;
            default:
                innerHTML = `<div style="${styleString}">Element: ${type}</div>`;
        }

        return `
            <div class="canvas-element" data-element-id="${id}" data-element-type="${type}">
                <div class="element-controls">
                    <button class="control-btn" data-action="edit" title="Edit">✏️</button>
                    <button class="control-btn" data-action="clone" title="Clone">📋</button>
                    <button class="control-btn" data-action="delete" title="Delete">🗑️</button>
                </div>
                ${innerHTML}
            </div>
        `;
    }

    setupElementEvents(elementEl, elementData) {
        // Select element on click
        elementEl.addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectElement(elementData);
        });

        // Control buttons
        const controls = elementEl.querySelectorAll('.control-btn');
        controls.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = e.target.dataset.action;
                
                switch (action) {
                    case 'edit':
                        this.editElement(elementData);
                        break;
                    case 'clone':
                        this.cloneElement(elementData);
                        break;
                    case 'delete':
                        this.deleteElement(elementData);
                        break;
                }
            });
        });
    }

    selectElement(elementData) {
        // Remove previous selection
        document.querySelectorAll('.canvas-element').forEach(el => {
            el.classList.remove('selected');
        });

        this.selectedElement = elementData;

        if (elementData) {
            // Add selection to element
            const elementEl = document.querySelector(`[data-element-id="${elementData.id}"]`);
            if (elementEl) {
                elementEl.classList.add('selected');
            }

            // Update properties panel
            this.updatePropertiesPanel(elementData);
        } else {
            // Clear properties panel
            this.clearPropertiesPanel();
        }
    }

    updatePropertiesPanel(elementData) {
        const propertiesContent = document.getElementById('propertiesContent');
        propertiesContent.innerHTML = this.renderPropertiesForm(elementData);
        
        // Add event listeners to form inputs
        const form = propertiesContent.querySelector('.properties-form');
        if (form) {
            this.setupPropertiesFormEvents(form, elementData);
        }
    }

    renderPropertiesForm(elementData) {
        const { type, content, styles } = elementData;
        
        let formHTML = `
            <div class="properties-form">
                <h4>Edit ${type.charAt(0).toUpperCase() + type.slice(1)}</h4>
        `;

        // Content fields based on element type
        switch (type) {
            case 'text':
                formHTML += `
                    <label>Text Content:</label>
                    <textarea name="content.text">${content.text}</textarea>
                `;
                break;
            case 'heading':
                formHTML += `
                    <label>Heading Text:</label>
                    <input type="text" name="content.text" value="${content.text}">
                    <label>Level:</label>
                    <select name="content.level">
                        <option value="h1" ${content.level === 'h1' ? 'selected' : ''}>H1</option>
                        <option value="h2" ${content.level === 'h2' ? 'selected' : ''}>H2</option>
                        <option value="h3" ${content.level === 'h3' ? 'selected' : ''}>H3</option>
                        <option value="h4" ${content.level === 'h4' ? 'selected' : ''}>H4</option>
                    </select>
                `;
                break;
            case 'image':
                formHTML += `
                    <label>Image URL:</label>
                    <input type="url" name="content.src" value="${content.src}">
                    <label>Alt Text:</label>
                    <input type="text" name="content.alt" value="${content.alt}">
                `;
                break;
            case 'button':
                formHTML += `
                    <label>Button Text:</label>
                    <input type="text" name="content.text" value="${content.text}">
                    <label>Link URL:</label>
                    <input type="url" name="content.link" value="${content.link}">
                `;
                break;
        }

        // Style fields
        formHTML += `
            <h5>Styling</h5>
            <label>Font Size:</label>
            <input type="text" name="styles.fontSize" value="${styles.fontSize || '16px'}">
            <label>Color:</label>
            <input type="color" name="styles.color" value="${this.hexColor(styles.color) || '#333333'}">
        `;

        formHTML += '</div>';
        return formHTML;
    }

    hexColor(color) {
        if (!color) return '#333333';
        if (color.startsWith('#')) return color;
        // Convert named colors or rgb to hex (simplified)
        return '#333333';
    }

    setupPropertiesFormEvents(form, elementData) {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                this.updateElementProperty(elementData, e.target.name, e.target.value);
            });
        });
    }

    updateElementProperty(elementData, propertyPath, value) {
        const parts = propertyPath.split('.');
        let obj = elementData;
        
        for (let i = 0; i < parts.length - 1; i++) {
            obj = obj[parts[i]];
        }
        
        obj[parts[parts.length - 1]] = value;
        
        // Re-render the element
        this.reRenderElement(elementData);
        this.saveState();
    }

    reRenderElement(elementData) {
        const elementEl = document.querySelector(`[data-element-id="${elementData.id}"]`);
        if (elementEl) {
            const newHTML = this.renderElement(elementData);
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = newHTML;
            const newElement = tempDiv.firstElementChild;
            
            elementEl.parentNode.replaceChild(newElement, elementEl);
            this.setupElementEvents(newElement, elementData);
            
            // Maintain selection
            newElement.classList.add('selected');
        }
    }

    clearPropertiesPanel() {
        const propertiesContent = document.getElementById('propertiesContent');
        propertiesContent.innerHTML = `
            <div class="no-selection">
                <p>Select an element to edit its properties</p>
            </div>
        `;
    }

    cloneElement(elementData) {
        const clone = JSON.parse(JSON.stringify(elementData));
        clone.id = 'el_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        
        this.pageData.elements.push(clone);
        this.insertElementIntoCanvas(clone);
        this.saveState();
    }

    deleteElement(elementData) {
        const elementEl = document.querySelector(`[data-element-id="${elementData.id}"]`);
        if (elementEl) {
            elementEl.remove();
        }

        this.pageData.elements = this.pageData.elements.filter(el => el.id !== elementData.id);
        
        if (this.selectedElement === elementData) {
            this.selectElement(null);
        }

        // Show placeholder if no elements
        const canvas = document.getElementById('pageCanvas');
        if (this.pageData.elements.length === 0) {
            canvas.innerHTML = `
                <div class="canvas-placeholder">
                    <div class="placeholder-content">
                        <h3>🎨 Start Building Your Page</h3>
                        <p>Drag elements from the left panel to create your sales page</p>
                    </div>
                </div>
            `;
        }

        this.saveState();
    }

    saveState() {
        const state = JSON.parse(JSON.stringify(this.pageData));
        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push(state);
        this.historyIndex++;
        
        // Limit history size
        if (this.history.length > 50) {
            this.history.shift();
            this.historyIndex--;
        }
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.restoreState(this.history[this.historyIndex]);
        }
    }

    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.restoreState(this.history[this.historyIndex]);
        }
    }

    restoreState(state) {
        this.pageData = JSON.parse(JSON.stringify(state));
        this.renderCanvas();
        this.selectElement(null);
    }

    renderCanvas() {
        const canvas = document.getElementById('pageCanvas');
        
        if (this.pageData.elements.length === 0) {
            canvas.innerHTML = `
                <div class="canvas-placeholder">
                    <div class="placeholder-content">
                        <h3>🎨 Start Building Your Page</h3>
                        <p>Drag elements from the left panel to create your sales page</p>
                    </div>
                </div>
            `;
        } else {
            canvas.innerHTML = '';
            this.pageData.elements.forEach(elementData => {
                this.insertElementIntoCanvas(elementData);
            });
        }
    }

    preview() {
        // Open preview in new tab
        const previewHTML = this.generatePreviewHTML();
        const blob = new Blob([previewHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    }

    generatePreviewHTML() {
        const elementsHTML = this.pageData.elements.map(el => {
            const styles = Object.entries(el.styles).map(([key, value]) => {
                const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                return `${cssKey}: ${value}`;
            }).join('; ');

            // Render without editing controls
            switch (el.type) {
                case 'text':
                    return `<p style="${styles}">${el.content.text}</p>`;
                case 'heading':
                    return `<${el.content.level} style="${styles}">${el.content.text}</${el.content.level}>`;
                case 'image':
                    return `<img src="${el.content.src}" alt="${el.content.alt}" style="${styles}">`;
                case 'button':
                    return `<button style="${styles}" onclick="window.open('${el.content.link}', '_blank')">${el.content.text}</button>`;
                default:
                    return `<div style="${styles}">Element: ${el.type}</div>`;
            }
        }).join('');

        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${this.pageData.settings.title}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                    .page-container { max-width: 800px; margin: 0 auto; }
                </style>
            </head>
            <body>
                <div class="page-container">
                    ${elementsHTML}
                </div>
            </body>
            </html>
        `;
    }

    save() {
        localStorage.setItem('magic-page-wiz-data', JSON.stringify(this.pageData));
        
        // Show save confirmation
        const notification = document.createElement('div');
        notification.textContent = '💾 Page saved successfully!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 2000);
    }

    loadSavedState() {
        const saved = localStorage.getItem('magic-page-wiz-data');
        if (saved) {
            try {
                this.pageData = JSON.parse(saved);
                this.renderCanvas();
                this.saveState(); // Add to history
            } catch (e) {
                console.warn('Could not load saved data:', e);
            }
        } else {
            this.saveState(); // Initial state
        }
    }

    publish() {
        // For now, just show a success message
        alert('🚀 Page published successfully! (This would integrate with your hosting service)');
    }
}

// Initialize builder when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.builder-container')) {
        window.pageBuilder = new PageBuilder();
        console.log('🎨 Page Builder initialized successfully!');
    }
});

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .properties-form label {
        display: block;
        margin: 10px 0 5px 0;
        font-weight: 500;
        color: #4a5568;
    }
    
    .properties-form input,
    .properties-form textarea,
    .properties-form select {
        width: 100%;
        padding: 8px;
        border: 1px solid #e2e8f0;
        border-radius: 4px;
        margin-bottom: 10px;
        font-size: 14px;
    }
    
    .properties-form h4,
    .properties-form h5 {
        margin: 15px 0 10px 0;
        color: #4a5568;
    }
    
    .properties-form h4 {
        border-bottom: 1px solid #e2e8f0;
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);