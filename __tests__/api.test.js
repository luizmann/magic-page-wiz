const request = require('supertest');
const express = require('express');

// Create a separate app instance for testing to avoid port conflicts
const app = express();
const CJDropshippingService = require('../services/cj-dropshipping');
const ShopifyService = require('../services/shopify');

// Configure app exactly like the main server but without starting it
app.use(express.static(__dirname + '/../public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Magic Page Wiz is running!' });
});

// CJ Dropshipping Import API
app.post('/api/import/cj', async (req, res) => {
    try {
        const { method = 'api', config = {}, options = {} } = req.body;
        
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

// Examples endpoint
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

describe('Magic Page Wiz API Endpoints', () => {
    
    describe('GET /health', () => {
        it('should return health status', async () => {
            const response = await request(app)
                .get('/health')
                .expect(200);
            
            expect(response.body).toEqual({
                status: 'OK',
                message: 'Magic Page Wiz is running!'
            });
        });
    });

    describe('GET /api/import/examples', () => {
        it('should return API examples and documentation', async () => {
            const response = await request(app)
                .get('/api/import/examples')
                .expect(200);
            
            expect(response.body).toHaveProperty('cjDropshipping');
            expect(response.body).toHaveProperty('shopify');
            expect(response.body.cjDropshipping).toHaveProperty('endpoint', '/api/import/cj');
            expect(response.body.shopify).toHaveProperty('endpoint', '/api/import/shopify');
        });
    });

    describe('POST /api/import/cj', () => {
        it('should reject invalid method parameter', async () => {
            const response = await request(app)
                .post('/api/import/cj')
                .send({ method: 'invalid' })
                .expect(400);
            
            expect(response.body.success).toBe(false);
            expect(response.body.error).toContain('Invalid method');
            expect(response.body.examplePayload).toBeDefined();
        });

        it('should accept valid method parameter', async () => {
            const response = await request(app)
                .post('/api/import/cj')
                .send({ 
                    method: 'api',
                    config: {},
                    options: {}
                })
                .expect(200);
            
            // Should return an error about missing credentials, but with success: false
            expect(response.body).toHaveProperty('success');
            expect(response.body).toHaveProperty('method', 'api');
        });

        it('should provide clear error message for missing credentials', async () => {
            const response = await request(app)
                .post('/api/import/cj')
                .send({ 
                    method: 'api',
                    config: { accessToken: '' },
                    options: {}
                })
                .expect(200);
            
            expect(response.body.success).toBe(false);
            expect(response.body.error).toContain('access token is required');
        });
    });

    describe('POST /api/import/shopify', () => {
        it('should reject invalid method parameter', async () => {
            const response = await request(app)
                .post('/api/import/shopify')
                .send({ method: 'invalid' })
                .expect(400);
            
            expect(response.body.success).toBe(false);
            expect(response.body.error).toContain('Invalid method');
            expect(response.body.examplePayload).toBeDefined();
        });

        it('should accept valid method parameter', async () => {
            const response = await request(app)
                .post('/api/import/shopify')
                .send({ 
                    method: 'api',
                    config: {},
                    options: {}
                })
                .expect(200);
            
            // Should return an error about missing credentials, but with success: false
            expect(response.body).toHaveProperty('success');
            expect(response.body).toHaveProperty('method', 'api');
        });

        it('should provide clear error message for missing credentials', async () => {
            const response = await request(app)
                .post('/api/import/shopify')
                .send({ 
                    method: 'api',
                    config: { shopDomain: '', accessToken: '' },
                    options: {}
                })
                .expect(200);
            
            expect(response.body.success).toBe(false);
            expect(response.body.error).toContain('shop domain and access token are required');
        });

        it('should support single-product method', async () => {
            const response = await request(app)
                .post('/api/import/shopify')
                .send({ 
                    method: 'single-product',
                    config: {},
                    options: { url: 'https://example.myshopify.com/products/test' }
                })
                .expect(200);
            
            expect(response.body).toHaveProperty('method', 'scraping');
            // Note: This will fail due to missing browser, but that's expected in test environment
        });
    });

    describe('Method parameter validation', () => {
        const validCJMethods = ['api', 'scraping', 'puppeteer', 'cheerio'];
        const validShopifyMethods = ['api', 'scraping', 'puppeteer', 'cheerio', 'single-product'];

        validCJMethods.forEach(method => {
            it(`should accept CJ method: ${method}`, async () => {
                const response = await request(app)
                    .post('/api/import/cj')
                    .send({ method })
                    .expect(200);
                
                expect(response.body.success).toBeDefined();
            });
        });

        validShopifyMethods.forEach(method => {
            it(`should accept Shopify method: ${method}`, async () => {
                const response = await request(app)
                    .post('/api/import/shopify')
                    .send({ method })
                    .expect(200);
                
                expect(response.body.success).toBeDefined();
            });
        });
    });

    describe('Error handling', () => {
        it('should handle JSON parsing errors gracefully', async () => {
            const response = await request(app)
                .post('/api/import/cj')
                .set('Content-Type', 'application/json')
                .send('invalid json')
                .expect(400);
        });

        it('should provide example payloads in error responses', async () => {
            const response = await request(app)
                .post('/api/import/cj')
                .send({ method: 'invalid' })
                .expect(400);
            
            expect(response.body.examplePayload).toBeDefined();
            expect(response.body.examplePayload.method).toBeDefined();
            expect(response.body.examplePayload.config).toBeDefined();
            expect(response.body.examplePayload.options).toBeDefined();
        });
    });
});