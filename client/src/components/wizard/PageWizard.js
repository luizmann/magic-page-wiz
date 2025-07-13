import React, { useState } from 'react';
import { pageService } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import './PageWizard.css';

const PageWizard = ({ onPageCreated }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    type: 'landing',
    published: false
  });

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Page title and type' },
    { number: 2, title: 'Content', description: 'Page content and description' },
    { number: 3, title: 'Review', description: 'Review and publish' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const validateStep = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return formData.title.trim().length > 0;
      case 2:
        return formData.content.trim().length > 0;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, steps.length));
    } else {
      setError('Please fill in all required fields before continuing.');
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
    setError(null);
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await pageService.createPage(formData);
      
      if (onPageCreated) {
        onPageCreated(response.data);
      }
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        content: '',
        type: 'landing',
        published: false
      });
      setStep(1);
      
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="wizard-step">
            <h3>Basic Information</h3>
            
            <div className="form-group">
              <label htmlFor="title">Page Title *</label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter page title"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Page Type</label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="form-select"
              >
                <option value="landing">Landing Page</option>
                <option value="sales">Sales Page</option>
                <option value="blog">Blog Post</option>
                <option value="portfolio">Portfolio</option>
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="wizard-step">
            <h3>Content</h3>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of your page"
                className="form-textarea"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Page Content *</label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Enter your page content (HTML supported)"
                className="form-textarea content-textarea"
                rows="8"
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="wizard-step">
            <h3>Review & Publish</h3>
            
            <div className="review-section">
              <div className="review-item">
                <strong>Title:</strong> {formData.title}
              </div>
              <div className="review-item">
                <strong>Type:</strong> {formData.type}
              </div>
              {formData.description && (
                <div className="review-item">
                  <strong>Description:</strong> {formData.description}
                </div>
              )}
              <div className="review-item">
                <strong>Content Length:</strong> {formData.content.length} characters
              </div>
            </div>

            <div className="form-group">
              <label className="publish-checkbox">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => handleInputChange('published', e.target.checked)}
                />
                Publish immediately
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return <LoadingSpinner size="large" message="Creating your magic page..." />;
  }

  return (
    <div className="page-wizard">
      <div className="wizard-header">
        <h2>Create Magic Page</h2>
        <div className="step-indicator">
          {steps.map((s, index) => (
            <div 
              key={s.number}
              className={`step-item ${step >= s.number ? 'active' : ''} ${step === s.number ? 'current' : ''}`}
            >
              <div className="step-number">{s.number}</div>
              <div className="step-info">
                <div className="step-title">{s.title}</div>
                <div className="step-description">{s.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <ErrorMessage 
          error={error} 
          onDismiss={() => setError(null)}
        />
      )}

      <div className="wizard-content">
        {renderStep()}
      </div>

      <div className="wizard-actions">
        {step > 1 && (
          <button 
            className="wizard-btn secondary"
            onClick={prevStep}
            disabled={loading}
          >
            Previous
          </button>
        )}
        
        {step < steps.length ? (
          <button 
            className="wizard-btn primary"
            onClick={nextStep}
            disabled={loading}
          >
            Next
          </button>
        ) : (
          <button 
            className="wizard-btn primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            Create Page
          </button>
        )}
      </div>
    </div>
  );
};

export default PageWizard;