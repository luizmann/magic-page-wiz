const fs = require('fs').promises;
const path = require('path');

/**
 * Page Generator Service
 * Handles automatic generation of product JSON pages
 */
class PageGeneratorService {
    constructor(config = {}) {
        this.pagesDir = config.pagesDir || path.join(__dirname, '../public/produtos');
        this.baseUrl = config.baseUrl || '';
    }

    /**
     * Generate a URL-friendly slug from a title
     */
    generateSlug(title) {
        if (!title) return `produto-${Date.now()}`;
        
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove accents
            .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single
            .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
            .substring(0, 100) || `produto-${Date.now()}`;
    }

    /**
     * Ensure the pages directory exists
     */
    async ensurePagesDirectory() {
        try {
            await fs.access(this.pagesDir);
        } catch (error) {
            await fs.mkdir(this.pagesDir, { recursive: true });
        }
    }

    /**
     * Generate a unique slug if the file already exists
     */
    async generateUniqueSlug(baseSlug) {
        let slug = baseSlug;
        let counter = 1;
        
        while (true) {
            const filePath = path.join(this.pagesDir, `${slug}.json`);
            try {
                await fs.access(filePath);
                // File exists, try with counter
                slug = `${baseSlug}-${counter}`;
                counter++;
            } catch (error) {
                // File doesn't exist, we can use this slug
                break;
            }
        }
        
        return slug;
    }

    /**
     * Transform imported product data into page format
     */
    transformProductToPage(product, source = 'unknown') {
        const now = new Date().toISOString();
        
        return {
            id: product.id || `${source}-${Date.now()}`,
            title: product.title || 'Produto sem título',
            slug: this.generateSlug(product.title),
            description: product.description || product.body_html || '',
            price: product.price || product.variants?.[0]?.price || '',
            currency: product.currency || 'BRL',
            images: this.extractImages(product),
            vendor: product.vendor || '',
            sku: product.sku || product.variants?.[0]?.sku || '',
            tags: product.tags || [],
            productType: product.product_type || product.productType || '',
            variants: this.extractVariants(product),
            source: source,
            sourceUrl: product.link || product.url || '',
            createdAt: now,
            updatedAt: now,
            metadata: {
                imported: true,
                importDate: now,
                originalData: product
            }
        };
    }

    /**
     * Extract and normalize images from product data
     */
    extractImages(product) {
        const images = [];
        
        // Handle different image structures
        if (product.images) {
            if (Array.isArray(product.images)) {
                // Handle array of strings or objects
                for (const img of product.images) {
                    if (typeof img === 'string') {
                        images.push(img);
                    } else if (img && img.src) {
                        // Shopify format
                        images.push(img.src);
                    }
                }
            } else if (typeof product.images === 'object') {
                // Handle object with src properties
                images.push(...Object.values(product.images).map(img => img.src || img));
            }
        }
        
        // Handle single image property
        if (product.image && !images.includes(product.image)) {
            images.push(product.image);
        }
        
        // Filter out invalid URLs and normalize
        return images
            .filter(img => img && typeof img === 'string' && img.trim())
            .map(img => img.trim())
            .filter(img => img.includes('http') || img.startsWith('/'))
            .slice(0, 10); // Limit to 10 images
    }

    /**
     * Extract and normalize variants from product data
     */
    extractVariants(product) {
        if (!product.variants || !Array.isArray(product.variants)) {
            return [{
                id: '1',
                title: 'Default',
                price: product.price || '',
                sku: product.sku || '',
                inventory_quantity: 0,
                available: true
            }];
        }
        
        return product.variants.map((variant, index) => ({
            id: variant.id || `variant-${index + 1}`,
            title: variant.title || `Variação ${index + 1}`,
            price: variant.price || product.price || '',
            sku: variant.sku || '',
            inventory_quantity: variant.inventory_quantity || 0,
            available: variant.available !== false,
            options: variant.options || {}
        }));
    }

    /**
     * Generate a page file for a single product
     */
    async generateProductPage(product, source = 'unknown') {
        try {
            await this.ensurePagesDirectory();
            
            const pageData = this.transformProductToPage(product, source);
            const slug = await this.generateUniqueSlug(pageData.slug);
            
            // Update the slug in page data
            pageData.slug = slug;
            
            const filePath = path.join(this.pagesDir, `${slug}.json`);
            await fs.writeFile(filePath, JSON.stringify(pageData, null, 2), 'utf8');
            
            return {
                success: true,
                slug: slug,
                pagePath: `/produtos/${slug}.json`,
                fullPath: filePath,
                product: pageData
            };
            
        } catch (error) {
            return {
                success: false,
                error: error.message,
                product: product
            };
        }
    }

    /**
     * Generate pages for multiple products
     */
    async generateProductPages(products, source = 'unknown') {
        const results = [];
        
        for (const product of products) {
            const result = await this.generateProductPage(product, source);
            results.push(result);
        }
        
        return {
            success: results.every(r => r.success),
            results: results,
            successCount: results.filter(r => r.success).length,
            errorCount: results.filter(r => !r.success).length
        };
    }

    /**
     * Get a product page by slug
     */
    async getProductPage(slug) {
        try {
            const filePath = path.join(this.pagesDir, `${slug}.json`);
            const content = await fs.readFile(filePath, 'utf8');
            return {
                success: true,
                product: JSON.parse(content)
            };
        } catch (error) {
            return {
                success: false,
                error: error.code === 'ENOENT' ? 'Product page not found' : error.message
            };
        }
    }

    /**
     * List all available product pages
     */
    async listProductPages() {
        try {
            await this.ensurePagesDirectory();
            const files = await fs.readdir(this.pagesDir);
            const jsonFiles = files
                .filter(file => file.endsWith('.json'))
                .map(file => file.replace('.json', ''));
            
            return {
                success: true,
                slugs: jsonFiles,
                count: jsonFiles.length
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                slugs: [],
                count: 0
            };
        }
    }

    /**
     * Delete a product page by slug
     */
    async deleteProductPage(slug) {
        try {
            const filePath = path.join(this.pagesDir, `${slug}.json`);
            await fs.unlink(filePath);
            return {
                success: true,
                message: `Product page ${slug} deleted successfully`
            };
        } catch (error) {
            return {
                success: false,
                error: error.code === 'ENOENT' ? 'Product page not found' : error.message
            };
        }
    }
}

module.exports = PageGeneratorService;