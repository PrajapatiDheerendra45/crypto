const mongoose = require('mongoose');

const historyDataSchema = new mongoose.Schema({
  coinId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  marketCap: {
    type: Number,
    required: true
  },
  change24h: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
historyDataSchema.index({ coinId: 1, timestamp: -1 });

module.exports = mongoose.model('HistoryData', historyDataSchema); 