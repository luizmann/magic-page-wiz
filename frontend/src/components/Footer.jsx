import React from 'react';
import styled from 'styled-components';
import { Wand2, Github, Heart } from 'lucide-react';

const FooterContainer = styled.footer`
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 2rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    color: #667eea;
  }
  
  p, li {
    margin-bottom: 0.5rem;
    opacity: 0.8;
    line-height: 1.6;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  a {
    color: #667eea;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0.6;
  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>
            <Wand2 size={20} />
            Magic Page Wiz
          </h3>
          <p>
            Create stunning pages and sales pages with AI-powered content generation 
            and seamless dropshipping integration.
          </p>
          <p>
            Transform your e-commerce business with intelligent automation and 
            professional page creation tools.
          </p>
        </FooterSection>
        
        <FooterSection>
          <h3>Features</h3>
          <ul>
            <li>• AI-powered content generation</li>
            <li>• Shopify integration</li>
            <li>• CJ Dropshipping support</li>
            <li>• Professional page templates</li>
            <li>• SEO optimization</li>
            <li>• Responsive design</li>
          </ul>
        </FooterSection>
        
        <FooterSection>
          <h3>Integrations</h3>
          <ul>
            <li><a href="https://shopify.com" target="_blank" rel="noopener noreferrer">Shopify API</a></li>
            <li><a href="https://cjdropshipping.com" target="_blank" rel="noopener noreferrer">CJ Dropshipping</a></li>
            <li><a href="https://openai.com" target="_blank" rel="noopener noreferrer">OpenAI GPT</a></li>
            <li><a href="https://render.com" target="_blank" rel="noopener noreferrer">Render Deployment</a></li>
          </ul>
        </FooterSection>
        
        <FooterSection>
          <h3>Resources</h3>
          <ul>
            <li><a href="/api" target="_blank">API Documentation</a></li>
            <li><a href="https://github.com/luizmann/magic-page-wiz" target="_blank" rel="noopener noreferrer">
              <Github size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
              GitHub Repository
            </a></li>
            <li><a href="/api/health" target="_blank">Service Status</a></li>
          </ul>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        Made with <Heart size={16} color="#ff6b6b" /> for the e-commerce community
      </Copyright>
    </FooterContainer>
  );
}

export default Footer;