# Full Stack Crypto Tracker (MERN Stack)

## 🌟 Overview
A full-stack cryptocurrency tracker built with the MERN stack that displays real-time cryptocurrency data with historical tracking and automated data collection.

## 🛠 Tech Stack
- **Frontend**: React.js with modern hooks
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **API**: CoinGecko API for live crypto data
- **Automation**: node-cron for scheduled data collection
- **Styling**: CSS3 with modern design

## 📁 Project Structure
```
crypto-tracker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── jobs/
│   ├── server.js
│   └── package.json
│   └── .env

└── README.md
```

## 🚀 Features
- Real-time cryptocurrency data display
- Top 10 cryptocurrencies by market cap
- Auto-refresh every 30 minutes
- Historical data tracking
- Search and filter functionality
- Responsive design
- Automated hourly data collection

## 📊 Data Points
- Coin Name & Symbol
- Current Price (USD)
- Market Cap
- 24h % Change
- Last Updated Timestamp

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Backend Setup
1. Navigate to server directory:
```bash
cd server
npm install
```

2. Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/crypto-tracker
PORT=5000
NODE_ENV=development
```

3. Start the backend server:
```bash
npm run dev
```

### Frontend Setup
1. Navigate to client directory:
```bash
cd client
npm install
```

2. Start the frontend:
```bash
npm start
```

## 🤖 Cron Job Setup
The application includes an automated cron job that:
- Runs every hour (0 * * * *)
- Fetches latest cryptocurrency data from CoinGecko API
- Stores historical snapshots in MongoDB
- Ensures data consistency and historical tracking

## 🌐 API Endpoints

### GET /api/coins
- Fetches live cryptocurrency data from CoinGecko
- Returns top 10 cryptocurrencies by market cap

### POST /api/history
- Stores current price snapshot in database
- Called automatically by cron job

### GET /api/history/:coinId (Optional)
- Returns historical price data for specific coin
- Used for potential chart features

## 🗄 Database Schema

### Current Data Model
```javascript
{
  coinId: String,
  name: String,
  symbol: String,
  price: Number,
  marketCap: Number,
  change24h: Number,
  lastUpdated: Date
}
```

### History Data Model
```javascript
{
  coinId: String,
  name: String,
  symbol: String,
  price: Number,
  marketCap: Number,
  change24h: Number,
  timestamp: Date
}
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
# Build the React app
cd client
npm run build

# Deploy to onrender
https://crypto-22.onrender.com/
```

### Backend (Render/Railway)
```bash
# Deploy to Render
https://crypto-backend-07pw.onrender.com/
```

### Database (MongoDB Atlas)
1. Create MongoDB Atlas account
2. Create new cluster
3. Update connection string in .env file

## 📸 Screenshots
- Dashboard with live crypto data
- Database collections with sample data
- Cron job execution logs

## 🔍 Additional Features
- Search functionality for specific cryptocurrencies
- Sorting by price, market cap, or 24h change
- Responsive design for mobile devices
- Loading states and error handling

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License
This project is licensed under the MIT License. 