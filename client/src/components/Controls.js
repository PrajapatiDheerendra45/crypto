import React from 'react';

const Controls = ({ 
  searchTerm, 
  setSearchTerm, 
  sortBy, 
  setSortBy, 
  onRefresh, 
  refreshing 
}) => {
  return (
    <div className="controls">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search cryptocurrencies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      <select 
        value={sortBy} 
        onChange={(e) => setSortBy(e.target.value)}
        className="sort-select"
      >
        <option value="market_cap">Sort by Market Cap</option>
        <option value="name">Sort by Name</option>
        <option value="price">Sort by Price</option>
        <option value="change_24h">Sort by 24h Change</option>
      </select>
      
      <button 
        onClick={onRefresh}
        disabled={refreshing}
        className="refresh-btn"
      >
        {refreshing ? (
          <>
            <div className="loading-spinner"></div>
            Refreshing...
          </>
        ) : (
          <>
            🔄 Refresh
          </>
        )}
      </button>
    </div>
  );
};

export default Controls; 