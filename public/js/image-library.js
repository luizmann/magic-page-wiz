// Magic Page Wiz - Image Library and Upload System
class ImageLibrary {
    constructor() {
        this.images = [];
        this.categories = ['business', 'fitness', 'technology', 'lifestyle', 'abstract'];
        this.currentCategory = 'all';
        this.init();
    }

    init() {
        this.loadStockImages();
        this.setupImageLibraryButton();
        this.createImageLibraryModal();
    }

    loadStockImages() {
        // Curated high-quality stock images from Unsplash
        this.images = [
            // Business Category
            {
                id: 'business-1',
                url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=300&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=200&h=150&fit=crop',
                category: 'business',
                alt: 'Business meeting',
                keywords: ['business', 'meeting', 'office']
            },
            {
                id: 'business-2',
                url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=150&fit=crop',
                category: 'business',
                alt: 'Professional headshot',
                keywords: ['business', 'professional', 'portrait']
            },
            {
                id: 'business-3',
                url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=150&fit=crop',
                category: 'business',
                alt: 'Business analytics',
                keywords: ['business', 'analytics', 'data']
            },
            
            // Fitness Category
            {
                id: 'fitness-1',
                url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=150&fit=crop',
                category: 'fitness',
                alt: 'Fitness workout',
                keywords: ['fitness', 'workout', 'exercise']
            },
            {
                id: 'fitness-2',
                url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=150&fit=crop',
                category: 'fitness',
                alt: 'Gym equipment',
                keywords: ['fitness', 'gym', 'equipment']
            },
            {
                id: 'fitness-3',
                url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=200&h=150&fit=crop',
                category: 'fitness',
                alt: 'Running shoes',
                keywords: ['fitness', 'running', 'shoes']
            },
            
            // Technology Category
            {
                id: 'tech-1',
                url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=200&h=150&fit=crop',
                category: 'technology',
                alt: 'Software dashboard',
                keywords: ['technology', 'software', 'dashboard']
            },
            {
                id: 'tech-2',
                url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=150&fit=crop',
                category: 'technology',
                alt: 'Mobile app development',
                keywords: ['technology', 'mobile', 'app']
            },
            {
                id: 'tech-3',
                url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&h=150&fit=crop',
                category: 'technology',
                alt: 'Coding workspace',
                keywords: ['technology', 'coding', 'programming']
            },
            
            // Lifestyle Category
            {
                id: 'lifestyle-1',
                url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=150&fit=crop',
                category: 'lifestyle',
                alt: 'Reading book',
                keywords: ['lifestyle', 'reading', 'book']
            },
            {
                id: 'lifestyle-2',
                url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop',
                category: 'lifestyle',
                alt: 'Mountain landscape',
                keywords: ['lifestyle', 'nature', 'mountain']
            },
            {
                id: 'lifestyle-3',
                url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200&h=150&fit=crop',
                category: 'lifestyle',
                alt: 'Coffee cup',
                keywords: ['lifestyle', 'coffee', 'relaxation']
            },
            
            // Abstract Category
            {
                id: 'abstract-1',
                url: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=300&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=200&h=150&fit=crop',
                category: 'abstract',
                alt: 'Abstract gradient',
                keywords: ['abstract', 'gradient', 'colors']
            },
            {
                id: 'abstract-2',
                url: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=400&h=300&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=200&h=150&fit=crop',
                category: 'abstract',
                alt: 'Geometric patterns',
                keywords: ['abstract', 'geometric', 'patterns']
            },
            {
                id: 'abstract-3',
                url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
                thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop',
                category: 'abstract',
                alt: 'Texture background',
                keywords: ['abstract', 'texture', 'background']
            }
        ];
    }

