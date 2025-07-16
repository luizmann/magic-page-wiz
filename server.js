const express = require('express');
const path = require('path');
const CJDropshippingService = require('./services/cj-dropshipping');
const ShopifyService = require('./services/shopify');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    try {
        const { method = 'api', config = {}, options = {} } = req.body;
        
        // Validate method parameter
        const validMethods = ['api', 'scraping', 'puppeteer', 'cheerio'];
        if (!validMethods.includes(method.toLowerCase())) {
            return res.status(400).json({
                success: false,
                error: `Invalid method. Use one of: ${validMethods.join(', ')}`,
                examplePayload: {
                    method: 'api',
                    config: {
                        email: 'your-email@example.com',
                        password: 'your-password',
                        accessToken: 'your-access-token'
                    },
                    options: {
                        page: 1,
                        limit: 20,
                        categoryId: 'optional-category-id',
                        keyword: 'optional-search-keyword',
                        url: 'required-for-scraping-methods'
                    }
                }
            });
        }

        const cjService = new CJDropshippingService(config);
        const result = await cjService.importProducts(method, options);
        
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Internal server error during CJ Dropshipping import'
        });
    }
});

// Shopify Import API
app.post('/api/import/shopify', async (req, res) => {
    try {
        const { method = 'api', config = {}, options = {} } = req.body;
        
        // Validate method parameter
        const validMethods = ['api', 'scraping', 'puppeteer', 'cheerio', 'single-product'];
        if (!validMethods.includes(method.toLowerCase())) {
            return res.status(400).json({
                success: false,
                error: `Invalid method. Use one of: ${validMethods.join(', ')}`,
                examplePayload: {
                    method: 'api',
                    config: {
                        shopDomain: 'your-shop.myshopify.com',
                        accessToken: 'your-access-token',
                        apiVersion: '2023-10'
                    },
                    options: {
                        limit: 20,
                        fields: 'id,title,handle,body_html,vendor,product_type,variants,images',
                        published_status: 'published',
                        url: 'required-for-scraping-methods',
                        productsUrl: 'optional-specific-products-url-for-scraping'
                    }
                }
            });
        }

        const shopifyService = new ShopifyService(config);
        const result = await shopifyService.importProducts(method, options);
        
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Internal server error during Shopify import'
        });
    }
});

// Get example payloads and documentation
app.get('/api/import/examples', (req, res) => {
    res.json({
        cjDropshipping: {
            endpoint: '/api/import/cj',
            methods: ['api', 'scraping', 'puppeteer', 'cheerio'],
            examples: {
                api: {
                    method: 'api',
                    config: {
                        email: 'your-email@example.com',
                        password: 'your-password',
                        accessToken: 'your-access-token',
                        apiUrl: 'https://developers.cjdropshipping.com/api2.0'
                    },
                    options: {
                        page: 1,
                        limit: 20,
                        categoryId: 'optional-category-id',
                        keyword: 'search-keyword'
                    }
                },
                scraping: {
                    method: 'scraping',
                    config: {
                        headless: true,
                        timeout: 30000
                    },
                    options: {
                        url: 'https://cjdropshipping.com/product/example'
                    }
                }
            }
        },
        shopify: {
            endpoint: '/api/import/shopify',
            methods: ['api', 'scraping', 'puppeteer', 'cheerio', 'single-product'],
            examples: {
                api: {
                    method: 'api',
                    config: {
                        shopDomain: 'your-shop.myshopify.com',
                        accessToken: 'shpat_your-access-token',
                        apiVersion: '2023-10'
                    },
                    options: {
                        limit: 20,
                        fields: 'id,title,handle,body_html,vendor,variants,images',
                        published_status: 'published'
                    }
                },
                scraping: {
                    method: 'scraping',
                    config: {
                        shopDomain: 'your-shop.myshopify.com',
                        headless: true,
                        timeout: 30000
                    },
                    options: {
                        url: 'https://your-shop.myshopify.com',
                        productsUrl: 'https://your-shop.myshopify.com/collections/all'
                    }
                },
                singleProduct: {
                    method: 'single-product',
                    config: {
                        headless: true,
                        timeout: 30000
                    },
                    options: {
                        url: 'https://your-shop.myshopify.com/products/example-product'
                    }
                }
            }
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Magic Page Wiz server running on port ${PORT}`);
});