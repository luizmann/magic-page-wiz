// Magic Page Wiz - Import System for CJ Dropshipping and Shopify
class ImportManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        const importCJBtn = document.getElementById('importCJ');
        if (importCJBtn) {
            importCJBtn.addEventListener('click', () => this.importFromCJ());
        }

        const importShopifyBtn = document.getElementById('importShopify');
        if (importShopifyBtn) {
            importShopifyBtn.addEventListener('click', () => this.importFromShopify());
        }
    }

    async importFromCJ() {
        const urlInput = document.getElementById('cjUrl');
        const url = urlInput.value.trim();

        if (!url) {
            alert('Please enter a CJ Dropshipping URL');
            return;
        }

        if (!this.isValidCJUrl(url)) {
            alert('Please enter a valid CJ Dropshipping product URL');
            return;
        }

        const importBtn = document.getElementById('importCJ');
        const originalText = importBtn.textContent;
        importBtn.textContent = '⏳ Importing...';
        importBtn.disabled = true;

        try {
            console.log('🔍 Starting real CJ Dropshipping import for:', url);
            
            // Make real API call to our backend
            const response = await fetch('/api/import/cj', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to import from CJ Dropshipping');
            }

            const productData = await response.json();
            
            // Show warning if there were extraction issues
            if (productData.error) {
                console.warn('⚠️ Import completed with warnings:', productData.error);
                alert('⚠️ Product imported with some limitations. Some details could not be extracted and may need manual editing.');
            }
            
            this.createPageFromProductData(productData, 'cj');
            
            alert('✅ Product imported successfully from CJ Dropshipping!');
            
        } catch (error) {
            console.error('❌ CJ Import error:', error);
            alert(`❌ Error importing product: ${error.message}`);
        } finally {
            importBtn.textContent = originalText;
            importBtn.disabled = false;
        }
    }

    async importFromShopify() {
        const urlInput = document.getElementById('shopifyUrl');
        const url = urlInput.value.trim();

        if (!url) {
            alert('Please enter a Shopify product URL');
            return;
        }

        if (!this.isValidShopifyUrl(url)) {
            alert('Please enter a valid Shopify product URL');
            return;
        }

        const importBtn = document.getElementById('importShopify');
        const originalText = importBtn.textContent;
        importBtn.textContent = '⏳ Importing...';
        importBtn.disabled = true;

        try {
            console.log('🔍 Starting real Shopify import for:', url);
            
            // Make real API call to our backend
            const response = await fetch('/api/import/shopify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to import from Shopify');
            }

            const productData = await response.json();
            
            // Show warning if there were extraction issues
            if (productData.error) {
                console.warn('⚠️ Import completed with warnings:', productData.error);
                alert('⚠️ Product imported with some limitations. Some details could not be extracted and may need manual editing.');
            }
            
            this.createPageFromProductData(productData, 'shopify');
            
            alert('✅ Product imported successfully from Shopify!');
            
        } catch (error) {
            console.error('❌ Shopify Import error:', error);
            alert(`❌ Error importing product: ${error.message}`);
        } finally {
            importBtn.textContent = originalText;
            importBtn.disabled = false;
        }
    }

    isValidCJUrl(url) {
        // Check if URL contains CJ Dropshipping domains
        const cjDomains = ['cjdropshipping.com', 'cj-dropshipping.com'];
        return cjDomains.some(domain => url.toLowerCase().includes(domain));
    }

    isValidShopifyUrl(url) {
        // Check if URL contains .myshopify.com or common Shopify patterns
        return url.toLowerCase().includes('.myshopify.com') || 
               url.toLowerCase().includes('/products/') ||
               (url.includes('shopify') && url.includes('/products/'));
    }

    createPageFromProductData(productData, source) {
        if (!window.pageBuilder) {
            alert('Page builder not available');
            return;
        }

        // Clear current page if user confirms
        if (window.pageBuilder.pageData.elements.length > 0) {
            if (!confirm('This will replace your current page. Are you sure?')) {
                return;
            }
        }

        // Clear current page
        window.pageBuilder.pageData.elements = [];

        // Get current copy level for enhanced content
        const copyLevel = window.pageBuilder.pageData.settings.copyLevel;

        // Create page structure based on product data with copy level enhancements
        this.addProductHeroSection(productData, copyLevel);
        this.addProductGallery(productData, copyLevel);
        this.addProductDescription(productData, copyLevel);
        this.addProductFeatures(productData, copyLevel);
        this.addProductSpecifications(productData, copyLevel);
        this.addProductReviews(productData, copyLevel);
        this.addProductPricing(productData, copyLevel);
        this.addProductCTA(productData, copyLevel);

        // Update page title
        window.pageBuilder.pageData.settings.title = productData.name;
        document.querySelector('.page-title').textContent = productData.name;

        // Trigger auto-save for real-time updates
        window.pageBuilder.triggerAutoSave();

        // Switch back to builder view
        window.pageBuilder.switchSection('builder');
        
        // Show success notification
        window.pageBuilder.showNotification(`✅ Product imported successfully from ${source}!`, 'success');
    }

    addProductHeroSection(productData, copyLevel) {
        // Enhanced hero heading based on copy level
        let heroTitle = productData.name;
        if (copyLevel === 'advanced') {
            heroTitle = `EXCLUSIVE: ${productData.name} - Limited Time Only!`;
        } else if (copyLevel === 'intermediate') {
            heroTitle = `Discover ${productData.name}`;
        }

        // Hero heading
        window.pageBuilder.addElement('heading', {
            content: { text: heroTitle, level: 'h1' },
            styles: { 
                fontSize: copyLevel === 'advanced' ? '48px' : '42px', 
                textAlign: 'center', 
                color: copyLevel === 'advanced' ? '#e53e3e' : '#2d3748', 
                marginBottom: '20px',
                fontWeight: 'bold',
                textShadow: copyLevel === 'advanced' ? '2px 2px 4px rgba(0,0,0,0.3)' : 'none'
            }
        });

        // Enhanced hero subheading
        let heroDescription = productData.description;
        if (copyLevel === 'advanced') {
            heroDescription = `⚡ BREAKTHROUGH: ${productData.description} Don't miss this exclusive opportunity!`;
        } else if (copyLevel === 'intermediate') {
            heroDescription = `✨ ${productData.description} Join thousands of satisfied customers.`;
        }

        window.pageBuilder.addElement('text', {
            content: { text: heroDescription },
            styles: { 
                fontSize: '20px', 
                textAlign: 'center', 
                color: '#4a5568', 
                marginBottom: '30px',
                lineHeight: '1.6',
                fontWeight: copyLevel === 'advanced' ? '600' : 'normal'
            }
        });

        // Hero image with enhanced styling
        window.pageBuilder.addElement('image', {
            content: { 
                src: productData.images[0],
                alt: productData.name
            },
            styles: { 
                width: '100%', 
                maxWidth: '600px', 
                margin: '0 auto 40px auto', 
                display: 'block',
                borderRadius: copyLevel === 'advanced' ? '15px' : '8px',
                boxShadow: copyLevel === 'advanced' ? '0 8px 25px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.1)',
                border: copyLevel === 'advanced' ? '3px solid #e53e3e' : 'none'
            }
        });
    }

    addProductGallery(productData) {
        if (productData.images.length > 1) {
            window.pageBuilder.addElement('heading', {
                content: { text: 'Product Gallery', level: 'h2' },
                styles: { 
                    fontSize: '32px', 
                    color: '#2d3748', 
                    marginBottom: '20px',
                    textAlign: 'center'
                }
            });

            // Add additional images
            productData.images.slice(1).forEach(imageUrl => {
                window.pageBuilder.addElement('image', {
                    content: { 
                        src: imageUrl,
                        alt: `${productData.name} - Additional view`
                    },
                    styles: { 
                        width: '100%', 
                        maxWidth: '400px', 
                        margin: '10px auto', 
                        display: 'block',
                        borderRadius: '8px'
                    }
                });
            });
        }
    }

    addProductDescription(productData) {
        window.pageBuilder.addElement('heading', {
            content: { text: 'Product Description', level: 'h2' },
            styles: { 
                fontSize: '32px', 
                color: '#2d3748', 
                marginBottom: '20px',
                marginTop: '40px'
            }
        });

        window.pageBuilder.addElement('text', {
            content: { text: productData.description },
            styles: { 
                fontSize: '18px', 
                lineHeight: '1.6', 
                marginBottom: '30px',
                color: '#4a5568'
            }
        });
    }

    addProductFeatures(productData) {
        if (productData.features && productData.features.length > 0) {
            window.pageBuilder.addElement('heading', {
                content: { text: 'Key Features', level: 'h2' },
                styles: { 
                    fontSize: '32px', 
                    color: '#2d3748', 
                    marginBottom: '20px',
                    marginTop: '40px'
                }
            });

            const featuresText = productData.features.map(feature => `✅ ${feature}`).join('\n');
            window.pageBuilder.addElement('text', {
                content: { text: featuresText },
                styles: { 
                    fontSize: '16px', 
                    lineHeight: '2', 
                    marginBottom: '30px',
                    color: '#2d3748'
                }
            });
        }
    }

    addProductSpecifications(productData) {
        if (productData.specifications && Object.keys(productData.specifications).length > 0) {
            window.pageBuilder.addElement('heading', {
                content: { text: 'Specifications', level: 'h2' },
                styles: { 
                    fontSize: '32px', 
                    color: '#2d3748', 
                    marginBottom: '20px',
                    marginTop: '40px'
                }
            });

            const specsText = Object.entries(productData.specifications)
                .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
                .join('<br>');

            window.pageBuilder.addElement('text', {
                content: { text: specsText },
                styles: { 
                    fontSize: '16px', 
                    lineHeight: '1.8', 
                    marginBottom: '30px',
                    color: '#4a5568'
                }
            });
        }
    }

    addProductReviews(productData) {
        if (productData.reviews && productData.reviews.length > 0) {
            window.pageBuilder.addElement('heading', {
                content: { text: 'Customer Reviews', level: 'h2' },
                styles: { 
                    fontSize: '32px', 
                    color: '#2d3748', 
                    marginBottom: '30px',
                    marginTop: '40px',
                    textAlign: 'center'
                }
            });

            productData.reviews.forEach(review => {
                window.pageBuilder.addElement('testimonial', {
                    content: {
                        text: review.text,
                        author: review.author,
                        title: 'Verified Customer',
                        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face'
                    },
                    styles: { marginBottom: '20px' }
                });
            });
        }
    }

    addProductPricing(productData) {
        // Pricing section
        const features = [
            'Free shipping worldwide',
            '30-day money-back guarantee',
            '1-year warranty included',
            '24/7 customer support'
        ];

        if (productData.features && productData.features.length > 0) {
            features.unshift(...productData.features.slice(0, 3));
        }

        window.pageBuilder.addElement('pricing', {
            content: {
                title: productData.name,
                price: productData.price,
                features: features.slice(0, 6)
            },
            styles: { 
                marginTop: '40px',
                marginBottom: '30px',
                maxWidth: '500px',
                margin: '40px auto 30px auto'
            }
        });

        // Add discount notice if there's an original price
        if (productData.originalPrice && productData.originalPrice !== productData.price) {
            const discount = this.calculateDiscount(productData.originalPrice, productData.price);
            window.pageBuilder.addElement('text', {
                content: { 
                    text: `🔥 Save ${discount}% - Limited time offer! Was ${productData.originalPrice}, now only ${productData.price}!`
                },
                styles: { 
                    fontSize: '18px', 
                    textAlign: 'center', 
                    color: '#e53e3e',
                    fontWeight: 'bold',
                    backgroundColor: '#fed7d7',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '30px'
                }
            });
        }
    }

    addProductCTA(productData) {
        // Main CTA button
        window.pageBuilder.addElement('button', {
            content: { 
                text: `Buy Now - ${productData.price}`,
                link: '#order'
            },
            styles: { 
                backgroundColor: '#38a169',
                color: 'white',
                padding: '20px 40px',
                fontSize: '24px',
                fontWeight: 'bold',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'block',
                margin: '0 auto 20px auto',
                textAlign: 'center'
            }
        });

        // Secondary CTA
        window.pageBuilder.addElement('button', {
            content: { 
                text: 'Add to Cart',
                link: '#cart'
            },
            styles: { 
                backgroundColor: '#667eea',
                color: 'white',
                padding: '15px 30px',
                fontSize: '18px',
                fontWeight: '500',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'block',
                margin: '0 auto 40px auto',
                textAlign: 'center'
            }
        });

        // Trust signals
        window.pageBuilder.addElement('text', {
            content: { 
                text: '🔒 Secure Checkout | 📦 Fast Shipping | 💎 Premium Quality | 🔄 Easy Returns'
            },
            styles: { 
                fontSize: '14px', 
                textAlign: 'center', 
                color: '#718096',
                marginTop: '20px'
            }
        });
    }

    calculateDiscount(originalPrice, salePrice) {
        const original = parseFloat(originalPrice.replace(/[^0-9.]/g, ''));
        const sale = parseFloat(salePrice.replace(/[^0-9.]/g, ''));
        return Math.round(((original - sale) / original) * 100);
    }
}

// Initialize Import Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.builder-container')) {
        window.importManager = new ImportManager();
        console.log('📥 Import Manager initialized successfully!');
    }
});