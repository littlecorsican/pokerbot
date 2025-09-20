import React from 'react';

const OutsSection = ({ outs, tableData }) => {
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

  return (
    <div className="outs-section">
      <h2>Outs (Cards Needed)</h2>
      <div className="outs-grid">
        <div className="outs-item">
          <div className="outs-header">
            <span className="hand-name">Royal Flush</span>
            <span className="outs-count">({outs.royalFlush.length} cards)</span>
          </div>
          <div className="outs-cards">
            {outs.royalFlush.map(renderOutsCard)}
          </div>
        </div>
        <div className="outs-item">
          <div className="outs-header">
            <span className="hand-name">Straight Flush</span>
            <span className="outs-count">({outs.straightFlush.length} cards)</span>
          </div>
          <div className="outs-cards">
            {outs.straightFlush.map(renderOutsCard)}
          </div>
        </div>
        <div className="outs-item">
          <div className="outs-header">
            <span className="hand-name">Four of a Kind</span>
            <span className="outs-count">({outs.fourOfAKind.length} cards)</span>
          </div>
          <div className="outs-cards">
            {outs.fourOfAKind.map(renderOutsCard)}
          </div>
        </div>
        <div className="outs-item">
          <div className="outs-header">
            <span className="hand-name">Full House</span>
            <span className="outs-count">({outs.fullHouse.length} cards)</span>
          </div>
          <div className="outs-cards">
            {outs.fullHouse.map(renderOutsCard)}
          </div>
        </div>
        <div className="outs-item">
          <div className="outs-header">
            <span className="hand-name">Flush</span>
            {tableData && tableData.rank && tableData.rank.flush ? (
              <span className="outs-count">
                {tableData.rank.flush.isTrue ? 'Achieved!' : 
                 `${tableData.rank.flush.remaining.reduce((sum, item) => sum + item.needed, 0)} outs`}
              </span>
            ) : (
              <span className="outs-count">({outs.flush.length} cards)</span>
            )}
          </div>
          <div className="outs-cards">
            {renderRankingStatus('flush') || outs.flush.map(renderOutsCard)}
          </div>
        </div>
        <div className="outs-item">
          <div className="outs-header">
            <span className="hand-name">Straight</span>
            {tableData && tableData.rank && tableData.rank.straight ? (
              <span className="outs-count">
                {tableData.rank.straight.isTrue ? 'Achieved!' : 
                 `${tableData.rank.straight.remaining.reduce((sum, item) => sum + item.needed, 0)} outs`}
              </span>
            ) : (
              <span className="outs-count">({outs.straight.length} cards)</span>
            )}
          </div>
          <div className="outs-cards">
            {renderRankingStatus('straight') || outs.straight.map(renderOutsCard)}
          </div>
        </div>
        <div className="outs-item">
          <div className="outs-header">
            <span className="hand-name">Three of a Kind</span>
            <span className="outs-count">({outs.threeOfAKind.length} cards)</span>
          </div>
          <div className="outs-cards">
            {outs.threeOfAKind.map(renderOutsCard)}
          </div>
        </div>
        <div className="outs-item">
          <div className="outs-header">
            <span className="hand-name">Two Pair</span>
            <span className="outs-count">({outs.twoPair.length} cards)</span>
          </div>
          <div className="outs-cards">
            {outs.twoPair.map(renderOutsCard)}
          </div>
        </div>
        <div className="outs-item">
          <div className="outs-header">
            <span className="hand-name">Pair</span>
            <span className="outs-count">({outs.pair.length} cards)</span>
          </div>
          <div className="outs-cards">
            {outs.pair.map(renderOutsCard)}
          </div>
        </div>
        <div className="outs-item">
          <div className="outs-header">
            <span className="hand-name">High Card</span>
            <span className="outs-count">({outs.highCard.length} cards)</span>
          </div>
          <div className="outs-cards">
            {outs.highCard.map(renderOutsCard)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutsSection;
