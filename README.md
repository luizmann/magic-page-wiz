# 🪄 Magic Page Wiz

Create pages and sales pages with magical ease! A full-stack web application built with React and Express.js that allows you to create, manage, and publish different types of web pages through an intuitive wizard interface.

## ✨ Features

- **Page Wizard**: Step-by-step interface for creating pages
- **Multiple Page Types**: Landing pages, sales pages, blog posts, and portfolios
- **Real-time Management**: Create, read, update, and delete pages
- **Visual Feedback**: Loading states, error handling, and success notifications
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Data Validation**: Both frontend and backend validation
- **RESTful API**: Clean API design with proper error handling
- **Test Coverage**: Comprehensive test suites for both frontend and backend

## 🏗️ Project Structure

```
magic-page-wiz/
├── server/                 # Backend (Express.js)
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   └── index.js           # Server entry point
├── client/                # Frontend (React)
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── common/    # Reusable components
│   │   │   ├── pages/     # Page-related components
│   │   │   └── wizard/    # Wizard components
│   │   ├── services/      # API services
│   │   └── __tests__/     # Test files
│   └── package.json
├── tests/                 # Backend tests
├── render.yaml           # Deployment configuration
└── package.json          # Backend dependencies
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/luizmann/magic-page-wiz.git
   cd magic-page-wiz
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

### Development

#### Start the development servers:

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

#### Alternative - Development with both servers:
```bash
# Install concurrently for simultaneous server startup
npm install -g concurrently

# Start both servers
npm run dev
```

### Production Build

1. **Build the React app:**
   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```

## 📋 API Documentation

### Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-app.onrender.com/api`

### Endpoints

#### Health Check
```http
GET /api/health
```
Returns server status.

#### Pages

**Get All Pages**
```http
GET /api/pages?type=landing&published=true&search=hello
```
Query parameters:
- `type`: Filter by page type (landing, sales, blog, portfolio)
- `published`: Filter by published status (true/false)
- `search`: Search in title and description

**Get Page by ID**
```http
GET /api/pages/:id
```

**Create Page**
```http
POST /api/pages
Content-Type: application/json

{
  "title": "My Awesome Page",
  "description": "A description of the page",
  "content": "<h1>Hello World</h1>",
  "type": "landing",
  "published": false
}
```

**Update Page**
```http
PUT /api/pages/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "published": true
}
```

**Delete Page**
```http
DELETE /api/pages/:id
```

**Get Page Statistics**
```http
GET /api/pages/stats
```

### Response Format

All API responses follow this format:
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional success message"
}
```

Error responses:
```json
{
  "error": "Error message",
  "details": "Additional error details (development only)"
}
```

## 🧪 Testing

### Backend Tests

Run backend tests using Jest + Supertest:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

### Frontend Tests

Run React component tests using React Testing Library:
```bash
cd client
npm test
```

Run tests without watch mode:
```bash
cd client
npm test -- --watchAll=false
```

### Test Coverage

Generate test coverage report:
```bash
# Backend
npm test -- --coverage

# Frontend
cd client
npm test -- --coverage --watchAll=false
```

## 🎨 Usage Examples

### Creating a Landing Page

1. Navigate to the application
2. Click "✨ Create Page"
3. Fill in the basic information:
   - Title: "Welcome to My Product"
   - Type: Landing Page
4. Add content and description
5. Review and publish

### Managing Pages

- **View all pages**: Click "📄 My Pages"
- **Filter pages**: Use the filter options (type, status, search)
- **Edit a page**: Click "Edit" on any page card
- **Delete a page**: Click "Delete" (with confirmation)

### Page Types

- **Landing Page**: Perfect for product launches and campaigns
- **Sales Page**: Optimized for conversions and sales
- **Blog Post**: For content marketing and articles
- **Portfolio**: Showcase your work and projects

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=5000
REACT_APP_API_URL=http://localhost:5000/api
```

### Available Scripts

**Root directory:**
- `npm start`: Start production server
- `npm run dev`: Start development servers
- `npm test`: Run backend tests
- `npm run server`: Start backend only
- `npm run client`: Start frontend only
- `npm run build`: Build for production

**Client directory:**
- `npm start`: Start React development server
- `npm test`: Run React tests
- `npm run build`: Build React app for production

## 🚢 Deployment

### Render.com (Recommended)

1. Push your code to GitHub
2. Connect your repository to Render
3. Use the provided `render.yaml` configuration
4. Deploy!

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Set environment variables:
   ```bash
   export NODE_ENV=production
   export PORT=5000
   ```

3. Start the server:
   ```bash
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow the existing code structure
- Write tests for new features
- Use meaningful commit messages
- Update documentation as needed

## 🐛 Troubleshooting

### Common Issues

**Backend server won't start:**
- Check if port 5000 is available
- Verify Node.js version (v16+)
- Run `npm install` to ensure dependencies are installed

**Frontend build fails:**
- Clear node_modules: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`
- Check for conflicting dependencies

**API requests failing:**
- Verify backend server is running
- Check proxy configuration in client/package.json
- Ensure CORS is properly configured

**Tests failing:**
- Clear Jest cache: `npm test -- --clearCache`
- Update snapshots if needed: `npm test -- --updateSnapshot`

### Getting Help

If you encounter issues:
1. Check the [troubleshooting section](#🐛-troubleshooting)
2. Search existing GitHub issues
3. Create a new issue with detailed information

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing frontend framework
- Express.js community for the robust backend framework
- All contributors who help improve this project

---

**Built with ❤️ by Luiz Mann**

For more information, visit the [GitHub repository](https://github.com/luizmann/magic-page-wiz).
