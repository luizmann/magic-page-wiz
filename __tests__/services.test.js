const CJDropshippingService = require('../services/cj-dropshipping');
const ShopifyService = require('../services/shopify');

describe('CJ Dropshipping Service', () => {
    let service;

    beforeEach(() => {
        service = new CJDropshippingService({
            email: 'test@example.com',
            password: 'testpass',
            accessToken: 'test-token'
        });
    });

    describe('Constructor', () => {
        it('should initialize with default configuration', () => {
            const defaultService = new CJDropshippingService();
            expect(defaultService.apiConfig.baseUrl).toBe('https://developers.cjdropshipping.com/api2.0');
            expect(defaultService.scrapingConfig.headless).toBe(true);
            expect(defaultService.scrapingConfig.timeout).toBe(30000);
        });

        it('should accept custom configuration', () => {
            const customService = new CJDropshippingService({
                apiUrl: 'https://custom-api.com',
                headless: false,
                timeout: 60000
            });
            expect(customService.apiConfig.baseUrl).toBe('https://custom-api.com');
            expect(customService.scrapingConfig.headless).toBe(false);
            expect(customService.scrapingConfig.timeout).toBe(60000);
        });
    });

    describe('importProducts method routing', () => {
        it('should route to API method', async () => {
            const result = await service.importProducts('api', {});
            expect(result.method).toBe('api');
            expect(result.success).toBe(false); // Will fail due to invalid token, but that's expected
        });

        it('should route to scraping method', async () => {
            const result = await service.importProducts('scraping', {});
            expect(result.method).toBe('scraping');
            expect(result.success).toBe(false); // Will fail due to missing URL
        });

        it('should route to cheerio method', async () => {
            const result = await service.importProducts('cheerio', {});
            expect(result.method).toBe('cheerio');
            expect(result.success).toBe(false); // Will fail due to missing URL
        });

        it('should handle invalid method', async () => {
            const result = await service.importProducts('invalid', {});
            expect(result.success).toBe(false);
            expect(result.error).toContain('Invalid method');
        });
    });

    describe('API method validation', () => {
        it('should require access token', async () => {
            const noTokenService = new CJDropshippingService({});
            const result = await noTokenService.importProductsViaAPI();
            expect(result.success).toBe(false);
            expect(result.error).toContain('access token is required');
        });
    });

    describe('Scraping method validation', () => {
        it('should require URL for scraping', async () => {
            const result = await service.importProductsViaScraping({});
            expect(result.success).toBe(false);
            expect(result.error).toContain('Product URL is required');
        });

        it('should require URL for cheerio', async () => {
            const result = await service.importProductsViaCheerio({});
            expect(result.success).toBe(false);
            expect(result.error).toContain('Product URL is required');
        });
    });
});

describe('Shopify Service', () => {
    let service;

    beforeEach(() => {
        service = new ShopifyService({
            shopDomain: 'test-shop.myshopify.com',
            accessToken: 'test-token',
            apiVersion: '2023-10'
        });
    });

    describe('Constructor', () => {
        it('should initialize with default configuration', () => {
            const defaultService = new ShopifyService();
            expect(defaultService.apiConfig.apiVersion).toBe('2023-10');
            expect(defaultService.scrapingConfig.headless).toBe(true);
            expect(defaultService.scrapingConfig.timeout).toBe(30000);
        });

        it('should accept custom configuration', () => {
            const customService = new ShopifyService({
                apiVersion: '2024-01',
                headless: false,
                timeout: 45000
            });
            expect(customService.apiConfig.apiVersion).toBe('2024-01');
            expect(customService.scrapingConfig.headless).toBe(false);
            expect(customService.scrapingConfig.timeout).toBe(45000);
        });
    });

    describe('importProducts method routing', () => {
        it('should route to API method', async () => {
            const result = await service.importProducts('api', {});
            expect(result.method).toBe('api');
            // Will fail due to network call, but that's expected
        });

        it('should route to scraping method', async () => {
            const result = await service.importProducts('scraping', {});
            expect(result.method).toBe('scraping');
            // Will fail due to puppeteer setup, but that's expected
        });

        it('should route to cheerio method', async () => {
            const result = await service.importProducts('cheerio', {});
            expect(result.method).toBe('cheerio');
            // Will fail due to network call, but that's expected
        });

        it('should route to single-product method', async () => {
            const result = await service.importProducts('single-product', { url: 'https://example.com' });
            expect(result.method).toBe('scraping');
            // Will fail due to puppeteer setup, but that's expected
        });

        it('should handle invalid method', async () => {
            const result = await service.importProducts('invalid', {});
            expect(result.success).toBe(false);
            expect(result.error).toContain('Invalid method');
        });
    });

    describe('API method validation', () => {
        it('should require shop domain and access token', async () => {
            const noCredsService = new ShopifyService({});
            const result = await noCredsService.importProductsViaAPI();
            expect(result.success).toBe(false);
            expect(result.error).toContain('shop domain and access token are required');
        });
    });

    describe('Single product method validation', () => {
        it('should require URL for single product scraping', async () => {
            const result = await service.importSingleProductViaScraping();
            expect(result.success).toBe(false);
            expect(result.error).toContain('Product URL is required');
        });
    });
});