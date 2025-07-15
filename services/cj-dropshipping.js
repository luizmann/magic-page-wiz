const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

/**
 * CJ Dropshipping Integration Service
 * Supports both API and scraping methods for product import
 */
class CJDropshippingService {
    constructor(config = {}) {
        this.apiConfig = {
            baseUrl: config.apiUrl || 'https://developers.cjdropshipping.com/api2.0',
            email: config.email,
            password: config.password,
            accessToken: config.accessToken
        };
        this.scrapingConfig = {
            headless: config.headless !== false,
            timeout: config.timeout || 30000
        };
    }

    /**
     * Import products using API method
     */
    async importProductsViaAPI(options = {}) {
        try {
            if (!this.apiConfig.accessToken) {
                throw new Error('CJ Dropshipping API access token is required');
            }

            const headers = {
                'CJ-Access-Token': this.apiConfig.accessToken,
                'Content-Type': 'application/json'
            };

            // Example: Get product list
            const response = await axios.get(`${this.apiConfig.baseUrl}/products/list`, {
                headers,
                params: {
                    pageNum: options.page || 1,
                    pageSize: options.limit || 20,
                    categoryId: options.categoryId,
                    keyword: options.keyword
                }
            });

            if (response.data.result === true) {
                return {
                    success: true,
                    method: 'api',
                    data: response.data.data,
                    message: 'Products imported successfully via API'
                };
            } else {
                throw new Error(response.data.message || 'API request failed');
            }

        } catch (error) {
            return {
                success: false,
                method: 'api',
                error: error.message,
                message: 'Failed to import products via API'
            };
        }
    }

    /**
     * Import products using scraping method
     */
    async importProductsViaScraping(options = {}) {
        let browser = null;
        try {
            const productUrl = options.url;
            if (!productUrl) {
                throw new Error('Product URL is required for scraping');
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

            // Extract product information
            const productData = await page.evaluate(() => {
                const title = document.querySelector('h1')?.textContent?.trim();
                const price = document.querySelector('.price, .cost')?.textContent?.trim();
                const description = document.querySelector('.description, .detail')?.textContent?.trim();
                const images = Array.from(document.querySelectorAll('img')).map(img => img.src);

                return {
                    title,
                    price,
                    description,
                    images: images.filter(src => src && src.includes('http'))
                };
            });

            await browser.close();

            return {
                success: true,
                method: 'scraping',
                data: [productData],
                message: 'Product imported successfully via scraping'
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
     * Import products using fallback method (cheerio for simple scraping)
     */
    async importProductsViaCheerio(options = {}) {
        try {
            const productUrl = options.url;
            if (!productUrl) {
                throw new Error('Product URL is required for scraping');
            }

            const response = await axios.get(productUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            });

            const $ = cheerio.load(response.data);
            
            const productData = {
                title: $('h1').first().text().trim(),
                price: $('.price, .cost').first().text().trim(),
                description: $('.description, .detail').first().text().trim(),
                images: []
            };

            $('img').each((i, elem) => {
                const src = $(elem).attr('src');
                if (src && src.includes('http')) {
                    productData.images.push(src);
                }
            });

            return {
                success: true,
                method: 'cheerio',
                data: [productData],
                message: 'Product imported successfully via Cheerio scraping'
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
            default:
                return {
                    success: false,
                    error: 'Invalid method. Use "api", "scraping", "puppeteer", or "cheerio"',
                    message: 'Method not supported'
                };
        }
    }
}

module.exports = CJDropshippingService;