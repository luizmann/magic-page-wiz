const request = require('supertest');
const { app, server } = require('../server/index');

describe('Page API Endpoints', () => {
  let testPageId;

  afterAll((done) => {
    server.close(done);
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const res = await request(app)
        .get('/api/health')
        .expect(200);

      expect(res.body.status).toBe('OK');
      expect(res.body.timestamp).toBeDefined();
    });
  });

  describe('POST /api/pages', () => {
    it('should create a new page with valid data', async () => {
      const pageData = {
        title: 'Test Landing Page',
        description: 'A test landing page',
        content: '<h1>Welcome to our test page</h1>',
        type: 'landing',
        published: true
      };

      const res = await request(app)
        .post('/api/pages')
        .send(pageData)
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe(pageData.title);
      expect(res.body.data.id).toBeDefined();
      expect(res.body.message).toBe('Page created successfully');

      testPageId = res.body.data.id;
    });

    it('should return validation error for missing required fields', async () => {
      const invalidData = {
        title: '',
        content: ''
      };

      const res = await request(app)
        .post('/api/pages')
        .send(invalidData)
        .expect(400);

      expect(res.body.error).toBe('Validation Error');
      expect(res.body.details).toBeDefined();
    });

    it('should return validation error for invalid page type', async () => {
      const invalidData = {
        title: 'Test Page',
        content: '<p>Content</p>',
        type: 'invalid-type'
      };

      const res = await request(app)
        .post('/api/pages')
        .send(invalidData)
        .expect(400);

      expect(res.body.error).toBe('Validation Error');
    });
  });

  describe('GET /api/pages', () => {
    it('should get all pages', async () => {
      const res = await request(app)
        .get('/api/pages')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.count).toBeDefined();
    });

    it('should filter pages by type', async () => {
      const res = await request(app)
        .get('/api/pages?type=landing')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeInstanceOf(Array);
      res.body.data.forEach(page => {
        expect(page.type).toBe('landing');
      });
    });

    it('should filter pages by published status', async () => {
      const res = await request(app)
        .get('/api/pages?published=true')
        .expect(200);

      expect(res.body.success).toBe(true);
      res.body.data.forEach(page => {
        expect(page.published).toBe(true);
      });
    });
  });

  describe('GET /api/pages/:id', () => {
    it('should get a page by ID', async () => {
      const res = await request(app)
        .get(`/api/pages/${testPageId}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(testPageId);
    });

    it('should return 404 for non-existent page', async () => {
      const res = await request(app)
        .get('/api/pages/999999')
        .expect(404);

      expect(res.body.error).toBe('Page not found');
    });
  });

  describe('PUT /api/pages/:id', () => {
    it('should update a page', async () => {
      const updateData = {
        title: 'Updated Test Page',
        published: false
      };

      const res = await request(app)
        .put(`/api/pages/${testPageId}`)
        .send(updateData)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe(updateData.title);
      expect(res.body.data.published).toBe(updateData.published);
      expect(res.body.message).toBe('Page updated successfully');
    });

    it('should return 404 for non-existent page', async () => {
      const res = await request(app)
        .put('/api/pages/999999')
        .send({ title: 'Updated' })
        .expect(404);

      expect(res.body.error).toBe('Page not found');
    });
  });

  describe('GET /api/pages/stats', () => {
    it('should get page statistics', async () => {
      const res = await request(app)
        .get('/api/pages/stats')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.total).toBeDefined();
      expect(res.body.data.published).toBeDefined();
      expect(res.body.data.draft).toBeDefined();
      expect(res.body.data.byType).toBeDefined();
    });
  });

  describe('DELETE /api/pages/:id', () => {
    it('should delete a page', async () => {
      const res = await request(app)
        .delete(`/api/pages/${testPageId}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Page deleted successfully');
    });

    it('should return 404 for non-existent page', async () => {
      const res = await request(app)
        .delete('/api/pages/999999')
        .expect(404);

      expect(res.body.error).toBe('Page not found');
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for invalid routes', async () => {
      const res = await request(app)
        .get('/api/invalid-route')
        .expect(404);

      expect(res.body.error).toBe('Route not found');
    });
  });
});