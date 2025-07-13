// In-memory data store (replace with database in production)
class PageService {
  constructor() {
    this.pages = [];
    this.nextId = 1;
  }

  // Create a new page
  async createPage(pageData) {
    const page = {
      id: this.nextId++,
      ...pageData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.pages.push(page);
    return page;
  }

  // Get all pages with optional filtering
  async getAllPages(filters = {}) {
    let filteredPages = [...this.pages];

    if (filters.type) {
      filteredPages = filteredPages.filter(page => page.type === filters.type);
    }

    if (filters.published !== undefined) {
      filteredPages = filteredPages.filter(page => page.published === filters.published);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredPages = filteredPages.filter(page => 
        page.title.toLowerCase().includes(searchTerm) ||
        (page.description && page.description.toLowerCase().includes(searchTerm))
      );
    }

    return filteredPages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  // Get a single page by ID
  async getPageById(id) {
    const page = this.pages.find(p => p.id === parseInt(id));
    if (!page) {
      const error = new Error('Page not found');
      error.statusCode = 404;
      throw error;
    }
    return page;
  }

  // Update a page
  async updatePage(id, updateData) {
    const pageIndex = this.pages.findIndex(p => p.id === parseInt(id));
    
    if (pageIndex === -1) {
      const error = new Error('Page not found');
      error.statusCode = 404;
      throw error;
    }

    const updatedPage = {
      ...this.pages[pageIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    this.pages[pageIndex] = updatedPage;
    return updatedPage;
  }

  // Delete a page
  async deletePage(id) {
    const pageIndex = this.pages.findIndex(p => p.id === parseInt(id));
    
    if (pageIndex === -1) {
      const error = new Error('Page not found');
      error.statusCode = 404;
      throw error;
    }

    const deletedPage = this.pages.splice(pageIndex, 1)[0];
    return deletedPage;
  }

  // Get page statistics
  async getPageStats() {
    const total = this.pages.length;
    const published = this.pages.filter(p => p.published).length;
    const byType = this.pages.reduce((acc, page) => {
      acc[page.type] = (acc[page.type] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      published,
      draft: total - published,
      byType
    };
  }
}

// Export singleton instance
module.exports = new PageService();