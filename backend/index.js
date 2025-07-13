const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const shopifyRoutes = require('./shopify');
const cjRoutes = require('./cj');
const openaiRoutes = require('./openai');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/shopify', shopifyRoutes);
app.use('/api/cj', cjRoutes);
app.use('/api/openai', openaiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'magic-page-wiz-backend' 
  });
});

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// Default API route
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Magic Page Wiz API is running!',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      shopify: '/api/shopify',
      cj: '/api/cj',
      openai: '/api/openai'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Magic Page Wiz Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🛠️  API documentation: http://localhost:${PORT}/api`);
});

module.exports = app;