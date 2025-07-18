const cron = require('node-cron');
const axios = require('axios');
const CurrentData = require('../models/CurrentData');
const HistoryData = require('../models/HistoryData');

// CoinGecko API endpoint
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';

// Function to fetch and store crypto data
const fetchAndStoreCryptoData = async () => {
  try {
    console.log('🔄 Starting scheduled crypto data fetch...');
    
    // Fetch data from CoinGecko API
    const response = await axios.get(COINGECKO_API_URL);
    const coins = response.data;

    // Transform data
    const transformedCoins = coins.map(coin => ({
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: coin.current_price,
      marketCap: coin.market_cap,
      change24h: coin.price_change_percentage_24h,
      image: coin.image,
      timestamp: new Date()
    }));

    // Save to HistoryData collection
    await HistoryData.insertMany(transformedCoins);
    console.log(`📊 Stored ${transformedCoins.length} coins to history`);

    // Update CurrentData collection
    await Promise.all(transformedCoins.map(coin => 
      CurrentData.findOneAndUpdate(
        { coinId: coin.coinId },
        { ...coin, lastUpdated: new Date() },
        { upsert: true, new: true }
      )
    ));
    console.log('✅ Updated current data collection');

    console.log('🎉 Scheduled crypto data fetch completed successfully');
    
  } catch (error) {
    console.error('❌ Error in scheduled crypto data fetch:', error);
  }
};

// Initialize cron jobs
const initializeCronJobs = () => {
  // Run every hour at minute 0 (0 * * * *)
  cron.schedule('0 * * * *', fetchAndStoreCryptoData, {
    scheduled: true,
    timezone: "UTC"
  });

  console.log('⏰ Cron job initialized - will run every hour');
  
  // Run immediately on startup for testing
  setTimeout(fetchAndStoreCryptoData, 5000);
};

module.exports = {
  initializeCronJobs,
  fetchAndStoreCryptoData
}; 