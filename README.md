# Magic Page Wiz

Create pages and sales pages with integrated product import capabilities from CJ Dropshipping and Shopify.

## Features

- **Page Builder**: Create and customize sales pages
- **Product Import**: Import products from CJ Dropshipping and Shopify
- **Multiple Import Methods**: Support for both API and scraping methods
- **Flexible Configuration**: Easy setup for different data sources

## Installation

1. Clone the repository:
```bash
git clone https://github.com/luizmann/magic-page-wiz.git
cd magic-page-wiz
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional):
```bash
cp .env.example .env
# Edit .env with your API credentials
```

4. Start the server:
```bash
npm start
```

The server will run on port 3000 by default.

## Testing

Run the automated test suite:

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

## Environment Setup

### For Puppeteer (if using scraping methods)

If you encounter issues with Puppeteer installation in restricted environments, you can skip the browser download:

```bash
PUPPETEER_SKIP_DOWNLOAD=true npm install
```

Note: Scraping methods may not work without a proper browser installation.

## API Endpoints

### CJ Dropshipping Import

**Endpoint**: `POST /api/import/cj`

Import products from CJ Dropshipping using either API or scraping methods.

#### API Method

```bash
curl -X POST http://localhost:3000/api/import/cj \
  -H "Content-Type: application/json" \
  -d '{
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
      "keyword": "search-keyword"
    }
  }'
```

#### Scraping Method

```bash
curl -X POST http://localhost:3000/api/import/cj \
  -H "Content-Type: application/json" \
  -d '{
    "method": "scraping",
    "config": {
      "headless": true,
      "timeout": 30000
    },
    "options": {
      "url": "https://cjdropshipping.com/product/example"
    }
  }'
```

### Shopify Import

**Endpoint**: `POST /api/import/shopify`

Import products from Shopify stores using either API or scraping methods.

#### API Method

```bash
curl -X POST http://localhost:3000/api/import/shopify \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

#### Scraping Method

```bash
curl -X POST http://localhost:3000/api/import/shopify \
  -H "Content-Type: application/json" \
  -d '{
    "method": "scraping",
    "config": {
      "shopDomain": "your-shop.myshopify.com",
      "headless": true,
      "timeout": 30000
    },
    "options": {
      "url": "https://your-shop.myshopify.com",
      "productsUrl": "https://your-shop.myshopify.com/collections/all"
    }
  }'
```

### Examples and Documentation

**Endpoint**: `GET /api/import/examples`

Get complete examples and documentation for all import methods.

## API Configuration Guides

### CJ Dropshipping API Setup

1. **Create CJ Dropshipping Account**:
   - Visit [CJ Dropshipping](https://cjdropshipping.com)
   - Create a business account

2. **Get API Credentials**:
   - Go to [CJ Developers](https://developers.cjdropshipping.com)
   - Apply for API access
   - Get your email, password, and access token

3. **API Documentation**:
   - Base URL: `https://developers.cjdropshipping.com/api2.0`
   - Authentication: Access Token in header `CJ-Access-Token`
   - [Official API Docs](https://developers.cjdropshipping.com/api2.0/overview)

#### Example API Configuration

```javascript
{
  "config": {
    "apiUrl": "https://developers.cjdropshipping.com/api2.0",
    "email": "your-business-email@company.com",
    "password": "your-password",
    "accessToken": "your-cj-access-token"
  }
}
```

### Shopify API Setup

1. **Create Shopify App**:
   - Go to your Shopify Admin
   - Navigate to Apps > App and sales channel settings
   - Click "Develop apps" and create a new app

2. **Configure API Permissions**:
   - Add the following scopes:
     - `read_products`
     - `read_product_listings`
     - `read_collections`

3. **Get Access Token**:
   - Install the app to your store
   - Copy the Admin API access token

4. **API Documentation**:
   - Base URL: `https://your-shop.myshopify.com/admin/api/2023-10`
   - Authentication: Access Token in header `X-Shopify-Access-Token`
   - [Official API Docs](https://shopify.dev/docs/api/admin-rest)

#### Example API Configuration

```javascript
{
  "config": {
    "shopDomain": "your-shop.myshopify.com",
    "accessToken": "shpat_abcdef123456789",
    "apiVersion": "2023-10"
  }
}
```

## Import Methods

### API Method
- **Pros**: Reliable, structured data, faster, respects rate limits
- **Cons**: Requires API credentials and permissions
- **Best for**: Production environments, bulk imports

### Scraping Method (Puppeteer)
- **Pros**: Works with any public website, no API credentials needed
- **Cons**: Slower, browser-dependent, may break with website changes
- **Best for**: Quick testing, sites without API access

### Cheerio Method
- **Pros**: Faster than Puppeteer, no browser required
- **Cons**: Limited to static content, may not work with dynamic sites
- **Best for**: Simple HTML scraping, lightweight operations

## Response Format

All import endpoints return responses in the following format:

```javascript
{
  "success": true|false,
  "method": "api|scraping|cheerio",
  "data": [], // Array of imported products
  "message": "Description of the operation",
  "error": "Error message (if success is false)"
}
```

### Example Success Response

```javascript
{
  "success": true,
  "method": "api",
  "data": [
    {
      "id": "123456",
      "title": "Product Name",
      "price": "$29.99",
      "description": "Product description...",
      "images": ["https://example.com/image1.jpg"],
      "vendor": "Brand Name"
    }
  ],
  "message": "Products imported successfully via API"
}
```

### Example Error Response

```javascript
{
  "success": false,
  "method": "api",
  "error": "Invalid access token",
  "message": "Failed to import products via API"
}
```

## Troubleshooting

### Common Issues

1. **Puppeteer Installation Failed**:
   ```bash
   PUPPETEER_SKIP_DOWNLOAD=true npm install
   ```

2. **API Authentication Errors**:
   - Verify your credentials are correct
   - Check API token permissions
   - Ensure API version compatibility

3. **Scraping Failures**:
   - Check if the target website blocks bots
   - Verify the URL is accessible
   - Try using different user agents

4. **Rate Limiting**:
   - Implement delays between requests
   - Use API methods when available
   - Monitor API usage limits

### Debug Mode

For development and debugging, you can disable headless mode for scraping:

```javascript
{
  "config": {
    "headless": false,
    "timeout": 60000
  }
}
```

## Dependencies

- **express**: Web server framework
- **axios**: HTTP client for API requests
- **cheerio**: Server-side jQuery for HTML parsing
- **puppeteer**: Browser automation for dynamic scraping

### Development Dependencies

- **jest**: JavaScript testing framework
- **supertest**: HTTP testing library

## Testing

The project includes automated tests for all API endpoints:

```bash
# Run all tests
npm test

# Run tests in watch mode during development
npm run test:watch
```

### Test Coverage

- ✅ Health endpoint functionality
- ✅ API examples endpoint
- ✅ Method parameter validation
- ✅ Error handling and clear error messages
- ✅ Configuration validation
- ✅ All supported import methods

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC License
