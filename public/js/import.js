// Magic Page Wiz - Import System for CJ Dropshipping and Shopify
class ImportManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventHandlers();
        this.setupAPIEndpoints();
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

    setupAPIEndpoints() {
        // These would be actual API endpoints in production
        this.endpoints = {
            cj: '/api/import/cj',
            shopify: '/api/import/shopify'
        };
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
            // For demo purposes, we'll simulate the import
            const productData = await this.simulateCJImport(url);
            this.createPageFromProductData(productData, 'cj');
            
            alert('✅ Product imported successfully from CJ Dropshipping!');
            
        } catch (error) {
            console.error('CJ Import error:', error);
            alert('❌ Error importing product. Please check the URL and try again.');
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
            // For demo purposes, we'll simulate the import
            const productData = await this.simulateShopifyImport(url);
            this.createPageFromProductData(productData, 'shopify');
            
            alert('✅ Product imported successfully from Shopify!');
            
        } catch (error) {
            console.error('Shopify Import error:', error);
            alert('❌ Error importing product. Please check the URL and try again.');
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

    async simulateCJImport(url) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Extract product ID from URL for simulation
        const productId = this.extractProductIdFromUrl(url);

        // Return mock product data
        return {
            id: productId,
            name: 'Premium Wireless Bluetooth Headphones',
            description: 'Experience crystal-clear audio with our premium wireless headphones. Perfect for music lovers, gamers, and professionals.',
            price: '$79.99',
            originalPrice: '$129.99',
            images: [
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
                'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=400&fit=crop',
                'https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&h=400&fit=crop'
            ],
            features: [
                'Bluetooth 5.0 connectivity',
                '30-hour battery life',
                'Active noise cancellation',
                'Comfortable over-ear design',
                'Built-in microphone for calls',
                'Quick charge: 10 min = 3 hours playback'
            ],
            specifications: {
                'Brand': 'TechSound Pro',
                'Model': 'TS-WH100',
                'Color': 'Matte Black',
                'Weight': '250g',
                'Connectivity': 'Bluetooth 5.0, 3.5mm Jack',
                'Battery': '30 hours wireless, 40 hours wired'
            },
            reviews: [
                {
                    author: 'Mike Chen',
                    rating: 5,
                    text: 'Amazing sound quality and comfort. Best headphones I\'ve ever owned!'
                },
                {
                    author: 'Sarah Johnson',
                    rating: 5,
                    text: 'Perfect for work calls and music. The noise cancellation is incredible.'
                }
            ],
            source: 'cj'
        };
    }

    async simulateShopifyImport(url) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Extract product info from URL for simulation
        const productSlug = this.extractProductSlugFromUrl(url);

        // Return mock product data
        return {
            id: productSlug,
            name: 'Organic Coffee Blend - Premium Roast',
            description: 'Sourced from the finest coffee farms around the world, our premium organic blend delivers a rich, full-bodied flavor that coffee enthusiasts love.',
            price: '$24.99',
            originalPrice: '$34.99',
            images: [
                'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=400&fit=crop',
                'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=400&fit=crop',
                'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&h=400&fit=crop'
            ],
            features: [
                '100% organic certified beans',
                'Medium-dark roast profile',
                'Notes of chocolate and caramel',
                'Ethically sourced and fair trade',
                'Freshly roasted to order',
                'Available in whole bean or ground'
            ],
            specifications: {
                'Origin': 'Colombia, Ethiopia, Brazil',
                'Roast Level': 'Medium-Dark',
                'Process': 'Washed',
                'Flavor Notes': 'Chocolate, Caramel, Nutty',
                'Caffeine Level': 'Medium',
                'Package Size': '12 oz (340g)'
            },
            reviews: [
                {
                    author: 'Coffee Lover',
                    rating: 5,
                    text: 'The best coffee I\'ve tasted! Perfect balance of flavor and aroma.'
                },
                {
                    author: 'Morning Person',
                    rating: 5,
                    text: 'This coffee makes my mornings perfect. Will definitely order again!'
                }
            ],
            source: 'shopify'
        };
    }

    extractProductIdFromUrl(url) {
        // Extract product ID from CJ URL
        const match = url.match(/product[\/\-](\d+)/i);
        return match ? match[1] : 'demo-product-' + Date.now();
    }

    extractProductSlugFromUrl(url) {
        // Extract product slug from Shopify URL
        const match = url.match(/products\/([^\/\?]+)/i);
        return match ? match[1] : 'demo-product-' + Date.now();
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

        // Create page structure based on product data
        this.addProductHeroSection(productData);
        this.addProductGallery(productData);
        this.addProductDescription(productData);
        this.addProductFeatures(productData);
        this.addProductSpecifications(productData);
        this.addProductReviews(productData);
        this.addProductPricing(productData);
        this.addProductCTA(productData);

        // Update page title
        window.pageBuilder.pageData.settings.title = productData.name;
        document.querySelector('.page-title').textContent = productData.name;

        // Switch back to builder view
        window.pageBuilder.switchSection('builder');
    }

    addProductHeroSection(productData) {
        // Hero heading
        window.pageBuilder.addElement('heading', {
            content: { text: productData.name, level: 'h1' },
            styles: { 
                fontSize: '42px', 
                textAlign: 'center', 
                color: '#2d3748', 
                marginBottom: '20px',
                fontWeight: 'bold'
            }
        });

        // Hero subheading
        window.pageBuilder.addElement('text', {
            content: { text: productData.description },
            styles: { 
                fontSize: '20px', 
                textAlign: 'center', 
                color: '#4a5568', 
                marginBottom: '30px',
                lineHeight: '1.6'
            }
        });

        // Hero image
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
                borderRadius: '8px'
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

    // In production, these would be actual API calls
    async callCJAPI(url) {
        const response = await fetch(this.endpoints.cj, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url })
        });

        if (!response.ok) {
            throw new Error('Failed to import from CJ Dropshipping');
        }

        return await response.json();
    }

    async callShopifyAPI(url) {
        const response = await fetch(this.endpoints.shopify, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url })
        });

        if (!response.ok) {
            throw new Error('Failed to import from Shopify');
        }

        return await response.json();
    }
}

// Initialize Import Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.builder-container')) {
        window.importManager = new ImportManager();
        console.log('📥 Import Manager initialized successfully!');
    }
});