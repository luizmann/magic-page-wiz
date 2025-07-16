#!/bin/bash

echo "==========================================="
echo "  Magic Page Wiz - Local Setup"
echo "==========================================="
echo

# Create public/produtos directory if it doesn't exist
echo "[1/3] Checking public/produtos directory..."
if [ ! -d "public/produtos" ]; then
    echo "  Creating public/produtos directory..."
    mkdir -p "public/produtos"
    echo "  ✓ public/produtos directory created successfully!"
else
    echo "  ✓ public/produtos directory already exists!"
fi
echo

# Create .env file if it doesn't exist
echo "[2/3] Checking .env configuration file..."
if [ ! -f ".env" ]; then
    echo "  Creating .env file from .env.example..."
    cp ".env.example" ".env"
    echo "  ✓ .env file created successfully!"
    echo "  ⚠️  IMPORTANT: Edit the .env file with your settings!"
else
    echo "  ✓ .env file already exists!"
fi
echo

# Show final instructions
echo "[3/3] Setup completed!"
echo
echo "==========================================="
echo "  NEXT STEPS:"
echo "==========================================="
echo "  1. Edit the .env file with your settings"
echo "  2. Run 'npm install' to install dependencies"
echo "  3. Run 'npm run dev' to start the server"
echo "  4. Or use: ./start-local.sh for automated startup"
echo
echo "  Server will start at: http://localhost:3000"
echo "==========================================="
echo