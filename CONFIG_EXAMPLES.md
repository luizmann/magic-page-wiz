# Configuration Examples

This file contains example configurations for setting up CJ Dropshipping and Shopify integrations.

## Environment Variables (Optional)

You can set these environment variables for default configurations:

```bash
# CJ Dropshipping
export CJ_EMAIL="your-email@example.com"
export CJ_PASSWORD="your-password"
export CJ_ACCESS_TOKEN="your-access-token"

# Shopify
export SHOPIFY_SHOP_DOMAIN="your-shop.myshopify.com"
export SHOPIFY_ACCESS_TOKEN="shpat_your-access-token"
export SHOPIFY_API_VERSION="2023-10"
```

## CJ Dropshipping API Configuration

### Step 1: Get API Access
1. Create account at https://cjdropshipping.com
2. Apply for API access at https://developers.cjdropshipping.com
3. Get your credentials

### Step 2: Test Configuration
```bash
curl -X POST http://localhost:3000/api/import/cj \
  -H "Content-Type: application/json" \
  -d '{
    "method": "api",
    "config": {
      "email": "your-business-email@company.com",
      "password": "your-password",
      "accessToken": "your-cj-access-token"
    },
    "options": {
      "page": 1,
      "limit": 5,
      "keyword": "phone"
    }
  }'
```

## Shopify API Configuration

### Step 1: Create Private App
1. Go to your Shopify Admin
2. Navigate to Apps > App and sales channel settings
3. Click "Develop apps for your store"
4. Create new app with these permissions:
   - `read_products`
   - `read_product_listings`
   - `read_collections`

### Step 2: Test Configuration
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
      "limit": 5,
      "fields": "id,title,handle,vendor,images"
    }
  }'
```

## Scraping Configuration

### For websites that don't require authentication:
```bash
curl -X POST http://localhost:3000/api/import/shopify \
  -H "Content-Type: application/json" \
  -d '{
    "method": "cheerio",
    "options": {
      "url": "https://example-store.myshopify.com/collections/all"
    }
  }'
```

### For dynamic websites:
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