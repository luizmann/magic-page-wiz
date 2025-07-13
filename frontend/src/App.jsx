import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductGenerator from './pages/ProductGenerator';
import PageBuilder from './pages/PageBuilder';
import Dashboard from './pages/Dashboard';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 0;
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product-generator" element={<ProductGenerator />} />
          <Route path="/page-builder" element={<PageBuilder />} />
        </Routes>
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

export default App;