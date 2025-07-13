import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(document.querySelector('.loading-container')).toBeInTheDocument();
  });

  it('renders with custom message', () => {
    render(<LoadingSpinner message="Custom loading message" />);
    
    expect(screen.getByText('Custom loading message')).toBeInTheDocument();
  });

  it('renders without message when message is null', () => {
    render(<LoadingSpinner message={null} />);
    
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<LoadingSpinner size="small" />);
    expect(document.querySelector('.loading-container')).toHaveClass('loading-small');

    rerender(<LoadingSpinner size="large" />);
    expect(document.querySelector('.loading-container')).toHaveClass('loading-large');

    rerender(<LoadingSpinner size="medium" />);
    expect(document.querySelector('.loading-container')).toHaveClass('loading-medium');
  });
});