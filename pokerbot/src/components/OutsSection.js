import React from 'react';

const OutsSection = ({ outs, tableData }) => {
  // Define all hand types with their display names
  const handTypes = [
    { key: 'royalFlush', name: 'Royal Flush' },
    { key: 'straightFlush', name: 'Straight Flush' },
    { key: 'fourOfAKind', name: 'Four of a Kind' },
    { key: 'fullHouse', name: 'Full House' },
    { key: 'flush', name: 'Flush' },
    { key: 'straight', name: 'Straight' },
    { key: 'threeOfAKind', name: 'Three of a Kind' },
    { key: 'twoPair', name: 'Two Pair' },
    { key: 'pair', name: 'Pair' },
    { key: 'highCard', name: 'High Card' }
  ];

  // Function to render outs cards
  const renderOutsCard = (card) => {
    const red = ['♥', '♦'];
    const isRedSuit = red.includes(card.suit);
    return (
      <div className="outs-card" key={`${card.rank}${card.suit}`}>
        <div className={`card-rank ${isRedSuit ? 'red-suit' : 'black-suit'}`}>{card.rank}</div>
        <div className={`card-suit ${isRedSuit ? 'red-suit' : 'black-suit'}`}>{card.suit}</div>
      </div>
    );
  };

  // Function to render ranking status
  const renderRankingStatus = (handType) => {
    if (!tableData || !tableData.rank || !tableData.rank[handType]) {
      return null;
    }

    const rankData = tableData.rank[handType];
    
    if (rankData.isTrue) {
      return (
        <div className="ranking-status achieved">
          <div className="achieved-icon">🎉</div>
          <span className="status-text">
            <strong>{handType.charAt(0).toUpperCase() + handType.slice(1)} Achieved!</strong>
          </span>
        </div>
      );
    } else if (rankData.remaining && Array.isArray(rankData.remaining)) {
      const totalOuts = rankData.remaining.reduce((sum, item) => sum + item.needed, 0);
      
      return (
        <div className="ranking-remaining">
          <div className="remaining-summary">
            <span className="total-outs">
              <strong>{totalOuts} total outs</strong> • {rankData.remaining.length} combination{rankData.remaining.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="remaining-cards">
            {rankData.remaining.map((item, index) => (
              <div key={index} className="remaining-group">
                <div className="remaining-info">
                  <span className="needed-count">
                    <strong>{item.needed} card{item.needed !== 1 ? 's' : ''} needed:</strong>
                  </span>
                </div>
                <div className="remaining-cards-list">
                  {item.cards && item.cards.map((card, cardIndex) => {
                    const red = ['♥', '♦'];
                    const isRedSuit = red.includes(card.suit);
                    return (
                      <div key={cardIndex} className="remaining-card mini-card">
                        <div className="card-inner">
                          <div className="card-top">
                            <div className={`card-rank ${isRedSuit ? 'red-suit' : 'black-suit'}`}>
                              {card.rank}
                            </div>
                            <div className={`card-suit ${isRedSuit ? 'red-suit' : 'black-suit'}`}>
                              {card.suit}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return null;
  };

  // Function to render a single hand type
  const renderHandType = (handType) => {
    const hasRankingData = tableData && tableData.rank && tableData.rank[handType.key];
    
    return (
      <div key={handType.key} className="outs-item">
        <div className="outs-header">
          <span className="hand-name">{handType.name}</span>
          {hasRankingData ? (
            <span className="outs-count">
              {tableData.rank[handType.key].isTrue ? 'Achieved!' : 
               `${tableData.rank[handType.key].remaining.reduce((sum, item) => sum + item.needed, 0)} outs`}
            </span>
          ) : (
            <span className="outs-count">({outs[handType.key].length} cards)</span>
          )}
        </div>
        <div className="outs-cards">
          {renderRankingStatus(handType.key) || outs[handType.key].map(renderOutsCard)}
        </div>
      </div>
    );
  };

  return (
    <div className="outs-section">
      <h2>Outs (Cards Needed)</h2>
      <div className="outs-grid">
        {handTypes.map(renderHandType)}
      </div>
    </div>
  );
};

export default OutsSection;
