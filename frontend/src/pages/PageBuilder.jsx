import React, { useState } from 'react';
import styled from 'styled-components';
import { Save, Eye, Wand2, Layout, Settings } from 'lucide-react';
import { toast } from 'react-toastify';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 140px);
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    font-size: 1.1rem;
  }
`;

const BuilderInterface = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr 300px;
  gap: 2rem;
  height: calc(100vh - 300px);
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const Sidebar = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
  height: fit-content;
  
  .sidebar-header {
    padding: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .sidebar-content {
    padding: 1rem;
  }
`;

const Canvas = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
  position: relative;
  
  .canvas-header {
    padding: 1rem;
    background: #f8f9fa;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: between;
    align-items: center;
    gap: 1rem;
    
    .page-title {
      font-weight: 600;
      color: #333;
    }
  }
  
  .canvas-content {
    padding: 2rem;
    min-height: 500px;
    background: white;
  }
`;

const ComponentItem = styled.div`
  padding: 0.75rem;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.05);
  }
  
  .component-name {
    font-weight: 500;
    color: #333;
  }
`;

const PropertyGroup = styled.div`
  margin-bottom: 1.5rem;
  
  .group-title {
    font-weight: 600;
    color: #333;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
  }
  
  .property-item {
    margin-bottom: 1rem;
    
    label {
      display: block;
      font-weight: 500;
      color: #555;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }
    
    input, textarea, select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 0.9rem;
      
      &:focus {
        outline: none;
        border-color: #667eea;
      }
    }
    
    textarea {
      resize: vertical;
      min-height: 80px;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  
  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
  }
  
  &.secondary {
    background: #f8f9fa;
    color: #667eea;
    border: 1px solid #ddd;
    
    &:hover {
      background: rgba(102, 126, 234, 0.1);
    }
  }
`;

const PreviewContent = styled.div`
  .hero-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 4rem 2rem;
    text-align: center;
    border-radius: 12px;
    margin-bottom: 2rem;
    
    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }
    
    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }
    
    .cta-button {
      background: white;
      color: #667eea;
      padding: 1rem 2rem;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      display: inline-block;
      transition: transform 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
      }
    }
  }
  
  .features-section {
    padding: 3rem 0;
    
    h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 3rem;
      color: #333;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
    
    .feature-card {
      padding: 2rem;
      border-radius: 12px;
      background: #f8f9fa;
      text-align: center;
      
      h3 {
        color: #333;
        margin-bottom: 1rem;
      }
      
      p {
        color: #666;
        line-height: 1.6;
      }
    }
  }
