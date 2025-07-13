import React, { useState, useEffect } from 'react';
import PageList from './components/pages/PageList';
import PageWizard from './components/wizard/PageWizard';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorMessage from './components/common/ErrorMessage';
import { pageService } from './services/api';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('list');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Check backend health on app start
  useEffect(() => {
    const checkHealth = async () => {
      try {
        await pageService.healthCheck();
        setIsLoading(false);
      } catch (err) {
        console.error('Backend health check failed:', err);
        setError(err);
        setIsLoading(false);
      }
    };

    checkHealth();
  }, []);

  const handlePageCreated = () => {
    setCurrentView('list');
    setRefreshKey(prev => prev + 1); // Force refresh of page list
  };

  if (isLoading) {
    return (
      <div className="app-loading">
        <LoadingSpinner size="large" message="Connecting to Magic Page Wiz..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error">
        <ErrorMessage 
          error="Failed to connect to the backend server. Please make sure the server is running."
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">🪄 Magic Page Wiz</h1>
          <p className="app-subtitle">Create amazing pages with magical ease</p>
          
          <nav className="app-nav">
            <button 
              className={`nav-btn ${currentView === 'list' ? 'active' : ''}`}
              onClick={() => setCurrentView('list')}
            >
              📄 My Pages
            </button>
            <button 
              className={`nav-btn ${currentView === 'create' ? 'active' : ''}`}
              onClick={() => setCurrentView('create')}
            >
              ✨ Create Page
            </button>
          </nav>
        </div>
      </header>

      <main className="app-main">
        {currentView === 'list' && (
          <PageList key={refreshKey} />
        )}
        {currentView === 'create' && (
          <PageWizard onPageCreated={handlePageCreated} />
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Magic Page Wiz. Built with ❤️ and React.</p>
      </footer>
    </div>
  );
}

export default App;
