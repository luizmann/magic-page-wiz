import React, { useState } from 'react';
import styled from 'styled-components';
import { Search, Package, Wand2, Copy, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
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

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Tab = styled.button`
  padding: 1rem 1.5rem;
  border: none;
  background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent'};
  color: ${props => props.active ? 'white' : '#666'};
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(102, 126, 234, 0.1)'};
  }
`;

const ContentArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InputSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  height: fit-content;
`;

const OutputSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  }
  
  &.secondary {
    background: #f8f9fa;
    color: #667eea;
    border: 1px solid #667eea;
    
    &:hover {
      background: rgba(102, 126, 234, 0.1);
    }
  }
`;

const OutputContent = styled.div`
  .output-header {
    display: flex;
    justify-content: between;
    align-items: center;
    margin-bottom: 1rem;
    
    h3 {
      color: #333;
    }
  }
  
  .generated-content {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    white-space: pre-wrap;
    line-height: 1.6;
    min-height: 200px;
    
    &.empty {
      color: #999;
      font-style: italic;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const SearchSection = styled.div`
  .search-bar {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    
    input {
      flex: 1;
      margin-bottom: 0;
    }
  }
  
  .search-results {
    max-height: 400px;
    overflow-y: auto;
    
    .product-item {
      padding: 1rem;
      border: 1px solid #eee;
      border-radius: 8px;
      margin-bottom: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        border-color: #667eea;
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
      }
      
      .product-name {
        font-weight: 600;
        color: #333;
        margin-bottom: 0.5rem;
      }
      
      .product-price {
        color: #667eea;
        font-weight: 600;
      }
      
      .product-description {
        color: #666;
        font-size: 0.9rem;
        margin-top: 0.5rem;
      }
    }
  }
