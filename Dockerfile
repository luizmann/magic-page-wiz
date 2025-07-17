# Use the official Node.js runtime as base image
FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including dev for now to ensure it works)
ENV PUPPETEER_SKIP_DOWNLOAD=true
RUN npm install

# Copy the rest of the application
COPY . .

# Create directory for generated pages
RUN mkdir -p public/produtos

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Command to run the application
CMD ["npm", "start"]