// Configuration file example
// Copy this file to .env and adjust values as needed

module.exports = {
  // MongoDB Configuration
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/crypto-tracker',
  // For MongoDB Atlas, use: mongodb+srv://username:password@cluster.mongodb.net/crypto-tracker
  
  // Server Configuration
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // API Configuration
  COINGECKO_API_URL: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1',
  
  // CORS Configuration (for production)
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000'
};

// Create a .env file in the server directory with these variables:
/*
MONGODB_URI=mongodb://localhost:27017/crypto-tracker
PORT=5000
NODE_ENV=development
COINGECKO_API_URL=https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1
FRONTEND_URL=http://localhost:3000
*/ 