    setupImageLibraryButton() {
        // Add image library button to header
        const headerRight = document.querySelector('.header-right');
        if (headerRight && !document.getElementById('image-library-btn')) {
            const imageLibraryBtn = document.createElement('button');
            imageLibraryBtn.id = 'image-library-btn';
            imageLibraryBtn.className = 'btn-secondary';
            imageLibraryBtn.innerHTML = '🖼️ Images';
            imageLibraryBtn.addEventListener('click', () => this.openImageLibrary());
            
            headerRight.insertBefore(imageLibraryBtn, headerRight.children[1]);
        }
    }

    createImageLibraryModal() {
        const modal = document.createElement('div');
        modal.id = 'image-library-modal';
        modal.className = 'image-library-modal hidden';
        modal.innerHTML = `
            <div class="image-library-content">
                <div class="image-library-header">
                    <h2>🖼️ Image Library</h2>
                    <button class="close-btn" onclick="window.imageLibrary.closeImageLibrary()">×</button>
                </div>
                
                <div class="image-library-toolbar">
                    <div class="image-categories">
                        <button class="category-btn active" data-category="all">All</button>
                        <button class="category-btn" data-category="business">Business</button>
                        <button class="category-btn" data-category="fitness">Fitness</button>
                        <button class="category-btn" data-category="technology">Technology</button>
                        <button class="category-btn" data-category="lifestyle">Lifestyle</button>
                        <button class="category-btn" data-category="abstract">Abstract</button>
                    </div>
                    
                    <div class="image-search">
                        <input type="text" id="image-search-input" placeholder="Search images...">
                        <button id="search-btn">🔍</button>
                    </div>
                    
                    <div class="image-upload">
                        <input type="file" id="image-upload-input" accept="image/*" multiple style="display: none;">
                        <button id="upload-btn" onclick="document.getElementById('image-upload-input').click()">
                            📤 Upload
                        </button>
                    </div>
                </div>
                
                <div class="image-grid" id="image-grid">
                    <!-- Images will be loaded here -->
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.setupImageLibraryEvents();
    }

    setupImageLibraryEvents() {
        // Category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentCategory = e.target.dataset.category;
                this.renderImages();
            });
        });

        // Search functionality
        const searchInput = document.getElementById('image-search-input');
        const searchBtn = document.getElementById('search-btn');
        
        const performSearch = () => {
            const query = searchInput.value.toLowerCase();
            this.renderImages(query);
        };

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // File upload
        const uploadInput = document.getElementById('image-upload-input');
        uploadInput.addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files);
        });

        // Close modal when clicking outside
        document.getElementById('image-library-modal').addEventListener('click', (e) => {
            if (e.target.classList.contains('image-library-modal')) {
                this.closeImageLibrary();
            }
        });
    }

    openImageLibrary() {
        const modal = document.getElementById('image-library-modal');
        modal.classList.remove('hidden');
        this.renderImages();
    }

    closeImageLibrary() {
        const modal = document.getElementById('image-library-modal');
        modal.classList.add('hidden');
    }

    renderImages(searchQuery = '') {
        const imageGrid = document.getElementById('image-grid');
        let filteredImages = this.images;

        // Filter by category
        if (this.currentCategory !== 'all') {
            filteredImages = filteredImages.filter(img => img.category === this.currentCategory);
        }

        // Filter by search query
        if (searchQuery) {
            filteredImages = filteredImages.filter(img => 
                img.alt.toLowerCase().includes(searchQuery) ||
                img.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery))
            );
        }

        imageGrid.innerHTML = filteredImages.map(image => `
            <div class="image-item" data-image-id="${image.id}">
                <img src="${image.thumbnail}" alt="${image.alt}" loading="lazy">
                <div class="image-overlay">
                    <button class="use-image-btn" onclick="window.imageLibrary.selectImage('${image.id}')">
                        Use Image
                    </button>
                </div>
            </div>
        `).join('');
    }

    selectImage(imageId) {
        const image = this.images.find(img => img.id === imageId);
        if (!image) return;

        // If an image element is selected, update it
        if (window.pageBuilder && window.pageBuilder.selectedElement && 
            window.pageBuilder.selectedElement.type === 'image') {
            window.pageBuilder.updateElementProperty(
                window.pageBuilder.selectedElement, 
                'content.src', 
                image.url
            );
            window.pageBuilder.updateElementProperty(
                window.pageBuilder.selectedElement, 
                'content.alt', 
                image.alt
            );
        } else {
            // Otherwise, add a new image element
            if (window.pageBuilder) {
                window.pageBuilder.addElement('image', {
                    content: {
                        src: image.url,
                        alt: image.alt
                    }
                });
            }
        }

        this.closeImageLibrary();
    }

    handleFileUpload(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageData = {
                        id: 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
                        url: e.target.result,
                        thumbnail: e.target.result,
                        category: 'user',
                        alt: file.name.replace(/\.[^/.]+$/, ""),
                        keywords: ['user', 'upload']
                    };
                    
                    this.images.unshift(imageData);
                    this.renderImages();
                    
                    // Show success notification
                    this.showNotification('📤 Image uploaded successfully!');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 10001;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    // Method to get random image by category
    getRandomImage(category = 'all') {
        let availableImages = this.images;
        if (category !== 'all') {
            availableImages = this.images.filter(img => img.category === category);
        }
        
        if (availableImages.length === 0) return null;
        
        const randomIndex = Math.floor(Math.random() * availableImages.length);
        return availableImages[randomIndex];
    }
}

// Initialize Image Library when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.builder-container')) {
        window.imageLibrary = new ImageLibrary();
        console.log('🖼️ Image Library initialized successfully!');
    }
});

// Add CSS for image library
const imageLibraryStyles = document.createElement('style');
imageLibraryStyles.textContent = `
    .image-library-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }
    
