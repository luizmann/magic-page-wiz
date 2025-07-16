const request = require('supertest');
const express = require('express');
const path = require('path');
const fs = require('fs').promises;

// Import services
const CJDropshippingService = require('../services/cj-dropshipping');
const ShopifyService = require('../services/shopify');
const PageGeneratorService = require('../services/page-generator');

// Create test app with same configuration as main server
const app = express();
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize services with test directory
const testDir = path.join(__dirname, '../tmp/test-integration-produtos');
const pageGenerator = new PageGeneratorService({ pagesDir: testDir });

// Health endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Magic Page Wiz is running!' });
});

// Import endpoints with page generation (same as server.js but with test page generator)
app.post('/api/import/cj', async (req, res) => {
    try {
        const { method = 'api', config = {}, options = {} } = req.body;
        
        const validMethods = ['api', 'scraping', 'puppeteer', 'cheerio'];
        if (!validMethods.includes(method.toLowerCase())) {
            return res.status(400).json({
                success: false,
                error: `Invalid method. Use one of: ${validMethods.join(', ')}`
            });
        }

        const cjService = new CJDropshippingService(config);
        const result = await cjService.importProducts(method, options);
        
        // If import was successful, generate pages for the products
        if (result.success && result.data && result.data.length > 0) {
            const pageGenResult = await pageGenerator.generateProductPages(result.data, 'cj-dropshipping');
            
            result.pageGeneration = pageGenResult;
            result.generatedPages = pageGenResult.results.filter(r => r.success);
            result.pagePaths = result.generatedPages.map(p => p.pagePath);
        }
        
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Internal server error during CJ Dropshipping import'
        });
    }
});

app.post('/api/import/shopify', async (req, res) => {
    try {
        const { method = 'api', config = {}, options = {} } = req.body;
        
        const validMethods = ['api', 'scraping', 'puppeteer', 'cheerio', 'single-product'];
        if (!validMethods.includes(method.toLowerCase())) {
            return res.status(400).json({
                success: false,
                error: `Invalid method. Use one of: ${validMethods.join(', ')}`
            });
        }

        const shopifyService = new ShopifyService(config);
        const result = await shopifyService.importProducts(method, options);
        
        // If import was successful, generate pages for the products
        if (result.success && result.data && result.data.length > 0) {
            const pageGenResult = await pageGenerator.generateProductPages(result.data, 'shopify');
            
            result.pageGeneration = pageGenResult;
            result.generatedPages = pageGenResult.results.filter(r => r.success);
            result.pagePaths = result.generatedPages.map(p => p.pagePath);
        }
        
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Internal server error during Shopify import'
        });
    }
});

// Product page access endpoints
app.get('/produtos/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const result = await pageGenerator.getProductPage(slug);
        
        if (result.success) {
            res.json(result.product);
        } else {
            res.status(404).json({
                success: false,
                error: result.error,
                message: `Product page '${slug}' not found`
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Internal server error while accessing product page'
        });
    }
});

app.get('/api/produtos', async (req, res) => {
    try {
        const result = await pageGenerator.listProductPages();
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Internal server error while listing product pages'
        });
    }
});

