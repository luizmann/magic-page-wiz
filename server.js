const express = require('express');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const UserAgent = require('user-agents');

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting storage (in production, use Redis or similar)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // Max 10 requests per minute per IP

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting middleware
function rateLimit(req, res, next) {
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    const clientKey = `rate_limit_${clientIP}`;
    
    // Clean old entries
    const clientData = rateLimitStore.get(clientKey) || { requests: [], lastCleanup: now };
    clientData.requests = clientData.requests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);
    
    // Check rate limit
    if (clientData.requests.length >= RATE_LIMIT_MAX_REQUESTS) {
        return res.status(429).json({
            error: 'Rate limit exceeded. Please wait before making more requests.',
            retryAfter: Math.ceil(RATE_LIMIT_WINDOW / 1000)
        });
    }
    
    // Add current request
    clientData.requests.push(now);
    rateLimitStore.set(clientKey, clientData);
    
    next();
}

// Utility function to get random user agent
function getRandomUserAgent() {
    const userAgent = new UserAgent();
    return userAgent.toString();
}

// Utility function to clean and format price
function cleanPrice(priceText) {
    if (!priceText) return null;
    // Extract numbers and decimal points
    const match = priceText.match(/[\d,]+\.?\d*/);
    if (match) {
        const price = match[0].replace(/,/g, '');
        return `$${price}`;
    }
    return null;
}

// Utility function to extract text content safely
function extractText($, selector, defaultValue = '') {
    const element = $(selector);
    return element.length > 0 ? element.text().trim() : defaultValue;
}

// Utility function to validate and normalize image URLs
function normalizeImageUrl(url, baseUrl) {
    if (!url) return null;
    
    // Remove query parameters that might cause issues
    url = url.split('?')[0];
    
    // Handle relative URLs
    if (url.startsWith('//')) {
        return 'https:' + url;
    } else if (url.startsWith('/')) {
        const base = new URL(baseUrl);
        return `${base.protocol}//${base.host}${url}`;
    } else if (!url.startsWith('http')) {
        return null;
    }
    
    return url;
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/builder', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'builder.html'));
});

app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Magic Page Wiz is running!' });
});

// API Documentation endpoint
app.get('/api/docs', (req, res) => {
    res.json({
        title: 'Magic Page Wiz API Documentation',
        version: '1.0.0',
        description: 'Real API integration system for CJ Dropshipping and Shopify product imports',
        endpoints: {
            'GET /health': 'Health check endpoint',
            'GET /api/docs': 'This documentation',
            'POST /api/import/cj': 'Import product from CJ Dropshipping URL',
            'POST /api/import/shopify': 'Import product from Shopify store URL'
        },
        rateLimit: {
            requests: 10,
            window: '60 seconds',
            scope: 'per IP address'
        },
        features: [
            'Real web scraping (not simulation)',
            'Multiple extraction strategies',
            'Fallback data on partial failures',
            'Rate limiting protection',
            'Image URL normalization',
            'Price extraction and formatting'
        ],
        exampleRequests: {
            cjDropshipping: {
                url: '/api/import/cj',
                method: 'POST',
                body: { url: 'https://cjdropshipping.com/product/12345/product-name' }
            },
            shopify: {
                url: '/api/import/shopify', 
                method: 'POST',
                body: { url: 'https://store.myshopify.com/products/product-name' }
            }
        }
    });
});

// Test endpoint for API validation
app.get('/api/test', (req, res) => {
    const testData = {
        timestamp: new Date().toISOString(),
        status: 'API is functional',
        endpoints: {
            cj: '/api/import/cj',
            shopify: '/api/import/shopify'
        },
        testUrls: {
            cjExample: 'https://cjdropshipping.com/product/12345/test-product',
            shopifyExample: 'https://example.myshopify.com/products/test-product'
        },
        note: 'Use POST requests with JSON body containing "url" field'
    };
    res.json(testData);
});

