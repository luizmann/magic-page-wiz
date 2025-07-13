import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorMessage from '../../components/common/ErrorMessage';

describe('ErrorMessage', () => {
  it('does not render when error is null', () => {
    const { container } = render(<ErrorMessage error={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders string error message', () => {
    render(<ErrorMessage error="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders error object with message', () => {
    const error = { message: 'API Error' };
    render(<ErrorMessage error={error} />);
    expect(screen.getByText('API Error')).toBeInTheDocument();
  });

  it('renders API error response', () => {
    const error = {
      response: {
        data: {
          error: 'Validation failed',
          details: ['Title is required', 'Content is required']
        }
      }
    };
    render(<ErrorMessage error={error} />);
    expect(screen.getByText('Validation failed')).toBeInTheDocument();
    expect(screen.getByText('Title is required, Content is required')).toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', () => {
    const mockRetry = jest.fn();
    render(<ErrorMessage error="Test error" onRetry={mockRetry} />);
    
    const retryButton = screen.getByText('Retry');
    fireEvent.click(retryButton);
    
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  it('calls onDismiss when dismiss button is clicked', () => {
    const mockDismiss = jest.fn();
    render(<ErrorMessage error="Test error" onDismiss={mockDismiss} />);
    
    const dismissButton = screen.getByLabelText('Dismiss error');
    fireEvent.click(dismissButton);
    
    expect(mockDismiss).toHaveBeenCalledTimes(1);
  });

  it('applies correct type classes', () => {
    const { rerender } = render(<ErrorMessage error="Test" type="error" />);
    expect(document.querySelector('.error-message')).toHaveClass('error-error');

    rerender(<ErrorMessage error="Test" type="warning" />);
    expect(document.querySelector('.error-message')).toHaveClass('error-warning');

    rerender(<ErrorMessage error="Test" type="info" />);
    expect(document.querySelector('.error-message')).toHaveClass('error-info');
  });
});