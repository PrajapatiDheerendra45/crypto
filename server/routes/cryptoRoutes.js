const express = require('express');
const router = express.Router();
const { getCurrentCoins, storeHistoryData, getCoinHistory } = require('../controllers/cryptoController');

// GET /api/coins - Get current cryptocurrency data
router.get('/coins', getCurrentCoins);

// POST /api/history - Store current data to history
router.post('/history', storeHistoryData);

// GET /api/history/:coinId - Get historical data for specific coin
router.get('/history/:coinId', getCoinHistory);

module.exports = router; 