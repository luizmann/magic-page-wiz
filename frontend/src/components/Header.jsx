import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Wand2, Home, LayoutDashboard, Package, Edit3 } from 'lucide-react';

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #667eea;
  font-weight: bold;
  font-size: 1.5rem;
  
  &:hover {
    color: #764ba2;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: ${props => props.active ? '#667eea' : '#666'};
  font-weight: ${props => props.active ? '600' : '400'};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    color: #667eea;
    background: rgba(102, 126, 234, 0.1);
  }
  
  @media (max-width: 768px) {
    span {
      display: none;
    }
  }
`;

function Header() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">
          <Wand2 size={32} />
          <span>Magic Page Wiz</span>
        </Logo>
        
        <NavLinks>
          <NavLink to="/" active={isActive('/')}>
            <Home size={20} />
            <span>Home</span>
          </NavLink>
          
          <NavLink to="/dashboard" active={isActive('/dashboard')}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink to="/product-generator" active={isActive('/product-generator')}>
            <Package size={20} />
            <span>Products</span>
          </NavLink>
          
          <NavLink to="/page-builder" active={isActive('/page-builder')}>
            <Edit3 size={20} />
            <span>Page Builder</span>
          </NavLink>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;