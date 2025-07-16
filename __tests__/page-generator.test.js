const PageGeneratorService = require('../services/page-generator');
const fs = require('fs').promises;
const path = require('path');

describe('PageGeneratorService', () => {
    let service;
    let testDir;

    beforeEach(async () => {
        // Create a temporary test directory
        testDir = path.join(__dirname, '../tmp/test-produtos');
        service = new PageGeneratorService({ pagesDir: testDir });
        
        // Clean up any existing test directory
        try {
            await fs.rm(testDir, { recursive: true, force: true });
        } catch (error) {
            // Directory doesn't exist, which is fine
        }
    });

    afterEach(async () => {
        // Clean up test directory
        try {
            await fs.rm(testDir, { recursive: true, force: true });
        } catch (error) {
            // Directory might not exist, which is fine
        }
    });

    describe('generateSlug', () => {
        it('should generate URL-friendly slugs', () => {
            expect(service.generateSlug('iPhone 14 Pro Max')).toBe('iphone-14-pro-max');
            expect(service.generateSlug('Tênis Nike Air Max')).toBe('tenis-nike-air-max');
            expect(service.generateSlug('Produto com Acentos Çñü')).toBe('produto-com-acentos-cnu');
            expect(service.generateSlug('Special!@#$%Characters')).toBe('specialcharacters');
        });

        it('should handle empty or invalid titles', () => {
            const slug1 = service.generateSlug('');
            const slug2 = service.generateSlug(null);
            const slug3 = service.generateSlug(undefined);
            
            expect(slug1).toMatch(/^produto-\d+$/);
            expect(slug2).toMatch(/^produto-\d+$/);
            expect(slug3).toMatch(/^produto-\d+$/);
        });

        it('should limit slug length', () => {
            const longTitle = 'This is a very long product title that should be truncated to avoid extremely long filenames that could cause issues in the filesystem';
            const slug = service.generateSlug(longTitle);
            expect(slug.length).toBeLessThanOrEqual(100);
        });
    });

    describe('transformProductToPage', () => {
        it('should transform basic product data', () => {
            const product = {
                id: 'test-123',
                title: 'Test Product',
                description: 'Test description',
                price: '$19.99',
                images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
            };

            const page = service.transformProductToPage(product, 'test-source');
            
            expect(page.id).toBe('test-123');
            expect(page.title).toBe('Test Product');
            expect(page.slug).toBe('test-product');
            expect(page.description).toBe('Test description');
            expect(page.price).toBe('$19.99');
            expect(page.images).toEqual(['https://example.com/image1.jpg', 'https://example.com/image2.jpg']);
            expect(page.source).toBe('test-source');
            expect(page.createdAt).toBeDefined();
            expect(page.metadata.imported).toBe(true);
        });

        it('should handle Shopify product format', () => {
            const shopifyProduct = {
                id: 123456,
                title: 'Shopify Product',
                body_html: '<p>HTML description</p>',
                vendor: 'Shopify Store',
                product_type: 'Electronics',
                variants: [
                    { id: 1, title: 'Default', price: '29.99', sku: 'SKU123' }
                ],
                images: [
                    { src: 'https://shopify.com/image1.jpg' }
                ]
            };

            const page = service.transformProductToPage(shopifyProduct, 'shopify');
            
            expect(page.title).toBe('Shopify Product');
            expect(page.description).toBe('<p>HTML description</p>');
            expect(page.vendor).toBe('Shopify Store');
            expect(page.productType).toBe('Electronics');
            expect(page.variants).toHaveLength(1);
            expect(page.variants[0].price).toBe('29.99');
            expect(page.source).toBe('shopify');
        });

        it('should handle missing or minimal data gracefully', () => {
            const minimalProduct = {};
            const page = service.transformProductToPage(minimalProduct, 'unknown');
            
            expect(page.title).toBe('Produto sem título');
            expect(page.slug).toMatch(/^produto-\d+$/);
            expect(page.description).toBe('');
            expect(page.price).toBe('');
            expect(page.images).toEqual([]);
            expect(page.variants).toHaveLength(1);
            expect(page.variants[0].title).toBe('Default');
        });
    });

    describe('extractImages', () => {
        it('should extract images from different formats', () => {
            const product1 = { images: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'] };
            const product2 = { image: 'https://example.com/single-image.jpg' };
            const product3 = { 
                images: [
                    { src: 'https://example.com/shopify-img1.jpg' },
                    { src: 'https://example.com/shopify-img2.jpg' }
                ]
            };

            expect(service.extractImages(product1)).toEqual(['https://example.com/img1.jpg', 'https://example.com/img2.jpg']);
            expect(service.extractImages(product2)).toEqual(['https://example.com/single-image.jpg']);
            expect(service.extractImages(product3)).toEqual(['https://example.com/shopify-img1.jpg', 'https://example.com/shopify-img2.jpg']);
        });

        it('should filter out invalid URLs', () => {
            const product = {
                images: [
                    'https://valid.com/image.jpg',
                    '',
                    null,
                    'invalid-url',
                    '/relative/path/image.jpg',
                    'https://another-valid.com/image.jpg'
                ]
            };

            const images = service.extractImages(product);
            expect(images).toEqual([
                'https://valid.com/image.jpg',
                '/relative/path/image.jpg',
                'https://another-valid.com/image.jpg'
            ]);
        });

        it('should limit number of images', () => {
            const product = {
                images: Array.from({ length: 15 }, (_, i) => `https://example.com/image${i}.jpg`)
            };

            const images = service.extractImages(product);
            expect(images.length).toBe(10);
        });
    });

    describe('generateProductPage', () => {
        it('should create a JSON file for a product', async () => {
            const product = {
                title: 'Test Product',
                description: 'Test description',
                price: '$19.99'
            };

            const result = await service.generateProductPage(product, 'test');
            
            expect(result.success).toBe(true);
            expect(result.slug).toBe('test-product');
            expect(result.pagePath).toBe('/produtos/test-product.json');
            expect(result.product.title).toBe('Test Product');

            // Verify file was actually created
            const filePath = path.join(testDir, 'test-product.json');
            const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
            expect(fileExists).toBe(true);

            // Verify file content
            const content = await fs.readFile(filePath, 'utf8');
            const savedProduct = JSON.parse(content);
            expect(savedProduct.title).toBe('Test Product');
        });

        it('should handle duplicate slugs by adding counter', async () => {
            const product1 = { title: 'Duplicate Product' };
            const product2 = { title: 'Duplicate Product' };

            const result1 = await service.generateProductPage(product1, 'test');
            const result2 = await service.generateProductPage(product2, 'test');

            expect(result1.success).toBe(true);
            expect(result2.success).toBe(true);
            expect(result1.slug).toBe('duplicate-product');
            expect(result2.slug).toBe('duplicate-product-1');
        });
    });

    describe('getProductPage', () => {
        it('should retrieve an existing product page', async () => {
            const product = { title: 'Retrievable Product', price: '$29.99' };
            const createResult = await service.generateProductPage(product, 'test');
            
            const getResult = await service.getProductPage(createResult.slug);
            
            expect(getResult.success).toBe(true);
            expect(getResult.product.title).toBe('Retrievable Product');
            expect(getResult.product.price).toBe('$29.99');
        });

        it('should return error for non-existent product', async () => {
            const result = await service.getProductPage('non-existent-product');
            
            expect(result.success).toBe(false);
            expect(result.error).toBe('Product page not found');
        });
    });

    describe('listProductPages', () => {
        it('should list all product pages', async () => {
            const products = [
                { title: 'Product 1' },
                { title: 'Product 2' },
                { title: 'Product 3' }
            ];

            for (const product of products) {
                await service.generateProductPage(product, 'test');
            }

            const result = await service.listProductPages();
            
            expect(result.success).toBe(true);
            expect(result.count).toBe(3);
            expect(result.slugs).toContain('product-1');
            expect(result.slugs).toContain('product-2');
            expect(result.slugs).toContain('product-3');
        });

        it('should return empty list when no products exist', async () => {
            const result = await service.listProductPages();
            
            expect(result.success).toBe(true);
            expect(result.count).toBe(0);
            expect(result.slugs).toEqual([]);
        });
    });

    describe('generateProductPages', () => {
        it('should generate pages for multiple products', async () => {
            const products = [
                { title: 'Multi Product 1', price: '$10' },
                { title: 'Multi Product 2', price: '$20' },
                { title: 'Multi Product 3', price: '$30' }
            ];

            const result = await service.generateProductPages(products, 'multi-test');
            
            expect(result.success).toBe(true);
            expect(result.successCount).toBe(3);
            expect(result.errorCount).toBe(0);
            expect(result.results).toHaveLength(3);
            
            // Verify all products were created successfully
            result.results.forEach((productResult, index) => {
                expect(productResult.success).toBe(true);
                expect(productResult.product.title).toBe(products[index].title);
                expect(productResult.product.source).toBe('multi-test');
            });
        });
    });

    describe('deleteProductPage', () => {
        it('should delete an existing product page', async () => {
            const product = { title: 'Product To Delete' };
            const createResult = await service.generateProductPage(product, 'test');
            
            const deleteResult = await service.deleteProductPage(createResult.slug);
            
            expect(deleteResult.success).toBe(true);
            expect(deleteResult.message).toContain('deleted successfully');

            // Verify file no longer exists
            const getResult = await service.getProductPage(createResult.slug);
            expect(getResult.success).toBe(false);
        });

        it('should return error when deleting non-existent product', async () => {
            const result = await service.deleteProductPage('non-existent');
            
            expect(result.success).toBe(false);
            expect(result.error).toBe('Product page not found');
        });
    });
});