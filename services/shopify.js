const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

/**
 * Shopify Integration Service
 * Supports both API and scraping methods for product import
 */
class ShopifyService {
    constructor(config = {}) {
        this.apiConfig = {
            shopDomain: config.shopDomain, // e.g., 'your-shop.myshopify.com'
            accessToken: config.accessToken,
            apiVersion: config.apiVersion || '2023-10'
        };
        this.scrapingConfig = {
            headless: config.headless !== false,
            timeout: config.timeout || 30000
        };
    }

    /**
     * Import products using Shopify Admin API
     */
    async importProductsViaAPI(options = {}) {
        try {
            if (!this.apiConfig.shopDomain || !this.apiConfig.accessToken) {
                throw new Error('Shopify shop domain and access token are required');
            }

            const headers = {
                'X-Shopify-Access-Token': this.apiConfig.accessToken,
                'Content-Type': 'application/json'
            };

            const baseUrl = `https://${this.apiConfig.shopDomain}/admin/api/${this.apiConfig.apiVersion}`;
            
            // Get products
            const response = await axios.get(`${baseUrl}/products.json`, {
                headers,
                params: {
                    limit: options.limit || 20,
                    fields: options.fields || 'id,title,handle,body_html,vendor,product_type,created_at,updated_at,published_at,tags,status,variants,images',
                    since_id: options.since_id,
                    created_at_min: options.created_at_min,
                    created_at_max: options.created_at_max,
                    updated_at_min: options.updated_at_min,
                    updated_at_max: options.updated_at_max,
                    published_at_min: options.published_at_min,
                    published_at_max: options.published_at_max,
                    published_status: options.published_status || 'published'
                }
            });

            return {
                success: true,
                method: 'api',
                data: response.data.products,
                message: 'Products imported successfully via Shopify API'
            };

        } catch (error) {
            return {
                success: false,
                method: 'api',
                error: error.response?.data?.errors || error.message,
                message: 'Failed to import products via Shopify API'
            };
        }
    }

    /**
     * Import products by scraping Shopify store
     */
    async importProductsViaScraping(options = {}) {
        let browser = null;
        try {
            const shopUrl = options.url || `https://${this.apiConfig.shopDomain}`;
            if (!shopUrl) {
                throw new Error('Shop URL is required for scraping');
            }

            browser = await puppeteer.launch({
                headless: this.scrapingConfig.headless,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });

            const page = await browser.newPage();
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
            
            // Navigate to products page or collections
            const productsUrl = options.productsUrl || `${shopUrl}/collections/all`;
            await page.goto(productsUrl, { 
                waitUntil: 'networkidle2',
                timeout: this.scrapingConfig.timeout 
            });

            // Extract product information
            const products = await page.evaluate(() => {
                const productElements = document.querySelectorAll('[data-product-id], .product-item, .product-card, .grid-product');
                const products = [];

                productElements.forEach(element => {
                    const title = element.querySelector('h1, h2, h3, .product-title, .product-name')?.textContent?.trim();
                    const price = element.querySelector('.price, .product-price, .money')?.textContent?.trim();
                    const link = element.querySelector('a')?.href;
                    const image = element.querySelector('img')?.src;

                    if (title) {
                        products.push({
                            title,
                            price,
                            link,
                            image
                        });
                    }
                });

                return products;
            });

            await browser.close();

            return {
                success: true,
                method: 'scraping',
                data: products,
                message: 'Products imported successfully via scraping'
            };

        } catch (error) {
            if (browser) {
                await browser.close();
            }
            return {
                success: false,
                method: 'scraping',
                error: error.message,
                message: 'Failed to import products via scraping'
            };
        }
    }

    /**
     * Import single product details via scraping
     */
    async importSingleProductViaScraping(productUrl) {
        let browser = null;
        try {
            if (!productUrl) {
                throw new Error('Product URL is required');
            }

            browser = await puppeteer.launch({
                headless: this.scrapingConfig.headless,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });

            const page = await browser.newPage();
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
            
            await page.goto(productUrl, { 
                waitUntil: 'networkidle2',
                timeout: this.scrapingConfig.timeout 
            });

            // Extract detailed product information
            const productData = await page.evaluate(() => {
                const title = document.querySelector('h1, .product-title')?.textContent?.trim();
                const price = document.querySelector('.price, .product-price, .money')?.textContent?.trim();
                const description = document.querySelector('.product-description, .product-details, .rte')?.textContent?.trim();
                const images = Array.from(document.querySelectorAll('.product-image img, .product-photos img')).map(img => img.src);
                const vendor = document.querySelector('.vendor, .product-vendor')?.textContent?.trim();
                const sku = document.querySelector('.sku, .product-sku')?.textContent?.trim();

                return {
                    title,
                    price,
                    description,
                    images: images.filter(src => src && src.includes('http')),
                    vendor,
                    sku
                };
            });

            await browser.close();

            return {
                success: true,
                method: 'scraping',
                data: [productData],
                message: 'Product details imported successfully via scraping'
            };

        } catch (error) {
            if (browser) {
                await browser.close();
            }
            return {
                success: false,
                method: 'scraping',
                error: error.message,
                message: 'Failed to import product details via scraping'
            };
        }
    }

    /**
     * Import products using Cheerio (simpler, faster scraping)
     */
    async importProductsViaCheerio(options = {}) {
        try {
            const shopUrl = options.url || `https://${this.apiConfig.shopDomain}`;
            if (!shopUrl) {
                throw new Error('Shop URL is required');
            }

            const productsUrl = options.productsUrl || `${shopUrl}/collections/all.json`;
            
            const response = await axios.get(productsUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            });

            // If it's a JSON endpoint
            if (productsUrl.includes('.json')) {
                return {
                    success: true,
                    method: 'cheerio',
                    data: response.data.products || [],
                    message: 'Products imported successfully via JSON endpoint'
                };
            }

            // If it's HTML scraping
            const $ = cheerio.load(response.data);
            const products = [];

            $('[data-product-id], .product-item, .product-card, .grid-product').each((i, element) => {
                const title = $(element).find('h1, h2, h3, .product-title, .product-name').first().text().trim();
                const price = $(element).find('.price, .product-price, .money').first().text().trim();
                const link = $(element).find('a').first().attr('href');
                const image = $(element).find('img').first().attr('src');

                if (title) {
                    products.push({
                        title,
                        price,
                        link: link ? (link.startsWith('http') ? link : `${shopUrl}${link}`) : null,
                        image: image ? (image.startsWith('http') ? image : `${shopUrl}${image}`) : null
                    });
                }
            });

            return {
                success: true,
                method: 'cheerio',
                data: products,
                message: 'Products imported successfully via Cheerio scraping'
            };

        } catch (error) {
            return {
                success: false,
                method: 'cheerio',
                error: error.message,
                message: 'Failed to import products via Cheerio scraping'
            };
        }
    }

    /**
     * Main import method that chooses between API and scraping
     */
    async importProducts(method = 'api', options = {}) {
        switch (method.toLowerCase()) {
            case 'api':
                return await this.importProductsViaAPI(options);
            case 'scraping':
            case 'puppeteer':
                return await this.importProductsViaScraping(options);
            case 'cheerio':
                return await this.importProductsViaCheerio(options);
            case 'single-product':
                return await this.importSingleProductViaScraping(options.url);
            default:
                return {
                    success: false,
                    error: 'Invalid method. Use "api", "scraping", "puppeteer", "cheerio", or "single-product"',
                    message: 'Method not supported'
                };
        }
    }
}

module.exports = ShopifyService;