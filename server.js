const express = require('express');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const UserAgent = require('user-agents');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Utility function to get random user agent
function getRandomUserAgent() {
    const userAgent = new UserAgent();
    return userAgent.toString();
}

// Utility function to clean and format price
function cleanPrice(priceText) {
    if (!priceText) return null;
    const match = priceText.match(/[\d,]+\.?\d*/);
    return match ? `$${match[0]}` : null;
}

// Utility function to extract text content safely
function extractText($, selector, defaultValue = '') {
    const element = $(selector);
    return element.length > 0 ? element.text().trim() : defaultValue;
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

// CJ Dropshipping Import API
app.post('/api/import/cj', async (req, res) => {
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
                'Upgrade-Insecure-Requests': '1'
            },
            timeout: 15000
        });

        const $ = cheerio.load(response.data);

        // Extract product data from CJ Dropshipping page
        const productData = {
            id: url.split('/').pop() || Date.now().toString(),
            name: extractText($, 'h1, .product-title, .product-name, [class*="title"]') || 'Imported Product',
            description: extractText($, '.product-description, .product-detail, .description, [class*="description"]') || 'Product imported from CJ Dropshipping',
            price: cleanPrice(extractText($, '.price, .current-price, [class*="price"]')) || '$0.00',
            originalPrice: cleanPrice(extractText($, '.original-price, .old-price, [class*="original"]')) || null,
            images: [],
            features: [],
            specifications: {},
            reviews: [],
            source: 'cj'
        };

        // Extract images
        const images = [];
        $('img[src*=".jpg"], img[src*=".jpeg"], img[src*=".png"], img[src*=".webp"]').each((i, el) => {
            const src = $(el).attr('src');
            if (src && (src.includes('product') || src.includes('image')) && !src.includes('icon') && images.length < 5) {
                // Convert relative URLs to absolute
                const imageUrl = src.startsWith('http') ? src : `https://cjdropshipping.com${src}`;
                images.push(imageUrl);
            }
        });

        // If no images found, add placeholder
        if (images.length === 0) {
            images.push('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop');
        }
        productData.images = images;

        // Extract features from bullet points or lists
        $('ul li, .features li, [class*="feature"] li').each((i, el) => {
            const feature = $(el).text().trim();
            if (feature && feature.length > 5 && productData.features.length < 8) {
                productData.features.push(feature);
            }
        });

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
        $('table tr, dl dt').each((i, el) => {
            const key = $(el).find('td:first, dt').text().trim();
            const value = $(el).find('td:last, dd').text().trim();
            if (key && value && key !== value && Object.keys(productData.specifications).length < 6) {
                productData.specifications[key] = value;
            }
        });

        console.log(`✅ Successfully scraped product: ${productData.name}`);
        res.json(productData);

    } catch (error) {
        console.error('❌ CJ Dropshipping scraping error:', error.message);
        
        // Return fallback data if scraping fails
        const fallbackData = {
            id: Date.now().toString(),
            name: 'Imported Product from CJ Dropshipping',
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
app.post('/api/import/shopify', async (req, res) => {
    const { url } = req.body;

    if (!url || (!url.includes('.myshopify.com') && !url.includes('/products/'))) {
        return res.status(400).json({ 
            error: 'Invalid Shopify URL provided' 
        });
    }

    try {
        console.log(`🔍 Scraping Shopify URL: ${url}`);
        
        // Try to get product JSON data first (Shopify API)
        let productData = null;
        try {
            const jsonUrl = url.includes('.json') ? url : `${url.split('?')[0]}.json`;
            const jsonResponse = await axios.get(jsonUrl, {
                headers: {
                    'User-Agent': getRandomUserAgent(),
                    'Accept': 'application/json'
                },
                timeout: 10000
            });

            if (jsonResponse.data && jsonResponse.data.product) {
                const product = jsonResponse.data.product;
                productData = {
                    id: product.id.toString(),
                    name: product.title || 'Shopify Product',
                    description: product.body_html ? product.body_html.replace(/<[^>]*>/g, '') : 'Product imported from Shopify',
                    price: product.variants && product.variants[0] ? `$${(product.variants[0].price)}` : '$0.00',
                    originalPrice: product.variants && product.variants[0] && product.variants[0].compare_at_price ? 
                                  `$${product.variants[0].compare_at_price}` : null,
                    images: product.images ? product.images.map(img => img.src) : [],
                    features: [],
                    specifications: {},
                    reviews: [],
                    source: 'shopify'
                };

                // Extract features from product options or description
                if (product.options) {
                    product.options.forEach(option => {
                        if (option.values) {
                            productData.features.push(`${option.name}: ${option.values.join(', ')}`);
                        }
                    });
                }

                // Add product type and vendor as specifications
                if (product.product_type) productData.specifications['Product Type'] = product.product_type;
                if (product.vendor) productData.specifications['Brand'] = product.vendor;
                if (product.created_at) productData.specifications['Created'] = new Date(product.created_at).toLocaleDateString();
            }
        } catch (jsonError) {
            console.log('JSON API failed, falling back to HTML scraping');
        }

        // If JSON API failed, fall back to HTML scraping
        if (!productData) {
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': getRandomUserAgent(),
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Accept-Encoding': 'gzip, deflate',
                    'DNT': '1',
                    'Connection': 'keep-alive',
                    'Upgrade-Insecure-Requests': '1'
                },
                timeout: 15000
            });

            const $ = cheerio.load(response.data);

            productData = {
                id: Date.now().toString(),
                name: extractText($, 'h1, .product-title, .product__title, [class*="title"]') || 'Shopify Product',
                description: extractText($, '.product-description, .product__description, .product-detail, [class*="description"]') || 'Product imported from Shopify',
                price: cleanPrice(extractText($, '.price, .product-price, .money, [class*="price"]')) || '$0.00',
                originalPrice: cleanPrice(extractText($, '.compare-at-price, .was-price, [class*="original"]')) || null,
                images: [],
                features: [],
                specifications: {},
                reviews: [],
                source: 'shopify'
            };

            // Extract images
            const images = [];
            $('img[src*=".jpg"], img[src*=".jpeg"], img[src*=".png"], img[src*=".webp"]').each((i, el) => {
                const src = $(el).attr('src') || $(el).attr('data-src');
                if (src && (src.includes('product') || src.includes('image')) && !src.includes('icon') && images.length < 5) {
                    const imageUrl = src.startsWith('http') ? src : `https:${src}`;
                    images.push(imageUrl);
                }
            });

            if (images.length === 0) {
                images.push('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop');
            }
            productData.images = images;

            // Extract features
            $('.product-features li, .features li, ul li').each((i, el) => {
                const feature = $(el).text().trim();
                if (feature && feature.length > 5 && productData.features.length < 8) {
                    productData.features.push(feature);
                }
            });
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

        // Clean price formatting
        if (productData.price && !productData.price.startsWith('$')) {
            productData.price = `$${productData.price}`;
        }
        if (productData.originalPrice && !productData.originalPrice.startsWith('$')) {
            productData.originalPrice = `$${productData.originalPrice}`;
        }

        console.log(`✅ Successfully scraped Shopify product: ${productData.name}`);
        res.json(productData);

    } catch (error) {
        console.error('❌ Shopify scraping error:', error.message);
        
        // Return fallback data if scraping fails
        const fallbackData = {
            id: Date.now().toString(),
            name: 'Imported Product from Shopify',
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
});