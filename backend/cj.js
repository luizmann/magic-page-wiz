const express = require('express');
const axios = require('axios');
const crypto = require('crypto');

const router = express.Router();

// CJ Dropshipping API base URL
const CJ_API_BASE = 'https://developers.cjdropshipping.com/api2.0/v1';

// Generate signature for CJ API authentication
function generateSignature(params, secret) {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}${params[key]}`)
    .join('');
  
  return crypto
    .createHmac('sha256', secret)
    .update(sortedParams)
    .digest('hex')
    .toUpperCase();
}

// Create authenticated request headers
function createAuthHeaders(params) {
  const accessKey = process.env.CJ_ACCESS_KEY;
  const secretKey = process.env.CJ_SECRET_KEY;
  
  if (!accessKey || !secretKey) {
    throw new Error('CJ API credentials not configured');
  }

  const requestParams = {
    ...params,
    accessKey,
    timestamp: Date.now()
  };

  const signature = generateSignature(requestParams, secretKey);

  return {
    'Content-Type': 'application/json',
    'CJ-Access-Token': accessKey,
    'CJ-Signature': signature,
    'CJ-Timestamp': requestParams.timestamp.toString()
  };
}

// Middleware to check if CJ credentials are configured
const checkCJConfig = (req, res, next) => {
  if (!process.env.CJ_ACCESS_KEY || !process.env.CJ_SECRET_KEY) {
    return res.status(503).json({ 
      error: 'CJ Dropshipping integration not configured',
      message: 'Please set CJ_ACCESS_KEY and CJ_SECRET_KEY environment variables'
    });
  }
  next();
};

// Get product categories
router.get('/categories', checkCJConfig, async (req, res) => {
  try {
    const params = {};
    const headers = createAuthHeaders(params);

    const response = await axios.get(`${CJ_API_BASE}/products/categories`, {
      headers,
      params
    });

    res.json(response.data);
  } catch (error) {
    console.error('CJ categories error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch categories',
      message: error.response?.data?.message || error.message 
    });
  }
});

// Search products
router.get('/products', checkCJConfig, async (req, res) => {
  try {
    const { 
      keywords = '', 
      categoryId, 
      pageNum = 1, 
      pageSize = 20,
      minPrice,
      maxPrice,
      warehouseCountryId 
    } = req.query;

    const params = {
      keywords,
      pageNum: parseInt(pageNum),
      pageSize: parseInt(pageSize)
    };

    if (categoryId) params.categoryId = categoryId;
    if (minPrice) params.minPrice = parseFloat(minPrice);
    if (maxPrice) params.maxPrice = parseFloat(maxPrice);
    if (warehouseCountryId) params.warehouseCountryId = warehouseCountryId;

    const headers = createAuthHeaders(params);

    const response = await axios.get(`${CJ_API_BASE}/products/search`, {
      headers,
      params
    });

    res.json(response.data);
  } catch (error) {
    console.error('CJ products search error:', error.message);
    res.status(500).json({ 
      error: 'Failed to search products',
      message: error.response?.data?.message || error.message 
    });
  }
});

// Get product details
router.get('/products/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const params = { pid: productId };
    const headers = createAuthHeaders(params);

    const response = await axios.get(`${CJ_API_BASE}/products/query`, {
      headers,
      params
    });

    res.json(response.data);
  } catch (error) {
    console.error('CJ product details error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch product details',
      message: error.response?.data?.message || error.message 
    });
  }
});

// Get product inventory
router.get('/products/:productId/inventory', async (req, res) => {
  try {
    const { productId } = req.params;
    const params = { pid: productId };
    const headers = createAuthHeaders(params);

    const response = await axios.get(`${CJ_API_BASE}/products/inventory`, {
      headers,
      params
    });

    res.json(response.data);
  } catch (error) {
    console.error('CJ inventory error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch product inventory',
      message: error.response?.data?.message || error.message 
    });
  }
});

// Create order
router.post('/orders', async (req, res) => {
  try {
    const orderData = req.body;
    const headers = createAuthHeaders(orderData);

    const response = await axios.post(`${CJ_API_BASE}/shopping/order/createOrder`, orderData, {
      headers
    });

    res.json(response.data);
  } catch (error) {
    console.error('CJ create order error:', error.message);
    res.status(500).json({ 
      error: 'Failed to create order',
      message: error.response?.data?.message || error.message 
    });
  }
});

// Get order details
router.get('/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const params = { cjOrderId: orderId };
    const headers = createAuthHeaders(params);

    const response = await axios.get(`${CJ_API_BASE}/shopping/order/getOrderDetail`, {
      headers,
      params
    });

    res.json(response.data);
  } catch (error) {
    console.error('CJ order details error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch order details',
      message: error.response?.data?.message || error.message 
    });
  }
});

// Get shipping methods
router.get('/shipping-methods', async (req, res) => {
  try {
    const { countryCode } = req.query;
    
    if (!countryCode) {
      return res.status(400).json({ error: 'Country code is required' });
    }

    const params = { countryCode };
    const headers = createAuthHeaders(params);

    const response = await axios.get(`${CJ_API_BASE}/logistic/freightCalculate`, {
      headers,
      params
    });

    res.json(response.data);
  } catch (error) {
    console.error('CJ shipping methods error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch shipping methods',
      message: error.response?.data?.message || error.message 
    });
  }
});

module.exports = router;