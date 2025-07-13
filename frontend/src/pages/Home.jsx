import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Wand2, Zap, Globe, ShoppingCart, ArrowRight, Star } from 'lucide-react';

const HomeContainer = styled.div`
  min-height: calc(100vh - 140px);
`;

const HeroSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  
  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }
  
  p {
    font-size: 1.3rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    line-height: 1.6;
  }
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &.primary {
    background: white;
    color: #667eea;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
  }
  
  &.secondary {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  background: white;
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: #333;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  padding: 2rem;
  border-radius: 20px;
  background: linear-gradient(135deg, #f8f9ff 0%, #e8ecff 100%);
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.1);
  }
  
  .icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  p {
    color: #666;
    line-height: 1.6;
  }
`;

const StatsSection = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
`;

const StatsGrid = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const StatCard = styled.div`
  h3 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }
  
  p {
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

function Home() {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <h1>Create Magical Pages That Convert</h1>
          <p>
            Harness the power of AI to generate compelling sales pages, integrate with 
            Shopify and dropshipping platforms, and build pages that actually sell.
          </p>
          <CTAButtons>
            <CTAButton to="/page-builder" className="primary">
              <Wand2 size={20} />
              Start Creating
              <ArrowRight size={20} />
            </CTAButton>
            <CTAButton to="/dashboard" className="secondary">
              <Zap size={20} />
              View Dashboard
            </CTAButton>
          </CTAButtons>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <FeaturesContainer>
          <h2>Powerful Features for Modern E-commerce</h2>
          <FeaturesGrid>
            <FeatureCard>
              <div className="icon">
                <Wand2 size={30} />
              </div>
              <h3>AI-Powered Content</h3>
              <p>
                Generate compelling headlines, product descriptions, and sales copy 
                using advanced AI that understands your audience and converts visitors.
              </p>
            </FeatureCard>

            <FeatureCard>
              <div className="icon">
                <ShoppingCart size={30} />
              </div>
              <h3>Shopify Integration</h3>
              <p>
                Seamlessly connect with your Shopify store to sync products, manage 
                inventory, and create pages that integrate perfectly with your existing setup.
              </p>
            </FeatureCard>

            <FeatureCard>
              <div className="icon">
                <Globe size={30} />
              </div>
              <h3>Dropshipping Ready</h3>
              <p>
                Built-in CJ Dropshipping integration lets you source products, 
                manage orders, and create pages for any product in their catalog.
              </p>
            </FeatureCard>

            <FeatureCard>
              <div className="icon">
                <Zap size={30} />
              </div>
              <h3>Lightning Fast</h3>
              <p>
                Create professional sales pages in minutes, not hours. Our streamlined 
                workflow gets you from idea to live page faster than ever.
              </p>
            </FeatureCard>

            <FeatureCard>
              <div className="icon">
                <Star size={30} />
              </div>
              <h3>Conversion Optimized</h3>
              <p>
                Every template and AI suggestion is based on proven conversion principles 
                and real-world sales data to maximize your results.
              </p>
            </FeatureCard>

            <FeatureCard>
              <div className="icon">
                <Globe size={30} />
              </div>
              <h3>Deploy Anywhere</h3>
              <p>
                Built with modern web standards and optimized for deployment on 
                platforms like Render, Vercel, or any hosting provider.
              </p>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesContainer>
      </FeaturesSection>

      <StatsSection>
        <h2 style={{ marginBottom: '3rem' }}>Join Thousands of Successful Creators</h2>
        <StatsGrid>
          <StatCard>
            <h3>10K+</h3>
            <p>Pages Created</p>
          </StatCard>
          <StatCard>
            <h3>95%</h3>
            <p>User Satisfaction</p>
          </StatCard>
          <StatCard>
            <h3>3x</h3>
            <p>Average Conversion Increase</p>
          </StatCard>
          <StatCard>
            <h3>24/7</h3>
            <p>AI Assistant Available</p>
          </StatCard>
        </StatsGrid>
      </StatsSection>
    </HomeContainer>
  );
}

export default Home;