`;

function ProductGenerator() {
  const [activeTab, setActiveTab] = useState('generate');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  
  // Form states
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [contentType, setContentType] = useState('description');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  
  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleGenerate = async () => {
    if (!productName.trim()) {
      toast.error('Please enter a product name');
      return;
    }

    setIsLoading(true);
    try {
      let endpoint = '';
      let payload = {};
      
      if (contentType === 'description') {
        endpoint = '/api/openai/generate-description';
        payload = {
          productName,
          features: productDescription,
          targetAudience,
          tone,
          length
        };
      } else if (contentType === 'headlines') {
        endpoint = '/api/openai/generate-headlines';
        payload = {
          productName,
          keyBenefit: productDescription,
          targetAudience,
          count: 5,
          style: tone
        };
      } else if (contentType === 'page') {
        endpoint = '/api/openai/generate-page';
        payload = {
          productName,
          productDescription,
          targetAudience,
          pageType: 'sales',
          tone
        };
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (data.success) {
        if (contentType === 'headlines' && Array.isArray(data.headlines)) {
          setGeneratedContent(data.headlines.join('\n\n'));
        } else if (contentType === 'description' && data.description) {
          setGeneratedContent(data.description);
        } else if (contentType === 'page' && data.content) {
          setGeneratedContent(JSON.stringify(data.content, null, 2));
        } else {
          setGeneratedContent(JSON.stringify(data, null, 2));
        }
        toast.success('Content generated successfully!');
      } else {
        throw new Error(data.message || 'Failed to generate content');
      }
    } catch (error) {
      console.error('Generation error:', error);
      toast.error(error.message || 'Failed to generate content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/cj/products?keywords=${encodeURIComponent(searchQuery)}&pageSize=10`);
      const data = await response.json();
      
      if (data.result && data.result.list) {
        setSearchResults(data.result.list);
        toast.success(`Found ${data.result.list.length} products`);
      } else {
        setSearchResults([]);
        toast.info('No products found');
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to search products');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast.success('Content copied to clipboard!');
  };

  return (
    <PageContainer>
      <PageHeader>
        <h1>Product Generator</h1>
        <p>Generate compelling product content and search dropshipping products using AI and integrations.</p>
      </PageHeader>

      <TabsContainer>
        <Tab active={activeTab === 'generate'} onClick={() => setActiveTab('generate')}>
          <Wand2 size={20} />
          Generate Content
        </Tab>
        <Tab active={activeTab === 'search'} onClick={() => setActiveTab('search')}>
          <Search size={20} />
          Search Products
        </Tab>
      </TabsContainer>

      {activeTab === 'generate' && (
        <ContentArea>
          <InputSection>
            <h3 style={{ marginBottom: '1.5rem', color: '#333' }}>Content Generator</h3>
            
            <FormGroup>
              <label>Product Name *</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name..."
              />
            </FormGroup>

            <FormGroup>
              <label>Content Type</label>
              <select value={contentType} onChange={(e) => setContentType(e.target.value)}>
                <option value="description">Product Description</option>
                <option value="headlines">Marketing Headlines</option>
                <option value="page">Sales Page Content</option>
              </select>
            </FormGroup>

            <FormGroup>
              <label>Product Details / Key Benefits</label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Describe the product features, benefits, or key selling points..."
              />
            </FormGroup>

            <FormGroup>
              <label>Target Audience</label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g., fitness enthusiasts, tech professionals..."
              />
            </FormGroup>

            <FormGroup>
              <label>Tone</label>
              <select value={tone} onChange={(e) => setTone(e.target.value)}>
                <option value="professional">Professional</option>
                <option value="persuasive">Persuasive</option>
                <option value="friendly">Friendly</option>
                <option value="urgent">Urgent</option>
                <option value="luxury">Luxury</option>
              </select>
            </FormGroup>

            {contentType === 'description' && (
              <FormGroup>
                <label>Length</label>
                <select value={length} onChange={(e) => setLength(e.target.value)}>
                  <option value="short">Short (50-100 words)</option>
                  <option value="medium">Medium (150-250 words)</option>
                  <option value="long">Long (300-500 words)</option>
                </select>
              </FormGroup>
            )}

            <ButtonGroup>
              <Button className="primary" onClick={handleGenerate} disabled={isLoading}>
                {isLoading ? <RefreshCw size={16} className="spin" /> : <Wand2 size={16} />}
                {isLoading ? 'Generating...' : 'Generate Content'}
              </Button>
            </ButtonGroup>
          </InputSection>

          <OutputSection>
            <OutputContent>
              <div className="output-header">
                <h3>Generated Content</h3>
                {generatedContent && (
                  <ButtonGroup>
                    <Button className="secondary" onClick={copyToClipboard}>
                      <Copy size={16} />
                      Copy
                    </Button>
                  </ButtonGroup>
                )}
              </div>
              
              <div className={`generated-content ${!generatedContent ? 'empty' : ''}`}>
                {generatedContent || 'Generated content will appear here...'}
              </div>
            </OutputContent>
          </OutputSection>
        </ContentArea>
      )}

      {activeTab === 'search' && (
        <div>
          <SearchSection>
            <h3 style={{ marginBottom: '1.5rem', color: '#333' }}>Search CJ Dropshipping Products</h3>
            
            <div className="search-bar">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button className="primary" onClick={handleSearch} disabled={isLoading}>
                {isLoading ? <RefreshCw size={16} className="spin" /> : <Search size={16} />}
                Search
              </Button>
            </div>

            <div className="search-results">
              {searchResults.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#999', padding: '3rem' }}>
                  <Package size={48} />
                  <p style={{ marginTop: '1rem' }}>Search for products to see results here</p>
                </div>
              ) : (
                searchResults.map((product, index) => (
                  <div
                    key={index}
                    className="product-item"
                    onClick={() => {
                      setProductName(product.productNameEn || product.productName || 'Unknown Product');
                      setProductDescription(product.description || '');
                      setActiveTab('generate');
                      toast.info('Product details loaded into generator');
                    }}
                  >
                    <div className="product-name">{product.productNameEn || product.productName || 'Unknown Product'}</div>
                    <div className="product-price">${product.sellPrice || 'N/A'}</div>
                    {product.description && (
                      <div className="product-description">
                        {product.description.substring(0, 150)}...
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </SearchSection>
        </div>
      )}
    </PageContainer>
  );
}

export default ProductGenerator;