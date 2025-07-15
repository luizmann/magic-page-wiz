# Magic Page Wiz - Real API Integration Documentation

## Overview

Magic Page Wiz now features a **fully functional real API integration system** that can scrape and import product data from CJ Dropshipping and Shopify stores. This is no longer a simulation - it performs actual web scraping and data extraction.

## API Endpoints

### Health Check
```
GET /health
```
Returns system status and confirms the server is running.

### CJ Dropshipping Import
```
POST /api/import/cj
Content-Type: application/json

{
  "url": "https://cjdropshipping.com/product/12345/product-name"
}
```

**Features:**
- Real web scraping of CJ Dropshipping product pages
- Intelligent HTML parsing with multiple selector strategies
- Automatic image extraction and URL normalization
- Price extraction with proper formatting
- Feature and specification extraction
- Fallback data when scraping partially fails
- Rate limiting (10 requests per minute per IP)

### Shopify Import
```
POST /api/import/shopify
Content-Type: application/json

{
  "url": "https://store.myshopify.com/products/product-name"
}
```

**Features:**
- Primary: Shopify JSON API extraction (when available)
- Fallback: HTML scraping for stores without JSON access
- Product variant and pricing information
- Option extraction (size, color, etc.)
- Tag and category information
- Vendor and product type extraction
- Image gallery extraction
- Rate limiting (10 requests per minute per IP)

## Technical Implementation

### Web Scraping Technology Stack
- **axios**: HTTP client for making requests
- **cheerio**: Server-side jQuery implementation for HTML parsing
- **user-agents**: Random user agent rotation to avoid detection
- **cors**: Cross-origin resource sharing support

### Anti-Detection Measures
- Random user agent rotation
- Proper HTTP headers simulation
- Request timeout handling
- Redirect following
- Cache control headers

### Data Extraction Strategies

#### Multiple Selector Approach
The system uses multiple CSS selectors for each data type to handle different site layouts:

```javascript
// Example for product names
const nameSelectors = [
    'h1',
    '.product-title',
    '.product-name', 
    '[data-testid="product-title"]',
    '.title',
    '#product-title',
    '.product__title'
];
```

#### Intelligent Image Processing
- Filters out icons, logos, and non-product images
- Converts relative URLs to absolute URLs
- Removes query parameters that might cause issues
- Limits to 5 images maximum per product

#### Price Processing
- Extracts numeric values from price strings
- Handles multiple currency formats
- Identifies original vs. sale prices
- Formats consistently with $ prefix

### Error Handling & Fallbacks

#### Graceful Degradation
When scraping fails or returns incomplete data, the system:
1. Returns fallback product information
2. Includes placeholder images from Unsplash
3. Provides default features and specifications
4. Marks the response with an error flag for user awareness

#### Rate Limiting
- 10 requests per minute per IP address
- In-memory storage (suitable for single-server deployment)
- 429 status code with retry-after header when exceeded
- Automatic cleanup of expired rate limit entries

## Frontend Integration

### Updated Import System
The frontend `import.js` has been completely rewritten to:
- Make real HTTP requests to backend APIs
- Handle loading states and error messages
- Display warnings when partial data extraction occurs
- Integrate seamlessly with the page builder

### User Experience
- Real-time loading indicators
- Success/error notifications
- Graceful handling of partial failures
- Clear feedback when URLs are invalid

## Security & Performance

### Security Measures
- URL validation before processing
- Rate limiting to prevent abuse
- Timeout controls to prevent hanging requests
- Input sanitization for URLs

### Performance Optimizations
- Request timeouts (15 seconds max)
- Connection keep-alive
- Image URL deduplication
- Response size limiting

## Testing & Validation

### Endpoint Testing
```bash
# Test CJ Dropshipping endpoint
curl -X POST http://localhost:3000/api/import/cj \
  -H "Content-Type: application/json" \
  -d '{"url":"https://cjdropshipping.com/product/12345/test"}'

# Test Shopify endpoint  
curl -X POST http://localhost:3000/api/import/shopify \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.myshopify.com/products/test"}'

# Test rate limiting
for i in {1..12}; do
  curl -X POST http://localhost:3000/api/import/cj \
    -H "Content-Type: application/json" \
    -d '{"url":"https://cjdropshipping.com/product/test"}' \
    -w "\nStatus: %{http_code}\n"
done
```

### Expected Response Format
```json
{
  "id": "product-id",
  "name": "Product Name",
  "description": "Product description...",
  "price": "$29.99",
  "originalPrice": "$39.99",
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "features": [
    "Feature 1",
    "Feature 2"
  ],
  "specifications": {
    "Brand": "Example Brand",
    "Source": "Shopify",
    "Import Date": "12/25/2023"
  },
  "reviews": [],
  "source": "shopify"
}
```

## Deployment Considerations

### Environment Variables
```bash
PORT=3000  # Server port (optional, defaults to 3000)
```

### Dependencies
All required dependencies are included in package.json and will be installed with `npm install`.

### Production Recommendations
1. **Rate Limiting**: Consider using Redis for distributed rate limiting
2. **Caching**: Implement response caching for frequently requested products
3. **Monitoring**: Add logging and monitoring for scraping success rates
4. **Proxy Rotation**: For high-volume usage, consider proxy rotation
5. **Database**: Store successful scraping results for faster subsequent requests

## Troubleshooting

### Common Issues
1. **Scraping Failures**: Sites may block requests - fallback data is provided
2. **Rate Limiting**: Wait 60 seconds between high-volume requests
3. **Invalid URLs**: Ensure URLs contain proper domain patterns
4. **Timeout Errors**: Some sites may be slow - 15-second timeout is configured

### Logging
The server logs all scraping attempts and results:
- `🔍 Scraping [Platform] URL: [url]`
- `✅ Successfully scraped product: [name]`
- `❌ [Platform] scraping error: [error]`

This real integration system transforms Magic Page Wiz from a prototype into a functional MVP capable of importing actual product data from major e-commerce platforms.