// CJ Dropshipping Import API
app.post('/api/import/cj', rateLimit, async (req, res) => {
    const { url } = req.body;

    if (!url || !url.includes('cjdropshipping.com')) {
        return res.status(400).json({ 
            error: 'Invalid CJ Dropshipping URL provided' 
        });
    }

    try {
        console.log(`🔍 Scraping CJ Dropshipping URL: ${url}`);
        
        // Make request with proper headers to avoid detection
        const response = await axios.get(url, {
            headers: {
                'User-Agent': getRandomUserAgent(),
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate',
                'DNT': '1',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Cache-Control': 'max-age=0'
            },
            timeout: 15000,
            maxRedirects: 5
        });

        const $ = cheerio.load(response.data);

        // Extract product data from CJ Dropshipping page with multiple selector strategies
        const productData = {
            id: url.split('/').pop() || Date.now().toString(),
            name: '',
            description: '',
            price: null,
            originalPrice: null,
            images: [],
            features: [],
            specifications: {},
            reviews: [],
            source: 'cj'
        };

        // Extract product name with multiple selectors
        const nameSelectors = [
            'h1',
            '.product-title',
            '.product-name', 
            '[data-testid="product-title"]',
            '.title',
            '#product-title',
            '.product__title'
        ];
        
        for (const selector of nameSelectors) {
            const name = extractText($, selector);
            if (name && name.length > 3) {
                productData.name = name;
                break;
            }
        }
        
        if (!productData.name) {
            productData.name = 'CJ Dropshipping Product';
        }

        // Extract description with multiple selectors
        const descSelectors = [
            '.product-description',
            '.product-detail',
            '.description',
            '.product__description',
            '[data-testid="product-description"]',
            '.prod-desc',
            '#description'
        ];
        
        for (const selector of descSelectors) {
            const desc = extractText($, selector);
            if (desc && desc.length > 10) {
                productData.description = desc.substring(0, 500); // Limit length
                break;
            }
        }
        
        if (!productData.description) {
            productData.description = 'High-quality product imported from CJ Dropshipping.';
        }

        // Extract prices with multiple selectors
        const priceSelectors = [
            '.price',
            '.current-price',
            '.product-price',
            '[data-testid="price"]',
            '.price-current',
            '#price'
        ];
        
        for (const selector of priceSelectors) {
            const price = cleanPrice(extractText($, selector));
            if (price) {
                productData.price = price;
                break;
            }
        }
        
        if (!productData.price) {
            productData.price = '$0.00';
        }

        // Extract original price
        const originalPriceSelectors = [
            '.original-price',
            '.old-price',
            '.compare-price',
            '.was-price',
            '[data-testid="original-price"]'
        ];
        
        for (const selector of originalPriceSelectors) {
            const originalPrice = cleanPrice(extractText($, selector));
            if (originalPrice && originalPrice !== productData.price) {
                productData.originalPrice = originalPrice;
                break;
            }
        }

        // Extract images with improved logic
        const images = new Set(); // Use Set to avoid duplicates
        $('img[src*=".jpg"], img[src*=".jpeg"], img[src*=".png"], img[src*=".webp"]').each((i, el) => {
            const src = $(el).attr('src') || $(el).attr('data-src');
            if (src && images.size < 5) {
                const normalizedUrl = normalizeImageUrl(src, url);
                if (normalizedUrl && 
                    (normalizedUrl.includes('product') || normalizedUrl.includes('image')) && 
                    !normalizedUrl.includes('icon') &&
                    !normalizedUrl.includes('logo')) {
                    images.add(normalizedUrl);
                }
            }
        });

        productData.images = Array.from(images);
        
        // If no images found, add placeholder
        if (productData.images.length === 0) {
            productData.images.push('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop');
        }

        // Extract features from bullet points or lists
        const featureSelectors = [
            'ul li',
            '.features li',
            '.product-features li',
            '[class*="feature"] li',
            '.highlights li',
            '.benefits li'
        ];
        
        for (const selector of featureSelectors) {
            $(selector).each((i, el) => {
                const feature = $(el).text().trim();
                if (feature && feature.length > 5 && feature.length < 200 && productData.features.length < 8) {
                    productData.features.push(feature);
                }
            });
            if (productData.features.length >= 4) break;
        }

        // If no features found, add default ones
        if (productData.features.length === 0) {
            productData.features = [
                'High quality materials',
                'Fast shipping worldwide', 
                'Excellent customer service',
                'Money-back guarantee'
            ];
        }

        // Extract specifications from tables or definition lists
        $('table tr, dl dt, .specs tr, .specifications tr').each((i, el) => {
            const key = $(el).find('td:first, dt, th:first').text().trim();
            const value = $(el).find('td:last, dd, td:nth-child(2)').text().trim();
            if (key && value && key !== value && key.length < 50 && value.length < 100 && Object.keys(productData.specifications).length < 6) {
                productData.specifications[key] = value;
            }
        });

        // Add source information
        productData.specifications['Source'] = 'CJ Dropshipping';
        productData.specifications['Import Date'] = new Date().toLocaleDateString();

        console.log(`✅ Successfully scraped CJ product: ${productData.name}`);
        res.json(productData);

    } catch (error) {
        console.error('❌ CJ Dropshipping scraping error:', error.message);
        
        // Return fallback data if scraping fails
        const fallbackData = {
            id: Date.now().toString(),
            name: 'CJ Dropshipping Product',
            description: 'This product was imported but some details could not be extracted. Please edit the content as needed.',
            price: '$0.00',
            originalPrice: null,
            images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop'],
            features: [
                'High quality product',
                'Fast shipping available',
                'Customer support included',
                'Satisfaction guaranteed'
            ],
            specifications: {
                'Source': 'CJ Dropshipping',
                'Import Date': new Date().toLocaleDateString()
            },
            reviews: [],
            source: 'cj',
            error: 'Some product details could not be extracted'
        };

        res.json(fallbackData);
    }
});

