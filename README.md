# 🎩✨ Magic Page Wiz

**Create amazing pages and sales pages with magic!**

Magic Page Wiz is a powerful, easy-to-use tool for building beautiful landing pages and sales pages. Whether you're a developer, marketer, or entrepreneur, this tool helps you create stunning pages quickly and efficiently.

## 🚀 Features

- 📄 **Dynamic Page Builder** - Create pages programmatically
- 💰 **Sales Page Templates** - Pre-built templates for high-converting sales pages
- 🎨 **Custom Styling** - Flexible styling options
- 📱 **Responsive Design** - Mobile-first approach
- 🔧 **Easy Configuration** - Simple setup and deployment
- 📊 **Analytics Ready** - Built-in support for tracking

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14.0.0 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/luizmann/magic-page-wiz.git
cd magic-page-wiz
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Edit the `.env` file with your specific configuration:

```bash
# Basic configuration
PORT=3000
NODE_ENV=development

# Add other environment variables as needed
```

## 🚀 Running the Application

### Development Mode

Start the development server with auto-reload:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Mode

Build and start the production server:

```bash
npm run build
npm start
```

## 🐳 Docker Deployment

### Local Docker Build

Build and run the application using Docker:

```bash
# Build the Docker image
docker build -t magic-page-wiz .

# Run the container
docker run -p 3000:3000 magic-page-wiz
```

## ☁️ Deploy to Render

[Render](https://render.com) is a cloud platform that makes it easy to deploy your applications.

### Automatic Deployment

1. **Fork this repository** to your GitHub account

2. **Create a new Web Service** on Render:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Configure the service**:
   - **Name**: `magic-page-wiz` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Auto-Deploy**: `Yes`

4. **Set Environment Variables**:
   - Add any required environment variables from `.env.example`
   - Render will automatically set `PORT` and `RENDER` variables

5. **Deploy**: Click "Create Web Service"

Your application will be available at `https://your-app-name.onrender.com`

### Manual Deployment with Docker

You can also deploy using Docker on Render:

1. **Create a new Web Service**
2. **Choose "Docker"** as the environment
3. **Dockerfile**: Render will automatically detect the Dockerfile
4. **Set Environment Variables** as needed

## 📡 API Endpoints

The application provides the following API endpoints:

### Health Check
```http
GET /api/health
```
Returns the application status.

### Create Page
```http
POST /api/pages
Content-Type: application/json

{
  "title": "My Page",
  "content": "Page content here"
}
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

## 📁 Project Structure

```
magic-page-wiz/
├── src/
│   └── app.js          # Main application file
├── views/
│   └── index.ejs       # EJS templates
├── public/             # Static files
├── .env.example        # Environment variables template
├── Dockerfile          # Docker configuration
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |

See `.env.example` for all available configuration options.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/luizmann/magic-page-wiz/issues) page
2. Create a new issue if your problem isn't already listed
3. Provide detailed information about your environment and the issue

## 🙏 Acknowledgments

- Built with [Express.js](https://expressjs.com/)
- Templating with [EJS](https://ejs.co/)
- Deployed on [Render](https://render.com/)

---

**Ready to create some magic? 🎩✨**

Start building amazing pages today!
