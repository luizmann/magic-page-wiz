require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Magic Page Wiz',
    description: 'Create amazing pages and sales pages with magic!'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Magic Page Wiz is running!',
    timestamp: new Date().toISOString()
  });
});

// Create page endpoint (placeholder for future functionality)
app.post('/api/pages', (req, res) => {
  res.json({ 
    message: 'Page creation endpoint - to be implemented',
    data: req.body
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎩 Magic Page Wiz is running on port ${PORT}`);
  console.log(`📄 Visit http://localhost:${PORT} to see the magic!`);
});

module.exports = app;