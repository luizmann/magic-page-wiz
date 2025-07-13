const pageService = require('../services/pageService');

class PageController {
  // Get all pages
  async getAllPages(req, res, next) {
    try {
      const { type, published, search } = req.query;
      const filters = {};
      
      if (type) filters.type = type;
      if (published !== undefined) filters.published = published === 'true';
      if (search) filters.search = search;

      const pages = await pageService.getAllPages(filters);
      
      res.json({
        success: true,
        data: pages,
        count: pages.length
      });
    } catch (error) {
      next(error);
    }
  }

  // Get a single page
  async getPageById(req, res, next) {
    try {
      const { id } = req.params;
      const page = await pageService.getPageById(id);
      
      res.json({
        success: true,
        data: page
      });
    } catch (error) {
      next(error);
    }
  }

  // Create a new page
  async createPage(req, res, next) {
    try {
      const pageData = {
        title: req.body.title,
        description: req.body.description || '',
        content: req.body.content,
        type: req.body.type,
        published: req.body.published || false
      };

      const newPage = await pageService.createPage(pageData);
      
      res.status(201).json({
        success: true,
        data: newPage,
        message: 'Page created successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // Update a page
  async updatePage(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = {};
      
      // Only include provided fields
      if (req.body.title !== undefined) updateData.title = req.body.title;
      if (req.body.description !== undefined) updateData.description = req.body.description;
      if (req.body.content !== undefined) updateData.content = req.body.content;
      if (req.body.type !== undefined) updateData.type = req.body.type;
      if (req.body.published !== undefined) updateData.published = req.body.published;

      const updatedPage = await pageService.updatePage(id, updateData);
      
      res.json({
        success: true,
        data: updatedPage,
        message: 'Page updated successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete a page
  async deletePage(req, res, next) {
    try {
      const { id } = req.params;
      await pageService.deletePage(id);
      
      res.json({
        success: true,
        message: 'Page deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // Get page statistics
  async getPageStats(req, res, next) {
    try {
      const stats = await pageService.getPageStats();
      
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PageController();