`;

function PageBuilder() {
  const [pageData, setPageData] = useState({
    title: 'My Awesome Product',
    subtitle: 'The perfect solution for your needs',
    description: 'This amazing product will revolutionize the way you work and live. Get yours today!',
    ctaText: 'Get Started Now',
    features: [
      { title: 'Feature 1', description: 'Amazing benefit that your customers will love' },
      { title: 'Feature 2', description: 'Another great feature that adds value' },
      { title: 'Feature 3', description: 'Third feature that completes the package' }
    ]
  });

  const components = [
    { id: 'hero', name: 'Hero Section', icon: <Layout size={16} /> },
    { id: 'features', name: 'Features Grid', icon: <Layout size={16} /> },
    { id: 'testimonials', name: 'Testimonials', icon: <Layout size={16} /> },
    { id: 'pricing', name: 'Pricing Table', icon: <Layout size={16} /> },
    { id: 'cta', name: 'Call to Action', icon: <Layout size={16} /> },
  ];

  const handleGenerateContent = async () => {
    try {
      const response = await fetch('/api/openai/generate-page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: pageData.title,
          productDescription: pageData.description,
          targetAudience: 'general consumers',
          pageType: 'sales',
          tone: 'persuasive'
        }),
      });

      const data = await response.json();
      
      if (data.success && data.content) {
        // Update page data with generated content
        const content = typeof data.content === 'string' ? JSON.parse(data.content) : data.content;
        
        if (content.headline) setPageData(prev => ({ ...prev, title: content.headline }));
        if (content.subtitle) setPageData(prev => ({ ...prev, subtitle: content.subtitle }));
        if (content.description) setPageData(prev => ({ ...prev, description: content.description }));
        if (content.cta) setPageData(prev => ({ ...prev, ctaText: content.cta }));
        
        toast.success('Content generated successfully!');
      } else {
        throw new Error(data.message || 'Failed to generate content');
      }
    } catch (error) {
      console.error('Generation error:', error);
      toast.error('Failed to generate content');
    }
  };

  const updatePageData = (field, value) => {
    setPageData(prev => ({ ...prev, [field]: value }));
  };

  const savePage = () => {
    // Here you would save the page data to your backend
    toast.success('Page saved successfully!');
  };

  const previewPage = () => {
    // Here you would open a preview window or navigate to preview
    toast.info('Preview functionality would open here');
  };

  return (
    <PageContainer>
      <PageHeader>
        <h1>Page Builder</h1>
        <p>Create stunning sales pages with our drag-and-drop builder and AI-powered content generation.</p>
      </PageHeader>

      <BuilderInterface>
        {/* Left Sidebar - Components */}
        <Sidebar>
          <div className="sidebar-header">
            <Layout size={20} />
            Components
          </div>
          <div className="sidebar-content">
            {components.map(component => (
              <ComponentItem
                key={component.id}
              >
                {component.icon}
                <span className="component-name">{component.name}</span>
              </ComponentItem>
            ))}
          </div>
        </Sidebar>

        {/* Main Canvas */}
        <Canvas>
          <div className="canvas-header">
            <span className="page-title">Sales Page Preview</span>
            <ButtonGroup>
              <Button className="secondary" onClick={handleGenerateContent}>
                <Wand2 size={16} />
                AI Generate
              </Button>
              <Button className="secondary" onClick={previewPage}>
                <Eye size={16} />
                Preview
              </Button>
              <Button className="primary" onClick={savePage}>
                <Save size={16} />
                Save
              </Button>
            </ButtonGroup>
          </div>
          <div className="canvas-content">
            <PreviewContent>
              <div className="hero-section">
                <h1>{pageData.title}</h1>
                <p>{pageData.subtitle}</p>
                <button className="cta-button">{pageData.ctaText}</button>
              </div>
              
              <div className="features-section">
                <h2>Key Features</h2>
                <div className="features-grid">
                  {pageData.features.map((feature, index) => (
                    <div key={index} className="feature-card">
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </PreviewContent>
          </div>
        </Canvas>

        {/* Right Sidebar - Properties */}
        <Sidebar>
          <div className="sidebar-header">
            <Settings size={20} />
            Properties
          </div>
          <div className="sidebar-content">
            <PropertyGroup>
              <div className="group-title">Hero Section</div>
              <div className="property-item">
                <label>Main Title</label>
                <input
                  type="text"
                  value={pageData.title}
                  onChange={(e) => updatePageData('title', e.target.value)}
                />
              </div>
              <div className="property-item">
                <label>Subtitle</label>
                <input
                  type="text"
                  value={pageData.subtitle}
                  onChange={(e) => updatePageData('subtitle', e.target.value)}
                />
              </div>
              <div className="property-item">
                <label>Description</label>
                <textarea
                  value={pageData.description}
                  onChange={(e) => updatePageData('description', e.target.value)}
                />
              </div>
              <div className="property-item">
                <label>CTA Button Text</label>
                <input
                  type="text"
                  value={pageData.ctaText}
                  onChange={(e) => updatePageData('ctaText', e.target.value)}
                />
              </div>
            </PropertyGroup>

            <PropertyGroup>
              <div className="group-title">Features</div>
              {pageData.features.map((feature, index) => (
                <div key={index}>
                  <div className="property-item">
                    <label>Feature {index + 1} Title</label>
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) => {
                        const newFeatures = [...pageData.features];
                        newFeatures[index].title = e.target.value;
                        updatePageData('features', newFeatures);
                      }}
                    />
                  </div>
                  <div className="property-item">
                    <label>Feature {index + 1} Description</label>
                    <textarea
                      value={feature.description}
                      onChange={(e) => {
                        const newFeatures = [...pageData.features];
                        newFeatures[index].description = e.target.value;
                        updatePageData('features', newFeatures);
                      }}
                    />
                  </div>
                </div>
              ))}
            </PropertyGroup>
          </div>
        </Sidebar>
      </BuilderInterface>
    </PageContainer>
  );
}

export default PageBuilder;