import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the API service to avoid axios issues in tests
jest.mock('./services/api', () => ({
  pageService: {
    healthCheck: jest.fn().mockResolvedValue({ status: 'OK' }),
    getPages: jest.fn().mockResolvedValue({ data: [] }),
    getPageStats: jest.fn().mockResolvedValue({ data: { total: 0, published: 0, draft: 0, byType: {} } })
  }
}));

test('renders magic page wiz title', async () => {
  render(<App />);
  const titleElement = await screen.findByText(/Magic Page Wiz/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders navigation buttons', async () => {
  render(<App />);
  const pagesButton = await screen.findByText(/My Pages/i);
  const createButton = await screen.findByText(/Create Page/i);
  
  expect(pagesButton).toBeInTheDocument();
  expect(createButton).toBeInTheDocument();
});
