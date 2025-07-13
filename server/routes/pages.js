const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const { 
  validatePageCreation, 
  validatePageUpdate, 
  validatePageId 
} = require('../middleware/validation');

/**
 * @route   GET /api/pages
 * @desc    Get all pages with optional filtering
 * @query   type, published, search
 * @access  Public
 */
router.get('/', pageController.getAllPages);

/**
 * @route   GET /api/pages/stats
 * @desc    Get page statistics
 * @access  Public
 */
router.get('/stats', pageController.getPageStats);

/**
 * @route   GET /api/pages/:id
 * @desc    Get a single page by ID
 * @access  Public
 */
router.get('/:id', validatePageId, pageController.getPageById);

/**
 * @route   POST /api/pages
 * @desc    Create a new page
 * @access  Public
 */
router.post('/', validatePageCreation, pageController.createPage);

/**
 * @route   PUT /api/pages/:id
 * @desc    Update a page
 * @access  Public
 */
router.put('/:id', validatePageUpdate, pageController.updatePage);

/**
 * @route   DELETE /api/pages/:id
 * @desc    Delete a page
 * @access  Public
 */
router.delete('/:id', validatePageId, pageController.deletePage);

module.exports = router;