    .image-library-content {
        background: white;
        border-radius: 8px;
        width: 90%;
        max-width: 1000px;
        height: 80vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    
    .image-library-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .image-library-header h2 {
        margin: 0;
        color: #2d3748;
    }
    
    .close-btn {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #718096;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.3s ease;
    }
    
    .close-btn:hover {
        background: #f7fafc;
    }
    
    .image-library-toolbar {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #e2e8f0;
        flex-wrap: wrap;
    }
    
    .image-categories {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }
    
    .category-btn {
        padding: 0.5rem 1rem;
        border: 1px solid #e2e8f0;
        background: white;
        color: #4a5568;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;
    }
    
    .category-btn:hover {
        background: #f7fafc;
    }
    
    .category-btn.active {
        background: #667eea;
        color: white;
        border-color: #667eea;
    }
    
    .image-search {
        display: flex;
        gap: 0.5rem;
        flex: 1;
        max-width: 300px;
    }
    
    .image-search input {
        flex: 1;
        padding: 0.5rem;
        border: 1px solid #e2e8f0;
        border-radius: 4px;
        font-size: 0.9rem;
    }
    
    .image-search button,
    .image-upload button {
        padding: 0.5rem 1rem;
        border: 1px solid #e2e8f0;
        background: white;
        color: #4a5568;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;
    }
    
    .image-search button:hover,
    .image-upload button:hover {
        background: #f7fafc;
    }
    
    .image-grid {
        flex: 1;
        overflow-y: auto;
        padding: 1.5rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 1rem;
    }
    
    .image-item {
        position: relative;
        aspect-ratio: 4/3;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.3s ease;
    }
    
    .image-item:hover {
        transform: scale(1.05);
    }
    
    .image-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .image-item:hover .image-overlay {
        opacity: 1;
    }
    
    .use-image-btn {
        background: #667eea;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.3s ease;
    }
    
    .use-image-btn:hover {
        background: #5a67d8;
    }
    
    .hidden {
        display: none !important;
    }
    
    @media (max-width: 768px) {
        .image-library-content {
            width: 95%;
            height: 90vh;
        }
        
        .image-library-toolbar {
            flex-direction: column;
            align-items: stretch;
        }
        
        .image-categories {
            justify-content: center;
        }
        
        .image-grid {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        }
    }
`;
document.head.appendChild(imageLibraryStyles);