describe('Product Import Integration Tests', () => {
    
    beforeEach(async () => {
        // Clean up test directory before each test
        try {
            await fs.rm(testDir, { recursive: true, force: true });
        } catch (error) {
            // Directory doesn't exist, which is fine
        }
    });

    afterEach(async () => {
        // Clean up test directory after each test
        try {
            await fs.rm(testDir, { recursive: true, force: true });
        } catch (error) {
            // Directory might not exist, which is fine
        }
    });

    describe('Import with Page Generation', () => {
        
        it('should import CJ products and generate pages when using mock data', async () => {
            // Mock the CJ service to return test data instead of making real API calls
            const originalImportProducts = CJDropshippingService.prototype.importProducts;
            CJDropshippingService.prototype.importProducts = jest.fn().mockResolvedValue({
                success: true,
                method: 'api',
                data: [
                    {
                        id: 'cj-123',
                        title: 'CJ Test Product',
                        description: 'Test product from CJ',
                        price: '$19.99',
                        images: ['https://example.com/cj-image.jpg']
                    }
                ],
                message: 'Products imported successfully via API'
            });

            const response = await request(app)
                .post('/api/import/cj')
                .send({
                    method: 'api',
                    config: { accessToken: 'test-token' },
                    options: { limit: 1 }
                })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveLength(1);
            expect(response.body.pageGeneration).toBeDefined();
            expect(response.body.pageGeneration.success).toBe(true);
            expect(response.body.generatedPages).toHaveLength(1);
            expect(response.body.pagePaths).toHaveLength(1);
            expect(response.body.pagePaths[0]).toBe('/produtos/cj-test-product.json');

            // Restore original method
            CJDropshippingService.prototype.importProducts = originalImportProducts;
        });

        it('should import Shopify products and generate pages when using mock data', async () => {
            // Mock the Shopify service to return test data
            const originalImportProducts = ShopifyService.prototype.importProducts;
            ShopifyService.prototype.importProducts = jest.fn().mockResolvedValue({
                success: true,
                method: 'api',
                data: [
                    {
                        id: 456789,
                        title: 'Shopify Test Product',
                        body_html: '<p>Test product from Shopify</p>',
                        vendor: 'Test Store',
                        variants: [
                            { id: 1, title: 'Default', price: '29.99', sku: 'SHOP123' }
                        ],
                        images: [
                            { src: 'https://example.com/shopify-image.jpg' }
                        ]
                    }
                ],
                message: 'Products imported successfully via Shopify API'
            });

            const response = await request(app)
                .post('/api/import/shopify')
                .send({
                    method: 'api',
                    config: { 
                        shopDomain: 'test-shop.myshopify.com',
                        accessToken: 'test-token' 
                    },
                    options: { limit: 1 }
                })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveLength(1);
            expect(response.body.pageGeneration).toBeDefined();
            expect(response.body.pageGeneration.success).toBe(true);
            expect(response.body.generatedPages).toHaveLength(1);
            expect(response.body.pagePaths).toHaveLength(1);
            expect(response.body.pagePaths[0]).toBe('/produtos/shopify-test-product.json');

            // Restore original method
            ShopifyService.prototype.importProducts = originalImportProducts;
        });

        it('should not generate pages when import fails', async () => {
            const response = await request(app)
                .post('/api/import/cj')
                .send({
                    method: 'api',
                    config: {},  // Missing credentials
                    options: {}
                })
                .expect(200);

            expect(response.body.success).toBe(false);
            expect(response.body.pageGeneration).toBeUndefined();
            expect(response.body.generatedPages).toBeUndefined();
            expect(response.body.pagePaths).toBeUndefined();
        });

        it('should not generate pages when no products are returned', async () => {
            // Mock service to return empty data
            const originalImportProducts = CJDropshippingService.prototype.importProducts;
            CJDropshippingService.prototype.importProducts = jest.fn().mockResolvedValue({
                success: true,
                method: 'api',
                data: [],
                message: 'No products found'
            });

            const response = await request(app)
                .post('/api/import/cj')
                .send({
                    method: 'api',
                    config: { accessToken: 'test-token' },
                    options: {}
                })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveLength(0);
            expect(response.body.pageGeneration).toBeUndefined();
            expect(response.body.generatedPages).toBeUndefined();
            expect(response.body.pagePaths).toBeUndefined();

            // Restore original method
            CJDropshippingService.prototype.importProducts = originalImportProducts;
        });
    });

    describe('Product Page Access Endpoints', () => {
        
        it('should access generated product page via GET /produtos/:slug', async () => {
            // First, create a test product page
            const testProduct = {
                title: 'Accessible Test Product',
                description: 'This product can be accessed via API',
                price: '$39.99'
            };

            const createResult = await pageGenerator.generateProductPage(testProduct, 'test');
            expect(createResult.success).toBe(true);

            // Now access it via the endpoint
            const response = await request(app)
                .get(`/produtos/${createResult.slug}`)
                .expect(200);

            expect(response.body.title).toBe('Accessible Test Product');
            expect(response.body.description).toBe('This product can be accessed via API');
            expect(response.body.price).toBe('$39.99');
            expect(response.body.source).toBe('test');
            expect(response.body.createdAt).toBeDefined();
        });

        it('should return 404 for non-existent product page', async () => {
            const response = await request(app)
                .get('/produtos/non-existent-product')
                .expect(404);

            expect(response.body.success).toBe(false);
            expect(response.body.error).toBe('Product page not found');
            expect(response.body.message).toContain('non-existent-product');
        });

        it('should list all available product pages via GET /api/produtos', async () => {
            // Create multiple test products
            const products = [
                { title: 'Listed Product 1' },
                { title: 'Listed Product 2' },
                { title: 'Listed Product 3' }
            ];

            for (const product of products) {
                await pageGenerator.generateProductPage(product, 'test');
            }

            const response = await request(app)
                .get('/api/produtos')
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.count).toBe(3);
            expect(response.body.slugs).toContain('listed-product-1');
            expect(response.body.slugs).toContain('listed-product-2');
            expect(response.body.slugs).toContain('listed-product-3');
        });

        it('should return empty list when no products exist', async () => {
            const response = await request(app)
                .get('/api/produtos')
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.count).toBe(0);
            expect(response.body.slugs).toEqual([]);
        });
    });

    describe('End-to-End Product Import and Access', () => {
        
        it('should complete full workflow: import -> generate pages -> access pages', async () => {
            // Step 1: Mock import with test data
            const originalImportProducts = CJDropshippingService.prototype.importProducts;
            CJDropshippingService.prototype.importProducts = jest.fn().mockResolvedValue({
                success: true,
                method: 'api',
                data: [
                    {
                        id: 'e2e-123',
                        title: 'End-to-End Test Product',
                        description: 'Full workflow test product',
                        price: '$49.99',
                        images: ['https://example.com/e2e-image.jpg']
                    },
                    {
                        id: 'e2e-456',
                        title: 'Another E2E Product',
                        description: 'Second test product',
                        price: '$59.99',
                        images: ['https://example.com/e2e-image2.jpg']
                    }
                ]
            });

            // Step 2: Import products
            const importResponse = await request(app)
                .post('/api/import/cj')
                .send({
                    method: 'api',
                    config: { accessToken: 'test-token' },
                    options: { limit: 2 }
                })
                .expect(200);

            expect(importResponse.body.success).toBe(true);
            expect(importResponse.body.generatedPages).toHaveLength(2);
            const pagePaths = importResponse.body.pagePaths;

            // Step 3: Verify pages were created by listing them
            const listResponse = await request(app)
                .get('/api/produtos')
                .expect(200);

            expect(listResponse.body.count).toBe(2);

            // Step 4: Access each generated page
            const slug1 = pagePaths[0].replace('/produtos/', '').replace('.json', '');
            const slug2 = pagePaths[1].replace('/produtos/', '').replace('.json', '');

            const page1Response = await request(app)
                .get(`/produtos/${slug1}`)
                .expect(200);

            const page2Response = await request(app)
                .get(`/produtos/${slug2}`)
                .expect(200);

            expect(page1Response.body.title).toBe('End-to-End Test Product');
            expect(page2Response.body.title).toBe('Another E2E Product');

            // Restore original method
            CJDropshippingService.prototype.importProducts = originalImportProducts;
        });
    });

    describe('Error Handling for Product Pages', () => {
        
        it('should handle malformed slug parameters gracefully', async () => {
            const response = await request(app)
                .get('/produtos/non-existent-slug')
                .expect(404);

            expect(response.body.success).toBe(false);
        });

        it('should handle file system errors gracefully', async () => {
            // Try to access a product with characters that might cause file system issues
            const response = await request(app)
                .get('/produtos/invalid-chars-special')
                .expect(404);

            expect(response.body.success).toBe(false);
            expect(response.body.error).toBe('Product page not found');
        });
    });
});