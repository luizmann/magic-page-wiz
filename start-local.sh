#!/bin/bash

echo "==========================================="
echo "  Magic Page Wiz - Complete Initialization"
echo "==========================================="
echo

# Run prepare-local.sh
echo "[STEP 1] Preparing environment..."
./prepare-local.sh
if [ $? -ne 0 ]; then
    echo "❌ Error in environment preparation!"
    exit 1
fi
echo

# Install dependencies
echo "[STEP 2] Installing dependencies..."
echo "  Running: npm install"
echo "  (This may take a few minutes on first run)"
echo
# Set environment variable to skip Puppeteer download if needed
export PUPPETEER_SKIP_DOWNLOAD=true
npm install
if [ $? -ne 0 ]; then
    echo "❌ Error installing dependencies!"
    echo
    echo "Possible solutions:"
    echo "1. Check if Node.js is installed (version 14 or higher)"
    echo "2. Check your internet connection"
    echo "3. Try running 'npm install' manually"
    echo
    exit 1
fi
echo "  ✓ Dependencies installed successfully!"
echo

# Start server
echo "[STEP 3] Starting development server..."
echo
echo "==========================================="
echo "  SERVER STARTING..."
echo "==========================================="
echo "  URL: http://localhost:3000"
echo "  To stop server: Ctrl+C"
echo "==========================================="
echo
npm run dev