// Shopify Import API
app.post('/api/import/shopify', rateLimit, async (req, res) => {
    const { url } = req.body;

    if (!url || (!url.includes('.myshopify.com') && !url.includes('/products/'))) {
        return res.status(400).json({ 
            error: 'Invalid Shopify URL provided' 
        });
    }

    try {
        console.log(`🔍 Scraping Shopify URL: ${url}`);
        
        let productData = null;
        
        // Try to get product JSON data first (Shopify API)
        try {
            const jsonUrl = url.includes('.json') ? url : `${url.split('?')[0]}.json`;
            console.log(`📡 Attempting Shopify JSON API: ${jsonUrl}`);
            
            const jsonResponse = await axios.get(jsonUrl, {
                headers: {
                    'User-Agent': getRandomUserAgent(),
                    'Accept': 'application/json',
                    'Cache-Control': 'no-cache'
                },
                timeout: 10000,
                maxRedirects: 3
            });

            if (jsonResponse.data && jsonResponse.data.product) {
                const product = jsonResponse.data.product;
                console.log(`✅ Shopify JSON API successful for: ${product.title}`);
                
                productData = {
                    id: product.id.toString(),
                    name: product.title || 'Shopify Product',
                    description: product.body_html ? 
                        product.body_html.replace(/<[^>]*>/g, '').substring(0, 500) : 
                        'Premium product imported from Shopify store.',
                    price: product.variants && product.variants[0] ? 
                        `$${parseFloat(product.variants[0].price).toFixed(2)}` : '$0.00',
                    originalPrice: product.variants && product.variants[0] && product.variants[0].compare_at_price ? 
                                  `$${parseFloat(product.variants[0].compare_at_price).toFixed(2)}` : null,
                    images: product.images ? product.images.map(img => img.src).slice(0, 5) : [],
                    features: [],
                    specifications: {},
                    reviews: [],
                    source: 'shopify'
                };

                // Extract features from product options or description
                if (product.options) {
                    product.options.forEach(option => {
                        if (option.values && option.values.length > 0) {
                            productData.features.push(`${option.name}: ${option.values.join(', ')}`);
                        }
                    });
                }

                // Add product specifications
                if (product.product_type) productData.specifications['Product Type'] = product.product_type;
                if (product.vendor) productData.specifications['Brand'] = product.vendor;
                if (product.created_at) productData.specifications['Created'] = new Date(product.created_at).toLocaleDateString();
                if (product.handle) productData.specifications['Product Handle'] = product.handle;
                
                // Extract features from tags
                if (product.tags && product.tags.length > 0) {
                    const tags = product.tags.split(',').map(tag => tag.trim()).slice(0, 3);
                    if (tags.length > 0) {
                        productData.features.push(`Tags: ${tags.join(', ')}`);
                    }
                }
            }
        } catch (jsonError) {
            console.log('📄 Shopify JSON API failed, falling back to HTML scraping');
        }

        // If JSON API failed, fall back to HTML scraping
        if (!productData) {
            console.log('🌐 Attempting HTML scraping');
            
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': getRandomUserAgent(),
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Accept-Encoding': 'gzip, deflate',
                    'DNT': '1',
                    'Connection': 'keep-alive',
                    'Upgrade-Insecure-Requests': '1',
                    'Cache-Control': 'max-age=0'
                },
                timeout: 15000,
                maxRedirects: 5
            });

            const $ = cheerio.load(response.data);

            productData = {
                id: Date.now().toString(),
                name: '',
                description: '',
                price: null,
                originalPrice: null,
                images: [],
                features: [],
                specifications: {},
                reviews: [],
                source: 'shopify'
            };

            // Extract product name with multiple selectors
            const nameSelectors = [
                'h1',
                '.product-title',
                '.product__title',
                '[data-testid="product-title"]',
                '.product-single__title',
                '.product_title',
                '#ProductTitle'
            ];
            
            for (const selector of nameSelectors) {
                const name = extractText($, selector);
                if (name && name.length > 3) {
                    productData.name = name;
                    break;
                }
            }
            
            if (!productData.name) {
                productData.name = 'Shopify Product';
            }

            // Extract description with multiple selectors  
            const descSelectors = [
                '.product-description',
                '.product__description',
                '.product-detail',
                '[data-testid="product-description"]',
                '.product-single__description',
                '.rte',
                '#ProductDescription'
            ];
            
            for (const selector of descSelectors) {
                const desc = extractText($, selector);
                if (desc && desc.length > 10) {
                    productData.description = desc.substring(0, 500);
                    break;
                }
            }
            
            if (!productData.description) {
                productData.description = 'Premium product imported from trusted Shopify store.';
            }

            // Extract prices with multiple selectors
            const priceSelectors = [
                '.price',
                '.product-price',
                '.money',
                '[data-testid="price"]',
                '.product__price',
                '.price-current',
                '#ProductPrice'
            ];
            
            for (const selector of priceSelectors) {
                const price = cleanPrice(extractText($, selector));
                if (price) {
                    productData.price = price;
                    break;
                }
            }
            
            if (!productData.price) {
                productData.price = '$0.00';
            }

            // Extract original price
            const originalPriceSelectors = [
                '.compare-at-price',
                '.was-price',
                '.price--compare',
                '[data-testid="original-price"]',
                '.product__price--compare',
                '#ComparePrice'
            ];
            
            for (const selector of originalPriceSelectors) {
                const originalPrice = cleanPrice(extractText($, selector));
                if (originalPrice && originalPrice !== productData.price) {
                    productData.originalPrice = originalPrice;
                    break;
                }
            }

            // Extract images with improved logic
            const images = new Set();
            $('img[src*=".jpg"], img[src*=".jpeg"], img[src*=".png"], img[src*=".webp"]').each((i, el) => {
                const src = $(el).attr('src') || $(el).attr('data-src');
                if (src && images.size < 5) {
                    const normalizedUrl = normalizeImageUrl(src, url);
                    if (normalizedUrl && 
                        (normalizedUrl.includes('product') || 
                         normalizedUrl.includes('image') || 
                         normalizedUrl.includes('cdn.shopify')) && 
                        !normalizedUrl.includes('icon') &&
                        !normalizedUrl.includes('logo')) {
                        images.add(normalizedUrl);
                    }
                }
            });

            productData.images = Array.from(images);

            // Extract features from various selectors
            const featureSelectors = [
                '.product-features li',
                '.features li',
                'ul li',
                '.highlights li',
                '.benefits li',
                '.product__description ul li'
            ];
            
            for (const selector of featureSelectors) {
                $(selector).each((i, el) => {
                    const feature = $(el).text().trim();
                    if (feature && feature.length > 5 && feature.length < 200 && productData.features.length < 8) {
                        productData.features.push(feature);
                    }
                });
                if (productData.features.length >= 4) break;
            }
        }

        // Ensure we have some features
        if (productData.features.length === 0) {
            productData.features = [
                'Premium quality product',
                'Fast and secure checkout',
                'Customer satisfaction guaranteed',
                'Trusted Shopify merchant'
            ];
        }

        // Ensure we have images
        if (productData.images.length === 0) {
            productData.images.push('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop');
        }

        // Add source information
        productData.specifications['Source'] = 'Shopify';
        productData.specifications['Import Date'] = new Date().toLocaleDateString();

        console.log(`✅ Successfully scraped Shopify product: ${productData.name}`);
        res.json(productData);

    } catch (error) {
        console.error('❌ Shopify scraping error:', error.message);
        
        // Return fallback data if scraping fails
        const fallbackData = {
            id: Date.now().toString(),
            name: 'Shopify Product',
            description: 'This product was imported but some details could not be extracted. Please edit the content as needed.',
            price: '$0.00',
            originalPrice: null,
            images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop'],
            features: [
                'Premium quality product',
                'Fast and secure checkout',
                'Customer satisfaction guaranteed',
                'Trusted Shopify merchant'
            ],
            specifications: {
                'Source': 'Shopify',
                'Import Date': new Date().toLocaleDateString()
            },
            reviews: [],
            source: 'shopify',
            error: 'Some product details could not be extracted'
        };

        res.json(fallbackData);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Magic Page Wiz server running on port ${PORT}`);
    console.log('🚀 Real API integration system activated!');
    console.log('📡 CJ Dropshipping scraping: /api/import/cj');
    console.log('🛍️ Shopify scraping: /api/import/shopify');
    console.log('⚡ Rate limiting: 10 requests per minute per IP');
});