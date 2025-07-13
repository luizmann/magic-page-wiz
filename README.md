# Magic Page Wiz 🪄

Create stunning pages and sales pages with AI-powered content generation and seamless dropshipping integration.

## 🌟 Features

- **AI-Powered Content Generation** - Generate compelling headlines, product descriptions, and sales copy using OpenAI GPT
- **Shopify Integration** - Seamlessly connect with your Shopify store to sync products and manage inventory
- **CJ Dropshipping Support** - Built-in integration with CJ Dropshipping for product sourcing and order management
- **Drag & Drop Page Builder** - Visual page builder for creating professional sales pages
- **Responsive Design** - All pages are mobile-optimized and responsive
- **SEO Optimized** - Built-in SEO features for better search engine visibility

## 🏗️ Architecture

This is a monorepo containing:

- **Backend** (`/backend`) - Node.js/Express API server
- **Frontend** (`/frontend`) - React SPA application

### Backend Stack
- Node.js with Express.js
- OpenAI API integration
- Shopify API integration
- CJ Dropshipping API integration
- CORS and security middleware

### Frontend Stack
- React 18 with hooks
- React Router for navigation
- Styled Components for styling
- React Query for data fetching
- React Hook Form for form handling
- Lucide React for icons

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- OpenAI API key
- Shopify API credentials (optional)
- CJ Dropshipping API credentials (optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/luizmann/magic-page-wiz.git
cd magic-page-wiz
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env file with your API keys
npm run dev
```

3. **Setup Frontend** (in a new terminal)
```bash
cd frontend
npm install
npm start
```

The backend will run on `http://localhost:3001` and frontend on `http://localhost:3000`.

## 📝 Environment Variables

Copy `backend/.env.example` to `backend/.env` and fill in your credentials:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Shopify API Configuration
SHOPIFY_API_KEY=your_shopify_api_key
SHOPIFY_API_SECRET=your_shopify_api_secret
SHOPIFY_HOST=your_app_domain.com
SHOPIFY_REDIRECT_URI=https://your_app_domain.com/api/shopify/callback

# CJ Dropshipping API Configuration
CJ_ACCESS_KEY=your_cj_access_key
CJ_SECRET_KEY=your_cj_secret_key

# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key
```

## 🔗 API Endpoints

### OpenAI Integration
- `POST /api/openai/generate-page` - Generate complete sales page content
- `POST /api/openai/generate-description` - Generate product descriptions
- `POST /api/openai/generate-headlines` - Generate marketing headlines
- `POST /api/openai/optimize-content` - Optimize existing content

### Shopify Integration
- `GET /api/shopify/shop` - Get shop information
- `GET /api/shopify/products` - Get products from Shopify store
- `POST /api/shopify/products` - Create new product in Shopify
- `GET /api/shopify/orders` - Get orders from Shopify
- `GET /api/shopify/auth-url` - Generate OAuth authorization URL

### CJ Dropshipping Integration
- `GET /api/cj/categories` - Get product categories
- `GET /api/cj/products` - Search products
- `GET /api/cj/products/:productId` - Get product details
- `GET /api/cj/products/:productId/inventory` - Get product inventory
- `POST /api/cj/orders` - Create dropshipping order
- `GET /api/cj/orders/:orderId` - Get order details
- `GET /api/cj/shipping-methods` - Get shipping methods

### System
- `GET /api/health` - Health check endpoint
- `GET /api` - API information and available endpoints

## 🎨 Frontend Features

### Pages
- **Home** - Landing page with feature overview
- **Dashboard** - Analytics and quick actions
- **Product Generator** - AI-powered content generation and product search
- **Page Builder** - Visual page builder with drag-and-drop functionality

### Components
- Responsive header with navigation
- Feature-rich page builder interface
- Product search and content generation forms
- Dashboard with analytics cards
- Professional footer with links

## 🚀 Deployment

### Deploy to Render

1. **Connect your GitHub repository** to Render
2. **Use the provided `render.yaml`** for automatic deployment configuration
3. **Set environment variables** in Render dashboard
4. **Deploy** - Both frontend and backend will be deployed automatically

The `render.yaml` file configures:
- Backend API service on Render Web Service
- Frontend static site deployment
- Environment variable management
- Automatic routing between frontend and backend

### Manual Deployment

#### Backend
```bash
cd backend
npm install
npm start
```

#### Frontend
```bash
cd frontend
npm install
npm run build
# Serve the build folder with any static hosting service
```

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm start  # Starts development server with hot reload
```

### Building for Production
```bash
# Backend
cd backend
npm install --production

# Frontend
cd frontend
npm run build
```

## 📚 API Documentation

### Content Generation API

#### Generate Product Description
```javascript
POST /api/openai/generate-description
Content-Type: application/json

{
  "productName": "Premium Wireless Headphones",
  "features": ["Noise cancellation", "30-hour battery", "Bluetooth 5.0"],
  "targetAudience": "music lovers",
  "tone": "professional",
  "length": "medium"
}
```

#### Generate Sales Page
```javascript
POST /api/openai/generate-page
Content-Type: application/json

{
  "productName": "Smart Fitness Tracker",
  "productDescription": "Advanced fitness tracking with heart rate monitoring",
  "targetAudience": "fitness enthusiasts",
  "pageType": "sales",
  "tone": "persuasive"
}
```

### Product Search API

#### Search CJ Products
```javascript
GET /api/cj/products?keywords=wireless%20headphones&pageSize=20&minPrice=10&maxPrice=100
```

#### Get Product Details
```javascript
GET /api/cj/products/12345
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you need help or have questions:

1. Check the [API documentation](#-api-endpoints)
2. Review the [environment setup](#-environment-variables)
3. Open an issue on GitHub
4. Check the health endpoint: `/api/health`

## 🔮 Roadmap

- [ ] Advanced page templates
- [ ] More e-commerce platform integrations
- [ ] Enhanced analytics and reporting
- [ ] Team collaboration features
- [ ] A/B testing capabilities
- [ ] Advanced SEO tools
- [ ] Multi-language support

---

Made with ❤️ for the e-commerce community
