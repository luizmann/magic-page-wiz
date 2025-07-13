const express = require('express');
const axios = require('axios');

const router = express.Router();

// Initialize Shopify API only if credentials are provided
let shopify = null;
if (process.env.SHOPIFY_API_KEY && process.env.SHOPIFY_API_SECRET) {
  try {
    const { shopifyApi, ApiVersion } = require('@shopify/shopify-api');
    shopify = shopifyApi({
      apiKey: process.env.SHOPIFY_API_KEY,
      apiSecretKey: process.env.SHOPIFY_API_SECRET,
      scopes: ['read_products', 'write_products', 'read_orders', 'write_orders'],
      hostName: process.env.SHOPIFY_HOST || 'localhost:3001',
      apiVersion: ApiVersion.October23,
    });
  } catch (error) {
    console.warn('Shopify API initialization failed:', error.message);
  }
}

// Middleware to check if Shopify is configured
const checkShopifyConfig = (req, res, next) => {
  if (!process.env.SHOPIFY_API_KEY || !process.env.SHOPIFY_API_SECRET) {
    return res.status(503).json({ 
      error: 'Shopify integration not configured',
      message: 'Please set SHOPIFY_API_KEY and SHOPIFY_API_SECRET environment variables'
    });
  }
  next();
};

// Get shop information
router.get('/shop', checkShopifyConfig, async (req, res) => {
  try {
    const { shop, accessToken } = req.query;
    
    if (!shop || !accessToken) {
      return res.status(400).json({ 
        error: 'Shop domain and access token are required' 
      });
    }

    const response = await axios.get(`https://${shop}/admin/api/2023-10/shop.json`, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Shopify shop error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch shop information',
      message: error.response?.data?.errors || error.message 
    });
  }
});

// Get products
router.get('/products', checkShopifyConfig, async (req, res) => {
  try {
    const { shop, accessToken, limit = 50 } = req.query;
    
    if (!shop || !accessToken) {
      return res.status(400).json({ 
        error: 'Shop domain and access token are required' 
      });
    }

    const response = await axios.get(`https://${shop}/admin/api/2023-10/products.json?limit=${limit}`, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Shopify products error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch products',
      message: error.response?.data?.errors || error.message 
    });
  }
});

// Create a product
router.post('/products', checkShopifyConfig, async (req, res) => {
  try {
    const { shop, accessToken } = req.query;
    const productData = req.body;
    
    if (!shop || !accessToken) {
      return res.status(400).json({ 
        error: 'Shop domain and access token are required' 
      });
    }

    const response = await axios.post(`https://${shop}/admin/api/2023-10/products.json`, {
      product: productData
    }, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Shopify create product error:', error.message);
    res.status(500).json({ 
      error: 'Failed to create product',
      message: error.response?.data?.errors || error.message 
    });
  }
});

// Get orders
router.get('/orders', checkShopifyConfig, async (req, res) => {
  try {
    const { shop, accessToken, limit = 50, status = 'any' } = req.query;
    
    if (!shop || !accessToken) {
      return res.status(400).json({ 
        error: 'Shop domain and access token are required' 
      });
    }

    const response = await axios.get(`https://${shop}/admin/api/2023-10/orders.json?limit=${limit}&status=${status}`, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Shopify orders error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch orders',
      message: error.response?.data?.errors || error.message 
    });
  }
});

// OAuth authorization URL
router.get('/auth-url', checkShopifyConfig, (req, res) => {
  try {
    const { shop } = req.query;
    
    if (!shop) {
      return res.status(400).json({ error: 'Shop domain is required' });
    }

    const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=read_products,write_products,read_orders,write_orders&redirect_uri=${process.env.SHOPIFY_REDIRECT_URI}`;
    
    res.json({ authUrl });
  } catch (error) {
    console.error('Shopify auth URL error:', error.message);
    res.status(500).json({ 
      error: 'Failed to generate auth URL',
      message: error.message 
    });
  }
});

module.exports = router;