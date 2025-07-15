// Magic Page Wiz - Templates System
class TemplateManager {
    constructor() {
        this.templates = [];
        this.userTemplates = [];
        this.init();
    }

    init() {
        this.loadBuiltInTemplates();
        this.loadUserTemplates();
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        // Tab switching
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchTab(tab);
            });
        });

        // Save current page as template
        this.addSaveTemplateButton();
    }

    switchTab(tab) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

        // Show appropriate templates
        this.displayTemplates(tab);
    }

    loadBuiltInTemplates() {
        this.templates = [
            {
                id: 'fitness-landing',
                name: 'Fitness Course Landing',
                category: 'fitness',
                thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
                description: 'Perfect for fitness coaches and personal trainers',
                elements: [
                    {
                        type: 'heading',
                        content: { text: 'Transform Your Body in 30 Days', level: 'h1' },
                        styles: { fontSize: '48px', textAlign: 'center', color: '#2d3748', marginBottom: '20px' }
                    },
                    {
                        type: 'text',
                        content: { text: 'Join thousands of people who have already transformed their lives with our proven fitness system.' },
                        styles: { fontSize: '20px', textAlign: 'center', color: '#4a5568', marginBottom: '40px' }
                    },
                    {
                        type: 'image',
                        content: { 
                            src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
                            alt: 'Fitness transformation'
                        },
                        styles: { width: '100%', maxWidth: '600px', margin: '0 auto 40px auto', display: 'block' }
                    },
                    {
                        type: 'button',
                        content: { text: 'Start Your Transformation', link: '#order' },
                        styles: { 
                            backgroundColor: '#e53e3e',
                            color: 'white',
                            padding: '20px 40px',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'block',
                            margin: '0 auto'
                        }
                    }
                ]
            },
            {
                id: 'business-course',
                name: 'Business Course Sales Page',
                category: 'business',
                thumbnail: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=300&h=200&fit=crop',
                description: 'Ideal for online courses and business training',
                elements: [
                    {
                        type: 'heading',
                        content: { text: 'Master Digital Marketing in 90 Days', level: 'h1' },
                        styles: { fontSize: '48px', textAlign: 'center', color: '#2d3748', marginBottom: '20px' }
                    },
                    {
                        type: 'text',
                        content: { text: 'Learn the exact strategies I used to grow my business from $0 to $100k in revenue.' },
                        styles: { fontSize: '20px', textAlign: 'center', color: '#4a5568', marginBottom: '40px' }
                    },
                    {
                        type: 'testimonial',
                        content: {
                            text: "This course completely changed my business. I saw a 300% increase in leads within the first month!",
                            author: "Sarah Johnson",
                            title: "Marketing Director",
                            image: "https://images.unsplash.com/photo-1494790108755-2616b612b436?w=60&h=60&fit=crop&crop=face"
                        },
                        styles: { marginBottom: '30px' }
                    },
                    {
                        type: 'pricing',
                        content: {
                            title: 'Complete Marketing Mastery',
                            price: '$297',
                            features: [
                                '12 hours of video content',
                                'Marketing templates and tools',
                                'Private community access',
                                '30-day money-back guarantee'
                            ]
                        },
                        styles: { marginBottom: '30px' }
                    },
                    {
                        type: 'button',
                        content: { text: 'Enroll Now', link: '#order' },
                        styles: { 
                            backgroundColor: '#667eea',
                            color: 'white',
                            padding: '20px 40px',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'block',
                            margin: '0 auto'
                        }
                    }
                ]
            },
            {
                id: 'software-saas',
                name: 'SaaS Product Landing',
                category: 'software',
                thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop',
                description: 'Perfect for software and SaaS product launches',
                elements: [
                    {
                        type: 'heading',
                        content: { text: 'The All-in-One Project Management Solution', level: 'h1' },
                        styles: { fontSize: '48px', textAlign: 'center', color: '#2d3748', marginBottom: '20px' }
                    },
                    {
                        type: 'text',
                        content: { text: 'Streamline your workflow, boost productivity, and deliver projects on time, every time.' },
                        styles: { fontSize: '20px', textAlign: 'center', color: '#4a5568', marginBottom: '40px' }
                    },
                    {
                        type: 'image',
                        content: { 
                            src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop',
                            alt: 'Software dashboard'
                        },
                        styles: { width: '100%', maxWidth: '600px', margin: '0 auto 40px auto', display: 'block' }
                    },
                    {
                        type: 'text',
                        content: { text: '✅ Real-time collaboration\n✅ Advanced reporting\n✅ Integrations with 50+ tools\n✅ Mobile app included' },
                        styles: { fontSize: '18px', lineHeight: '2', marginBottom: '30px' }
                    },
                    {
                        type: 'button',
                        content: { text: 'Start Free Trial', link: '#signup' },
                        styles: { 
                            backgroundColor: '#38a169',
                            color: 'white',
                            padding: '20px 40px',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'block',
                            margin: '0 auto'
                        }
                    }
                ]
            },
            {
                id: 'ebook-lead-magnet',
                name: 'Ebook Lead Magnet',
                category: 'lead-generation',
                thumbnail: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=200&fit=crop',
                description: 'Great for lead generation and email list building',
                elements: [
                    {
                        type: 'heading',
                        content: { text: 'Free Guide: 10 Secrets to Financial Freedom', level: 'h1' },
                        styles: { fontSize: '48px', textAlign: 'center', color: '#2d3748', marginBottom: '20px' }
                    },
                    {
                        type: 'text',
                        content: { text: 'Download your free copy and discover the strategies that helped me retire at 35.' },
                        styles: { fontSize: '20px', textAlign: 'center', color: '#4a5568', marginBottom: '40px' }
                    },
                    {
                        type: 'image',
                        content: { 
                            src: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop',
                            alt: 'Financial freedom ebook'
                        },
                        styles: { width: '300px', height: 'auto', margin: '0 auto 40px auto', display: 'block' }
                    },
                    {
                        type: 'form',
                        content: { 
                            fields: [
                                { type: 'text', label: 'First Name', required: true },
                                { type: 'email', label: 'Email Address', required: true }
                            ]
                        },
                        styles: { maxWidth: '400px', margin: '0 auto 30px auto' }
                    },
                    {
                        type: 'button',
                        content: { text: 'Download Free Guide', link: '#download' },
                        styles: { 
                            backgroundColor: '#ed8936',
                            color: 'white',
                            padding: '20px 40px',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'block',
                            margin: '0 auto'
                        }
                    }
                ]
            },
            {
                id: 'webinar-registration',
                name: 'Webinar Registration Page',
                category: 'events',
                thumbnail: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=300&h=200&fit=crop',
                description: 'Perfect for webinar and event registrations',
                elements: [
                    {
                        type: 'heading',
                        content: { text: 'Live Masterclass: Double Your Income in 2024', level: 'h1' },
                        styles: { fontSize: '48px', textAlign: 'center', color: '#2d3748', marginBottom: '20px' }
                    },
                    {
                        type: 'text',
                        content: { text: 'Join 500+ entrepreneurs for this exclusive training session.' },
                        styles: { fontSize: '20px', textAlign: 'center', color: '#4a5568', marginBottom: '30px' }
                    },
                    {
                        type: 'countdown',
                        content: {
                            title: 'Registration Closes Soon!',
                            endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
                        },
                        styles: { textAlign: 'center', marginBottom: '30px' }
                    },
                    {
                        type: 'text',
                        content: { text: '🗓️ Date: Next Tuesday\n⏰ Time: 3 PM EST\n⏱️ Duration: 90 minutes\n💻 Platform: Zoom' },
                        styles: { fontSize: '18px', lineHeight: '2', marginBottom: '30px', textAlign: 'center' }
                    },
                    {
                        type: 'button',
                        content: { text: 'Reserve My Spot (Free)', link: '#register' },
                        styles: { 
                            backgroundColor: '#9f7aea',
                            color: 'white',
                            padding: '20px 40px',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'block',
                            margin: '0 auto'
                        }
                    }
                ]
            }
        ];
    }

    loadUserTemplates() {
        const saved = localStorage.getItem('magic-page-wiz-user-templates');
        if (saved) {
            try {
                this.userTemplates = JSON.parse(saved);
            } catch (e) {
                console.warn('Could not load user templates:', e);
                this.userTemplates = [];
            }
        }
    }

    saveUserTemplates() {
        localStorage.setItem('magic-page-wiz-user-templates', JSON.stringify(this.userTemplates));
    }

    displayTemplates(tab) {
        const templateGrid = document.getElementById('templateGrid');
        const templates = tab === 'library' ? this.templates : this.userTemplates;

        if (templates.length === 0) {
            templateGrid.innerHTML = `
                <div class="no-templates">
                    <p>${tab === 'library' ? 'No templates available' : 'No saved templates yet'}</p>
                    ${tab === 'saved' ? '<p>Save your current page as a template to see it here.</p>' : ''}
                </div>
            `;
            return;
        }

        templateGrid.innerHTML = templates.map(template => `
            <div class="template-card" data-template-id="${template.id}">
                <div class="template-thumbnail">
                    <img src="${template.thumbnail}" alt="${template.name}">
                </div>
                <div class="template-info">
                    <h4>${template.name}</h4>
                    <p>${template.description}</p>
                    <div class="template-actions">
                        <button class="btn-primary" onclick="window.templateManager.applyTemplate('${template.id}', '${tab}')">
                            Use Template
                        </button>
                        ${tab === 'saved' ? `
                            <button class="btn-secondary" onclick="window.templateManager.deleteUserTemplate('${template.id}')">
                                Delete
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    applyTemplate(templateId, source) {
        const templates = source === 'library' ? this.templates : this.userTemplates;
        const template = templates.find(t => t.id === templateId);
        
        if (!template || !window.pageBuilder) {
            alert('Template not found or page builder not available');
            return;
        }

        if (window.pageBuilder.pageData.elements.length > 0) {
            if (!confirm('This will replace your current page. Are you sure?')) {
                return;
            }
        }

        // Clear current page
        window.pageBuilder.pageData.elements = [];
        
        // Apply template elements
        template.elements.forEach(elementData => {
            window.pageBuilder.addElement(elementData.type, {
                content: elementData.content,
                styles: elementData.styles
            });
        });

        // Update page title
        window.pageBuilder.pageData.settings.title = template.name;
        document.querySelector('.page-title').textContent = template.name;

        // Switch back to builder view
        window.pageBuilder.switchSection('builder');
        
        alert(`✨ Template "${template.name}" applied successfully!`);
    }

    addSaveTemplateButton() {
        const headerRight = document.querySelector('.header-right');
        if (headerRight && !document.getElementById('save-template-btn')) {
            const saveTemplateBtn = document.createElement('button');
            saveTemplateBtn.id = 'save-template-btn';
            saveTemplateBtn.className = 'btn-secondary';
            saveTemplateBtn.textContent = '📄 Save as Template';
            saveTemplateBtn.addEventListener('click', () => this.saveCurrentPageAsTemplate());
            
            headerRight.insertBefore(saveTemplateBtn, headerRight.firstChild);
        }
    }

    saveCurrentPageAsTemplate() {
        if (!window.pageBuilder || window.pageBuilder.pageData.elements.length === 0) {
            alert('Please create a page first before saving as template');
            return;
        }

        const templateName = prompt('Enter a name for your template:');
        if (!templateName) return;

        const template = {
            id: 'user_' + Date.now(),
            name: templateName,
            category: 'user',
            thumbnail: 'https://via.placeholder.com/300x200?text=Custom+Template',
            description: 'Custom template created by user',
            elements: JSON.parse(JSON.stringify(window.pageBuilder.pageData.elements)),
            createdAt: new Date().toISOString()
        };

        this.userTemplates.push(template);
        this.saveUserTemplates();

        alert(`Template "${templateName}" saved successfully!`);
        
        // Refresh the templates view if we're currently viewing saved templates
        if (document.querySelector('[data-tab="saved"]').classList.contains('active')) {
            this.displayTemplates('saved');
        }
    }

    deleteUserTemplate(templateId) {
        if (!confirm('Are you sure you want to delete this template?')) {
            return;
        }

        this.userTemplates = this.userTemplates.filter(t => t.id !== templateId);
        this.saveUserTemplates();
        this.displayTemplates('saved');
        
        alert('Template deleted successfully!');
    }
}

// Initialize Template Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.builder-container')) {
        window.templateManager = new TemplateManager();
        
        // Set up initial template display
        setTimeout(() => {
            window.templateManager.displayTemplates('library');
        }, 100);
        
        console.log('📋 Template Manager initialized successfully!');
    }
});

// Add CSS for template cards
const templateStyles = document.createElement('style');
templateStyles.textContent = `
    .template-card {
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        background: white;
    }
    
    .template-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .template-thumbnail {
        width: 100%;
        height: 150px;
        overflow: hidden;
    }
    
    .template-thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .template-info {
        padding: 1rem;
    }
    
    .template-info h4 {
        margin: 0 0 0.5rem 0;
        color: #2d3748;
        font-size: 1.1rem;
    }
    
    .template-info p {
        margin: 0 0 1rem 0;
        color: #718096;
        font-size: 0.9rem;
        line-height: 1.4;
    }
    
    .template-actions {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }
    
    .template-actions button {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .no-templates {
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem;
        color: #718096;
    }
    
    #save-template-btn {
        margin-right: 0.75rem;
    }
`;
document.head.appendChild(templateStyles);