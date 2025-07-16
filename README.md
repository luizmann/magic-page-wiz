# Magic Page Wiz

Create pages and sales pages with automated product import from CJ Dropshipping and Shopify.

## Features

- **Product Import**: Import products from CJ Dropshipping and Shopify using API or scraping methods
- **Automatic Page Generation**: Automatically creates JSON pages for imported products
- **Multiple Import Methods**: Support for API, Puppeteer scraping, and Cheerio scraping
- **Clean Architecture**: Modular service-based architecture with comprehensive error handling
- **RESTful API**: Well-documented endpoints for product import and page access
- **Comprehensive Testing**: Full test suite with Jest and Supertest

## 🚀 Quick Start

### Windows (One Click Setup)
For Windows users, we provide an automated setup:

[![Rodar Local](https://img.shields.io/badge/Windows-Rodar%20Local-blue?style=for-the-badge&logo=windows)](./start-local.bat)

1. **Download the project** (Git clone or ZIP download)
2. **Double-click** `start-local.bat`
3. **Wait** for automatic setup and start
4. **Access** http://localhost:3000

> 📖 **Detailed Windows Guide:** See [RODAR-LOCALMENTE.md](./RODAR-LOCALMENTE.md) for step-by-step instructions.

### Linux/Mac (Command Line)

1. **Clone the repository:**
```bash
git clone https://github.com/luizmann/magic-page-wiz.git
cd magic-page-wiz
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit the `.env` file with your credentials (see Configuration section below).

4. **Start the server:**
```bash
# Development
npm run dev

# Production
npm start
```

The server will run on `http://localhost:3000` by default.

## Local Development

### Windows
- **Automated setup:** Double-click `start-local.bat`
- **Manual setup:** Follow [RODAR-LOCALMENTE.md](./RODAR-LOCALMENTE.md)

### Linux/Mac
- **Automated setup:** `./start-local.sh`
- **Manual preparation:** `./prepare-local.sh` then `npm install && npm run dev`
- **Manual setup:** Follow the installation steps above

## Configuration (.env)

Create a `.env` file based on `.env.example` and configure the following variables:

### Server Configuration
```env
PORT=3000
NODE_ENV=development
```

### CJ Dropshipping API Configuration
```env
CJ_EMAIL=your-email@example.com
CJ_PASSWORD=your-password
CJ_ACCESS_TOKEN=your-cj-access-token
CJ_API_URL=https://developers.cjdropshipping.com/api2.0
```

### Shopify API Configuration
```env
SHOPIFY_SHOP_DOMAIN=your-shop.myshopify.com
SHOPIFY_ACCESS_TOKEN=shpat_your-access-token
SHOPIFY_API_VERSION=2023-10
```

### Puppeteer Configuration (for scraping methods)
```env
PUPPETEER_HEADLESS=true
PUPPETEER_TIMEOUT=30000
PUPPETEER_SKIP_DOWNLOAD=true
```

## API Endpoints

### Product Import Endpoints

#### Import from CJ Dropshipping
**POST** `/api/import/cj`

Imports products from CJ Dropshipping and automatically generates product pages.

**Request Body:**
```json
{
  "method": "api",
  "config": {
    "email": "your-email@example.com",
    "password": "your-password",
    "accessToken": "your-access-token"
  },
  "options": {
    "page": 1,
    "limit": 20,
    "categoryId": "optional-category-id",
    "keyword": "optional-search-keyword"
  }
}
```

**Scraping Example:**
```json
{
  "method": "scraping",
  "config": {
    "headless": true,
    "timeout": 30000
  },
  "options": {
    "url": "https://cjdropshipping.com/product/example"
  }
}
```

**Response:**
```json
{
  "success": true,
  "method": "api",
  "data": [
    {
      "id": "cj-123",
      "title": "Product Title",
      "price": "$19.99",
      "description": "Product description",
      "images": ["https://example.com/image.jpg"]
    }
  ],
  "pageGeneration": {
    "success": true,
    "successCount": 1,
    "errorCount": 0
  },
  "generatedPages": [
    {
      "slug": "product-title",
      "pagePath": "/produtos/product-title.json"
    }
  ],
  "pagePaths": ["/produtos/product-title.json"]
}
```

#### Import from Shopify
**POST** `/api/import/shopify`

Imports products from Shopify and automatically generates product pages.

**Request Body:**
```json
{
  "method": "api",
  "config": {
    "shopDomain": "your-shop.myshopify.com",
    "accessToken": "shpat_your-access-token",
    "apiVersion": "2023-10"
  },
  "options": {
    "limit": 20,
    "fields": "id,title,handle,body_html,vendor,variants,images",
    "published_status": "published"
  }
}
```

**Scraping Example:**
```json
{
  "method": "scraping",
  "config": {
    "headless": true,
    "timeout": 30000
  },
  "options": {
    "url": "https://your-shop.myshopify.com",
    "productsUrl": "https://your-shop.myshopify.com/collections/all"
  }
}
```

### Product Page Access Endpoints

#### Get Specific Product Page
**GET** `/produtos/:slug`

Retrieves a specific product page by its slug.

**Example:** `GET /produtos/iphone-14-pro-max`

**Response:**
```json
{
  "id": "shop-123",
  "title": "iPhone 14 Pro Max",
  "slug": "iphone-14-pro-max",
  "description": "Latest iPhone model",
  "price": "$999.99",
  "currency": "BRL",
  "images": ["https://example.com/iphone.jpg"],
  "vendor": "Apple Store",
  "variants": [
    {
      "id": "1",
      "title": "128GB",
      "price": "$999.99",
      "sku": "IPH14PM128",
      "available": true
    }
  ],
  "source": "shopify",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "metadata": {
    "imported": true,
    "importDate": "2024-01-15T10:30:00.000Z"
  }
}
```

#### List All Product Pages
**GET** `/api/produtos`

Lists all available product pages.

**Response:**
```json
{
  "success": true,
  "count": 3,
  "slugs": [
    "iphone-14-pro-max",
    "samsung-galaxy-s24",
    "macbook-pro-16"
  ]
}
```

### Utility Endpoints

#### Health Check
**GET** `/health`

**Response:**
```json
{
  "status": "OK",
  "message": "Magic Page Wiz is running!"
}
```

#### Get API Examples
**GET** `/api/import/examples`

Returns detailed examples and documentation for all import methods.

## Import Methods

### API Method
- **CJ Dropshipping**: Uses official CJ Dropshipping API v2.0
- **Shopify**: Uses Shopify Admin REST API
- **Requirements**: Valid API credentials
- **Benefits**: Fast, reliable, structured data

### Scraping Method (Puppeteer)
- **Technology**: Puppeteer with headless Chrome
- **Use Cases**: When API access is not available
- **Requirements**: Valid product URLs
- **Benefits**: Can extract data from any product page

### Cheerio Method
- **Technology**: Server-side jQuery-like HTML parsing
- **Use Cases**: Lightweight scraping for simple pages
- **Requirements**: Valid product URLs
- **Benefits**: Fast, low resource usage

## Generated Page Structure

When products are imported, JSON pages are automatically created in `/public/produtos/` with the following structure:

```json
{
  "id": "unique-product-id",
  "title": "Product Title",
  "slug": "url-friendly-slug",
  "description": "Product description",
  "price": "$19.99",
  "currency": "BRL",
  "images": ["https://example.com/image1.jpg"],
  "vendor": "Store Name",
  "sku": "PRODUCT-SKU",
  "tags": ["tag1", "tag2"],
  "productType": "Electronics",
  "variants": [
    {
      "id": "1",
      "title": "Default",
      "price": "$19.99",
      "sku": "SKU123",
      "inventory_quantity": 10,
      "available": true
    }
  ],
  "source": "shopify",
  "sourceUrl": "https://original-product-url.com",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z",
  "metadata": {
    "imported": true,
    "importDate": "2024-01-15T10:30:00.000Z",
    "originalData": { /* Original API/scraped data */ }
  }
}
```

## Local Testing

### 1. Start the Development Server
```bash
npm run dev
```

### 2. Test Health Endpoint
```bash
curl http://localhost:3000/health
```

### 3. Test Product Import (Mock)
```bash
curl -X POST http://localhost:3000/api/import/cj \
  -H "Content-Type: application/json" \
  -d '{
    "method": "api",
    "config": {},
    "options": {}
  }'
```

### 4. List Generated Products
```bash
curl http://localhost:3000/api/produtos
```

### 5. Access a Product Page
```bash
curl http://localhost:3000/produtos/product-slug
```

### 6. Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npx jest __tests__/page-generator.test.js
```

## Error Handling

The API provides clear error messages for common scenarios:

### Missing Credentials
```json
{
  "success": false,
  "error": "CJ Dropshipping API access token is required",
  "message": "Failed to import products via API"
}
```

### Invalid Method
```json
{
  "success": false,
  "error": "Invalid method. Use one of: api, scraping, puppeteer, cheerio",
  "examplePayload": { /* Example request */ }
}
```

### Scraping Failures
```json
{
  "success": false,
  "error": "Product URL is required for scraping",
  "message": "Failed to import products via scraping"
}
```

### Product Not Found
```json
{
  "success": false,
  "error": "Product page not found",
  "message": "Product page 'non-existent-product' not found"
}
```

## Architecture

### Services
- **CJDropshippingService**: Handles CJ Dropshipping API and scraping
- **ShopifyService**: Handles Shopify API and scraping
- **PageGeneratorService**: Manages automatic page generation and access

### Directory Structure
```
magic-page-wiz/
├── services/
│   ├── cj-dropshipping.js      # CJ Dropshipping integration
│   ├── shopify.js              # Shopify integration
│   └── page-generator.js       # Page generation logic
├── __tests__/
│   ├── api.test.js             # API endpoint tests
│   ├── services.test.js        # Service unit tests
│   ├── page-generator.test.js  # Page generator tests
│   └── integration.test.js     # End-to-end tests
├── public/
│   ├── produtos/               # Generated product pages
│   ├── js/                     # Frontend JavaScript
│   └── css/                    # Stylesheets
├── server.js                   # Main Express server
├── package.json                # Dependencies and scripts
└── README.md                   # This documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass: `npm test`
6. Submit a pull request

## License

ISC License

## Support

For support and questions:
- Create an issue on GitHub
- Check the `/api/import/examples` endpoint for usage examples
- Review the test files for implementation examples