#!/bin/bash

echo "🚀 Setting up Crypto Tracker (MERN Stack)"
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v16 or higher) first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Setup backend
echo "📦 Setting up backend..."
cd server
npm install
echo "✅ Backend dependencies installed"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/crypto-tracker
PORT=5000
NODE_ENV=development
EOF
    echo "✅ .env file created"
fi

cd ..

# Setup frontend
echo "⚛️ Setting up frontend..."
cd client
npm install
echo "✅ Frontend dependencies installed"

cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To run the application:"
echo "1. Start MongoDB (if using local MongoDB)"
echo "2. In one terminal, run: cd server && npm run dev"
echo "3. In another terminal, run: cd client && npm start"
echo ""
echo "📊 The API will be available at: http://localhost:5000"
echo "🌐 The frontend will be available at: http://localhost:3000"
echo ""
echo "Happy coding! 🚀" 