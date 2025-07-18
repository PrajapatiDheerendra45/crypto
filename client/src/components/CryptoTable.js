import React from 'react';

const CryptoTable = ({ coins, formatNumber, formatCurrency }) => {
  const formatChange = (change) => {
    const isPositive = change > 0;
    const formattedChange = Math.abs(change).toFixed(2);
    
    return (
      <span className={`change ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? '+' : '-'}{formattedChange}%
      </span>
    );
  };

  const formatLastUpdated = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="table-container">
      <table className="crypto-table">
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>Market Cap</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.coinId}>
              <td>
                <div className="coin-info">
                  <img 
                    src={coin.image} 
                    alt={coin.name}
                    className="coin-logo"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="coin-details">
                    <h3>{coin.name}</h3>
                    <p>{coin.symbol}</p>
                  </div>
                </div>
              </td>
              <td>
                <div className="price">
                  {formatCurrency(coin.price)}
                </div>
              </td>
              <td>
                {formatChange(coin.change24h)}
              </td>
              <td>
                <div className="market-cap">
                  {formatCurrency(coin.marketCap)}
                </div>
              </td>
              <td>
                <div className="last-updated">
                  {formatLastUpdated(coin.lastUpdated)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable; 