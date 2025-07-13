import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const pageService = {
  // Get all pages with optional filters
  getPages: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value);
      }
    });
    
    const queryString = params.toString();
    const url = `/pages${queryString ? `?${queryString}` : ''}`;
    
    const response = await api.get(url);
    return response.data;
  },

  // Get a single page by ID
  getPageById: async (id) => {
    const response = await api.get(`/pages/${id}`);
    return response.data;
  },

  // Create a new page
  createPage: async (pageData) => {
    const response = await api.post('/pages', pageData);
    return response.data;
  },

  // Update a page
  updatePage: async (id, pageData) => {
    const response = await api.put(`/pages/${id}`, pageData);
    return response.data;
  },

  // Delete a page
  deletePage: async (id) => {
    const response = await api.delete(`/pages/${id}`);
    return response.data;
  },

  // Get page statistics
  getPageStats: async () => {
    const response = await api.get('/pages/stats');
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  }
};

export default api;