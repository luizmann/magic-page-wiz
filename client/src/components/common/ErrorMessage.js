import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ 
  error, 
  onRetry, 
  onDismiss, 
  type = 'error',
  className = '' 
}) => {
  if (!error) return null;

  const getErrorMessage = () => {
    if (typeof error === 'string') return error;
    if (error.response?.data?.error) return error.response.data.error;
    if (error.response?.data?.message) return error.response.data.message;
    if (error.message) return error.message;
    return 'An unexpected error occurred';
  };

  const getErrorDetails = () => {
    if (error.response?.data?.details) {
      if (Array.isArray(error.response.data.details)) {
        return error.response.data.details.map(detail => 
          detail.msg || detail.message || detail
        ).join(', ');
      }
      return error.response.data.details;
    }
    return null;
  };

  return (
    <div className={`error-message error-${type} ${className}`}>
      <div className="error-icon">
        {type === 'error' && '❌'}
        {type === 'warning' && '⚠️'}
        {type === 'info' && 'ℹ️'}
      </div>
      
      <div className="error-content">
        <div className="error-title">{getErrorMessage()}</div>
        {getErrorDetails() && (
          <div className="error-details">{getErrorDetails()}</div>
        )}
      </div>
      
      <div className="error-actions">
        {onRetry && (
          <button 
            className="error-retry-btn"
            onClick={onRetry}
            type="button"
          >
            Retry
          </button>
        )}
        {onDismiss && (
          <button 
            className="error-dismiss-btn"
            onClick={onDismiss}
            type="button"
            aria-label="Dismiss error"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;