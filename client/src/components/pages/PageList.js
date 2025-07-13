import React, { useState, useEffect } from 'react';
import { pageService } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import PageCard from './PageCard';
import './PageList.css';

const PageList = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    published: '',
    search: ''
  });
  const [stats, setStats] = useState(null);

  // Load pages and stats
  const loadPages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [pagesResponse, statsResponse] = await Promise.all([
        pageService.getPages(filters),
        pageService.getPageStats()
      ]);
      
      setPages(pagesResponse.data || []);
      setStats(statsResponse.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Load pages on component mount and filter changes
  useEffect(() => {
    loadPages();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Handle page deletion
  const handleDeletePage = async (pageId) => {
    if (!window.confirm('Are you sure you want to delete this page?')) {
      return;
    }

    try {
      await pageService.deletePage(pageId);
      await loadPages(); // Reload pages after deletion
    } catch (err) {
      setError(err);
    }
  };

  if (loading) {
    return <LoadingSpinner size="large" message="Loading pages..." />;
  }

  return (
    <div className="page-list">
      <div className="page-list-header">
        <h2>Magic Pages</h2>
        {stats && (
          <div className="page-stats">
            <span className="stat">Total: {stats.total}</span>
            <span className="stat">Published: {stats.published}</span>
            <span className="stat">Drafts: {stats.draft}</span>
          </div>
        )}
      </div>

      {error && (
        <ErrorMessage 
          error={error} 
          onRetry={loadPages}
          onDismiss={() => setError(null)}
        />
      )}

      <div className="page-filters">
        <div className="filter-group">
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            type="text"
            placeholder="Search pages..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="">All Types</option>
            <option value="landing">Landing</option>
            <option value="sales">Sales</option>
            <option value="blog">Blog</option>
            <option value="portfolio">Portfolio</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="published">Status:</label>
          <select
            id="published"
            value={filters.published}
            onChange={(e) => handleFilterChange('published', e.target.value)}
          >
            <option value="">All</option>
            <option value="true">Published</option>
            <option value="false">Draft</option>
          </select>
        </div>
      </div>

      <div className="pages-grid">
        {pages.length === 0 ? (
          <div className="no-pages">
            <p>No pages found. Create your first magic page!</p>
          </div>
        ) : (
          pages.map(page => (
            <PageCard 
              key={page.id} 
              page={page} 
              onDelete={handleDeletePage}
              onUpdate={loadPages}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PageList;