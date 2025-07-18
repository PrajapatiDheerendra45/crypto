import React, { useState, useEffect, useCallback } from 'react';
import { cryptoService } from './services/api';
import CryptoTable from './components/CryptoTable';
import Controls from './components/Controls';
import './App.css';

function App() {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('market_cap');
  const [refreshing, setRefreshing] = useState(false);

  // Fetch crypto data
  const fetchCryptoData = useCallback(async () => {
    try {
      setError(null);
      const response = await cryptoService.getCurrentCoins();
      
      if (response.success) {
        setCoins(response.data);
        setLastUpdated(new Date().toLocaleString());
      } else {
        throw new Error(response.message || 'Failed to fetch data');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching crypto data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Manual refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchCryptoData();
  };

  // Filter and sort coins
  useEffect(() => {
    let filtered = coins.filter(coin => 
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort coins
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return b.price - a.price;
        case 'market_cap':
          return b.marketCap - a.marketCap;
        case 'change_24h':
          return b.change24h - a.change24h;
        default:
          return b.marketCap - a.marketCap;
      }
    });

    setFilteredCoins(filtered);
  }, [coins, searchTerm, sortBy]);

  // Initial load
  useEffect(() => {
    fetchCryptoData();
  }, [fetchCryptoData]);

  // Auto-refresh every 30 minutes
  useEffect(() => {
    const interval = setInterval(fetchCryptoData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchCryptoData]);

  // Format number with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Format currency
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(num);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🚀 Crypto Tracker</h1>
        <p>Real-time cryptocurrency prices and market data</p>
      </header>

      <main className="dashboard">
        <Controls 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />

        <div className="status-bar">
          <div>
            <strong>Total Coins:</strong> {filteredCoins.length}
            {searchTerm && ` (filtered from ${coins.length})`}
          </div>
          <div>
            <strong>Last Updated:</strong> {lastUpdated || 'Never'}
          </div>
        </div>

        {loading && (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading cryptocurrency data...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>❌ {error}</p>
            <button onClick={handleRefresh} className="refresh-btn">
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <CryptoTable 
            coins={filteredCoins}
            formatNumber={formatNumber}
            formatCurrency={formatCurrency}
          />
        )}

        {!loading && !error && filteredCoins.length === 0 && searchTerm && (
          <div className="no-results">
            <p>No cryptocurrencies found matching "{searchTerm}"</p>
            <button onClick={() => setSearchTerm('')} className="refresh-btn">
              Clear Search
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2025 Crypto Tracker ||By Dheerendra prajapati</p>
      </footer>
    </div>
  );
}

export default App; 