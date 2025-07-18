const axios = require('axios');
const CurrentData = require('../models/CurrentData');
const HistoryData = require('../models/HistoryData');

// CoinGecko API endpoint
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';

// Get current cryptocurrency data
const getCurrentCoins = async (req, res) => {
  try {
    // First, try to get data from our database
    const currentData = await CurrentData.find().sort({ marketCap: -1 });
    
    if (currentData.length > 0) {
      return res.json({
        success: true,
        data: currentData,
        source: 'database'
      });
    }

    // If no data in database, fetch from CoinGecko API
    const response = await axios.get(COINGECKO_API_URL);
    const coins = response.data;

    // Transform and save data to database
    const transformedCoins = coins.map(coin => ({
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: coin.current_price,
      marketCap: coin.market_cap,
      change24h: coin.price_change_percentage_24h,
      image: coin.image,
      lastUpdated: new Date()
    }));

    // Save to CurrentData collection (upsert)
    await Promise.all(transformedCoins.map(coin => 
      CurrentData.findOneAndUpdate(
        { coinId: coin.coinId },
        coin,
        { upsert: true, new: true }
      )
    ));

    res.json({
      success: true,
      data: transformedCoins,
      source: 'coingecko'
    });

  } catch (error) {
    console.error('Error fetching coins:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cryptocurrency data',
      error: error.message
    });
  }
};

// Store current data to history
const storeHistoryData = async (req, res) => {
  try {
    // Fetch fresh data from CoinGecko
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

    // Update CurrentData collection
    await Promise.all(transformedCoins.map(coin => 
      CurrentData.findOneAndUpdate(
        { coinId: coin.coinId },
        { ...coin, lastUpdated: new Date() },
        { upsert: true, new: true }
      )
    ));

    res.json({
      success: true,
      message: 'Historical data stored successfully',
      count: transformedCoins.length
    });

  } catch (error) {
    console.error('Error storing history data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to store historical data',
      error: error.message
    });
  }
};

// Get historical data for a specific coin
const getCoinHistory = async (req, res) => {
  try {
    const { coinId } = req.params;
    const { limit = 24 } = req.query;

    const historyData = await HistoryData
      .find({ coinId })
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: historyData,
      coinId
    });

  } catch (error) {
    console.error('Error fetching coin history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch coin history',
      error: error.message
    });
  }
};

module.exports = {
  getCurrentCoins,
  storeHistoryData,
  getCoinHistory
}; 