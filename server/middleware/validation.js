const { body, param, validationResult } = require('express-validator');

// Validation middleware to check for errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation Error',
      details: errors.array()
    });
  }
  next();
};

// Page creation validation rules
const validatePageCreation = [
  body('title')
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be between 1 and 255 characters')
    .trim()
    .escape(),
  
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters')
    .trim()
    .escape(),
  
  body('content')
    .isLength({ min: 1 })
    .withMessage('Content is required')
    .trim(),
  
  body('type')
    .isIn(['landing', 'sales', 'blog', 'portfolio'])
    .withMessage('Type must be one of: landing, sales, blog, portfolio'),
  
  body('published')
    .optional()
    .isBoolean()
    .withMessage('Published must be a boolean value'),
  
  handleValidationErrors
];

// Page update validation rules
const validatePageUpdate = [
  param('id')
    .isLength({ min: 1 })
    .withMessage('Page ID is required'),
  
  body('title')
    .optional()
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be between 1 and 255 characters')
    .trim()
    .escape(),
  
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters')
    .trim()
    .escape(),
  
  body('content')
    .optional()
    .isLength({ min: 1 })
    .withMessage('Content cannot be empty')
    .trim(),
  
  body('type')
    .optional()
    .isIn(['landing', 'sales', 'blog', 'portfolio'])
    .withMessage('Type must be one of: landing, sales, blog, portfolio'),
  
  body('published')
    .optional()
    .isBoolean()
    .withMessage('Published must be a boolean value'),
  
  handleValidationErrors
];

// Page ID validation
const validatePageId = [
  param('id')
    .isLength({ min: 1 })
    .withMessage('Page ID is required'),
  
  handleValidationErrors
];

module.exports = {
  validatePageCreation,
  validatePageUpdate,
  validatePageId,
  handleValidationErrors
};