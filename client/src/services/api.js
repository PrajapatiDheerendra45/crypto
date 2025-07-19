import axios from 'axios';

// Base URL for the API
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://crypto-backend-07pw.onrender.com/api' 
  : '/api';
// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

// API service functions
export const cryptoService = {
  // Get current cryptocurrency data
  getCurrentCoins: async () => {
    try {
      const response = await api.get('/coins');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch crypto data');
    }
  },

  // Store current data to history
  storeHistoryData: async () => {
    try {
      const response = await api.post('/history');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to store history data');
    }
  },

  // Get historical data for a specific coin
  getCoinHistory: async (coinId, limit = 24) => {
    try {
      const response = await api.get(`/history/${coinId}?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch coin history');
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('Backend server is not responding');
    }
  }
};

export default api; 
