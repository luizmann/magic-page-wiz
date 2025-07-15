// Magic Page Wiz - Builder Main JavaScript
class PageBuilder {
    constructor() {
        this.currentSection = 'builder';
        this.selectedElement = null;
        this.pageData = {
            elements: [],
            settings: {
                title: 'Untitled Page',
                language: 'en',
                copyLevel: 'intermediate'
            }
        };
        this.history = [];
        this.historyIndex = -1;
        this.autoSaveTimeout = null;
        this.isSaving = false;
        this.lastSaveTime = null;
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupToolbar();
        this.setupCanvas();
        this.setupShortcuts();
        this.setupCopyLevelSelector();
        this.setupAutoSave();
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
        document.querySelectorAll('.ai-panel, .import-panel').forEach(panel => {
            panel.classList.add('hidden');
        });

        // Show selected panel
        if (section !== 'builder') {
            const panelMap = {
                'ai': 'aiPanel',
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

    setupCopyLevelSelector() {
        // Add copy level selector to the header
        const headerRight = document.querySelector('.header-right');
        if (headerRight && !document.getElementById('copy-level-selector')) {
            const copyLevelContainer = document.createElement('div');
            copyLevelContainer.className = 'copy-level-container';
            copyLevelContainer.innerHTML = `
                <label for="copy-level-selector" class="copy-level-label">Copy Level:</label>
                <select id="copy-level-selector" class="copy-level-select">
                    <option value="simple">Simple</option>
                    <option value="intermediate" selected>Intermediate</option>
                    <option value="advanced">Advanced/Persuasive</option>
                </select>
            `;
            
            // Insert before the first button
            headerRight.insertBefore(copyLevelContainer, headerRight.firstChild);
            
            // Add event listener
            const selector = document.getElementById('copy-level-selector');
            selector.addEventListener('change', (e) => {
                this.pageData.settings.copyLevel = e.target.value;
                this.triggerAutoSave();
                this.showNotification(`📝 Copy level changed to ${e.target.value}`);
            });
        }
    }

    setupAutoSave() {
        // Auto-save every 30 seconds or when changes are made
        this.autoSaveInterval = setInterval(() => {
            if (this.hasUnsavedChanges()) {
                this.autoSave();
            }
        }, 30000);

        // Add save status indicator
        this.addSaveStatusIndicator();
    }

    addElement(elementType, data = {}) {
        const element = this.createElement(elementType, data);
        this.insertElementIntoCanvas(element);
        this.saveState();
        this.triggerAutoSave();
        this.optimizeLayoutOrder();
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
        const copyLevel = this.pageData.settings.copyLevel || 'intermediate';
        
        const contentByLevel = {
            simple: {
                text: { text: 'Your text here. Keep it simple and clear.' },
                heading: { text: 'Your Heading', level: 'h2' },
                button: { text: 'Click Here', link: '#' },
                testimonial: {
                    text: "Great product!",
                    author: "Happy Customer",
                    title: "Customer",
                    image: "https://images.unsplash.com/photo-1494790108755-2616b612b436?w=60&h=60&fit=crop&crop=face"
                },
                pricing: { 
                    title: 'Basic Plan',
                    price: '$99',
                    features: ['Feature 1', 'Feature 2', 'Feature 3']
                }
            },
            intermediate: {
                text: { text: 'Click to edit this text. Make it engaging and informative for your audience.' },
                heading: { text: 'Your Compelling Heading Here', level: 'h2' },
                button: { text: 'Get Started Today', link: '#' },
                testimonial: {
                    text: "This product completely changed my life. I saw results within the first week!",
                    author: "Sarah Johnson",
                    title: "Satisfied Customer",
                    image: "https://images.unsplash.com/photo-1494790108755-2616b612b436?w=60&h=60&fit=crop&crop=face"
                },
                pricing: { 
                    title: 'Professional Plan',
                    price: '$197',
                    features: ['Everything in Basic', 'Advanced Features', 'Priority Support', 'Money-Back Guarantee']
                }
            },
            advanced: {
                text: { text: 'Discover the life-changing secret that thousands of people are already using to transform their results. This proven method has helped our customers achieve extraordinary success in record time.' },
                heading: { text: 'The Revolutionary System That Changes Everything', level: 'h2' },
                button: { text: 'Claim Your Exclusive Access Now', link: '#' },
                testimonial: {
                    text: "I was skeptical at first, but this system delivered results beyond my wildest dreams. In just 30 days, I achieved what took me years to accomplish before. This is the real deal!",
                    author: "Michael Rodriguez",
                    title: "Success Story",
                    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
                },
                pricing: { 
                    title: 'EXCLUSIVE Elite Transformation Package',
                    price: '$497',
                    features: ['Complete System Access', '1-on-1 Coaching Calls', 'Lifetime Updates', 'Success Guarantee', 'Bonus Materials Worth $1000+', 'VIP Community Access']
                }
            }
        };

        const levelContent = contentByLevel[copyLevel] || contentByLevel.intermediate;
        
        const defaults = {
            image: { src: 'https://via.placeholder.com/400x200', alt: 'Image' },
            video: { src: '', provider: 'youtube' },
            divider: { style: 'solid' },
            form: { fields: [{ type: 'email', label: 'Email', required: true }] },
            input: { type: 'text', label: 'Input Field', placeholder: 'Enter text...' },
            textarea: { label: 'Message', placeholder: 'Enter your message...' },
            checkbox: { label: 'I agree to terms', checked: false },
            countdown: {
                endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                title: copyLevel === 'advanced' ? 'URGENT: Limited Time Offer Expires Soon!' : 'Limited Time Offer!'
            },
            social: {
                platforms: ['facebook', 'twitter', 'instagram']
            },
            ...levelContent
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
        
        // Apply smart responsive styles based on element type and position
        const enhancedStyles = this.enhanceElementStyles(elementData);
        const styleString = Object.entries(enhancedStyles).map(([key, value]) => {
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
                innerHTML = `<img src="${content.src}" alt="${content.alt}" style="${styleString}" loading="lazy">`;
                break;
            case 'video':
                innerHTML = `<div class="video-container" style="${styleString}">
                    <iframe width="100%" height="100%" src="${content.src}" frameborder="0" allowfullscreen loading="lazy"></iframe>
                </div>`;
                break;
            case 'button':
                innerHTML = `<button style="${styleString}" onclick="window.open('${content.link}', '_blank')">${content.text}</button>`;
                break;
            case 'divider':
                innerHTML = `<hr style="${styleString}">`;
                break;
            case 'testimonial':
                innerHTML = `<div class="testimonial" style="text-align: center; padding: 30px 20px; background: #f8f9fa; border-radius: 12px; margin: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <img src="${content.image}" alt="${content.author}" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 15px; object-fit: cover; border: 3px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <p style="font-style: italic; margin-bottom: 15px; font-size: 18px; line-height: 1.6; color: #2d3748;">"${content.text}"</p>
                    <strong style="color: #4a5568; font-size: 16px;">${content.author}</strong><br>
                    <small style="color: #718096; font-size: 14px;">${content.title}</small>
                </div>`;
                break;
            case 'pricing':
                innerHTML = `<div class="pricing-card" style="border: 2px solid #e2e8f0; border-radius: 12px; padding: 30px 20px; text-align: center; background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin: 20px 0; transition: transform 0.3s ease;">
                    <h3 style="margin: 0 0 20px 0; color: #2d3748; font-size: 24px;">${content.title}</h3>
                    <div style="font-size: 3rem; font-weight: bold; color: #667eea; margin: 30px 0; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">${content.price}</div>
                    <ul style="list-style: none; padding: 0; margin: 20px 0;">
                        ${content.features.map(feature => `<li style="margin: 15px 0; padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #4a5568;"><span style="color: #38a169; margin-right: 8px;">✓</span> ${feature}</li>`).join('')}
                    </ul>
                </div>`;
                break;
            default:
                innerHTML = `<div style="${styleString}">Element: ${type}</div>`;
        }

        return `
            <div class="canvas-element" data-element-id="${id}" data-element-type="${type}" style="margin: 20px 0; transition: all 0.3s ease;">
                <div class="element-controls">
                    <button class="control-btn" data-action="edit" title="Edit">✏️</button>
                    <button class="control-btn" data-action="clone" title="Clone">📋</button>
                    <button class="control-btn" data-action="delete" title="Delete">🗑️</button>
                </div>
                ${innerHTML}
            </div>
        `;
    }

    enhanceElementStyles(elementData) {
        const { type, styles } = elementData;
        const enhanced = { ...styles };
        
        // Apply responsive and visual enhancements based on element type
        switch (type) {
            case 'text':
                enhanced.lineHeight = enhanced.lineHeight || '1.7';
                enhanced.marginBottom = enhanced.marginBottom || '20px';
                enhanced.maxWidth = enhanced.maxWidth || '100%';
                break;
            case 'heading':
                enhanced.lineHeight = enhanced.lineHeight || '1.3';
                enhanced.marginBottom = enhanced.marginBottom || '25px';
                enhanced.marginTop = enhanced.marginTop || '30px';
                break;
            case 'image':
                enhanced.maxWidth = enhanced.maxWidth || '100%';
                enhanced.height = enhanced.height || 'auto';
                enhanced.borderRadius = enhanced.borderRadius || '8px';
                enhanced.boxShadow = enhanced.boxShadow || '0 4px 12px rgba(0,0,0,0.1)';
                enhanced.display = enhanced.display || 'block';
                enhanced.margin = enhanced.margin || '20px auto';
                break;
            case 'button':
                enhanced.transition = enhanced.transition || 'all 0.3s ease';
                enhanced.textDecoration = 'none';
                enhanced.display = enhanced.display || 'inline-block';
                enhanced.boxShadow = enhanced.boxShadow || '0 4px 12px rgba(0,0,0,0.2)';
                break;
        }
        
        return enhanced;
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
        this.triggerAutoSave();
    }

    triggerAutoSave() {
        // Debounced auto-save - save 2 seconds after last change
        if (this.autoSaveTimeout) {
            clearTimeout(this.autoSaveTimeout);
        }
        
        this.autoSaveTimeout = setTimeout(() => {
            this.autoSave();
        }, 2000);
        
        this.updateSaveStatus('saving');
    }

    autoSave() {
        if (this.isSaving) return;
        
        this.isSaving = true;
        this.updateSaveStatus('saving');
        
        try {
            localStorage.setItem('magic-page-wiz-data', JSON.stringify(this.pageData));
            this.lastSaveTime = new Date();
            this.updateSaveStatus('saved');
            
            setTimeout(() => {
                this.updateSaveStatus('idle');
            }, 2000);
        } catch (e) {
            console.error('Auto-save failed:', e);
            this.updateSaveStatus('error');
        } finally {
            this.isSaving = false;
        }
    }

    hasUnsavedChanges() {
        const saved = localStorage.getItem('magic-page-wiz-data');
        if (!saved) return true;
        
        try {
            const savedData = JSON.parse(saved);
            return JSON.stringify(savedData) !== JSON.stringify(this.pageData);
        } catch (e) {
            return true;
        }
    }

    addSaveStatusIndicator() {
        const headerRight = document.querySelector('.header-right');
        if (headerRight && !document.getElementById('save-status')) {
            const statusDiv = document.createElement('div');
            statusDiv.id = 'save-status';
            statusDiv.className = 'save-status';
            statusDiv.innerHTML = '💾 <span>Saved</span>';
            headerRight.appendChild(statusDiv);
        }
    }

    updateSaveStatus(status) {
        const statusElement = document.getElementById('save-status');
        if (!statusElement) return;
        
        const statusSpan = statusElement.querySelector('span');
        switch (status) {
            case 'saving':
                statusElement.innerHTML = '⏳ <span>Saving...</span>';
                statusElement.className = 'save-status saving';
                break;
            case 'saved':
                statusElement.innerHTML = '✅ <span>Saved</span>';
                statusElement.className = 'save-status saved';
                break;
            case 'error':
                statusElement.innerHTML = '❌ <span>Error</span>';
                statusElement.className = 'save-status error';
                break;
            case 'idle':
            default:
                statusElement.innerHTML = '💾 <span>Auto-save enabled</span>';
                statusElement.className = 'save-status idle';
                break;
        }
    }

    optimizeLayoutOrder() {
        // Smart layout optimization - alternate text and images for better visual flow
        if (this.pageData.elements.length < 2) return;
        
        const elements = this.pageData.elements;
        const optimized = [];
        const textElements = elements.filter(el => ['text', 'heading'].includes(el.type));
        const imageElements = elements.filter(el => el.type === 'image');
        const otherElements = elements.filter(el => !['text', 'heading', 'image'].includes(el.type));
        
        // Interleave text and images for better visual appeal
        let textIndex = 0;
        let imageIndex = 0;
        let shouldAlternate = true;
        
        while (textIndex < textElements.length || imageIndex < imageElements.length) {
            if (shouldAlternate && textIndex < textElements.length) {
                optimized.push(textElements[textIndex++]);
            } else if (imageIndex < imageElements.length) {
                optimized.push(imageElements[imageIndex++]);
            } else if (textIndex < textElements.length) {
                optimized.push(textElements[textIndex++]);
            }
            shouldAlternate = !shouldAlternate;
        }
        
        // Add other elements at the end in original order
        optimized.push(...otherElements);
        
        // Update layout if order changed significantly
        if (this.shouldUpdateLayout(elements, optimized)) {
            this.pageData.elements = optimized;
            this.renderCanvas();
        }
    }

    shouldUpdateLayout(original, optimized) {
        // Only update layout if the change improves visual organization
        if (original.length !== optimized.length) return false;
        
        let changes = 0;
        for (let i = 0; i < original.length; i++) {
            if (original[i].id !== optimized[i].id) {
                changes++;
            }
        }
        
        // Only reorganize if less than 50% of elements change position
        return changes > 0 && changes < original.length * 0.5;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#e53e3e' : type === 'success' ? '#10b981' : '#667eea'};
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
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